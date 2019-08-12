import React from "react";
import results from "../../assets/results-top-level.json";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import USMap from "./map";
import StackedBar from "./stackedBar";

// Map from https://github.com/schreiaj/frc-attrition-hex-map
const MapPage = ({}) => {
  return (
    <div>
      <h1>Governor Election Results</h1>
      <StackedBar data={results.G} />
      <ToggleButtonGroup>
        <ToggleButton>Governor</ToggleButton>
        <ToggleButton>Senate</ToggleButton>
      </ToggleButtonGroup>
      <USMap data={results.G} />
    </div>
  );
};

export default MapPage;
