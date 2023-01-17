import * as page from './index';

export const homeTitle = (title) => {
    return async (dispatch) => {
        dispatch(page.homeTitle(title));
    }
}

export const bottomControl = (signUpBoolean, loginBoolean) => {
    return async (dispatch) => {
        dispatch(page.bottomControl(signUpBoolean, loginBoolean))
    }
}

export const signUpControl = (boolean_) => {
    return (dispatch) => {
        dispatch(page.signUpControl(boolean_))
    }
}

export const alertControl = (alertData) => {
    return async (dispatch) => {
        dispatch(page.alertControl(alertData));
    }
}

export const alertReset = () => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch(page.alertReset());
        }, 4000)
    }
}

export const loadingControl = (bool) => {
    return async (dispatch) => {
        dispatch(page.loadingControl(bool))
    }
}

