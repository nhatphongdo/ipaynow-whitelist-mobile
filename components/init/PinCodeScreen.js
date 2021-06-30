import React from 'react'
import { Image, BackHandler, Platform } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View } from 'native-base'
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'
import moment from 'moment'
import DropDownAlertService from '../../services/DropdownAlertService'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import StyledText from '../shared/StyledText'
import { verifyPin, updatePin, isNeedToVerifyPinCode } from '../../stores/pincode/actions'
import { MAX_FAIL_ATTEMPTS, LOCK_TIME } from '../../stores/pincode/constants'
import { sleep } from '../../common/helper'

const AnimatableView = Animatable.createAnimatableComponent(View)

const AnimationDelay = 250
const ErrorDuration = 2000
const MaxCodeDigits = 6
const _codes = new Array(MaxCodeDigits).fill(0)

export const ChoosePinCode = 'choose'
export const EnterPinCode = 'enter'
export const LockedScreen = 'locked'
export const HardwareUnlock = 'hardware'
export const InputPinCode = 'input'
export const ConfirmPinCode = 'confirm'
export const ErrorPinCode = 'error'
export const SuccessPinCode = 'success'

class PinCodeScreen extends React.Component {
  constructor(props) {
    super(props)
    const type = props.route.params?.type || EnterPinCode

    this.state = {
      hardwareAuthenticationEnabled: false,
      hardwareAuthenticationTypes: [],
      pinCode: [],
      choosePinCode: [],
      step: InputPinCode, // input, confirm, error, success
      type: type === ChoosePinCode ? ChoosePinCode : props.pincode.lockTime > moment().valueOf() ? LockedScreen : EnterPinCode, // choose, enter, locked, hardware
      allowInput: true,
      hideMessage: false,
      hardwareScannedSuccess: null,
      hardwareScanLocked: false,
      lockedTimer: null,
      lockedTimeText: '',
      mustVerifyPinCode: props.route.params?.mustVerifyPinCode || false,
    }
    this._bootstrapAsync()
  }

  componentWillUnmount() {
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    if (this.state.lockedTimer) {
      clearInterval(this.state.lockedTimer)
      this.setState({ lockedTimer: null })
    }
  }

  handleBackPress = () => {
    // True means stop this event, False means let propagating this event to others
    return true
  }

  handleEnterSuccess = () => {
    const handler = this.props.route.params?.onEnterSuccess || null
    this.props.navigation.goBack()
    if (handler && typeof handler === 'function') {
      handler(this.state.pinCode)
    }
  }

  handleChooseSuccess = async () => {
    const result = await this.props.updatePin(this.state.choosePinCode)
    if (!result) {
      DropDownAlertService.show(
        DropDownAlertService.ERROR,
        translate('Error'),
        translate('Cannot set the pin code right now Your application is not protected Please try to set pin code again in Account Settings')
      )
      return
    }

    const handler = this.props.route.params?.onChooseSuccess || null
    this.props.navigation.goBack()
    if (handler && typeof handler === 'function') {
      handler(result, this.state.choosePinCode)
    }
  }

  _bootstrapAsync = async () => {
    try {
      const hasHardwareAuth = await LocalAuthentication.hasHardwareAsync()
      if (hasHardwareAuth) {
        const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()
        let enabled = await LocalAuthentication.isEnrolledAsync()
        enabled = enabled && supportedTypes.length > 0
        enabled = enabled && this.props.settings.hardwareAuthEnabled
        // At least to verify with pin code once before using hardware
        // enabled = enabled && !(await this.props.isNeedToVerifyPinCode());
        enabled = enabled && !this.state.mustVerifyPinCode
        this.setState(
          {
            hardwareAuthenticationTypes: supportedTypes,
            hardwareAuthenticationEnabled: enabled,
            type: this.state.type === EnterPinCode && enabled ? HardwareUnlock : this.state.type,
          },
          () => {
            if (this.state.type === HardwareUnlock) {
              this._scanHardware()
            }
          }
        )
      } else {
        this.setState({ hardwareAuthenticationEnabled: false })
      }
    } catch (e) {
      console.log(e)
      this.setState({ hardwareAuthenticationEnabled: false })
    }

    // Start timer if needed
    if (this.props.pincode.lockTime > moment().valueOf()) {
      this.setState({
        lockedTimer: setInterval(this.timer, 1000),
        lockedTimeText: this.formatTime(),
      })
    }
  }

