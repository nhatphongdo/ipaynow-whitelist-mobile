import React from 'react'
import { Clipboard, FlatList, Platform } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Item, Label, Input, Spinner, Picker } from 'native-base'
import Modal from 'react-native-modal'
import Lottie from 'lottie-react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import '@ethersproject/shims'
import { ethers } from 'ethers'
import numeral from 'numeral'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as WebBrowser from 'expo-web-browser'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import {
  getContacts,
  updateContact,
  removeContact,
  getContactByWalletAddress,
  updateTransaction,
  removeTransaction,
} from '../../stores/storage/actions'
import { loadContacts, uploadContact, deleteContact } from '../../stores/account/actions'
import DropdownAlertService from '../../services/DropdownAlertService'
import {
  sendEth,
  sendToken,
  getBlockNumber,
  getTransactionReceipt,
  getTransaction,
  submitTransaction,
  estimateGas,
  getWalletInfo,
} from '../../stores/wallet/actions'
import { MAXIMUM_TRIES, CONFIRMATION_PERIOD, CONFIRMATION_BLOCKS } from '../../stores/wallet/constants'
import { SEND_ETH, SEND_TOKEN } from '../../stores/storage/constants'
import { TX_EXPLORER_URL } from '../../constants/Constants'
import { formatCrypto, formatCurrency, formatPercentage } from '../../common/helper'
import { convertRate } from '../../stores/rates/actions'
import { USDT, ETH } from '../../stores/rates/constants'
import { EnterPinCode } from '../init/PinCodeScreen'

class SendScreen extends React.Component {
  _confirmingTimer = null
  _confirmingTries = 0

  _swipeRows = {}

  state = {
    wallet: USDT,
    recipient: '',
    amount: '',
    description: '',
    currency: '',

    scanning: false,
    scanned: true,

    pickingUser: false,
    contactName: '',
    contactID: '',
    contactWalletAddress: '',
    editingContact: 0, // 0: none, 1: adding, 2: editing
    editingContactName: '',
    editingContactID: '',
    editingContactWalletAddress: '',

    checking: false,

    sending: false,
    confirming: false,
    confirmationCount: 0,
    transaction: null,
    transactionStatus: null,
    blockNumber: 0,

    saving: false,

    animationEnded: false,
  }

  componentDidMount() {
    this._bootstrap()
  }

  componentWillUnmount() {
    if (this._confirmingTimer) {
      clearInterval(this._confirmingTimer)
      this._confirmingTimer = null
    }
  }

  _bootstrap = async () => {
    this.setState({ currency: this.props.settings.currency })
    // if (this.props.storage.contacts.length === 0) {
    //   await this.props.getContacts();
    // }
    await this.props.loadContacts()
  }

  onChooseFromList = async () => {
    this.setState({ pickingUser: true })
  }

  onPaste = async () => {
    const content = await Clipboard.getString()
    this.setState({
      recipient: content,
    })
  }

  onScan = async () => {
    let permission = await Permissions.getAsync(Permissions.CAMERA)
    if (permission.status === 'granted') {
      this.setState({ scanning: true, scanned: false })
    } else {
      permission = await Permissions.askAsync(Permissions.CAMERA)
      if (permission.status === 'granted') {
        this.setState({ scanning: true, scanned: false })
      } else {
        DropdownAlertService.show(
          DropdownAlertService.ERROR,
          translate('Error'),
          translate('You must approve CAMERA permission to allow application to scan QR code')
        )
      }
    }
  }

  onCurrencyChanged = async () => {
    let amount = ''
    let amountValue = numeral(this.state.amount)
    if (isNaN(amountValue.value()) || amountValue.value() === null) {
      amount = this.state.amount
    } else {
      if ([USDT, ETH].indexOf(this.state.currency) >= 0) {
        amount = formatCurrency(await this.props.convertRate(this.state.currency, this.props.settings.currency, amountValue.value()))
      } else {
        amount = formatCrypto(await this.props.convertRate(this.state.currency, this.state.wallet, amountValue.value()))
      }
    }

    if ([USDT, ETH].indexOf(this.state.currency) >= 0) {
      this.setState({ currency: this.props.settings.currency, amount })
    } else {
      this.setState({ currency: this.state.wallet, amount })
    }
  }

