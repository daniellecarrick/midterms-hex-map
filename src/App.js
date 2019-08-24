import React from "react";
import "./App.css";
import BarPage from "./components/bar-chart/barPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MapPage from "./components/map/mapPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={MapPage} />
        <Route path="/bar" component={BarPage} />
      </Router>
    </div>
  );
}

export default App;
