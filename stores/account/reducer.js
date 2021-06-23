import { clone } from '../../common/helper';
import { PROFILE_CHANGED, PRIVATE } from './constants';
import { CLEARED } from '../storage/constants';

const INITIAL_STATE = {
    // Secure properties
    privateKey: null,
    publicKey: null,
    serverPublicKey: null,

    // Normal property
    token: null,
    accountNumber: 0,
    availability: PRIVATE,
    confirmed: false,
    createdOn: null,
    updatedOn: null,
    email: '',
    id: 0,
    father: null,
    grandFather: null,
    username: null,
    isMerchant: false,
    fullName: null,
    applyMerchantTime: null,
    blocked: null,
    vendorAddress: null,
    vendorAddressLocation: null,
    vendorContactNumber: null,
    vendorCountry: null,
    vendorDescription: null,
    vendorName: null,
    vendorLogo: null,
    vendorService: null,
    vendorCategory: null,
    vendorImages: [],
    membership: null,
    rating: 0,
    ratingCount: 0
};

export default AccountReducer = (state = INITIAL_STATE, action) => {
    let newState = clone(state);
    switch (action.type) {
        case PROFILE_CHANGED:
            Object.assign(newState, action.payload);
            return newState;

        case CLEARED:
            return INITIAL_STATE;

        default:
            return state;
    }
};
