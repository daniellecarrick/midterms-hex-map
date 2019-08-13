import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import { Axis, axisPropsFromTickScale, axisPropsFromBandedScale, LEFT, BOTTOM } from "react-d3-axis";

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

const BarChart = ({ classes }) => {
  const margin = {
    top: 10,
    left: 10,
    bottom: 20,
    right: 10
  };
  const ROWPADDING = 5;
  // configure the index chart dimensions
  const width = 700 - margin.left - margin.right;
  const HEIGHT = 400;
  // TO DO : programmattic max
  const max = 100;
  const y = d3
    .scaleLinear()
    .domain([max, 0])
    .range([0, HEIGHT]);

  const xScale = d3
    .scaleBand()
    .domain([0, data.length])
    .range([0, 700])
    .round(true);
console.log(xScale.bandwidth());
  const colorScale = d3
    .scaleLinear()
    .domain([0, max])
    .range(["blue", "tomato"]);
  const barPadding = 3;
  const xAccessorScaled = d => xScale(d.x0) + barPadding;

  return (
    <>
      <h1>Bar chart</h1>
      <svg width={"100%"} height={HEIGHT}>
        {data.map((bar, i) => {
          return (
            <g transform={`translate(${(barPadding + 20) * i},${0})`}>
              <rect
                width={20}
                height={HEIGHT - y(bar.High)}
                className={classes.bar}
                y={y(bar.High)}
                //x={}
                fill={colorScale(bar.High)}
              />
              <text y={HEIGHT}>{bar.Month}</text>
              <text y={y(bar.High)}>{bar.Low}</text>
            </g>
          );
        })}
        <Axis {...axisPropsFromTickScale(y, 10)} style={{ orient: LEFT }} />
        <Axis
          {...axisPropsFromBandedScale(xScale, 10)}
          style={{ orient: BOTTOM }}
          position={xScale}
        />
      </svg>
    </>
  );
};

export default withStyles(componentStyles)(BarChart);
