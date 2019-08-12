import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import { RED, BLUE } from "../chart-components/colors";
import { useChartDimensions } from "../chart-components/utils";

const componentStyles = {
  demText: {
    fill: BLUE
  },
  gopText: {
    fill: RED,
    textAnchor: "end"
  }
};

const StackedBar = ({ classes, data }) => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77
  });

  console.log("dimensions", dimensions);
  const results = { dem: 7, gop: 7 };
  Object.keys(data).map(function(race) {
    console.log(data[race][2][0][2]);
    if (data[race][2][0][2] === "GOP") {
      results.gop++;
    } else if (data[race][2][0][2] === "Dem") {
      results.dem++;
    }
  });
  const margin = { top: 0, left: 30, right: 30, bottom: 0 };
  const width = dimensions.width;
  const innerWidth = width - margin.left - margin.right;
  const xScale = d3
    .scaleLinear()
    .domain([0, 50])
    .range([0, innerWidth]);

  console.log(results);
  return (
    <div ref={ref}>
      <svg width={width}>
        <g transform={`translate(${0},0)`}>
          <text className={classes.demText} y={20} x={0}>
            Dem
          </text>
        </g>
        <g transform={`translate(${margin.left},0)`}>
          <rect
            width={xScale(results.dem)}
            height={40}
            y={0}
            x={0}
            fill={BLUE}
          />

          <rect
            width={xScale(results.gop)}
            height={40}
            x={xScale(results.dem)}
            fill={RED}
          />
        </g>
        <g transform={`translate(${width},20)`}>
          <text className={classes.gopText} textAnchor={"end"}>
            GOP
          </text>
        </g>
      </svg>
    </div>
  );
};

export default withStyles(componentStyles)(StackedBar);
