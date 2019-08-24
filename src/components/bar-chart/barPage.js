import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import results from "../../assets/results-top-level.json";
import BarChart from "./barChart";

const componentStyles = {
  chartContainer: {
    fontFamily: "monospace",
    display: "flex",
    flexDirection: "column"
  }
};

const BarPage = ({ classes }) => {
  return (
    <div className={classes.chartContainer}>
      <h1>Gap between winner and loser</h1>
      <h5>Gubernatorial Race</h5>
      <BarChart data={results.G} />
    </div>
  );
};

BarPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(componentStyles)(BarPage);
