import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import { RED, BLUE } from "../chart-components/colors";
import { useChartDimensions } from "../chart-components/utils";

const componentStyles = {
  chartContainer: {
    display: "flex"
  },
  demText: {
    color: BLUE,
    width: "100px",
    margin: 0
  },
  gopText: {
    color: RED,
    width: "100px",
    margin: 0
  },
  number: {
    fontSize: 36,
    fontWeight: 600
  },
  chart: {
    width: "100%"
  }
};

const StackedBar = ({ classes, data, election }) => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 20
  });
  // not every seat is up for relection, so we start with the current totals
  const results = { sen: { dem: 23, gop: 42 }, gov: { dem: 7, gop: 7 } };

  // and add to them with the results.
  Object.keys(data).map(function(race) {
    if (data[race][2][0][2] === "GOP") {
      results[election].gop++;
    } else if (data[race][2][0][2] === "Dem") {
      results[election].dem++;
    }
  });
  const width = dimensions.width;
  const max = results[election].dem + results[election].gop;
  const xScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([0, dimensions.innerWidth]);
  return (
    <div className={classes.chartContainer}>
      <p className={classes.demText}>
        <span className={classes.number}>{results[election].dem}</span> <br />{" "}
        DEM
      </p>
      <div ref={ref} className={classes.chart}>
        <svg width={width} height={70}>
          <g
            transform={`translate(${dimensions.marginLeft},${
              dimensions.marginTop
            })`}
          >
            <rect
              width={xScale(results[election].dem)}
              height={30}
              y={0}
              x={0}
              fill={BLUE}
            />

            <rect
              width={xScale(results[election].gop)}
              height={30}
              x={xScale(results[election].dem)}
              fill={RED}
            />
          </g>
        </svg>
      </div>
      <p className={classes.gopText}>
        <span className={classes.number}>{results[election].gop}</span> <br />
        GOP
      </p>
    </div>
  );
};

export default withStyles(componentStyles)(StackedBar);
