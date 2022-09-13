import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { formatDistanceToNowStrict } from "date-fns";


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
        {data.createdOn.toDate().toLocaleString("en-US", {dateStyle: "long",timeStyle: 'short'})}
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

const SearchGuestData = ({ dataInfo }) => {
  return dataInfo.map((data) => (
    <TableRow key={data.id} >
      <TableCell align="center">
        {data.firstName + " " + data.lastName}
      </TableCell>
      <TableCell align="center">{data.id}</TableCell>
      <TableCell align="center">{data.role}</TableCell>
      <TableCell align="center">{data.entrance}</TableCell>
      <TableCell align="center">
      {data.dateOfEntry.toDate().toLocaleString("en-US", {dateStyle: "long",timeStyle: 'short'})}
      {/* {formatDistanceToNowStrict(data.dateOfEntry.toDate(), { addSuffix: true })} */}
      </TableCell>
      <TableCell align="center">{data.destination}</TableCell>
    </TableRow>
  ));
};




export default function TableComp(props) {
  const { type, dataInfo } = props;

  return (
    <TableContainer sx={{mt: 2}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Search table">
        <TableHead>
          <TableRow>
            {type === "SearchUser" && <SearchUserTitleComp />}
            {type === "SearchGuest" && <SearchGuestTitleComp />}
          </TableRow>
        </TableHead>
        <TableBody>
          {type === "SearchUser" && <SearchUserData dataInfo={dataInfo} />}
          {type === "SearchGuest" && <SearchGuestData dataInfo={dataInfo} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
