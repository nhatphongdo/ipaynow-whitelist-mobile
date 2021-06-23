import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { connectStyle, View } from "native-base";
import ThemeService from "../../services/ThemeService";
import Button from "../shared/Button";
import ReferralUser from "./ReferralUser";

class ReferralList extends React.Component {
  _offsetX = 0;
  _layoutWidth = 0;

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => <ReferralUser level={this.props.level} name={item} />;

  onLayout = event => {
    this._layoutWidth = event.nativeEvent.layout.width;
  };

  onScroll = event => {
    this._offsetX = event.nativeEvent.contentOffset.x;
    this._layoutWidth = event.nativeEvent.layoutMeasurement.width;
  };

  render() {
    const styles = this.props.style;

    const LeftChevron = ThemeService.getThemeStyle().variables.leftChevron;
    const RightChevron = ThemeService.getThemeStyle().variables.rightChevron;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          horizontal
          ref={c => (this._flatList = c)}
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onScroll={this.onScroll}
          onLayout={this.onLayout}
        />
        <Button
          style={[styles.button, styles.leftButton]}
          onPress={() => this._flatList.scrollToOffset({ offset: this._offsetX - this._layoutWidth, animated: true })}
        >
          <LeftChevron />
        </Button>
        <Button
          style={[styles.button, styles.rightButton]}
          onPress={() => this._flatList.scrollToOffset({ offset: this._offsetX + this._layoutWidth, animated: true })}
        >
          <RightChevron />
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.ReferralList", styles)(ReferralList));
