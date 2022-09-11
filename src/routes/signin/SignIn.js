import * as React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useForm } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../components/layout/Copyright";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Fingerprint from "@mui/icons-material/Fingerprint";

import InputText from "../../components/UI/InputText";

export default function SignIn() {
  const { handleSubmit, control } = useForm();
  let navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const loginHandler = async (data, event) => {
   try {
    event.preventDefault();
    setIsloading(true);
    console.log("Signing in");
    const loginData = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    navigate("/", { replace: true });
    console.log("Signed in: " + loginData);
    setIsloading(false);
   } 
   catch (error ) {
    alert(error.message)
    setIsloading(false);
   }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(loginHandler)}
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
          <InputText
            control={control}
            name="Password"
            type="password"
            fullWidth
            required
          />
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingIndicator="Loading…"
            fullWidth
            endIcon={<Fingerprint />}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link to="/resetpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
