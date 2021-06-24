import React from 'react'
import { Image, Platform } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle, Container, Content, View, Thumbnail, Item, Label, Input } from 'native-base'
import ThemeService from '../../services/ThemeService'
import { translate } from '../../constants/Languages'
import Screen from '../shared/Screen'
import TabNavigation from '../shared/TabNavigation'
import GroupBox from '../shared/GroupBox'
import AccountCard from '../shared/AccountCard'
import StyledText from '../shared/StyledText'
import Button from '../shared/Button'
import { getDetail } from '../../stores/market/actions'
import DropdownAlertService from '../../services/DropdownAlertService'

class TradeDetailScreen extends React.Component {
  state = {
    user: null,
  }

  componentWillMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const result = await this.props.getDetail(this.props.route.params?.id || '')
    if (!result.error) {
      this.setState({ user: result.result })
    }
  }

  render() {
    const styles = this.props.style
    const RequestIcon = ThemeService.getThemeStyle().variables.requestIcon

    return (
      <Screen title={translate('OTC REQUEST')}>
        <Container style={styles.container}>
          <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
            <AccountCard small hideReward hideWallet />
            <GroupBox
              smallSpaceTop
              icon={<RequestIcon {...ThemeService.getThemeStyle().groupBoxHeaderIcon} />}
              title={translate('OTC REQUEST')}
              fullHeight
              allowToBack
            >
              <StyledText bold='medium'>
                {this.state.user && this.state.user.isBuyer
                  ? translate('You can contact to seller with below information')
                  : translate('You can contact to buyer with below information')}
              </StyledText>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{translate('Account number')}</Label>
                <Input readonly editable={false} value={this.state.user ? this.state.user.accountNumber : ''} />
              </Item>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{translate('Full name')}</Label>
                <Input readonly editable={false} value={this.state.user ? this.state.user.fullName : ''} />
              </Item>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{translate('Email')}</Label>
                <Input readonly editable={false} value={this.state.user ? this.state.user.email : ''} />
              </Item>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{translate('Wallet address')}</Label>
                <Input readonly editable={false} multiline value={this.state.user ? this.state.user.walletAddress : ''} />
              </Item>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{translate('Contact number')}</Label>
                <Input readonly editable={false} value={this.state.user ? this.state.user.contactNumber : ''} />
              </Item>
              <Item stackedLabel underline spaceTop transparent>
                <Label>{translate('Payment information')}</Label>
                <Input readonly editable={false} multiline value={this.state.user ? this.state.user.paymentInfo : ''} />
              </Item>
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
    flex: 0,
  },
}

const mapStateToProps = (state) => {
  const {} = state
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (id) => dispatch(getDetail(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.TradeDetail', styles)(TradeDetailScreen))
