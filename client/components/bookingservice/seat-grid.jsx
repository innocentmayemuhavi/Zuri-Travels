import React from "react";
import "./index.css";

const GridComponent = ({ seats, bookedSeats }) => {
  const generateLabel = (index) => {
    const rowNumber = Math.ceil(index / 5);
    const baseCharCode = "A".charCodeAt(0);
    const char = String.fromCharCode(baseCharCode + ((index - 1) % 5));
    return `${rowNumber}${char}`;
  };

  const generateGrid = (rows, cols) => {
    const grid = [];

    let cellId = 1;
    for (let i = 0; i < rows / 5; i++) {
      for (let j = 0; j < cols; j++) {
        const label = generateLabel(cellId);
        const isBooked = bookedSeats.includes(label);

        grid.push(
          <div
            key={cellId}
            id={`cell-${cellId}`}
            className={`grid-cell ${isBooked ? "booked" : ""}`}
          >
            {label}
          </div>
        );

        cellId++;
      }
    }
    console.log(grid);

    return grid;
  };

  return (
    <div className="g">
      {generateGrid(seats, 5)} {/* Assuming seats is the number of rows */}
    </div>
  );
};

export default GridComponent;
