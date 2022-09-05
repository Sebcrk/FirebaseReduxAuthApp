import React from "react";
import classes from "./Layout.module.css";
import DrawerComponent from "./Drawer";
import TemporaryDrawer from "./TempDrawer";
import MainNavigation from "./MainNavigation";
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const Layout = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.token);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          secondary: {
            main: "#121212"
          }
        },
      }),
    [prefersDarkMode]
  );

  const toggleDrawer = (openValue) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(openValue);
  };

  const isAuth = isAuthenticated && accessToken;
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar color={isAuth ? "primary" : "secondary"} >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              disabled={!isAuth}
              onClick={toggleDrawer(true)}
              sx={{
                marginRight: "36px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Redux Auth App
            </Typography>
            <MainNavigation />
          </Toolbar>
        </AppBar>
        {isAuth && (
          <TemporaryDrawer isOpen={openDrawer} toggleDrawer={toggleDrawer} />
          // <DrawerComponent onOpen={open} onToggleDrawer={toggleDrawer2} />
        )}

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <main className={classes.main}>{props.children}</main>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
