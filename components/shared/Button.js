import React from 'react'
import { Platform } from 'react-native'
import { connectStyle, Button as BaseButton, View } from 'native-base'
import { mapPropsToStyleNames, getProps } from '../../common/themes'
import ThemeService from '../../services/ThemeService'
import StyledText from '../shared/StyledText'
import BoxShadow from './BoxShadow'

class Button extends React.Component {
  state = {
    width: null,
    height: null,
  }

  onLayout(event) {
    if (this.state.width && this.state.height) {
      return
    }

    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    })
  }

  render() {
    const props = getProps(this.props)
    const { style, ...buttonProps } = props

    let Background = null
    if (props.disabled) {
      Background = ThemeService.getThemeStyle().variables.disabledButtonBackground
    }
    if (props.primary) {
      Background = ThemeService.getThemeStyle().variables.primaryButtonBackground
    } else if (props.secondary) {
      // Background = ThemeService.getThemeStyle().variables.secondaryButtonBackground;
    } else if (props.thirdary) {
      Background = ThemeService.getThemeStyle().variables.thirdaryButtonBackground
    } else if (props.tiny) {
      Background = ThemeService.getThemeStyle().variables.tinyButtonBackground
    }

    const children =
      typeof this.props.children === 'string' ? (
        <StyledText numberOfLines={buttonProps.numberOfLines || 1} adjustsFontSizeToFit>
          {this.props.children}
        </StyledText>
      ) : (
        this.props.children
      )

    if (Background) {
      let shadowOpt = {
        width: this.state.width,
        height: this.state.height,
        color: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowColor,
        border: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowRadius,
        opacity: 0.2,
        x: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowOffset.width,
        y: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowOffset.height,
        radius: style.borderRadius || ThemeService.getThemeStyle().variables.buttonBorderRadius,
        style: {
          position: 'absolute',
        },
      }
      return (
        <View shadow style={style}>
          {/* {Platform.OS === "android" && <BoxShadow setting={shadowOpt} />} */}
          {/* <Background style={style.background} onLayout={Platform.OS === "android" ? this.onLayout.bind(this) : null}> */}
          <Background style={style.background}>
            <BaseButton style={style.button} {...buttonProps}>
              {children}
            </BaseButton>
          </Background>
        </View>
      )
    } else {
      return <BaseButton {...this.props}>{children}</BaseButton>
    }
  }
}

export default connectStyle('iPayNow.Button', {}, mapPropsToStyleNames)(Button)
