import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, FormHelperText, Paper, InputBase, IconButton, Chip, TextareaAutosize } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { setImage } from '../store/actions/users_actions';
import { useSelector } from 'react-redux';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { formValuesEdit, validationEdit, errorHelper, updateEditValue } from "../utils/signup_validation_schema";
import accountImage from '../image/account-icon-vector-design-template-260nw-1627077943 copy.png';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { getAuthHeader } from '../utils/tools';
import Loader from "../utils/loader";
import { useNavigate } from "react-router-dom";
import { getEditId } from "../store/actions";
import { getEditIdFn } from "../utils/signup_validation_schema";

const EditPage = () => {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userEmail = useSelector(state => state.users.data.email);
    const imageUrl = useSelector(state => state.users.data.image);
    const loginStatus = useSelector(state => state.users.auth);

    const skillsValue = useRef('');
    const getImage = () => {
        setLoading(true)
        axios.get('api/edit/update_image', getAuthHeader())
            .then(res => {
                let url = res.data.image
                // console.log(url)
                dispatch(setImage(url));
            })
            .then(res => {
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValuesEdit,
        validationSchema: validationEdit,
        onSubmit: async (values, { resetForm }) => {
            // console.log(values)
            let editData = { ...values, userEmail };
            // console.log(editData)
            try {
                await axios.post('api/edit/save', { editData }, getAuthHeader());
                // console.log(values)
                if (values.image !== '') {

                    let formData = new FormData();
                    formData.append('file', values.image);
                    setLoading(true);
                    const imageUpload = await axios.post('/api/files/image_upload', formData, {
                        header: { 'content-type': 'multipart/form-data' }
                    });

                    editData = { ...editData, image: imageUpload.data.url }
                    await axios.post('api/edit/save', { editData }, getAuthHeader());
                    // const uploadImageToSever = await axios.post('api/edit/update_image', 
                    // { image: imageUpload.data.url, userEmail }, getAuthHeader());
                    setLoading(false);

                }
                getImage()
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })

    useEffect(() => {
        updateEditValue();
        // setTimeout(() => {
        //     clickEdit()
        // }, 2000)
    }, [])

    useEffect(() => {
        getImage()
    }, [])

    useEffect(() => {

        getEditIdFn()
            .then(res => {
                if (res.data) {
                    dispatch(getEditId(res.data._id));
                }
                // console.log(res.data._id);
            })
            .catch(error => console.log(error))
    }, [dispatch])

    useEffect(() => {
        // console.log(loginStatus);
        if (!loginStatus) {
            navigate('/')
        }
    }, [loginStatus, navigate])

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-4">
                            <h4 className="">Personal Details</h4>
                        </div>
                        <div className="col-4">
                            {
                                loading ?
                                    <Loader /> :
                                    <img className="photo" src={`${imageUrl === '' || !imageUrl ? accountImage : imageUrl}`} alt="" width="72" height="72" />
                            }
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='jobTitle'
                                label='Wanted Job Title'
                                variant='outlined'
                                {...formik.getFieldProps('jobTitle')}
                                {...errorHelper(formik, 'jobTitle')}
                            />
                        </div>
                        <div className="col-4 image-upload">
                            <label htmlFor="formFile" className="form-label image-label h4">Upload Image</label>
                            <input className="form-control" type="file" id="file" name="file"
                                onChange={(event) => {
                                    formik.setFieldValue('image', event.target.files[0])
                                }}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-4">
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='firstName'
                                label='First Name'
                                variant='outlined'
                                {...formik.getFieldProps('firstName')}
                                {...errorHelper(formik, 'firstName')}
                            />
                        </div>
                        <div className="col-4">
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='lastName'
                                label='Last Name'
                                variant='outlined'
                                {...formik.getFieldProps('lastName')}
                                {...errorHelper(formik, 'lastName')}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-4">
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='email'
                                label='Email'
                                variant='outlined'
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                        </div>
                        <div className="col-4">
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='phone'
                                label='Phone'
                                variant='outlined'
                                {...formik.getFieldProps('phone')}
                                {...errorHelper(formik, 'phone')}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='country'
                                label='Country'
                                variant='outlined'
                                {...formik.getFieldProps('country')}
                                {...errorHelper(formik, 'country')}
                            />
                        </div>
                        <div className="col-4">
                            <TextField
                                style={{ width: '100%', marginBottom: '20px' }}
                                name='city'
                                label='City'
                                variant='outlined'
                                {...formik.getFieldProps('city')}
                                {...errorHelper(formik, 'city')}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <h4 className="mb-3">Skill</h4>
                        </div>
                        <div className="col-4">

                        </div>
                    </div>
                    <div className="row justify-content-center skill-input">
                        <div className="col-8">
                            <FormikProvider value={formik}>
                                <FieldArray
                                    name='skill'
                                    render={arrayhelpers => (
                                        <div>
                                            <Paper className="actors_form">
                                                <InputBase
                                                    inputRef={skillsValue}
                                                    className="input"
                                                    placeholder="Add skill name here"
                                                />
                                                <IconButton
                                                    onClick={() => {
                                                        if (skillsValue.current.value !== '') {
                                                            arrayhelpers.push(skillsValue.current.value);
                                                            skillsValue.current.value = ''
                                                        } else {
                                                            // console.log('empty')
                                                        }

                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Paper>
                                            {
                                                formik.errors.skill && formik.touched.skill ?
                                                    <FormHelperText error={true}>
                                                        {formik.errors.skill}
                                                    </FormHelperText>
                                                    : null
                                            }
                                            <div className="chip_container">
                                                {
                                                    formik.values.skill ?
                                                        formik.values.skill.map((skills, index) => (
                                                            <div key={`${skills}${index}`}>
                                                                <Chip
                                                                    className="m-1"
                                                                    label={`${skills}`}
                                                                    color='primary'
                                                                    onDelete={() => arrayhelpers.remove(index)}
                                                                />
                                                            </div>
                                                        ))
                                                        : null

                                                }
                                            </div>
                                        </div>
                                    )}
                                />
                            </FormikProvider>
                        </div>

                    </div>
                    <div className="row justify-content-center text-area-content">
                        <div className="col-4">
                            <h4 className="mb-3 ">Employment History</h4>
                        </div>
                        <div className="col-4 ">
                            <h4 className="mb-3">Education</h4>
                        </div>
                    </div>
                    <div className="row justify-content-center ">

                        <div className="col-4">
                            <label htmlFor="formFile" className="form-label text-area-title h4">Employment History</label>

                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Employment History"
                                style={{ width: '100%' }}
                                {...formik.getFieldProps('employmentHistory')}
                            // {...errorHelper(formik, 'employmentHistory')}
                            />
                            {
                                formik.errors.employmentHistory && formik.touched.employmentHistory ?
                                    <FormHelperText error={true}>
                                        {formik.errors.employmentHistory}
                                    </FormHelperText>
                                    : null
                            }
                        </div>
                        <div className="col-4">
                            <label htmlFor="formFile" className="form-label text-area-title h4">Education</label>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Education"
                                style={{ width: '100%' }}
                                {...formik.getFieldProps('education')}
                            // {...errorHelper(formik, 'education')}
                            />
                            {
                                formik.errors.education && formik.touched.education ?
                                    <FormHelperText error={true}>
                                        {formik.errors.education}
                                    </FormHelperText>
                                    : null
                            }
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-8" >
                            <Button className="edit-button mt-3" variant='contained' type='submit' >Edit</Button>
                        </div>
                    </div>



                    <div style={{ textAlign: 'center' }}>
                        <p className="mt-5 mb-3 text-muted">&copy; Resume Air</p>
                    </div>
                </div>
            </Form>
            {/* <div class="flex-container">
                <div class="flex-item-left">1</div>
                <div class="flex-item-right">2</div>
            </div> */}


        </>
    )
}

export default EditPage;