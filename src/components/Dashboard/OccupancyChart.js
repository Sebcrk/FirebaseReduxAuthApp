import React from "react";
import { Typography } from "@mui/material";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";


//need to add a Card for better spacing
function OccupancyChart(props) {
  const totalPeople = 60;
  // const totalPeople = props.dataInfo.length
  const size = 210;

  if (props.dataInfo.length === 0) {
    return;
  }
  
  const colorCondition = () => {
    if (totalPeople < 70) {
      return "#02ba0f";
    }
    if (totalPeople >= 70 && totalPeople < 90) {
      return "#ff8f00";
    }
    return "#b71c1c";
  }
  
    const data = [
    {
      value: totalPeople,
      fill: colorCondition(),
    },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height={size}>
        <RadialBarChart
          cx={"50%"}
          cy={"50%"}
          startAngle={90}
          endAngle={-270}
          outerRadius={size / 2}
          innerRadius={size / 3}
          barSize={30}
          data={data}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background dataKey="value" />
          <text
              x={"50%"}
              y={size / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={colorCondition()}
            >
              {totalPeople}
            </text>
        </RadialBarChart>
      </ResponsiveContainer>

      <Typography sx={{ ml: 1 }} variant="h5" component="h2">
        Current occupancy
      </Typography>
      <Typography
        sx={{ ml: 1 }}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        Total amount of people currently in the site
      </Typography>
    </>
  );
}

export default OccupancyChart;
