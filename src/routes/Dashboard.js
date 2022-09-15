import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";
import { startOfDay, endOfDay } from "date-fns";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";

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
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      setLoading(true);
    }
    const guestsRef = collection(db, "guests");
    const q = query(
      guestsRef,
      where("dateOfEntry", ">=", start),
      where("dateOfEntry", "<=", end),
      orderBy("dateOfEntry", "desc"),
      limit(10)
    );

    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log("No guests have entered yet.");
      } else {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });
        if (isSubscribed) {
          setGuests(results);
          setLoading(false);
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
        {loading && <LinearProgress />}
        {!loading && (
          <Grid container spacing={2}>
            {dashboardItems.map((item, index) => {
              const DashboardItem = item.Comp;
              return (
                <Grid key={index} xs={item.xs} md={item.md} lg={item.lg}>
                  <Paper
                    elevation={12}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: 320,
                    }}
                  >
                    <DashboardItem type={"SearchGuest"} dataInfo={guests} />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
