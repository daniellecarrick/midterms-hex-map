import React from "react";
import "./App.css";
import USMap from "./components/map/map";
import BarChart from "./components/bar-chart/bar";
import LineChart from "./components/line-chart/line";
import withStyles from "react-jss";

function App() {
  const RADIUS = 6;
  return (
    <div className="App">
      <BarChart />
      <svg id="main-map" viewBox={`0 0 ${23 * RADIUS} ${13 * RADIUS}`}>
        <USMap r={RADIUS} />
      </svg>
      <LineChart />
    </div>
  );
}

export default App;
