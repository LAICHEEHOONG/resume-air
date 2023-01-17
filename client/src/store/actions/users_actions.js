import * as users from './index';
import axios from 'axios';
import { getTokenCookie, getAuthHeader } from '../../utils/tools';
import { getUserProps } from '../../utils/tools';
import { alertControl } from './page_actions';

export const registerUserGoogle = (googleUser) => {

    return async (dispatch, getState) => {

        try {
            const user = await axios.post('/api/users/google_oauth', {
                googleUser
            });
            dispatch(users.authUser({
                data: { ...googleUser, _id: user.data._id },
                auth: true
            }));
        } catch (error) {
            console.log('google user register failed.', error.response.data.message);
            dispatch(users.authUser({ data: null, auth: false }));
        }
    }
}

export const registerUser = (userData) => {

    return async (dispatch, getState) => {

        try {
            const user = await axios.post('/api/users/web_oauth/register',
                { userData }
            );

            if (!user.data.signUp) {
                dispatch(alertControl({
                    homeAlert: true,
                    homeAlertType: 'error',
                    homeAlertTitle: 'Email Taken',
                    homeAlertContent: 'Please try the other email'
                }))
            }

            const signUpStatus = user.data.signUp;

            if (signUpStatus) {
                dispatch(users.authUser({
                    data: { ...getUserProps(userData), _id: userData.email },
                    auth: true
                }));
            } else {
                dispatch(users.authUser({ data: null, auth: false }));
            }


        } catch (error) {
            console.log('User register failed')
            dispatch(users.authUser({ data: null, auth: false }));
        }
    }
}

export const loginUser = (userData) => {
    return async (dispatch, getState) => {

        try {
            const user = await axios.post('/api/users/web_oauth/login',
                { userData }
            );

            const signUpStatus = user.data.signUp;

            if (signUpStatus) {
                dispatch(users.authUser({
                    data: { ...getUserProps(user.data.user), _id: user.data.email },
                    auth: true
                }));
            } else {
                dispatch(users.authUser({ data: null, auth: false }));
            }

        } catch (error) {
            console.log('User login failed', error)

            console.log('User login failed')
            dispatch(users.authUser({ data: null, auth: false }));
            dispatch(alertControl({
                homeAlert: true,
                homeAlertType: 'error',
                homeAlertTitle: 'Login Failed',
                homeAlertContent: 'Sorry, an unexpected error occurred. Please try again.'
            }))
            dispatch(users.authUser({ data: null, auth: false }));
        }
    }
}

export const isAuthUser = () => {
    return async (dispatch) => {
        try {
            if (!getTokenCookie()) {
                throw new Error();
            };

            const user = await axios.get('/api/users/isauth', getAuthHeader());

            dispatch(users.authUser({
                data: user.data,
                auth: true
            }));

        } catch (error) {
            dispatch(users.authUser({ data: null, auth: false }));
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        dispatch(users.singOut());
    }
}

export const setImage = (url) => {
    return async (dispatch) => {
        dispatch(users.setImage(url));
    }
}