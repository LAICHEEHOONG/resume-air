import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import DehazeIcon from '@mui/icons-material/Dehaze';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LinkIcon from '@mui/icons-material/Link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Alert } from "@mui/material";
import { signOut } from "../../store/actions/users_actions";
import { removeTokenCookie } from "../../utils/tools";
import { getEditId } from "../../store/actions/edit_id_actions";
import { getEditIdFn } from "../../utils/signup_validation_schema";
import copy from 'copy-to-clipboard';



const SideDrawer = () => {

    const [alertControl, setAlertControl] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    const loginStatus = useSelector(state => state.users.auth);
    const editId = useSelector(state => state.editId._id);


    const userSignOut = () => {
        dispatch(signOut());
        removeTokenCookie();
        navigate('/', { replace: true })
    }

    const linkToResumePage = (id) => {
        navigate(`/resume/${id}`);
        setDrawer(false);
    }

    const copyResumeUrl = (id) => {

        // let locationPathName = location.pathname;
        // let currentPathName = `/resume/${id}`;

        // if(locationPathName === currentPathName) {
        //     setShare(false);
        // } else {
        //     setShare(true)
        // }
        let urlForCopy = '';

        if (!id) {
            const urtHome = window.location.origin;
            let locationPathName = location.pathname;
            const resumeUrl = `${urtHome}${locationPathName}`;
            // console.log(resumeUrl);
            urlForCopy = resumeUrl;
        } else {
            const urtHome = window.location.origin;
            const resumeUrl = `${urtHome}/resume/${id}`;
            // console.log(resumeUrl);
            urlForCopy = resumeUrl;
        }

        // console.log(urlForCopy);
        // navigator.clipboard.writeText(urlForCopy);
        copy(urlForCopy);

        // navigator.clipboard
        // .writeText(urlForCopy)
        // .then(() => {
        //     setAlertControl(true);

        //     setTimeout(() => {
        //         setAlertControl(false);
        //     }, 4000);
        // })
        // .catch(() => {
        //   alert("something went wrong");
        // });

        setAlertControl(true);

        setTimeout(() => {
            setAlertControl(false);
        }, 4000);

        // console.log(resumeUrl);
        // console.log(location)
    }

    const linkToEditPage = () => {
        navigate('/edit');
        setDrawer(false);
    }

    const linkToHomePage = () => {
        navigate('/');
        setDrawer(false);
    }

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


    return (
        <>
            <DehazeIcon className='drawer_btn' onClick={() => setDrawer(true)} />

            <Drawer
                anchor={'right'}
                PaperProps={{
                    sx: { width: "250px" },
                }}
                open={drawer}
                onClose={() => setDrawer(false)} >
                <List>
                    <ListItem button disabled={!loginStatus} to='/' onClick={() => userSignOut()}>
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary='Sign out' />
                    </ListItem>
                </List>
                <List>
                    <ListItem button disabled={!loginStatus} onClick={() => linkToResumePage(editId)}>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary='Resume' />
                    </ListItem>
                </List>
                <List>
                    <ListItem button disabled={false} onClick={() => copyResumeUrl(editId)}>
                        <ListItemIcon>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText primary='Share' />
                    </ListItem>
                    {
                        alertControl ?
                            <Alert severity="success">
                                <strong>Resume Link Copied</strong>
                            </Alert>
                            : null
                    }

                </List>
                <List>
                    <ListItem button disabled={!loginStatus} onClick={() => linkToEditPage()}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary='Edit' />
                    </ListItem>
                </List>
                <List>
                    <ListItem button disabled={loginStatus} onClick={() => linkToHomePage()}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </List>
            </Drawer>

        </>
    )
};

export default SideDrawer;