import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import bikelogo from '../images/bike.svg'

const Banner = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'rgba(66, 245, 179, 0.2)', boxShadow: 'none' }}>
      <Toolbar>
      <img src={bikelogo} alt="Logo" style={{ width: '50px', height: '50px', margin: '16px'}} />
        <Typography variant="h1" style={{ fontSize: '24px', color: 'black', margin: '16px' }} component="div">
          City Bikes
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Banner;
