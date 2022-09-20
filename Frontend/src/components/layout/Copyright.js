import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Copyright(props) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" to="#">
          Redux Auth App
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="sebasdvillab"
        data-version="v1"
      />
    </>
  );
}

export default Copyright;
