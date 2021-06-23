import Axios from 'axios';
import { sign } from '../../common/helper';
import { NOT_READY_YET, GAME_REGISTERED, GAME_REMOVED } from './constants';
import { BASE_API_URL } from '../../constants/Constants';
import Socket from '../../services/Socket';

/* Events */
export const gameRegistered = payload => ({ type: GAME_REGISTERED, payload: payload });
export const gameRemoved = payload => ({ type: GAME_REMOVED, payload: payload });

/* Actions */
export const getGames = () => {
    return async (dispatch, getState) => {
        try {
            const response = await Axios.get(BASE_API_URL + '/games');
            return response.data;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log(err);
            }
            return [];
        }
    };
};

export const getGame = id => {
    return async (dispatch, getState) => {
        try {
            const response = await Axios.get(BASE_API_URL + '/games/' + id);
            return response.data;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log(err);
            }
            return null;
        }
    };
};

export const rollDice = (session, numbers) => {
    return async (dispatch, getState) => {
        try {
            const nonce = new Date().getTime();
            const signature = await sign(
                getState().account.privateKey,
                getState().account.serverPublicKey,
                JSON.stringify({ nonce, session, numbers })
            );

            const result = await Socket.emit('roll_dice', nonce, signature);
            return { result };
        } catch (err) {
            console.log(err);
            return { error: err };
        }
    };
};

export const getLuckyNumbers = gameId => {
    return async (dispatch, getState) => {
        if (!getState().account.token) {
            return { error: 'You need to login to proceed', result: null };
        }

        try {
            const nonce = new Date().getTime();
            const signature = await sign(
                getState().account.privateKey,
                getState().account.serverPublicKey,
                JSON.stringify({ nonce, gameId })
            );

            const response = await Axios.post(
                BASE_API_URL + '/games/luckynumbers',
                {
                    nonce,
                    signature
                },
                {
                    headers: {
                        Authorization: `Bearer ${getState().account.token}`
                    }
                }
            );

            return { error: null, result: response.data };
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                return { error: err.response.data.message, result: null };
            } else {
                console.log(err);
                return { error: err.message, result: null };
            }
        }
    };
};

export const buyLuckyNumber = (gameId, number) => {
    return async (dispatch, getState) => {
        if (!getState().account.token) {
            return { error: 'You need to login to proceed', result: null };
        }

        try {
            const nonce = new Date().getTime();
            const signature = await sign(
                getState().account.privateKey,
                getState().account.serverPublicKey,
                JSON.stringify({ nonce, gameId, number })
            );

            const response = await Axios.post(
                BASE_API_URL + '/games/buyluckynumber',
                {
                    nonce,
                    signature
                },
                {
                    headers: {
                        Authorization: `Bearer ${getState().account.token}`
                    }
                }
            );

            return { error: null, result: response.data };
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                return { error: err.response.data.message, result: null };
            } else {
                console.log(err);
                return { error: err.message, result: null };
            }
        }
    };
};

export const leaderboards = (id, date) => {
    return async (dispatch, getState) => {
        if (!getState().account.token) {
            return { error: 'You need to login to proceed', result: null };
        }

        try {
            const response = await Axios.post(
                BASE_API_URL + '/games/leaderboard/' + id,
                {
                    date: date.toISOString()
                },
                {
                    headers: {
                        Authorization: `Bearer ${getState().account.token}`
                    }
                }
            );
            return { error: null, result: response.data };
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                return { error: err.response.data.message, result: null };
            } else {
                console.log(err);
                return { error: err.message, result: null };
            }
        }
    };
};
