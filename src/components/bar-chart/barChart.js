import React, { useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
// import useElementSize from "../../Hooks/useElementSize";
import * as d3 from "d3";
import IndexBar from "./indexBar";

const componentStyles = {
  chartContainer: {
    width: "100%",
    display: "block"
  },
  dimName: {
    marginLeft: "80px",
    fontSize: "14px",
    letterSpacing: "1.33px",
    color: "#C2C9D1",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
};

const BarChart = ({ classes, data, colors }) => {
  // find container width for rank chart
 console.log('data', data);
  const width = 450;
 //set up margins etc for Rank Chart
  const margin = { right: 40, left: 80, top: 20, bottom: 0 };
  // configure the index chart dimensions
  const innerWidth = width - margin.left - margin.right;
  const rowPadding = 30;
 const height = rowPadding * data.length + margin.top + margin.bottom;
  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, innerWidth]);

  //Establish color range
  let colorRange = d3
    .scaleThreshold()
    .domain([-5, -4, 1, 0, 1, 5])
    .range(colors);

  return (
    <div className={classes.chartContainer}>
      <svg width={width} height={height}>
        <g transform={`translate(0,${margin.top})`}>
          {Object.keys(data).map((row, i) => {
            return (
              <IndexBar
                key={i}
                transformRow={rowPadding * i}
                dimValue={data[row][2][0][3]}
                dimName={data[row][1]}
                segmentValue={data[row][2][0][3]}
                benchmarkValue={data[row][2][1][3]}
                margin={margin}
                innerWidth={innerWidth}
                gapColor={colorRange(data[row][2][0][3])}
                x={x}
              />
            );
          })}
        </g>
      </svg>
    </div> 
  );
};

BarChart.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dim_value: PropTypes.number,
      dim_name: PropTypes.string
    })
  )
};

export default withStyles(componentStyles)(BarChart);
