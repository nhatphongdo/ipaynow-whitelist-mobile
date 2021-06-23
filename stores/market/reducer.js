import { clone } from '../../common/helper';

const INITIAL_STATE = {};

export default MarketReducer = (state = INITIAL_STATE, action) => {
    let newState = clone(state);
    switch (action.type) {
        default:
            return state;
    }
};
