import React from 'react'
import { FlatList, Platform } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Input, Spinner } from 'native-base'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from 'rn-placeholder'
import * as WebBrowser from 'expo-web-browser'
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'
import Lottie from 'lottie-react-native'
import '@ethersproject/shims'
import { ethers } from 'ethers'
import numeral from 'numeral'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import AccountCard from '../shared/AccountCard'
import Segment from '../shared/Segment'
import ListItem from '../shared/ListItem'
import StyledText from '../shared/StyledText'
import Button from '../shared/Button'
import BoxShadow from '../shared/BoxShadow'
import { createExchange, getExchanges, withdraw } from '../../stores/market/actions'
import { BUY, SELL, CREDIT_CARD, BANK_TRANSFER, PAYPAL, PAYONEER, BITCOIN, ETHEREUM } from '../../stores/market/constants'
import { updateTransaction } from '../../stores/storage/actions'
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
import { EXCHANGE_SELL_ESCROW } from '../../stores/storage/constants'
import { EnterPinCode } from '../init/PinCodeScreen'
import { showAlert, hideAlert } from '../../stores/alert/actions'
import { formatCurrency, formatCrypto } from '../../common/helper'
import { USDT } from '../../stores/rates/constants'
import { convertRate } from '../../stores/rates/actions'
import { PRIVATE, SHARED, PUBLIC } from '../../stores/account/constants'
import Help from '../../assets/images/Help'

class ExchangeScreen extends React.Component {
  state = {
    width: null,
    height: null,

    exchanges: [null, null, null, null, null],

    tradeExpanded: true,
    amount: '',
    amountFiat: '',

    sending: false,
    confirming: false,
    confirmationCount: 0,
    transaction: null,
    transactionStatus: null,
    blockNumber: 0,
    purchaseId: 0,
    completing: false,

    animationEnded: false,

    withdrawing: false,
  }

  types = [translate('BUY'), translate('SELL')]

  componentDidMount() {
    this._bootstrapAsync()
  }

  componentWillUnmount() {
    if (this._confirmingTimer) {
      clearInterval(this._confirmingTimer)
      this._confirmingTimer = null
    }
  }

  _bootstrapAsync = async () => {
    await this.loadExchanges()
  }

  loadExchanges = async () => {
    // Get exchanges
    this.setState({ exchanges: [null, null, null, null, null] })
    const exchanges = await this.props.getExchanges()
    this.setState({ exchanges })
  }

  onItemPress = async (item) => {
    this.props.navigation.navigate('TradeDetail', { id: item.id })
  }

  onWithdraw = async (item) => {
    this.setState({ withdrawing: true })
    const result = await this.props.withdraw(item.id)
    this.setState({ withdrawing: false })
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
      return
    }

