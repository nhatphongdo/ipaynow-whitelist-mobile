// @flow

import color from 'color'

import React from 'react'
import { Platform, Dimensions, PixelRatio } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Lock from '../../assets/images/Lock'
import PinDot from '../../assets/images/PinDot'
import SelectedPinDot from '../../assets/images/SelectedPinDot'
import KeypadBackground from '../../assets/images/KeypadBackground'
import KeypadDelete from '../../assets/images/KeypadDelete'
import FaceId from '../../assets/images/FaceId'
import TouchId from '../../assets/images/TouchId'
import Hexagon from '../../assets/images/Hexagon'
import EarnIcon from '../../assets/images/EarnIcon'
import GamesIcon from '../../assets/images/GamesIcon'
import MerchantsIcon from '../../assets/images/MerchantsIcon'
import NotificationIcon from '../../assets/images/NotificationIcon'
import ReceiveIcon from '../../assets/images/ReceiveIcon'
import RatesIcon from '../../assets/images/RatesIcon'
import ReferralIcon from '../../assets/images/ReferralIcon'
import SendIcon from '../../assets/images/SendIcon'
import StoreIcon from '../../assets/images/StoreIcon'
import LeftChevron from '../../assets/images/LeftChevron'
import RightChevron from '../../assets/images/RightChevron'
import IdIcon from '../../assets/images/IdIcon'
import LockIcon from '../../assets/images/LockIcon'
import TimerIcon from '../../assets/images/TimerIcon'
import ScanQrIcon from '../../assets/images/ScanQrIcon'
import BottomBarBackground from '../../assets/images/BottomBarBackground'
import FooterMenu from '../../assets/images/FooterMenu'
import MallIconDark from '../../assets/images/MallIconDark'
import ExchangeIconDark from '../../assets/images/ExchangeIconDark'
import HistoryIconDark from '../../assets/images/HistoryIconDark'
import ProfileIconDark from '../../assets/images/ProfileIconDark'
import HomeIconDark from '../../assets/images/HomeIconDark'
import QrBox from '../../assets/images/QrBox'
import QrLabel from '../../assets/images/QrLabel'
import DepositIcon from '../../assets/images/DepositIcon'
import RubyIcon from '../../assets/images/RubyIcon'
import EthereumIcon from '../../assets/images/EthereumIcon'
import CreditCardIcon from '../../assets/images/CreditCardIcon'
import CheckBoxIcon from '../../assets/images/CheckBoxIcon'
import VisaIcon from '../../assets/images/VisaIcon'
import MasterCardIcon from '../../assets/images/MasterCardIcon'
import TimeBadge from '../../assets/images/TimeBadge'
import ResultBadge from '../../assets/images/ResultBadge'
import LuckyDrawGameIcon from '../../assets/images/LuckyDrawGameIcon'
import RollingDiceGameIcon from '../../assets/images/RollingDiceGameIcon'
import BackIcon from '../../assets/images/BackIcon'
import LuckyDrawMachine from '../../assets/images/LuckyDrawMachine'
import CongratulationsImage from '../../assets/images/CongratulationsImage'
import EmptyDice from '../../assets/images/EmptyDice'
import Dice1 from '../../assets/images/Dice1'
import Dice2 from '../../assets/images/Dice2'
import Dice3 from '../../assets/images/Dice3'
import Dice4 from '../../assets/images/Dice4'
import Dice5 from '../../assets/images/Dice5'
import Dice6 from '../../assets/images/Dice6'
import ReferralUserIcon from '../../assets/images/ReferralUserIcon'
import SearchIcon from '../../assets/images/SearchIcon'
import DropdownIcon from '../../assets/images/DropdownIcon'
import StarIcon from '../../assets/images/StarIcon'
import HeartIcon from '../../assets/images/HeartIcon'
import DirectionIcon from '../../assets/images/DirectionIcon'
import FilterIcon from '../../assets/images/FilterIcon'
import ExchangeIcon from '../../assets/images/ExchangeIcon'
import ExchangeMoneyIcon from '../../assets/images/ExchangeMoneyIcon'
import CreditCardPaymentIcon from '../../assets/images/CreditCardPaymentIcon'
import BankIcon from '../../assets/images/BankIcon'
import PaypalIcon from '../../assets/images/PaypalIcon'
import PayoneerIcon from '../../assets/images/PayoneerIcon'
import BitcoinIcon from '../../assets/images/BitcoinIcon'
import EthereumPaymentIcon from '../../assets/images/EthereumPaymentIcon'
import HistoryIcon from '../../assets/images/HistoryIcon'
import ArrowUp from '../../assets/images/ArrowUp'
import ArrowDown from '../../assets/images/ArrowDown'
import ProfileIcon from '../../assets/images/ProfileIcon'
import MallIcon from '../../assets/images/MallIcon'
import DeleteIcon from '../../assets/images/DeleteIcon'
import BuyRewardIcon from '../../assets/images/BuyRewardIcon'
import RequestIcon from '../../assets/images/RequestIcon'
import ContactUs from '../../assets/images/ContactUs'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const platform = Platform.OS
const platformStyle = undefined
const isIphoneX = platform === 'ios' && (deviceHeight === 812 || deviceWidth === 812 || deviceHeight === 896 || deviceWidth === 896)

