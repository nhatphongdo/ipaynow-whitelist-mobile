import React from 'react'
import { FlatList, Platform } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View } from 'native-base'
import moment from 'moment'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import Button from '../shared/Button'
import DatePicker from '../shared/DatePicker'
import GamesSlider from './GamesSlider'
import { formatFullDate, formatReward } from '../../common/helper'
import ListItem from '../shared/ListItem'
import { LUCKY_DRAW_GAME, ROLLING_DICE_GAME } from '../../stores/game/constants'
import { getGames, leaderboards } from '../../stores/game/actions'

class LeaderboardsScreen extends React.Component {
  state = {
    games: [],
    game: 0,
    date: moment()
      .startOf('day')
      .toDate(),
    leaderboard: null,
  }

  componentDidMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    // Get games
    const games = await this.props.getGames()
    this.setState({ games })
    if (games.length > 0) {
      this.setState(
        {
          game: games[0].game.id,
        },
        this.loadLeaderboard
      )
    }
  }

  onGameChanged = (index, game) => {
    this.setState(
      {
        game: game.game.id,
      },
      this.loadLeaderboard
    )
  }

  onDateChanged = (date) => {
    this.setState(
      {
        date: date,
      },
      this.loadLeaderboard
    )
  }

  loadLeaderboard = async () => {
    this.setState({ leaderboard: null })
    const leaderboard = await this.props.leaderboards(this.state.game, this.state.date)
    if (leaderboard.result) {
      this.setState({ leaderboard: leaderboard.result })
    }
  }

  getMainText = (item) => {
    if (this.state.leaderboard.type === LUCKY_DRAW_GAME) {
      return item.user
    } else if (this.state.leaderboard.type === ROLLING_DICE_GAME) {
      return '[' + item.numbers.join(', ') + ']'
    }
    return ''
  }

  getSubText = (item) => {
    if (this.state.leaderboard.type === LUCKY_DRAW_GAME) {
      return `<strong>${formatReward(item.prize)}</strong>\n${translate('Reward')}`
    } else if (this.state.leaderboard.type === ROLLING_DICE_GAME) {
      return '[' + item.result.join(', ') + ']'
    }
    return ''
  }

  getNumberText = (item) => {
    if (this.state.leaderboard.type === LUCKY_DRAW_GAME) {
      return item.count
    } else if (this.state.leaderboard.type === ROLLING_DICE_GAME) {
      return item.prize
    }
    return ''
  }

  render() {
    const styles = this.props.style
    const GamesIcon = ThemeService.getThemeStyle().variables.gamesIcon
    const Hexagon = ThemeService.getThemeStyle().variables.hexagon

    return (
      <Screen title={translate('LEADERBOARDS')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* <AccountCard /> */}
            <GroupBox smallSpaceTop fullHeight icon={<GamesIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('GAMES')}>
              {(!this.state.games || this.state.games.length === 0) && (
                <StyledText spaceTop spaceBottom info h3 center bold='medium'>
                  {translate('There is no Leaderboard yet')}
                </StyledText>
              )}
              <GamesSlider games={this.state.games} onItemChanged={this.onGameChanged} />
              {this.state.games && this.state.games.length > 0 && (
                <Button thirdary center style={styles.datePickerButton}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date(2021, 5, 1)}
                    maximumDate={new Date()}
                    formatChosenDate={(date) => formatFullDate(date, false)}
                    modalTransparent={false}
                    animationType={'slide'}
                    textStyle={styles.datePicker}
                    onDateChange={this.onDateChanged}
                    disabled={false}
                  />
                </Button>
              )}
              {this.state.games && this.state.games.length > 0 && !this.state.leaderboard && (
                <StyledText spaceTop info h3 center bold='medium'>
                  {translate('There is no Leaderboard for this date yet')}
                </StyledText>
              )}
              {this.state.leaderboard && this.state.leaderboard.type === LUCKY_DRAW_GAME && (
                <StyledText h2 center largeSpaceTop bold='bold'>
                  {translate('WINNER')}
                </StyledText>
              )}
              {this.state.leaderboard && this.state.leaderboard.type === LUCKY_DRAW_GAME && (
                <View spaceTop style={styles.winning}>
                  <Hexagon fill='url(#prefix__c)' />
                  <StyledText style={styles.winningNumber}>{this.state.leaderboard.winningNumber}</StyledText>
                </View>
              )}
              {this.state.leaderboard && (
                <FlatList
                  style={styles.list}
                  data={this.state.leaderboard.records}
                  extraData={this.state}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ListItem
                      highlight
                      horizontal
                      blockie={item.wallet || this.props.wallet.cryptoAddress}
                      subTextStyle={{ textAlign: 'center' }}
                      mainText={this.getMainText(item)}
                      subText={this.getSubText(item)}
                      number={this.getNumberText(item)}
                    />
                  )}
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
  winning: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const mapStateToProps = (state) => {
  const { wallet } = state
  return { wallet }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGames: () => dispatch(getGames()),
    leaderboards: (id, date) => dispatch(leaderboards(id, date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Leaderboards', styles)(LeaderboardsScreen))
