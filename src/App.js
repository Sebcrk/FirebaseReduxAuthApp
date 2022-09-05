import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { authActions } from "./store/auth-slice";
import Layout from "./components/layout/Layout";
import RoutesComp from "./Routes";


// NECESITO PASAR EL ACCESSTOKEN A REDUX Y COMPARAR LO QUE MANDA FIREBASE VS LO QUE HAY EN REDUX
// PARA PROTEGER LAS RUTAS

function App() {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  console.log(user ? user : "No user in redux state");


  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        if (userData.accessToken === accessToken){
          console.log("App.js says token is Valid");
          dispatch(authActions.authenticate({isAuth: true, currentUser: userData.email}))
        } else {
          console.log("App.js says token is not valid");
          dispatch(authActions.authenticate({isAuth: false, currentUser: userData.email}))

        }
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User signed in: " + user);

        // ...
      } else {
        return console.log("No user found");;
      }
    });

    return unsubscribe
  }, []);
  return (
    <Layout>
      <RoutesComp />
    </Layout>
  );
}

export default App;
