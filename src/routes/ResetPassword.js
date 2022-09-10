import { useState, forwardRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import InputText from "../components/UI/InputText";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function ResetPassword() {
  const { handleSubmit, control } = useForm();
  const [isLoading, setIsloading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });


  const snackBarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ open: false });
  };


  const resetPasswordHandler = async (data, event) => {
    event.preventDefault();
    setIsloading(true);
    await sendPasswordResetEmail(auth, data.email)
      .then(() => {
        // Password reset email sent!
        // ..
        setSnackBar({ open: true, message: "Password recovery email sent to: " + data.email, severity: "success" });
        console.log("Password recovery email sent to: " + data.email);
      })
      .catch((error) => {
        let errorMessage
        switch (error.code) {
          case "auth/invalid-email": {
            errorMessage = "Email address is invalid. Check and try again";
            break;
          }
          case "auth/user-disabled": {
            errorMessage = "User related to the email address is disabled";
            break;
          }
          case "auth/user-not-found": {
            errorMessage = "Email address does not have a user related";
            break;
          }
          case "auth/too-many-requests": {
            errorMessage = "Too many attempts made. Try again later";
            break;
          }
          default:
            errorMessage = "Something bad happened";
        }
        setSnackBar({ open: true, message: errorMessage, severity: "error" });
      });

    setIsloading(false);
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
        <Avatar sx={{ m: 1 }}>
          <ChangeCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Change password
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Type your email address to receive a password recovery email
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(resetPasswordHandler)}
          sx={{ mt: 1 }}
        >
          <InputText
            control={control}
            name="Email"
            type="email"
            autoFocus
            fullWidth
            required
          />
          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            endIcon={<ForwardToInboxIcon />}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loadingPosition="end"
          >
            Send recovery email
          </LoadingButton>
        </Box>
      </Box>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
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

export default ResetPassword;
