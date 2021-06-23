export const PINCODE_CHANGED = "PINCODE_CHANGED";

export const DEFAULT_PINCODE = {
  enabled: false,
  valid: null,
  currentPin: [],
  failAttempts: 0,
  lockTime: 0,
  expiredTime: 0,
  hashedPin: null,
  storedPin: []
};

export const MAX_FAIL_ATTEMPTS = 3;
export const LOCK_TIME = 5; // in minutes
export const EXPIRED_TIME = 60; // in minutes
