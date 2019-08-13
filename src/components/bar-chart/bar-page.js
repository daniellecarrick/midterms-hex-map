import React from "react";
import results from "../../assets/results-top-level.json";
import BarChart from "./barChart";

const BarPage = () => {
  console.log("results", results);
  return (
    <div>
      <h1>Bar Chart</h1>
      <BarChart data={results.G} colors={["red", "blue"]} />
    </div>
  );
};

export default BarPage;
