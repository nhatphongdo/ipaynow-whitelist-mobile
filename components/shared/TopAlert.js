import React from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { connectStyle } from 'native-base';
import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertService from '../../services/DropdownAlertService';
import ThemeService from '../../services/ThemeService';

class TopAlert extends React.Component {
    render() {
        const styles = this.props.style;

        return (
            <DropdownAlert
                ref={ref => DropdownAlertService.setDropDown(ref)}
                onClose={() => DropdownAlertService.invokeOnClose()}
                closeInterval={5000}
                endDelta={Platform.OS === 'android' ? Constants.statusBarHeight : 0}
                showCancel={true}
                successColor={ThemeService.getThemeStyle().variables.brandSuccess}
                infoColor={ThemeService.getThemeStyle().variables.brandInfo}
                warnColor={ThemeService.getThemeStyle().variables.brandWarning}
                errorColor={ThemeService.getThemeStyle().variables.brandDanger}
                titleStyle={styles.title}
                messageStyle={styles.message}
            />
        );
    }
}

const styles = {};

const mapStateToProps = state => {
    const {} = state;
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(connectStyle('iPayNow.DropdownAlert', styles)(TopAlert));
