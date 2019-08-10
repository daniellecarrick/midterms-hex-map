import React from "react";
import PropTypes from "prop-types";
import { Motion, spring, presets } from "react-motion";
import Tooltip from "@material-ui/core/Tooltip";

import withStyles from "react-jss";

const componentStyles = {
  state: {
    fill: "grey",
    stroke: "white",
    strokeWidth: "0.2px"
  },
  stateName: {
    fill: "white",
    stroke: "none",
    fontSize: "2px",
    textAnchor: "middle"
  }
};

const tooltipText = (results) => {
  if(results) {
   return results.map((row, i) => {
      return <p>{row[0]} {row[1]} {(row[3]*100).toFixed(1)}%</p>
    })
  } else {
    return <div>no election</div>
  }
};

const State = ({ data, classes, x = 0, y = 0, r = 10, bgColor }) => {
  const PI_SIX = Math.PI / 6;
  const COS_SIX = Math.cos(PI_SIX);
  const SIN_SIX = Math.sin(PI_SIX);
  //calculates size of hexagon
  let hexPoints = [
    [0, 0 - r].join(","),
    [0 + COS_SIX * r, 0 - SIN_SIX * r].join(","),
    [0 + COS_SIX * r, 0 + SIN_SIX * r].join(","),
    [0, 0 + r].join(","),
    [0 - COS_SIX * r, 0 + SIN_SIX * r].join(","),
    [0 - COS_SIX * r, 0 - SIN_SIX * r].join(",")
  ];
  return (
    <Motion
      defaultStyle={{ xPos: 100 * Math.random(), yPos: 100 * Math.random() }}
      style={{
        xPos: spring(x, presets.gentle),
        yPos: spring(y, presets.gentle)
      }}
    >
      {({ xPos, yPos }) => (
        <Tooltip title={tooltipText(data.results)}>
          <g
            className={classes.state}
            style={{ fill: bgColor }}
            transform={`translate(${x},${y})`}
          >
            <polygon className="background" points={hexPoints.join(" ")} />
            <text className={classes.stateName} transform={`translate(0,1)`}>
              {data.abbr}
            </text>
          </g>
        </Tooltip>
      )}
    </Motion>
  );
};

State.propTypes = {
  r: PropTypes.number,
  data: PropTypes.shape({
    abbr: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string
  }).isRequired,
  bgColor: PropTypes.string
};

export default withStyles(componentStyles)(State);
