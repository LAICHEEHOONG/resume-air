
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import accountImage from '../image/account-icon-vector-design-template-260nw-1627077943 copy.png';
import { getResumeData, toHtml } from "../utils/tools";
import { Card, Box, Avatar, Stack, Typography, IconButton, Divider, Chip, Switch } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';




const ResumeForm = () => {
    const [resumeData, setResumeData] = useState('');

    let { id } = useParams();

    useEffect(() => {
        getResumeData(id)
            .then(res => {
                // console.log(res.data);
                if (res.data.education && res.data.employmentHistory) {
                    let convertToHtml = {
                        ...res.data,
                        education: toHtml(res.data.education),
                        employmentHistory: toHtml(res.data.employmentHistory)
                    }
                    setResumeData(convertToHtml)
                } else {
                    setResumeData(res.data);
                }
            })
            .catch(error => console.log(error))
    }, [id])

    return (
        <>
            <main>
                <div className="container py-4">
                    <header className="pb-3 mb-4 border-bottom">

                        <Card>
                            <Box sx={{ p: 2, display: 'flex' }}>
                                <Avatar
                                    className="avatar-resume"
                                    sx={{ width: 100, height: 100 }}
                                    variant="rounded" src={resumeData.image === '' || !resumeData.image ? accountImage : resumeData.image} />
                                <Stack className="stack-resume" spacing={4}>
                                    <Typography variant='h5' fontWeight={700}>{`${resumeData.firstName} ${resumeData.lastName}`}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <LocationOnIcon sx={{ color: 'grey[500]' }} /> {resumeData.city}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>

                        {/* <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                            <img className="photo"
                                src={resumeData.image === '' || !resumeData.image ? accountImage : resumeData.image}
                                alt="" width="72" height="72" />
                            <span className="fs-4 resume-name">{`${resumeData.firstName} ${resumeData.lastName}`}</span>
                        </a> */}
                    </header>

                    <div className="row align-items-md-stretch">
                        <div className="col-md-6 mb-4">
                            <div className="h-100 p-5 text-bg-dark rounded-3">
                                <h2 className="display-5 fw-bold">Details</h2>
                                <p>{resumeData.jobTitle}</p>
                                <p>{resumeData.city}</p>
                                <p>{resumeData.country}</p>
                                <p>{resumeData.phone}</p>
                                <p>{resumeData.email}</p>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="h-100 p-5 bg-light border rounded-3">
                                <h2 className="display-5 fw-bold" >Skills</h2>
                                {
                                    resumeData && resumeData.skill ? resumeData.skill.map((s, i) => <p key={`${s}${i}`}>{s}</p>) : null
                                }
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="h-100 p-5 bg-light border rounded-3">
                                <h2 className="display-5 fw-bold">Employment History</h2>
                                <div dangerouslySetInnerHTML={{ __html: resumeData.employmentHistory }} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="h-100 p-5 text-bg-dark rounded-3">
                                <h2 className="display-5 fw-bold">Education</h2>
                                <div dangerouslySetInnerHTML={{ __html: resumeData.education }} />
                            </div>
                        </div>
                    </div>

                    <footer className="pt-3 mt-4 text-muted border-top" style={{ textAlign: 'center' }}>
                        <p className="mb-3 text-muted">&copy; Resume Air</p>
                    </footer>
                </div>
            </main>
        </>
    )

}

export default ResumeForm;