  _scanHardware = async () => {
    const result = await LocalAuthentication.authenticateAsync()
    if (result.error === 'user_cancel') {
      // If cancel then we just start listen again
      this.setState({ hardwareScannedSuccess: null })
      await sleep(1000)
      this._scanHardware()
      return
    }
    if (result.error === 'lockout') {
      // Back to pincode
      this.setState(
        {
          hardwareScanLocked: true,
        },
        this.moveNextHardware
      )
      return
    }
    this.setState(
      {
        hardwareScannedSuccess: result.success,
      },
      this.moveNextHardware
    )
  }

  moveNextHardware = () => {
    if (this.state.type === HardwareUnlock) {
      if (this.state.hardwareScanLocked) {
        if (this.state.hideMessage === false) {
          this.setState({ hideMessage: true, allowInput: false, hardwareScannedSuccess: null })
        } else {
          this.setState({ type: EnterPinCode, step: InputPinCode, hardwareScannedSuccess: null, hideMessage: false })
          setTimeout(() => {
            this.setState({ allowInput: true })
          }, AnimationDelay)
        }
        return
      }

      if (this.state.step === InputPinCode) {
        if (this.state.hardwareScannedSuccess === true) {
          // Success
          if (this.state.hideMessage === false) {
            this.setState({ hideMessage: true, allowInput: false })
          } else {
            this.setState({ step: SuccessPinCode, hideMessage: false })
          }
        } else if (this.state.hardwareScannedSuccess === false) {
          // Error
          if (this.state.hideMessage === false) {
            this.setState({ hideMessage: true, allowInput: false })
          } else {
            this.setState({ step: ErrorPinCode, hideMessage: false })
          }
        }
      } else if (this.state.step === ErrorPinCode) {
        // Back to input
        if (this.state.hideMessage === false) {
          this.setState({ hideMessage: true, allowInput: false, hardwareScannedSuccess: null })
        } else {
          this.setState({ step: InputPinCode, hideMessage: false })
          setTimeout(() => {
            this.setState({
              allowInput: true,
              hardwareFailAttempts: this.state.hardwareFailAttempts + 1,
            })
            this._scanHardware()
          }, AnimationDelay)
        }
      } else if (this.state.step === SuccessPinCode) {
        // Enter success
        this.handleEnterSuccess()
      }
    }
  }

  formatTime = () => {
    const diff = moment(this.props.pincode.lockTime).diff(moment())
    const diffTime = moment.utc(diff)
    if (diff >= 24 * 60 * 60 * 1000) {
      return diffTime.toNow()
    } else if (diff >= 60 * 60 * 1000) {
      return diffTime.format('HH:mm:ss')
    } else {
      return diffTime.format('mm:ss')
    }
  }

  timer = () => {
    if (this.props.pincode.lockTime < moment().valueOf()) {
      // Timeout
      clearInterval(this.state.lockedTimer)
      this.setState({ type: EnterPinCode, lockedTimer: null, allowInput: true, hideMessage: false })
      return
    }
    this.setState({
      lockedTimeText: this.formatTime(),
    })
  }

  verifyPinCode = async () => {
    return await this.props.verifyPin(this.state.pinCode, this.state.hideMessage === false)
  }

  verifyWrongAttempts = async () => {
    let result = true
    if (this.props.pincode.failAttempts >= MAX_FAIL_ATTEMPTS) {
      result = false
    }

    if (this.state.hideMessage === false && !result) {
      this.setState({
        lockedTimer: setInterval(this.timer, 1000),
        lockedTimeText: this.formatTime(),
      })
    }

    return result
  }

