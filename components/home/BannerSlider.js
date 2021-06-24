import React from 'react'
import { connect } from 'react-redux'
import { connectStyle, View, DeckSwiper, Thumbnail } from 'native-base'
import ThemeService from '../../services/ThemeService'
import Button from '../shared/Button'
import StyledText from '../shared/StyledText'

class BannerSlider extends React.Component {
  render() {
    const cards = []

    if (!cards || cards.length === 0) {
      return null
    }

    const styles = this.props.style

    const Background = ThemeService.getThemeStyle().variables.primaryBackground
    const LeftChevron = ThemeService.getThemeStyle().variables.leftChevron
    const RightChevron = ThemeService.getThemeStyle().variables.rightChevron

    return (
      <View spaceBottom style={styles.container}>
        <DeckSwiper
          ref={(c) => (this._deckSwiper = c)}
          dataSource={cards}
          renderItem={(item) => (
            <View bigLightShadow style={styles.card}>
              <Background style={styles.background}>
                <Thumbnail style={styles.left} />
                <View style={styles.right}>
                  <StyledText>{item.name}</StyledText>
                  <StyledText>{item.text}</StyledText>
                </View>
              </Background>
            </View>
          )}
        />
        <Button style={[styles.button, styles.leftButton]} onPress={() => this._deckSwiper._root.swipeLeft()}>
          <LeftChevron />
        </Button>
        <Button style={[styles.button, styles.rightButton]} onPress={() => this._deckSwiper._root.swipeRight()}>
          <RightChevron />
        </Button>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 0,
    position: 'absolute',
  },
}

const mapStateToProps = (state) => {
  const {} = state
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.BannerSlider', styles)(BannerSlider))
