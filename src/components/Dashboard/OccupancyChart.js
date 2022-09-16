import React from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";


//need to add a Card for better spacing
function OccupancyChart(props) {
  // const totalPeople = 60;
  const totalPeople = props.dataInfo.length

  
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
    < >
     <CardMedia sx={{mt: 2}}>
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
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar isAnimationActive={false} background dataKey="value" />
          <text
              x={"50%"}
              y={props.size / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={colorCondition()}
            >
              {totalPeople}
            </text>
        </RadialBarChart>
      </ResponsiveContainer>
     </CardMedia>
     <CardContent>      
     <Typography variant="h5" component="h2">
        Current occupancy
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
      >
        Current amount of people in the site
      </Typography>
     </CardContent>
    </>
  );
}

export default OccupancyChart;
