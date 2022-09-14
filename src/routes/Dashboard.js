import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Backdrop from '@mui/material/Backdrop';
import LinearProgress from '@mui/material/LinearProgress';

import TableComp from "../components/UI/TableComp";
import OccupancyChart from "../components/Dashboard/OccupancyChart";
import DailyEntryChart from "../components/Dashboard/DailyEntryChart";
import GuestTypeChart from "../components/Dashboard/GuestTypeChart";
import DestinationChart from "../components/Dashboard/DestinationChart";

const dashboardItems = [
  { Comp: DailyEntryChart, xs: 12, md: 6, lg: 6 },
  { Comp: GuestTypeChart, xs: 6, md: 3, lg: 3 },
  { Comp: OccupancyChart, xs: 6, md: 3, lg: 3 },
  { Comp: TableComp, xs: 12, md: 9, lg: 9 },
  { Comp: DestinationChart, xs: 12, md: 3, lg: 3 },
];

function DashboardContent() {
  const [lastGuests, setLastGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  const backdropCloseHandler = () => {
    setLoading(false);
  };
  
  useEffect(() => {
    let isSubscribed = true;

    if(isSubscribed) {
      setLoading(true)
    }
    const guestsRef = collection(db, "guests");
    const q = query(guestsRef, orderBy("dateOfEntry", "desc"), limit(8));

    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log("No guests have entered yet.");
      } else {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });
        console.log(results);
        if (isSubscribed) {
          setLastGuests(results);
          setLoading(false)

        }
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="div" sx={{ p: 2, pl: 8, flexGrow: 1, overflow: "auto" }}>
      {/* <Backdrop
        sx={{  zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={backdropCloseHandler}
      >
        <LinearProgress />
      </Backdrop> */}
      {loading && <LinearProgress />}
       <Grid container spacing={2}>
          {dashboardItems.map((item, index) => {            
            const DashboardItem = item.Comp
            return (
            <Grid key={index} xs={item.xs} md={item.md} lg={item.lg}>
              <Paper
                elevation={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                }}
              >
                {!loading && <DashboardItem type={"SearchGuest"} dataInfo={lastGuests}/>}
              </Paper>
            </Grid>
          )})}
          {/* <Grid item xs={12} md={6} lg={6}>
            <Paper
              elevation={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
            </Paper>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Paper
              elevation={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
            </Paper>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Paper
              elevation={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <Paper
              elevation={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
              <TableComp type={"SearchGuest"} dataInfo={lastGuests} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              elevation={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 300,
              }}
            >
            </Paper>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
