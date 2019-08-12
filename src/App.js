import React from "react";
import "./App.css";
import USMap from "./components/map/map";
import BarChart from "./components/bar-chart/barChart";
import LineChart from "./components/line-chart/line";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={USMap} />
        <Route path="/bar" component={BarChart} />
        <Route path="/line" component={LineChart} />
      </Router>
    </div>
  );
}

export default App;
