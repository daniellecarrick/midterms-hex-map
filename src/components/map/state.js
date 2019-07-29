import React from "react";
import PropTypes from "prop-types";
import { Motion, spring, presets } from "react-motion";

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

const State = ({ stateData, classes, x = 0, y = 0, r = 10, bgColor }) => {
  const PI_SIX = Math.PI / 6;
  const COS_SIX = Math.cos(PI_SIX);
  const SIN_SIX = Math.sin(PI_SIX);
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
        <g
          className={classes.state}
          style={{ fill: bgColor }}
          transform={`translate(${xPos},${yPos})`}
        >
          <polygon className="background" points={hexPoints.join(" ")} />
          <text className={classes.stateName} transform={`translate(0,1)`}>
            {stateData.abbr}
          </text>
        </g>
      )}
    </Motion>
  );
};

State.propTypes = {
  r: PropTypes.number,
  stateData: PropTypes.shape({
    abbr: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string
  }).isRequired,
  bgColor: PropTypes.string
};

export default withStyles(componentStyles)(State);
