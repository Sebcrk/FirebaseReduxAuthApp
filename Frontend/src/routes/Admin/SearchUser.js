import React, { useState } from "react";
import { useForm } from "react-hook-form";


import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FaceIcon from '@mui/icons-material/Face';
import Snackbar from "@mui/material/Snackbar";

import AlertComponent from "../../components/UI/AlertComponent";
import TableComp from "../../components/UI/TableComp";
import LoadingButtonComp from "../../components/UI/LoadingButtonComp";
import {compoundSearchDB} from "../../utils/searchDB";
import InputText from "../../components/UI/InputText";
import BasePage from "../../components/UI/Wrappers/BasePage";



const baseData = {
  color: "primary",
  Icon: FaceIcon,
  title: "Search User",
  subtitle: "Search user by ID, name or last name",
};


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

      const queryResultsArray = await compoundSearchDB(data.parameter, "users");

      const resultsArray = [];
      if (queryResultsArray === undefined || queryResultsArray.length === 0) {
        setIsloading(false);
        setResults();
        setSnackBar({
          open: true,
          message: "No user found.",
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
    <BasePage
    color={baseData.color}
    Icon={baseData.Icon}
    title={baseData.title}
    subtitle={baseData.subtitle}
  >
    <Box
      component="form"
      onSubmit={handleSubmit(searchUserHandler)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={1} rowSpacing={0.1}>
        <Grid item xs={12} sm={12}>
          <InputText control={control} name="Parameter" fullWidth required />
        </Grid>
      </Grid>
      <LoadingButtonComp
        loading={isLoading}
        variant="contained"
        color={baseData.color}
      >
        Search
      </LoadingButtonComp>
    </Box>
    {results && <TableComp type="SearchUser" dataInfo={results} />}
    <Snackbar
      open={snackBar.open}
      autoHideDuration={2000}
      onClose={snackBarCloseHandler}
    >
      <AlertComponent
        onClose={snackBarCloseHandler}
        severity={snackBar.severity}
        sx={{ width: "100%" }}
      >
        {snackBar.message}
      </AlertComponent>
    </Snackbar>
  </BasePage>
  );
}

export default SearchUser;
