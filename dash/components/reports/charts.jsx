import TransactionChart from "../charts/bar";
import React from "react";
import "./index.css";

const ChartsReport = () => {
  const printChart = () => {
    window.print();
  };

  return (
    <main className="fade">
      <h2>Weekly Transaction Chart</h2>
      <TransactionChart />
      <button className="button" onClick={printChart}>
        Print Chart
      </button>
    </main>
  );
};

export default ChartsReport;