  moveNext = async () => {
    if (this.state.type === ChoosePinCode) {
      if (this.state.step === InputPinCode && this.state.pinCode.length === MaxCodeDigits) {
        if (this.state.hideMessage === false) {
          this.setState({ hideMessage: true, allowInput: false })
        } else {
          this.setState({ step: ConfirmPinCode, hideMessage: false, choosePinCode: this.state.pinCode, pinCode: [] })
          setTimeout(() => {
            this.setState({ allowInput: true })
          }, AnimationDelay)
        }
      } else if (this.state.step === ConfirmPinCode && this.state.pinCode.length === MaxCodeDigits) {
        if (
          this.state.pinCode[0] === this.state.choosePinCode[0] &&
          this.state.pinCode[1] === this.state.choosePinCode[1] &&
          this.state.pinCode[2] === this.state.choosePinCode[2] &&
          this.state.pinCode[3] === this.state.choosePinCode[3] &&
          this.state.pinCode[4] === this.state.choosePinCode[4] &&
          this.state.pinCode[5] === this.state.choosePinCode[5]
        ) {
          // Success
          if (this.state.hideMessage === false) {
            this.setState({ hideMessage: true, allowInput: false })
          } else {
            this.setState({ step: SuccessPinCode, hideMessage: false })
          }
        } else {
          // Error
          if (this.state.hideMessage === false) {
            this.setState({ hideMessage: true, allowInput: false })
          } else {
            this.setState({ step: ErrorPinCode, hideMessage: false, choosePinCode: [] })
          }
        }
      } else if (this.state.step === ErrorPinCode) {
        // Back to input
        if (this.state.hideMessage === false) {
          this.setState({ hideMessage: true, allowInput: false })
        } else {
          this.setState({ step: InputPinCode, hideMessage: false, pinCode: [] })
          setTimeout(() => {
            this.setState({ allowInput: true })
          }, AnimationDelay)
        }
      } else if (this.state.step === SuccessPinCode) {
        // Choose success
        this.handleChooseSuccess()
      }
    } else if (this.state.type === EnterPinCode) {
      if (this.state.step === InputPinCode && this.state.pinCode.length === MaxCodeDigits) {
        const result = await this.verifyPinCode()
        if (result) {
          // Success
          if (this.state.hideMessage === false) {
            this.setState({ hideMessage: true, allowInput: false })
          } else {
            this.setState({ step: SuccessPinCode, hideMessage: false })
          }
        } else {
          // Error
          if (this.state.hideMessage === false) {
            this.setState({ hideMessage: true, allowInput: false })
          } else {
            this.setState({ step: ErrorPinCode, hideMessage: false })
          }
        }
      } else if (this.state.step === ErrorPinCode) {
        const result = await this.verifyWrongAttempts()
        if (result) {
          // Back to input
          if (this.state.hideMessage === false) {
            this.setState({ hideMessage: true, allowInput: false })
          } else {
            this.setState({ step: InputPinCode, hideMessage: false, pinCode: [] })
            setTimeout(() => {
              this.setState({ allowInput: true })
            }, AnimationDelay)
          }
        } else {
          this.setState({ type: LockedScreen, step: InputPinCode, pinCode: [] })
        }
      } else if (this.state.step === SuccessPinCode) {
        // Enter success
        this.handleEnterSuccess()
      }
    }
  }

  onKeyPress = (key) => {
    if (!this.state.allowInput) {
      return
    }
    if (key >= 0 && this.state.pinCode.length == MaxCodeDigits) {
      return
    }
    if (key === -1 && this.state.pinCode.length == 0) {
      return
    }

    const codes = this.state.pinCode
    if (key === -1) {
      codes.pop()
    } else {
      codes.push(key)
    }

    this.setState(
      {
        pinCode: codes,
      },
      () => this.moveNext()
    )
  }

  renderLocked = () => {
    const styles = this.props.style
    const Lock = ThemeService.getThemeStyle().variables.lock

    return (
      <AnimatableView useNativeDriver={true} animation={this.state.type === LockedScreen ? 'bounceIn' : 'zoomOut'}>
        <StyledText h3 full center spaceBottom bold='medium'>
          {translate('Maximum attempts reached')}
        </StyledText>
        <Lock style={styles.lockImage} height={100} />
        <StyledText full center spaceTop spaceBottom style={styles.lockTimer}>
          {this.state.lockedTimeText}
        </StyledText>
        <StyledText full center>
          {translate('To protect your information, access has been locked for {0} minutes Come back later and try again', LOCK_TIME)}
        </StyledText>
        {Platform.OS === 'android' && (
          <Button primary veryLargeSpaceTop onPress={() => BackHandler.exitApp()}>
            {translate('Quit')}
          </Button>
        )}
      </AnimatableView>
    )
  }

