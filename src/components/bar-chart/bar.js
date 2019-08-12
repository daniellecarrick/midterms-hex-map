import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";

const componentStyles = {
  // bar: {
  //   fill: "tomato"
  // }
};

const data = [
  { Month: "Jan", Low: 21.3, High: 37.0 },
  { Month: "Feb", Low: 25.5, High: 43.4 },
  { Month: "Mar", Low: 33.4, High: 52.8 },
  { Month: "Apr", Low: 39.0, High: 60.9 },
  { Month: "May", Low: 46.9, High: 70.6 },
  { Month: "Jun", Low: 55.8, High: 82.2 },
  { Month: "Jul", Low: 63.4, High: 90.6 },
  { Month: "Aug", Low: 62.4, High: 88.7 },
  { Month: "Sept", Low: 52.4, High: 77.6 },
  { Month: "Oct", Low: 41.0, High: 64.0 },
  { Month: "Nov", Low: 30.4, High: 48.7 },
  { Month: "Dec", Low: 22.4, High: 38.0 }
];

const Bar = ({ classes }) => {
 
  return (
      <>
    <g transform={`translate(${(ROWPADDING+20) * i},${0})`}>
        <rect
        width={width}
        height={height}
        y={y}
        fill={fill)}
        />
        <text y={HEIGHT}>{label}</text>
        <text y={y}>{data}</text>
    </g>
       </> 
  )
};

export default withStyles(componentStyles)(Bar);
