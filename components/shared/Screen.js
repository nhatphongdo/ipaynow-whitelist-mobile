import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connectStyle } from 'native-base'
import ThemeService from '../../services/ThemeService'
import { View } from 'react-native-animatable'
import StyledText from './StyledText'
import Back from '../../assets/images/Back'
import Button from './Button'
import NavigationService from '../../services/NavigationService'

class Screen extends React.Component {
  onBack = () => {
    NavigationService.goBack()
  }

  render() {
    const { disableTopBackground, disableHeader, disableBack, title, right } = this.props
    const styles = this.props.style
    const Background = ThemeService.getThemeStyle().variables.mainBackground

    return (
      <Background style={styles.container}>
        {!disableTopBackground && <View style={styles.topBackground}></View>}
        <SafeAreaView style={styles.safeView}>
          {!disableHeader && (
            <View style={styles.header}>
              {!disableBack && (
                <Button style={styles.back} onPress={this.onBack}>
                  <Back height={ThemeService.getThemeStyle().variables.headerHeight - 10} />
                </Button>
              )}
              {title && (
                <StyledText h4 bold='bold' style={styles.title}>
                  {title}
                </StyledText>
              )}
              {right && <View style={styles.right}>{right}</View>}
            </View>
          )}
          {this.props.children}
        </SafeAreaView>
      </Background>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
}

export default connectStyle('iPayNow.Screen', styles)(Screen)
