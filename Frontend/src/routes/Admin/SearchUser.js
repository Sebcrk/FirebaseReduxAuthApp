import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import FaceIcon from "@mui/icons-material/Face";
import { LinearProgress, TextField } from "@mui/material";
import TableComp from "../../components/UI/TableComp";
import { usersSearch } from "../../helpers/searchDB";
import BasePage from "../../components/UI/Wrappers/BasePage";

const baseData = {
  color: "primary",
  Icon: FaceIcon,
  title: "Search User",
  subtitle: "Filter users by ID, name, last name or role",
};

function SearchUser() {
  const [isLoading, setIsloading] = useState(true);
  const [baseResults, setBaseResults] = useState();
  const [results, setResults] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    const timer = setTimeout(async () => {
      const usersData = await usersSearch();
      if (isSubscribed) {
        setBaseResults(usersData);
        setResults(usersData);
        setIsloading(false);
      }
    }, 1000);
    return () => {
      isSubscribed = false;
      clearTimeout(timer);
    };
  }, []);

  const searchUserHandler = (event) => {
    const filteredData = baseResults.filter((user) => {
      if (event.target.value.trim().length === 0) {
        return user;
      }
      if (user.firstName.includes(event.target.value.trim().toUpperCase())) {
        return user;
      }
      if (user.lastName.includes(event.target.value.trim().toUpperCase())) {
        return user;
      }
      if (user.id.includes(event.target.value.trim())) {
        return user;
      }
      if (user.role.includes(event.target.value.trim().toUpperCase())) {
        return user;
      }
    });
    setResults(filteredData);
  };

  return (
    <BasePage
      color={baseData.color}
      Icon={baseData.Icon}
      title={baseData.title}
      subtitle={baseData.subtitle}
    >
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={1} rowSpacing={0.1}>
          <Grid xs={12} sm={12}>
            <TextField
              onChange={searchUserHandler}
              label="Parameter"
              fullWidth
              required
            />
          </Grid>
        </Grid>
        {isLoading && (
          <Grid sx={{ mt: 3 }} sm={12}>
            <LinearProgress />
          </Grid>
        )}
      </Box>

      {!isLoading && <TableComp type="SearchUser" dataInfo={results} />}
    </BasePage>
  );
}

export default SearchUser;
