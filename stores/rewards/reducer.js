import { EARN_PERIODS_CHANGED, REWARD_INFO_CHANGED } from './constants';
import { CLEARED } from '../storage/constants';

const INITIAL_STATE = {
    balance: 0,
    lock: null,

    earnPeriods: []
};

export default RewardReducer = (state = INITIAL_STATE, action) => {
    let newState = { ...state };
    switch (action.type) {
        case REWARD_INFO_CHANGED:
            Object.assign(newState, action.payload);
            return newState;

        case EARN_PERIODS_CHANGED:
            newState.earnPeriods = action.payload;
            return newState;

            case CLEARED:
            return INITIAL_STATE;

        default:
            return state;
    }
};
