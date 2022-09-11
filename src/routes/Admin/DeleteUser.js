import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { functions, db } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import InputText from "../../components/UI/InputText";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteUser() {
  const [isLoading, setIsloading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { handleSubmit, control, reset } = useForm();


  const resetForm = () => {
    reset();
    setIsloading(false);
  };

  const snackBarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ open: false });
  };

  const deleteUserHandler = (data, event) => {
    event.preventDefault();
    setIsloading(true);

    // Cloud Function
    const deleteUser = httpsCallable(functions, "deleteUser");
    deleteUser({ idToDelete: data.id })
      .then((result) => {
        setSnackBar({
          open: true,
          message: `User ${data.id} has been deleted`,
          severity: "success",
        });
        resetForm();
        console.log(result.data);
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error.message);
        setSnackBar({ open: true, message: error.message, severity: "error" });
      });
  };
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: (theme) => theme.palette.warning.main  }}>
          <PersonAddDisabledIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Delete user
        </Typography>

        {/* CHANGE THE NOVALIDATE PROPERTY */}
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(deleteUserHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={1} rowSpacing={0.1}>
            <Grid item xs={12} sm={12}>
              <InputText
                control={control}
                name="ID"
                type="number"
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: (theme) => theme.palette.warning.light,
              "&:hover": { bgcolor: (theme) => theme.palette.warning.main },
            }}
          >
            Delete user
          </LoadingButton>
        </Box>
      </Box>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={snackBarCloseHandler}
      >
        <Alert
          onClose={snackBarCloseHandler}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DeleteUser;
