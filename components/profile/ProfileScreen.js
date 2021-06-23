import React from 'react'
import { FlatList, Image, Platform, BackHandler, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Item, Label, Input, Picker, Spinner } from 'native-base'
import * as LocalAuthentication from 'expo-local-authentication'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import * as Location from 'expo-location'
import * as WebBrowser from 'expo-web-browser'
import Constants from 'expo-constants'
import i18n from 'i18n-js'
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import MapView, { Marker } from 'react-native-maps'
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
import { clone, getImageLink } from '../../common/helper'
import { PRIVATE, SHARED, PUBLIC } from '../../stores/account/constants'
import { AVAILABLE_LANGUAGES, AVAILABLE_THEMES } from '../../stores/settings/constants'
import { setSetting } from '../../stores/settings/actions'
import { SUPPORTED_CURRENCIES } from '../../stores/rates/constants'
import { updateProfile, updateMerchant, cancelMerchant, getCategories } from '../../stores/account/actions'
import DropdownAlertService from '../../services/DropdownAlertService'
import { EnterPinCode, ChoosePinCode } from '../init/PinCodeScreen'
import { showAlert, hideAlert } from '../../stores/alert/actions'
import { clear } from '../../stores/storage/actions'
import { storePinCode } from '../../stores/pincode/actions'
import { DEBUG } from '../../constants/Constants'
import NavigationService from '../../services/NavigationService'
import CloseLight from '../../assets/images/close-light.png'
import CloseDark from '../../assets/images/close-dark.png'

const AnimatableView = Animatable.createAnimatableComponent(View)

