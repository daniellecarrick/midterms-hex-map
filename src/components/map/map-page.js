import React, { useState } from "react";
import results from "../../assets/results-top-level.json";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import USMap from "./map";
import StackedBar from "./stackedBar";

// Map from https://github.com/schreiaj/frc-attrition-hex-map
const MapPage = () => {
  const [data, setData] = useState(results.G);
  const [election, setElection] = useState("gov");

  const handleClick = whichRace => {
    if (whichRace === "gov") {
      setData(results.G);
      setElection("gov");
    } else if (whichRace === "sen") {
      setData(results.S);
      setElection("sen");
    }
  };
  return (
    <div>
      <h1>Midterm Election Results</h1>
      <ToggleButtonGroup value={election}>
        <ToggleButton onClick={() => handleClick("gov")} value={"gov"}>
          Governor
        </ToggleButton>
        <ToggleButton onClick={() => handleClick("sen")} value={"sen"}>
          Senate
        </ToggleButton>
      </ToggleButtonGroup>
      <StackedBar data={data} election={election} />
      <USMap data={data} />
    </div>
  );
};

export default MapPage;
