import React, { useEffect, useState, useCallback } from "react";
// import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { registerUserGoogle } from '../store/actions/users_actions';
import { sortArgsHelper } from '../config/tool';


const GoogleBtn = () => {

    const [googleBtnWidth, setGoogleBtnWidth] = useState('');
    // let location = useLocation();

    const setBtnWidth = useCallback(() => {
        if (document.getElementById('form-width')) {
            let width = document.getElementById('form-width').offsetWidth;
            // let width = document.querySelectorAll('.form-width')[0].offsetWidth;
            setGoogleBtnWidth(width);
        }
    }, [])

    const dispatch = useDispatch();

    const googleSignin = (res) => {
        const userObject = jwt_decode(res.credential);
        const sortUserObject = sortArgsHelper(userObject);
        dispatch(registerUserGoogle(sortUserObject));
    }

    useEffect(() => {
        setInterval(() => {
            setBtnWidth()
        }, 1000)
    }, [setBtnWidth])

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '745343078498-5p8203j67t9lv23i4ihcidlstq0bgc1f.apps.googleusercontent.com',
            callback: googleSignin
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {
                type: 'standard',
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'center',
                width: googleBtnWidth === '' ? document.getElementById('form-width').offsetWidth : googleBtnWidth
                // width: document.getElementById('form-width').offsetWidth

            }
        );


        // google.accounts.id.prompt();
    }, [googleBtnWidth])




    return (
        <div id='signInDiv'>

        </div>
    )
}

export default GoogleBtn;

// Client id
// 745343078498-5p8203j67t9lv23i4ihcidlstq0bgc1f.apps.googleusercontent.com

// Client secret
// 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

//form-width