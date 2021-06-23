import React from "react";
import { connect } from "react-redux";
import { connectStyle, Container, Content, View, Label, Spinner } from "native-base";
import ThemeService from "../../services/ThemeService";
import Socket from "../../services/Socket";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import Button from "../shared/Button";
import AccountCard from "../shared/AccountCard";
import StyledText from "../shared/StyledText";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import { clone, formatDuration } from "../../common/helper";
import { LUCKY_DRAW_GAME, NOT_READY_YET, FINISHED, READY, ROLLING_DICE_GAME } from "../../stores/game/constants";
import { getGames } from "../../stores/game/actions";

class GamesScreen extends React.Component {
  _isMounted = false;
  _timer = null;

  state = {
    games: [],
    countdowns: [],
    gameConnected: false,
    connecting: false
  };

  componentDidMount() {
    this._isMounted = true;
    this._bootstrapAsync();
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this._isMounted) {
      return;
    }
  }

  _bootstrapAsync = async () => {
    // Get games
    const games = await this.props.getGames();
    this.setState({
      games,
      gameConnected: Socket.isConnected(),
      countdowns: Array.from(Array(games.length))
    });
    for (let i = 0; i < games.length; i++) {
      if ((games[i].state === NOT_READY_YET && games[i].startTime) || (games[i].state === READY && games[i].endTime)) {
        this._timer = setInterval(this.onCountDownHandler, 1000);
        this.onCountDownHandler();
        break;
      }
    }
  };

  onCountDownHandler = () => {
    let countdowns = clone(this.state.countdowns);
    for (let i = 0; i < this.state.games.length; i++) {
      if (this.state.games[i].state === NOT_READY_YET && this.state.games[i].startTime) {
        const duration = formatDuration(this.state.games[i].startTime);
        countdowns[i] = duration;
      } else if (this.state.games[i].state === READY && this.state.games[i].endTime) {
        const duration = formatDuration(this.state.games[i].endTime);
        countdowns[i] = duration;
      }
    }
    this.setState({ countdowns });
    let counting = false;
    for (let i = 0; i < countdowns.length; i++) {
      if (countdowns[i] && countdowns[i] !== "" && countdowns[i] !== "00:00:00") {
        counting = true;
      }
    }
    if (!counting) {
      clearInterval(this._timer);
      this._timer = null;
    }
  };

  onLeaderboards = () => {
    this.props.navigation.navigate("Leaderboards");
  };

  onGame = item => {
    if (item.game.type === LUCKY_DRAW_GAME) {
      this.props.navigation.navigate("LuckyDrawDetail", {
        id: item.id
      });
    } else if (item.game.type === ROLLING_DICE_GAME) {
      this.props.navigation.navigate("RollingDicePlay", {
        id: item.id
      });
    }
  };

  onGameConnect = async () => {
    this.setState({ connecting: true });
    await Socket.connect();
    this.setState({ connecting: false, gameConnected: Socket.isConnected() });
  };

  render() {
    const styles = this.props.style;
    const GamesIcon = ThemeService.getThemeStyle().variables.gamesIcon;
    const TimeBadge = ThemeService.getThemeStyle().variables.timeBadge;
    const ResultBadge = ThemeService.getThemeStyle().variables.resultBadge;
    const LuckyDrawGameIcon = ThemeService.getThemeStyle().variables.luckyDrawGameIcon;
    const RollingDiceGameIcon = ThemeService.getThemeStyle().variables.rollingDiceGameIcon;

    const cellWidth = Math.min(
      300,
      Math.max(
        120,
        (ThemeService.getThemeStyle().variables.deviceWidth -
          ThemeService.getThemeStyle().variables.screenPadding * 2 -
          ThemeService.getThemeStyle().variables.groupBoxPadding * 2 +
          (ThemeService.getThemeStyle().variables.smallSpace / 2) * 2 -
          ThemeService.getThemeStyle().variables.smallSpace * 3) /
          3
      )
    );

    return (
      <Screen title={translate("GAMES")}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<GamesIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate("GAMES")}>
              {!this.state.gameConnected && (
                <StyledText spaceTop info h3 center bold="medium">
                  {translate("Game service is disconnected")}
                </StyledText>
              )}
              {!this.state.gameConnected && (
                <Button flexFull primary spaceTop onPress={this.onGameConnect} disabled={this.state.connecting}>
                  {!this.state.connecting && <StyledText>{translate("RECONNECT")}</StyledText>}
                  {this.state.connecting && <Spinner color="#fff" />}
                </Button>
              )}
              {!this.state.games ||
                (this.state.games.length === 0 && (
                  <StyledText spaceTop info h3 center bold="medium">
                    {translate("There is no game available")}
                  </StyledText>
                ))}
              {this.state.gameConnected && this.state.games && this.state.games.length > 0 && <Label>{translate("Choose a game")}</Label>}
              {this.state.gameConnected && this.state.games && this.state.games.length > 0 && (
                <View smallSpaceTop style={styles.list}>
                  {this.state.games.map((item, index) => (
                    <Button thirdary key={index} style={styles.button} onPress={() => this.onGame(item)}>
                      {item.game.type === LUCKY_DRAW_GAME && (
                        <LuckyDrawGameIcon style={[styles.icon, item.state === READY ? {} : styles.transparent]} />
                      )}
                      {item.game.type === ROLLING_DICE_GAME && (
                        <RollingDiceGameIcon style={[styles.icon, item.state === READY ? {} : styles.transparent]} />
                      )}
                      <StyledText tinySpaceTop bold="medium" style={[styles.name, styles.center]} numberOfLines={2} adjustsFontSizeToFit>
                        {translate(item.game.name)}
                      </StyledText>
                      <View tinySpaceBottom style={styles.badgeContainer}>
                        {(item.state === NOT_READY_YET || item.state === READY) && <TimeBadge width={cellWidth - 20} height={30} />}
                        {item.state === NOT_READY_YET && item.startTime && (
                          <StyledText style={[styles.time, styles.center]}>{`${translate("Ready in")} ${this.state.countdowns[index]}`}</StyledText>
                        )}
                        {item.state === READY && item.endTime && (
                          <StyledText style={[styles.time, styles.center]}>{`${translate("Ended in")} ${this.state.countdowns[index]}`}</StyledText>
                        )}
                        {item.state === FINISHED && <ResultBadge style={styles.resultBadge} height={40} />}
                      </View>
                    </Button>
                  ))}
                </View>
              )}
              <Button flexFull primary spaceTop onPress={this.onLeaderboards}>
                {translate("LEADERBOARDS")}
              </Button>
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
      </Screen>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 0
  },
  center: {
    alignSelf: "center",
    textAlign: "center"
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  transparent: {
    opacity: 0.5
  }
};

const mapStateToProps = state => {
  const { games } = state;
  return { games };
};

const mapDispatchToProps = dispatch => {
  return {
    getGames: () => dispatch(getGames())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.Games", styles)(GamesScreen));
