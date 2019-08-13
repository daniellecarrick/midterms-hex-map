import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import {
  SECONDARY,
  PRIMARY,
  HIGHLIGHT,
  OPPORTUNITY
} from "../chart-components/colors";
import Tooltip from "@material-ui/core/Tooltip";
import TooltipText from "../chart-components/tooltipText";

const componentStyles = {
  indexAxis: {
    stroke: "#979797",
    strokeWidth: 0.5
  },
  rowContainer: {
    stroke: SECONDARY,
    strokeWidth: "0.5",
    fill: PRIMARY
  },
  indexBarPositive: {
    fill: HIGHLIGHT
  },
  indexBarBase: {
    fill: "#979797"
  },
  opportunity: {
    fill: OPPORTUNITY
  },
  chartLabel: {
    fill: SECONDARY,
    color: SECONDARY,
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
  segmentValue,
  benchmarkValue,
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
                segment={segmentValue}
                benchmark={benchmarkValue}
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
                width={x(100)}
                height={20}
              />
              <rect
                className={classes.indexBarBase}
                x={x(0)}
                y={0}
                width={x(Math.min(segmentValue, benchmarkValue))}
                height={20}
              />
              <rect
                fill={gapColor}
                x={x(Math.min(segmentValue, benchmarkValue))}
                y={0}
                width={Math.abs(dimValue)}
                height={20}
              />
              <text
                className={classes.chartLabel}
                y={0}
                x={innerWidth + margin.right}
                dy={"13px"}
              >
                {dimValue.toFixed(1)}
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