  onMax = async () => {
    let amount = ''
    if (this.state.currency === USDT) {
      amount = formatCrypto(this.props.wallet.tokenBalance)
    } else if (this.state.currency === ETH) {
      amount = formatCrypto(this.props.wallet.ethBalance)
    } else {
      amount = formatCurrency(
        await this.props.convertRate(
          this.state.wallet,
          this.state.currency,
          this.state.wallet === ETH ? this.props.wallet.ethBalance : this.props.wallet.tokenBalance
        ),
        this.props.settings.culture,
        this.props.settings.currency,
        false
      )
    }
    this.setState({ amount })
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanning: false, scanned: true })
    if (data) {
      const parts = data.split(/[:?]/)
      if (parts.length === 1) {
        this.setState({ recipient: parts[0] })
      } else {
        for (let i = 2; i < parts.length; i++) {
          const params = parts[i].split('=')
          if (params.length === 2 && params[0].toLowerCase() === 'value') {
            this.setState({ recipient: parts[1], amount: params[1], currency: this.state.wallet })
            return
          }
        }
        this.setState({ recipient: parts[1] })
      }
    }
  }

  _keyExtractor = (item, index) => 'key_' + index.toString()

  onRowOpen = (item) => {
    for (let key in this._swipeRows) {
      if (key !== item && this._swipeRows[key]) {
        this._swipeRows[key].closeRow()
      }
    }
  }

  _renderContactItem = ({ item, index }) => (
    <SwipeRow
      ref={(ref) => (this._swipeRows[this._keyExtractor(item, index)] = ref)}
      rightOpenValue={-200}
      disableRightSwipe={true}
      preview={index === 0 ? true : false}
      onRowOpen={() => this.onRowOpen(this._keyExtractor(item, index))}
    >
      <View row style={{ width: 200, alignSelf: 'flex-end' }}>
        <Button success flexFull onPress={() => this.onEditContact(this._keyExtractor(item, index), item)}>
          {translate('Edit')}
        </Button>
        <Button danger flexFull onPress={() => this.onDeleteContact(this._keyExtractor(item, index), item)}>
          {translate('Remove')}
        </Button>
      </View>
      <Button listItem alignLeft onPress={() => this.onSelectContact(item)}>
        <StyledText bold='medium'>{`${item.name} <color ${ThemeService.getThemeStyle().variables.brandPrimary}>(${item.userId})</color>`}</StyledText>
        <StyledText note>{item.walletAddress}</StyledText>
      </Button>
    </SwipeRow>
  )

  onSelectContact = (contact) => {
    this.setState({ recipient: contact.walletAddress, pickingUser: false })
  }

  closeRows = () => {
    for (let key in this._swipeRows) {
      if (this._swipeRows[key]) {
        this._swipeRows[key].closeRow()
      }
    }
  }

  onDeleteContact = async (key, contact) => {
    // this.props.removeContact(contact.walletAddress);
    this.closeRows()
    await this.props.deleteContact(contact.walletAddress)
  }

  onEditContact = (key, contact) => {
    // this.props.removeContact(contact.walletAddress);
    this.closeRows()
    this.setState({
      editingContact: 1,
      editingContactName: contact.name,
      editingContactID: '',
      editingContactWalletAddress: contact.walletAddress,
    })
  }

  onSend = async () => {
    // Validate
    if (!this.state.recipient) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate("You must input the Recipient's Address or ID"))
      return
    }
    if (!this.state.amount) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('You must input the Amount to send'))
      return
    }

    let address = this.state.recipient.trim()
    // Assume this is user id, let's find the corresponding wallet address
    let records = await this.props.getContacts(address)
    if (records.length > 0) {
      address = records[0].walletAddress
    }

    try {
      // Try to convert to valid ETH address
      address = ethers.utils.getAddress(address)
      // Get saved contact
      records = await this.props.getContactByWalletAddress(address)
      if (records.length > 0) {
        this.setState({
          contactName: records[0].name,
          contactID: records[0].userId,
          contactWalletAddress: address,
        })
      } else {
        this.setState({
          contactName: '',
          contactID: '',
          contactWalletAddress: address,
        })
      }
    } catch (err) {
      console.log(err)
      // This is not valid address
      DropdownAlertService.show(
        DropdownAlertService.ERROR,
        translate('Error'),
        translate("You must input the valid Recipient's Address or existing ID")
      )
      return
    }
    if (address.toLowerCase() === this.props.wallet.cryptoAddress.toLowerCase()) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('You cannot send to yourself'))
      return
    }

    let amountValue = numeral(this.state.amount)
    if (isNaN(amountValue.value()) || amountValue.value() === null || amountValue.value() <= 0) {
      // This is not valid amount
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('You must input the valid Amount'))
      return
    }
    // Convert to token
    if ([USDT, ETH].indexOf(this.state.currency) < 0) {
      amountValue = numeral(await this.props.convertRate(this.state.currency, this.state.wallet, amountValue.value()))
    }

    this.setState({ checking: true })
    // Estimate gas
    const gas = await this.props.estimateGas(address, amountValue.format('0.000000000000000000'), this.state.wallet !== ETH)

    const maxValue = this.state.wallet === ETH ? this.props.wallet.ethBalance + gas : this.props.wallet.tokenBalance
    if (amountValue.value() > maxValue) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Insufficient balance to send'))
      this.setState({ checking: false })
      return
    }

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
            this.send(address, amountValue)
          }, 1000)
        },
      })
    } else {
      await this.send(address, amountValue)
    }
  }

  send = async (address, amountValue) => {
    // Send
    this.setState({
      sending: true,
      confirming: true,
      confirmationCount: 0,
      animationEnded: false,
    })
    const transaction =
      this.state.wallet === ETH
        ? await this.props.sendEth(address, amountValue.format('0.000000000000000000'))
        : await this.props.sendToken(address, amountValue.format('0.000000000000000000'))
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
      amountValue.value(),
      this.state.wallet,
      this.state.description,
      this.state.wallet === ETH ? SEND_ETH : SEND_TOKEN,
      transaction.result.hash
    )

    // Submit transaction to server
    const sendResult = await this.props.submitTransaction(transaction.result.hash, address, amountValue.value(), false)

    // Wait for confirmation
    const blockNumber = 0 // await this.props.getBlockNumber();
    this.setState(
      {
        transaction: transaction.result,
        transactionStatus: null,
        blockNumber,
        contactID: !sendResult.error && sendResult.result.receiver ? sendResult.result.receiver : '',
        confirming: false,
      },
      () => {
        // this._confirmingTries = 0;
        // this._confirmingTimer = setInterval(this.confirmingHandler, CONFIRMATION_PERIOD);
      }
    )
  }

  onCancel = () => {
    this.setState({
      recipient: '',
      amount: '',
      description: '',
    })
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

  onComplete = async () => {
    this.setState({ saving: true })

    // Save contact to database
    if (this.state.contactName) {
      await this.props.uploadContact(this.state.contactName, this.state.contactWalletAddress)
    }

    this.onCancel()

    // Finish
    this.setState({
      sending: false,
      saving: false,
      transaction: null,
    })
  }

  onTransactionDetail = async () => {
    if (this.state.transaction) {
      this.setState({ sending: false })
      await WebBrowser.openBrowserAsync(TX_EXPLORER_URL + this.state.transaction.hash)
      this.setState({ sending: true })
    }
  }

  onCloseContact = () => {
    if (this.state.editingContact === 0) {
      this.setState({ pickingUser: false })
    } else {
      this.setState({
        editingContact: 0,
        editingContactName: '',
        editingContactID: '',
        editingContactWalletAddress: '',
      })
    }
  }

  onAddContact = async () => {
    if (this.state.editingContact === 0) {
      this.setState({
        editingContact: 1,
        editingContactName: '',
        editingContactID: '',
        editingContactWalletAddress: '',
      })
    } else {
      // Update
      this.setState({ saving: true })
      await this.props.uploadContact(this.state.editingContactName, this.state.editingContactWalletAddress)
      this.setState({ saving: false })
      this.onCloseContact()
    }
  }

  onWalletChange(value) {
    this.setState({
      wallet: value,
    })
  }

  render() {
    const styles = this.props.style
    const SendIcon = ThemeService.getThemeStyle().variables.sendIcon
    const DropdownIcon = ThemeService.getThemeStyle().variables.dropdownIcon

    return (
      <Screen title={translate('SEND')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<SendIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('SEND')}>
              <Item stackedLabel underline transparent>
                <Label>{translate("Recipient's Address or ID")}</Label>
                <Input multiline value={this.state.recipient} onChangeText={(text) => this.setState({ recipient: text })} />
              </Item>
              <View tinySpaceTop style={styles.row}>
                <Button tiny onPress={this.onChooseFromList}>
                  {translate('Choose from list')}
                </Button>
                <Button tiny style={[styles.right, styles.first]} onPress={this.onPaste}>
                  {translate('Paste')}
                </Button>
                <Button tiny style={styles.right} onPress={this.onScan}>
                  {translate('Scan')}
                </Button>
              </View>
              <View row spaceTop center>
                <Label>{translate('Wallet')}</Label>
                {Platform.OS === 'android' && (
                  <View
                    largeSpaceLeft
                    style={{
                      borderRadius: ThemeService.getThemeStyle().variables.buttonBorderRadius,
                      backgroundColor: {
                        'colorful-light': '#191660',
                        'colorful-dark': '#d5a3ff',
                        'simple-light': '#ffffff',
                        'simple-dark': '#15bdd8',
                      }['simple-light'],
                      flexDirection: 'row',
                      elevation: 6,
                      width: 120,
                      minHeight: ThemeService.getThemeStyle().variables.buttonHeight,
                    }}
                  >
                    <Picker
                      mode='dialog'
                      style={{
                        flex: 1,
                        marginHorizontal: ThemeService.getThemeStyle().variables.buttonHorizontalPadding,
                      }}
                      selectedValue={this.state.wallet}
                      onValueChange={this.onWalletChange.bind(this)}
                    >
                      {[USDT, ETH].map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                      ))}
                    </Picker>
                  </View>
                )}
                {Platform.OS === 'ios' && (
                  <Picker
                    shadow
                    largeSpaceLeft
                    mode='dialog'
                    style={{ width: 120 }}
                    iosHeader={translate('Select wallet')}
                    iosIcon={<DropdownIcon />}
                    textStyle={{ textAlign: 'left' }}
                    headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                    headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                    itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                    selectedValue={this.state.wallet}
                    onValueChange={this.onWalletChange.bind(this)}
                  >
                    {[USDT, ETH].map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                )}
              </View>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{`${translate('Amount')} (${this.state.currency})`}</Label>
                <View smallSpaceTop smallSpaceBottom style={styles.row}>
                  <Button tiny tinySpaceRight onPress={this.onCurrencyChanged}>
                    {this.state.currency}
                  </Button>
                  <Input flexFull keyboardType='numeric' value={this.state.amount} onChangeText={(text) => this.setState({ amount: text })} />
                  <Button tiny tinySpaceLeft onPress={this.onMax}>
                    {translate('Max')}
                  </Button>
                </View>
              </Item>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{translate('Description')}</Label>
                <Input multiline value={this.state.description} onChangeText={(text) => this.setState({ description: text })} />
              </Item>
              <View spaceTop style={[styles.row, styles.evenSpace]}>
                <Button primary tinySpaceRight flexFull disabled={this.state.checking || this.state.sending} onPress={this.onSend}>
                  {!this.state.sending && !this.state.checking && <StyledText>{translate('SEND')}</StyledText>}
                  {(this.state.sending || this.state.checking) && <Spinner color='#fff' />}
                </Button>
                <Button secondary tinySpaceLeft flexFull onPress={this.onCancel}>
                  {translate('CANCEL')}
                </Button>
              </View>
            </GroupBox>
            {/* <GroupBox spaceTop>
              <StyledText note>
                {translate("Every send will get a rebate of {0} as rewards Eg USD 10 sent will get rewards of {1}", [
                  formatPercentage(this.props.settings.rewardRebateRate),
                  formatCurrency(this.props.settings.rewardRebateRate * 10, this.props.settings.culture, "", false)
                ])}
              </StyledText>
            </GroupBox> */}
          </Content>
        </Container>
        <TabNavigation />
        <Modal
          isVisible={this.state.scanning || this.state.pickingUser || this.state.sending}
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
          {this.state.pickingUser && (
            <View flexFull>
              <View row spaceTop smallSpaceBottom={this.state.editingContact === 0}>
                <Button spaceLeft primary flexFull onPress={this.onAddContact} disabled={this.state.saving}>
                  {!this.state.saving && <StyledText>{this.state.editingContact === 0 ? translate('Add') : translate('Save')}</StyledText>}
                  {this.state.saving && <Spinner color='#fff' />}
                </Button>
                <Button spaceLeft spaceRight thirdary flexFull onPress={this.onCloseContact}>
                  {this.state.editingContact === 0 ? translate('Close') : translate('Cancel')}
                </Button>
              </View>
              {this.state.editingContact > 0 && (
                <View padder>
                  <Item regular shadow smallSpaceTop>
                    <Input
                      placeholder={translate('Contact Name')}
                      value={this.state.editingContactName}
                      onChangeText={(text) => this.setState({ editingContactName: text })}
                    />
                  </Item>
                  <Item regular shadow smallSpaceTop>
                    <Input
                      multiline
                      large
                      placeholder={translate('Contact Wallet Address')}
                      value={this.state.editingContactWalletAddress}
                      onChangeText={(text) => this.setState({ editingContactWalletAddress: text })}
                    />
                  </Item>
                </View>
              )}
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                ref={(c) => (this._flatList = c)}
                data={this.props.storage.contacts}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderContactItem}
              />
            </View>
          )}
          {this.state.scanning && (
            <View flexCenter flexFull>
              <BarCodeScanner
                onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                style={ThemeService.getThemeStyle().qrScanner}
              />
              <Button thirdary center spaceTop spaceBottom onPress={() => this.setState({ scanning: false, scanned: true })}>
                {translate('Cancel')}
              </Button>
            </View>
          )}
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
              <StyledText white spaceTop bold='medium'>
                {translate('Name this address for quickly access')}
              </StyledText>
              <Label white spaceTop>
                {translate('Name')}
              </Label>
              <Input
                stretch
                alignCenter
                spaceLeft
                spaceRight
                value={this.state.contactName}
                onChangeText={(text) => this.setState({ contactName: text })}
              />
              {/* <Label spaceTop>
                {translate("User ID")} ({translate("optional")})
              </Label>
              <Input
                stretch
                underline
                white
                alignCenter
                spaceLeft
                spaceRight
                value={this.state.contactID}
                onChangeText={text => this.setState({ contactID: text })}
              /> */}
              <Label white spaceTop>
                {translate('Wallet address')}
              </Label>
              <Input multiline stretch alignCenter spaceLeft spaceRight editable={false} value={this.state.contactWalletAddress} />
              <Button spaceTop spaceBottom thirdary onPress={this.onComplete} disabled={this.state.saving}>
                {!this.state.saving && <StyledText>{translate('Complete')}</StyledText>}
                {this.state.saving && <Spinner color='#62C0B3' />}
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
  first: {
    marginLeft: 'auto',
  },
  right: {
    alignSelf: 'flex-end',
  },
  evenSpace: {
    justifyContent: 'space-between',
  },
}