  renderMessage = () => {
    const styles = this.props.style

    let message = '',
      subMessage = ''
    if (this.state.type === ChoosePinCode) {
      if (this.state.step === InputPinCode) {
        message = translate('Enter PIN')
        subMessage = translate('to keep your wallet secure')
      } else if (this.state.step === ConfirmPinCode) {
        message = translate('Confirm your PIN')
      } else if (this.state.step === ErrorPinCode) {
        message = translate('Your entries did not match')
        subMessage = translate('Please try again')
      } else if (this.state.step === SuccessPinCode) {
        message = translate('Your PIN is set')
      }
    } else if (this.state.type === EnterPinCode) {
      if (this.state.step === InputPinCode) {
        message = translate('Enter PIN')
        subMessage = translate('to unlock your wallet')
      } else if (this.state.step === ErrorPinCode) {
        message = translate('Incorrect PIN')
        subMessage = translate('Please try again')
      } else if (this.state.step === SuccessPinCode) {
        message = translate('Correct PIN')
      }
    } else if (this.state.type === HardwareUnlock) {
      if (this.state.step === InputPinCode) {
        if (this.state.hardwareAuthenticationTypes.length == 1 && this.state.hardwareAuthenticationTypes[0] == 1) {
          message = translate('Scan your fingerprint')
        } else if (this.state.hardwareAuthenticationTypes.length == 1 && this.state.hardwareAuthenticationTypes[0] == 2) {
          message = translate('Scan your face')
        } else {
          message = translate('Scan your fingerprint or face')
        }
        subMessage = translate('to unlock your wallet')
      } else if (this.state.step === ErrorPinCode) {
        if (this.state.hardwareAuthenticationTypes.length == 1 && this.state.hardwareAuthenticationTypes[0] == 1) {
          message = translate('Fingerprint does not match')
        } else if (this.state.hardwareAuthenticationTypes.length == 1 && this.state.hardwareAuthenticationTypes[0] == 2) {
          message = translate('Face does not match')
        } else {
          message = translate('Fingerprint or Face does not match')
        }
        subMessage = translate('Please try again')
      } else if (this.state.step === SuccessPinCode) {
        message = translate('Scan completed')
      }
    }

    return (
      <AnimatableView
        useNativeDriver={true}
        duration={AnimationDelay / 2}
        animation={this.state.hideMessage ? 'fadeOut' : 'fadeIn'}
        onAnimationEnd={() =>
          this.state.step !== ErrorPinCode && this.state.step !== SuccessPinCode
            ? this.state.type === HardwareUnlock
              ? this.moveNextHardware()
              : this.moveNext()
            : this.state.hideMessage
            ? this.state.type === HardwareUnlock
              ? this.moveNextHardware()
              : this.moveNext()
            : setTimeout(this.state.type === HardwareUnlock ? this.moveNextHardware : this.moveNext, ErrorDuration)
        }
        largeSpaceBottom
      >
        <StyledText
          h3
          full
          center
          bold='medium'
          style={this.state.step === SuccessPinCode ? styles.successMessage : {}}
          error={this.state.step === ErrorPinCode}
        >
          {message}
        </StyledText>
        <StyledText
          full
          center
          smallSpaceTop
          style={this.state.step === SuccessPinCode ? styles.successMessage : {}}
          error={this.state.step === ErrorPinCode}
        >
          {subMessage}
        </StyledText>
      </AnimatableView>
    )
  }