    DropdownAlertService.show(DropdownAlertService.SUCCESS, translate('Success'), translate('Please wait We are sending your HDN back'))
    await this.loadExchanges()
  }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item, index }) => {
    if (!item) {
      return (
        <Placeholder
          Animation={Shine}
          Right={(props) => <PlaceholderMedia isRound={true} style={props.style} />}
          style={{ marginBottom: ThemeService.getThemeStyle().variables.baseSpace }}
        >
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      )
    }

    const CreditCardIcon = ThemeService.getThemeStyle().variables.creditCardPaymentIcon
    const BankIcon = ThemeService.getThemeStyle().variables.bankPaymentIcon
    const PaypalIcon = ThemeService.getThemeStyle().variables.paypalPaymentIcon
    const PayoneerIcon = ThemeService.getThemeStyle().variables.payoneerPaymentIcon
    const BitcoinIcon = ThemeService.getThemeStyle().variables.bitcoinPaymentIcon
    const EthereumIcon = ThemeService.getThemeStyle().variables.ethereumPaymentIcon

    return (
      <ListItem highlight containerStyle={{ marginBottom: ThemeService.getThemeStyle().variables.tinySpace }}>
        <View row flexCenter style={this.props.style.listItem}>
          <StyledText info bold='medium' tinySpaceRight style={{ flex: 1.2 }}>
            {item.user.accountNumber}
          </StyledText>
          <StyledText bold='medium' wrap tinySpaceRight style={[this.props.style.message, { flex: 1.4 }]}>
            {formatCurrency(item.remainAmount)}
          </StyledText>
          {item.user.accountNumber === this.props.account.accountNumber && (
            <Button primary tiny smallSpaceLeft onPress={() => this.onWithdraw(item)} disabled={this.state.withdrawing}>
              {!this.state.withdrawing && <StyledText>{translate('Withdraw')}</StyledText>}
              {this.state.withdrawing && <Spinner size='small' color='#fff' />}
            </Button>
          )}
          {false && (
            <View row flexWrap style={{ flex: 1 }}>
              {item.paymentMethods.indexOf(CREDIT_CARD) >= 0 && <CreditCardIcon style={styles.paymentIcon} />}
              {item.paymentMethods.indexOf(BANK_TRANSFER) >= 0 && <BankIcon style={styles.paymentIcon} />}
              {item.paymentMethods.indexOf(PAYPAL) >= 0 && <PaypalIcon style={styles.paymentIcon} />}
              {item.paymentMethods.indexOf(PAYONEER) >= 0 && <PayoneerIcon style={styles.paymentIcon} />}
              {item.paymentMethods.indexOf(BITCOIN) >= 0 && <BitcoinIcon style={styles.paymentIcon} />}
              {item.paymentMethods.indexOf(ETHEREUM) >= 0 && <EthereumIcon style={styles.paymentIcon} />}
            </View>
          )}
        </View>
      </ListItem>
    )
  }

  onTradeExpand = () => {
    if (!this.state.tradeExpanded) {
      this.setState({ tradeExpanded: true }, () => this.tradeView.zoomIn(300))
    } else {
      this.tradeView.zoomOut(300).then((endState) => this.setState({ tradeExpanded: false }))
    }
  }

  onAmountChanged = async (text) => {
    this.setState({ amount: text })
    let amountFiat = ''
    let amountValue = numeral(text)
    if (!isNaN(amountValue.value()) && amountValue.value()) {
      amountFiat = formatCurrency(await this.props.convertRate(USDT, this.props.settings.currency, amountValue.value()))
    }
    this.setState({ amountFiat })
  }

  onAmountFiatChanged = async (text) => {
    this.setState({ amountFiat: text })
    let amount = ''
    let amountValue = numeral(text)
    if (!isNaN(amountValue.value()) && amountValue.value()) {
      amount = formatCurrency(await this.props.convertRate(this.props.settings.currency, USDT, amountValue.value()))
    }
    this.setState({ amount })
  }

  onBuy = async () => {
    let amountValue = numeral(this.state.amount)
    if (isNaN(amountValue.value()) || amountValue.value() === null || amountValue.value() <= 0) {
      // This is not valid amount
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('You must input the valid Amount'))
      return
    }
    if (this.props.account.availability === PRIVATE || (!this.props.account.email && !this.props.account.contactNumber)) {
      this.props.showAlert({
        title: translate('Warning'),
        message: translate(
          'You must set Availability as Shared or Public and provide your contact information such as Email or Phone number so that seller can connect to you'
        ),
      })
    } else {
      this.buy()
    }
  }

  buy = () => {
    let amountValue = numeral(this.state.amount)
    this.props.showAlert({
      title: translate('Confirm!'),
      message: translate('Do you really want to buy {0}?', formatCurrency(this.state.amount, this.props.settings.culture, USDT)),
      showConfirmButton: true,
      onConfirmPressed: async () => {
        this.props.showAlert({
          title: translate('Wait for processing'),
          showProgress: true,
          closeOnHardwareBackPress: false,
          closeOnTouchOutside: false,
          progressSize: 'large',
          showCancelButton: false,
        })

        const result = await this.props.createExchange(amountValue.value(), BUY)
        this.props.hideAlert()
        if (result.error) {
          DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
          return
        }

        DropdownAlertService.show(
          DropdownAlertService.SUCCESS,
          translate('Success'),
          translate('Your request is sent successfully Please check RUBY TRADE screen to see the request status')
        )

        this.loadExchanges()
      },
    })
  }

  onSell = () => {
    let amountValue = numeral(this.state.amount)
    if (isNaN(amountValue.value()) || amountValue.value() === null || amountValue.value() <= 0) {
      // This is not valid amount
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('You must input the valid Amount'))
      return
    }
    if (
      this.props.account.availability === PRIVATE ||
      (!this.props.account.email && !this.props.account.contactNumber && !this.props.account.paymentInfo)
    ) {
      this.props.showAlert({
        title: translate('Warning'),
        message: translate(
          'You must set Availability as Shared or Public and provide your contact information such as Email or Phone number or Payment information so that buyer can connect to you'
        ),
      })
    } else {
      this.sell()
    }
  }

  sell = () => {
    let amountValue = numeral(this.state.amount)
    this.props.showAlert({
      title: translate('Confirm!'),
      message:
        this.props.settings.exchangeFee <= 0
          ? translate(
              'Do you really want to sell {0}? Your Ruby will be sent to our escrow wallet until they are released to buyer',
              formatCurrency(amountValue.value(), this.props.settings.culture, USDT)
            )
          : translate(
              'Do you really want to sell {0}? Your Ruby will be sent to our escrow wallet until they are released to buyer We charge a service fee as {1} So the total transfered is {2}',
              [
                formatCurrency(amountValue.value(), this.props.settings.culture, USDT),
                formatCurrency(amountValue.value() * this.props.settings.exchangeFee, this.props.settings.culture, USDT),
                formatCurrency(amountValue.value() + amountValue.value() * this.props.settings.exchangeFee, this.props.settings.culture, USDT),
              ]
            ),
      showConfirmButton: true,
      onConfirmPressed: async () => {
        this.props.showAlert({
          title: translate('Wait for processing'),
          showProgress: true,
          closeOnHardwareBackPress: false,
          closeOnTouchOutside: false,
          progressSize: 'large',
          showCancelButton: false,
        })

        // Check limit
        const limitResult = await this.props.createExchange(this.state.amount, SELL)
        if (limitResult.error) {
          this.props.hideAlert()
          DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(limitResult.error))
          return
        }

        // Send to escrow wallet
        const fee = this.props.settings.exchangeFee <= 0 ? 0 : amountValue.value() * this.props.settings.exchangeFee
        amountValue = amountValue.add(fee)
        if (amountValue.value() + fee > this.props.wallet.tokenBalance) {
          this.props.hideAlert()
          DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Insufficient balance to sell'))
          return
        }

        // Estimate gas
        const gas = await this.props.estimateGas(this.props.settings.escrowWallet, amountValue.format('0.000000000000000000'), true)
        if (gas > this.props.wallet.ethBalance) {
          this.props.hideAlert()
          DropdownAlertService.show(
            DropdownAlertService.ERROR,
            translate('Error'),
            translate('Insufficient gas to send You need at least {0} ETH as gas to sell', formatCrypto(gas))
          )
          return
        }

        this.props.hideAlert()

        // Verify pin before send
        if (this.props.settings.alwaysVerifyBeforeSend) {
          this.props.navigation.navigate('PinCode', {
            type: EnterPinCode,
            onEnterSuccess: (pin) => {
              setTimeout(() => {
                this.send(this.props.settings.escrowWallet, amountValue)
              }, 1000)
            },
          })
        } else {
          setTimeout(() => {
            this.send(this.props.settings.escrowWallet, amountValue)
          }, 500)
        }
      },
    })
  }

  send = async (address, amountValue) => {
    // Send
    this.setState({
      sending: true,
      confirming: true,
      confirmationCount: 0,
      animationEnded: false,
    })
    const transaction = await this.props.sendToken(address, amountValue.format('0.000000000000000000'))
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
    await this.props.updateTransaction(address, amountValue.value(), USDT, '', EXCHANGE_SELL_ESCROW, transaction.result.hash)

    // Submit transaction to server
    const sendResult = await this.props.submitTransaction(transaction.result.hash, address, amountValue.value(), false)

    // Wait for confirmation
    const blockNumber = 0 // await this.props.getBlockNumber();
    this.setState(
      {
        transaction: transaction.result,
        transactionStatus: null,
        blockNumber,
        confirming: true,
      },
      () => {
        this._confirmingTries = 0
        this._confirmingTimer = setInterval(this.confirmingHandler, CONFIRMATION_PERIOD)
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
    console.log(receipt)

    if (receipt.status === 1) {
      // Stop
      clearInterval(this._confirmingTimer)
      this._confirmingTimer = null
      this.setState({ confirming: false, transactionStatus: receipt.status })
      this.props.getWalletInfo()
      return
    }

    this.setState({ transactionStatus: receipt.status })
  }

  onComplete = async () => {
    this.setState({ completing: true })
    const result = await this.props.createExchange(this.state.amount, SELL, this.state.transaction.hash)
    this.setState({ sending: false, completing: false })
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
      return
    }

    DropdownAlertService.show(
      DropdownAlertService.SUCCESS,
      translate('Success'),
      translate('Your request is sent successfully Please check RUBY TRADE screen to see the request status')
    )

    this.loadExchanges()
  }

  onLayout(event) {
    if (this.state.width && this.state.height) {
      return
    }

    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    })
  }

  onHelp = async () => {
    await WebBrowser.openBrowserAsync('https://haladinar.io/hdn2/help.html')
  }

  render() {
    const styles = this.props.style
    const ExchangeIcon = ThemeService.getThemeStyle().variables.exchangeIcon
    const ExchangeMoneyIcon = ThemeService.getThemeStyle().variables.exchangeMoneyIcon
    const FilterIcon = ThemeService.getThemeStyle().variables.filterIcon
    const ArrowUp = ThemeService.getThemeStyle().variables.arrowUp
    const ArrowDown = ThemeService.getThemeStyle().variables.arrowDown

    let shadowOpt = {
      width: this.state.width,
      height: this.state.height,
      color: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowColor,
      border: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowRadius,
      opacity: 0.2,
      x: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowOffset.width,
      y: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowOffset.height,
      radius: ThemeService.getThemeStyle().variables.buttonBorderRadius,
      style: {
        position: 'absolute',
      },
    }

    let arrowColor = '#191660'
    if (ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark') {
      arrowColor = '#fff'
    }

    return (
      <Screen
        title={translate('EXCHANGE')}
        // right={
        //   <Button onPress={this.onHelp}>
        //     <Help height={ThemeService.getThemeStyle().variables.headerHeight - 10} />
        //   </Button>
        // }
      >
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard small hideReward hideWallet />
            <GroupBox title={translate('EXCHANGE')} fullHeight>
              <Button noBordered row onPress={this.onTradeExpand}>
                <StyledText flexFull>{translate('I want to exchange')}</StyledText>
                {this.state.tradeExpanded ? <ArrowUp fill={arrowColor} /> : <ArrowDown fill={arrowColor} />}
              </Button>
              {this.state.tradeExpanded && (
                <Animatable.View ref={(ref) => (this.tradeView = ref)} useNativeDriver={true}>
                  <View row center smallSpaceBottom spaceBetween>
                    <View row flexFull tinySpaceRight>
                      {/* {Platform.OS === "android" && <BoxShadow setting={shadowOpt} />} */}
                      <View flexFull>
                        <StyledText h4 center smallSpaceBottom bold='medium'>
                          USDT
                        </StyledText>
                        <Input
                          style={[
                            ThemeService.getThemeStyle()['NativeBase.ViewNB']['.box'],
                            ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'],
                            { height: 50 },
                          ]}
                          placeholder={translate('Amount')}
                          keyboardType='numeric'
                          value={this.state.amount}
                          onChangeText={this.onAmountChanged}
                        />
                      </View>
                    </View>
                    <ExchangeMoneyIcon height={20} style={{ marginTop: 30 }} />
                    <View row flexFull tinySpaceLeft>
                      {/* {Platform.OS === "android" && <BoxShadow setting={shadowOpt} />} */}
                      <View flexFull>
                        <StyledText h4 center smallSpaceBottom bold='medium'>
                          {this.props.settings.currency}
                        </StyledText>
                        <Input
                          style={[
                            ThemeService.getThemeStyle()['NativeBase.ViewNB']['.box'],
                            ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'],
                            { height: 50 },
                          ]}
                          placeholder={translate('Amount')}
                          keyboardType='numeric'
                          value={this.state.amountFiat}
                          onChangeText={this.onAmountFiatChanged}
                        />
                      </View>
                    </View>
                  </View>
                  <View spaceBottom row spaceBetween>
                    <Button thirdary tinySpaceRight flexFull onPress={this.onBuy}>
                      {translate('BUY')}
                    </Button>
                    <Button primary tinySpaceLeft flexFull onPress={this.onSell}>
                      {translate('SELL')}
                    </Button>
                  </View>
                </Animatable.View>
              )}
              <View flexFull separatorTop>
                {/* <View row center>
                  <Segment flexFull data={this.types} onSelectionChanged={this.onSelectionChanged}></Segment>
                  <Button secondary small row>
                    <FilterIcon />
                    <StyledText smallSpaceLeft>{translate("Filter")}</StyledText>
                  </Button>
                </View> */}
                <View box row smallSpaceTop>
                  <StyledText header bold='medium' tinySpaceRight style={{ flex: 1.2 }}>
                    {translate('Advertiser')}
                  </StyledText>
                  <StyledText header bold='medium' tinySpaceRight style={{ flex: 1.4 }}>
                    {translate('Limits')}
                  </StyledText>
                  {/* <StyledText header bold="medium" tinySpaceRight style={{ flex: 0.8 }}>
                    {translate("Price")}
                  </StyledText> */}
                  {/* <StyledText header bold="medium" style={{ flex: 1 }}>
                                        {translate('Detail')}
                                    </StyledText> */}
                </View>
                {!this.state.exchanges ||
                  (this.state.exchanges.length === 0 && (
                    <StyledText spaceTop info h3 center bold='medium'>
                      {translate('There is no item available')}
                    </StyledText>
                  ))}
                {this.state.exchanges && (
                  <FlatList
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    data={this.state.exchanges}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )}
              </View>
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
              <StyledText white>{translate('Processing')}</StyledText>
              <StyledText secondary veryLarge smallSpaceTop spaceBottom bold='bold'>
                {this.state.confirmationCount}/{CONFIRMATION_BLOCKS}
              </StyledText>
              {false && <StyledText note>{translate('Please wait for confirmation')}</StyledText>}
              <StyledText white>
                {translate('Sending Ruby to Escrow Wallet Please do not manually stop this sending into blockchain Please wait')}
              </StyledText>
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
              <Button spaceTop spaceBottom thirdary onPress={this.onComplete} disabled={this.state.completing}>
                {!this.state.completing && <StyledText>{translate('Close')}</StyledText>}
                {this.state.completing && <Spinner color='#62C0B3' />}
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
    flex: 1,
  },
  list: {
    flex: 1,
  },
}

