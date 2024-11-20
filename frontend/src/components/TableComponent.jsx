import React from "react";
import './TableComponent.css';

const TableComponent = ({ data, xaxisText }) => {
  return (
    <div className="table-container">
    <table className="styled-table">
      <thead>
        <tr>
          <th>{xaxisText}</th>
          <th>Crime Count</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry._id}>
            <td>{entry._id}</td>
            <td>{entry.totalCrimeCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TableComponent;
