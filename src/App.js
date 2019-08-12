import React from "react";
import "./App.css";
import BarChart from "./components/bar-chart/barChart";
import LineChart from "./components/line-chart/line";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MapPage from "./components/map/map-page";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={MapPage} />
        <Route path="/bar" component={BarChart} />
        <Route path="/line" component={LineChart} />
      </Router>
    </div>
  );
}

export default App;