const MaxAvatarWidth = 512
const MaxImageWidth = 1280

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enableScrollViewScroll: true,
      sectionAnimations: ['slideInRight', 'slideInRight', 'slideInRight'],
      section: 0,

      fullName: props.account.fullName,
      email: props.account.email,
      contactNumber: props.account.contactNumber,
      paymentInfo: props.account.paymentInfo,
      availability: props.account.availability,
      basicSaving: false,

      isMerchant: props.account.isMerchant,
      vendorName: props.account.vendorName,
      vendorAddress: props.account.vendorAddress,
      vendorCountry: props.account.vendorCountry,
      vendorContactNumber: props.account.vendorContactNumber,
      vendorService: props.account.vendorService,
      vendorCategory: props.account.vendorCategory,
      vendorDescription: props.account.vendorDescription,
      vendorLogo: props.account.vendorLogo,
      vendorImages: props.account.vendorImages,
      country: '',
      vendorPin:
        props.account.vendorAddressLocation && props.account.vendorAddressLocation !== ''
          ? props.account.vendorAddressLocation.split(',').map(i => parseFloat(i))
          : [],

      categories: [],
      location: null,

      merchantSaving: false,
      privateShowing: false,
      pinOnMapShowing: false,
      hardwareAuthenticationTypes: [],
      hardwareAuthenticationEnabled: false
    }
  }

  componentDidMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    try {
      const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync()
      if (hasHardwareAuth) {
        const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()
        let enabled = await LocalAuthentication.isEnrolledAsync()
        enabled = enabled && supportedTypes.length > 0
        this.setState({
          hardwareAuthenticationTypes: supportedTypes,
          hardwareAuthenticationEnabled: enabled
        })
      } else {
        this.setState({ hardwareAuthenticationEnabled: false })
      }
    } catch (e) {
      console.log(e)
      this.setState({ hardwareAuthenticationEnabled: false })
    }

    // Check location
    this._getLocationAsync()

    // Get categories
    const categories = await this.props.getCategories()
    const defaultCategory = categories.length > 0 ? categories[0].name : ''
    this.setState({
      categories,
      vendorCategory: this.state.vendorCategory || defaultCategory
    })
  }

  _getLocationAsync = async () => {
    if (this.state.vendorCountry) {
      const countryData = getAllCountries()
        .filter(c => c.cca2.toLowerCase() === this.state.vendorCountry)
        .pop()
      if (countryData) {
        this.setState({ country: countryData.name[AVAILABLE_LANGUAGES[this.props.settings.language].countryPicker] })
      }
    }

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
    const address = await Location.reverseGeocodeAsync(location.coords)
    if (address.length >= 1) {
      if (this.state.vendorCountry) {
        this.setState({
          location: {
            coords: location.coords,
            address: address[0]
          },
          vendorPin: this.state.vendorPin.length === 0 ? [location.coords.latitude, location.coords.longitude] : this.state.vendorPin
        })
      } else {
        this.setState({
          location: {
            coords: location.coords,
            address: address[0]
          },
          vendorCountry: address[0].isoCountryCode,
          country: address[0].country,
          vendorPin: this.state.vendorPin.length === 0 ? [location.coords.latitude, location.coords.longitude] : this.state.vendorPin
        })
      }
    } else {
      this.setState({
        location: {
          coords: location.coords,
          address: null
        },
        vendorPin: this.state.vendorPin.length === 0 ? [location.coords.latitude, location.coords.longitude] : this.state.vendorPin
      })
    }
  }

  onEnableScroll = value => {
    this.setState({
      enableScrollViewScroll: value
    })
  }

  onSectionChanged = (item, index, prevIndex) => {
    this.setState({ section: index })
    if (prevIndex < index) {
      // From left to right
      let sectionAnimations = clone(this.state.sectionAnimations)
      sectionAnimations[prevIndex] = 'slideOutLeft'
      sectionAnimations[index] = 'slideInRight'
      this.setState({ sectionAnimations })
    } else {
      // From right to left
      let sectionAnimations = clone(this.state.sectionAnimations)
      sectionAnimations[prevIndex] = 'slideOutRight'
      sectionAnimations[index] = 'slideInLeft'
      this.setState({ sectionAnimations })
    }
  }

  onCategoryChange(value) {
    this.setState({
      vendorCategory: value
    })
  }

  onLanguageChange(value) {
    this.props.setSetting({
      language: value,
      culture: AVAILABLE_LANGUAGES[value].culture
    })
    i18n.locale = value

    // Save to server
    this.props.updateProfile(this.state.fullName, this.state.email, this.state.availability, this.state.contactNumber, this.state.paymentInfo, value)
  }

  onCurrencyChange(value) {
    this.props.setSetting({
      currency: value
    })
  }

  onThemeChange(value) {
    this.props.setSetting({
      theme: value
    })
  }

  onAvailabilityChanged = option => {
    this.setState({ availability: option })
  }

  onBasicSave = async () => {
    this.setState({
      basicSaving: true
    })
    const result = await this.props.updateProfile(
      this.state.fullName,
      this.state.email,
      this.state.availability,
      this.state.contactNumber,
      this.state.paymentInfo,
      this.props.settings.language
    )
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
      return
    }

    DropdownAlertService.show(DropdownAlertService.SUCCESS, translate('Success'), translate('Update Profile successfully'))
    this.setState({
      basicSaving: false,
      fullName: this.props.account.fullName,
      email: this.props.account.email,
      availability: this.props.account.availability,
      contactNumber: this.props.account.contactNumber,
      paymentInfo: this.props.account.paymentInfo
    })
  }

  onBackupKey = async () => {
    // Verify pin
    this.props.navigation.navigate('PinCode', {
      type: EnterPinCode,
      mustVerifyPinCode: true,
      onEnterSuccess: pin => {
        // Show private key
        setTimeout(() => {
          this.setState({ privateShowing: true })
        }, 1000)
      }
    })
  }

  onChangePinCode = async () => {
    // Verify pin
    this.props.navigation.navigate('PinCode', {
      type: EnterPinCode,
      mustVerifyPinCode: true,
      onEnterSuccess: pin => {
        // Show change pin, delay so goBack animation finishes
        setTimeout(() => {
          this.props.navigation.navigate('PinCode', {
            type: ChoosePinCode,
            choosePinCode: (result, newPin) => {
              console.log(result, newPin)
            }
          })
        }, 1000)
      }
    })
  }

  onHardwareAuthChanged = async () => {
    const isEnabled = this.props.settings.hardwareAuthEnabled && this.props.pincode.storedPin && this.props.pincode.storedPin.length > 0
    if (!isEnabled) {
      // Verify pin
      this.props.navigation.navigate('PinCode', {
        type: EnterPinCode,
        mustVerifyPinCode: true,
        onEnterSuccess: async pin => {
          // Store pin
          await this.props.storePinCode(pin)
          this.props.setSetting({
            hardwareAuthEnabled: true
          })
        }
      })
    } else {
      // Clear stored pin
      await this.props.storePinCode([])
      this.props.setSetting({
        hardwareAuthEnabled: false
      })
    }
  }

  onAlwaysVerifyChanged = () => {
    this.props.setSetting({
      alwaysVerifyBeforeSend: !this.props.settings.alwaysVerifyBeforeSend
    })
  }

  onSignOut = async () => {
    this.props.showAlert({
      title: translate('Warning!'),
      message: translate(
        'Do you really want to sign out YOUR WALLET AND FUNDS WILL BE ERASED TOTALLY FROM YOUR PHONE AND YOU CANNOT RESTORE WITHOUT YOUR BACKUP PHRASES We cannot help you to recover it later Application may close after you confirm'
      ),
      showConfirmButton: true,
      onConfirmPressed: async () => {
        this.props.showAlert({
          title: translate('Wait for processing'),
          showProgress: true,
          closeOnHardwareBackPress: false,
          closeOnTouchOutside: false,
          progressSize: 'large',
          showCancelButton: false
        })

        // Clear
        await this.props.clear()
        await this.props.hideAlert()

        // Back to Init
        NavigationService.navigate('NewUser')
        if (Platform.OS === 'android') {
          BackHandler.exitApp()
        }
      }
    })
  }

  onApplyMerchant = () => {
    this.setState({ isMerchant: true })
  }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item, index }) => {
    const styles = this.props.style
    const DeleteIcon = ThemeService.getThemeStyle().variables.deleteIcon
    return (
      <View shadow first={index === 0} last={index === this.state.vendorImages.length - 1} style={styles.imageItem}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: getImageLink(item) }} />
        </View>
        <View style={styles.overlay}>
          <Button style={styles.delete} onPress={() => this.deleteImage(item)}>
            <DeleteIcon width={15} height={15} />
          </Button>
        </View>
      </View>
    )
  }

  logoPicker = async () => {
    const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      // Request permissions
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      if (status === 'granted') {
      } else {
        return
      }
    }

    // launchImageLibraryAsync
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.cancelled) {
      if (result.width > MaxAvatarWidth) {
        const image = await ImageManipulator.manipulateAsync(
          result.uri,
          [
            {
              resize: {
                width: MaxAvatarWidth
              }
            }
          ],
          {
            compress: 1,
            format: 'jpeg'
          }
        )
        this.setState({
          vendorLogo: image.uri
        })
      } else {
        this.setState({
          vendorLogo: result.uri
        })
      }
    }
  }

  onDeleteLogo = () => {
    this.setState({ vendorLogo: null })
  }

  onAddressBlur = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      return
    }

    const location = await Location.geocodeAsync(this.state.vendorAddress)
    if (location.length > 0) {
      this.setState({
        vendorPin: [location[0].latitude, location[0].longitude]
      })
    }
  }

  onPinOnMap = () => {
    this.setState({ pinOnMapShowing: true })
  }

  onMapPress = event => {
    this.setState({
      vendorPin: [event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude]
    })
  }

  addImage = async () => {
    this.onEnableScroll(true)
    const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      // Request permissions
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      if (status === 'granted') {
      } else {
        return
      }
    }

    // launchImageLibraryAsync
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: Platform.OS === 'android',
      quality: 1
    })

    if (!result.cancelled) {
      if (result.width > MaxImageWidth) {
        const image = await ImageManipulator.manipulateAsync(
          result.uri,
          [
            {
              resize: {
                width: MaxImageWidth
              }
            }
          ],
          {
            compress: 1,
            format: 'jpeg'
          }
        )
        const newImages = clone(this.state.vendorImages)
        newImages.push(image.uri)
        this.setState({ vendorImages: newImages })
      } else {
        const newImages = clone(this.state.vendorImages)
        newImages.push(result.uri)
        this.setState({ vendorImages: newImages })
      }
    }
  }

  deleteImage = image => {
    this.onEnableScroll(true)
    const newImages = []
    for (let i = 0; i < this.state.vendorImages.length; i++) {
      if (this.state.vendorImages[i] !== image) {
        newImages.push(this.state.vendorImages[i])
      }
    }
    this.setState({ vendorImages: newImages })
  }

  onMerchantSave = async () => {
    this.onEnableScroll(true)
    // Validate
    if (!this.state.vendorName) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Vendor name is missing'))
      return
    }
    if (!this.state.vendorAddress) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Vendor address is missing'))
      return
    }
    if (!this.state.vendorCategory) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate('Category is missing'))
      return
    }

    this.setState({
      merchantSaving: true
    })
    const result = await this.props.updateMerchant(
      this.state.vendorName,
      this.state.vendorLogo,
      this.state.vendorAddress,
      this.state.vendorCountry,
      this.state.vendorPin.join(','),
      this.state.vendorContactNumber,
      this.state.vendorDescription,
      this.state.vendorService,
      this.state.vendorCategory,
      this.state.vendorImages
    )
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
      return
    }

    DropdownAlertService.show(DropdownAlertService.SUCCESS, translate('Success'), translate('Update Merchant information successfully'))

    let countryData = null
    if (this.props.account.vendorCountry) {
      countryData = getAllCountries()
        .filter(c => c.cca2.toLowerCase() === this.props.account.vendorCountry)
        .pop()
    }

    this.setState({
      merchantSaving: false,
      isMerchant: this.props.account.isMerchant,
      vendorName: this.props.account.vendorName,
      vendorAddress: this.props.account.vendorAddress,
      vendorCountry: this.props.account.vendorCountry,
      vendorContactNumber: this.props.account.vendorContactNumber,
      vendorService: this.props.account.vendorService,
      vendorCategory: this.props.account.vendorCategory,
      vendorDescription: this.props.account.vendorDescription,
      vendorLogo: this.props.account.vendorLogo,
      vendorImages: this.props.account.vendorImages,
      vendorPin:
        this.props.account.vendorAddressLocation && this.props.account.vendorAddressLocation !== ''
          ? this.props.account.vendorAddressLocation.split(',').map(i => parseFloat(i))
          : [],
      country: countryData ? countryData.name[AVAILABLE_LANGUAGES[this.props.settings.language].countryPicker] : ''
    })
  }

  onContactUs = async () => {
    await WebBrowser.openBrowserAsync('https://haladinar.io/hdn2/contact.html')
  }

  onMerchantCancel = async () => {
    this.setState({
      merchantSaving: true
    })
    const result = await this.props.cancelMerchant()
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
      return
    }

    DropdownAlertService.show(DropdownAlertService.SUCCESS, translate('Success'), translate('Update Merchant information successfully'))

    this.setState({
      merchantSaving: false,
      isMerchant: this.props.account.isMerchant
    })
  }

  render() {
    const styles = this.props.style
    const ProfileIcon = ThemeService.getThemeStyle().variables.profileIcon
    const CheckBoxIcon = ThemeService.getThemeStyle().variables.checkBoxIcon
    const DropdownIcon = ThemeService.getThemeStyle().variables.dropdownIcon
    const DeleteIcon = ThemeService.getThemeStyle().variables.deleteIcon
    const ContactUs = ThemeService.getThemeStyle().variables.contactUs

    const sections = [translate('BASIC'), translate('MERCHANT'), translate('SETTINGS')]
    const languages = Object.keys(AVAILABLE_LANGUAGES)
    const currencies = Object.keys(SUPPORTED_CURRENCIES).filter(item => item.toLowerCase() !== 'eth')
    const themes = Object.keys(AVAILABLE_THEMES)

    return (
      <Screen
        title={translate('PROFILE')}
        right={
          <Button style={styles.contactUsButton} onPress={this.onContactUs}>
            <ContactUs height={15} />
          </Button>
        }
      >
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer} scrollEnabled={this.state.enableScrollViewScroll}>
            <AccountCard />
            <GroupBox icon={<ProfileIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />}>
              <Segment data={sections} onSelectionChanged={this.onSectionChanged} />
              {this.state.section === 0 && (
                <AnimatableView spaceTop fill animation={this.state.sectionAnimations[0]} duration={400} useNativeDriver={true}>
                  <StyledText bold='medium'>
                    {translate(
                      'You can provide personal information for other people to recognize you We only show your information if you accept a request from other in OTC Exchange, or if you set it as public'
                    )}
                  </StyledText>
                  <Item stackedLabel underline spaceTop transparent>
                    <Label>{translate('Your full name')}</Label>
                    <Input value={this.state.fullName} onChangeText={text => this.setState({ fullName: text })} />
                  </Item>
                  <Item stackedLabel underline spaceTop transparent>
                    <Label>{translate('Your email')}</Label>
                    <Input keyboardType='email-address' value={this.state.email} onChangeText={text => this.setState({ email: text })} />
                  </Item>
                  <Item stackedLabel underline spaceTop transparent>
                    <Label>{translate('Your contact number')}</Label>
                    <Input keyboardType='phone-pad' value={this.state.contactNumber} onChangeText={text => this.setState({ contactNumber: text })} />
                  </Item>
                  <Item stackedLabel underline spaceTop transparent>
                    <Label>{translate('Your payment information')}</Label>
                    <Input
                      multiline
                      style={{ height: 3 * 30 }}
                      value={this.state.paymentInfo}
                      onChangeText={text => this.setState({ paymentInfo: text })}
                    />
                  </Item>
                  <Item spaceTop transparent>
                    <Label>{translate('Your rating')}</Label>
                    <View row center smallSpaceTop>
                      <Rating large rates={this.props.account.rating} />
                      <StyledText smallSpaceLeft>({this.props.account.ratingCount})</StyledText>
                    </View>
                  </Item>
                  <Item spaceTop transparent>
                    <Label>{translate('Availability')}</Label>
                    <View row smallSpaceTop flexWrap center>
                      <Button spaceRight checkbox checked={this.state.availability === PRIVATE} onPress={() => this.onAvailabilityChanged(PRIVATE)}>
                        <CheckBoxIcon
                          fill={
                            this.state.availability === PRIVATE
                              ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                              : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                          }
                          checked={this.state.availability === PRIVATE}
                        />
                        <StyledText>{translate('Private')}</StyledText>
                      </Button>
                      <Button spaceRight checkbox checked={this.state.availability === SHARED} onPress={() => this.onAvailabilityChanged(SHARED)}>
                        <CheckBoxIcon
                          fill={
                            this.state.availability === SHARED
                              ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                              : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                          }
                          checked={this.state.availability === SHARED}
                        />
                        <StyledText>{translate('Shared')}</StyledText>
                      </Button>
                      <Button checkbox checked={this.state.availability === PUBLIC} onPress={() => this.onAvailabilityChanged(PUBLIC)}>
                        <CheckBoxIcon
                          fill={
                            this.state.availability === PUBLIC
                              ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                              : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                          }
                          checked={this.state.availability === PUBLIC}
                        />
                        <StyledText>{translate('Public')}</StyledText>
                      </Button>
                    </View>
                  </Item>
                  <Button spaceTop primary flexFull onPress={this.onBasicSave} disabled={this.state.basicSaving}>
                    {!this.state.basicSaving && <StyledText>{translate('SAVE')}</StyledText>}
                    {this.state.basicSaving && <Spinner color='#fff' />}
                  </Button>
                </AnimatableView>
              )}
              {this.state.section === 1 && (
                <AnimatableView spaceTop fill animation={this.state.sectionAnimations[1]} duration={400} useNativeDriver={true}>
                  {!this.state.isMerchant && (
                    <StyledText bold='medium'>
                      {translate(
                        'You do not register as a merchant yet If you want to sell items through Ruby eco-system, you need to apply to become a merchant Please click on below button and do as guided'
                      )}
                    </StyledText>
                  )}
                  {!this.state.isMerchant && (
                    <Button spaceTop primary flexFull onPress={this.onApplyMerchant}>
                      {translate('APPLY MERCHANT')}
                    </Button>
                  )}
                  {this.state.isMerchant && (
                    <StyledText bold='medium'>
                      {translate('Please fill in the information so that buyers can find you on Ruby eco-system')}
                    </StyledText>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel underline spaceTop transparent>
                      <Label>{translate('Vendor name')}</Label>
                      <Input value={this.state.vendorName} onChangeText={text => this.setState({ vendorName: text })} />
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel spaceTop transparent>
                      <Label>{translate('Vendor logo')}</Label>
                      <View row center>
                        <View shadow style={styles.imageItem}>
                          <View style={styles.imageContainer}>
                            <Image style={[styles.image, styles.logoSize]} source={{ uri: getImageLink(this.state.vendorLogo) }} />
                          </View>
                          <View style={[styles.overlay, styles.logoSize]}>
                            <Button shadow style={styles.delete} onPress={this.onDeleteLogo}>
                              <DeleteIcon width={15} height={15} />
                            </Button>
                          </View>
                        </View>
                        <Button tiny tinySpaceLeft onPress={this.logoPicker}>
                          {translate('Select image')}
                        </Button>
                      </View>
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel underline spaceTop transparent>
                      <Label>{translate('Address')}</Label>
                      <Input
                        multiline
                        style={{ height: 2 * 30 }}
                        textContentType='streetAddressLine1'
                        value={this.state.vendorAddress}
                        onBlur={this.onAddressBlur}
                        onChangeText={text => this.setState({ vendorAddress: text })}
                      />
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel spaceTop transparent>
                      <Label>{translate('Country')}</Label>
                      <Button smallSpaceTop shadow style={styles.countryPicker} onPress={() => this._countryPicker.openModal()}>
                        <CountryPicker
                          ref={ref => (this._countryPicker = ref)}
                          onChange={value => {
                            this.setState({ vendorCountry: value.cca2.toLowerCase(), country: value.name })
                          }}
                          cca2={this.state.vendorCountry || 'us'}
                          translation={AVAILABLE_LANGUAGES[this.props.settings.language].countryPicker}
                          animationType='slide'
                          closeable={true}
                          filterable={true}
                          hideAlphabetFilter={true}
                          filterPlaceholder={translate('Filter')}
                          autoFocusFilter={false}
                          flagType='emoji'
                          closeButtonImage={
                            ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark'
                              ? CloseDark
                              : CloseLight
                          }
                          filterPlaceholderTextColor={
                            ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark'
                              ? '#fff'
                              : '#000'
                          }
                          styles={
                            ThemeService.getThemeStyle().name === 'colorful-dark' || ThemeService.getThemeStyle().name === 'simple-dark'
                              ? darkTheme
                              : lightTheme
                          }
                        />
                        <StyledText flexFull smallSpaceLeft smallSpaceRight style={styles.countryPickerTitle}>
                          {this.state.country}
                        </StyledText>
                      </Button>
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel spaceTop transparent>
                      <Label>{translate('Pin on map')}</Label>
                      <View row center>
                        <Input underline multiline flexFull value={this.state.vendorPin.join(',')} editable={false} height={30} />
                        <Button tiny tinySpaceLeft onPress={this.onPinOnMap}>
                          {translate('Pin on map')}
                        </Button>
                      </View>
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel underline spaceTop transparent>
                      <Label>{translate('Contact number')}</Label>
                      <Input
                        keyboardType='phone-pad'
                        textContentType='telephoneNumber'
                        value={this.state.vendorContactNumber}
                        onChangeText={text => this.setState({ vendorContactNumber: text })}
                      />
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel underline spaceTop transparent>
                      <Label>{translate('Description')}</Label>
                      <Input
                        multiline
                        style={{ height: 4 * 30 }}
                        value={this.state.vendorDescription}
                        onChangeText={text => this.setState({ vendorDescription: text })}
                      />
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel underline spaceTop transparent>
                      <Label>{translate('Service')}</Label>
                      <Input value={this.state.vendorService} onChangeText={text => this.setState({ vendorService: text })} />
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel spaceTop transparent>
                      <Label>{translate('Category')}</Label>
                      <Picker
                        smallSpaceTop
                        shadow
                        flexFull
                        mode='dialog'
                        iosHeader={translate('Select category')}
                        iosIcon={<DropdownIcon />}
                        textStyle={{ textAlign: 'left' }}
                        headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                        headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                        itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                        selectedValue={this.state.vendorCategory}
                        onValueChange={this.onCategoryChange.bind(this)}
                      >
                        {this.state.categories.map((item, index) => (
                          <Picker.Item key={index} label={item[this.props.settings.language.toLowerCase()]} value={item.name} />
                        ))}
                      </Picker>
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Item stackedLabel spaceTop transparent>
                      <Label>{translate('Images')}</Label>
                      <Button smallSpaceTop smallSpaceBottom center tiny onPress={this.addImage}>
                        {translate('Select image')}
                      </Button>
                      <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        horizontal
                        onTouchStart={() => {
                          this.onEnableScroll(false)
                        }}
                        onTouchEnd={() => {
                          this.onEnableScroll(true)
                        }}
                        onMomentumScrollEnd={() => {
                          this.onEnableScroll(true)
                        }}
                        onScrollEndDrag={() => {
                          this.onEnableScroll(true)
                        }}
                        data={this.state.vendorImages}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                      />
                    </Item>
                  )}
                  {this.state.isMerchant && (
                    <Button spaceTop primary flexFull onPress={this.onMerchantSave} disabled={this.state.merchantSaving}>
                      {!this.state.merchantSaving && <StyledText>{translate('SAVE')}</StyledText>}
                      {this.state.merchantSaving && <Spinner color='#fff' />}
                    </Button>
                  )}
                  {this.state.isMerchant && (
                    <Button spaceTop thirdary flexFull onPress={this.onMerchantCancel} disabled={this.state.merchantSaving}>
                      {!this.state.merchantSaving && <StyledText>{translate('CANCEL MERCHANT')}</StyledText>}
                      {this.state.merchantSaving && <Spinner color='#186bfe' />}
                    </Button>
                  )}
                </AnimatableView>
              )}
              {this.state.section === 2 && (
                <AnimatableView spaceTop animation={this.state.sectionAnimations[2]} duration={400} useNativeDriver={true}>
                  <Item stackedLabel underline transparent>
                    <Label>{translate('Your wallet address')}</Label>
                    <Input editable={false} value={this.props.wallet.cryptoAddress} multiline />
                  </Item>
                  <Button spaceTop primary flexFull onPress={this.onBackupKey}>
                    <StyledText>{translate('BACKUP WALLET')}</StyledText>
                  </Button>
                  <Button spaceTop thirdary flexFull onPress={this.onChangePinCode}>
                    <StyledText>{translate('CHANGE PIN CODE')}</StyledText>
                  </Button>
                  {this.state.hardwareAuthenticationEnabled && (
                    <Button
                      spaceTop
                      checkbox
                      flexFull
                      checked={this.props.settings.hardwareAuthEnabled && this.props.pincode.storedPin && this.props.pincode.storedPin.length > 0}
                      onPress={this.onHardwareAuthChanged}
                    >
                      <StyledText flexFull style={{ marginLeft: 0 }}>
                        {translate(this.state.hardwareAuthenticationTypes.indexOf(2) >= 0 ? 'Use Face to unlock' : 'Use Fingerprint to unlock')}
                      </StyledText>
                      <CheckBoxIcon
                        fill={
                          this.props.settings.hardwareAuthEnabled && this.props.pincode.storedPin && this.props.pincode.storedPin.length > 0
                            ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                            : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                        }
                        checked={this.props.settings.hardwareAuthEnabled && this.props.pincode.storedPin && this.props.pincode.storedPin.length > 0}
                        width={40}
                        height={40}
                      />
                    </Button>
                  )}
                  <Button spaceTop checkbox flexFull checked={this.props.settings.alwaysVerifyBeforeSend} onPress={this.onAlwaysVerifyChanged}>
                    <StyledText flexFull style={{ marginLeft: 0 }}>
                      {translate('Always verify before send')}
                    </StyledText>
                    <CheckBoxIcon
                      fill={
                        this.props.settings.alwaysVerifyBeforeSend
                          ? ThemeService.getThemeStyle().variables.buttonToggleOnColor
                          : ThemeService.getThemeStyle().variables.buttonToggleOffColor
                      }
                      checked={this.props.settings.alwaysVerifyBeforeSend}
                      width={40}
                      height={40}
                    />
                  </Button>
                  <Item stackedLabel spaceTop transparent>
                    <Label>{translate('Language')}</Label>
                    <Picker
                      smallSpaceTop
                      shadow
                      flexFull
                      mode='dialog'
                      iosHeader={translate('Select language')}
                      iosIcon={<DropdownIcon />}
                      textStyle={{ textAlign: 'left' }}
                      headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                      headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                      itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                      selectedValue={this.props.settings.language}
                      onValueChange={this.onLanguageChange.bind(this)}
                    >
                      {languages.map((item, index) => (
                        <Picker.Item key={index} label={translate(AVAILABLE_LANGUAGES[item].name)} value={item} />
                      ))}
                    </Picker>
                  </Item>
                  <Item stackedLabel spaceTop transparent>
                    <Label>{translate('Currency')}</Label>
                    <Picker
                      smallSpaceTop
                      shadow
                      flexFull
                      mode='dialog'
                      iosHeader={translate('Select preferred currency')}
                      iosIcon={<DropdownIcon />}
                      textStyle={{ textAlign: 'left' }}
                      headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                      headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                      itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                      selectedValue={this.props.settings.currency}
                      onValueChange={this.onCurrencyChange.bind(this)}
                    >
                      {currencies.map((item, index) => (
                        <Picker.Item key={index} label={translate(SUPPORTED_CURRENCIES[item].name)} value={item} />
                      ))}
                    </Picker>
                  </Item>
                  {false && (
                    <Item stackedLabel spaceTop transparent>
                      <Label>{translate('Theme')}</Label>
                      <Picker
                        smallSpaceTop
                        shadow
                        flexFull
                        mode='dialog'
                        iosHeader={translate('Select theme')}
                        iosIcon={<DropdownIcon />}
                        textStyle={{ textAlign: 'left' }}
                        headerStyle={ThemeService.getThemeStyle().pickerHeaderStyle}
                        headerTitleStyle={ThemeService.getThemeStyle().pickerHeaderTitleStyle}
                        itemStyle={ThemeService.getThemeStyle().pickerItemStyle}
                        selectedValue={this.props.settings.theme}
                        onValueChange={this.onThemeChange.bind(this)}
                      >
                        {themes.map((item, index) => (
                          <Picker.Item key={index} label={translate(AVAILABLE_THEMES[item].name)} value={item} />
                        ))}
                      </Picker>
                    </Item>
                  )}
                  <Button largeSpaceTop primary flexFull onPress={this.onSignOut}>
                    <StyledText>{translate('SIGN OUT')}</StyledText>
                  </Button>
                  <StyledText note right spaceTop>
                    {`${DEBUG ? 'Ropsten - ' : ''}${translate('Version')} ${Constants.manifest.version}`}
                  </StyledText>
                </AnimatableView>
              )}
            </GroupBox>
          </Content>
        </Container>
        <TabNavigation />
        <Modal
          isVisible={this.state.privateShowing || this.state.pinOnMapShowing}
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
          {this.state.privateShowing && (
            <View flexFull flexCenter padder>
              <StyledText white center>
                {translate('You can backup these 12 words in exact order to restore your wallet later')}
              </StyledText>
              <Item spaceTop regular style={styles.inputContainer}>
                <Input multiline value={this.props.wallet.cryptoMnemonic} editable={false} />
              </Item>
              <StyledText important spaceTop tinySpaceLeft tinySpaceRight center>
                {translate('Caution If you forget those words, you will lose your wallet and its fund forever')}
              </StyledText>
              <Button spaceTop spaceBottom thirdary onPress={() => this.setState({ privateShowing: false })}>
                {translate('Close')}
              </Button>
            </View>
          )}
          {this.state.pinOnMapShowing && (
            <View flexFull flexCenter padder>
              <StyledText white center spaceTop spaceBottom>
                {translate('Please pin your store on the map')}
              </StyledText>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  // provider="google"
                  loadingEnabled={true}
                  initialRegion={{
                    latitude: this.state.vendorPin.length > 0 ? this.state.vendorPin[0] : 0,
                    longitude: this.state.vendorPin.length > 1 ? this.state.vendorPin[1] : 0,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                  }}
                  onPress={this.onMapPress}
                >
                  <Marker
                    draggable
                    coordinate={{
                      latitude: this.state.vendorPin.length > 0 ? this.state.vendorPin[0] : 0,
                      longitude: this.state.vendorPin.length > 1 ? this.state.vendorPin[1] : 0
                    }}
                    onDragEnd={this.onMapPress}
                    title={this.vendorAddress}
                  />
                </MapView>
              </View>
              <Button spaceTop spaceBottom thirdary onPress={() => this.setState({ pinOnMapShowing: false })}>
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
    flex: 1
  },
  contentContainer: {
    flex: 0
  },
  logoSize: {
    width: 150,
    height: 150
  },
  mapContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
}

const lightTheme = StyleSheet.create({
  emojiFlag: {
    lineHeight: 32
  },
  countryName: {
    fontFamily: ThemeService.getThemeStyle().variables.fontFamilyMedium
  },
  itemCountryName: {
    borderBottomWidth: 0
  }
})

const darkTheme = StyleSheet.create({
  emojiFlag: {
    lineHeight: 32
  },
  modalContainer: {
    backgroundColor: '#1b213b'
  },
  contentContainer: {
    backgroundColor: '#1b213b'
  },
  header: {
    backgroundColor: '#1b213b'
  },
  itemCountryName: {
    borderBottomWidth: 0
  },
  countryName: {
    fontFamily: ThemeService.getThemeStyle().variables.fontFamilyMedium,
    color: '#ffaeb5'
  },
  letterText: {
    color: '#ffaeb5'
  },
  input: {
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ffaeb5'
  }
})

const mapStateToProps = state => {
  const { account, wallet, settings, pincode } = state
  return { account, wallet, settings, pincode }
}

const mapDispatchToProps = dispatch => {
  return {
    setSetting: settings => dispatch(setSetting(settings)),
    updateProfile: (fullName, email, availability, contactNumber, paymentInfo, language) =>
      dispatch(updateProfile(fullName, email, availability, contactNumber, paymentInfo, language)),
    showAlert: config => dispatch(showAlert(config)),
    hideAlert: () => dispatch(hideAlert()),
    clear: () => dispatch(clear()),
    getCategories: () => dispatch(getCategories()),
    updateMerchant: (name, logo, address, country, location, phone, description, service, category, images) =>
      dispatch(updateMerchant(name, logo, address, country, location, phone, description, service, category, images)),
    cancelMerchant: () => dispatch(cancelMerchant()),
    storePinCode: pin => dispatch(storePinCode(pin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.Profile', styles)(ProfileScreen))
