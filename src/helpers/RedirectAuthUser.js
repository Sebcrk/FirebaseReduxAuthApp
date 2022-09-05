import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Check if user is authenticated to prevent access to
// Login/Reset Password routes

const RedirectAuthUser = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.token);
  const RouteComp = props.route

  if (!isAuthenticated || accessToken === null) {
    return <RouteComp />;
  } else {
    console.log(
      `Authenticated users don't have access to ${RouteComp.name}. Redirecting to /`
    );

    return <Navigate to="/" />;
  }
};

export default RedirectAuthUser;
