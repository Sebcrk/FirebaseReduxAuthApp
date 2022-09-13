import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const BasePage = (props) => {
  const { Icon, color, title, subtitle, maxWidth } = props;

  return (
    <Container component="div" maxWidth={maxWidth}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Icon sx={{ color: color, width: 100, height: 100 }} />
        <Typography component="h2" variant="h5">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary" align="center">
            {subtitle}
          </Typography>
        )}
        {props.children}
      </Box>
    </Container>
  );
};

export default BasePage;
