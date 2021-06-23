import { clone } from '../../common/helper';
import { PINCODE_CHANGED, DEFAULT_PINCODE } from './constants';
import { CLEARED } from '../storage/constants';

export default PinCodeReducer = (state = DEFAULT_PINCODE, action) => {
    let newState = clone(state);
    switch (action.type) {
        case PINCODE_CHANGED:
            Object.assign(newState, action.payload);
            return newState;
        case CLEARED:
            return DEFAULT_PINCODE;
        default:
            return state;
    }
};
