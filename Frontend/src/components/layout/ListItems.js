import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
import TuneIcon from "@mui/icons-material/Tune";

const styles = {
  icon: { fontSize: 40 },
  collapsedItems: {
    paddingLeft: (theme) => theme.spacing(1),
  },
};

const generalNavigationItems = [
  {
    text: "Dashboard",
    url: "/",
    icon: <DashboardIcon sx={styles.icon} />,
  },
  {
    text: "Validation",
    url: "/validation",
    icon: <FingerprintIcon sx={styles.icon} />,
  },
];

const guestReportNavigationItems = [
  {
    text: "Search Guest",
    url: "/guests/search",
    icon: <SearchIcon />,
  },
  // {
  //   text: "Schedule",
  //   url: "/guests/schedule",
  //   icon: <InsertInvitationIcon />,
  // },
  // {
  //   text: "Tracking",
  //   url: "/guests/map",
  //   icon: <MapIcon />,
  // },
  {
    text: "Reports",
    url: "/guests/reports",
    icon: <BarChartIcon />,
    accessLevel: 2,
  },
];

const adminNavigationItems = [
  {
    text: "Search User",
    url: "/admin/search",
    icon: <SearchIcon />,
    accessLevel: 1,
  },
  {
    text: "Add User",
    url: "/admin/add",
    icon: <PersonAddIcon />,
    accessLevel: 2,
  },
  // {
  //   text: "Edit User",
  //   url: "/admin/edit",
  //   icon: <TuneIcon />,
  //   accessLevel: 1,
  // },
  {
    text: "Delete User",
    url: "/admin/delete",
    icon: <PersonRemoveIcon />,
    accessLevel: 2,
  },
  // {
  //   text: "Ban Guests",
  //   url: "/admin/ban",
  //   icon: <BlockIcon />,
  //   accessLevel: 3,
  // },
];

export const MainListItems = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [openReportCollapse, setOpenReportCollapse] = useState(false);

  const reportsCollapseHandler = () => {
    setOpenReportCollapse(!openReportCollapse);
  };

  return (
    <>
      {generalNavigationItems.map((item) => (
        <ListItemButton
          key={item.text}
          onClick={() => props.onToggleDrawer(false)}
          component={Link}
          to={item.url}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
      <ListItemButton onClick={reportsCollapseHandler}>
        <ListItemIcon>
          <AssignmentIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Guests" />
        {props.open &&
          (!openReportCollapse ? <ExpandMoreIcon /> : <ExpandLessIcon />)}
      </ListItemButton>
      <Collapse
        sx={styles.collapsedItems}
        in={openReportCollapse}
        timeout="auto"
        unmountOnExit
      >
        {guestReportNavigationItems.map((item) => {
          if (user.accessLevel < item.accessLevel) {
            return;
          }
          return (
            <ListItemButton
              key={item.text}
              onClick={() => props.onToggleDrawer(false)}
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
  const user = useSelector((state) => state.auth.user);
  const [openAdminCollapse, setOpenAdminCollapse] = useState(false);

  const adminCollapseHandler = () => {
    setOpenAdminCollapse(!openAdminCollapse);
  };
  return (
    <>
      <ListItemButton onClick={adminCollapseHandler}>
        <ListItemIcon>
          <AssignmentIndIcon sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primary="Admin Tools" />
        {props.open &&
          (!openAdminCollapse ? <ExpandMoreIcon /> : <ExpandLessIcon />)}
      </ListItemButton>
      <Collapse
        sx={styles.collapsedItems}
        in={openAdminCollapse}
        timeout="auto"
        unmountOnExit
      >
        {adminNavigationItems.map((item) => {
          if (user.accessLevel < item.accessLevel) {
            return;
          }
          return (
            <ListItemButton
              key={item.text}
              onClick={() => props.onToggleDrawer(false)}
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
