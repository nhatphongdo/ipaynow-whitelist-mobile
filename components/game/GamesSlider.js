import React from "react";
import { connect } from "react-redux";
import { connectStyle, View, DeckSwiper } from "native-base";
import { translate } from "../../constants/Languages";
import ThemeService from "../../services/ThemeService";
import Button from "../shared/Button";
import StyledText from "../shared/StyledText";
import { LUCKY_DRAW_GAME, ROLLING_DICE_GAME } from "../../stores/game/constants";

class GamesSlider extends React.Component {
  state = {
    currentIndex: 0
  };

  onItemChanged = () => {
    this.props.games &&
      this.props.onItemChanged &&
      typeof this.props.onItemChanged === "function" &&
      this.props.onItemChanged(this.state.currentIndex, this.props.games[this.state.currentIndex]);
  };

  onSwipeLeft = () => {
    if (!this.props.games || this.props.games.length === 0) {
      return;
    }
    // Next
    if (this.state.currentIndex + 1 >= this.props.games.length) {
      this.setState({ currentIndex: 0 }, this.onItemChanged);
    } else {
      this.setState({ currentIndex: this.state.currentIndex + 1 }, this.onItemChanged);
    }
  };

  onSwipeRight = () => {
    if (!this.props.games || this.props.games.length === 0) {
      return;
    }
    // Previous
    if (this.state.currentIndex - 1 < 0) {
      this.setState({ currentIndex: this.props.games.length - 1 }, this.onItemChanged);
    } else {
      this.setState({ currentIndex: this.state.currentIndex - 1 }, this.onItemChanged);
    }
  };

  swipeLeft = () => {
    this._deckSwiper._root.swipeLeft();
    this.onSwipeLeft();
  };

  swipeRight = () => {
    this._deckSwiper._root.swipeRight();
    this.onSwipeRight();
  };

  render() {
    const { games } = this.props;
    if (!games || games.length === 0) {
      return null;
    }

    const styles = this.props.style;

    const LuckyDrawGameIcon = ThemeService.getThemeStyle().variables.luckyDrawGameIcon;
    const RollingDiceGameIcon = ThemeService.getThemeStyle().variables.rollingDiceGameIcon;
    const LeftChevron = ThemeService.getThemeStyle().variables.leftChevron;
    const RightChevron = ThemeService.getThemeStyle().variables.rightChevron;

    return (
      <View spaceBottom style={styles.container}>
        <DeckSwiper
          ref={c => (this._deckSwiper = c)}
          dataSource={games}
          renderItem={item => (
            <View style={styles.card}>
              {item.game.type === LUCKY_DRAW_GAME && <LuckyDrawGameIcon style={styles.icon} />}
              {item.game.type === ROLLING_DICE_GAME && <RollingDiceGameIcon style={styles.icon} />}
              <StyledText style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                {translate(item.game.name)}
              </StyledText>
            </View>
          )}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
        />
        <Button style={[styles.button, styles.leftButton]} onPress={this.swipeLeft}>
          <LeftChevron fill={"rgba(255, 255, 255, 0.6)"} />
        </Button>
        <Button style={[styles.button, styles.rightButton]} onPress={this.swipeRight}>
          <RightChevron fill={"rgba(255, 255, 255, 0.6)"} />
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    flex: 0,
    position: "absolute"
  }
};

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.GamesSlider", styles)(GamesSlider));
