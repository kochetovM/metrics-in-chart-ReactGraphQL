import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import { NewMeasurement } from "../Features/CurrentMetrics/reducer";

const colors = [
  "rgba(41, 6, 107, 1)",
  "rgba(175, 75, 206, 1)",
  "rgba(219, 76, 178, 1)",
  "rgba(235, 84, 140, 1)",
  "rgba(234, 115, 105, 1)",
  "rgba(240, 165, 143, 1)"
];

const HistoryChart = ({ data }: { data: any }) => {
  if (Object.keys(data).length === 0) {
    return null;
  }
  const yAxes: { id: string; type: string; position: string }[] = [];
  const datalabels = Object.entries(data).map(([key, measurements], i) => {
    yAxes.push({
      id: `y-${key}`,
      type: "linear",
      position: "left"
    });

    return {
      label: key,
      type: "line",
      fill: false,
      data: (measurements as NewMeasurement[]).map(({ at, value }) => ({
        t: at,
        y: value
      })),
      yAxisID: `y-${key}`,
      lineTension: 0.1,
      borderColor: colors[i],
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointHoverRadius: 0,
      pointHoverBorderWidth: 2,
      pointRadius: 2
    };
  });

  return (
    <LineChart
      data={{ datasets: datalabels }}
      options={{
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "linear"
            }
          ],
          yAxes
        }
      }}
    />
  );
};

export default HistoryChart;
