import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuComp from "./Menu";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import CalculateIcon from "@mui/icons-material/Calculate";

const MainNavigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.token);

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="counter-unprotected-route"
        component={Link}
        to="/counter"
      >
        <CalculateIcon />
      </IconButton>
      {isAuthenticated && accessToken ? (
        <MenuComp />
      ) : (
        // <IconButton color="error" aria-label="logout" onClick={logoutHandler}>
        //   <LogoutIcon />
        // </IconButton>

        <IconButton
          component={Link}
          to="/signin"
          color="inherit"
          aria-label="signin"
        >
          <LoginIcon />
        </IconButton>
      )}
    </>
  );
};

export default MainNavigation;
