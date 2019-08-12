import React from "react";
import * as d3 from "d3";
import State from "./state";
import { RED, BLUE, GREY, GREEN } from "../chart-components/colors";

const STATES = [
  { abbr: "AK", name: "Alaska" },
  { abbr: "ME", name: "Maine" },

  { abbr: "VT", name: "Vermont" },
  { abbr: "NH", name: "New Hampshire" },

  { abbr: "WA", name: "Washington" },
  { abbr: "MT", name: "Montana" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "NY", name: "New York" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "RI", name: "Rhode Island" },

  { abbr: "ID", name: "Idaho" },
  { abbr: "WY", name: "Wyoming" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "CT", name: "Connecticut" },

  { abbr: "OR", name: "Oregon" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "WV", name: "West Virgina" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "DE", name: "Delaware" },

  { abbr: "CA", name: "California" },
  { abbr: "UT", name: "Utah" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "DC", name: "District of Columbia" },

  { abbr: "AZ", name: "Arizona" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "AL", name: "Alabama" },
  { abbr: "GA", name: "Georgia" },

  { abbr: "HI", name: "Hawaii" },
  { abbr: "TX", name: "Texas" },
  { abbr: "FL", name: "Florida" }
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

// Map from https://github.com/schreiaj/frc-attrition-hex-map
const USMap = ({ data }) => {
  const r = 6;

  // Establish color range
  let colorRange = d3
    .scaleOrdinal()
    .domain(["GOP", "Dem", "Ind", null])
    .range([RED, BLUE, GREEN, GREY]);

  // associate each state with the race result
  STATES.forEach(state => {
    Object.keys(data).map(function(race) {
      if (state.name == data[race][1]) {
        return (state.results = data[race][2]);
      }
    });
  });

  let index = -1;
  // math to build hexagons
  const PI_SIX = Math.PI / 6;
  const COS_SIX = Math.cos(PI_SIX);
  const SIN_SIX = Math.sin(PI_SIX);
  const xOff = 2 * r * COS_SIX;
  const yOff = 3 * r * SIN_SIX;

  return (
    <div>
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
                        : GREY
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
