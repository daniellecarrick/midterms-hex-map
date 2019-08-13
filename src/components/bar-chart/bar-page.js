import React from "react";
import results from "../../assets/results-top-level.json";
import BarChart from "./barChart";

const BarPage = () => {
  return (
    <div>
      <h1>Gap between winner and loser</h1>
      <h5>Gubernatorial Race</h5>
      <BarChart data={results.G} colors={["red", "blue"]} />
    </div>
  );
};

export default BarPage;
