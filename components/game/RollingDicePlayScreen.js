import React from "react";
import { connect } from "react-redux";
import { connectStyle, Container, Content, View, Input, Label, Spinner } from "native-base";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import AccountCard from "../shared/AccountCard";
import StyledText from "../shared/StyledText";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import GameCongratulationsModal from "./GameCongratulationsModal";
import Button from "../shared/Button";
import { getGame, rollDice } from "../../stores/game/actions";
import { ROLLING_DICE_GAME } from "../../stores/game/constants";
import { clone } from "../../common/helper";
import DropdownAlertService from "../../services/DropdownAlertService";
import SlotMachine from "../shared/SlotMachine";

const Dice1 = ThemeService.getThemeStyle().variables.dice1;
const Dice2 = ThemeService.getThemeStyle().variables.dice2;
const Dice3 = ThemeService.getThemeStyle().variables.dice3;
const Dice4 = ThemeService.getThemeStyle().variables.dice4;
const Dice5 = ThemeService.getThemeStyle().variables.dice5;
const Dice6 = ThemeService.getThemeStyle().variables.dice6;

const RollRange = "1234567890abcdefghijklmnopqrstuvwxyz"; // 36 chars represent for 6 times roll, must starts with 123456

class RollingDicePlayScreen extends React.Component {
  state = {
    game: null,
    inputNumbers: ["", ""],
    chosenNumbers: [0, 0],
    numbers: [0, 0],
    playing: false,
    showWinning: false
  };

  componentWillMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    // Get game
    const game = await this.props.getGame(this.props.navigation.getParam("id", 0));
    this.setState({ game });
  };

  changeNumber = (index, num) => {
    let chosenNumbers = clone(this.state.chosenNumbers);
    let inputNumbers = clone(this.state.inputNumbers);
    inputNumbers[index] = num;
    num = parseInt(num);
    if (isNaN(num)) {
      this.setState({ inputNumbers });
      return;
    }

    if (num < 1 || num > 6) {
      this.setState({ inputNumbers });
      return;
    }

    chosenNumbers[index] = num;
    this.setState({ chosenNumbers, inputNumbers });
  };

  checkNumbers = () => {
    this.setState({
      inputNumbers: this.state.chosenNumbers.map(item => (item > 0 ? item.toString() : ""))
    });
  };

  onPlay = async () => {
    if (!this.state.game) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate("Error"), translate("This game is not available for this moment"));
      return;
    }
    if (!this.state.chosenNumbers) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate("Error"), translate("Please chose correct numbers"));
      return;
    }
    let found = false;
    for (let i = 0; i < this.state.chosenNumbers.length; i++) {
      if (this.state.chosenNumbers[i] === 0) {
        found = true;
      }
    }
    if (found) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate("Error"), translate("Please chose correct numbers"));
      return;
    }

    let start = "";
    for (let i = 0; i < this.state.numbers.length; i++) {
      start += "z";
    }
    this.setState({ playing: true, diceResult: start });
    const result = await this.props.rollDice(this.state.game.id, this.state.chosenNumbers);

    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate("Error"), translate(result.error));
      this.setState({ playing: false });
      return;
    }

    // Roll dices
    this.setState({ diceResult: result.result.result.join(""), rollResult: result.result });
  };

  renderDice = (char, index, range) => {
    if (index % 6 === 0) {
      return <Dice1 style={styles.absolute} />;
    } else if (index % 6 === 1) {
      return <Dice2 style={styles.absolute} />;
    } else if (index % 6 === 2) {
      return <Dice3 style={styles.absolute} />;
    } else if (index % 6 === 3) {
      return <Dice4 style={styles.absolute} />;
    } else if (index % 6 === 4) {
      return <Dice5 style={styles.absolute} />;
    } else if (index % 6 === 5) {
      return <Dice6 style={styles.absolute} />;
    }
  };

  onRollCompleted = () => {
    if (this.state.diceResult.indexOf("z") >= 0) {
      return;
    }
    if (!this.state.rollResult) {
      this.setState({ playing: false });
      return;
    }
    setTimeout(() => {
      if (this.state.rollResult.win) {
        this.setState({ playing: false, showWinning: true });
      } else {
        this.setState({ playing: false });
      }
    }, 1000);
  };

  render() {
    const styles = this.props.style;
    const GamesIcon = ThemeService.getThemeStyle().variables.gamesIcon;
    const EmptyDice = ThemeService.getThemeStyle().variables.emptyDice;

    return (
      <Screen title={translate("ROLLING DICE")}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard />
            <GroupBox icon={<GamesIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate("GAMES")} allowToBack>
              {!this.state.game && (
                <StyledText spaceTop info h3 center bold="medium">
                  {translate("This game is not available for this moment")}
                </StyledText>
              )}
              {this.state.game && (
                <StyledText bold="medium">
                  {translate(
                    "You choose your numbers and roll the dice If the result is the same with your choice you will win the game You need to pay {0} {1} for each play",
                    [this.state.game.cost, translate(this.state.game.unit)]
                  )}
                </StyledText>
              )}
              {this.state.game && <Label spaceTop>{translate("Pick your numbers (touch each dice to change)")}</Label>}
              {this.state.game && (
                <View spaceTop style={styles.row}>
                  {this.state.inputNumbers.map((item, index) => (
                    <View key={index} style={styles.dice}>
                      <EmptyDice style={styles.absolute} />
                      <Input
                        underline
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        value={item}
                        onChangeText={text => this.changeNumber(index, text)}
                        onBlur={this.checkNumbers}
                      />
                    </View>
                  ))}
                </View>
              )}
              {this.state.game && <Label spaceTop>{translate("Roll the Dice")}</Label>}
              {this.state.game && (
                <View spaceTop style={styles.row}>
                  {!this.state.diceResult &&
                    this.state.numbers.map((item, index) => (
                      <View key={index} style={styles.dice}>
                        <EmptyDice style={styles.absolute} />
                      </View>
                    ))}
                  {this.state.diceResult && (
                    <SlotMachine
                      text={this.state.diceResult}
                      range={RollRange}
                      width={80}
                      height={80}
                      duration={3000}
                      initialAnimation={false}
                      padding={this.state.numbers.length}
                      defaultChar="z"
                      renderContent={this.renderDice}
                      useNativeDriver={true}
                      onCompleted={this.onRollCompleted.bind(this)}
                      styles={{
                        slotWrapper: styles.rollDice
                      }}
                    />
                  )}
                </View>
              )}
              {this.state.game && (
                <Button spaceTop primary flexFull onPress={this.onPlay} disabled={this.state.playing}>
                  {!this.state.playing && <StyledText>{translate("PLAY")}</StyledText>}
                  {this.state.playing && <Spinner color="#fff" />}
                </Button>
              )}
              {this.state.game && (
                <StyledText smallSpaceTop center note>
                  {translate("You will receive {0} {1} if you win", [
                    `<color ${ThemeService.getThemeStyle().variables.brandPrimary}><strong>${this.state.game.prize}</strong></color>`,
                    translate(this.state.game.prizeUnit)
                  ])}
                </StyledText>
              )}
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
        <GameCongratulationsModal
          isVisible={this.state.showWinning}
          onBackdropPress={() => this.setState({ showWinning: false })}
          game={ROLLING_DICE_GAME}
          result={this.state.rollResult ? this.state.rollResult.result : ""}
        />
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0
  }
};

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getGame: id => dispatch(getGame(id)),
    rollDice: (session, numbers) => dispatch(rollDice(session, numbers))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.RollingDicePlay", styles)(RollingDicePlayScreen));
