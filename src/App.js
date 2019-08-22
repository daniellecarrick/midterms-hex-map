import React from "react";
import "./App.css";
import BarPage from "./components/bar-chart/bar-page";
import LineChart from "./components/line-chart/line";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MapPage from "./components/map/map-page";

function App({classes}) {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={MapPage} />
        <Route path="/bar" component={BarPage} />
        <Route path="/line" component={LineChart} />
      </Router>
    </div>
  );
}

export default App;
