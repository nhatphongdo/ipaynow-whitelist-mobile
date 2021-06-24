import React from 'react'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View } from 'native-base'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import { formatShortTime, formatFullDate, formatDuration, formatReward } from '../../common/helper'
import GameCongratulationsModal from './GameCongratulationsModal'
import SlotMachine from '../shared/SlotMachine'
import { LUCKY_DRAW_GAME } from '../../stores/game/constants'
import { gameRemoved } from '../../stores/game/actions'
import Zero from '../../assets/images/Zero'
import One from '../../assets/images/One'
import Two from '../../assets/images/Two'
import Three from '../../assets/images/Three'
import Four from '../../assets/images/Four'
import Five from '../../assets/images/Five'
import Six from '../../assets/images/Six'
import Seven from '../../assets/images/Seven'
import Eight from '../../assets/images/Eight'
import Nine from '../../assets/images/Nine'

const RollRange = '0123456789abcdefghijklmnopqrstuvwxyzABCD' // 40 chars represent for 4 times roll, must starts with 0123456789
const NumberHeight = 50

class LuckyDrawPlayScreen extends React.Component {
  _isMounted = false
  _timer = null

  constructor(props) {
    super(props)
    this.state = {
      game: props.route.params?.game || null,
      id: props.route.params?.id || 0,
      playing: false,
      showWinning: false,

      countdown: '',
      winningNumber: '',
      win: false,
    }
  }

  componentDidMount() {
    this._isMounted = true
    if (this.state.game) {
      this._timer = setInterval(this.onCountDownHandler, 1000)
      this.onCountDownHandler()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this._isMounted) {
      return
    }
    if (newProps.games) {
      const gameId = this.state.game ? this.state.game.id : this.state.id > 0 ? this.state.id : newProps.getParam('id', 0)
      const game = newProps.games.games[gameId.toString()]
      if (game) {
        this.setState({
          winningNumber: game.winningNumber,
          win: game.win,
        })

        this.props.gameRemoved(gameId)
      }
    }
  }

  onCountDownHandler = () => {
    if (this.state.game) {
      const duration = formatDuration(this.state.game.endTime)
      if (duration === '00:00:00') {
        clearInterval(this._timer)
        this._timer = null
      }
      this.setState({ countdown: duration })
    } else {
      clearInterval(this._timer)
      this._timer = null
      this.setState({ countdown: '00:00:00' })
    }
  }

  renderNumber = (char, index, range) => {
    switch (index % 10) {
      case 0:
        return <Zero height={NumberHeight - 10} />
      case 1:
        return <One height={NumberHeight - 10} />
      case 2:
        return <Two height={NumberHeight - 10} />
      case 3:
        return <Three height={NumberHeight - 10} />
      case 4:
        return <Four height={NumberHeight - 10} />
      case 5:
        return <Five height={NumberHeight - 10} />
      case 6:
        return <Six height={NumberHeight - 10} />
      case 7:
        return <Seven height={NumberHeight - 10} />
      case 8:
        return <Eight height={NumberHeight - 10} />
      case 9:
        return <Nine height={NumberHeight - 10} />
      default:
        return <View />
    }
  }

  onRollCompleted = () => {
    setTimeout(() => {
      if (this.state.win) {
        this.setState({ showWinning: true })
      }
    }, 3000)
  }

  render() {
    const styles = this.props.style
    const GamesIcon = ThemeService.getThemeStyle().variables.gamesIcon
    const LuckyDrawMachine = ThemeService.getThemeStyle().variables.luckyDrawMachine

    return (
      <Screen title={translate('LUCKY DRAW')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<GamesIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('GAMES')} allowToBack>
              {this.state.game && (
                <StyledText bold='medium'>{translate('The Lucky Draw is now closed We will be picking the winner soon')}</StyledText>
              )}
              {this.state.game && (
                <StyledText info spaceTop>{`${translate('Next draw will be at')} <strong>${formatShortTime(
                  this.state.game.endTime
                )}</strong> ${translate('on')} <strong>${formatFullDate(this.state.game.endTime)}</strong>`}</StyledText>
              )}
              {this.state.game && (
                <StyledText full center spaceTop style={styles.timer}>
                  {this.state.countdown}
                </StyledText>
              )}
              {this.state.game && (
                <StyledText full center spaceTop spaceBottom h4 success bold='medium'>
                  {`${translate('Game Prize')}: <strong>${formatReward(this.state.game.totalCost)}</strong> ${translate(this.state.game.unit)}`}
                </StyledText>
              )}
              <View style={styles.machineContainer}>
                <LuckyDrawMachine style={styles.machine} />
                <View style={styles.numbers}>
                  <SlotMachine
                    text={this.state.winningNumber}
                    range={RollRange}
                    width={40}
                    height={NumberHeight}
                    duration={3000}
                    initialAnimation={false}
                    padding={6}
                    defaultChar='u' // last 0
                    renderContent={this.renderNumber}
                    useNativeDriver={true}
                    onCompleted={this.onRollCompleted.bind(this)}
                    styles={{
                      slotWrapper: { margin: 2 },
                      slotInner: { padding: 5 },
                    }}
                  />
                </View>
              </View>
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
        <GameCongratulationsModal
          isVisible={this.state.showWinning}
          onBackdropPress={() => this.setState({ showWinning: false })}
          game={LUCKY_DRAW_GAME}
          result={this.state.winningNumber}
        />
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
  numbers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  machine: {
    position: 'absolute',
  },
}

const mapStateToProps = (state) => {
  const { games } = state
  return { games }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gameRemoved: (id) => dispatch(gameRemoved(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.LuckyDrawPlay', styles)(LuckyDrawPlayScreen))
