import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import LoadingButtonComp from "../../components/UI/LoadingButtonComp";
import InputText from "../../components/UI/InputText";

function AutoValidation({ setIsAutomatic, data, setSnackBar }) {
  const [isLoading, setIsLoading] = useState(true);
  const { handleSubmit, control } = useForm();

  useEffect(() => {    
    setIsLoading(false)
  }, [])
  const accessRequestHandler = async (data, event) => {
    event.preventDefault();
    setIsLoading(true)
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

      // Delete from virtual queue
      const res = await fetch(`http://localhost:3001/projects/${data.id}`, {
        method: "DELETE",
      });
      setSnackBar({open: true, severity: "success", message: "Access granted"})
      setIsLoading(false)
      setIsAutomatic(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Box
        sx={{ mt: 4 }}
        component="form"
        onSubmit={handleSubmit(accessRequestHandler)}
      >
        {isLoading && <CircularProgress />}
        {!isLoading && (
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
                defaultValue={data.firstName}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={4}>
              <InputText
                required
                fullWidth
                control={control}
                name="Last Name"
                type="text"
                defaultValue={data.lastName}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={4}>
              <InputText
                required
                fullWidth
                control={control}
                name="ID"
                type="number"
                defaultValue={data.id}
              />
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={4}>
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
