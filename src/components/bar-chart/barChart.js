import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
// import useElementSize from "../../Hooks/useElementSize";
import * as d3 from "d3";
import IndexBar from "./indexBar";
import {RED, BLUE, GREEN, GREY} from "../chart-components/colors";

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
  const width = 650;
  //set up margins etc for Rank Chart
  const margin = { right: 40, left: 120, top: 20, bottom: 0 };
  // configure the index chart dimensions
  const innerWidth = width - margin.left - margin.right;
  const rowPadding = 30;
  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, innerWidth]);

  // Establish color range
  let colorRange = d3
    .scaleOrdinal()
    .domain(["GOP", "Dem", "Ind", null])
    .range([RED, BLUE, GREEN, GREY]);
//   Object.keys(data).sort((a,b) => {
//         console.log(data[a], Math.abs(data[a][2][0][3] - data[a][2][1][3]) - Math.abs(data[b][2][0][3] - data[b][2][1][3]))
//         return ((data[a][2][0][3] - data[a][2][1][3]) - (data[b][2][0][3] - data[b][2][1][3]));
//     });
  return (
    <div className={classes.chartContainer}>
      <svg width={width} height={1000}>
        <g transform={`translate(0,${margin.top})`}>
          {Object.keys(data).map((row, i) => {
            return (
              <IndexBar
                key={i}
                transformRow={rowPadding * i}
                dimValue={Math.abs(data[row][2][0][3] - data[row][2][1][3])}
                dimName={data[row][1]}
                winner={data[row][2][0][3]}
                runnerup={data[row][2][1][3]}
                margin={margin}
                innerWidth={innerWidth}
                gapColor={colorRange(data[row][2][0][2])}
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
