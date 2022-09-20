import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Snackbar from "@mui/material/Snackbar";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import KeyboardIcon from "@mui/icons-material/Keyboard";

import AlertComponent from "../components/UI/AlertComponent";
import BasePage from "../components/UI/Wrappers/BasePage";
import ManualValidation from "../components/Validation/ManualValidation";
import AutoValidation from "../components/Validation/AutoValidation";

const baseData = {
  color: "success",
  Icon: VerifiedUserIcon,
  title: "Data Validation",
};

function Validation() {
  const occupancy = useSelector((state) => state.guestInfo.occupancy);
  const maxOccupancy = useSelector((state) => state.guestInfo.maxOccupancy);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [data, setData] = useState();
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const autoValidationHandler = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/projects");
      if (res.status === 205) {
        setSnackBar({
          open: true,
          message: "Virtual queue is empty",
          severity: "info",
        });
      } else {
        const resData = await res.json();
        setData(resData);
        setIsAutomatic(true);
      }
    } catch (error) {
      setSnackBar({
        open: true,
        message: error.message,
        severity: "error",
      });
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const manualValidationHandler = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/manualValidation");
      if (res.status === 205) {
        setSnackBar({
          open: true,
          message: "Virtual queue is empty",
          severity: "info",
        });
        setIsManual(true);
      } else {
        const resData = await res.json();
        setData(resData);
        setIsManual(true);
      }
    } catch (error) {
      setSnackBar({
        open: true,
        message: error.message + ". Please enter data manually.",
        severity: "error",
      });
      setIsManual(true);
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const snackBarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ open: false });
  };

  return (
    <BasePage
      color={baseData.color}
      Icon={baseData.Icon}
      title={baseData.title}
      subtitle={isAutomatic ? "Auto" : isManual && "Manual"}
      maxWidth="sm"
    >
      {occupancy >= maxOccupancy && (
        <Typography fontSize={50} align="center">
          MAXIMUM OCCUPANCY REACHED. NO MORE PEOPLE ALLOWED.
        </Typography>
      )}

      {occupancy < maxOccupancy && !isAutomatic && !isManual && (
        <Box component="div" sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
          {isLoading && <LinearProgress />}
          <Grid sx={{ mt: 2 }} container spacing={4} rowSpacing={4}>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Card
                elevation={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: 320,
                  borderRadius: "20px",
                }}
              >
                <CardActionArea disabled={isLoading} onClick={autoValidationHandler}>
                  <CardMedia sx={{ height: "70%" }}>
                    <CachedIcon
                      sx={{
                        height: 250,
                        width: "100%",
                        color: "primary.light",
                      }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                    >
                      Get latest access
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Card
                elevation={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: 320,
                  borderRadius: "20px",
                }}
              >
                <CardActionArea disabled={isLoading} onClick={manualValidationHandler}>
                  <CardMedia sx={{ height: "70%" }}>
                    <KeyboardIcon
                      sx={{
                        height: 250,
                        width: "100%",
                        color: "primary.dark",
                      }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                    >
                      Manual access
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {isAutomatic && occupancy < maxOccupancy && (
        <AutoValidation
          setSnackBar={setSnackBar}
          data={data}
          setIsAutomatic={setIsAutomatic}
        />
      )}
      {isManual && occupancy < maxOccupancy && (
        <ManualValidation
          setSnackBar={setSnackBar}
          data={data}
          setIsManual={setIsManual}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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

export default Validation;
