import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ communityName }) => {
  const [chartData, setChartData] = useState(null);
  const [viewMode, setViewMode] = useState("chart"); // State to control the view mode (chart or table)
  const [selectedYear, setSelectedYear] = useState(null); // State for the selected year
  const [monthlyData, setMonthlyData] = useState(null); // State for monthly data based on selected year

  useEffect(() => {
    if (communityName) {
      fetch(`/api/crimedata/byYear?community=${encodeURIComponent(communityName)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while getting crimedata grouped by year ");
          }
          return response.json();
        })
        .then((data) => {
          const years = data.map((entry) => entry._id);
          const counts = data.map((entry) => entry.totalCrimeCount);

          setChartData({
            labels: years,
            datasets: [
              {
                label: "Crime Count by Year",
                data: counts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
            rawData: data, // Store raw data for table view
          });
        })
        .catch((error) => console.error("Error fetching bar chart data:", error));
    }
  }, [communityName]);

  return (
    <div>
      {communityName && <h3>Community: {communityName}</h3>}

      {/* Buttons to switch between chart and table view */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setViewMode("chart")}>View Chart</button>
        <button onClick={() => setViewMode("table")}>View Table</button>
      </div>

      {/* Conditionally render chart or table based on viewMode */}
      {viewMode === "chart" && chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Year" } },
              y: { title: { display: true, text: "Crime Count" }, beginAtZero: true },
            },
          }}
        />
      ) : viewMode === "table" && chartData ? (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Crime Count</th>
            </tr>
          </thead>
          <tbody>
            {chartData.rawData.map((entry) => (
              <tr key={entry._id}>
                <td>{entry._id}</td>
                <td>{entry.totalCrimeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BarChartComponent;
