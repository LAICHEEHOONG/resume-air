import axios from 'axios';
import cookie from 'react-cookies';

export const getTokenCookie = () => cookie.load('resume-air-token');
export const getAuthHeader = () => ({ headers: { 'resume-air-token': getTokenCookie() } });

export const removeTokenCookie = () => cookie.remove('resume-air-token', { path: '/' });

export const getUserProps = (user) => {
    return {
        _id: user.email,
        email: user.email,
        family_name: user.family_name,
        given_name: user.given_name,
    }
}

export const getEditProps = (data) => {
    return {
        image: data.image,
        jobTitle: data.jobTitle,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        employmentHistory: data.employmentHistory,
        education: data.education,
        skill: data.skill
    }
}

export const getResumeData = async(id) => {
    try {   
        const resumeData = await axios.post('/api/edit/resume_data', {id});
        return resumeData;
    } catch(error) {
        console.log(error);
        return;
    }
}

export const toHtml = (text) => {
    const afterAddParagraph = [];
    const removeN = text.split('\n'); // array
    const addParagraph = (arr) => {
        arr.forEach(element => {
            afterAddParagraph.push(`<p>${element}</p>`)
        });
    }
    addParagraph(removeN);

    // const htmlToText = afterAddParagraph.toString();
    const htmlToText = afterAddParagraph.join('');
    // console.log(htmlToText);
    return htmlToText;

}
// axios.post('/api/edit/resume_data', {id})
// .then(res => console.log(res.data))
// .catch(error => console.log(error))