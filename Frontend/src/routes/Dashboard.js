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
import {totalOccupancy } from "../store/guestInfo-slice"
import { useDispatch, useSelector } from "react-redux";
import { startOfDay, endOfDay } from "date-fns";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";

import TableComp from "../components/UI/TableComp";
import OccupancyChart from "../components/Dashboard/OccupancyChart";
import DailyEntryChart from "../components/Dashboard/DailyEntryChart";
import GuestTypeChart from "../components/Dashboard/GuestTypeChart";
import DestinationChart from "../components/Dashboard/DestinationChart";

const dashboardItems = [
  { Comp: DailyEntryChart, xs: 12, sm: 12, md: 12, lg: 6 },
  { Comp: GuestTypeChart, xs: 12, sm: 6, md: 4, lg: 3 },
  { Comp: OccupancyChart, xs: 12, sm: 6, md: 4, lg: 3 },
  { Comp: DestinationChart, xs: 12, sm: 12, md: 4, lg: 3 },
  { Comp: TableComp, xs: 12, sm: 12, md: 12, lg: 9 },
];

export default function Dashboard() {
  const guestData = useSelector((state) => state.guestInfo.guests);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);
  const itemsSize = 240;

  useEffect(() => {
    let isSubscribed = true;

    if (guestData.length > 0 ) {
      setLoading(false)
    }
    return () => {
      isSubscribed = false;
    };
  }, [guestData]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="div" sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
        {loading && <LinearProgress />}
        {!loading && (
          <Grid container spacing={2}>
            {dashboardItems.map((item, index) => {
              const DashboardItem = item.Comp;
              return (
                <Grid
                  key={index}
                  xs={item.xs}
                  sm={item.sm}
                  md={item.md}
                  lg={item.lg}
                >
                  <Card
                    elevation={5}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: 340,
                    }}
                  >
                    <DashboardItem
                      size={itemsSize}
                      type={"SearchGuest"}
                      dashboardTable={true}
                    />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
