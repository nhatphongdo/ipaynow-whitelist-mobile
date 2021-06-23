import { ALERT_SHOW, ALERT_HIDE } from './constants';

export const showAlert = (config) => ({ type: ALERT_SHOW, payload: config });
export const hideAlert = () => ({ type: ALERT_HIDE });