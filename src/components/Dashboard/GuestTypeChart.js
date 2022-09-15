import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const typeOfGuest = ["STUDENT", "GUEST", "PROFESSOR", "CLERK"];
const COLORS = ["#0088FE", "#4caf50", "#ffc107", "#f57c00"];

const GuestTypeChart = (props) => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (props.dataInfo.length === 0) {
      return;
    } else {
      const roleGroup = [];
      props.dataInfo.forEach((entry) => {
        // Get only the role of the guests
        roleGroup.push(entry.role);
      });

      // Group by role
      const groupedData = [];
      roleGroup.forEach((x) => {
        groupedData[x] = (groupedData[x] || 0) + 1;
      });

      // Set up the array
      const dataArray = [];
      typeOfGuest.map((data, i) => {
        // Saving the data in an array
        dataArray.push({ name: data, value: groupedData[data] });
      });
      setData(dataArray);
    }
  }, [props.dataInfo]);

  return (
    <>
      <CardMedia sx={{m: 1}}>
        <ResponsiveContainer width="100%" height={props.size}>
          <PieChart>
            <Pie
              label
              dataKey="value"
              isAnimationActive={false}
              data={data}
              outerRadius={60}
              stroke="none"
            >
              {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="h2">
          Entries by type
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Guest distribution by type 
        </Typography>
      </CardContent>
    </>
  );
};

export default GuestTypeChart;
