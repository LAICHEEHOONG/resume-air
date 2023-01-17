import * as Yup from 'yup';
import axios from "axios";
import {getEditProps, getAuthHeader} from './tools';

export const formValuesSignUp = {
    email: '',
    family_name: '',
    given_name: '',
    password: '',
};

export const validationSignUp = () => (
    Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('This is not a valid email')
            .max(500, `Sorry it's 500 max`),
        family_name: Yup.string()
            .required('First name is required')
            .max(500, `Sorry it's 500 max`),
        given_name: Yup.string()
            .max(500, `Sorry it's 500 max`),
        password: Yup.string()
            .required('Password is required')
            .max(500, `Sorry it's 500 max`),
    })
);

export const formValuesLogin = {
    email: '',
    password: ''
};

export const validationLogin = () => (
    Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('This is not a valid email')
            .max(500, `Sorry it's 500 max`),
        password: Yup.string()
            .required('Password is required')
            .max(500, `Sorry it's 500 max`),
    })
);

export let formValuesEdit = {
    image: '',
    jobTitle: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    employmentHistory: '',
    education: '',
    skill: []
};

export const validationEdit = () => (
    Yup.object({
        image: Yup.mixed(),
        jobTitle: Yup.string()
            .required('Job title is required')
            .max(1000, `Sorry it's 1000 max`),
        firstName: Yup.string()
            .required('First name is required')
            .max(1000, `Sorry it's 1000 max`),
        lastName: Yup.string()
            .required('Last name is required')
            .max(1000, `Sorry it's 1000 max`),
        email: Yup.string()
            .required('Email is required')
            .email('This is not a valid email')
            .max(1000, `Sorry it's 1000 max`),
        phone: Yup.number()
            .required('Phone is required'),
        country: Yup.string()
            .required('Country is required'),
        city: Yup.string()
            .required('City is required')
            .max(500, `Sorry it's 500 max`),
        employmentHistory: Yup.string()
            .required('Employment history is required')
            .min(20, 'That is it? ...write some more')
            .max(10000, `Sorry it's too much`),
        education: Yup.string()
            .required('Education is required')
            .min(20, 'That is it? ...write some more')
            .max(10000, `Sorry it's too much`),
        skill: Yup.array()
            .required('Must have skill')
            .min(2, 'Minimum is 2'),

    })
);


export const errorHelper = (formik, value) => {
    return (
        {
            error: formik.errors[value] && formik.touched[value] ? true : false,
            helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
        }
    )

}

export const updateEditValue = async() => {
    try {

        formValuesEdit = {
            image: '',
            jobTitle: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            employmentHistory: '',
            education: '',
            skill: []
        };

        const editData = await axios.get('api/edit/save',getAuthHeader());
        // console.log(editData.data._id);
        if(!editData.data.email) {
            // console.log('no edit data')
        } else {
            const filterEditData = getEditProps(editData.data);
            // console.log(filterEditData);
            formValuesEdit = {
                ...formValuesEdit,
                ...filterEditData
            }
        }
     
        // console.log(formValuesEdit);
    } catch(error) {
        console.log(error);
    }
}

export const getEditIdFn = async() => {
    try {
        const editData = await axios.get('api/edit/save',getAuthHeader());
        // console.log(editData.data._id);
        return editData
    } catch(error) {
        console.log(error);
        return null;
    }
}


            // const test = await axios.get('api/edit/save',getAuthHeader());
            // console.log(test.data)

//  自动 更新 formValuesEdit 资料

// const autoUpdateEditValue = () => {
//     setInterval(() => {
//         formValuesEdit = {
//             ...formValuesEdit,
//             jobTitle: 'Stock keeper'
//         }
//         console.log('reset')
//     }, 3000)
// }

// autoUpdateEditValue()
