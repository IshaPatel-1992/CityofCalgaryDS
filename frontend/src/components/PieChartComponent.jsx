import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PieChartComponent = ({ communityName }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (communityName) {
      fetch(
        `/api/crimedata/byCrimeType?community=${encodeURIComponent(
          communityName
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Error while getting crimedata grouped by crime type "
            );
          }
          return response.json();
        })
        .then((data) => {
          const crimeTypes = data.map((entry) => entry._id);
          const counts = data.map((entry) => entry.totalCrimeCount);

          setChartData({
            labels: crimeTypes,
            datasets: [
              {
                label: "Crime Types",
                data: counts,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                  "#FF9F40",
                  "#e6194b",
                  "#3cb44b",
                  "#ffe119",
                  "#4363d8",
                  "#f58231",
                  "#911eb4",
                  "#46f0f0",
                  "#f032e6",
                  "#bcf60c",
                  "#fabebe",
                  "#008080",
                  "#e6beff",
                  "#9a6324",
                  "#fffac8",
                  "#800000",
                  "#aaffc3",
                  "#808000",
                  "#ffd8b1",
                  "#000075",
                  "#808080",
                  "#ffffff",
                  "#000000",
                ],
              },
            ],
          });
        })
        .catch((error) =>
          console.error("Error fetching pie chart data:", error)
        );
    }
  }, [communityName]);

  return chartData ? (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
      }}
    />
  ) : (
    <p>Loading pie chart...</p>
  );
};

export default PieChartComponent;
