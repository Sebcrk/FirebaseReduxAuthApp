import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Button } from "@mui/material";
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
  const [isLoading, setIsloading] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });



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
      subtitle={baseData.subtitle}
    >
      {!isAutomatic && !isManual && (
        <Box component="div" sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
          <Grid container spacing={4} rowSpacing={1}>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Card
                elevation={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: 320,
                }}
              >
                <CardActionArea onClick={() => setIsAutomatic(true)}>
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
                }}
              >
                <CardActionArea onClick={() => setIsManual(true)}>
                  <CardMedia sx={{ height: "70%" }}>
                    <KeyboardIcon
                      sx={{ height: 250, width: "100%", color: "primary.dark" }}
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
      {isAutomatic && <AutoValidation setIsAutomatic={setIsAutomatic} />}
      {isManual && <ManualValidation />}
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
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