const mapStateToProps = (state) => {
  const { storage, wallet, rates, settings } = state
  return { storage, wallet, rates, settings }
}

const mapDispatchToProps = (dispatch) => {
  return {
    convertRate: (from, to, amount) => dispatch(convertRate(from, to, amount)),
    loadContacts: () => dispatch(loadContacts()),
    uploadContact: (name, walletAddress) => dispatch(uploadContact(name, walletAddress)),
    deleteContact: (walletAddress) => dispatch(deleteContact(walletAddress)),
    getContacts: (userId) => dispatch(getContacts(userId)),
    getContactByWalletAddress: (walletAddress) => dispatch(getContactByWalletAddress(walletAddress)),
    // updateContact: (name, userId, walletAddress) => dispatch(updateContact(name, userId, walletAddress)),
    // removeContact: walletAddress => dispatch(removeContact(walletAddress)),
    updateTransaction: (toAddress, amount, unit, description, type, txHash) =>
      dispatch(updateTransaction(toAddress, amount, unit, description, type, txHash)),
    removeTransaction: (txHash) => dispatch(removeTransaction(txHash)),
    sendEth: (toAddress, amount) => dispatch(sendEth(toAddress, amount)),
    sendToken: (toAddress, amount) => dispatch(sendToken(toAddress, amount)),
    getBlockNumber: () => dispatch(getBlockNumber()),
    getTransaction: (id) => dispatch(getTransaction(id)),
    getTransactionReceipt: (id) => dispatch(getTransactionReceipt(id)),
    submitTransaction: (txHash, toAddress, amount, isEth) => dispatch(submitTransaction(txHash, toAddress, amount, isEth)),
    estimateGas: (to, amount, isToken) => dispatch(estimateGas(to, amount, isToken)),
    getWalletInfo: () => dispatch(getWalletInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Send', styles)(SendScreen))
