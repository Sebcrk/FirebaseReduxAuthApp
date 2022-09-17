import * as React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";





export default function TableComp(props) {
  const guestData = useSelector((state) => state.guestInfo.guests);
  const limitedGuestData = guestData.slice(0, 8)
  const { type, dataInfo, dashboardTable } = props;
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Search table">
        <TableHead>
          <TableRow>
            {type === "SearchUser" && <SearchUserTitleComp />}
            {type === "SearchGuest" && <SearchGuestTitleComp />}
          </TableRow>
        </TableHead>
        <TableBody>
          {type === "SearchUser" && <SearchUserData dataInfo={dataInfo} />}
          {type === "SearchGuest" && <SearchGuestData isDashboard={dashboardTable} dataInfo={dataInfo ? dataInfo : limitedGuestData} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


// Separate the components and organize it in a folder
const searchUserTitles = [
  "Name",
  "Role",
  "Access Level",
  "Email",
  "ID",
  "Date of birth",
  "Created on",
];
const SearchUserTitleComp = () => {
  return searchUserTitles.map((title) => (
    <TableCell sx={{ fontWeight: "bold" }} align="center" key={title}>
      {title}
    </TableCell>
  ));
};

const SearchUserData = ({ dataInfo }) => {
  return dataInfo.map((data) => (
    <TableRow key={data.id}>
      <TableCell align="center">
        {data.firstName + " " + data.lastName}
      </TableCell>
      <TableCell align="center">{data.role}</TableCell>
      <TableCell align="center">{data.accessLevel}</TableCell>
      <TableCell align="center">{data.email}</TableCell>
      <TableCell align="center">{data.id}</TableCell>
      <TableCell align="center">
        {data.dateOfBirth
          .toDate()
          .toLocaleString("en-US", { dateStyle: "long" })}
      </TableCell>
      <TableCell align="center">
        {data.createdOn
          .toDate()
          .toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
      </TableCell>
    </TableRow>
  ));
};

const searchGuestTitles = [
  "Name",
  "ID",
  "Role",
  "Entrance #",
  "Date of entry",
  "Destination",
];

const SearchGuestTitleComp = () => {
  return searchGuestTitles.map((title) => (
    <TableCell sx={{ fontWeight: "bold" }} align="center" key={title}>
      {title}
    </TableCell>
  ));
};

const SearchGuestData = ({ dataInfo, isDashboard }) => {
  return dataInfo.map((data, index) => (
    <TableRow key={index}>
      <TableCell align="center">
        {data.firstName + " " + data.lastName}
      </TableCell>
      <TableCell align="center">{data.id}</TableCell>
      <TableCell align="center">{data.role}</TableCell>
      <TableCell align="center">{data.entrance}</TableCell>
      <TableCell align="center">
        {isDashboard ? new Date (data.dateOfEntry).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })
        : 
        data.dateOfEntry
          .toDate()
          .toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
       </TableCell>
      <TableCell align="center">{data.destination}</TableCell>
    </TableRow>
  ));
};

