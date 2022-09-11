import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import { collection, doc, getDocs, where, query } from "firebase/firestore";
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

function SearchUser() {
  const [isLoading, setIsloading] = useState(false);
  const [results, setResults] = useState([]);
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

  const searchUserHandler = async (data, event) => {
    event.preventDefault();
    setIsloading(true);
    const parameter = data.parameter;

    const usersRef = collection(db, "users");

    const isFirstNameQuery = getDocs(
      query(usersRef, where("firstName", "==", parameter.toUpperCase()))
    );
    const isLastNameQuery = getDocs(
      query(usersRef, where("lastName", "==", parameter.toUpperCase()))
    );
    const isIDQuery = getDocs(query(usersRef, where("id", "==", parameter)));

    const [isFirstNameSnapShot, isLastNameSnapshot, isIDSnapshot] =
      await Promise.all([isFirstNameQuery, isLastNameQuery, isIDQuery]);

    const isFirstNameArray = isFirstNameSnapShot.docs;
    const isLastNameArray = isLastNameSnapshot.docs;
    const isIDArray = isIDSnapshot.docs;

    const queryResultsArray = isFirstNameArray.concat(
      isLastNameArray,
      isIDArray
    );

    const resultsArray = [];
    if (queryResultsArray.length === 0) {
      setSnackBar({ open: true, message: "No user found", severity: "error" });
    } else {
      queryResultsArray.forEach((doc) => {
        resultsArray.unshift(doc.data());
        resetForm();
      });
      console.log(resultsArray);
    }
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
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <PersonAddDisabledIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Search user
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Search user by ID, name or last name
        </Typography>

        {/* CHANGE THE NOVALIDATE PROPERTY */}
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(searchUserHandler)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={1} rowSpacing={0.1}>
            <Grid item xs={12} sm={12}>
              <InputText
                control={control}
                name="Parameter"
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
              bgcolor: "primary.light",
            }}
          >
            Search
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

export default SearchUser;
