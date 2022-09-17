// import React from "react";
// import classes from "./Layout.module.css";
// import Drawer from "../Drawer/Drawer";
// import MainNavigation from "./MainNavigation";
// import { useSelector } from "react-redux";

// import useMediaQuery from "@mui/material/useMediaQuery";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import MenuIcon from "@mui/icons-material/Menu";
// import IconButton from "@mui/material/IconButton";

// const Layout = (props) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const accessToken = useSelector((state) => state.auth.token);
//   const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
//   const [openDrawer, setOpenDrawer] = React.useState(false);

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: prefersDarkMode ? "dark" : "light",
//           secondary: {
//             main: "#121212"
//           }
//         },
//       }),
//     [prefersDarkMode]
//   );

//   const toggleDrawer = (openValue) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setOpenDrawer(openValue);
//   };

//   const isAuth = isAuthenticated && accessToken;
//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar color={isAuth ? "primary" : "secondary"} >
//           <Toolbar
//             sx={{
//               pr: "24px", // keep right padding when drawer closed
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               disabled={!isAuth}
//               onClick={toggleDrawer(true)}
//               sx={{
//                 marginRight: "36px",
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//               sx={{ flexGrow: 1 }}
//             >
//               Redux Auth App
//             </Typography>
//             <MainNavigation />
//           </Toolbar>
//         </AppBar>
//         {isAuth && (
//           <Drawer isOpen={openDrawer} toggleDrawer={toggleDrawer} />

//         )}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             height: "100vh",
//             overflow: "auto",
//           }}
//         >
//           <Toolbar />
//           {props.children}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Layout;

import * as React from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainNavigation from "./MainNavigation";
import { MainListItems, AdminListItems } from "../Drawer/ListItems";

const drawerWidth = 210;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "absolute",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: theme.spacing(9),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Layout(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [open, setOpen] = React.useState(false);
  const isAuth = isAuthenticated && accessToken;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          secondary: {
            main: "#121212",
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 650,
            md: 930,
            lg: 1200,
            xl: 1536,
          },
        },
      }),
    [prefersDarkMode]
  );

  const toggleDrawer = (value) => {
    setOpen(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => toggleDrawer(true)}
              sx={{
                marginRight: "25px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon 
              fontSize="large"/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Firebase Redux Auth App
            </Typography>
            <MainNavigation />
          </Toolbar>
        </AppBar>
        {isAuth && (
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              {open && (
                <IconButton onClick={() => toggleDrawer(false)}>
                  <ChevronLeftIcon />
                </IconButton>
              )}
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems open={open} onToggleDrawer={toggleDrawer}/>
              <Divider sx={{ my: 1 }} />
              {user.isAdmin && <AdminListItems onToggleDrawer={toggleDrawer} open={open} />}
            </List>
          </Drawer>
        )}
        <Box
          component="main"
          sx={{
            ml: 9,
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
