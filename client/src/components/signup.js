import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { registerUser } from "../store/actions/users_actions";
import { homeTitle, signUpControl } from "../store/actions";
import { useFormik } from 'formik';
import { Grid, TextField, Link, Button } from "@mui/material";
import { alertReset } from "../store/actions/page_actions";
import { formValuesSignUp, validationSignUp, errorHelper } from "../utils/signup_validation_schema";


const SignUp = () => {
    const dispatch = useDispatch();
    const [signBtn, setSignBtn] = useState(true);

    const formik = useFormik({
        initialValues: formValuesSignUp,
        validationSchema: validationSignUp,
        onSubmit: (values, { resetForm }) => {
            dispatch(registerUser(values));
            dispatch(alertReset())
            setTimeout(() => {
                resetForm()
            }, 4000)
            // resetForm();
        }
    });


    const clickLogin = () => {
        dispatch(signUpControl(false))
    }

    const createEmailValue = useCallback(() => {
        let emailValue = formik.values;
        if (emailValue.email !== '') {
            setSignBtn(false)
        }
    }, [formik.values])

    useEffect(() => {
        dispatch(homeTitle('Create your account'));
    }, [dispatch]);

    useEffect(() => {
        setInterval(() => {
            createEmailValue()
        }, 2000)
    }, [createEmailValue])


    return (
        <form onSubmit={formik.handleSubmit}>
            <div id='form-width'>
                <Grid container >
                    <TextField
                        style={{ width: '100%', marginBottom: '20px' }}
                        name='email'
                        label='Email'
                        variant='outlined'
                        autoComplete='email'
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik, 'email')}
                    />
                </Grid>
                <Grid container >
                    <TextField
                        style={{ width: '100%', marginBottom: '20px' }}
                        name='family_name'
                        label='First Name'
                        variant='outlined'
                        {...formik.getFieldProps('family_name')}
                        {...errorHelper(formik, 'family_name')}
                    />
                </Grid>
                <Grid container >
                    <TextField
                        style={{ width: '100%', marginBottom: '20px' }}
                        name='given_name'
                        label='Last Name'
                        variant='outlined'
                        {...formik.getFieldProps('given_name')}
                        {...errorHelper(formik, 'given_name')}
                    />
                </Grid>
                <Grid container >
                    <TextField
                        style={{ width: '100%', marginBottom: '20px' }}
                        name='password'
                        label='Password'
                        variant='outlined'
                        type='password'
                        autoComplete='password'
                        {...formik.getFieldProps('password')}
                        {...errorHelper(formik, 'password')}
                    />
                </Grid>


                <Grid container spacing={0} style={{ marginTop: '40px' }} className="mt-5" >
                    <Grid item xs={4}  >
                        <Button disabled={signBtn} variant='contained' type='submit' >Sign up</Button>
                    </Grid>
                    <Grid item xs={8} style={{ fontSize: '0.85rem', paddingLeft: '20px', paddingTop: '10px' }}>
                        Have an account? <Link
                            onClick={() => { clickLogin() }}
                            style={{ cursor: 'pointer' }}>Log in now</Link>
                    </Grid>
                </Grid>
            </div>
        </form>

    )
}

export default SignUp;