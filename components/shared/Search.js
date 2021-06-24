import React from 'react'
import { Platform } from 'react-native'
import { connectStyle, View, Input } from 'native-base'
import ThemeService from '../../services/ThemeService'
import BoxShadow from './BoxShadow'

class Search extends React.Component {
  state = {
    text: '',
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

  onTextChanged = (text) => {
    this.setState({ text })
    if (this.props.onTextChanged && typeof this.props.onTextChanged === 'function') {
      this.props.onTextChanged(text)
    }
  }

  render() {
    const { placeholder } = this.props
    const styles = this.props.style
    const SearchIcon = ThemeService.getThemeStyle().variables.searchIcon
    let shadowOpt = {
      width: this.state.width,
      height: this.state.height,
      color: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowColor,
      border: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowRadius,
      opacity: 0.2,
      x: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowOffset.width,
      y: ThemeService.getThemeStyle()['NativeBase.ViewNB']['.shadow'].shadowOffset.height,
      radius: ThemeService.getThemeStyle().variables.borderRadiusBase,
      style: {
        position: 'absolute',
      },
    }

    // onLayout={Platform.OS === "android" ? this.onLayout.bind(this) : null}
    return (
      <View shadow search flexFull>
        {/* {Platform.OS === "android" && <BoxShadow setting={shadowOpt} />} */}
        {Platform.OS === 'android' && (
          <View search>
            <SearchIcon style={{ marginTop: 5 }} />
            <Input
              style={styles.input}
              placeholder={placeholder}
              clearButtonMode='unless-editing'
              placeholderTextColor={ThemeService.getThemeStyle().variables.inputColorPlaceholder}
              value={this.state.text}
              onChangeText={this.onTextChanged}
            />
          </View>
        )}
        {Platform.OS === 'ios' && <SearchIcon style={{ marginTop: 5 }} />}
        {Platform.OS === 'ios' && (
          <Input
            style={styles.input}
            placeholder={placeholder}
            clearButtonMode='unless-editing'
            placeholderTextColor={ThemeService.getThemeStyle().variables.inputColorPlaceholder}
            value={this.state.text}
            onChangeText={this.onTextChanged}
          />
        )}
      </View>
    )
  }
}

const styles = {}

export default connectStyle('iPayNow.Search', styles)(Search)
