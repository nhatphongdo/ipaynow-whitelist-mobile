import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View } from 'native-base'
import CountryPicker, { getAllCountries, FlagType } from 'react-native-country-picker-modal'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from 'rn-placeholder'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import AccountCard from '../shared/AccountCard'
import Search from '../shared/Search'
import Segment from '../shared/Segment'
import MerchantItem from './MerchantItem'
import CloseLight from '../../assets/images/close-light.png'
import CloseDark from '../../assets/images/close-dark.png'
import { getCategories, getMerchants } from '../../stores/account/actions'
import { AVAILABLE_LANGUAGES } from '../../stores/settings/constants'
import Button from '../shared/Button'
import StyledText from '../shared/StyledText'

class MerchantsScreen extends React.Component {
  state = {
    category: '',
    categories: [],
    cca2: 'US',
    country: '',
    search: '',

    countryPickerVisible: false,

    merchants: [null, null, null, null, null],
  }

  componentDidMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    // Check location
    this._getLocationAsync()

    // Get categories
    const categories = await this.props.getCategories()
    this.setState({ categories })
  }

  _getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync()
        const address = await Location.reverseGeocodeAsync(location.coords)
        if (address.length >= 1) {
          this.setState(
            {
              cca2: address[0].isoCountryCode,
              country: address[0].country,
            },
            this.loadMerchants
          )
          return
        }
      }
    } catch (error) {}
    const countryData = (await getAllCountries(FlagType.EMOJI, AVAILABLE_LANGUAGES[this.props.settings.language].countryPicker))
      .filter((c) => c.cca2 === 'US')
      .pop()
    this.setState(
      {
        cca2: 'US',
        country: countryData.name,
      },
      this.loadMerchants
    )
  }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item, index }) => {
    const styles = this.props.style
    if (!item) {
      return (
        <Placeholder Animation={Shine} Left={(props) => <PlaceholderMedia isRound={true} style={props.style} />} style={styles.merchantItem}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      )
    }

    return <MerchantItem data={item} />
  }

  onCategoryChanged = (category, index) => {
    if (index === 0) {
      this.setState({ category: '' }, this.loadMerchants)
    } else {
      this.setState({ category: this.state.categories[index - 1].name }, this.loadMerchants)
    }
  }

  loadMerchants = async () => {
    this.setState({ merchants: [null, null, null, null, null] })
    const merchants = await this.props.getMerchants(this.state.search, this.state.cca2, this.state.category)
    this.setState({ merchants })
  }

  render() {
    const styles = this.props.style
    const MerchantsIcon = ThemeService.getThemeStyle().variables.merchantsIcon

    const categories = [translate('ALL')].concat(this.state.categories.map((item) => (item[this.props.settings.language] || item.name).toUpperCase()))

    return (
      <Screen title={translate('MERCHANTS')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* <AccountCard small hideReward hideWallet /> */}
            <GroupBox
              smallSpaceTop
              icon={<MerchantsIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />}
              title={translate('MERCHANTS')}
              fullHeight
            >
              <View row flexCenter>
                <Search
                  placeholder={translate('Search') + ' ' + this.state.country}
                  onTextChanged={(text) => this.setState({ search: text }, this.loadMerchants)}
                />
                <Button
                  smallSpaceLeft
                  shadow
                  style={styles.countryPicker}
                  onPress={() => {
                    this.setState({ countryPickerVisible: true })
                  }}
                >
                  <CountryPicker
                    onSelect={(value) => {
                      this.setState({ cca2: value.cca2, country: value.name }, this.loadMerchants)
                    }}
                    onClose={() => {
                      this.setState({ countryPickerVisible: false })
                    }}
                    countryCode={this.state.cca2}
                    translation={AVAILABLE_LANGUAGES[this.props.settings.language].countryPicker}
                    visible={this.state.countryPickerVisible}
                    withFilter={true}
                    filterProps={{
                      placeholder: translate('Filter'),
                      placeholderTextColor:
                        ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark'
                          ? '#fff'
                          : '#000',
                    }}
                    withEmoji={true}
                    closeButtonImage={
                      ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark'
                        ? CloseDark
                        : CloseLight
                    }
                    filterPlaceholderTextColor={
                      ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark' ? '#fff' : '#000'
                    }
                    styles={
                      ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark'
                        ? darkTheme
                        : lightTheme
                    }
                  />
                  {false && (
                    <StyledText flexFull smallSpaceLeft smallSpaceRight style={styles.countryPickerTitle}>
                      {this.state.country}
                    </StyledText>
                  )}
                </Button>
              </View>
              <Segment smallSpaceTop data={categories} onSelectionChanged={this.onCategoryChanged} />
              {!this.state.merchants ||
                (this.state.merchants.length === 0 && (
                  <StyledText spaceTop info h3 center bold='medium'>
                    {translate('There is no merchant available')}
                  </StyledText>
                ))}
              {this.state.merchants && this.state.merchants.length > 0 && (
                <FlatList
                  style={styles.list}
                  contentContainerStyle={styles.listContent}
                  data={this.state.merchants}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
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
}

const lightTheme = StyleSheet.create({
  emojiFlag: {
    lineHeight: 32,
  },
  countryName: {
    fontFamily: ThemeService.getThemeStyle().variables.fontFamilyMedium,
  },
  itemCountryName: {
    borderBottomWidth: 0,
  },
})

const darkTheme = StyleSheet.create({
  emojiFlag: {
    lineHeight: 32,
  },
  modalContainer: {
    backgroundColor: '#1b213b',
  },
  contentContainer: {
    backgroundColor: '#1b213b',
  },
  header: {
    backgroundColor: '#1b213b',
  },
  itemCountryName: {
    borderBottomWidth: 0,
  },
  countryName: {
    fontFamily: ThemeService.getThemeStyle().variables.fontFamilyMedium,
    color: '#ffaeb5',
  },
  letterText: {
    color: '#ffaeb5',
  },
  input: {
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ffaeb5',
  },
})

const mapStateToProps = (state) => {
  const { settings } = state
  return { settings }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    getMerchants: (search, country, category) => dispatch(getMerchants(search, country, category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Merchants', styles)(MerchantsScreen))
