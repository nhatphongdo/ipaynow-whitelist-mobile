import React from 'react';
import { connect } from 'react-redux';
import { connectStyle } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import { translate } from '../../constants/Languages';
import { hideAlert } from '../../stores/alert/actions';
import ThemeService from '../../services/ThemeService';

class Alert extends React.Component {
    render() {
        const styles = this.props.style;

        return (
            <AwesomeAlert
                titleStyle={styles.alertTitle}
                messageStyle={styles.alertMessage}
                cancelButtonTextStyle={[styles.alertCancelTitle, this.props.alert.config.cancelButtonTextStyle]}
                confirmButtonTextStyle={[styles.alertConfirmTitle, this.props.alert.config.confirmButtonTextStyle]}
                show={this.props.alert.shown}
                showProgress={this.props.alert.config.showProgress}
                title={this.props.alert.config.title}
                message={this.props.alert.config.message}
                closeOnTouchOutside={this.props.alert.config.closeOnTouchOutside === undefined ? true : this.props.alert.config.closeOnTouchOutside}
                closeOnHardwareBackPress={this.props.alert.config.closeOnHardwareBackPress || false}
                showCancelButton={this.props.alert.config.showCancelButton == undefined ? true : this.props.alert.config.showCancelButton}
                showConfirmButton={this.props.alert.config.showConfirmButton || false}
                progressSize={this.props.alert.config.progressSize}
                progressColor={this.props.alert.config.progressColor}
                cancelText={this.props.alert.config.cancelText || translate('Cancel')}
                confirmText={this.props.alert.config.confirmText || translate('Confirm')}
                cancelButtonColor={this.props.alert.config.cancelButtonColor || ThemeService.getThemeStyle().variables.btnDangerBg}
                confirmButtonColor={this.props.alert.config.confirmButtonColor || ThemeService.getThemeStyle().variables.btnSuccessBg}
                onCancelPressed={this.props.alert.config.onCancelPressed || this.props.hideAlert}
                onConfirmPressed={this.props.alert.config.onConfirmPressed || this.props.hideAlert}
                onDismiss={this.props.alert.config.onDismiss}
                customView={this.props.alert.config.customView}
            />
        );
    }
}

const styles = {};

const mapStateToProps = state => {
    const { alert } = state;
    return { alert };
};

const mapDispatchToProps = dispatch => {
    return {
        hideAlert: () => dispatch(hideAlert())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(connectStyle('iPayNow.Alert', styles)(Alert));
