import {
    PAGE_TITLE, BOTTOM_CONTROL, SIGN_UP_CONTROL,
    ALERT_CONTROL, ALERT_RESET, LOADING
} from "../type";

let DEFAULT_PAGE_STATE = {
    homeTitle: 'Login to your account',
    signUp: false,
    logInNow: false,
    homeAlert: false,
    homeAlertType: 'error',
    homeAlertTitle: 'Error',
    homeAlertContent: 'This is an error alert',
    loadingControl: false
};

export default function pageReducer(state = DEFAULT_PAGE_STATE, action) {
    switch (action.type) {
        case PAGE_TITLE:
            return { ...state, homeTitle: action.payload }
        case BOTTOM_CONTROL:
            return { ...state, ...action.payload }
        case SIGN_UP_CONTROL:
            return { ...state, signUp: action.payload }
        case ALERT_CONTROL:
            return { ...state, ...action.payload }
        case ALERT_RESET:
            return {
                ...state, 
                homeAlert: false,
                homeAlertType: 'error',
                homeAlertTitle: 'Error',
                homeAlertContent: 'This is an error alert',
                loadingControl: false
            }
        case LOADING: 
            return {
                ...state,
                loadingControl: action.payload
            }
        default:
            return state;
    }
}

