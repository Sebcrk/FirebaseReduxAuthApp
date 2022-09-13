import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import Layout from "./components/layout/Layout";
import RoutesComp from "./Routes";
import Snackbar from "@mui/material/Snackbar";

import AlertComponent from "./components/UI/AlertComponent";
//SnackBar works properly with success and error events.
// SnackBack is shown when password is reset and
// when user is logged in

//Cloud Function returns error correctly when only the Auth
// part is loaded.


function App() {
  const user = useSelector((state) => state.auth.user);
  const [snackBar, setSnackBar] = useState({
    open: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        userData.getIdTokenResult().then((idTokenResult) => {
          const { name, email, isAdmin, user_id, accessLevel } =
            idTokenResult.claims;
            
          setSnackBar({ open: true });

          // Check if user is admin
          if (!!idTokenResult.claims.isAdmin) {
            dispatch(
              authActions.authenticate({
                isAuth: true,
                isInitial: false,
                token: idTokenResult.token,
                currentUser: {
                  displayName: name,
                  email,
                  isAdmin,
                  id: user_id,
                  accessLevel,
                },
              })
            );
            // console.log("User has Admin privileges");
          } else {
            dispatch(
              authActions.authenticate({
                isAuth: true,
                token: idTokenResult.token,
                currentUser: {
                  displayName: name,
                  email,
                  id: user_id,
                },
              })
            );
            // console.log("User does NOT has Admin privileges");
          }
        });
      } else {
        return console.log("No user found");
      }
    });
  }, []);

  const snackBarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ open: false });
  };

  return (
    <Layout>
      <RoutesComp />
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={snackBarCloseHandler}
      >
        <AlertComponent
          onClose={snackBarCloseHandler}
          severity="success"
          sx={{ width: "100%" }}
        >
          {"Logged in as: " + user.displayName}
        </AlertComponent>
      </Snackbar>
    </Layout>
  );
}

export default App;
