import { useState } from 'react';
import classes from './LoadingSpinner.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const LoadingSpinner = () => {



  return (
    <Backdrop
    sx={{  zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={true}
  >
    <CircularProgress />
  </Backdrop>
  )
}

export default LoadingSpinner;
