import React from 'react'
import { FlatList } from 'react-native'
import { connectStyle, View } from 'native-base'
import ThemeService from '../../services/ThemeService'
import Button from './Button'
import { getProps } from '../../common/themes'

class Segment extends React.Component {
  state = {
    selectedIndex: 0,
  }

  onItemSelected = (index) => {
    const prevIndex = this.state.selectedIndex
    this.setState({ selectedIndex: index })
    if (this.props.onSelectionChanged && typeof this.props.onSelectionChanged === 'function') {
      this.props.onSelectionChanged(this.props.data[index], index, prevIndex)
    }
  }

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item, index }) => {
    const styles = this.props.style
    return (
      <Button
        segment
        active={index === this.state.selectedIndex}
        style={[styles.button, index === 0 ? styles.first : {}, index === this.props.data.length - 1 ? styles.last : {}]}
        onPress={() => this.onItemSelected(index)}
      >
        {item}
      </Button>
    )
  }

  render() {
    const props = getProps(this.props)
    const { data, ...others } = this.props
    const style = props.style

    return (
      <View style={style} {...others}>
        <FlatList
          ref={(c) => (this._flatList = c)}
          style={style.list}
          contentContainerStyle={style.listContent}
          horizontal
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = {}

export default connectStyle('iPayNow.Segment', styles)(Segment)
