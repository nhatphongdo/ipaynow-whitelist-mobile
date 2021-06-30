import React from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Item, Label, Input, Spinner } from 'native-base'
import Modal from 'react-native-modal'
import * as WebBrowser from 'expo-web-browser'
import * as Animatable from 'react-native-animatable'
import Lottie from 'lottie-react-native'
import '@ethersproject/shims'
import { ethers } from 'ethers'
import numeral from 'numeral'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import CreditCardIcon from '../../assets/images/CreditCardIcon'
import { updateTransaction, removeTransaction } from '../../stores/storage/actions'
import DropdownAlertService from '../../services/DropdownAlertService'
import {
  sendEth,
  getBlockNumber,
  getTransactionReceipt,
  getTransaction,
  submitTransaction,
  getWalletInfo,
  estimateGas,
} from '../../stores/wallet/actions'
import { MAXIMUM_TRIES, CONFIRMATION_PERIOD, CONFIRMATION_BLOCKS } from '../../stores/wallet/constants'
import { TX_EXPLORER_URL } from '../../constants/Constants'
import { showAlert, hideAlert } from '../../stores/alert/actions'
import { convertRate } from '../../stores/rates/actions'
import { ETH, USDT } from '../../stores/rates/constants'
import { DEPOSIT } from '../../stores/storage/constants'
import { formatCrypto } from '../../common/helper'
import { EnterPinCode } from '../init/PinCodeScreen'
import Help from '../../assets/images/Help'

let UsdtWallet = translate('USDT')
let EthereumWallet = translate('Ethereum')
let CreditCardPayment = translate('Credit Card')
let EthereumPayment = translate('Ethereum')

const AnimatableView = Animatable.createAnimatableComponent(View)

class DepositScreen extends React.Component {
  _confirmingTimer = null
  _confirmingTries = 0

  constructor(props) {
    super(props)
    this.state = {
      amount: '',
      amountInEth: '',

      depositWallet: UsdtWallet,
      depositValue: 0,
      paymentMethod: EthereumPayment,
      agreement: false,

      checking: false,

      sending: false,
      confirming: false,
      confirmationCount: 0,
      transaction: null,
      transactionStatus: null,
      blockNumber: 0,

      animationEnded: false,
    }
  }

  onAmountChanged = async (text) => {
    // Convert token to ETH
    this.setState({ amount: text })
    let amountValue = numeral(text)
    if (!isNaN(amountValue.value()) && amountValue.value() !== null && amountValue.value() > 0) {
      const eth = await this.props.convertRate(USDT, ETH, amountValue.value())
      this.setState({ amountInEth: formatCrypto(eth) })
    } else {
      this.setState({ amountInEth: '' })
    }
  }

