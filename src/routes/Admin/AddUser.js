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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";

import AlertComponent from "../../components/UI/AlertComponent";
import InputText from "../../components/UI/InputText";
import BasePage from "../../components/UI/Wrappers/BasePage";

const dataArray = [
  { name: "First Name", sm: 6, type: "text" },
  { name: "Last Name", sm: 6, type: "text" },
  { name: "ID", sm: 6, type: "number" },
  { name: "Date of birth", sm: 6, type: "date" },
  // { name: "Gender", sm: 6, type: "select" },
  { name: "Email", sm: 12, type: "email" },
  { name: "Password", sm: 12, type: "password" },
];

const baseData = {
  color: "primary.main",
  Icon: PersonAddIcon,
  title: "Create New User",
};

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

    // Cloud Function
    const createUser = httpsCallable(functions, "createUser");
    createUser({ ...data, isAdmin: admin })
      .then(() => {
        setSnackBar({
          open: true,
          message: `User ${data.email} has been created.`,
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
    <BasePage
      color={baseData.color}
      Icon={baseData.Icon}
      title={baseData.title}
      maxWidth="xs"
    >
      <Box
        component="form"
        onSubmit={handleSubmit(addUserHandler)}
        sx={{ mt: 3 }}
      >
        <Grid
          justifyContent="center"
          alignItems="center"
          container
          spacing={1}
          rowSpacing={0.1}
        >
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
              label="Make Admin"
              control={
                <Checkbox
                  checked={admin}
                  onChange={adminCheckHandler}
                  color="success"
                />
              }
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
      <Snackbar
        open={snackBar.open}
        autoHideDuration={5000}
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
