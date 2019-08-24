import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import {
  GREY
} from "../../utils/colors";
import Tooltip from "@material-ui/core/Tooltip";
import TooltipText from "../../utils/tooltipText";

const componentStyles = {
  rowContainer: {
    stroke: GREY,
    strokeWidth: "0.5",
    fill: "white"
  },
  BarBase: {
    fill: GREY
  },
  chartLabel: {
    fill: "#333333",
    color: "#333333",
    fontSize: "12px",
    fontWeight: 600,
    textAnchor: "end"
  }
};

const camelCase = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const Bar = ({
  classes,
  dimValue,
  dimName,
  winner,
  runnerup,
  transformRow,
  dimensions,
  gapColor,
  x
}) => {
  return (
    <g transform={`translate(0,${transformRow})`}>
      {dimValue ? (
        <>
          <text
            className={classes.chartLabel}
            transform={`translate(${dimensions.marginLeft - 6},0)`}
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
                segment={winner * 100}
                benchmark={runnerup * 100}
                difference={dimValue}
                gapColor={gapColor}
              />
            }
          >
            <g transform={`translate(${dimensions.marginLeft},0)`}>
              <rect
                className={classes.rowContainer}
                x={x(0)}
                y={0}
                width={x(1)}
                height={20}
              />
              <rect
                className={classes.BarBase}
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
                x={dimensions.innerWidth + dimensions.marginRight}
                dy={"13px"}
              >
                {(dimValue * 100).toFixed(1)}
              </text>
            </g>
          </Tooltip>
        </>
      ) : null}
    </g>
  );
};

Bar.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.object,
  dimensions: PropTypes.object,
  runnerup: PropTypes.number,
  winner: PropTypes.number,
  dimName: PropTypes.string,
  gapColor: PropTypes.string,
  transformRow: PropTypes.number,
};

export default withStyles(componentStyles)(Bar);