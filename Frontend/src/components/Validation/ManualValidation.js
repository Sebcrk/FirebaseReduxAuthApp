import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import LoadingButtonComp from "../../components/UI/LoadingButtonComp";
import InputText from "../../components/UI/InputText";

const ManualValidation = ({ setIsManual, data, setSnackBar }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm();

  const accessRequestHandler = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const finalData = {
        firstName: data.first_name,
        lastName: data.last_name,
        dateOfBirth: new Date(data.date_of_birth),
        id: data.id,
        entrance: data.entrance,
        role: data.role,
        destination: data.destination,
        dateOfEntry: new Date(),
      };

      const docRef = await addDoc(collection(db, "guests"), finalData);

      setSnackBar({
        open: true,
        severity: "success",
        message: "Access granted",
      });
      setIsLoading(false);
      setIsManual(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box
      sx={{ mt: 4 }}
      component="form"
      onSubmit={handleSubmit(accessRequestHandler)}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={4}
        rowSpacing={0.1}
      >
        <Grid xs={12} sm={12} md={6} lg={4}>
          <InputText
            required
            fullWidth
            control={control}
            name="First Name"
            type="text"
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <InputText
            required
            fullWidth
            control={control}
            name="Last Name"
            type="text"
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <InputText
            required
            fullWidth
            control={control}
            name="ID"
            type="number"
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4}>
          <InputText
            required
            fullWidth
            control={control}
            name="Date of birth"
            type="date"
          />
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <InputText
            required
            fullWidth
            control={control}
            name="Role"
            type="text"
          />
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <InputText
            required
            fullWidth
            control={control}
            name="Destination"
            type="text"
          />
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4}>
          <InputText
            required
            fullWidth
            control={control}
            name="Entrance"
            type="number"
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
    </Box>
  );
};

export default ManualValidation;
