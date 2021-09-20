import React from "react";
import "./main-header.styles.css";

const MainHeaderDiv = ({ title }) => {
  return (
    <div className='main-header'>
      <div>heading</div>
      <div>{title}</div>
    </div>
  );
};

export default MainHeaderDiv;
