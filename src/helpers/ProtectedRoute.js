import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const accessToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

 if (props.adminRoute && user.isAdmin === undefined) {
  // User does not have access privileges
  console.log("Admin-only route. Not allowed. Routing to /");
    return <Navigate to="/" replace={true} />
  }
  if (!isAuthenticated || accessToken === null) {
    //Not signed in
    console.log("Protected route. Not allowed. Routing to Sign in");
    return <Navigate to="/signin" replace={true} />;
  }
  //Signed in
  return <>{props.children}</>;
}
