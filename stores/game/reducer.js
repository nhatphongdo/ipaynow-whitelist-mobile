import { clone } from '../../common/helper';
import { GAME_REGISTERED, GAME_REMOVED } from './constants';

const INITIAL_STATE = {
    games: {}
};

export default GamesReducer = (state = INITIAL_STATE, action) => {
    let newState = clone(state);
    switch (action.type) {
        case GAME_REGISTERED:
            newState.games[action.payload.id] = action.payload;
            return newState;

        case GAME_REMOVED:
            delete newState.games[action.payload];
            return newState;

        default:
            return state;
    }
};
