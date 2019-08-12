import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";

const componentStyles = {
  // bar: {
  //   fill: "tomato"
  // }
};

const StackedBar = ({ classes }) => {
  return (
    <>
      <g transform={`translate(${0 * i},${0})`}>
        <rect width={width} height={height} y={y} fill={fill} />
        <text y={HEIGHT}>{label}</text>
        <text y={y}>{data}</text>
      </g>
    </>
  );
};

export default withStyles(componentStyles)(StackedBar);
