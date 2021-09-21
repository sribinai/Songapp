import React from "react";
import logo from "../../images/PMPL-LOGO.png";
import "./main-header.styles.css";

const MainHeaderDiv = ({ title }) => {
  return (
    <div className='main-header'>
      <div>
        <img src={logo} alt='Logo' className='logo-image' />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default MainHeaderDiv;
