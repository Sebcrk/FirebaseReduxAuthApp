import classes from "./UserProfile.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileSearch } from "../utils/searchDB";

import CssBaseline from "@mui/material/CssBaseline";
import CardMedia from "@mui/material/CardMedia";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Logo from "../components/resources/boy-dynamic-color.png";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true
    const timer = setTimeout(async () => {
      const profileData = await profileSearch(user.id);
      setData(profileData);
      setLoading(false);
    }, 1000);
    return () => {
      isSubscribed = false
      clearTimeout(timer)
    }    
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="div" sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
        {loading && <LinearProgress />}
        {!loading && (
          <>
            <Card className={classes.header}>
              <CardMedia
                className={classes.logo}
                component="img"
                height="100"
                image={Logo}
                alt="icon"
              />
              <Typography
                className={classes.title}
                variant="h5"
                component="div"
              >
                Profile
              </Typography>
            </Card>

            <Card className={classes.content}>
              <CardContent>
                <Typography sx={{ fontSize: 45, mb: 2 }} color="text.secondary">
                  {data.firstName + " " + data.lastName}
                </Typography>
                <Typography sx={{ mb: 2 }} variant="h5" component="div">
                  {data.role + " LEVEL "} {data.accessLevel && data.accessLevel}
                </Typography>
                <Typography sx={{ mb: 2 }} color="text.secondary">
                  {data.email}
                </Typography>
                <Typography sx={{ mb: 2 }} color="text.secondary">
                  {data.id}
                </Typography>
                <Typography sx={{ mb: 2 }} color="text.secondary">
                  {data.dateOfBirth.toDate()
                    .toLocaleString("en-US", { dateStyle: "long" })}
                </Typography>
                <Typography variant="body2">
                  Created on:{" "}
                  {data.createdOn.toDate().toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
