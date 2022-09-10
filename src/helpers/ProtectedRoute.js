import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
  const { adminRoute, routeAccessLevel } = props;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const accessToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (adminRoute && user.accessLevel < routeAccessLevel) {
    // User does not have access privileges
    console.log(
      "Admin-only route above user's Access Level. Not allowed. Routing to /"
    );
    return <Navigate to="/" replace={true} />;
  }

  if (!isAuthenticated || accessToken === null) {
    //Not signed in
    console.log("Protected route. Not allowed. Routing to Sign in");
    return <Navigate to="/signin" replace={true} />;
  }
  //Signed in
  return <>{props.children}</>;
}
