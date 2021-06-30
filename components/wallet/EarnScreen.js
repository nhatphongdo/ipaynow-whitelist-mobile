import React from 'react'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Item, Label, Input } from 'native-base'
import numeral from 'numeral'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import { formatDuration, formatReward, clone, formatPercentage, formatCurrency } from '../../common/helper'
import { convertRateSync } from '../../stores/rates/actions'
import { getEarnPeriods, getRewardInfo, applyEarn } from '../../stores/rewards/actions'
import { showAlert, hideAlert } from '../../stores/alert/actions'
import DropdownAlertService from '../../services/DropdownAlertService'
import { USDT, REWARD } from '../../stores/rates/constants'

class EarnScreen extends React.Component {
  _isMounted = false
  _timer = null

  state = {
    earnPeriods: [],
    countdown: '',

    amount: '',
  }

  componentDidMount() {
    this._isMounted = true
    this._bootstrap()
  }

  componentWillUnmount() {
    this._isMounted = false
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this._isMounted) {
      return
    }
    // Receive new lock data
    if (!this._timer && nextProps.reward.lock) {
      this._timer = setInterval(this.onCountDownHandler, 1000)
    }
  }

  _bootstrap = async () => {
    const rewardInfo = await this.props.getRewardInfo()
    const earnPeriods = await this.props.getEarnPeriods()
    for (let i = 0; i < earnPeriods.length; i++) {
      if (rewardInfo.lock && earnPeriods[i].id === rewardInfo.lock.earn.id) {
        earnPeriods[i].selected = true
      }
    }
    this.setState({ earnPeriods })
    if (rewardInfo.lock) {
      this._timer = setInterval(this.onCountDownHandler, 1000)
    }
  }

  onCountDownHandler = () => {
    if (!this.props.reward.lock) {
      clearInterval(this._timer)
      this._timer = null
      return
    }
    const duration = formatDuration(this.props.reward.lock.endedOn)
    this.setState({ countdown: duration })
    if (duration === '00:00:00') {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  _formatPeriod = (item) => {
    return item.lockPeriodValue + ' ' + translate(item.lockPeriodUnit.toLowerCase() + (item.lockPeriodValue > 1 ? 's' : ''))
  }

  onItemSelect = (item) => {
    if (this.props.reward.lock !== null) {
      // Already locked
      return
    }

    // Change selection
    const earnPeriods = clone(this.state.earnPeriods)
    for (let i = 0; i < earnPeriods.length; i++) {
      if (earnPeriods[i].id === item.id) {
        earnPeriods[i].selected = true
      } else {
        earnPeriods[i].selected = false
      }
    }
    this.setState({ earnPeriods })

    // Popup to confirm
    let amountValue = numeral(this.state.amount)
    if (isNaN(amountValue.value()) || amountValue.value() === null || amountValue.value() <= 0) {
      return
    }
    if (amountValue.value() > this.props.reward.balance) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Insufficient balance to lock.'))
      return
    }

    this.props.showAlert({
      title: translate('Confirm!'),
      message: translate('Do you really want to lock {0} Reward for {1} to earn {2} distribution rate?', [
        formatReward(amountValue.value()),
        this._formatPeriod(item),
        formatPercentage(item.wholeRate),
      ]),
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
        const result = await this.props.applyEarn(item.id, amountValue.value())
        this.props.hideAlert()
        if (result.error) {
          DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
        } else {
          DropdownAlertService.show(DropdownAlertService.SUCCESS, translate('Success'), translate('You locked a period successfully.'))
        }
      },
    })
  }

  onMax = () => {
    this.setState({ amount: formatReward(this.props.reward.balance) })
  }

  render() {
    const styles = this.props.style
    const EarnIcon = ThemeService.getThemeStyle().variables.earnIcon

    return (
      <Screen title={translate('EARN')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<EarnIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('EARN')}>
              {this.props.reward.lockBalance !== undefined && (
                <StyledText h4 smallSpaceTop spaceBottom style={styles.center} numberOfLines={1} adjustsFontSizeToFit={true}>
                  {translate(
                    'Total USDT staked is: {0}',
                    formatCurrency(
                      convertRateSync(this.props.rates.rates, REWARD, USDT, this.props.reward.lockBalance),
                      this.props.settings.culture,
                      USDT,
                      true,
                      false
                    )
                  )}
                </StyledText>
              )}
              {this.props.reward.lock && <Label style={styles.center}>{translate('Your current lock period will be expired in')}</Label>}
              {this.props.reward.lock && (
                <StyledText h2 smallSpaceTop style={[styles.timer, styles.center]}>
                  {this.state.countdown}
                </StyledText>
              )}
              {!this.props.reward.lock && (
                <Item stackedLabel underline transparent>
                  <Label spaceTop>{translate('Input amount to lock')}</Label>
                  <View smallSpaceTop smallSpaceBottom row>
                    <Button tiny tinySpaceRight>
                      {translate('Reward')}
                    </Button>
                    <Input flexFull keyboardType='numeric' value={this.state.amount} onChangeText={(text) => this.setState({ amount: text })} />
                    <Button tiny tinySpaceLeft onPress={this.onMax}>
                      {translate('Max')}
                    </Button>
                  </View>
                </Item>
              )}
              {this.state.earnPeriods.length > 0 && (
                <Label spaceTop>{translate(this.props.reward.lock ? 'Your current selected lock period' : 'Select a period to lock')}</Label>
              )}
              {this.props.reward.lock && (
                <Button primary spaceTop disabled={true}>
                  <StyledText h3 tinySpaceTop style={[styles.name, styles.center, styles.selectedName]} numberOfLines={1} adjustsFontSizeToFit>
                    {this.props.reward.lock.earn.name.toUpperCase()}
                  </StyledText>
                  <StyledText
                    tinySpaceBottom
                    style={[styles.interest, styles.center, styles.selectedInterest]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {formatPercentage(this.props.reward.lock.interestRate)}
                  </StyledText>
                </Button>
              )}
              {!this.props.reward.lock && this.state.earnPeriods.length === 0 && (
                <StyledText spaceTop info h3 center bold='medium'>
                  {translate('There is no option available now')}
                </StyledText>
              )}
              {!this.props.reward.lock && this.state.earnPeriods.length > 0 && (
                <View smallSpaceTop style={styles.list}>
                  {this.state.earnPeriods.map((item, index) => (
                    <Button
                      key={index}
                      thirdary={!item.selected}
                      primary={item.selected}
                      disabled={this.props.reward.lock}
                      style={[
                        styles.button,
                        (ThemeService.getThemeStyle().name === 'simple-dark' || ThemeService.getThemeStyle().name === 'simple-light') &&
                        !item.selected
                          ? styles.unselectedButton
                          : styles.selectedButton,
                      ]}
                      onPress={() => this.onItemSelect(item)}
                    >
                      <StyledText
                        h3
                        tinySpaceTop
                        style={[styles.name, styles.center, item.selected ? styles.selectedName : {}]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                      >
                        {item.name.toUpperCase()}
                      </StyledText>
                      <StyledText
                        tinySpaceBottom
                        style={[styles.interest, styles.center, item.selected ? styles.selectedInterest : {}]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                      >
                        {formatPercentage(item.wholeRate)}
                      </StyledText>
                    </Button>
                  ))}
                </View>
              )}
            </GroupBox>
            <GroupBox spaceTop>
              <StyledText note>
                {translate('Please note the Rewards will be locked during the selected period Once locked, you cannot undo your decision')}
              </StyledText>
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
  const { reward, rates, settings } = state
  return { reward, rates, settings }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEarnPeriods: () => dispatch(getEarnPeriods()),
    getRewardInfo: () => dispatch(getRewardInfo()),
    showAlert: (config) => dispatch(showAlert(config)),
    hideAlert: () => dispatch(hideAlert()),
    applyEarn: (earnId, amount) => dispatch(applyEarn(earnId, amount)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Earn', styles)(EarnScreen))
