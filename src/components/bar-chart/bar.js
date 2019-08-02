import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";

const componentStyles = {
  bar: {
    fill: "tomato"
  }
};

const data = [
  { dimension: "D", value: Math.random() * 10 },
  { dimension: "A", value: Math.random() * 10 },
  { dimension: "N", value: Math.random() * 10 },
  { dimension: "I", value: Math.random() * 10 },
  { dimension: "E", value: Math.random() * 10 },
  { dimension: "L", value: Math.random() * 10 },
  { dimension: "L", value: Math.random() * 10 },
  { dimension: "E", value: Math.random() * 10 }
];

const BarChart = ({classes}) => {
  const margin = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  };
  const ROWPADDING = 20;
  // configure the index chart dimensions
  const width = 700 - margin.left - margin.right;
  const HEIGHT = ROWPADDING * data.length + margin.top + margin.bottom;
  const max = 10;
  var y = d3
    .scaleLinear()
    .domain([0, max])
    .range([HEIGHT, 0]);

  return (
    <svg width={"100%"} height={HEIGHT}>
      {data.map((bar, i) => {
        return (
          <g transform={`translate(${ROWPADDING * i},${0})`}>
            <text>{bar.dimension}</text>
            <rect width={10} height={y(bar.value)} className={classes.bar} />
          </g>
        );
      })}
    </svg>
  );
};

export default withStyles(componentStyles)(BarChart);
