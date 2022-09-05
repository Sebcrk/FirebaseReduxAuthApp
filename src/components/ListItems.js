import { useState } from "react";
import { Link } from "react-router-dom";

import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import SearchIcon from "@mui/icons-material/Search";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import MapIcon from "@mui/icons-material/Map";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BlockIcon from "@mui/icons-material/Block";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TuneIcon from '@mui/icons-material/Tune';


const userNavigationItems = [
  {
    text: "Dashboard",
    url: "/",
    icon: <DashboardIcon />,
  },
  {
    text: "Validation",
    url: "/validation",
    icon: <FingerprintIcon />,
  },
];

const guestReportNavigationItems = [
  {
    text: "Guest Search",
    url: "/guests/search",
    icon: <SearchIcon />,
  },
  {
    text: "Schedule",
    url: "/guests/schedule",
    icon: <InsertInvitationIcon />,
  },
  {
    text: "Tracking",
    url: "/guests/map",
    icon: <MapIcon />,
  },
  {
    text: "Reports",
    url: "/guests/reports",
    icon: <BarChartIcon />,
  },
];

const adminNavigationItems = [
  {
    text: "User Search",
    url: "/admin/search",
    icon: <SearchIcon />,
  },
  {
    text: "Add User",
    url: "/admin/add",
    icon: <PersonAddIcon />,
  },
  {
    text: "Edit User",
    url: "/admin/edit",
    icon: <TuneIcon />,
  },
  {
    text: "Delete User",
    url: "/admin/delete",
    icon: <PersonRemoveIcon />,
  },
  {
    text: "Ban Guests",
    url: "/admin/ban",
    icon: <BlockIcon />,
  },
];

export const MainListItems = (props) => {
  const [openReportCollapse, setOpenReportCollapse] = useState(false);

  const reportsCollapseHandler = () => {
    setOpenReportCollapse(!openReportCollapse);
  };

  return (
    <>
      {userNavigationItems.map((item) => (
        <ListItemButton
          key={item.text}
          onClick={props.onToggleDrawer(false)}
          component={Link}
          to={item.url}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <ListItemButton onClick={reportsCollapseHandler}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Guests" />
        {!openReportCollapse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </ListItemButton>
      <Collapse in={openReportCollapse} timeout="auto" unmountOnExit>
        {guestReportNavigationItems.map((item) => {
          return (
            <ListItemButton
              key={item.text}
              onClick={props.onToggleDrawer(false)}
              component={Link}
              to={item.url}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </Collapse>
    </>
  );
};

export const AdminListItems = (props) => {
  const [openAdminCollapse, setOpenAdminCollapse] = useState(false);

  const adminCollapseHandler = () => {
    setOpenAdminCollapse(!openAdminCollapse);
  };
  return (
    <>
      <ListItemButton onClick={adminCollapseHandler}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Tools" />
        {!openAdminCollapse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </ListItemButton>
      <Collapse in={openAdminCollapse} timeout="auto" unmountOnExit>
        {adminNavigationItems.map((item) => {
          return (
            <ListItemButton key={item.text} onClick={props.onToggleDrawer(false)} component={Link} to={item.url}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </Collapse>
    </>
  );
};
