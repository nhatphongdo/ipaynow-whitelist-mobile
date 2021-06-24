import React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Item, Input, Spinner } from 'native-base'
import Modal from 'react-native-modal'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import Button from '../shared/Button'
import StyledText from '../shared/StyledText'
import DropdownAlertService from '../../services/DropdownAlertService'
import { addReferral } from '../../stores/account/actions'

class AddReferralScreen extends React.Component {
  state = {
    referral: '',

    scanning: false,
    scanned: true,

    confirming: false,
  }

  onScan = async () => {
    let permission = await Permissions.getAsync(Permissions.CAMERA)
    if (permission.status === 'granted') {
      this.setState({ scanning: true, scanned: false })
    } else {
      permission = await Permissions.askAsync(Permissions.CAMERA)
      if (permission.status === 'granted') {
        this.setState({ scanning: true, scanned: false })
      } else {
        DropdownAlertService.show(
          DropdownAlertService.ERROR,
          translate('Error'),
          translate('You must approve CAMERA permission to allow application to scan QR code')
        )
      }
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanning: false, scanned: true })
    if (data) {
      this.setState({ recipient: data.trim() })
    }
  }

  onConfirm = async () => {
    // Validate
    if (!this.state.referral) {
      return
    }

    this.setState({ confirming: true })
    const result = await this.props.addReferral(this.state.referral)
    this.setState({ confirming: false })
    if (result.error) {
      DropdownAlertService.show(DropdownAlertService.ERROR, translate('Error'), translate(result.error))
      return
    }

    this.props.navigation.navigate('MainApp', { screen: 'Home' })
  }

  onIgnore = async () => {
    this.props.navigation.navigate('MainApp', { screen: 'Home' })
  }

  render() {
    const styles = this.props.style

    return (
      <Screen disableTopBackground disableHeader>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Image style={styles.logo} source={ThemeService.getThemeStyle().variables.smallLogo} />
            <StyledText largeSpaceBottom center>
              {translate('Input your referral ID to get bonus from your network You may scan QR code to retrieve referral ID also')}
            </StyledText>
            <StyledText center spaceBottom>
              {translate('Input the Referral ID')}
            </StyledText>
            <Item regular style={styles.inputContainer}>
              <Input
                keyboardType='numeric'
                value={this.state.referral}
                onChangeText={(text) => this.setState({ referral: text })}
                style={styles.input}
              />
            </Item>
            <Button primary spaceTop onPress={this.onScan}>
              {translate('Scan QR code')}
            </Button>
            <Button primary full veryLargeSpaceTop disabled={this.state.confirming} onPress={this.onConfirm}>
              {!this.state.confirming && <StyledText>{translate('CONFIRM')}</StyledText>}
              {this.state.confirming && <Spinner color='#fff' />}
            </Button>
            <Button spaceTop spaceBottom disabled={this.state.confirming} onPress={this.onIgnore}>
              {translate('Skip this step')}
            </Button>
          </Content>
        </Container>
        <Modal
          isVisible={this.state.scanning}
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
          {this.state.scanning && (
            <View flexCenter flexFull>
              <BarCodeScanner
                onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                style={ThemeService.getThemeStyle().qrScanner}
              />
              <Button thirdary center spaceTop spaceBottom onPress={() => this.setState({ scanning: false, scanned: true })}>
                {translate('Cancel')}
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
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  input: {
    textAlign: 'center',
  },
}

const mapStateToProps = (state) => {
  const {} = state
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReferral: (id) => dispatch(addReferral(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.AddReferral', styles)(AddReferralScreen))
