import React from "react";
import { Form, Button } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { FormHelperText } from '@mui/material';

const TestUpload = () => {

    const formik = useFormik({
        initialValues: { archivo: '' },
        validationSchema: Yup.object({
            archivo: Yup.mixed().required('A file is required')
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('file', values.archivo);
            // console.log(formData); // === {}

            //multer
            // axios.post('/api/files/multerupload', formData, {
            //     header: {'content-type': 'multipart/form-data'}
            // }).then(res => {
            //     console.log(res)
            // }).catch(error => {console.log(error)});

            // cloudinary
            axios.post('/api/files/testupload2', formData, {
                header: { 'content-type': 'multipart/form-data' }
            }).then(res => {
                console.log(res)
            }).catch(error => { console.log(error) });


        }
    })


    const errorHelper = (formik, value) => {
        return (
            {
                error: formik.errors[value] && formik.touched[value] ? true : false,
                helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
            }
        )
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    {/* <Form.File
                        id='file'
                        name='file'
                        label='Example file input'
                        onChange={(event) => {
                            formik.setFieldValue('archivo', event.target.files[0])
                        }}
                    /> */}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Example file input</Form.Label>
                        <Form.Control type="file"
                            onChange={(event) => {
                                formik.setFieldValue('archivo', event.target.files[0])
                            }}
                        />
                    </Form.Group>
                    {
                        formik.errors.archivo && formik.touched.archivo ?
                            <FormHelperText error={true}>
                                {formik.errors.archivo}
                            </FormHelperText>
                            : null
                    }
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>

        </>
    )
}

export default TestUpload;