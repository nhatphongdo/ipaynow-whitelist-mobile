import React from "react";
import { connect } from "react-redux";
import { connectStyle, Container, Content, View, Accordion, Spinner } from "native-base";
import moment from "moment";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import AccountCard from "../shared/AccountCard";
import Segment from "../shared/Segment";
import StyledText from "../shared/StyledText";
import Button from "../shared/Button";
import Search from "../shared/Search";
import { formatFullMonth, formatTime, formatCurrency, toFirstLetterCase } from "../../common/helper";
import { getHistory } from "../../stores/account/actions";
import { getTransactions } from "../../stores/storage/actions";

class HistoryScreen extends React.Component {
  state = {
    search: "",
    unit: 0
  };

  componentDidMount() {
    setTimeout(this._bootstrap, 100);
  }

  _bootstrap = async () => {
    await this.props.getTransactions();
    await this.props.getHistory();
  };

  onUnitChanged = (item, index, prevIndex) => {
    this.setState({ unit: index });
  };

  getType = type => {
    if (!type) {
      return type;
    }
    if (type.indexOf("Sent to") === 0) {
      return translate("Sent to") + type.substring("Sent to".length);
    } else if (type.indexOf("Received from") === 0) {
      return translate("Received from") + type.substring("Received from".length);
    }
    return translate(type);
  };

  _renderHeader = (item, expanded) => {
    const ArrowUp = ThemeService.getThemeStyle().variables.arrowUp;
    const ArrowDown = ThemeService.getThemeStyle().variables.arrowDown;
    return (
      <View row box shadow smallSpaceBottom highlight>
        <StyledText h4 bold="medium" flexFull smallSpaceTop smallSpaceBottom style={this.props.style.header}>
          {formatFullMonth(moment(item, "YYYY-MM"))}
        </StyledText>
        {expanded ? <ArrowUp /> : <ArrowDown />}
      </View>
    );
  };

  _renderContent = item => {
    if (!this.props.storage.transactions[item] || this.props.storage.transactions[item].length === 0) {
      this.props.getTransactions(item);
    }

    const items =
      this.props.storage.transactions[item] &&
      this.props.storage.transactions[item].filter(
        tx =>
          tx.type
            .toString()
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) >= 0 &&
          (this.state.unit === 0
            ? true
            : this.state.unit === 1
            ? tx.unit === "HDN"
            : this.state.unit === 2
            ? tx.unit === "REWARD"
            : tx.unit === "ETH")
      );

    return (
      <View>
        {!this.props.storage.transactions[item] ||
          (this.props.storage.transactions[item].length === 0 && (
            <Spinner
              color={ThemeService.getThemeStyle().name === "colorful-dark" || ThemeService.getThemeStyle().name === "simple-dark" ? "#fff" : "#000"}
            />
          ))}
        {items &&
          items.map((row, index) => (
            <View key={index} row box shadow smallSpaceBottom>
              <StyledText bold="medium" smallSpaceRight wrap info numberOfLines={2} adjustsFontSizeToFit style={{ flex: 1 }}>
                {formatTime(row.createdOn, "DD/MM HH:mm:ss")}
              </StyledText>
              <StyledText bold="medium" smallSpaceRight wrap success={row.amount > 0} error={row.amount < 0} style={{ flex: 1.5 }}>
                {this.getType(row.type)}
              </StyledText>
              <StyledText bold="medium" smallSpaceRight success={row.amount > 0} error={row.amount < 0} style={{ flex: 0.9 }}>
                {formatCurrency(row.amount, this.props.settings.culture, row.unit, false)}
              </StyledText>
              <StyledText bold="medium" numberOfLines={1} adjustsFontSizeToFit success={row.amount > 0} error={row.amount < 0} style={{ flex: 0.6 }}>
                {toFirstLetterCase(translate(row.unit))}
              </StyledText>
            </View>
          ))}
      </View>
    );
  };

  render() {
    const groups = [translate("ALL"), translate("HDN"), translate("REWARD"), translate("ETH")];
    const styles = this.props.style;
    const HistoryIcon = ThemeService.getThemeStyle().variables.historyIcon;
    const FilterIcon = ThemeService.getThemeStyle().variables.filterIcon;

    const times = Object.keys(this.props.storage.transactions);
    times.sort();
    times.reverse();

    return (
      <Screen title={translate("HISTORY")}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* <AccountCard small hideReward hideWallet /> */}
            <GroupBox
              smallSpaceTop
              icon={<HistoryIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />}
              title={translate("HISTORY")}
              fullHeight
            >
              <View row flexCenter>
                <Search placeholder={translate("Search")} onTextChanged={text => this.setState({ search: text })} />
                {false && (
                  <Button spaceLeft secondary row>
                    <FilterIcon />
                    <StyledText smallSpaceLeft>{translate("Filter")}</StyledText>
                  </Button>
                )}
              </View>
              <Segment smallSpaceTop data={groups} onSelectionChanged={this.onUnitChanged} />
              <Accordion
                style={styles.list}
                dataArray={times}
                animation={true}
                expanded={0}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
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
  },
  list: {
    flex: 1
  }
};

const mapStateToProps = state => {
  const { storage, settings } = state;
  return { storage, settings };
};

const mapDispatchToProps = dispatch => {
  return {
    getHistory: () => dispatch(getHistory()),
    getTransactions: txHash => dispatch(getTransactions(txHash))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.History", styles)(HistoryScreen));
