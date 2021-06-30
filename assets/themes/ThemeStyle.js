import _ from 'lodash'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import getTheme from '../../native-base-theme/components'
import simpleLight from '../../native-base-theme/variables/simpleLight'

export default (themeName) => {
  let variables
  switch (themeName) {
    // case 'colorful-dark':
    //     variables = colorDark;
    //     break;
    // case 'simple-light':
    //     variables = simpleLight;
    //     break;
    // case 'simple-dark':
    //     variables = simpleDark;
    //     break;
    // case 'colorful-light':
    //     variables = colorLight;
    default:
      variables = simpleLight
      break
  }

  const spaces = {
    '.tinySpaceTop': {
      marginTop: variables.tinySpace,
    },
    '.smallSpaceTop': {
      marginTop: variables.smallSpace,
    },
    '.spaceTop': {
      marginTop: variables.baseSpace,
    },
    '.largeSpaceTop': {
      marginTop: variables.largeSpace,
    },
    '.veryLargeSpaceTop': {
      marginTop: variables.veryLargeSpace,
    },
    '.tinySpaceBottom': {
      marginBottom: variables.tinySpace,
    },
    '.smallSpaceBottom': {
      marginBottom: variables.smallSpace,
    },
    '.spaceBottom': {
      marginBottom: variables.baseSpace,
    },
    '.largeSpaceBottom': {
      marginBottom: variables.largeSpace,
    },
    '.veryLargeSpaceBottom': {
      marginBottom: variables.veryLargeSpace,
    },
    '.tinySpaceLeft': {
      marginLeft: variables.tinySpace,
    },
    '.smallSpaceLeft': {
      marginLeft: variables.smallSpace,
    },
    '.spaceLeft': {
      marginLeft: variables.baseSpace,
    },
    '.largeSpaceLeft': {
      marginLeft: variables.largeSpace,
    },
    '.veryLargeSpaceLeft': {
      marginLeft: variables.veryLargeSpace,
    },
    '.tinySpaceRight': {
      marginRight: variables.tinySpace,
    },
    '.smallSpaceRight': {
      marginRight: variables.smallSpace,
    },
    '.spaceRight': {
      marginRight: variables.baseSpace,
    },
    '.largeSpaceRight': {
      marginRight: variables.largeSpace,
    },
    '.veryLargeSpaceRight': {
      marginRight: variables.veryLargeSpace,
    },
  }

  const walletTheme = {
    contentContainer: {
      paddingHorizontal: variables.screenPadding,
    },
    logo: {
      width: variables.deviceWidth / 4,
      height: variables.deviceWidth / 4,
      marginTop: variables.largeSpace,
      marginBottom: variables.largeSpace,
    },
    description: {
      textAlign: 'center',
    },
    button: {
      width: (variables.deviceWidth - variables.screenPadding * 2) / 2 - variables.buttonSmallMargin * 2 - variables.buttonMargin / 2,
      margin: variables.buttonSmallMargin,
    },
  }
  const groupBoxHeaderIcon = {
    colors: [variables.groupBoxHeaderColor, variables.groupBoxHeaderColor],
    width: 50,
    height: 30,
    marginBottom: variables.tinySpace,
  }
  const absoluteFill = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
  const modalScreen = {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 10, // Platform.OS === "android" ? Constants.statusBarHeight : 10
  }
  const qrScanner = {
    flex: 0,
    width: variables.deviceWidth,
    height: variables.deviceWidth,
  }
  const animation = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  }
  const picker = Platform.OS == 'android' ? { color: '#62C0B3' } : {}

  const theme = {
    ...getTheme(variables),

    name: themeName,

    absoluteFill,
    modalScreen,
    qrScanner,
    animation,

    // Controls
    'NativeBase.ViewNB': {
      ...spaces,

      '.row': {
        flexDirection: 'row',
      },
      '.center': {
        alignItems: 'center',
      },
      '.right': {
        alignItems: 'flex-end',
      },
      '.flexCenter': {
        alignItems: 'center',
        justifyContent: 'center',
      },
      '.spaceBetween': {
        justifyContent: 'space-between',
      },

      '.flexFull': {
        flex: 1,
      },
      '.flexWrap': {
        flexWrap: 'wrap',
      },
      '.noMargin': {
        margin: 0,
      },

      '.shadow': {
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowColor: variables.shadowColor,
        shadowOpacity: variables.shadowOpacity,
        elevation: 6,
      },
      '.bigDarkShadow': {
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowRadius: 15,
        shadowColor: variables.shadowColor,
        shadowOpacity: 0.7,
        elevation: 15,
      },
      '.bigLightShadow': {
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowRadius: 15,
        shadowColor: variables.bigLightShadowColor,
        shadowOpacity: 1,
        elevation: 15,
      },

      '.search': {
        flexDirection: 'row',
        borderRadius: variables.buttonBorderRadius,
        backgroundColor: {
          'colorful-light': '#fff',
          'colorful-dark': '#191660',
          'simple-light': '#fff',
          'simple-dark': '#242424',
        }[themeName],
        paddingHorizontal: variables.contentPadding,
        paddingVertical: Platform.OS === 'ios' ? variables.contentPadding : variables.contentPadding / 2,
      },

      '.separatorTop': {
        borderTopWidth: 1,
        borderColor: variables.secondaryTextColor,
      },

      '.box': {
        backgroundColor: {
          'colorful-light': '#fff',
          'colorful-dark': '#191660',
          'simple-light': '#fff',
          'simple-dark': '#242424',
        }[themeName],
        borderRadius: variables.buttonBorderRadius,
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
        alignItems: 'center',
        justifyContent: 'center',
      },
      '.highlight': {
        // backgroundColor: {
        //   "colorful-light": "#f9d4d7",
        //   "colorful-dark": "#e12160",
        //   "simple-light": "#f9d4d7",
        //   "simple-dark": "#e12160"
        // }[themeName]
        backgroundColor: 'rgba(71, 199, 143, 1)',
      },

      '.padder': {
        padding: variables.baseSpace,
      },

      '.fullWidth': {
        width: variables.deviceWidth,
      },
    },
    'NativeBase.Button': {
      'iPayNow.StyledText': {
        color: '#0079FE',
        fontSize: variables.btnTextSize,
        lineHeight: variables.btnTextSize * 1.4,
        fontFamily: variables.btnFontFamily,
        textDecorationLine: 'underline',
      },
      'NativeBase.Text': {
        color: '#0079FE',
        fontSize: variables.btnTextSize,
        lineHeight: variables.btnTextSize * 1.4,
        fontFamily: variables.btnFontFamily,
        textDecorationLine: 'underline',
      },

      '.primary': {
        'iPayNow.StyledText': {
          color: variables.btnPrimaryColor,
          textDecorationLine: 'none',
        },
      },
      '.secondary': {
        'iPayNow.StyledText': {
          color: variables.btnSecondaryColor,
          textDecorationLine: 'none',
        },
      },
      '.thirdary': {
        'iPayNow.StyledText': {
          color: variables.btnThirdaryColor,
          textDecorationLine: 'none',
        },
      },
      '.disabled': {
        'iPayNow.StyledText': {
          color: variables.btnDisabledColor,
          textDecorationLine: 'none',
        },
      },
      '.danger': {
        backgroundColor: variables.btnDangerBg,
        'iPayNow.StyledText': {
          color: variables.btnDangerColor,
          textDecorationLine: 'none',
        },
      },
      '.success': {
        backgroundColor: variables.btnSuccessBg,
        'iPayNow.StyledText': {
          color: variables.btnDangerColor,
          textDecorationLine: 'none',
        },
      },
      '.listItem': {
        'iPayNow.StyledText': {
          color: variables.textColor,
          textDecorationLine: 'none',
        },
      },

      '.small': {
        'iPayNow.StyledText': {
          fontSize: variables.btnTextSizeSmall,
          lineHeight: variables.btnTextSizeSmall * 1.4,
          textDecorationLine: 'none',
        },
      },
      '.tiny': {
        'iPayNow.StyledText': {
          fontSize: variables.btnTextSizeSmall,
          lineHeight: variables.btnTextSizeSmall * 1.4,
          color: variables.btnTinyColor,
          textDecorationLine: 'none',
        },
      },
      '.bordered': {
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
        borderColor: variables.brandPrimary,
      },
      '.noBordered': {
        'iPayNow.StyledText': {
          textDecorationLine: 'none',
        },
      },
      '.iconLeft': {
        'iPayNow.StyledText': {
          position: 'absolute',
          textAlign: 'center',
          left: variables.buttonHorizontalPadding,
          right: variables.buttonHorizontalPadding,
        },
        paddingHorizontal: variables.buttonVerticalPadding,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      '.row': {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '.toggle': {
        'iPayNow.StyledText': {
          fontSize: variables.fontSizeBase,
          lineHeight: variables.fontSizeBase * 1.4,
          color: variables.buttonToggleOffColor,
          textDecorationLine: 'none',
        },
      },
      '.checkbox': {
        'iPayNow.StyledText': {
          fontSize: variables.fontSizeBase,
          lineHeight: variables.fontSizeBase * 1.4,
          marginLeft: variables.smallSpace,
          color: variables.buttonToggleOffColor,
          textDecorationLine: 'none',
        },
        paddingRight: variables.buttonVerticalPadding,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      '.checked': {
        'iPayNow.StyledText': {
          color: variables.buttonToggleOnColor,
          textDecorationLine: 'none',
        },
      },
      '.segment': {
        'iPayNow.StyledText': {
          fontSize: variables.fontSizeH4,
          lineHeight: variables.lineHeightH4,
          color: variables.buttonToggleOffColor,
          textDecorationLine: 'none',
        },
      },
      '.active': {
        'iPayNow.StyledText': {
          color: variables.buttonToggleOnColor,
          textDecorationLine: 'none',
        },
      },

      padding: 0,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
    },
    'NativeBase.Label': {
      ...spaces,

      '.white': {
        color: '#fff',
      },

      color: variables.groupBoxLabelColor,
      fontFamily: variables.fontFamilyMedium,
    },
    'NativeBase.Item': {
      ...spaces,

      '.regular': {
        'NativeBase.Input': {
          margin: variables.contentPadding,
          borderWidth: 0,
        },

        borderRadius: variables.inputBorderRadius,
      },
      '.underline': {
        borderWidth: 0,
        borderBottomWidth: 1,
      },
      '.flexFull': {
        flex: 1,
      },
      '.stretch': {
        alignSelf: 'stretch',
      },
      '.flexCenter': {
        alignItems: 'center',
      },

      '.transparent': {
        backgroundColor: 'transparent',
      },

      '.shadow': {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 10,
        shadowColor: variables.shadowColor,
        shadowOpacity: variables.shadowOpacity,
        elevation: 10,
      },

      minHeight: variables.inputHeightBase,
      borderColor: variables.inputBorderColor,
      backgroundColor: variables.inputBackground,
    },
    'NativeBase.Form': {
      margin: 0,
    },
    'NativeBase.List': {
      ...spaces,
    },
    'NativeBase.Input': {
      ...spaces,

      '.underline': {
        borderColor: variables.inputBorderColor,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
      '.multiline': {
        minHeight: 30,
        height: 'auto',
      },
      '.large': {
        height: 30 * 3,
      },

      '.alignCenter': {
        textAlign: 'center',
      },

      '.stretch': {
        alignSelf: 'stretch',
      },

      '.flexFull': {
        flex: 1,
      },

      '.white': {
        color: '#fff',
      },

      backgroundColor: variables.inputBackground,
      color: variables.inputColor,
      height: 30,
      fontFamily: variables.inputFontFamily,
      fontSize: variables.inputFontSize,
    },
    'NativeBase.Spinner': {
      height: undefined,
    },
    'NativeBase.PickerNB': {
      ...spaces,

      'NativeBase.Button': {
        'NativeBase.Text': {
          flex: 1,
          color: '#62C0B3',
          marginRight: variables.smallSpace,
          textAlign: 'center',
          textDecorationLine: 'none',
        },
      },

      '.flexFull': {
        flex: 1,
        width: undefined,
      },
      '.large': {
        width: 140,
      },

      '.shadow': {
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowColor: variables.shadowColor,
        shadowOpacity: variables.shadowOpacity,
        elevation: 6,
      },

      borderRadius: variables.buttonBorderRadius,
      paddingVertical: variables.buttonVerticalPadding,
      paddingHorizontal: variables.buttonHorizontalPadding,
      backgroundColor: {
        'colorful-light': '#191660',
        'colorful-dark': '#d5a3ff',
        'simple-light': '#ffffff',
        'simple-dark': '#15bdd8',
      }[themeName],
      flex: 0,
      flexDirection: 'row',
      width: 100,
      minHeight: variables.buttonHeight,

      ...picker,
    },
    'iPayNow.StyledText': {
      ...spaces,

      '.h1': {
        fontSize: variables.fontSizeH1,
        lineHeight: variables.lineHeightH1,
      },
      '.h2': {
        fontSize: variables.fontSizeH2,
        lineHeight: variables.lineHeightH2,
      },
      '.h3': {
        fontSize: variables.fontSizeH3,
        lineHeight: variables.lineHeightH3,
      },
      '.h4': {
        fontSize: variables.fontSizeH4,
        lineHeight: variables.lineHeightH4,
      },
      '.small': {
        fontSize: variables.fontSizeBase * 0.9,
        lineHeight: variables.fontSizeBase * 0.9 * 1.2,
      },
      '.tiny': {
        fontSize: variables.fontSizeBase * 0.8,
        lineHeight: variables.fontSizeBase * 0.8 * 1.2,
      },
      '.large': {
        fontSize: variables.fontSizeBase * 2.4,
        lineHeight: variables.fontSizeBase * 2.4 * 1.2,
      },
      '.veryLarge': {
        fontSize: variables.fontSizeBase * 3,
        lineHeight: variables.fontSizeBase * 3 * 1.2,
      },
      '.center': {
        textAlign: 'center',
      },
      '.full': {
        alignSelf: 'stretch',
      },
      '.flexFull': {
        flex: 1,
      },
      '.error': {
        color: variables.brandDanger,
      },
      '.success': {
        color: variables.brandSuccess,
      },
      '.info': {
        color: variables.brandInfo,
      },
      '.warning': {
        color: variables.brandWarning,
      },
      '.secondary': {
        color: variables.brandSecondary,
      },
      '.note': {
        color: variables.secondaryTextColor,
      },
      '.white': {
        color: '#fff',
      },
      '.pink': {
        color: '#ffaeb5',
      },
      '.header': {
        color: {
          'colorful-light': '#717e91',
          'colorful-dark': '#fff',
          'simple-light': '#717e91',
          'simple-dark': '#fff',
        }[themeName],
      },
      '.important': {
        fontFamily: variables.fontFamilyMedium,
        fontSize: variables.fontSizeBase * 0.8,
        // backgroundColor: "#f9d4d7",
        color: variables.brandDanger,
        borderRadius: variables.borderRadiusBase,
        paddingHorizontal: variables.smallSpace,
        paddingVertical: variables.tinySpace,
        textAlign: 'center',
        overflow: 'hidden',
      },

      '.right': {
        alignSelf: 'flex-end',
      },

      '.wrap': {
        flexWrap: 'wrap',
      },

      color: variables.textColor,
      fontSize: variables.noteFontSize,
      lineHeight: variables.noteFontSize * 1.2,
    },
    'iPayNow.Button': {
      ...spaces,

      background: {
        flex: 0,
        borderRadius: variables.buttonBorderRadius,
        alignItems: 'stretch',
        justifyContent: 'center',
        elevation: 6,
      },

      button: {
        borderRadius: variables.buttonBorderRadius,
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: variables.buttonHeight,
      },

      '.full': {
        alignSelf: 'stretch',
        margin: variables.buttonMargin,
      },
      '.flexFull': {
        flex: 1,
      },
      '.flexLeft': {
        flex: 0,
        alignSelf: 'flex-start',
      },
      '.center': {
        flex: 0,
        alignSelf: 'center',
      },
      '.right': {
        flex: 0,
        alignSelf: 'flex-end',
      },
      '.alignLeft': {
        alignItems: 'flex-start',
      },
      '.alignRight': {
        alignItems: 'flex-end',
      },

      '.small': {
        button: {
          minHeight: variables.buttonSmallHeight,
          borderRadius: variables.buttonSmallHeight / 2,
        },
        background: {
          borderRadius: variables.buttonSmallHeight / 2,
        },
        minHeight: variables.buttonSmallHeight,
      },
      '.tiny': {
        button: {
          minHeight: variables.buttonTinyHeight,
          borderRadius: variables.buttonTinyHeight / 2,
        },
        background: {
          borderRadius: variables.buttonTinyHeight / 2,
        },
        minHeight: variables.buttonTinyHeight,
      },
      '.bordered': {
        shadowOpacity: 0,
      },
      '.toggle': {
        paddingVertical: variables.buttonVerticalPadding,
        borderRadius: variables.buttonBorderRadius,
        borderWidth: 1,
        borderColor: variables.buttonToggleOffColor,
        shadowOpacity: 0,
      },
      '.active': {
        borderColor: variables.buttonToggleOnColor,
      },
      '.checkbox': {
        minHeight: 0,
        paddingVertical: variables.buttonVerticalPadding,
        shadowOpacity: 0,
      },
      '.loading': {},
      '.listItem': {
        paddingHorizontal: variables.buttonHorizontalPadding,
        paddingVertical: variables.buttonVerticalPadding,
        backgroundColor: '#fff',
      },
      '.danger': {
        borderRadius: 0,
      },
      '.success': {
        borderRadius: 0,
      },

      '.shadow': {
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowColor: variables.shadowColor,
        shadowOpacity: variables.shadowOpacity,
        elevation: 6,
      },

      '.normal': {
        borderRadius: variables.buttonBorderRadius,
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: variables.buttonHeight,
      },

      minHeight: variables.buttonHeight,
    },

    pickerItemStyle: {
      // backgroundColor: { "colorful-light": "#fff", "colorful-dark": "#1b213b", "simple-light": "#fff", "simple-dark": "#242424" }[themeName],
      marginLeft: 0,
      paddingLeft: 10,
    },
    pickerHeaderStyle: {
      // backgroundColor: { "colorful-light": "#fff", "colorful-dark": "#1b213b", "simple-light": "#fff", "simple-dark": "#242424" }[themeName]
    },
    pickerHeaderTitleStyle: {
      // color: { "colorful-light": "#000", "colorful-dark": "#fff", "simple-light": "#000", "simple-dark": "#fff" }[themeName]
    },

    // Screens and Components
    'iPayNow.App': {},
    'iPayNow.Screen': {
      container: {
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
      },
      topBackground: {
        backgroundColor: variables.brandPrimary,
        width: variables.deviceWidth,
        height: 120,
        position: 'absolute',
        top: 0,
        left: 0,
      },
      header: {
        height: variables.headerHeight,
        justifyContent: 'center',
        alignItems: 'center',
      },
      back: {
        width: variables.headerHeight,
        height: variables.headerHeight,
        minHeight: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        borderRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      title: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: variables.inverseTextColor,
      },
      right: {
        height: variables.headerHeight,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
    },
    'iPayNow.Alert': {
      alertTitle: {
        fontFamily: variables.fontFamilyBold,
      },
      alertMessage: {
        fontFamily: variables.fontFamily,
        textAlign: 'center',
      },
      alertConfirmTitle: {
        fontFamily: variables.fontFamilyMedium,
      },
      alertCancelTitle: {
        fontFamily: variables.fontFamilyMedium,
      },
    },
    'iPayNow.DropdownAlert': {
      title: {
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase,
        color: '#fff',
      },
      message: {
        fontFamily: variables.fontFamily,
        fontSize: variables.fontSizeBase,
        color: '#fff',
      },
    },
    'iPayNow.Home': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      feature: {
        backgroundColor: '#fff',
        borderRadius: 22,
        width: (variables.deviceWidth - variables.screenPadding * 2) / 3 - variables.buttonMargin * 2,
        height: 100,
        margin: variables.buttonMargin,
        paddingHorizontal: 7,
        paddingVertical: 10,
        alignItems: 'center',
      },
      featureList: {},
      featureTitle: {
        fontFamily: variables.fontFamilyMedium,
        color: variables.keypadTextColor,
        textAlign: 'center',
        marginTop: 10,
      },
      badge: {
        height: 30,
        minWidth: 30,
        borderRadius: 15,
        paddingHorizontal: variables.badgePadding,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 15,
        right: 35,
      },
      badgeText: {
        fontFamily: variables.fontFamilyMedium,
        color: variables.badgeColor,
        fontSize: variables.fontSizeBase,
        lineHeight: 30,
        textAlign: 'center',
      },
    },
    'iPayNow.NewUser': {
      contentContainer: {
        paddingHorizontal: variables.screenPadding,
      },
      below: {
        paddingLeft: variables.screenPadding,
        paddingRight: variables.screenPadding,
      },
      logo: {
        width: variables.deviceWidth / 2,
        height: variables.deviceWidth / 2,
      },
      button: {
        margin: variables.buttonMargin,
      },
      language: {
        minWidth: 150,
      },
      currency: {
        minWidth: 250,
      },
    },
    'iPayNow.CreateWallet': walletTheme,
    'iPayNow.ConfirmWallet': {
      ...walletTheme,
      inputContainer: {
        alignSelf: 'stretch',
        margin: variables.buttonMargin,
        height: variables.inputHeightBase * 2,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 10,
        shadowColor: variables.shadowColor,
        shadowOpacity: variables.shadowOpacity,
        elevation: 10,
      },
      countWords: {
        alignSelf: 'flex-end',
        marginRight: variables.buttonMargin,
      },
    },
    'iPayNow.RestoreWallet': {
      ...walletTheme,
      inputContainer: {
        alignSelf: 'stretch',
        margin: variables.buttonMargin,
        height: variables.inputHeightBase * 2,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 10,
        shadowColor: variables.shadowColor,
        shadowOpacity: variables.shadowOpacity,
        elevation: 10,
      },
      countWords: {
        alignSelf: 'flex-end',
        marginRight: variables.buttonMargin,
      },
    },
    'iPayNow.AddReferral': {
      ...walletTheme,
      inputContainer: {
        alignSelf: 'stretch',
        margin: variables.buttonMargin,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 10,
        shadowColor: variables.shadowColor,
        shadowOpacity: variables.shadowOpacity,
        elevation: 10,
      },
    },
    'iPayNow.PinCode': {
      contentContainer: {
        paddingHorizontal: variables.screenPadding,
      },
      logo: {
        width: (variables.deviceWidth - variables.screenPadding * 2) / 2,
        height: (((variables.deviceWidth - variables.screenPadding * 2) / 2) * 174) / 582,
        marginTop: variables.largeSpace,
        marginBottom: variables.largeSpace,
      },
      lockImage: {
        alignSelf: 'center',
      },
      lockTimer: {
        color: variables.textColor,
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 3,
        lineHeight: variables.fontSizeBase * 3 * 1.4,
      },
      successMessage: {
        color: variables.brandSuccess,
      },
      dot: {
        marginLeft: 3,
        marginRight: 3,
      },
      keypad: {
        width: (variables.deviceWidth - variables.screenPadding * 2) / 3 - variables.buttonSmallMargin * 2 - variables.buttonMargin * 2,
        height: (variables.deviceWidth - variables.screenPadding * 2) / 3 - variables.buttonSmallMargin * 2 - variables.buttonMargin * 2,
        margin: variables.buttonMargin,
      },
      keypadText: {
        height: (variables.deviceWidth - variables.screenPadding * 2) / 3 - variables.buttonSmallMargin * 2 - variables.buttonMargin * 2,
        fontSize: variables.fontSizeBase * 2.2,
        lineHeight: (variables.deviceWidth - variables.screenPadding * 2) / 3 - variables.buttonSmallMargin * 2 - variables.buttonMargin * 2,
        fontFamily: variables.fontFamilyBold,
        color: variables.keypadTextColor,
        textDecorationLine: 'none',
      },
    },
    'iPayNow.AccountCard': {
      container: {
        // marginTop: Platform.OS === "android" ? 10 : 0,
        // paddingBottom: 30,
        marginVertical: 10,
        overflow: 'visible',
      },
      shadow: {
        width: variables.deviceWidth - variables.screenPadding * 2,
        bottom: -60,
      },
      card: {
        backgroundColor: variables.cardDefaultBg,
        borderRadius: variables.cardBorderRadius,
        paddingHorizontal: variables.cardItemPadding,
        paddingVertical: (variables.cardItemPadding * 2) / 3,
        // paddingBottom: (variables.cardItemPadding * 3) / 2,
        flexDirection: 'row',
      },
      label: {
        fontFamily: variables.fontFamilyMedium,
        fontSize: variables.fontSizeBase,
        lineHeight: variables.lineHeight,
        color: variables.cardLabelColor,
      },
      value: {
        color: variables.cardTextColor,
        marginTop: 2,
      },
      exchange: {
        fontSize: variables.fontSizeBase * 0.9,
        color: variables.cardTextColor,
      },
      code: {
        alignSelf: 'flex-end',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderColor: variables.cardLabelColor,
        borderWidth: 3,
        overflow: 'hidden',
      },
      row: {
        marginTop: variables.smallSpace,
        marginRight: variables.smallSpace,
      },
      info: {
        fontFamily: variables.fontFamilyMedium,
        fontSize: variables.fontSizeBase,
        lineHeight: variables.lineHeight,
        color: variables.textColor,
        marginRight: variables.tinySpace,
        textAlign: 'right',
      },
      icon: {
        transform: [{ scale: 1.4 }, { translateX: variables.tinySpace }],
      },
      membership: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        backgroundColor: variables.bgInfo,
        marginTop: variables.smallSpace,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingHorizontal: variables.baseSpace,
        marginRight: -20,
      },
      scanButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f58d4e',
        bottom: 15,
        right: 20,
      },
      eye: {
        minHeight: 0,
        width: 30,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -5,
      },
    },
    'iPayNow.BannerSlider': {
      container: {
        height: 100,
      },
      button: {
        width: 40,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      leftButton: {
        left: 0,
      },
      rightButton: {
        right: 0,
      },
      card: {
        height: 100,
        top: -50,
        alignSelf: 'center',
      },
      background: {
        width: variables.deviceWidth - variables.screenPadding * 2 - 80,
        borderRadius: variables.cardBorderRadius,
        paddingHorizontal: variables.cardItemPadding,
        paddingVertical: (variables.cardItemPadding * 2) / 3,
        paddingBottom: (variables.cardItemPadding * 3) / 2,
        flexDirection: 'row',
      },
    },
    'iPayNow.TabNavigation': {
      container: {
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        alignSelf: 'center',
        shadowOffset: {
          width: 0,
          height: -9,
        },
        shadowRadius: 15,
        shadowColor: variables.bottomBarShadowColor,
        shadowOpacity: 0.8,
        elevation: 15,
      },
      menus: {
        backgroundColor: '#fff',
        width: variables.deviceWidth,
        bottom: 0,
        paddingVertical: 10,
        alignSelf: 'center',
      },
      title: {
        fontFamily: variables.fontFamilyMedium,
        fontSize: variables.fontSizeBase * 0.9,
        color: variables.bottomMenuColor,
        textDecorationLine: 'none',
      },
      home: {
        top: -40,
      },
    },
    'iPayNow.GroupBox': {
      ...spaces,

      'NativeBase.ViewNB': {
        'NativeBase.ViewNB': {
          'NativeBase.ViewNB': {
            '.fullWidth': {
              marginHorizontal: -variables.groupBoxPadding,
            },
            '.padder': {
              paddingHorizontal: variables.groupBoxPadding,
            },
            '.fill': {
              backgroundColor: variables.groupBoxBg,
            },
          },
        },
      },

      '.fullHeight': {
        flex: 1,
      },

      container: {
        // top: variables.groupBoxHeaderSize / 2,
        // marginBottom: variables.groupBoxHeaderSize / 2
      },
      noHeader: {
        top: 0,
        marginBottom: 0,
      },
      headerContainer: {
        position: 'absolute',
        top: -variables.groupBoxHeaderSize / 2,
        alignSelf: 'center',
      },
      header: {
        width: variables.groupBoxHeaderSize,
        height: variables.groupBoxHeaderSize,
        borderRadius: variables.groupBoxHeaderSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerTitle: {
        alignSelf: 'stretch',
        color: variables.groupBoxHeaderColor,
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 0.9,
        lineHeight: undefined,
        textAlign: 'center',
        marginHorizontal: 10,
      },
      backButton: {
        position: 'absolute',
        top: 5,
        left: variables.groupBoxPadding,
      },
      rightButton: {
        position: 'absolute',
        top: 5,
        right: variables.groupBoxPadding,
      },
      content: {
        backgroundColor: variables.groupBoxBg,
        borderRadius: variables.groupBoxBorderRadius, // variables.borderRadiusBase,
        padding: variables.groupBoxPadding,
        // paddingTop: variables.groupBoxHeaderSize / 2 + variables.groupBoxPadding
        elevation: 15,
      },
      contentNoHeader: {
        paddingTop: variables.groupBoxPadding,
      },
    },
    'iPayNow.Send': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      right: {
        marginLeft: variables.smallSpace,
      },
      list: {
        flex: 1,
        backgroundColor: '#fff',
      },
    },
    'iPayNow.Receive': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      qrLabelText: {
        fontFamily: variables.fontFamilyMedium,
        color: variables.inverseTextColor,
      },
    },
    'iPayNow.Earn': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      timer: {
        fontFamily: variables.fontFamilyBold,
        color: { 'colorful-light': '#191660', 'colorful-dark': '#fff', 'simple-light': '#191660', 'simple-dark': '#fff' }[themeName],
      },
      list: {
        marginHorizontal: -variables.smallSpace / 2,
      },
      button: {
        minWidth: 120,
        maxWidth: 200,
        width:
          (variables.deviceWidth -
            variables.screenPadding * 2 -
            variables.groupBoxPadding * 2 +
            (variables.smallSpace / 2) * 2 -
            variables.smallSpace * 2) /
          2,
        margin: variables.smallSpace / 2,
      },
      unselectedButton: {
        button: {
          // backgroundColor: "#717e91"
        },
      },
      selectedButton: {
        button: {},
      },
      name: {
        fontFamily: variables.fontFamilyMedium,
        color: variables.textColor,
        // color: { "colorful-light": "#fff", "colorful-dark": "#1b213b", "simple-light": "#fff", "simple-dark": "#fff" }[themeName]
      },
      selectedName: {
        fontFamily: variables.fontFamilyBold,
        color: variables.inverseTextColor,
        // color: { "colorful-light": "#191660", "colorful-dark": "#fff", "simple-light": "#191660", "simple-dark": "#191660" }[themeName]
      },
      interest: {
        fontFamily: variables.fontFamily,
        fontSize: variables.fontSizeBase * 0.8,
        color: variables.brandPrimary,
        // color: { "colorful-light": "#ffaeb5", "colorful-dark": "#d6404c", "simple-light": "#ffaeb5", "simple-dark": "#ffaeb5" }[themeName]
      },
      selectedInterest: {
        fontFamily: variables.fontFamilyMedium,
        color: variables.inverseTextColor,
        // color: { "colorful-light": "#ba1c2a", "colorful-dark": "#f9d4d7", "simple-light": "#ba1c2a", "simple-dark": "#ba1c2a" }[themeName]
      },
    },
    'iPayNow.BuyReward': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.smallSpace / 2,
      },
      button: {
        minWidth: 120,
        maxWidth: 250,
        width:
          (variables.deviceWidth -
            variables.screenPadding * 2 -
            variables.groupBoxPadding * 2 +
            (variables.smallSpace / 2) * 2 -
            variables.smallSpace * 2) /
          2,
        margin: variables.smallSpace / 2,
      },
      unselectedButton: {
        button: {
          // backgroundColor: "#717e91"
        },
      },
      selectedButton: {
        button: {},
      },
      name: {
        fontFamily: variables.fontFamilyMedium,
        color: variables.textColor,
        // color: { "colorful-light": "#fff", "colorful-dark": "#1b213b", "simple-light": "#fff", "simple-dark": "#fff" }[themeName]
      },
      selectedName: {
        fontFamily: variables.fontFamilyBold,
        color: variables.inverseTextColor,
        // color: { "colorful-light": "#191660", "colorful-dark": "#fff", "simple-light": "#191660", "simple-dark": "#191660" }[themeName]
      },
      interest: {
        fontFamily: variables.fontFamily,
        fontSize: variables.fontSizeBase * 0.8,
        color: variables.brandPrimary,
        // color: { "colorful-light": "#ffaeb5", "colorful-dark": "#d6404c", "simple-light": "#ffaeb5", "simple-dark": "#ffaeb5" }[themeName]
      },
      selectedInterest: {
        fontFamily: variables.fontFamilyMedium,
        color: variables.inverseTextColor,
        // color: { "colorful-light": "#ba1c2a", "colorful-dark": "#f9d4d7", "simple-light": "#ba1c2a", "simple-dark": "#ba1c2a" }[themeName]
      },
    },
    'iPayNow.Deposit': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.smallSpace / 2,
      },
      button: {
        minWidth: 100,
        maxWidth: 300,
        width:
          (variables.deviceWidth -
            variables.screenPadding * 2 -
            variables.groupBoxPadding * 2 +
            (variables.smallSpace / 2) * 2 -
            variables.smallSpace * 4) /
          4,
        margin: variables.smallSpace / 2,
      },
      name: {
        fontFamily: variables.fontFamilyBold,
        color: '#191660',
      },
    },
    'iPayNow.Games': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.smallSpace / 2,
      },
      button: {
        minWidth: 120,
        maxWidth: 300,
        width:
          (variables.deviceWidth -
            variables.screenPadding * 2 -
            variables.groupBoxPadding * 2 +
            (variables.smallSpace / 2) * 2 -
            variables.smallSpace * 2) /
          2,
        margin: variables.smallSpace / 2,
        // borderRadius: variables.buttonBorderRadius,
        // padding: variables.buttonPadding,
        button: {
          backgroundColor: {
            'colorful-light': 'transparent',
            'colorful-dark': 'transparent',
            'simple-light': '#717e91',
            'simple-dark': '#242424',
          }[themeName],
        },
      },
      name: {
        color: variables.inverseTextColor,
      },
      icon: {
        marginTop: variables.buttonPadding + 30,
      },
      badgeContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: variables.buttonPadding,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      time: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        fontFamily: variables.fontFamilyMedium,
        fontSize: variables.fontSizeBase * 0.5,
        lineHeight: 30,
        color: { 'colorful-light': '#1b213b', 'colorful-dark': '#fff', 'simple-light': '#1b213b', 'simple-dark': '#242424' }[themeName],
      },
      resultBadge: {
        position: 'absolute',
        top: variables.buttonPadding,
        right: variables.buttonPadding * 2,
      },
    },
    'iPayNow.LuckyDrawDetail': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.smallSpace / 2,
      },
      number: {
        margin: variables.smallSpace / 2,
        backgroundColor: variables.brandSuccess,
        color: variables.textColor,
      },
    },
    'iPayNow.LuckyDrawPlay': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      timer: {
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 3,
        lineHeight: variables.fontSizeBase * 3 * 1.4,
      },
      machineContainer: {
        height: 180,
      },
      machine: {
        marginLeft: (variables.deviceWidth - variables.screenPadding * 2 - variables.groupBoxPadding * 2 - 315) / 2,
      },
      numbers: {
        marginHorizontal: 18,
        marginTop: 50,
      },
      number: {
        fontSize: variables.fontSizeBase * 2.4,
        fontFamily: variables.fontFamilyBold,
        lineHeight: variables.fontSizeBase * 2.4 * 1.2,
      },
    },
    'iPayNow.GameCongratulations': {},
    'iPayNow.RollingDicePlay': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      dice: {
        width: 80,
        height: 80,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        padding: 15,
        margin: 15,
      },
      rollDice: {
        width: 80,
        height: 80,
        margin: 15,
        overflow: 'hidden',
      },
      input: {
        flex: 1,
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 3,
        textAlign: 'center',
        borderBottomWidth: 3,
        color: '#191660',
        backgroundColor: 'transparent',
      },
    },
    'iPayNow.GamesSlider': {
      container: {
        height: 80,
        marginHorizontal: -variables.groupBoxPadding,
        backgroundColor: '#1b213b',
        overflow: 'hidden',
      },
      button: {
        width: 40,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      leftButton: {
        left: 0,
      },
      rightButton: {
        right: 0,
      },
      card: {
        width: variables.deviceWidth - variables.screenPadding * 2,
        height: 80,
        marginTop: -40,
        marginLeft: -variables.deviceWidth / 2 + variables.screenPadding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b213b',
      },
      icon: {
        opacity: 0.5,
        transform: [{ scale: 2 }],
      },
      name: {
        position: 'absolute',
        left: 50,
        right: 50,
        fontFamily: variables.fontFamilyMedium,
        fontSize: variables.fontSizeBase * 2.5,
        lineHeight: 80,
        textAlign: 'center',
        color: '#fff',
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: {
          width: 0,
          height: 1,
        },
        textShadowRadius: 6,
      },
    },
    'iPayNow.ListItem': {
      ...spaces,

      item: {
        // backgroundColor: {
        //   "colorful-light": "#fff",
        //   "colorful-dark": "#191660",
        //   "simple-light": "#fff",
        //   "simple-dark": "#242424"
        // }[themeName],
        borderRadius: variables.borderRadiusBase,
        backgroundColor: '#f7f8fa',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      highlight: {
        // backgroundColor: {
        //   "colorful-light": "#f9d4d7",
        //   "colorful-dark": "#e12160",
        //   "simple-light": "#f9d4d7",
        //   "simple-dark": "#e12160"
        // }[themeName]
        backgroundColor: 'rgba(71, 199, 143, 0.2)',
      },
      itemLeft: {
        width: 50,
        height: 50,
        backgroundColor: '#d6404c',
        borderRadius: 25,
        marginHorizontal: variables.smallSpace,
        marginVertical: 6,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      itemCenter: {
        flex: 1,
        marginVertical: 6,
        marginRight: variables.smallSpace,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      itemRight: {
        marginRight: variables.smallSpace,
        marginVertical: 6,
      },
      itemAvatar: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      itemNumber: {
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      itemNumberText: {
        // position: "absolute",
        // top: 5,
        // bottom: 5,
        // left: 10,
        // right: 10,
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 1.4,
        lineHeight: 40,
        textAlign: 'center',
        color: variables.brandPrimary,
      },
      itemStar: {
        width: 30,
      },
      floatBar: {
        position: 'absolute',
        right: variables.tinySpace,
        bottom: Platform.OS === 'ios' ? -variables.buttonSmallHeight / 2 : variables.buttonSmallHeight / 2,
      },
      mainText: {
        // color: {
        //   "colorful-light": "#191660",
        //   "colorful-dark": "#fff",
        //   "simple-light": "#191660",
        //   "simple-dark": "#fff"
        // }[themeName]
        color: variables.brandPrimary,
      },
      subText: {
        // color: {
        //   "colorful-light": "#191660",
        //   "colorful-dark": "#fff",
        //   "simple-light": "#191660",
        //   "simple-dark": "#fff"
        // }[themeName]
        color: variables.textColor,
      },
    },
    'iPayNow.Leaderboards': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      datePickerButton: {
        height: 40,
      },
      datePicker: {
        height: 30,
        padding: 5,
        color: variables.textColor,
        textDecorationLine: 'none',
      },
      winning: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 1,
        elevation: 8,
      },
      winningNumber: {
        position: 'absolute',
        left: 10,
        right: 10,
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 2,
        lineHeight: variables.fontSizeBase * 2 * 1.2,
        textAlign: 'center',
        color: '#fff',
      },
      list: {
        marginTop: variables.baseSpace,
        // overflow: "visible"
      },
    },
    'iPayNow.ReferralList': {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
      },
      leftButton: {
        left: 0,
        alignItems: 'flex-start',
      },
      rightButton: {
        right: 0,
        alignItems: 'flex-end',
      },
      list: {
        marginHorizontal: 30,
      },
      listContent: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    'iPayNow.Referral': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      score: {
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 3,
        lineHeight: variables.fontSizeBase * 3 * 1.4,
        color: { 'colorful-light': '#191660', 'colorful-dark': '#fff', 'simple-light': '#191660', 'simple-dark': '#fff' }[themeName],
      },
      row: {
        height: 70,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    'iPayNow.Search': {
      input: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: variables.smallSpace,
        color: variables.inputColor,
      },
    },
    'iPayNow.Segment': {
      button: {
        marginHorizontal: variables.smallSpace,
      },
      first: {
        marginLeft: 0,
      },
      last: {
        marginRight: 0,
      },
    },
    'iPayNow.Rates': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.groupBoxPadding,
        paddingHorizontal: variables.groupBoxPadding,
        marginTop: variables.smallSpace,
      },
      listContent: {
        paddingBottom: variables.smallSpace,
      },
      leftStyle: {
        width: 30,
        height: 30,
        borderRadius: 15,
      },
      itemMainText: {
        flex: 0,
      },
      itemSubText: {
        flex: 1,
        fontFamily: variables.fontFamilyBold,
        textAlign: 'right',
        fontSize: variables.fontSizeH4,
        lineHeight: variables.lineHeightH4,
        marginLeft: variables.smallSpace,
        color: {
          'colorful-light': '#191660',
          'colorful-dark': '#fff',
          'simple-light': '#191660',
          'simple-dark': '#fff',
        }[themeName],
      },
    },
    'iPayNow.Store': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.groupBoxPadding,
        paddingHorizontal: variables.groupBoxPadding,
        paddingTop: variables.smallSpace,
      },
      listContent: {
        paddingBottom: variables.smallSpace,
      },
      itemMainText: {},
      itemSubText: {
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeH4,
        lineHeight: variables.lineHeightH4,
        marginTop: variables.smallSpace,
        marginRight: 100,
        color: {
          'colorful-light': '#191660',
          'colorful-dark': '#fff',
          'simple-light': '#191660',
          'simple-dark': '#fff',
        }[themeName],
      },
      itemContainer: {
        marginBottom: variables.buttonSmallHeight / 2 + 10,
      },
    },
    'iPayNow.MerchantItem': {
      item: {
        marginHorizontal: -variables.groupBoxPadding,
        overflow: 'hidden',
        borderRadius: 0,
      },
      backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
      },
      container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: variables.baseSpace,
      },
      logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
      info: {
        flex: 1,
        padding: variables.baseSpace,
      },
      brand: {
        fontFamily: variables.fontFamilyBold,
        fontSize: variables.fontSizeBase * 2,
        lineHeight: Platform.OS === 'ios' ? 0 : variables.fontSizeBase * 2 * 1.2,
        color: '#fff',
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: {
          width: 0,
          height: 0,
        },
        textShadowRadius: 6,
      },
      service: {
        color: '#ffaeb5',
      },
      address: {
        color: '#ffaeb5',
      },
    },
    'iPayNow.Merchants': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.groupBoxPadding,
        paddingHorizontal: variables.groupBoxPadding,
        paddingTop: variables.smallSpace,
      },
      listContent: {
        paddingBottom: variables.smallSpace,
      },
      merchantItem: {
        marginBottom: variables.smallSpace,
      },
      countryPicker: {
        borderRadius: variables.buttonBorderRadius,
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
        // backgroundColor: {
        //   "colorful-light": "#191660",
        //   "colorful-dark": "#d5a3ff",
        //   "simple-light": "#15bdd8",
        //   "simple-dark": "#15bdd8"
        // }[themeName],
        backgroundColor: '#fff',
        minHeight: variables.buttonHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
      },
      countryPickerTitle: {
        // color: { "colorful-light": "#fff", "colorful-dark": "#fff", "simple-light": "#fff", "simple-dark": "#fff" }[themeName]
        color: variables.brandPrimary,
        textDecorationLine: 'none',
      },
    },
    'iPayNow.MerchantDetail': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        // paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      slider: {
        height: 250,
        marginHorizontal: -variables.groupBoxPadding,
        overflow: 'visible',
      },
      sliderContentContainer: {
        paddingHorizontal: variables.groupBoxPadding,
        paddingBottom: variables.groupBoxPadding,
      },
      imageContainer: {
        flex: 1,
        borderRadius: variables.borderRadiusBase,
        overflow: 'hidden',
      },
      image: {
        flex: 1,
        borderRadius: variables.borderRadiusBase,
        resizeMode: 'cover',
      },
      paginationContainer: {
        paddingVertical: 8,
      },
      paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
      },
      logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
      mapContainer: {
        height: 200,
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      overlay: {
        flex: 0.6,
        padding: variables.groupBoxPadding,
      },
      address: {
        color: '#191660',
      },
      direction: {
        color: '#ba1c2a',
        textDecorationLine: 'underline',
      },
      itemAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: variables.brandPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      ratingContainer: {
        paddingLeft: 60,
      },
      rating: {
        marginTop: variables.baseSpace,
      },
    },
    'iPayNow.Exchange': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.groupBoxPadding,
        paddingHorizontal: variables.groupBoxPadding,
        paddingTop: variables.smallSpace,
      },
      listContent: {
        paddingBottom: variables.smallSpace,
      },
      paymentIcon: {
        margin: 1,
      },
      listItem: {
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
      },
      message: {
        color: {
          'colorful-light': '#191660',
          'colorful-dark': '#fff',
          'simple-light': '#191660',
          'simple-dark': '#fff',
        }[themeName],
      },
    },
    'iPayNow.History': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        borderWidth: 0,
        marginHorizontal: -variables.groupBoxPadding,
        paddingHorizontal: variables.groupBoxPadding,
      },
      header: {
        color: {
          'colorful-light': '#191660',
          'colorful-dark': '#fff',
          'simple-light': '#191660',
          'simple-dark': '#fff',
        }[themeName],
      },
    },
    'iPayNow.Profile': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      imageItem: {
        backgroundColor: '#fff',
        borderRadius: variables.buttonBorderRadius,
        margin: variables.smallSpace,
      },
      first: {
        marginLeft: 0,
      },
      last: {
        marginRight: 0,
      },
      imageContainer: {
        borderRadius: variables.buttonBorderRadius,
        overflow: 'hidden',
      },
      image: {
        width: 120,
        height: 80,
        borderRadius: variables.buttonBorderRadius,
      },
      overlay: {
        width: 120,
        height: 80,
        borderRadius: variables.buttonBorderRadius,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      delete: {
        width: 30,
        height: 30,
        minHeight: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'absolute',
        top: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      countryPicker: {
        borderRadius: variables.buttonBorderRadius,
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
        // backgroundColor: {
        //   "colorful-light": "#191660",
        //   "colorful-dark": "#d5a3ff",
        //   "simple-light": "#15bdd8",
        //   "simple-dark": "#15bdd8"
        // }[themeName],
        backgroundColor: '#fff',
        minHeight: variables.buttonHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
      },
      countryPickerTitle: {
        // color: { "colorful-light": "#fff", "colorful-dark": "#fff", "simple-light": "#fff", "simple-dark": "#fff" }[themeName],
        color: variables.brandPrimary,
        textDecorationLine: 'none',
      },
      contactUsButton: {
        // position: "absolute",
        // top: 5,
        // right: variables.groupBoxPadding
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        minHeight: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    'iPayNow.Notifications': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.groupBoxPadding,
        paddingHorizontal: variables.groupBoxPadding,
        paddingTop: variables.smallSpace,
      },
      listContent: {
        paddingBottom: variables.smallSpace,
      },
      image: {
        width: variables.deviceWidth - variables.screenPadding * 2 - variables.groupBoxPadding * 2 - variables.buttonHorizontalPadding * 2,
        height: 100,
        resizeMode: 'contain',
        marginBottom: variables.smallSpace,
      },
      itemContainer: {
        marginBottom: variables.smallSpace,
      },
      listItem: {
        paddingVertical: variables.buttonVerticalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
      },
      message: {
        color: {
          'colorful-light': '#191660',
          'colorful-dark': '#fff',
          'simple-light': '#191660',
          'simple-dark': '#fff',
        }[themeName],
      },
    },
    'iPayNow.Mall': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
    },
    'iPayNow.Trades': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
      list: {
        marginHorizontal: -variables.groupBoxPadding,
        paddingHorizontal: variables.groupBoxPadding,
        paddingTop: variables.smallSpace,
      },
      listContent: {
        paddingBottom: variables.smallSpace,
      },
      itemContainer: {
        marginBottom: variables.largeSpace,
      },
      listItem: {
        paddingVertical: variables.buttonHorizontalPadding,
        paddingHorizontal: variables.buttonHorizontalPadding,
      },
      title: {
        // color: {
        //   "colorful-light": variables.brandSecondary,
        //   "colorful-dark": "#191660",
        //   "simple-light": variables.brandSecondary,
        //   "simple-dark": "#191660"
        // }[themeName]
      },
      message: {
        color: {
          'colorful-light': '#191660',
          'colorful-dark': '#fff',
          'simple-light': '#191660',
          'simple-dark': '#fff',
        }[themeName],
      },
    },
    'iPayNow.TradeDetail': {
      contentContainer: {
        paddingBottom: variables.contentBottomPadding,
        paddingHorizontal: variables.screenPadding,
        paddingBottom: variables.bottomNavigationSpace,
      },
    },
  }

  const cssifyTheme = (grandparent, parent, parentKey) => {
    _.forEach(parent, (style, styleName) => {
      if (styleName.indexOf('.') === 0 && parentKey && parentKey.indexOf('.') === 0) {
        if (grandparent) {
          if (!grandparent[styleName]) {
            grandparent[styleName] = {}
          } else {
            grandparent[styleName][parentKey] = style
          }
        }
      }
      if (style && typeof style === 'object' && styleName !== 'fontVariant' && styleName !== 'transform') {
        cssifyTheme(parent, style, styleName)
      }
    })
  }

  cssifyTheme(null, theme, null)

  theme['groupBoxHeaderIcon'] = groupBoxHeaderIcon

  return theme
}
