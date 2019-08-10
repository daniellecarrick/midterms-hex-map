import React, { useRef } from "react";
//import PropTypes from "prop-types";
import withStyles from "react-jss";
import useElementSize from "../../hooks/useElementSize";
import * as d3 from "d3";

const componentStyles = {
  sectionContainer: {
    color: "red",
    display: "flex"
  },
  container: {
    flex: "1 1 0",
    textAlign: "center"
  },
  measureName: {
    fontSize: "16px"
  },
  measureValue: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "0px"
  },
  line: {
    stroke: "tomato",
    strokeWidth: "2"
  },
  lineChartContainer: {
    margin: "0 -20px",
    width: "100%"
  }
};

const trendData = [
  {
    date: "01-01-2019",
    value: 50
  },
  {
    date: "01-08-2019",
    value: 105
  },
  {
    date: "01-15-2019",
    value: 89
  },
  {
    date: "01-22-2019",
    value: 101
  },
  {
    date: "01-29-2019",
    value: 108
  },
  {
    date: "02-05-2019",
    value: 90
  },
  {
    date: "02-12-2019",
    value: 104
  },
  {
    date: "02-19-2019",
    value: 120
  },
  {
    date: "02-26-2019",
    value: 108
  },
  {
    date: "03-05-2019",
    value: 200
  }
];

const data = [
  {
    measureName: "Weekly Visits",
    value: 1200450
  },
  {
    measureName: "Repeat Visits",
    value: 515234
  }
];

const height = 60;
const margin = { top: 0, right: 0, bottom: 0, left: 0 };

// Can change the time parser based on the data we get. Right now assums '01-01-2001' format
const parseTime = d3.timeParse("%m-%d-%Y");

// set up x scale
const x = d3.scaleTime().domain(d3.extent(trendData, d => parseTime(d.date)));

const y = d3
  .scaleLinear()
  .domain(d3.extent(trendData, d => d.value))
  .nice()
  .range([height - margin.bottom, margin.top]);

// line generator
const line = d3
  .line()
  .curve(d3.curveBasis)
  .x(d => x(parseTime(d.date)))
  .y(d => y(d.value));

const formatNumbers = num => {
  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num > 100000) {
    return `${(num / 1000).toFixed(0)}K`;
  } else {
    return num.toFixed(0);
  }
};

const LineChart = ({ classes }) => {
  //set box height to box width
  const containerEl = useRef(null);
  const size = useElementSize(containerEl);

  // can't set range outside of the component bc of useElementSize hook
  x.range([margin.left, size.width - margin.right + 40]);

  return (
    <div>
      <div ref={containerEl} className={classes.lineChartContainer}>
        <svg width={size.width + 40} height={height} style={{ fill: "none" }}>
          <g className={classes.line}>
            <path d={line(trendData)} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default withStyles(componentStyles)(LineChart);
