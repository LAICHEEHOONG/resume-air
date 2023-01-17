import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { homeTitle, signUpControl, alertReset } from '../store/actions/page_actions';
import { loginUser } from '../store/actions/users_actions';
import { TextField, Button, Grid, Link } from '@mui/material';
import { useFormik } from 'formik';
import { formValuesLogin, validationLogin, errorHelper } from '../utils/signup_validation_schema';



const Login = () => {

    const dispatch = useDispatch();
    const [nextBtn, setNextBtn] = useState(true);

    const formik = useFormik({
        initialValues: formValuesLogin,
        validationSchema: validationLogin,
        handleChange: () => {
            console.log(formik.values.email)
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(loginUser(values));
            dispatch(alertReset());
        }
    })

    const clickSignUp = () => {
        dispatch(signUpControl(true))
    }

    const checkEmailValue = useCallback(() => {
        let emailValue = formik.values;
        // console.log(emailValue)
        if (emailValue.email !== '') {
            setNextBtn(false)
        }
    }, [formik.values])

    useEffect(() => {
        dispatch(homeTitle('Login to your account'))
    }, [dispatch])

    useEffect(() => {
        setInterval(() => {
            checkEmailValue()
        }, 2000)
    }, [checkEmailValue])

    return (
        <form onSubmit={formik.handleSubmit}>
            <div id='form-width' className='form-width'>
                <Grid container >
                    <TextField
                        style={{ width: '100%', marginBottom: '20px' }}
                        name='email'
                        label='Email'
                        variant='outlined'
                        // autoComplete='email'
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik, 'email')}
                    />
                </Grid>

                {
                    !nextBtn ?
                        <Grid container >
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='password'
                                label='Password'
                                variant='outlined'
                                autoComplete='password'
                                type='password'
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}

                            />
                        </Grid>
                        : null
                }

                <Grid container spacing={0} style={{ marginTop: '40px' }} className="mt-5" >
                    <Grid item xs={2.5}  >
                        <Button id='next' variant='contained' disabled={nextBtn} type='submit'>Login</Button>
                    </Grid>
                    <Grid item xs={9.5} style={{ fontSize: '0.85rem', paddingLeft: '30px', paddingTop: '10px' }}>
                        Don't have an account? <Link style={{ cursor: 'pointer' }}
                            onClick={() => { clickSignUp() }}>Sign up</Link>
                    </Grid>
                </Grid>
            </div>
        </form>
    )
}







export default Login;