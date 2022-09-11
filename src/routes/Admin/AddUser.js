import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db, functions } from "../../firebase";
import { httpsCallable } from "firebase/functions";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import InputText from "../../components/UI/InputText";

const dataArray = [
  { name: "First Name", sm: 6, type: "text" },
  { name: "Last Name", sm: 6, type: "text" },
  { name: "ID", sm: 6, type: "number" },
  { name: "Date of birth", sm: 6, type: "date" },
  // { name: "Gender", sm: 6, type: "select" },
  { name: "Email", sm: 12, type: "email" },
  { name: "Password", sm: 12, type: "password" },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddUser() {
  const [isLoading, setIsloading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { handleSubmit, control, reset } = useForm();

  const snackBarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ open: false });
  };

  const resetForm = () => {
    reset();
    setAdmin(false);
    setIsloading(false);
  };

  const addUserHandler = (data, event) => {
    event.preventDefault();
    setIsloading(true);

    console.log({ ...data, isAdmin: admin });
    // Cloud Function
    const createUser = httpsCallable(functions, "createUser");
    createUser({ ...data, isAdmin: admin })
      .then(() => {
        setSnackBar({
          open: true,
          message: `User ${data.email} has been created`,
          severity: "success",
        });
        const addUserToDB = httpsCallable(functions, "addUserToDB");
        addUserToDB({ ...data, isAdmin: admin })
          .then(() => {
            setSnackBar({
              open: true,
              message: `User ${data.email} has been added to the database`,
              severity: "success",
            });
            resetForm();
          })
          .catch((error) => {
            setIsloading(false);
            console.log(error.message);
            setSnackBar({
              open: true,
              message: error.message,
              severity: "error",
            });
          });
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error.message);
        setSnackBar({ open: true, message: error.message, severity: "error" });
      });
  };

  const adminCheckHandler = (event) => {
    setAdmin(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New User
        </Typography>

        {/* CHANGE THE NOVALIDATE PROPERTY */}
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(addUserHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={1} rowSpacing={0.1}>
            {dataArray.map((data) => {
              return (
                <Grid key={data.name} item xs={12} sm={data.sm}>
                  <InputText
                    control={control}
                    name={data.name}
                    type={data.type}
                    fullWidth
                    required
                  />
                </Grid>
              );
            })}
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                labelPlacement="top"
                control={
                  <Checkbox
                    checked={admin}
                    onChange={adminCheckHandler}
                    color="success"
                  />
                }
                label="Make Admin"
              />
            </Grid>
            {admin && (
              <Grid item xs={6} sm={6}>
                <InputText
                  control={control}
                  name="Access Level"
                  type="number"
                  required
                  InputProps={{ inputProps: { min: "1", max: "5", step: "1" } }}
                  fullWidth
                  size="small"
                />
              </Grid>
            )}
          </Grid>

          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create new user
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
