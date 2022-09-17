import React from "react";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

//need to add a Card for better spacing
function OccupancyChart(props) {
  const occupancy = useSelector((state) => state.guestInfo.occupancy);
  const maxOccupancy = useSelector((state) => state.guestInfo.maxOccupancy);

  // const totalPeople = 60;
  const totalPeople = occupancy;
  const colorCondition = () => {
    if (totalPeople < 6) {
      return "#02ba0f";
    }
    if (totalPeople >= 6 && totalPeople < 8) {
      return "#ff8f00";
    }
    return "#b71c1c";
  };

  const data = [
    {
      value: totalPeople,
      fill: colorCondition(),
    },
  ];

  return (
    <>
      <CardMedia sx={{ mt: 2 }}>
        <ResponsiveContainer width="100%" height={props.size}>
          <RadialBarChart
            cx={"50%"}
            cy={props.size / 2}
            startAngle={90}
            endAngle={-270}
            outerRadius={props.size / 2}
            innerRadius={props.size / 3}
            barSize={30}
            data={data}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, maxOccupancy]}
              tick={false}
            />
            <RadialBar background dataKey="value" />
            <text
              x={"50%"}
              y={props.size / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={colorCondition()}
            >
              {/* {totalPeople + "/" + maxOccupancy} */}
              {(totalPeople / maxOccupancy) * 100 + "%"}
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="h2">
          Current occupancy
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Current amount of people in the site
        </Typography>
      </CardContent>
    </>
  );
}

export default OccupancyChart;
