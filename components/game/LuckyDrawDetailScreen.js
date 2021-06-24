import React from 'react'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Item, Label, Input, Spinner } from 'native-base'
import moment from 'moment'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import { formatShortTime, formatFullDate, clone, formatReward } from '../../common/helper'
import { getGame, buyLuckyNumber, getLuckyNumbers, gameRegistered } from '../../stores/game/actions'
import { NOT_READY_YET, READY, FINISHED } from '../../stores/game/constants'
import DropdownAlertService from '../../services/DropdownAlertService'

const MaxLengthNumber = 6

class LuckyDrawDetailScreen extends React.Component {
  state = {
    game: null,
    luckyNumbers: [],
    number: '',
    agreement: true,
    participating: false
  }

  componentWillMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    // Get game
    const game = await this.props.getGame(this.props.route.params?.id || 0)
    this.setState({ game })
    if (game.state === FINISHED || (game.result && game.result.winningNumber)) {
      this.props.navigation.goBack()
      return
    }
    if (game.endJoinTime && moment.utc(game.endJoinTime) < moment.utc()) {
      this.props.navigation.goBack()
      this.props.navigation.navigate('LuckyDrawPlay', {
        game: game
      })
      return
    }
    const luckyNumbers = await this.props.getLuckyNumbers(this.props.route.params?.id || 0)
    if (luckyNumbers.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(luckyNumbers.error))
    } else {
      this.setState({ luckyNumbers: luckyNumbers.result })
    }
  }

  onRandom = () => {
    // Generate random number
    const number = Math.floor(Math.random() * 1000000)
    this.setState({ number: number.toString() })
  }

  onParticipate = async () => {
    // Validate
    if (!this.state.game) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('This game is not available for this moment'))
      return
    }
    if (!this.state.number || this.state.number === '') {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Please chose correct number'))
      return
    }
    if (this.state.number.length > MaxLengthNumber || /^\d+$/.test(this.state.number) === false) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Please chose correct number'))
      return
    }
    if (!this.state.agreement) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Please agree with Terms and Conditions of Gaming'))
      return
    }

    this.setState({ participating: true })
    const result = await this.props.buyLuckyNumber(this.state.game.id, this.state.number)
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
    } else {
      const luckyNumbers = clone(this.state.luckyNumbers)
      luckyNumbers.push(result.result)
      this.setState({ luckyNumbers })

      // Register
      this.props.gameRegistered({ id: this.state.game.id })
    }
    this.setState({ participating: false })
  }

  render() {
    const styles = this.props.style
    const GamesIcon = ThemeService.getThemeStyle().variables.gamesIcon
    const CheckBoxIcon = ThemeService.getThemeStyle().variables.checkBoxIcon

    return (
      <Screen title={translate('LUCKY DRAW')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<GamesIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('GAMES')}>
              {!this.state.game && (
                <StyledText spaceTop info h3 center bold='medium'>
                  {translate('This game is not available for this moment')}
                </StyledText>
              )}
              {this.state.game && (
                <StyledText bold='medium'>
                  {translate('Choose a number from 0 to 999999 and watch the draw online to find out who is the winner')}
                </StyledText>
              )}
              {this.state.game && this.state.game.state === READY && (
                <StyledText spaceTop info>{`${translate('Next draw will be at')} <strong>${formatShortTime(
                  this.state.game.endTime
                )}</strong> ${translate('on')} <strong>${formatFullDate(this.state.game.endTime)}</strong>`}</StyledText>
              )}
              {this.state.game && this.state.game.state !== READY && (
                <StyledText spaceTop info>{`${translate('Next game will be at')} <strong>${formatShortTime(
                  this.state.game.startTime
                )}</strong> ${translate('on')} <strong>${formatFullDate(this.state.game.startTime)}</strong>`}</StyledText>
              )}
              {this.state.game && this.state.game.state === READY && (
                <Item transparent stackedLabel spaceTop>
                  <Label>{translate('Your number')}</Label>
                  <View smallSpaceTop smallSpaceBottom style={styles.row}>
                    <Input
                      underline
                      flexFull
                      keyboardType='numeric'
                      maxLength={MaxLengthNumber}
                      value={this.state.number}
                      onChangeText={text => this.setState({ number: text })}
                    />
                    <Button tiny primary tinySpaceLeft onPress={this.onRandom}>
                      {translate('Pick randomly')}
                    </Button>
                  </View>
                </Item>
              )}
              {this.state.game && this.state.game.state === READY && (
                <Button
                  smallSpaceTop
                  checkbox
                  checked={this.state.agreement}
                  flexFull
                  onPress={() => this.setState({ agreement: !this.state.agreement })}
                >
                  <CheckBoxIcon
                    fill={
                      this.state.agreement
                        ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                        : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                    }
                    checked={this.state.agreement}
                  />
                  <StyledText>{translate('I agree to Terms and Conditions of Gaming')}</StyledText>
                </Button>
              )}
              {this.state.game && this.state.game.state === READY && (
                <Button primary spaceTop flexFull onPress={this.onParticipate} disabled={this.state.participating}>
                  {!this.state.participating && <StyledText>{translate('PARTICIPATE')}</StyledText>}
                  {this.state.participating && <Spinner color='#fff' />}
                </Button>
              )}
              {this.state.game && (
                <StyledText smallSpaceTop center note>
                  {translate('It will cost {0} {1} for each participation', [
                    `<color ${ThemeService.getThemeStyle().variables.brandPrimary}><strong>${formatReward(this.state.game.cost)}</strong></color>`,
                    `<color ${ThemeService.getThemeStyle().variables.brandPrimary}><strong>${translate(this.state.game.unit)}</strong></color>`
                  ])}
                </StyledText>
              )}
            </GroupBox>
            {this.state.game && this.state.game.state === READY && (
              <GroupBox spaceTop>
                {this.state.luckyNumbers && (
                  <StyledText note>
                    {`${translate(
                      'You bought {0} numbers',
                      `<color ${ThemeService.getThemeStyle().variables.brandPrimary}><strong>${this.state.luckyNumbers.length}</strong></color>`
                    )}. ${translate('There are {0} {1} consumed by participants', [
                      `<color ${ThemeService.getThemeStyle().variables.brandPrimary}><strong>${this.state.game.totalCost}</strong></color>`,
                      `<color ${ThemeService.getThemeStyle().variables.brandPrimary}><strong>${translate(this.state.game.unit)}</strong></color>`
                    ])}`}
                  </StyledText>
                )}
                {this.state.luckyNumbers && (
                  <View style={styles.list}>
                    {this.state.luckyNumbers.map((item, index) => (
                      <StyledText key={index} important style={styles.number}>
                        {item.number}
                      </StyledText>
                    ))}
                  </View>
                )}
              </GroupBox>
            )}
          </Content>
        </Container>
        <TabNavigation />
      </Screen>
    )
  }
}

const styles = {
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
}

const mapStateToProps = state => {
  const {} = state
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    getGame: id => dispatch(getGame(id)),
    buyLuckyNumber: (gameId, number) => dispatch(buyLuckyNumber(gameId, number)),
    getLuckyNumbers: gameId => dispatch(getLuckyNumbers(gameId)),
    gameRegistered: game => dispatch(gameRegistered(game))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.LuckyDrawDetail', styles)(LuckyDrawDetailScreen))
