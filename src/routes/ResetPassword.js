import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { auth } from "../firebase";

import InputText from "../components/UI/InputText";

function ResetPassword() {
  const { handleSubmit, control } = useForm();
  let navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const resetPasswordHandler = async (data, event) => {
    event.preventDefault();
    setIsloading(true);
    await sendPasswordResetEmail(auth, data.email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("Password recovery email sent to: " + data.email);
        alert(`Password recovey email sent to: ${data.email}`);
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email": {
            alert("Email address is invalid. Check and try again");
            break;
          }
          case "auth/user-disabled": {
            alert("User related to the email address is disabled");
            break;
          }
          case "auth/user-not-found": {
            alert("Email address does not have a user related");
            break;
          }
          case "auth/too-many-requests": {
            alert("Too many attempts made. Try again later");
            break;
          }
          default:
            alert("Something bad happened");
        }
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
    </Container>
  );
}

export default ResetPassword;
