import React from 'react'
import { Image, FlatList, Platform } from 'react-native'
import { connect } from 'react-redux'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { connectStyle, Container, Content, View, Thumbnail, Item, Label, Input, Spinner } from 'native-base'
import Modal from 'react-native-modal'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { LinearGradient } from 'expo-linear-gradient'
import { showLocation } from 'react-native-map-link'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import AccountCard from '../shared/AccountCard'
import Segment from '../shared/Segment'
import StyledText from '../shared/StyledText'
import Rating from '../shared/Rating'
import Button from '../shared/Button'
import Blockie from '../shared/Blockie'
import { clone, formatTime, getImageLink } from '../../common/helper'
import { getMerchant, reviewMerchant } from '../../stores/account/actions'
import DropdownAlertService from '../../services/DropdownAlertService'

class MerchantDetailScreen extends React.Component {
  state = {
    sliderActiveSlide: 0,
    merchant: {
      vendorName: '',
      vendorDescription: '',
      vendorContactNumber: '',
      vendorService: '',
      vendorAddress: '',
      vendorAddressLocation: '',
      vendorImages: [],
      vendorLogo: null,
      merchantReviews: [],
    },
    marker: [0, 0],

    reviewTitle: '',
    reviewCotent: '',
    reviewRate: 0,
    submitting: false,

    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
    navigationShowing: false,
  }

  componentDidMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    // Get location
    this._getLocationAsync()

