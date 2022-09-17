import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Button } from "@mui/material";

function AutoValidation({ setIsAutomatic }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3001/projects");
      const data = await res.json();
      console.log(data);
      setData(data);
      setIsloading(false);
    };
    getData();
  }, []);

  const grantAccessHandler = async () => {
    try {
      // Delete from virtual queue
      const res = await fetch(`http://localhost:3001/projects/${data.id}`, {
        method: "DELETE",
      });
      console.log(res.status);
      setIsAutomatic(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <>
          <p>{data.firstName}</p>
          <p>{data.lastName}</p>
          <p>{data.dateOfBirth}</p>
          <p>{data.role}</p>
          <p>{data.destination}</p>
          <p>{data.entrance}</p>
          <Button onClick={grantAccessHandler}>Grant access</Button>
        </>
      )}
    </>
  );
}

export default AutoValidation;
