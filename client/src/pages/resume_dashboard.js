import React, {useEffect} from "react";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const ResumeDasboard = () => {
    let authStatus = useSelector(state => state.users.auth);
    let navigate = useNavigate();

    useEffect(() => {
        if(!authStatus) {
            navigate('/', {replace: true})
        }
    }, [authStatus, navigate]);

    return (
        <h1>ResumeDasboard</h1>
    )
}

export default ResumeDasboard;