  onConfirm = () => {
    const ethAmount = numeral(this.state.amountInEth)
    if (isNaN(ethAmount.value()) || ethAmount.value() === null || ethAmount.value() <= 0) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('You must input the valid Amount'))
      return
    }
    if (ethAmount.value() > this.props.wallet.ethBalance) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Insufficient balance to send'))
      return
    }

    this.props.showAlert({
      title: translate('Confirm!'),
      message: translate('Do you really want to buy {0} Ruby with {1} Eth?', [formatCrypto(this.state.amount), this.state.amountInEth]),
      showConfirmButton: true,
      onConfirmPressed: async () => {
        this.props.hideAlert()

        let address = this.props.settings.centralWallet
        try {
          // Try to convert to valid ETH address
          address = ethers.utils.getAddress(address)
        } catch (err) {
          console.log(err)
          // This is not valid address
          DropdownAlertService.show(
            DropdownAlertService.ERROR,
            translate('Error'),
            translate('Cannot load proper settings to proceed Please restart application and try again')
          )
          return
        }

        this.setState({ checking: true })
        // Estimate gas
        const gas = await this.props.estimateGas(address, ethAmount.format('0.000000000000000000'), false)
        if (gas + ethAmount.value() > this.props.wallet.ethBalance) {
          DropdownAlertService.show(
            DropdownAlertService.ERROR,
            translate('Error'),
            translate('Insufficient gas to send You need at least {0} ETH as gas to send', formatCrypto(gas))
          )
          this.setState({ checking: false })
          return
        }

        this.setState({ checking: false })

        // Verify pin before send
        if (this.props.settings.alwaysVerifyBeforeSend) {
          this.props.navigation.navigate('PinCode', {
            type: EnterPinCode,
            onEnterSuccess: (pin) => {
              setTimeout(() => {
                this.send(address, ethAmount)
              }, 1000)
            },
          })
        } else {
          await this.send(address, ethAmount)
        }
      },
    })
  }

  send = async (address, ethAmount) => {
    // Send
    this.setState({
      sending: true,
      confirming: true,
      transaction: null,
      confirmationCount: 0,
      animationEnded: false,
    })
    const transaction = await this.props.sendEth(address, ethAmount.format('0.000000000000000000'))
    if (transaction.error) {
      // Failed
      this.setState({
        transaction: null,
        transactionStatus: null,
        confirming: false,
        errorMessage: transaction.error,
      })
      return
    }

    // Save to database
    await this.props.updateTransaction(
      address,
      ethAmount.value(),
      'ETH',
      `${translate('Buy')} ${formatCrypto(this.state.amount)} ${translate('USDT')}`,
      DEPOSIT,
      transaction.result.hash
    )

    // Submit transaction to server
    const sendResult = await this.props.submitTransaction(transaction.result.hash, address, ethAmount.value(), true, 'Deposit')

    // Wait for confirmation
    const blockNumber = 0 // await this.props.getBlockNumber();
    this.setState(
      {
        transaction: transaction.result,
        transactionStatus: null,
        blockNumber,
        confirming: false,
      },
      () => {
        // this._confirmingTries = 0;
        // this._confirmingTimer = setInterval(this.confirmingHandler, CONFIRMATION_PERIOD);
      }
    )
  }

  confirmingHandler = async () => {
    if (
      !this.state.transaction ||
      this._confirmingTries > MAXIMUM_TRIES ||
      (this.state.transactionStatus !== null && this.state.confirmationCount >= CONFIRMATION_BLOCKS)
    ) {
      // Stop
      clearInterval(this._confirmingTimer)
      this._confirmingTimer = null
      this.setState({ confirming: false })
      this.props.getWalletInfo()
      return
    }

    if (this.state.blockNumber === 0) {
      const tx = await this.props.getTransaction(this.state.transaction.hash)
      if (tx === null || !tx.blockNumber) {
        this._confirmingTries += 1
        return
      }

      this.setState({ blockNumber: tx.blockNumber, confirmationCount: 0 })
    } else {
      // Get block number
      const blockNumber = await this.props.getBlockNumber()
      if (this.state.confirmationCount < blockNumber - this.state.blockNumber) {
        // Only increment
        this.setState({ confirmationCount: blockNumber - this.state.blockNumber })
      }
    }

    // Get transaction
    const receipt = await this.props.getTransactionReceipt(this.state.transaction.hash)

    // if (receipt.status === 1) {
    //     // Stop
    //     clearInterval(this._confirmingTimer);
    //     this._confirmingTimer = null;
    //     this.setState({ confirming: false });
    //     this.props.getWalletInfo();
    //     return;
    // }

    this.setState({ transactionStatus: receipt.status })
  }

  onTransactionDetail = async () => {
    if (this.state.transaction) {
      this.setState({ sending: false })
      await WebBrowser.openBrowserAsync(TX_EXPLORER_URL + this.state.transaction.hash)
      this.setState({ sending: true })
    }
  }

  onHelp = async () => {
    await WebBrowser.openBrowserAsync('https://haladinar.io')
  }

  render() {
    const styles = this.props.style
    const DepositIcon = ThemeService.getThemeStyle().variables.depositIcon
    const RubyIcon = ThemeService.getThemeStyle().variables.rubyIcon
    const EthereumIcon = ThemeService.getThemeStyle().variables.ethereumIcon
    const VisaIcon = ThemeService.getThemeStyle().variables.visaIcon
    const MasterCardIcon = ThemeService.getThemeStyle().variables.masterCardIcon
    const CheckBoxIcon = ThemeService.getThemeStyle().variables.checkBoxIcon
    const QrBox = ThemeService.getThemeStyle().variables.qrBox

    return (
      <Screen
        title={translate('DEPOSIT')}
        // right={
        //   <Button onPress={this.onHelp}>
        //     <Help height={ThemeService.getThemeStyle().variables.headerHeight - 10} />
        //   </Button>
        // }
      >
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<DepositIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('DEPOSIT')}>
              {false && <Label>{translate('Select wallet to deposit')}</Label>}
              {false && (
                <View smallSpaceTop style={styles.row}>
                  <Button
                    iconLeft
                    toggle
                    active={this.state.depositWallet === UsdtWallet}
                    tinySpaceRight
                    flexFull
                    onPress={() => this.setState({ depositWallet: UsdtWallet })}
                  >
                    <RubyIcon
                      fill={
                        this.state.depositWallet === UsdtWallet
                          ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                          : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                      }
                    />
                    <StyledText>{translate('USDT')}</StyledText>
                  </Button>
                  <Button
                    iconLeft
                    toggle
                    active={this.state.depositWallet === EthereumWallet}
                    tinySpaceLeft
                    flexFull
                    onPress={() => this.setState({ depositWallet: EthereumWallet })}
                  >
                    <EthereumIcon
                      fill={
                        this.state.depositWallet === EthereumWallet
                          ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                          : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                      }
                    />
                    <StyledText>{translate('ETHEREUM')}</StyledText>
                  </Button>
                </View>
              )}
              <Item stackedLabel underline transparent>
                <Label spaceTop>{translate('Choose an amount ({0}) to deposit', this.state.depositWallet)}</Label>
                <View smallSpaceTop smallSpaceBottom row>
                  <Button tiny tinySpaceRight>
                    {this.state.depositWallet}
                  </Button>
                  <Input flexFull keyboardType='numeric' value={this.state.amount} onChangeText={this.onAmountChanged} />
                </View>
              </Item>
              {false && <Label spaceTop>{translate('Select payment method')}</Label>}
              {false && (
                <View smallSpaceTop style={styles.row}>
                  <Button
                    iconLeft
                    toggle
                    active={this.state.paymentMethod === CreditCardPayment}
                    tinySpaceRight
                    flexFull
                    onPress={() => this.setState({ paymentMethod: CreditCardPayment })}
                  >
                    <CreditCardIcon
                      fill={
                        this.state.paymentMethod === CreditCardPayment
                          ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                          : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                      }
                    />
                    <StyledText style={{ left: 40 }}>{translate('Credit Card')}</StyledText>
                  </Button>
                  <Button
                    iconLeft
                    toggle
                    active={this.state.paymentMethod === EthereumPayment}
                    tinySpaceLeft
                    flexFull
                    onPress={() => this.setState({ paymentMethod: EthereumPayment })}
                  >
                    <EthereumIcon
                      fill={
                        this.state.paymentMethod === EthereumPayment
                          ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                          : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                      }
                    />
                    <StyledText>{translate('Ethereum')}</StyledText>
                  </Button>
                </View>
              )}
              {this.state.paymentMethod === CreditCardPayment && (
                <AnimatableView
                  spaceTop
                  useNativeDriver={true}
                  duration={300}
                  animation={this.state.paymentMethod === CreditCardPayment ? 'bounceInRight' : 'bounceInLeft'}
                >
                  <Item stackedLabel underline>
                    <Label>{translate('Card Number')}</Label>
                    <View style={[styles.row]}>
                      <Input tinySpaceRight flexFull />
                      <VisaIcon />
                    </View>
                  </Item>
                  <View spaceTop style={styles.row}>
                    <Item stackedLabel underline tinySpaceRight flexFull>
                      <Label>{translate('Expiry Date')}</Label>
                      <Input />
                    </Item>
                    <Item stackedLabel underline tinySpaceLeft flexFull>
                      <Label>{translate('CVC')}</Label>
                      <Input />
                    </Item>
                  </View>
                  <Button spaceTop checkbox checked={this.state.agreement} flexFull>
                    <CheckBoxIcon
                      fill={
                        this.state.agreement
                          ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                          : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                      }
                      checked={this.state.agreement}
                    />
                    <StyledText>{translate('I agree to Terms and Conditions')}</StyledText>
                  </Button>
                  <View spaceTop style={[styles.row, styles.evenSpace]}>
                    <Button primary tinySpaceRight flexFull disabled={this.state.checking}>
                      {!this.state.checking && <StyledText>{translate('CONFIRM')}</StyledText>}
                      {this.state.checking && <Spinner color='#fff' />}
                    </Button>
                    <Button secondary tinySpaceLeft flexFull>
                      {translate('CANCEL')}
                    </Button>
                  </View>
                </AnimatableView>
              )}
              {this.state.paymentMethod === EthereumPayment && (
                <AnimatableView
                  spaceTop
                  useNativeDriver={true}
                  duration={300}
                  animation={this.state.paymentMethod === EthereumPayment ? 'bounceInLeft' : 'bounceInRight'}
                >
                  <Item stackedLabel underline transparent>
                    <Label>{translate('ETH Amount')}</Label>
                    <Input value={this.state.amountInEth} editable={false} />
                  </Item>
                  {false && (
                    <Item stackedLabel underline spaceTop transparent>
                      <Label>{translate('Send to')}</Label>
                      <Input multiline editable={false} value={this.props.settings.centralWallet} />
                    </Item>
                  )}
                  <Button primary spaceTop onPress={this.onConfirm} disabled={this.state.checking}>
                    {!this.state.checking && <StyledText>{translate('CONFIRM')}</StyledText>}
                    {this.state.checking && <Spinner color='#fff' />}
                  </Button>
                </AnimatableView>
              )}
            </GroupBox>
            {this.state.paymentMethod === CreditCardPayment && (
              <GroupBox spaceTop>
                <StyledText note>{translate('A credit card fee of 4% will be deducted from your account balance')}</StyledText>
              </GroupBox>
            )}
          </Content>
        </Container>
        <TabNavigation />
        <Modal
          isVisible={this.state.sending}
          animationIn='bounceIn'
          animationOut='bounceOut'
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          avoidKeyboard={true}
          backdropOpacity={0.8}
          style={ThemeService.getThemeStyle().modalScreen}
        >
          {this.state.sending && this.state.confirming && (
            <View flexFull flexCenter padder>
              {false && <StyledText white>{translate('Transaction Hash')}</StyledText>}
              {false && this.state.transaction && (
                <StyledText secondary h4 smallSpaceTop spaceBottom bold='bold'>
                  {this.state.transaction.hash}
                </StyledText>
              )}
              {false && <StyledText white>{translate('Confirmation')}</StyledText>}
              {false && (
                <StyledText secondary veryLarge smallSpaceTop spaceBottom bold='bold'>
                  {this.state.confirmationCount}
                </StyledText>
              )}
              {false && <StyledText note>{translate('Please wait for confirmation')}</StyledText>}
              <StyledText white>{translate('Please wait for sending')}</StyledText>
            </View>
          )}
          {this.state.sending && !this.state.confirming && this.state.transaction && (
            <View flexFull flexCenter padder>
              {!this.state.animationEnded && (
                <Lottie
                  style={ThemeService.getThemeStyle().animation}
                  source={require('../../assets/animations/confetti.json')}
                  speed={0.5}
                  autoPlay={true}
                  loop={false}
                  onAnimationFinish={() => this.setState({ animationEnded: true })}
                />
              )}
              {Platform.OS === 'ios' && !this.state.animationEnded && (
                <Lottie
                  style={[ThemeService.getThemeStyle().animation, { height: ThemeService.getThemeStyle().variables.deviceHeight / 2 }]}
                  source={require('../../assets/animations/exploding-ribbon-and-confetti.json')}
                  speed={0.8}
                  autoPlay={true}
                  loop={false}
                />
              )}
              <StyledText pink h3>
                {translate('Send completed!')}
              </StyledText>
              {false && (
                <Button smallSpaceTop spaceBottom small primary onPress={this.onTransactionDetail}>
                  {translate('Transaction detail')}
                </Button>
              )}
              <Button spaceTop spaceBottom thirdary onPress={() => this.setState({ sending: false })}>
                {translate('Close')}
              </Button>
            </View>
          )}
          {this.state.sending && !this.state.confirming && !this.state.transaction && (
            <View flexFull flexCenter padder>
              <StyledText pink h3>
                {translate('Send failed!!!')}
              </StyledText>
              <Button spaceTop spaceBottom thirdary onPress={() => this.setState({ sending: false })}>
                {translate('Close')}
              </Button>
            </View>
          )}
        </Modal>
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  evenSpace: {
    justifyContent: 'space-between',
  },
  alignTop: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
  },
  qrBox: {
    width: 153,
    height: 153,
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const mapStateToProps = (state) => {
  const { wallet, settings } = state
  return { wallet, settings }
}

const mapDispatchToProps = (dispatch) => {
  return {
    convertRate: (from, to, amount) => dispatch(convertRate(from, to, amount)),
    showAlert: (config) => dispatch(showAlert(config)),
    hideAlert: () => dispatch(hideAlert()),
    updateTransaction: (toAddress, amount, unit, description, type, txHash) =>
      dispatch(updateTransaction(toAddress, amount, unit, description, type, txHash)),
    removeTransaction: (txHash) => dispatch(removeTransaction(txHash)),
    sendEth: (toAddress, amount) => dispatch(sendEth(toAddress, amount)),
    getBlockNumber: () => dispatch(getBlockNumber()),
    getTransaction: (id) => dispatch(getTransaction(id)),
    getTransactionReceipt: (id) => dispatch(getTransactionReceipt(id)),
    submitTransaction: (txHash, toAddress, amount, isEth, type) => dispatch(submitTransaction(txHash, toAddress, amount, isEth, type)),
    estimateGas: (to, amount, isToken) => dispatch(estimateGas(to, amount, isToken)),
    getWalletInfo: () => dispatch(getWalletInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Deposit', styles)(DepositScreen))
