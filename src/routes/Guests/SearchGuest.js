import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TableComp from "../../components/UI/TableComp";

import LoadingButtonComp from "../../components/UI/LoadingButton";
import searchDB from "../../utils.js/searchDB";
import InputText from "../../components/UI/InputText";
import BasePage from "../../components/UI/Wrappers/BasePage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const baseData = {
  color: "primary.light",
  Icon: RecentActorsIcon,
  title: "Search Guest",
  subtitle: "Search guest by ID, name or last name",
};

function SearchGuest() {
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

  const searchGuestHandler = async (data, event) => {
    try {
      event.preventDefault();
      setIsloading(true);

      const queryResultsArray = await searchDB(data.parameter, "guests");

      const resultsArray = [];
      if (queryResultsArray === undefined || queryResultsArray.length === 0) {
        setIsloading(false);
        setResults();
        setSnackBar({
          open: true,
          message: "No guest entry found.",
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
        onSubmit={handleSubmit(searchGuestHandler)}
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
      {results && <TableComp type="SearchGuest" dataInfo={results} />}
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
    </BasePage>
  );
}

export default SearchGuest;

{
  /* <Box
component="form"
onSubmit={handleSubmit(searchGuestHandler)}
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
{results && <TableComp type="SearchGuest" dataInfo={results} />}
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
</Snackbar> */
}
