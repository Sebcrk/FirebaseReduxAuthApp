import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';


const destinations = ["AUDITORIUM", "THEATER", "LIBRARY", "COLISEUM"];
const COLORS = ["#0088FE", "#4caf50", "#ffc107", "#f57c00"];

const DestinationChart = (props) => {
  const guestData = useSelector((state) => state.guestInfo.guests);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (guestData.length === 0) {
      setData([{name: "No entries today", value: 0}])
      return;
    } else {
      const roleGroup = [];
      guestData.forEach((entry) => {
        // Get only the role of the guests
        roleGroup.push(entry.destination);
      });

      // Group by role
      const groupedData = [];
      roleGroup.forEach((x) => {
        groupedData[x] = (groupedData[x] || 0) + 1;
      });

      // Set up the array
      const dataArray = [];
      destinations.map((data, i) => {
        // Saving the data in an array
        dataArray.push({ name: data, value: groupedData[data] });
      });
      setData(dataArray);
    }
  }, [guestData]);

  return (
    <>
    <CardMedia sx={{m: 1}}>
      <ResponsiveContainer width="100%" height={props.size}>
        <PieChart>
          <Pie
            label
            dataKey="value"
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
        Entries by destination
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Guest distribution by destination 
      </Typography>
    </CardContent>
  </>
  )
}

export default DestinationChart