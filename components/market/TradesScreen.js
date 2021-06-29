import React from 'react'
import * as Notifications from 'expo-notifications'
import { FlatList, Platform } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View } from 'native-base'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from 'rn-placeholder'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import AccountCard from '../shared/AccountCard'
import Search from '../shared/Search'
import Segment from '../shared/Segment'
import ListItem from '../shared/ListItem'
import { getTrades, approve, reject } from '../../stores/market/actions'
import Button from '../shared/Button'
import StyledText from '../shared/StyledText'
import DropdownAlertService from '../../services/DropdownAlertService'
import { showAlert, hideAlert } from '../../stores/alert/actions'
import { formatCurrency } from '../../common/helper'
import { USDT } from '../../stores/rates/constants'
import {
  PENDING,
  SENT_TO_SELLER,
  WAIT_FOR_SELLER_APPROVAL,
  WAIT_FOR_PAYMENT,
  PAID_WAIT_FOR_CONFIRMATION,
  SENDING_TO_BUYER,
  COMPLETED,
  REJECTED,
  NO_PAYMENT,
  NO_TOKEN,
  CANCEL_PAYMENT,
  CANCELLED,
} from '../../stores/market/constants'
import { convertRate } from '../../stores/rates/actions'

class TradesScreen extends React.Component {
  state = {
    trades: [null, null, null, null, null],
    status: 'pending',
    token: USDT,
  }

  groups = [translate('REQUEST'), translate('PAYMENT'), translate('COMPLETED')]

  componentWillMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    await this.loadTrades()

