import classNames from "classnames";
import "./index.css";

import React from "react";

const Loading = ({ color = "green", className, style }) => {
  const circles = [...Array(8)].map((_, index) => {
    return (
      <div key={index}>
        <div className="div-after" style={{ background: color }}></div>
      </div>
    );
  });

  return (
    <main className="loader-div">
      <div className="lds-roller" style={{ ...style }}>
        {circles}
      </div>
    </main>
  );
};

export default Loading;