const mapStateToProps = (state) => {
  const { settings, wallet, storage, market, account } = state
  return { settings, wallet, storage, market, account }
}

const mapDispatchToProps = (dispatch) => {
  return {
    convertRate: (from, to, amount) => dispatch(convertRate(from, to, amount)),
    showAlert: (config) => dispatch(showAlert(config)),
    hideAlert: () => dispatch(hideAlert()),
    createExchange: (amount, type, txHash) => dispatch(createExchange(amount, type, txHash)),
    getExchanges: () => dispatch(getExchanges()),
    updateTransaction: (toAddress, amount, unit, description, type, txHash) =>
      dispatch(updateTransaction(toAddress, amount, unit, description, type, txHash)),
    sendToken: (toAddress, amount) => dispatch(sendToken(toAddress, amount)),
    getBlockNumber: () => dispatch(getBlockNumber()),
    getTransaction: (id) => dispatch(getTransaction(id)),
    getTransactionReceipt: (id) => dispatch(getTransactionReceipt(id)),
    submitTransaction: (txHash, toAddress, amount, isEth) => dispatch(submitTransaction(txHash, toAddress, amount, isEth)),
    estimateGas: (to, amount, isToken) => dispatch(estimateGas(to, amount, isToken)),
    getWalletInfo: () => dispatch(getWalletInfo()),
    withdraw: (id) => dispatch(withdraw(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Exchange', styles)(ExchangeScreen))
