import React from "react";
import { mapColorObj } from "../utils/constants";

const LegendComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px", // Adds spacing between items
      }}
    >
      {mapColorObj.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
            flex: "1 1 calc(25% - 10px)", // Adjusts width to fit at most 5 items in a row
          }}
        >
          <div
            style={{
              width: "40px",
              height: "10px",
              backgroundColor: item.color,
              marginRight: "5px",
              border: "1px solid #000",
            }}
          ></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default LegendComponent;
