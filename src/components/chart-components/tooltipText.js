import React from "react";
import withStyles from "react-jss";

const componentStyles = {
  tooltipTitle: {
    fontWeight: 500,
    fontFamily: "Rubik",
    fontSize: "12px"
  },
  tooltipContent: {
    margin: "3px 0px",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: 400,
  },
  value: {
    float: "right",
    marginLeft: "20px",
    fontWeight: 400,
  }
};
const camelCase = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const TooltipText = ({ classes, dimName, segment, benchmark, difference, gapColor }) => {
  return (
    <div className={classes.tooltipContainer}>
      <p className={classes.tooltipTitle}>{camelCase(dimName)}</p>
      <p className={classes.tooltipContent}>
        Segment: <span className={classes.value}>{segment.toFixed(1)}%</span>
      </p>
      <p className={classes.tooltipContent}>
        Benchmark:{" "}
        <span className={classes.value}>{benchmark.toFixed(1)}%</span>
      </p>
      <p className={classes.tooltipContent} style={{ color: gapColor }}>
        Gap:{" "}
        <span className={classes.value}>{difference.toFixed(1)} points</span>
      </p>
    </div>
  );
};

export default withStyles(componentStyles)(TooltipText);
