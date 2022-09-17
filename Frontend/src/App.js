import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalOccupancy, guestsInfo } from "./store/guestInfo-slice";
import { onAuthStateChanged } from "firebase/auth";
import { authActions } from "./store/auth-slice";
import { auth, db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";
import { startOfDay, endOfDay } from "date-fns";

import Layout from "./components/layout/Layout";
import RoutesComp from "./Routes";
import Snackbar from "@mui/material/Snackbar";

import AlertComponent from "./components/UI/AlertComponent";

function App() {
  const user = useSelector((state) => state.auth.user);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);
  const itemsSize = 240;
  const [snackBar, setSnackBar] = useState({
    open: false,
  });

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

    // guest
    const guestsRef = collection(db, "guests");
    const q = query(
      guestsRef,
      where("dateOfEntry", ">=", start),
      where("dateOfEntry", "<=", end),
      orderBy("dateOfEntry", "desc"),
    );

    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No guests have entered yet.");
        dispatch(totalOccupancy({ currentOccupancy: 0 }));
      } else {
        const results = [];
        querySnapshot.forEach((doc) => {
          let dateOfBirth = doc.data().dateOfBirth.toDate().toString()
          let dateOfEntry= doc.data().dateOfEntry.toDate().toString()
          results.push({...doc.data(), dateOfBirth, dateOfEntry});
        });
        dispatch(totalOccupancy({ currentOccupancy: querySnapshot.size }));
        dispatch(guestsInfo({ guests: results}));
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