  renderPinDots = () => {
    const styles = this.props.style
    const PinDot = ThemeService.getThemeStyle().variables.pinDot
    const SelectedPinDot = ThemeService.getThemeStyle().variables.pinDot //selectedPinDot;

    return (
      <AnimatableView
        useNativeDriver={true}
        delay={AnimationDelay * 2}
        animation={this.state.step === ErrorPinCode ? 'shake' : undefined}
        style={styles.dotsContainer}
      >
        {_codes.map((val, index) =>
          this.state.pinCode.length > index ? (
            <SelectedPinDot key={index} style={styles.dot} fill='#62C0B3' />
          ) : (
            <PinDot key={index} style={styles.dot} />
          )
        )}
      </AnimatableView>
    )
  }

  renderKeypad = () => {
    const styles = this.props.style
    const KeypadBackground = ThemeService.getThemeStyle().variables.keypadBackground
    const KeypadDelete = ThemeService.getThemeStyle().variables.keypadDelete

    const keypadWidth =
      (ThemeService.getThemeStyle().variables.deviceWidth - ThemeService.getThemeStyle().variables.screenPadding * 2) / 3 -
      ThemeService.getThemeStyle().variables.buttonSmallMargin * 2 -
      ThemeService.getThemeStyle().variables.buttonMargin * 2

    return (
      <View spaceTop style={styles.keypadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => (
          <Button thirdary onPress={() => this.onKeyPress(value)} key={index} style={styles.keypad}>
            {/* <KeypadBackground width={keypadWidth} /> */}
            <StyledText style={styles.keypadText}>{value}</StyledText>
          </Button>
        ))}
        <View style={[styles.keypad, { backgroundColor: 'none' }]} />
        <Button thirdary onPress={() => this.onKeyPress(0)} style={styles.keypad}>
          {/* <KeypadBackground width={keypadWidth} /> */}
          <StyledText style={styles.keypadText}>0</StyledText>
        </Button>
        <Button thirdary onPress={() => this.onKeyPress(-1)} style={styles.keypad}>
          {/* <KeypadBackground width={keypadWidth} /> */}
          <View style={[styles.keypadText, { justifyContent: 'center' }]}>
            <KeypadDelete />
          </View>
        </Button>
      </View>
    )
  }

  renderHardware = () => {
    const FaceId = ThemeService.getThemeStyle().variables.faceId
    const TouchId = ThemeService.getThemeStyle().variables.touchId

    return (
      <AnimatableView
        useNativeDriver={true}
        delay={AnimationDelay * 2}
        animation={this.state.step === ErrorPinCode ? 'shake' : undefined}
        largeSpaceTop
      >
        {this.state.hardwareAuthenticationTypes.indexOf(2) >= 0 && <FaceId />}
        {this.state.hardwareAuthenticationTypes.indexOf(2) < 0 && <TouchId />}
      </AnimatableView>
    )
  }

  renderPinCode = () => {
    return (
      <AnimatableView useNativeDriver={true} animation={this.state.type !== LockedScreen ? 'bounceIn' : 'zoomOut'} style={styles.contentContainer}>
        {this.renderMessage()}
        {this.state.type !== HardwareUnlock && this.renderPinDots()}
        {this.state.type !== HardwareUnlock && this.renderKeypad()}
        {this.state.type == HardwareUnlock && this.renderHardware()}
      </AnimatableView>
    )
  }

  render() {
    const styles = this.props.style

    return (
      <Modal
        isVisible={true}
        animationIn='bounceIn'
        animationOut='bounceOut'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        avoidKeyboard={true}
        backdropOpacity={1}
        style={{ flex: 1, margin: 0 }}
      >
        <Screen disableTopBackground disableHeader>
          <Container style={styles.container}>
            <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
              <Image style={styles.logo} source={ThemeService.getThemeStyle().variables.smallLogo} />
              {this.state.type === LockedScreen && this.renderLocked()}
              {this.state.type !== LockedScreen && this.renderPinCode()}
            </Content>
          </Container>
        </Screen>
      </Modal>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 0,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  keypadContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadText: {
    // position: "absolute"
  },
}

const mapStateToProps = (state) => {
  const { settings, pincode } = state
  return { settings, pincode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyPin: (pinCode, saveState) => dispatch(verifyPin(pinCode, saveState)),
    updatePin: (pin) => dispatch(updatePin(pin)),
    isNeedToVerifyPinCode: () => dispatch(isNeedToVerifyPinCode()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.PinCode', styles)(PinCodeScreen))
