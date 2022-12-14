import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  ComposedChart,
  Bar,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import getHours from "date-fns/getHours";

function DailyEntryChart(props) {
  const guestData = useSelector((state) => state.guestInfo.guests);

  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (guestData.length === 0) {
      setData([{ time: "No entries today", value: "0", value1: "0" }]);
    } else {
      const hourGroup = [];
      guestData.forEach((entry) => {
        // Get only the hour of the entries
        hourGroup.push(getHours(new Date(entry.dateOfEntry)));
      });

      // Group by hour
      const groupedData = [];
      hourGroup.forEach((x) => {
        groupedData[x] = (groupedData[x] || 0) + 1;
      });

      // Set up the array
      const count = [0];
      let total = 0;
      const dataArray = [];
      groupedData.map((data, i) => {
        // in this case, "i" indicates the hour
        // Saving the data in an array to add them and get the accumulated amount
        count.push(data);
        let counter = count.length - 1;
        total = total + count[counter];
        dataArray.push({
          time: i < 10 ? `0${i}:00` : `${i}:00`,
          value: data,
          value1: total,
        });
      });
      setData(dataArray);
    }
  }, [guestData]);

  return (
    <>
      <CardMedia sx={{ mt: 2 }}>
        <ResponsiveContainer width="100%" height={props.size}>
          <ComposedChart
            data={data}
            margin={{
              right: 20,
              left: 20,
            }}
          >
            <XAxis dataKey="time" stroke="#90a4ae" />
            <YAxis yAxisId="right" orientation="right" stroke="#0088FE" />
            <YAxis yAxisId="left" stroke="#4caf50" />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              contentStyle={{
                color: "white",
                backgroundColor: "#424242",
                borderRadius: "10px",
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="value"
              barSize={20}
              fill="#4caf50"
              name="Amount of entries"
            />
            <Line
              yAxisId="right"
              type="linear"
              strokeWidth={3}
              dataKey="value1"
              stroke="#0088FE"
              name="Accumulated amount"
            />
            <Legend />
          </ComposedChart>
        </ResponsiveContainer>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="h2">
          Daily entries
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Daily entries grouped by hour of entry
        </Typography>
      </CardContent>
    </>
  );
}

export default DailyEntryChart;
