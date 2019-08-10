import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import State from "./state";
import results from "../../assets/results-top-level.json";

const STATES = [
  { abbr: "AK", name: "Alaska", region: "west" },
  { abbr: "ME", name: "Maine", region: "northeast" },

  { abbr: "VT", name: "Vermont", region: "northeast" },
  { abbr: "NH", name: "New Hampshire", region: "northeast" },

  { abbr: "WA", name: "Washington", region: "west" },
  { abbr: "MT", name: "Montana", region: "west" },
  { abbr: "ND", name: "North Dakota", region: "midwest" },
  { abbr: "MN", name: "Minnesota", region: "midwest" },
  { abbr: "WI", name: "Wisconsin", region: "midwest" },
  { abbr: "MI", name: "Michigan", region: "midwest" },
  { abbr: "NY", name: "New York", region: "northeast" },
  { abbr: "MA", name: "Massachusetts", region: "northeast" },
  { abbr: "RI", name: "Rhode Island", region: "northeast" },

  { abbr: "ID", name: "Idaho", region: "west" },
  { abbr: "WY", name: "Wyoming", region: "west" },
  { abbr: "SD", name: "South Dakota", region: "midwest" },
  { abbr: "IA", name: "Iowa", region: "midwest" },
  { abbr: "IL", name: "Illinois", region: "midwest" },
  { abbr: "IN", name: "Indiana", region: "midwest" },
  { abbr: "OH", name: "Ohio", region: "midwest" },
  { abbr: "PA", name: "Pennsylvania", region: "northeast" },
  { abbr: "NJ", name: "New Jersey", region: "northeast" },
  { abbr: "CT", name: "Connecticut", region: "northeast" },

  { abbr: "OR", name: "Oregon", region: "west" },
  { abbr: "NV", name: "Nevada", region: "west" },
  { abbr: "CO", name: "Colorado", region: "west" },
  { abbr: "NE", name: "Nebraska", region: "midwest" },
  { abbr: "MO", name: "Missouri", region: "midwest" },
  { abbr: "KY", name: "Kentucky", region: "south" },
  { abbr: "WV", name: "West Virgina", region: "south" },
  { abbr: "VA", name: "Virginia", region: "south" },
  { abbr: "MD", name: "Maryland", region: "south" },
  { abbr: "DE", name: "Delaware", region: "south" },

  { abbr: "CA", name: "California", region: "west" },
  { abbr: "UT", name: "Utah", region: "west" },
  { abbr: "NM", name: "New Mexico", region: "west" },
  { abbr: "KS", name: "Kansas", region: "midwest" },
  { abbr: "AR", name: "Arkansas", region: "midwest" },
  { abbr: "TN", name: "Tennessee", region: "south" },
  { abbr: "NC", name: "North Carolina", region: "south" },
  { abbr: "SC", name: "South Carolina", region: "south" },
  { abbr: "DC", name: "District of Columbia", region: "south" },

  { abbr: "AZ", name: "Arizona", region: "west" },
  { abbr: "OK", name: "Oklahoma", region: "south" },
  { abbr: "LA", name: "Louisiana", region: "south" },
  { abbr: "MS", name: "Mississippi", region: "south" },
  { abbr: "AL", name: "Alabama", region: "south" },
  { abbr: "GA", name: "Georgia", region: "south" },

  { abbr: "HI", name: "Hawaii", region: "west" },
  { abbr: "TX", name: "Texas", region: "south" },
  { abbr: "FL", name: "Florida", region: "south" }
];

const STATE_MATRIX = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
];

const USMap = ({ r, indexToggle }) => {
  // Find the max data value (min will always be 0)
  // const valueArray = Object.keys(regionData).map(key => regionData[key]);
  const max = 120;

  // Establish color range
  let colorRange =
    indexToggle === "index"
      ? d3
          .scaleLinear()
          .domain([0, 99, 100, max])
          .range(["#F1F1F1", "#C2C9D1", "#E1D1FE", "#572DF7"])
          .interpolate(d3.interpolateRgb.gamma(2))
      : d3
          .scaleLinear()
          .domain([0, max / 3, max * (2 / 3), max])
          .range(["#F1F1F1", "#C2C9D1", "#E1D1FE", "#572DF7"])
          .interpolate(d3.interpolateRgb.gamma(2));

  // associate each state with the region value from props
  //STATES.forEach(state => (state.dimValue = regionData[state.region]));
  const govResults = results.G;
  console.log('gov results', govResults); 
  STATES.forEach(state => {
    Object.keys(govResults).map(function(race) {
      if(state.name == govResults[race][1]) {
        console.log(state.name, govResults[race][1])
        return state.results = govResults[race][2];
      }
    });
  });

  console.log(STATES);

  // wanted to use d3.group but it wasn't exported?!
//Object.keys(govResults).map((state) => d3.group(govResults[state]));


  let index = -1;

  const PI_SIX = Math.PI / 6;
  const COS_SIX = Math.cos(PI_SIX);
  const SIN_SIX = Math.sin(PI_SIX);
  const xOff = 2 * r * COS_SIX;
  const yOff = 3 * r * SIN_SIX;

  return (
    <g className="state-map" transform={`translate(${xOff},${yOff})`}>
      {STATE_MATRIX.map((row, y) => {
        let rowOffset = (y % 2) * 0.5;
        return row.map((col, x) => {
          if (col !== 0) {
            index++;
            return (
              <State
                stateData={STATES[index]}
                // regionData={regionData[index]} //might not need
                bgColor={colorRange(10)}
                key={`${index}`}
                x={xOff * (x + rowOffset)}
                y={yOff * y}
                r={r}
              />
            );
          } else {
            return null;
          }
        });
      })}
    </g>
  );
};

USMap.propTypes = {
  r: PropTypes.number,
  regionData: PropTypes.shape({
    northeast: PropTypes.number,
    west: PropTypes.number,
    southwest: PropTypes.number,
    midwest: PropTypes.number,
    southeast: PropTypes.number
  }).isRequired,
  indexToggle: PropTypes.oneOf(["index", "composite"])
};

export default USMap;
