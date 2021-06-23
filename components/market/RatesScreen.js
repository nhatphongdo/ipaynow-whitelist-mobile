import React from "react";
import { Platform, FlatList } from "react-native";
import { connect } from "react-redux";
import { connectStyle, Container, Content, View, Picker } from "native-base";
import ThemeService from "../../services/ThemeService";
import { translate } from "../../constants/Languages";
import Screen from "../shared/Screen";
import TabNavigation from "../shared/TabNavigation";
import GroupBox from "../shared/GroupBox";
import AccountCard from "../shared/AccountCard";
import Search from "../shared/Search";
import Segment from "../shared/Segment";
import ListItem from "../shared/ListItem";
import { SUPPORTED_CURRENCIES, SUPPORTED_SOURCES } from "../../stores/rates/constants";
import { formatRate } from "../../common/helper";
import { convertRateSync } from "../../stores/rates/actions";

class RatesScreen extends React.Component {
  state = {
    baseCurrency: this.props.settings.currency,
    source: "CMC",
    search: ""
  };

  onBaseCurrencyChange(value) {
    this.setState({
      baseCurrency: value
    });
  }

  onSourceChanged = (item, index, prevIndex) => {
    this.setState({ source: item });
  };

  getCurrencies = () => {
    let currencies = Object.keys(SUPPORTED_CURRENCIES)
      .sort()
      .filter(item => item.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0);
    // Remove selected one
    const index = currencies.indexOf(this.state.baseCurrency);
    if (index >= 0) {
      currencies.splice(index, 1);
    }
    return currencies;
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => {
    const styles = this.props.style;
    const currency = SUPPORTED_CURRENCIES[item];
    const Icon = currency.image;
    const rate = convertRateSync(this.props.rates.rates, this.state.baseCurrency, item, 1, this.state.source);
    return (
      <ListItem
        horizontal
        mainTextStyle={styles.itemMainText}
        subTextStyle={styles.itemSubText}
        leftStyle={styles.leftStyle}
        icon={<Icon width={30} height={30} />}
        mainText={item}
        subText={formatRate(rate)}
        subNumberOfLines={1}
      />
    );
  };

  render() {
    const styles = this.props.style;
    const RatesIcon = ThemeService.getThemeStyle().variables.ratesIcon;
    const DropdownIcon = ThemeService.getThemeStyle().variables.dropdownIcon;

    const currencies = Object.keys(SUPPORTED_CURRENCIES).sort();
    const exchanges = Object.keys(SUPPORTED_SOURCES).map(item => SUPPORTED_SOURCES[item].name);

    return (
      <Screen title={translate("RATES")}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            {false && <AccountCard small hideReward hideWallet />}
            <GroupBox icon={<RatesIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate("RATES")} fullHeight smallSpaceTop>
              <View row flexCenter>
                <Search placeholder={translate("Filter")} onTextChanged={text => this.setState({ search: text })} />
                <Picker
                  spaceLeft
                  shadow
                  mode="dialog"
                  iosHeader={translate("Select preferred currency")}
                  iosIcon={<DropdownIcon />}
                  headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                  headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                  itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                  selectedValue={this.state.baseCurrency}
                  onValueChange={this.onBaseCurrencyChange.bind(this)}
                >
                  {currencies.map((item, index) => (
                    <Picker.Item key={index} label={SUPPORTED_CURRENCIES[item].picker} value={item} />
                  ))}
                </Picker>
              </View>
              {/* <Segment smallSpaceTop data={exchanges} onSelectionChanged={this.onSourceChanged} /> */}
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={this.getCurrencies()}
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
  const { settings, rates } = state;
  return { settings, rates };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("iPayNow.Rates", styles)(RatesScreen));
