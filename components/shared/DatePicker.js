import React from 'react'
import { Modal, View, Platform, Text } from 'react-native'
import { connect } from 'react-redux'
import { connectStyle } from 'native-base'

import DateTimePicker from '@react-native-community/datetimepicker'

import ThemeService from '../../services/ThemeService'

import StyledText from './StyledText'

class DatePicker extends React.Component {
  static defaultProps = {
    disabled: false,
  }
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      defaultDate: props.defaultDate ? props.defaultDate : new Date(),
      chosenDate: !props.placeHolderText && props.defaultDate ? props.defaultDate : undefined,
    }
  }

  setDate(date) {
    this.setState({ chosenDate: new Date(date), modalVisible: false })
    if (this.props.onDateChange) {
      this.props.onDateChange(new Date(date))
    }
  }

  showDatePicker = () => {
    this.setState({ modalVisible: true })
  }

  formatChosenDate(date) {
    if (this.props.formatChosenDate) {
      return this.props.formatChosenDate(date)
    }
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/')
  }

  render() {
    const {
      animationType,
      disabled,
      locale,
      maximumDate,
      minimumDate,
      modalTransparent,
      placeHolderText,
      placeHolderTextStyle,
      textStyle,
      timeZoneOffsetInMinutes,
    } = this.props

    const variables = ThemeService.getThemeStyle().variables

    return (
      <View>
        <View>
          <StyledText
            onPress={() => (!disabled ? this.showDatePicker() : undefined)}
            style={[
              {
                padding: variables.datePickerPadding,
                color: variables.datePickerTextColor,
              },
              this.state.chosenDate ? textStyle : placeHolderTextStyle,
            ]}
          >
            {this.state.chosenDate ? this.formatChosenDate(this.state.chosenDate) : placeHolderText || 'Select Date'}
          </StyledText>
          <View>
            <Modal
              supportedOrientations={['portrait', 'landscape']}
              animationType={animationType}
              transparent={modalTransparent} // from api
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
            >
              <Text
                onPress={() => this.setState({ modalVisible: false })}
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                }}
              />
              <DateTimePicker
                value={this.state.chosenDate ? this.state.chosenDate : this.state.defaultDate}
                onChange={(e, date) => this.setDate(date)}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                mode='date'
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
                locale={locale}
                timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                {...this.props}
              />
              <Text
                onPress={() => this.setState({ modalVisible: false })}
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                }}
              />
            </Modal>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('iPayNow.DatePicker', styles)(DatePicker))
