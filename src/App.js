import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import Layout from "./components/layout/Layout";
import RoutesComp from "./Routes";

// WORKING ON UPDATING USER DATA FROM ONAUTHSTATECHANGED
// ONCE USER SIGNS IN. CURRENT LOGIC ONLY WORKS AFTER
// PAGE IS RELOADED.

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  // connectFunctionsEmulator(functions, "localhost", 5001);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        userData.getIdTokenResult().then((idTokenResult) => {
          // Check if user is admin
          const { name, email, isAdmin, user_id, accessLevel } =
            idTokenResult.claims;

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
            setIsAdmin(true);
            console.log("User has Admin privileges");
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
            console.log("User does NOT has Admin privileges");
          }
        });
        // }
        // else {
        //   console.log("App.js says token is not valid");
        //   dispatch(
        //     authActions.authenticate({
        //       isAuth: false,
        //       currentUser: userData.email,
        //     })
        //   );
        // }
        // ...
      } else {
        return console.log("No user found");
      }
    });
  }, []);
  return (
    <>
      <Layout admin={isAdmin}>
        <RoutesComp />
      </Layout>
    </>
  );
}

export default App;
