import React from "react";
import { Card, CardBody, CardText, CardTitle, CardHeader } from "reactstrap";
import Chart from "react-apexcharts";

// ** Icons Imports
import operaIcons from "@src/assets/images/icons/opera.png";
import safariIcon from "@src/assets/images/icons/apple-safari.png";
import IEIcon from "@src/assets/images/icons/internet-explorer.png";
import chromeIcon from "@src/assets/images/icons/google-chrome.png";
import firefoxIcon from "@src/assets/images/icons/mozila-firefox.png";

const CardBrowserState = ({ percent }) => {
  // Conditional color logic
  let color;
  if (percent < 33) {
    color = "#FF0000"; // Red
  } else if (percent >= 33 && percent <= 66) {
    color = "#FFEB3B"; // Yellow
  } else {
    color = "#4CAF50"; // Green
  }

  const statesArr = [
    {
      value: percent,
      color: color, // Assign the determined color based on the percent
    },
  ];

  const RenderStates = () => {
    return statesArr.map((state) => {
      const chartOptions = {
        chart: {
          type: "radialBar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "40%", // Size of the hollow part in the center
            },
            track: {
              background: "#e0e0e0", // Background color of the track (inactive part)
            },
            dataLabels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: "11px",
                fontWeight: "bold",
                color: state.color, // Color of the value text
                offsetY: 4,
              },
            },
          },
        },
        colors: [state.color], // The color of the progress bar
        series: [state.value], // The percentage value for the progress
        stroke: {
          lineCap: "round", // Round corners for the progress circle
        },
        labels: ["Progress"],
      };

      return (
        <div className="ms-2" style={{ width: "50px", height: "50px" }}>
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="radialBar"
            height={50}
            width={50}
          />
        </div>
      );
    });
  };

  return <RenderStates />;
};

export default CardBrowserState;


