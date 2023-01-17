import {
    AUTH_USER, SIGN_OUT,
    PAGE_TITLE, BOTTOM_CONTROL,
    SIGN_UP_CONTROL, ALERT_CONTROL,
    ALERT_RESET, IMAGE, LOADING, EDIT_ID 
} from "../type";

export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const singOut = () => ({
    type: SIGN_OUT
})

export const homeTitle = (title) => ({
    type: PAGE_TITLE,
    payload: title
})

export const bottomControl = (signUpBoolean, loginBoolean) => ({
    type: BOTTOM_CONTROL,
    payload: {signUp: signUpBoolean, logInNow: loginBoolean}
})

export const signUpControl = (boolean_) => ({
    type: SIGN_UP_CONTROL,
    payload: boolean_
})

export const alertControl = (alertData) => ({
    type: ALERT_CONTROL,
    payload: alertData
})

export const alertReset = () => ({
    type: ALERT_RESET
})

export const setImage = (url) => ({
    type: IMAGE,
    payload: url
})

export const loadingControl = (bool) => ({
    type: LOADING,
    payload: bool
});

export const getEditId = (id) => ({
    type: EDIT_ID,
    payload: id
})