export default {
  platformStyle,
  platform,

  //Accordion
  headerStyle: '#edebed',
  iconStyle: '#000',
  contentStyle: '#f5f4f5',
  expandedIconStyle: '#000',
  accordionBorderColor: '#d3d3d3',

  // Android
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
  btnUppercaseAndroidText: true,

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
  badgePadding: platform === 'ios' ? 3 : 3,

  // Button
  btnFontFamily: 'exo-medium',
  btnDisabledBg: '#717e91',
  buttonPadding: 6,
  get btnPrimaryBg() {
    return 'transparent'
  },
  get btnPrimaryColor() {
    return '#ffffff'
  },
  get btnSecondaryBg() {
    return 'transparent'
  },
  get btnSecondaryColor() {
    return '#81D8D0'
  },
  get btnThirdaryBg() {
    return 'transparent'
  },
  get btnThirdaryColor() {
    return '#81D8D0'
  },
  get btnDisabledBg() {
    return 'transparent'
  },
  get btnDisabledColor() {
    return '#fff'
  },
  get btnTinyColor() {
    return this.inverseTextColor
  },

  get btnInfoBg() {
    return this.brandInfo
  },
  get btnInfoColor() {
    return this.inverseTextColor
  },
  get btnSuccessBg() {
    return this.brandSuccess
  },
  get btnSuccessColor() {
    return this.inverseTextColor
  },
  get btnDangerBg() {
    return this.brandDanger
  },
  get btnDangerColor() {
    return this.inverseTextColor
  },
  get btnWarningBg() {
    return this.brandWarning
  },
  get btnWarningColor() {
    return this.inverseTextColor
  },
  get btnTextSize() {
    return platform === 'ios' ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6
  },

  // Color
  brandPrimary: '#81D8D0',
  brandSecondary: '#CADBFB',
  brandInfo: '#717e91',
  brandSuccess: '#47C78F',
  brandDanger: '#FE0000',
  brandWarning: '#f0ad4e',
  brandDark: '#000',
  brandLight: '#f4f4f4',

  // Card
  cardDefaultBg: '#fff',
  cardBorderColor: '#ccc',
  cardBorderRadius: 22,
  cardItemPadding: 20,
  cardLabelColor: '#092058',
  cardTextColor: '#092058',

  // Groupbox
  groupBoxBg: '#fff',
  groupBoxHeaderColor: '#fff',
  groupBoxLabelColor: '#424c58',
  groupBoxTextColor: '#424c58',
  groupBoxBorderRadius: 22,
  groupBoxHeaderSize: 80,
  groupBoxPadding: 20,

  // CheckBox
  CheckboxRadius: platform === 'ios' ? 13 : 0,
  CheckboxBorderWidth: platform === 'ios' ? 1 : 2,
  CheckboxPaddingLeft: platform === 'ios' ? 4 : 2,
  CheckboxPaddingBottom: platform === 'ios' ? 0 : 5,
  CheckboxIconSize: platform === 'ios' ? 21 : 16,
  CheckboxIconMarginTop: platform === 'ios' ? undefined : 1,
  CheckboxFontSize: platform === 'ios' ? 23 / 0.9 : 17,
  checkboxBgColor: '#81D8D0',
  checkboxSize: 20,
  checkboxTickColor: '#fff',

  //Container
  containerBgColor: 'transparent',

  //Date Picker
  datePickerTextColor: '#000',
  datePickerBg: 'transparent',

  // Font
  DefaultFontSize: 16,
  fontFamily: platform === 'ios' ? 'exo' : 'exo',
  fontFamilyMedium: 'exo-medium',
  fontFamilyBold: 'exo-bold',
  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4
  },
  get fontSizeH4() {
    return this.fontSizeBase * 1.2
  },

  // Footer
  footerHeight: 55,
  footerDefaultBg: platform === 'ios' ? '#F8F8F8' : '#3F51B5',
  footerPaddingBottom: 0,

  // FooterTab
  tabBarTextColor: platform === 'ios' ? '#6b6b6b' : '#b3c7f9',
  tabBarTextSize: platform === 'ios' ? 14 : 11,
  activeTab: platform === 'ios' ? '#81D8D0' : '#fff',
  sTabBarActiveTextColor: '#81D8D0',
  tabBarActiveTextColor: platform === 'ios' ? '#81D8D0' : '#fff',
  tabActiveBgColor: platform === 'ios' ? '#cde1f9' : '#3F51B5',

  // Header
  toolbarBtnColor: platform === 'ios' ? '#81D8D0' : '#fff',
  toolbarDefaultBg: platform === 'ios' ? '#F8F8F8' : '#3F51B5',
  toolbarHeight: platform === 'ios' ? 64 : 56,
  toolbarSearchIconSize: platform === 'ios' ? 20 : 23,
  toolbarInputColor: platform === 'ios' ? '#CECDD2' : '#fff',
  searchBarHeight: platform === 'ios' ? 30 : 40,
  searchBarInputHeight: platform === 'ios' ? 30 : 50,
  toolbarBtnTextColor: platform === 'ios' ? '#81D8D0' : '#fff',
  toolbarDefaultBorder: platform === 'ios' ? '#a7a6ab' : '#3F51B5',
  iosStatusbar: platform === 'ios' ? 'dark-content' : 'light-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex()
  },
  get darkenHeader() {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex()
  },

  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: platform === 'ios' ? 30 : 28,
  iconHeaderSize: platform === 'ios' ? 33 : 24,

  // InputGroup
  inputFontFamily: 'exo-medium',
  inputFontSize: 17,
  inputBorderColor: '#81D8D0',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',
  inputHeightBase: 50,
  inputBorderRadius: 11,
  get inputColor() {
    return this.textColor
  },
  get inputBackground() {
    return '#ffffff'
  },
  get inputColorPlaceholder() {
    return '#757575'
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 15 * 1.8 * 1.2,
  lineHeightH2: 15 * 1.6 * 1.2,
  lineHeightH3: 15 * 1.4 * 1.2,
  lineHeightH4: 15 * 1.2 * 1.2,
  lineHeight: 15 * 1.2,
  listItemSelected: platform === 'ios' ? '#81D8D0' : '#3F51B5',

  // List
  listBg: 'transparent',
  listBorderColor: '#c9c9c9',
  listDividerBg: '#f4f4f4',
  listBtnUnderlayColor: '#DDD',
  listItemPadding: platform === 'ios' ? 10 : 12,
  listNoteColor: '#808080',
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: '#81D8D0',
  inverseProgressColor: '#CADBFB',

  // Radio Button
  radioBtnSize: platform === 'ios' ? 25 : 23,
  radioSelectedColorAndroid: '#3F51B5',
  radioBtnLineHeight: platform === 'ios' ? 29 : 24,
  get radioColor() {
    return this.brandPrimary
  },

  // Segment
  segmentBackgroundColor: platform === 'ios' ? '#F8F8F8' : '#3F51B5',
  segmentActiveBackgroundColor: platform === 'ios' ? '#81D8D0' : '#fff',
  segmentTextColor: platform === 'ios' ? '#81D8D0' : '#fff',
  segmentActiveTextColor: platform === 'ios' ? '#fff' : '#3F51B5',
  segmentBorderColor: platform === 'ios' ? '#81D8D0' : '#fff',
  segmentBorderColorMain: platform === 'ios' ? '#a7a6ab' : '#3F51B5',

  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',

  // Tab
  tabDefaultBg: platform === 'ios' ? '#F8F8F8' : '#3F51B5',
  topTabBarTextColor: platform === 'ios' ? '#6b6b6b' : '#b3c7f9',
  topTabBarActiveTextColor: platform === 'ios' ? '#81D8D0' : '#fff',
  topTabBarBorderColor: platform === 'ios' ? '#a7a6ab' : '#fff',
  topTabBarActiveBorderColor: platform === 'ios' ? '#81D8D0' : '#fff',

  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,

  // Text
  textColor: '#092058',
  secondaryTextColor: '#7D90AA',
  inverseTextColor: '#ffffff',
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor
  },

  // Title
  titleFontfamily: platform === 'ios' ? 'exo-medium' : 'exo-medium',
  titleFontSize: platform === 'ios' ? 17 : 19,
  subTitleFontSize: platform === 'ios' ? 11 : 14,
  subtitleColor: platform === 'ios' ? '#8e8e93' : '#FFF',
  titleFontColor: platform === 'ios' ? '#000' : '#FFF',

  // Other
  borderRadiusBase: 4,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  baseSpace: 20,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  ratioWidth: deviceWidth / 375.0, // Ratio according to design
  ratioHeight: deviceHeight / 812.0, // Ratio according to design
  isIphoneX,
  inputGroupRoundedBorderRadius: 30,

  //iPhoneX SafeArea
  Inset: {
    portrait: {
      topInset: 24,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 34,
    },
    landscape: {
      topInset: 0,
      leftInset: 44,
      rightInset: 44,
      bottomInset: 21,
    },
  },

  // Linear background
  mainBackground: (props) => <LinearGradient colors={['#f7f8fa', '#f7f8fa']} start={[1, 1]} end={[0, 0]} {...props} />,
  primaryButtonBackground: (props) => <LinearGradient colors={['#81D8D0', '#81D8D0']} start={[1.113, 0.591]} end={[-0.062, 0.676]} {...props} />,
  secondaryButtonBackground: (props) => <LinearGradient colors={['#81D8D0', '#81D8D0']} start={[1.113, 0.591]} end={[-0.062, 0.676]} {...props} />,
  thirdaryButtonBackground: (props) => <LinearGradient colors={['#ffffff', '#ffffff']} start={[1.113, 0.591]} end={[-0.062, 0.676]} {...props} />,
  tinyButtonBackground: (props) => <LinearGradient colors={['#81D8D0', '#81D8D0']} start={[1.113, 0.591]} end={[-0.062, 0.676]} {...props} />,
  disabledButtonBackground: (props) => <LinearGradient colors={['#cadbfb', '#cadbfb']} start={[1.113, 0.591]} end={[-0.062, 0.676]} {...props} />,
  badgeBackground: (props) => <LinearGradient colors={['#81D8D0', '#81D8D0']} start={[1, 1]} end={[0, 0]} {...props} />,
  primaryBackground: (props) => <LinearGradient colors={['#81D8D0', '#81D8D0']} start={[1, 0.46]} end={[0, 0.456]} {...props} />,
  groupBoxHeaderBackground: (props) => <LinearGradient colors={['#81D8D0', '#81D8D0']} start={[0.5, 0]} end={[0.5, 1]} {...props} />,

  // Images
  largeLogo: require('../../assets/images/logo.png'),
  mediumLogo: require('../../assets/images/logo.png'),
  smallLogo: require('../../assets/images/logo.png'),
  lock: (props) => <Lock colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  pinDot: (props) => <PinDot colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  selectedPinDot: (props) => <SelectedPinDot colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  keypadBackground: (props) => <KeypadBackground colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  keypadDelete: (props) => <KeypadDelete stroke='#092058' {...props} />,
  faceId: (props) => <FaceId colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  touchId: (props) => <TouchId colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} stroke='#81D8D0' {...props} />,
  hexagon: (props) => <Hexagon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} fill='#fff' {...props} />,
  earnIcon: (props) => <EarnIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  gamesIcon: (props) => <GamesIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  merchantsIcon: (props) => <MerchantsIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  notificationIcon: (props) => <NotificationIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  ratesIcon: (props) => <RatesIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  receiveIcon: (props) => <ReceiveIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  referralIcon: (props) => <ReferralIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  sendIcon: (props) => <SendIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  storeIcon: (props) => <StoreIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  depositIcon: (props) => <DepositIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  buyRewardIcon: (props) => <BuyRewardIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  requestIcon: (props) => <RequestIcon colors={['#33c4b3', '#33c4b3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  leftChevron: (props) => <LeftChevron fill='#424c58' {...props} />,
  rightChevron: (props) => <RightChevron fill='#424c58' {...props} />,
  idIcon: (props) => <IdIcon fill='#424c58' {...props} />,
  lockIcon: (props) => <LockIcon fill='#424c58' {...props} />,
  timerIcon: (props) => <TimerIcon fill='#424c58' {...props} />,
  scanQrIcon: (props) => <ScanQrIcon fill='#fff' {...props} />,
  bottomBarBackground: (props) => <BottomBarBackground fill='#fff' {...props} />,
  footerMenuBackground: (props) => (
    <FooterMenu colors={['#15bdd8', '#15bdd8']} start={['61.9%', '-15.8%']} end={['28%', '104.6%']} fill='#fff' {...props} />
  ),
  historyIconBottom: (props) => <HistoryIconDark {...props} />,
  exchangeIconBottom: (props) => <ExchangeIconDark {...props} />,
  mallIconBottom: (props) => <MallIconDark {...props} />,
  profileIconBottom: (props) => <ProfileIconDark {...props} />,
  homeIcon: (props) => <HomeIconDark fill='#81D8D0' {...props} />,
  qrBox: (props) => <QrBox colors={['#15bdd8', '#15bdd8']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  qrLabel: (props) => <QrLabel colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} fill='#fff' {...props} />,
  rubyIcon: (props) => <RubyIcon fill='#d6404c' {...props} />,
  ethereumIcon: (props) => <EthereumIcon fill='#d6404c' {...props} />,
  creditCardIcon: (props) => <CreditCardIcon fill='#d6404c' {...props} />,
  checkBoxIcon: (props) => <CheckBoxIcon fill='#d6404c' {...props} />,
  visaIcon: (props) => <VisaIcon {...props} />,
  masterCardIcon: (props) => <MasterCardIcon {...props} />,
  timeBadge: (props) => <TimeBadge colors={['#fff', '#fff']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  resultBadge: (props) => <ResultBadge colors={['#fff', '#fff']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  luckyDrawGameIcon: (props) => <LuckyDrawGameIcon {...props} />,
  rollingDiceGameIcon: (props) => <RollingDiceGameIcon {...props} />,
  backIcon: (props) => <BackIcon fill='#191660' {...props} />,
  contactUs: (props) => <ContactUs fill='#000' {...props} />,
  luckyDrawMachine: (props) => (
    <LuckyDrawMachine
      colors={['#81D8D0', '#81D8D0']}
      start={['50%', '0%']}
      end={['50%', '100%']}
      colors2={['#81D8D0', '#81D8D0']}
      start2={['50%', '0%']}
      end2={['50%', '100%']}
      {...props}
    />
  ),
  congratulationsImage: (props) => (
    <CongratulationsImage
      colors={['#ffb852', '#fa9d44']}
      start={['18.2%', '44.8%']}
      end={['76.2%', '100%']}
      colors2={['#00e6b4', '#18c9e3']}
      start2={['100%', '75.1%']}
      end2={['0%', '56.3%']}
      {...props}
    />
  ),
  emptyDice: (props) => <EmptyDice {...props} />,
  dice1: (props) => <Dice1 {...props} />,
  dice2: (props) => <Dice2 {...props} />,
  dice3: (props) => <Dice3 {...props} />,
  dice4: (props) => <Dice4 {...props} />,
  dice5: (props) => <Dice5 {...props} />,
  dice6: (props) => <Dice6 {...props} />,
  referralUserIcon: (props) => <ReferralUserIcon colors={['#ff5b7f', '#fc9970']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  searchIcon: (props) => <SearchIcon fill='#191660' {...props} />,
  dropdownIcon: (props) => <DropdownIcon fill='#81D8D0' {...props} />,
  starIcon: (props) => <StarIcon colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} fill='url(#prefix__a)' {...props} />,
  heartIcon: (props) => (
    <HeartIcon colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} stroke='#81D8D0' fill='url(#prefix__a)' {...props} />
  ),
  directionIcon: (props) => <DirectionIcon fill='#ba1c2a' stroke='#ba1c2a' {...props} />,
  filterIcon: (props) => <FilterIcon stroke='#fff' {...props} />,
  exchangeIcon: (props) => <ExchangeIcon fill='#81D8D0' {...props} />,
  exchangeMoneyIcon: (props) => <ExchangeMoneyIcon colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  creditCardPaymentIcon: (props) => <CreditCardPaymentIcon colors={['#00e6b4', '#18c9e3']} start={['50%', '0%']} end={['50%', '100%']} {...props} />,
  bankPaymentIcon: (props) => <BankIcon colors={['#00e6b4', '#18c9e3']} start={['50%', '0%']} end={['50%', '100%']} fill='#fff' {...props} />,
  paypalPaymentIcon: (props) => <PaypalIcon stroke='#0ad8c9' {...props} />,
  payoneerPaymentIcon: (props) => <PayoneerIcon stroke='#0ad8c9' {...props} />,
  bitcoinPaymentIcon: (props) => <BitcoinIcon colors={['#00e6b4', '#18c9e3']} start={['50%', '0%']} end={['50%', '100%']} fill='#fff' {...props} />,
  ethereumPaymentIcon: (props) => (
    <EthereumPaymentIcon colors={['#00e6b4', '#18c9e3']} start={['50%', '0%']} end={['50%', '100%']} fill='#fff' {...props} />
  ),
  historyIcon: (props) => <HistoryIcon fill='#81D8D0' {...props} />,
  arrowUp: (props) => <ArrowUp fill='#191660' {...props} />,
  arrowDown: (props) => <ArrowDown fill='#191660' {...props} />,
  profileIcon: (props) => <ProfileIcon fill='#81D8D0' {...props} />,
  mallIcon: (props) => <MallIcon fill='#81D8D0' {...props} />,
  deleteIcon: (props) => <DeleteIcon stroke='#81D8D0' {...props} />,
  merchantsIconBottom: (props) => (
    <MerchantsIcon fill='#81D8D0' colors={['#81D8D0', '#81D8D0']} start={['50%', '0%']} end={['50%', '100%']} {...props} />
  ),

  // Other colors
  shadowColor: '#000',
  shadowOpacity: 0.4,
  bgInfo: '#81D8D0',
  labelColor: 'rgba(25,22,96,0.6)',
  keypadTextColor: '#092058',
  membershipLabel: 'rgba(25,22,96,1)',
  bottomBarShadowColor: '#d2d2d2',
  bottomMenuColor: '#013668',
  bigLightShadowColor: '#424c58',

  // Button
  buttonBorderRadius: 25,
  buttonVerticalPadding: 5,
  buttonHorizontalPadding: 15,
  buttonHeight: 50,
  buttonSmallHeight: 30,
  buttonTinyHeight: 20,
  buttonMargin: 10,
  buttonSmallMargin: 5,
  buttonToggleOnColor: '#81D8D0',
  buttonToggleOffColor: '#7D90AA',

  // Others
  get screenPadding() {
    return this.baseSpace
  },
  get largeSpace() {
    return this.baseSpace * 2
  },
  get veryLargeSpace() {
    return this.largeSpace * 2
  },
  get smallSpace() {
    return this.baseSpace / 2
  },
  get tinySpace() {
    return this.baseSpace / 4
  },
  bottomBarIconHeight: 25,
  contentBottomPadding: 20,

  bottomNavigationSpace: platform === 'ios' && isIphoneX ? 50 : 80,
  headerHeight: 40,
}
