import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

import LoadingButtonComp from "../UI/LoadingButtonComp";
import InputText from "../UI/InputText";

function AutoValidation({ setIsAutomatic, data }) {
  const [isLoading, setIsLoading] = useState(true);

  const { handleSubmit, control } = useForm();

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const accessRequestHandler = async (data, event) => {
    event.preventDefault();
    try {
      console.log(data);
      //... Check if access is approved

      // If access is approved

      //If access is NOT approved
      // Delete from virtual queue
      //   const res = await fetch(`http://localhost:3001/projects/${data.id}`, {
      //     method: "DELETE",
      //   });
      //   console.log(res.status);
      setIsAutomatic(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(accessRequestHandler)}>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
            rowSpacing={0.1}
          >
            <Grid xs={12} sm={12} md={6} lg={6}>
              <InputText
                required
                fullWidth
                control={control}
                name="First Name"
                type="text"
                defaultValue={data.firstName}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <InputText
                required
                fullWidth
                control={control}
                name="Last Name"
                type="text"
                defaultValue={data.lastName}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <InputText
                required
                fullWidth
                control={control}
                name="ID"
                type="number"
                defaultValue={data.id}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
            <InputText
                required
                fullWidth
                control={control}
                name="Date of birth"
                type="date"
                defaultValue={data.dateOfBirth.split("T")[0]}
              />
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
            <InputText
                required
                fullWidth
                control={control}
                name="Role"
                type="text"
                defaultValue={data.role}
              />
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
            <InputText
                required
                fullWidth
                control={control}
                name="Destination"
                type="text"
                defaultValue={data.destination}
              />
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
            <InputText
                required
                fullWidth
                control={control}
                name="Entrance"
                type="number"
                defaultValue={data.entrance}
              />
            </Grid>
            <LoadingButtonComp
              loading={isLoading}
              variant="contained"
              color="success"
            >
              Process access request
            </LoadingButtonComp>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default AutoValidation;
