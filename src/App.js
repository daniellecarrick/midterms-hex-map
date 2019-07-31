import React from 'react';
import './App.css';
import USMap from "./components/map/map";
import BarChart from "./components/bar-chart/bar";
import withStyles from "react-jss";


function App() {
  return (
    <div className="App">
      <BarChart />
      {/* <div className={classes.map}>
      <svg>
      <USMap />
      </svg>
      </div> */}

    </div>
  );
}

export default App;