    this._notificationSubscription = Notifications.addNotificationReceivedListener(this._handleNotification)
  }

  componentWillUnmount() {
    if (this._notificationSubscription) {
      this._notificationSubscription.remove()
      this._notificationSubscription = null
    }
  }

  _handleNotification = async (notification) => {
    if (notification.origin === 'received' && notification.data.id) {
      this.loadTrades()
    }
  }

  loadTrades = async () => {
    // Get trades
    this.setState({ trades: [null, null, null, null, null] })
    const trades = await this.props.getTrades(this.state.status)
    if (trades.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(trades.error))
      this.setState({ trades: [] })
      return
    }

    for (let i = 0; i < trades.result.length; i++) {
      trades.result[i].amountFiat = await this.props.convertRate(this.state.token, this.props.settings.currency, trades.result[i].amount)
    }

    this.setState({ trades: trades.result })
  }

  onApprove = async (item) => {
    let message = ''
    if ((item.status === PENDING || item.status === SENT_TO_SELLER || item.status === WAIT_FOR_SELLER_APPROVAL) && item.selling) {
      message = translate('Do you really want to accept selling {0} to user {1}?', [
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.buyer.accountNumber,
      ])
    } else if ((item.status === PENDING || item.status === SENT_TO_SELLER || item.status === WAIT_FOR_SELLER_APPROVAL) && !item.selling) {
      message = translate('Do you really want to cancel buying {0} from user {1}?', [
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.seller.accountNumber,
      ])
    } else if (item.status === WAIT_FOR_PAYMENT && !item.selling) {
      message = translate('Do you really want to confirm that you already paid {0} to user {1} for buying {2}?', [
        formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
        item.seller.accountNumber,
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
      ])
    } else if (item.status === WAIT_FOR_PAYMENT && item.selling) {
      message = translate('Do you really want to cancel selling {0} to user {1}?', [
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.buyer.accountNumber,
      ])
    } else if ((item.status === PAID_WAIT_FOR_CONFIRMATION && item.selling) || (item.status === NO_PAYMENT && item.selling)) {
      message = translate('Do you really want to confirm that you already received {0} for buying {1} from user {2}?', [
        formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.buyer.accountNumber,
      ])
    } else if ((item.status === SENDING_TO_BUYER && !item.selling) || (item.status === NO_TOKEN && !item.selling)) {
      message = translate('Do you really want to confirm that you already received {0} from user {1}?', [
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.seller.accountNumber,
      ])
    }
    this.props.showAlert({
      title: translate('Confirm!'),
      message: message,
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

        const result = await this.props.approve(item.id, item.status)
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

        this.loadTrades()
      },
    })
  }

  onReject = async (item) => {
    let message = ''
    if ((item.status === PENDING || item.status === SENT_TO_SELLER || item.status === WAIT_FOR_SELLER_APPROVAL) && item.selling) {
      message = translate('Do you really want to reject selling {0} to user {1}?', [
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.buyer.accountNumber,
      ])
    } else if (item.status === WAIT_FOR_PAYMENT && !item.selling) {
      message = translate('Do you really want to confirm that you reject to pay {0} to user {1} for buying {2}?', [
        formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
        item.seller.accountNumber,
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
      ])
    } else if (item.status === PAID_WAIT_FOR_CONFIRMATION && item.selling) {
      message = translate('Do you really want to confirm that you did not receive {0} for buying {1} from user {2}?', [
        formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.buyer.accountNumber,
      ])
    } else if (item.status === SENDING_TO_BUYER && !item.selling) {
      message = translate('Do you really want to confirm that you did not receive {0} from user {1}?', [
        formatCurrency(item.amount, this.props.settings.culture, this.state.token),
        item.buyer.accountNumber,
      ])
    }
    this.props.showAlert({
      title: translate('Confirm!'),
      message: message,
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

        const result = await this.props.reject(item.id, item.status)
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

        this.loadTrades()
      },
    })
  }

  onTrade = async (item) => {
    this.props.navigation.navigate('TradeDetail', { id: item.id })
  }

  _keyExtractor = (item, index) => index.toString()

  _floatBar = (item) => {
    const Hexagon = ThemeService.getThemeStyle().variables.hexagon

    return (
      <View row>
        <Button
          normal
          shadow
          style={{
            alignSelf: 'center',
            marginHorizontal: ThemeService.getThemeStyle().variables.tinySpace,
            backgroundColor: '#fff',
          }}
          onPress={() => this.onTrade(item)}
        >
          {/* <Hexagon colors={["#ff5b7f", "#fc9970"]} fill="url(#prefix__c)" height={60} onPress={() => this.onReject(item)} /> */}
          <StyledText
            h4
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              // position: "absolute",
              color: '#81D8D0',
              lineHeight: 40,
              // width: 60,
              textAlign: 'center',
              fontFamily: ThemeService.getThemeStyle().variables.fontFamilyBold,
              textDecorationLine: 'none',
            }}
          >
            {translate('INFO')}
          </StyledText>
        </Button>
        {item.status !== NO_PAYMENT &&
          item.status !== NO_TOKEN &&
          !((item.status === PENDING || item.status === SENT_TO_SELLER || item.status === WAIT_FOR_SELLER_APPROVAL) && !item.selling) &&
          !(item.status === WAIT_FOR_PAYMENT && item.selling) && (
            <Button
              normal
              shadow
              style={{
                alignSelf: 'center',
                backgroundColor: '#ff5b7f',
                marginHorizontal: ThemeService.getThemeStyle().variables.tinySpace,
              }}
              onPress={() => this.onReject(item)}
            >
              {/* <Hexagon colors={["#ff5b7f", "#fc9970"]} fill="url(#prefix__c)" height={60} onPress={() => this.onReject(item)} /> */}
              <StyledText
                h4
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  // position: "absolute",
                  color: '#fff',
                  lineHeight: 40,
                  // width: 60,
                  textAlign: 'center',
                  fontFamily: ThemeService.getThemeStyle().variables.fontFamilyBold,
                  textDecorationLine: 'none',
                }}
              >
                {translate('NO')}
              </StyledText>
            </Button>
          )}
        <Button
          normal
          shadow
          style={{
            alignSelf: 'center',
            backgroundColor: '#00e6b4',
            marginHorizontal: ThemeService.getThemeStyle().variables.tinySpace,
          }}
          onPress={() => this.onApprove(item)}
        >
          {/* <Hexagon colors={["#00e6b4", "#18c9e3"]} fill="url(#prefix__c)" height={60} onPress={() => this.onApprove(item)} /> */}
          <StyledText
            h4
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              // position: "absolute",
              color: '#fff',
              lineHeight: 40,
              // width: 45,
              textAlign: 'center',
              fontFamily: ThemeService.getThemeStyle().variables.fontFamilyBold,
              textDecorationLine: 'none',
            }}
          >
            {((item.status === PENDING || item.status === SENT_TO_SELLER || item.status === WAIT_FOR_SELLER_APPROVAL) && !item.selling) ||
            (item.status === WAIT_FOR_PAYMENT && item.selling)
              ? translate('ABORT')
              : translate('YES')}
          </StyledText>
        </Button>
      </View>
    )
  }

  _renderItem = ({ item, index }) => {
    const styles = this.props.style
    if (!item) {
      return (
        <Placeholder Animation={Shine} Right={(props) => <PlaceholderMedia isRound={true} style={props.style} />} style={styles.itemContainer}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      )
    }

    let floatBar = false
    if (item.status === PENDING || item.status === SENT_TO_SELLER || item.status === WAIT_FOR_SELLER_APPROVAL) {
      floatBar = true
    } else if (item.status === WAIT_FOR_PAYMENT) {
      floatBar = true
    } else if (item.status === PAID_WAIT_FOR_CONFIRMATION && item.selling) {
      floatBar = true
    } else if (item.status === SENDING_TO_BUYER && !item.selling) {
      floatBar = true
    } else if (item.status === NO_PAYMENT && item.selling) {
      floatBar = true
    } else if (item.status === NO_TOKEN && !item.selling) {
      floatBar = true
    }

    return (
      <ListItem
        highlight
        floatBar={floatBar ? this._floatBar(item) : null}
        containerStyle={{
          marginBottom: floatBar ? ThemeService.getThemeStyle().variables.largeSpace : ThemeService.getThemeStyle().variables.baseSpace,
        }}
      >
        <View largeSpaceBottom={floatBar} style={styles.listItem}>
          <StyledText info smallSpaceBottom bold='medium' style={styles.title}>
            {`${translate('Request ID')}: <strong>${item.id}</strong>`}
          </StyledText>
          <StyledText bold='medium' style={styles.message}>
            {(item.status === PENDING || item.status === SENT_TO_SELLER || item.status === WAIT_FOR_SELLER_APPROVAL) &&
              (item.selling
                ? translate('User {0} requests to buy {1} from you Do you accept to sell', [
                    item.buyer.accountNumber,
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ])
                : translate('You request to buy {0} from user {1} Please wait for his / her acceptance', [
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    item.seller.accountNumber,
                  ]))}
            {item.status === WAIT_FOR_PAYMENT &&
              (item.selling
                ? translate('Please wait for user {0} to pay {1} for buying {2}', [
                    item.buyer.accountNumber,
                    formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ])
                : translate(
                    'You need to pay {0} to {1} for buying {2} You should include Request ID in payment statement to clarify to seller You can touch on this message to see payment information detail Do you pay successfully?',
                    [
                      formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                      item.seller.accountNumber,
                      formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    ]
                  ))}
            {item.status === PAID_WAIT_FOR_CONFIRMATION &&
              (item.selling
                ? translate('User {0} already paid {1} for buying {2} Do you receive that payment?', [
                    item.buyer.accountNumber,
                    formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ])
                : translate('Please wait for user {0} to confirm of receiving {1} for buying {2}', [
                    item.seller.accountNumber,
                    formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ]))}
            {item.status === SENDING_TO_BUYER &&
              (item.selling
                ? translate('We are sending {0} to user {1}', [
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    item.buyer.accountNumber,
                  ])
                : translate('We are sending {0} from user {1} to you Do you receive them?', [
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    item.seller.accountNumber,
                  ]))}
            {item.status === COMPLETED &&
              (item.selling
                ? translate('You sold {0} to user {1} successfully', [
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    item.buyer.accountNumber,
                  ])
                : translate('You bought {0} from user {1} successfully', [
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    item.seller.accountNumber,
                  ]))}
            {item.status === REJECTED &&
              (item.selling
                ? translate('You rejected to sell {0} to user {1}', [
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    item.buyer.accountNumber,
                  ])
                : translate('Your request of buying {0} from user {1} is rejected', [
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                    item.seller.accountNumber,
                  ]))}
            {item.status === NO_PAYMENT &&
              (item.selling
                ? translate('You did not receive {0} from user {1} to sell {2}', [
                    formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                    item.buyer.accountNumber,
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ])
                : translate('Seller {0} did not receive {1} to sell {2}', [
                    item.seller.accountNumber,
                    formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ]))}
            {item.status === NO_TOKEN &&
              (item.selling
                ? translate('User {0} did not receive {1}', [
                    item.buyer.accountNumber,
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ])
                : translate('You did not receive {0}', [formatCurrency(item.amount, this.props.settings.culture, this.state.token)]))}
            {item.status === CANCEL_PAYMENT &&
              (item.selling
                ? translate('User {0} cancelled payment of {1} for buying {2}', [
                    item.buyer.accountNumber,
                    formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ])
                : translate('You cancelled payment of {0} for buying {1}', [
                    formatCurrency(item.amountFiat, this.props.settings.culture, this.props.settings.currency),
                    formatCurrency(item.amount, this.props.settings.culture, this.state.token),
                  ]))}
            {item.status === CANCELLED && translate('This trade is cancelled')}
          </StyledText>
        </View>
      </ListItem>
    )
  }

  onGroupChanged = (group, index) => {
    if (index === 0) {
      this.setState({ status: 'pending' }, this.loadTrades)
    } else if (index === 1) {
      this.setState({ status: 'paying' }, this.loadTrades)
    } else if (index === 2) {
      this.setState({ status: 'completed' }, this.loadTrades)
    }
  }

  render() {
    const styles = this.props.style
    const RequestIcon = ThemeService.getThemeStyle().variables.requestIcon

    return (
      <Screen title={translate('OTC REQUEST')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard small hideReward hideWallet />
            <GroupBox icon={<RequestIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('OTC REQUEST')} fullHeight>
              <Segment data={this.groups} onSelectionChanged={this.onGroupChanged} />
              {!this.state.trades ||
                (this.state.trades.length === 0 && (
                  <StyledText spaceTop info h3 center bold='medium'>
                    {translate('There is no request available')}
                  </StyledText>
                ))}
              {this.state.trades && this.state.trades.length > 0 && (
                <FlatList
                  style={styles.list}
                  contentContainerStyle={styles.listContent}
                  data={this.state.trades}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
              )}
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
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
}

const mapStateToProps = (state) => {
  const { settings } = state
  return { settings }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTrades: (status) => dispatch(getTrades(status)),
    approve: (id, status) => dispatch(approve(id, status)),
    reject: (id, status) => dispatch(reject(id, status)),
    convertRate: (from, to, amount) => dispatch(convertRate(from, to, amount)),
    showAlert: (config) => dispatch(showAlert(config)),
    hideAlert: () => dispatch(hideAlert()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Trades', styles)(TradesScreen))
