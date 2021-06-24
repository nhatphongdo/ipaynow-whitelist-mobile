import React from 'react'
import { connectStyle, View } from 'native-base'
import ThemeService from '../../services/ThemeService'
import { getProps } from '../../common/themes'
import Button from './Button'

class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rates: props.rates,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.rates !== nextProps.rates) {
      this.setState({ rates: nextProps.rates })
    }
  }

  onRate = (rates) => {
    this.setState({ rates })
    if (this.props.onRateChanged && typeof this.props.onRateChanged === 'function') {
      this.props.onRateChanged(rates)
    }
  }

  render() {
    const props = getProps(this.props)
    const { changable = false, large } = this.props
    const styles = props.style
    const HeartIcon = ThemeService.getThemeStyle().variables.heartIcon

    // const stroke = { 'colorful-light': '#09dac6', 'colorful-dark': '#6e00ff', 'simple-light': '#15bdd8', 'simple-dark': '#1aa68c' }[
    //     ThemeService.getThemeStyle().name
    // ];
    const stroke = '#186bfe'

    return (
      <View
        row
        style={[
          styles.container,
          {
            width: large ? 170 : 90,
          },
          styles,
        ]}
      >
        <Button onPress={changable ? () => this.onRate(1) : null}>
          <HeartIcon
            style={styles.icon}
            width={large ? 30 : 16}
            fill={this.state.rates >= 1 ? 'url(#prefix__a)' : 'none'}
            stroke={this.state.rates >= 1 ? 'none' : stroke}
          />
        </Button>
        <Button onPress={changable ? () => this.onRate(2) : null}>
          <HeartIcon
            style={styles.icon}
            width={large ? 30 : 16}
            fill={this.state.rates >= 2 ? 'url(#prefix__a)' : 'none'}
            stroke={this.state.rates >= 2 ? 'none' : stroke}
          />
        </Button>
        <Button onPress={changable ? () => this.onRate(3) : null}>
          <HeartIcon
            style={styles.icon}
            width={large ? 30 : 16}
            fill={this.state.rates >= 3 ? 'url(#prefix__a)' : 'none'}
            stroke={this.state.rates >= 3 ? 'none' : stroke}
          />
        </Button>
        <Button onPress={changable ? () => this.onRate(4) : null}>
          <HeartIcon
            style={styles.icon}
            width={large ? 30 : 16}
            fill={this.state.rates >= 4 ? 'url(#prefix__a)' : 'none'}
            stroke={this.state.rates >= 4 ? 'none' : stroke}
          />
        </Button>
        <Button onPress={changable ? () => this.onRate(5) : null}>
          <HeartIcon
            style={styles.icon}
            width={large ? 30 : 16}
            fill={this.state.rates >= 5 ? 'url(#prefix__a)' : 'none'}
            stroke={this.state.rates >= 5 ? 'none' : stroke}
          />
        </Button>
      </View>
    )
  }
}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}

export default connectStyle('iPayNow.Rating', styles)(Rating)
