import React from "react";
import results from "../../assets/results-top-level.json";
import BarChart from "./barChart";
import withStyles from "react-jss";

const componentStyles = {
  chartContainer: {
    fontFamily: "monospace"
  }
};

const BarPage = ({classes}) => {
  return (
    <div className={classes.chartContainer}>
      <h1>Gap between winner and loser</h1>
      <h5>Gubernatorial Race</h5>
      <BarChart data={results.G} colors={["red", "blue"]} />
    </div>
  );
};

export default withStyles(componentStyles)(BarPage);
