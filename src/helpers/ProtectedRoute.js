import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const accessToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // let isValid = false;
  // useEffect(() => {
  //   let isSubscribed = true;
  //   onAuthStateChanged(auth, (userData) => {
  //     if (userData) {
  //       if (userData.accessToken === accessToken) {
  //         console.log("Valid token");
  //         // return setIsValid((prevState => !prevState))
  //         isValid = true;
  //       } else {
  //         console.log("Invalid token");
  //       }

  //       // ...
  //     } else {
  //       console.log("No user found");
  //     }
  //   });

  //   return () => {
  //     isSubscribed = false;
  //   };
  // }, []);

  // REVISAR ESTO
  // REVISAR ESTO
  // REVISAR ESTO
  // REVISAR ESTO
  // REVISAR ESTO

  // isAuthenticated = true and accessToken = null => Works well. If user is not signed in, routes are protected and redirected to /login
  // isAuthenticated = false and accessToken != null => Works well. If user is not signed in, routes are protected and redirected to /login
  // isAuthenticated = true and accessToken != null => Works well. If user is not signed in, routes are protected and redirected to /login

  if (!isAuthenticated || accessToken === null) {
    //Not signed in
    console.log("Protected route. Not allowed. Routing to Sign in");
    return <Navigate to="/signin" replace={true} />;
  }
  //Signed in
  return <>{props.children}</>;
}
