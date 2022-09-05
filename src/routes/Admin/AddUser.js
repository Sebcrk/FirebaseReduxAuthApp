import { useState } from "react";
import { useForm } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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

export default function AddUser() {
  const [isLoading, setIsloading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const { handleSubmit, control } = useForm();

  const addUserHandler = (data, event) => {
    event.preventDefault();
    setIsloading(true);

    console.log({...data, isAdmin: admin});
    setIsloading(false);
    event.target.reset();
  };

  const checkHandler = (event) => {
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
          <LockOutlinedIcon />
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
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin}
                    onChange={checkHandler}
                    color="success"
                  />
                }
                label="Make Admin"
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingIndicator="Creating new user.."
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create new user
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
