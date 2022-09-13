import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { functions, db } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import LoadingButtonComp from "../../components/UI/LoadingButton";
import InputText from "../../components/UI/InputText";
import BasePage from "../../components/UI/Wrappers/BasePage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const baseData = {
  color: "warning.light",
  hover: "warning.dark",
  Icon: PersonAddDisabledIcon,
  title: "Delete User",
  subtitle: "Delete user by ID",
}

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
      .then(() => {
        setSnackBar({
          open: true,
          message: `User ${data.id} has been deleted.`,
          severity: "success",
        });
        resetForm();
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error.message);
        setSnackBar({ open: true, message: error.message, severity: "error" });
      });
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
        <LoadingButtonComp
        loading={isLoading}
        variant="contained"
        color={baseData.color}
        hover={baseData.hover}
      >
        Search
      </LoadingButtonComp>
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
    </BasePage>
  );
}

export default DeleteUser;
