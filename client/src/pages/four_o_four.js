import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, Grid } from '@mui/material';

export default function FourOFour() {
    let navigate = useNavigate();

    const backToHome = () => {
        navigate('/', {replace: true})
    }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '75vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" style={{marginTop: '2rem'}} onClick={() => backToHome()}>Back Home</Button>
          </Grid>
          <Grid item xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}