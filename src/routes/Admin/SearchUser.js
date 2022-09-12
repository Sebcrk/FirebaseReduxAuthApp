import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
import TableComp from "../../components/UI/TableComp";

import searchDB from "../../utils.js/searchDB";
import InputText from "../../components/UI/InputText";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SearchUser() {
  const [isLoading, setIsloading] = useState(false);
  const [results, setResults] = useState();
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
    try {
      event.preventDefault();
      setIsloading(true);

      const queryResultsArray = await searchDB(data.parameter, "users");

      const resultsArray = [];
      if (queryResultsArray === undefined || queryResultsArray.length === 0) {
        setIsloading(false);
        setResults();
        setSnackBar({
          open: true,
          message: "No user found",
          severity: "error",
        });
      } else {
        queryResultsArray.forEach((doc) => {
          resultsArray.push(doc.data());
          resetForm();
        });
        setResults(resultsArray);
      }
    } catch (error) {
      console.log(error.message);
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
          Search User
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Search user by ID, name or last name
        </Typography>
        <Box
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
      {results && <TableComp type="SearchUser" dataInfo={results} />}
      <Snackbar
        open={snackBar.open}
        autoHideDuration={2000}
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
