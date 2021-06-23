import React from "react";
import { FlatList, Image } from "react-native";
import { connect } from "react-redux";
import { connectStyle, Container, Content, View } from "native-base";
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from "rn-placeholder";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import AccountCard from "../shared/AccountCard";
import Button from "../shared/Button";
import StyledText from "../shared/StyledText";
import ListItem from "../shared/ListItem";
import DropdownAlertService from "../../services/DropdownAlertService";
import { getNotifications, readAllNotifications } from "../../stores/account/actions";
import { formatTimeAgo } from "../../common/helper";
import ClearAll from "../../assets/images/ClearAll";

class NotificationsScreen extends React.Component {
  state = {
    notifications: [null, null, null, null, null],
    processing: false
  };

  componentWillMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    await this.loadNotifications();
  };

  loadNotifications = async () => {
    this.setState({ notifications: [null, null, null, null, null] });
    const notifications = await this.props.getNotifications();
    if (notifications.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate("Error"), translate(notifications.error));
      this.setState({ notifications: [] });
      return;
    }

    this.setState({ notifications: notifications.result });
  };

  onReadAll = async () => {
    this.setState({ processing: true });
    await this.props.readAllNotifications();
    await this.loadNotifications();
    this.setState({ processing: false });
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => {
    const styles = this.props.style;
    if (!item) {
      return (
        <Placeholder Animation={Shine} Left={props => <PlaceholderMedia isRound={true} style={props.style} />} style={styles.itemContainer}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      );
    }

    return (
      <ListItem highlight={!item.read} containerStyle={styles.itemContainer}>
        <View flexFull style={styles.listItem}>
          <View smallSpaceTop row>
            <StyledText primary flexFull bold="medium">
              {item.title}
            </StyledText>
            <StyledText info bold="medium" style={{ textAlign: "right" }}>
              {formatTimeAgo(item.sentTime, false)}
            </StyledText>
          </View>
          <StyledText tinySpaceTop smallSpaceBottom bold="medium" style={styles.message}>
            {item.message}
          </StyledText>
        </View>
      </ListItem>
    );
  };

  render() {
    const styles = this.props.style;
    const NotificationIcon = ThemeService.getThemeStyle().variables.notificationIcon;

    return (
      <Screen
        title={translate("NOTIFICATION")}
        right={
          this.state.processing ? null : (
            <Button onPress={this.onReadAll}>
              <ClearAll height={ThemeService.getThemeStyle().variables.headerHeight - 10} />
            </Button>
          )
        }
      >
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* <AccountCard /> */}
            <GroupBox
              smallSpaceTop
              icon={<NotificationIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />}
              title={translate("NOTIFICATION")}
              fullHeight
            >
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={this.state.notifications}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
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
    flex: 1
  }
};

const mapStateToProps = state => {
  const {} = state;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: () => dispatch(getNotifications()),
    readAllNotifications: () => dispatch(readAllNotifications())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.Notifications", styles)(NotificationsScreen));
