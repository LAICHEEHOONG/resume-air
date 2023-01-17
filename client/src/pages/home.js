import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Wallpaper from '../components/wallpaper';
import Auth from '../components/auth';
import { Grid } from '@mui/material';

const Home = () => {

    const [homeWidth, setHomeWidth] = useState(1000)
    const authStatus = useSelector(state => state.users.auth);
    let navigate = useNavigate();

    const checkBodyWidth = useCallback(() => {
        let width = document.querySelector('body').offsetWidth;
        setHomeWidth(width);
        // console.log(width)
    }, [])

    useEffect(() => {
        if (authStatus) {
            navigate('/edit', { replace: true })
        } else {
            navigate('/', { replace: true })
        }

    }, [authStatus, navigate])

    useEffect(() => {
        setInterval(() => {
            checkBodyWidth();
        }, 1000)
    }, [checkBodyWidth])

    return (
        <>

            <Grid container spacing={0} className='home-page'>
                {
                    homeWidth < 1000 ?
                        <Auth />
                        :
                        <>
                            <Grid item xs={3} >
                                <Auth />
                            </Grid>
                            <Grid item xs={9}>
                                <Wallpaper />
                            </Grid>
                        </>
                }
            </Grid>
        </>
    )
}

export default Home;