    // Get merchant
    const merchant = await this.props.getMerchant(this.props.route.params?.id || 0)
    if (!merchant) {
      this.props.navigation.goBack()
    } else {
      let marker = []
      if (merchant.vendorAddressLocation) {
        marker = merchant.vendorAddressLocation.split(',').map((item) => parseFloat(item))
      }
      if (marker.length !== 2) {
        marker = [0, 0]
      }
      this.setState({ merchant, marker })
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      // Request permissions
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION)
      if (status === 'granted') {
      } else {
        return
      }
    }

    const location = await Location.getCurrentPositionAsync({})
    this.setState({ currentLocation: location.coords })
  }

  onSelectionChanged = (item, index) => {
    if (index === 0) {
      this.scroll._root.scrollIntoView(this.info)
    } else if (index === 1) {
      this.scroll._root.scrollIntoView(this.location)
    } else if (index === 2) {
      this.scroll._root.scrollIntoView(this.review)
    }
  }

  _renderImage = ({ item, index }) => {
    const styles = this.props.style
    return (
      <View bigDarkShadow flexFull>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: getImageLink(item) }} />
        </View>
      </View>
    )
  }

  onMapReady = () => {
    this._marker.showCallout()
  }

  onDirectionReady = (result) => {
    if (!result) {
      return
    }

    this._mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: 20,
        bottom: 20,
        left: 20,
        top: 20,
      },
    })
  }

  _keyExtractor = (item, index) => index.toString()

  _renderReviewItem = ({ item }) => {
    const styles = this.props.style
    return (
      <View row spaceTop>
        <View center style={{ width: 70 }}>
          <View style={styles.itemAvatar}>
            <Blockie size={10} scale={5} seed={item.reviewerWalletAddress} />
          </View>
          <StyledText tinySpaceTop>{item.reviewer}</StyledText>
        </View>
        <View flexFull spaceLeft>
          <StyledText bold='medium'>{item.title}</StyledText>
          <View row flexFull center tinySpaceTop>
            <Rating rates={item.rate} />
            <StyledText smallSpaceLeft note style={{ flex: 1, flexWrap: 'wrap' }}>
              {`${translate('on')} ${formatTime(item.time, 'HH:mm:ss, Do MMMM, YYYY')}`}
            </StyledText>
          </View>
          <StyledText tinySpaceTop>{item.content}</StyledText>
        </View>
      </View>
    )
  }

  onDirection = () => {
    // this.setState({ navigationShowing: true };
    showLocation({
      latitude: this.state.marker[0],
      longitude: this.state.marker[1],
      sourceLatitude: this.state.currentLocation.latitude, // optionally specify starting location for directions
      sourceLongitude: this.state.currentLocation.longitude, // not optional if sourceLatitude is specified
      appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      app: 'google-maps', // optionally specify specific app to use
    })
  }

  onSubmitReview = async () => {
    if (!this.state.reviewTitle || this.state.reviewTitle === '') {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Review title is missing'))
      return
    }
    if (!this.state.reviewContent || this.state.reviewContent === '') {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Review content is missing'))
      return
    }
    if (this.state.reviewRate === 0) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Review rating is missing'))
      return
    }

    this.setState({ submitting: true })
    const result = await this.props.reviewMerchant(
      this.props.route.params?.id || 0,
      this.state.reviewTitle,
      this.state.reviewContent,
      this.state.reviewRate
    )
    this.setState({ submitting: false })
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
      return
    }

    // Update result to view
    const merchant = clone(this.state.merchant)
    if (!merchant.merchantReviews) {
      merchant.merchantReviews = []
    }
    merchant.merchantReviews.unshift(result.result)
    this.setState({ merchant })
  }

  render() {
    const sections = [translate('INFORMATION'), translate('LOCATION'), translate('REVIEW')]
    const marker = {
      latitude: this.state.marker[0],
      longitude: this.state.marker[1],
    }
    const styles = this.props.style
    const MerchantsIcon = ThemeService.getThemeStyle().variables.merchantsIcon
    const DirectionIcon = ThemeService.getThemeStyle().variables.directionIcon

    return (
      <Screen title={translate('MERCHANTS')}>
        <Container style={styles.container}>
          <Content
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            ref={(ref) => {
              this.scroll = ref
            }}
          >
            {/* <AccountCard small hideReward hideWallet /> */}
            <GroupBox smallSpaceTop icon={<MerchantsIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />} title={translate('MERCHANTS')}>
              <Segment smallSpaceBottom data={sections} onSelectionChanged={this.onSelectionChanged} />
              <View ref={(ref) => (this.info = ref)}>
                <Carousel
                  ref={(c) => (this._carousel = c)}
                  layout={'tinder'}
                  layoutCardOffset={9}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  loop={true}
                  data={this.state.merchant.vendorImages}
                  renderItem={this._renderImage}
                  sliderWidth={ThemeService.getThemeStyle().variables.deviceWidth - ThemeService.getThemeStyle().variables.screenPadding * 2}
                  itemWidth={ThemeService.getThemeStyle().variables.deviceWidth - ThemeService.getThemeStyle().variables.screenPadding * 2}
                  onSnapToItem={(index) => this.setState({ sliderActiveSlide: index })}
                />
                <Pagination
                  dotsLength={this.state.merchant.vendorImages.length}
                  activeDotIndex={this.state.sliderActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={ThemeService.getThemeStyle().variables.buttonToggleOnColor}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={ThemeService.getThemeStyle().variables.buttonToggleOffColor}
                  inactiveDotOpacity={0.8}
                  inactiveDotScale={0.6}
                  carouselRef={this._carousel}
                  tappableDots={!!this._carousel}
                />
                <View row spaceTop center>
                  <Thumbnail style={styles.logo} source={{ uri: getImageLink(this.state.merchant.vendorLogo) }} />
                  <View flexFull spaceLeft spaceRight>
                    <StyledText large bold='bold' numberOfLines={2} adjustsFontSizeToFit style={Platform.OS === 'ios' ? { lineHeight: 0 } : {}}>
                      {this.state.merchant.vendorName}
                    </StyledText>
                    <StyledText h4 info bold='medium'>
                      {this.state.merchant.vendorService}
                    </StyledText>
                    <StyledText h4 info bold='medium' numberOfLines={1} adjustsFontSizeToFit>
                      {this.state.merchant.vendorContactNumber}
                    </StyledText>
                  </View>
                </View>
                <View row center spaceLeft style={styles.ratingContainer}>
                  <Rating
                    rates={
                      this.state.merchant.merchantReviews.length === 0
                        ? 0
                        : this.state.merchant.merchantReviews.reduce((total, item) => total + item.rate, 0) /
                          this.state.merchant.merchantReviews.length
                    }
                  />
                  <StyledText smallSpaceLeft bold='medium'>
                    ({this.state.merchant.merchantReviews.length})
                  </StyledText>
                </View>
              </View>
              <View spaceTop separatorTop fullWidth padder>
                <StyledText spaceTop>{this.state.merchant.vendorDescription}</StyledText>
              </View>
              <View row spaceTop separatorTop fullWidth style={styles.mapContainer} ref={(ref) => (this.location = ref)}>
                <MapView
                  style={styles.map}
                  // provider="google"
                  loadingEnabled={true}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  toolbarEnabled={true}
                  onMapReady={this.onMapReady}
                  region={{
                    latitude: marker.latitude,
                    longitude: marker.longitude - 0.0004,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                  }}
                >
                  <Marker ref={(ref) => (this._marker = ref)} coordinate={marker} title={this.state.merchant.vendorName} />
                </MapView>
                <LinearGradient style={styles.overlay} colors={['rgba(84, 84, 84, 0.7)', 'rgba(84, 84, 84, 0)']} start={[0, 0.5]} end={[1, 0.5]}>
                  <StyledText h4 bold='medium' style={styles.address}>
                    {this.state.merchant.vendorAddress}
                  </StyledText>
                  <Button iconLeft spaceTop onPress={this.onDirection}>
                    <DirectionIcon height={24} />
                    <StyledText smallSpaceLeft style={styles.direction}>
                      {translate('Get direction')}
                    </StyledText>
                  </Button>
                </LinearGradient>
              </View>
              <View separatorTop fullWidth padder ref={(ref) => (this.review = ref)}>
                <StyledText spaceTop bold='medium'>{`${this.state.merchant.merchantReviews.length} ${
                  this.state.merchant.merchantReviews.length === 1 ? translate('review') : translate('reviews')
                }`}</StyledText>
                <FlatList
                  data={this.state.merchant.merchantReviews}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderReviewItem}
                />
              </View>
              {this.state.merchant.merchantReviews.filter((item) => item.reviewer === this.props.account.accountNumber).length === 0 && (
                <View spaceTop separatorTop fullWidth padder>
                  <StyledText spaceTop bold='medium'>
                    {translate('Your review')}
                  </StyledText>
                  <Item stackedLabel underline transparent spaceTop>
                    <Label>{translate('Title')}</Label>
                    <Input value={this.state.reviewTitle} onChangeText={(text) => this.setState({ reviewTitle: text })} />
                  </Item>
                  <Item stackedLabel underline transparent spaceTop>
                    <Label>{translate('Content')}</Label>
                    <Input multiline large value={this.state.reviewContent} onChangeText={(text) => this.setState({ reviewContent: text })} />
                  </Item>
                  <Rating
                    style={styles.rating}
                    large
                    changable
                    rates={this.state.reviewRate}
                    onRateChanged={(rate) => this.setState({ reviewRate: rate })}
                  />
                  <Button primary spaceTop flexFull onPress={this.onSubmitReview} disabled={this.state.submitting}>
                    {!this.state.submitting && <StyledText>{translate('SUBMIT REVIEW')}</StyledText>}
                    {this.state.submitting && <Spinner color='#fff' />}
                  </Button>
                </View>
              )}
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
        <Modal
          isVisible={this.state.navigationShowing}
          animationIn='bounceIn'
          animationOut='bounceOut'
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          avoidKeyboard={true}
          backdropOpacity={0.8}
          style={ThemeService.getThemeStyle().modalScreen}
        >
          {this.state.navigationShowing && (
            <View flexFull flexCenter padder>
              <View flexFull style={{ alignSelf: 'stretch' }}>
                <MapView
                  ref={(c) => (this._mapView = c)}
                  style={styles.map}
                  provider='google'
                  loadingEnabled={true}
                  showsUserLocation={true}
                  toolbarEnabled={true}
                  region={{
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                  }}
                >
                  <MapViewDirections
                    origin={this.state.currentLocation}
                    destination={marker}
                    apikey={this.props.settings.googleMapApiKey}
                    strokeWidth={3}
                    strokeColor='blue'
                    onReady={this.onDirectionReady}
                  />
                </MapView>
              </View>
              <Button spaceTop spaceBottom thirdary onPress={() => this.setState({ navigationShowing: false })}>
                {translate('Close')}
              </Button>
            </View>
          )}
        </Modal>
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
}

const mapStateToProps = (state) => {
  const { account, settings } = state
  return { account, settings }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchant: (id) => dispatch(getMerchant(id)),
    reviewMerchant: (id, title, content, rates) => dispatch(reviewMerchant(id, title, content, rates)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.MerchantDetail', styles)(MerchantDetailScreen))
