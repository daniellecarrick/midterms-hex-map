import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import * as d3 from "d3";
import { useChartDimensions } from "../../utils/utils";
import { RED, BLUE, GREEN, GREY } from "../../utils/colors";
import Bar from "./bar";

const componentStyles = {
  chartContainer: {
    width: "70%",
    display: "block",
    fontFamily: "monospace",
    alignSelf: "center"
  }
};

// configure the index chart dimensions
const rowPadding = 30;

const BarChart = ({ classes, data }) => {

  const [ref, dimensions] = useChartDimensions({
    marginBottom: 0,
    marginLeft: 100,
    marginRight: 40,
    marginTop: 20
  });

  const width = dimensions.width;

  // Set up X scale
  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, dimensions.innerWidth]);

  // Set up color range
  let color = d3
    .scaleOrdinal()
    .domain(["GOP", "Dem", "Ind", null])
    .range([RED, BLUE, GREEN, GREY]);

  return (
    <div className={classes.chartContainer} ref={ref}>
      <svg width={width} height={1000}>
        <g transform={`translate(0,${dimensions.marginTop})`}>
          {Object.keys(data).map((row, i) => {
            return (
              <Bar
                key={i}
                transformRow={rowPadding * i}
                dimValue={Math.abs(data[row][2][0][3] - data[row][2][1][3])}
                dimName={data[row][1]}
                winner={data[row][2][0][3]}
                runnerup={data[row][2][1][3]}
                dimensions={dimensions}
                gapColor={color(data[row][2][0][2])}
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
  styles: PropTypes.object,
  data: PropTypes.object
};

export default withStyles(componentStyles)(BarChart);
