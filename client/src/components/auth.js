import * as React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Alert, AlertTitle } from '@mui/material';
import GoogleBtn from './google_button';
import Login from './login';
import SignUp from './signup';



const Auth = () => {
    const loginTitle = useSelector(state => state.page.homeTitle);
    const alertType = useSelector(state => state.page.homeAlertType);
    const alertStatus = useSelector(state => state.page.homeAlert);
    const signUpBoolean = useSelector(state => state.page.signUp);
    const alertTitle = useSelector(state => state.page.homeAlertTitle);
    const alertContent = useSelector(state => state.page.homeAlertContent)

    return (

        <main className="form-signin w-100 m-auto">
            <div>
                <h1 className="h1 mb-3  fredoka-one-text web-title">Resume Air</h1>
                <h1 className="h3 mb-3 roboto-text web-login-title">{loginTitle}</h1>

                <div className="mb-3 mt-5 google-btn" >
                    <GoogleBtn />
                </div>
                <div className="mb-3 mt-4">
                    <Divider>or</Divider>
                </div>
                {
                    alertStatus ?
                        <div className="mb-3 mt-4">
                            <Alert severity={alertType}>
                                <AlertTitle>{alertTitle}</AlertTitle>
                                {alertContent}
                                {/* This is a warning alert — <strong>check it out!</strong> */}
                            </Alert>
                        </div>
                        : null
                }

                <div className="mb-3 mt-4">
                    {/* <SignUp /> */}
                    {
                        signUpBoolean ? <SignUp /> : <Login />
                    }


                </div>
            </div>
        </main>
    );
}


export default Auth;