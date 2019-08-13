import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import {
  GREY
} from "../chart-components/colors";
import Tooltip from "@material-ui/core/Tooltip";
import TooltipText from "../chart-components/tooltipText";

const componentStyles = {
  rowContainer: {
    stroke: GREY,
    strokeWidth: "0.5",
    fill: "white"
  },
  indexBarBase: {
    fill: GREY
  },
  chartLabel: {
    fill: GREY,
    color: GREY,
    fontSize: "12px",
    fontWeight: 600,
    textAnchor: "end"
  }
};

const camelCase = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const IndexBar = ({
  classes,
  dimValue,
  dimName,
  winner,
  runnerup,
  transformRow,
  margin,
  innerWidth,
  gapColor,
  x
}) => {
  return (
    <g transform={`translate(0,${transformRow})`}>
      {dimValue ? (
        <>
          <text
            className={classes.chartLabel}
            transform={`translate(${margin.left - 6},0)`}
            y={0}
            dy={"13px"}
          >
            {camelCase(dimName)}
          </text>
          <Tooltip
            placement={"right"}
            title={
              <TooltipText
                dimName={dimName}
                segment={winner*100}
                benchmark={runnerup*100}
                difference={dimValue}
                gapColor={gapColor}
              />
            }
          >
            <g transform={`translate(${margin.left},0)`}>
              <rect
                className={classes.rowContainer}
                x={x(0)}
                y={0}
                width={x(1)}
                height={20}
              />
              <rect
                className={classes.indexBarBase}
                x={x(0)}
                y={0}
                width={x(Math.min(winner, runnerup))}
                height={20}
              />
              <rect
                fill={gapColor}
                x={x(Math.min(winner, runnerup))}
                y={0}
                width={x(dimValue)}
                height={20}
              />
              <text
                className={classes.chartLabel}
                y={0}
                x={innerWidth + margin.right}
                dy={"13px"}
              >
                {(dimValue*100).toFixed(1)}
              </text>
            </g>
          </Tooltip>
        </>
      ) : null}
    </g>
  );
};

IndexBar.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.object,
  dimValue: PropTypes.number,
  transformRow: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number
  }),
  innerWidth: PropTypes.number
};

export default withStyles(componentStyles)(IndexBar);
