import React from "react";
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

const RED = "#C8252C";
const BLUE = "#005BAA";
const GRAY = "#ececec";

// Map from https://github.com/schreiaj/frc-attrition-hex-map
const USMap = ({}) => {
  const r = 6;
  // Establish color range
  let colorRange = d3
    .scaleOrdinal()
    .domain(["GOP", "Dem", null])
    .range([RED, BLUE, GRAY]);

  // associate each state with the race result
  const govResults = results.G;
  STATES.forEach(state => {
    Object.keys(govResults).map(function(race) {
      if (state.name == govResults[race][1]) {
        return (state.results = govResults[race][2]);
      }
    });
  });

  let index = -1;

  const PI_SIX = Math.PI / 6;
  const COS_SIX = Math.cos(PI_SIX);
  const SIN_SIX = Math.sin(PI_SIX);
  const xOff = 2 * r * COS_SIX;
  const yOff = 3 * r * SIN_SIX;

  return (
    <div>
      <h1>Governor Election Results</h1>
    <svg id="main-map" viewBox={`0 0 ${23 * r} ${13 * r}`}>
      <g className="state-map" transform={`translate(${xOff},${yOff})`}>
        {STATE_MATRIX.map((row, y) => {
          let rowOffset = (y % 2) * 0.5;
          return row.map((col, x) => {
            if (col !== 0) {
              index++;
              return (
                <State
                  data={STATES[index]}
                  bgColor={
                    STATES[index].results
                      ? colorRange(STATES[index].results[0][2])
                      : "grey"
                  }
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
    </svg>
    </div>
  );
};

export default USMap;
