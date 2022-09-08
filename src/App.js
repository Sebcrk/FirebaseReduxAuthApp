import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import Layout from "./components/layout/Layout";
import RoutesComp from "./Routes";

// import { db, functions } from "./firebase";
// import { httpsCallable, connectFunctionsEmulator} from "firebase/functions";

// NECESITO PASAR EL ACCESSTOKEN A REDUX Y COMPARAR LO QUE MANDA FIREBASE VS LO QUE HAY EN REDUX
// PARA PROTEGER LAS RUTAS

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  console.log(user ? user : "No user in redux state");
  // connectFunctionsEmulator(functions, "localhost", 5001);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        if (userData.accessToken === accessToken) {
          console.log("App.js says token is Valid");
          dispatch(
            authActions.authenticate({
              isAuth: true,
              currentUser: userData.email,
            })
          );
          userData.getIdTokenResult().then((idTokenResult) => {
            // Check if user is admin
            console.log(idTokenResult.claims.isAdmin);
            if (!!idTokenResult.claims.isAdmin) {
              console.log("User has Admin privileges");
            } else {
              console.log("User does NOT has Admin privileges");

            }
          });

          // Function test
          // const getFirestoreData = httpsCallable(functions, "getData")
          // getFirestoreData({collection: "meetups"})
          // .then(result => {
          //   console.log(result)
          //   console.log(result.data)
          // })
        } else {
          console.log("App.js says token is not valid");
          dispatch(
            authActions.authenticate({
              isAuth: false,
              currentUser: userData.email,
            })
          );
        }
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User signed in: " + user);

        // ...
      } else {
        return console.log("No user found");
      }
    });

    return unsubscribe;
  }, []);
  return (
    <Layout>
      <RoutesComp />
    </Layout>
  );
}

export default App;
