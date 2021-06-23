const INFO = 'info';
const WARN = 'warn';
const ERROR = 'error';
const SUCCESS = 'success';

let _dropDown;
let _onClose;

function setDropDown(dropDown) {
  _dropDown = dropDown;
}

function show(type, title, message, payload = null, interval = null) {
  if (_dropDown) {
    _dropDown.alertWithType(type, title, message, payload, interval);
  }
}

function close() {
  if (_dropDown) {
    _dropDown.close();
  }
}

function setOnClose(onClose) {
  _onClose = onClose;
}

function invokeOnClose() {
  if (typeof _onClose === 'function') {
    _onClose();
  }
}

export default {
  setDropDown,
  show,
  setOnClose,
  invokeOnClose,
  INFO,
  WARN,
  ERROR,
  SUCCESS
};
