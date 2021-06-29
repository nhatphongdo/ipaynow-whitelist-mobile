import React from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Label, Spinner } from 'native-base'
import Modal from 'react-native-modal'
import * as WebBrowser from 'expo-web-browser'
import Lottie from 'lottie-react-native'
import '@ethersproject/shims'
import { ethers } from 'ethers'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import { updateTransaction, removeTransaction } from '../../stores/storage/actions'
import { REWARD, USDT } from '../../stores/rates/constants'
import DropdownAlertService from '../../services/DropdownAlertService'
import {
  sendToken,
  getBlockNumber,
  getTransactionReceipt,
  getTransaction,
  submitTransaction,
  estimateGas,
  getWalletInfo,
} from '../../stores/wallet/actions'
import { MAXIMUM_TRIES, CONFIRMATION_PERIOD, CONFIRMATION_BLOCKS } from '../../stores/wallet/constants'
import { BUY_REWARD } from '../../stores/storage/constants'
import { TX_EXPLORER_URL } from '../../constants/Constants'
import { formatCurrency, formatReward, formatCrypto } from '../../common/helper'
import { showAlert, hideAlert } from '../../stores/alert/actions'
import { getRewardInfo } from '../../stores/rewards/actions'
import { convertRateSync } from '../../stores/rates/actions'
import { EnterPinCode } from '../init/PinCodeScreen'

class BuyRewardScreen extends React.Component {
  _confirmingTimer = null
  _confirmingTries = 0

  state = {
    selectedOption: 0,

    checking: false,

    sending: false,
    confirming: false,
    confirmationCount: 0,
    transaction: null,
    transactionStatus: null,
    blockNumber: 0,

    animationEnded: false,
  }

  onConfirm = async () => {
    if (this.state.selectedOption <= 0) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('You must select an option to Buy Reward'))
      return
    }
    if (this.state.selectedOption > this.props.wallet.tokenBalance) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Insufficient balance to send'))
      return
    }

    this.props.showAlert({
      title: translate('Confirm!'),
      message: translate('Do you really want to buy {0} Reward with {1} Ruby?', [
        formatReward(convertRateSync(this.props.rates.rates, USDT, REWARD, this.state.selectedOption * this.props.settings.buyRewardRatio)),
        formatCrypto(this.state.selectedOption),
      ]),
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
        const gas = await this.props.estimateGas(address, this.state.selectedOption.toString())
        if (gas > this.props.wallet.ethBalance) {
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
                this.send(address)
              }, 1000)
            },
          })
        } else {
          await this.send(address)
        }
      },
    })
  }

  send = async (address) => {
    // Send
    this.setState({
      sending: true,
      confirming: true,
      transaction: null,
      confirmationCount: 0,
      animationEnded: false,
    })
    const transaction = await this.props.sendToken(address, this.state.selectedOption.toString())
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
      this.state.selectedOption,
      'USDT',
      `${translate('Buy')} ${formatReward(
        convertRateSync(this.props.rates.rates, USDT, REWARD, this.state.selectedOption * this.props.settings.buyRewardRatio)
      )} ${translate('REWARD')}`,
      BUY_REWARD,
      transaction.result.hash
    )

    // Submit transaction to server
    const sendResult = await this.props.submitTransaction(transaction.result.hash, address, this.state.selectedOption, false, 'Buy Reward')

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
      this.props.getRewardInfo()
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
    //     this.props.getRewardInfo();
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

  render() {
    const styles = this.props.style
    const BuyRewardIcon = ThemeService.getThemeStyle().variables.buyRewardIcon

    return (
      <Screen title={translate('BUY REWARDS')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<BuyRewardIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('BUY REWARDS')}>
              <Label>{translate('Select an amount to buy')}</Label>
              <View smallSpaceTop style={styles.list}>
                {this.props.settings.buyRewardOptions.map((item, index) => (
                  <Button
                    key={index}
                    primary={this.state.selectedOption === item}
                    thirdary={this.state.selectedOption !== item}
                    style={[
                      styles.button,
                      (ThemeService.getThemeStyle().name === 'simple-dark' || ThemeService.getThemeStyle().name === 'simple-light') &&
                      this.state.selectedOption !== item
                        ? styles.unselectedButton
                        : styles.selectedButton,
                    ]}
                    onPress={() => this.setState({ selectedOption: item })}
                  >
                    <StyledText
                      h3
                      tinySpaceTop
                      style={[styles.name, styles.center, this.state.selectedOption === item ? styles.selectedName : {}]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {formatCurrency(item, this.props.settings.culture, USDT)}
                    </StyledText>
                    <StyledText
                      tinySpaceBottom
                      style={[styles.interest, styles.center, this.state.selectedOption === item ? styles.selectedInterest : {}]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {formatCurrency(
                        convertRateSync(this.props.rates.rates, USDT, REWARD, item * this.props.settings.buyRewardRatio),
                        this.props.settings.culture,
                        REWARD
                      )}
                    </StyledText>
                  </Button>
                ))}
              </View>
              <Button primary spaceTop onPress={this.onConfirm} disabled={this.state.checking}>
                {!this.state.checking && <StyledText>{translate('CONFIRM')}</StyledText>}
                {this.state.checking && <Spinner color='#fff' />}
              </Button>
            </GroupBox>
            <GroupBox spaceTop>
              <StyledText note>{translate('Please note you must have ETH to perform this action')}</StyledText>
            </GroupBox>
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
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}

const mapStateToProps = (state) => {
  const { wallet, settings, rates } = state
  return { wallet, settings, rates }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (config) => dispatch(showAlert(config)),
    hideAlert: () => dispatch(hideAlert()),
    updateTransaction: (toAddress, amount, unit, description, type, txHash) =>
      dispatch(updateTransaction(toAddress, amount, unit, description, type, txHash)),
    removeTransaction: (txHash) => dispatch(removeTransaction(txHash)),
    sendToken: (toAddress, amount) => dispatch(sendToken(toAddress, amount)),
    getBlockNumber: () => dispatch(getBlockNumber()),
    getTransaction: (id) => dispatch(getTransaction(id)),
    getTransactionReceipt: (id) => dispatch(getTransactionReceipt(id)),
    submitTransaction: (txHash, toAddress, amount, isEth, type) => dispatch(submitTransaction(txHash, toAddress, amount, isEth, type)),
    getRewardInfo: () => dispatch(getRewardInfo()),
    estimateGas: (to, amount, isToken) => dispatch(estimateGas(to, amount, isToken)),
    getWalletInfo: () => dispatch(getWalletInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.BuyReward', styles)(BuyRewardScreen))
