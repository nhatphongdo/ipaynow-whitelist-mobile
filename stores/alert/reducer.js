import { clone } from '../../common/helper';
import { translate } from '../../constants/Languages';
import { ALERT_SHOW, ALERT_HIDE } from './constants';

const defaultConfig = {
    cancelButtonTextStyle: {},
    confirmButtonTextStyle: {},
    showProgress: false,
    title: '',
    message: '',
    closeOnTouchOutside: true,
    closeOnHardwareBackPress: false,
    showCancelButton: true,
    showConfirmButton: false,
    progressSize: 0,
    progressColor: '#fff',
    cancelText: translate('Cancel'),
    confirmText: translate('Confirm'),
    cancelButtonColor: '',
    confirmButtonColor: '',
    onCancelPressed: null,
    onConfirmPressed: null,
    onDismiss: null,
    customView: null
};

const INITIAL_STATE = {
    shown: false,
    config: defaultConfig
};

export default AlertReducer = (state = INITIAL_STATE, action) => {
    let newState = clone(state);
    switch (action.type) {
        case ALERT_SHOW:
            newState.shown = true;
            newState.config = action.payload || defaultConfig;
            return newState;
        case ALERT_HIDE:
            newState.shown = false;
            return newState;
        default:
            return state;
    }
};
