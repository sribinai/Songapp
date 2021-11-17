import React from "react";

import "./loading-spinner.styles.css";

const LoadingSpinner = () => {
  return (
    <div>
      <h2>Loading....</h2>
      <div
        style={{
          height: "80px",
          width: "80px",
          border: "4px solid rgb(190, 190, 190, 0.8)",
          borderRadius: "50%",
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
