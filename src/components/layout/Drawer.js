import {Fragment}from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, AdminListItems } from "../ListItems";


export default function TemporaryDrawer({ toggleDrawer, isOpen, admin }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Fragment >
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer(false)}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems onToggleDrawer={toggleDrawer}/>
              <Divider sx={{ my: 1 }} />
              {user.isAdmin && <AdminListItems onToggleDrawer={toggleDrawer}/>}
            </List>
          </Box>
        </Drawer>
      </Fragment>
    </div>
  );
}
