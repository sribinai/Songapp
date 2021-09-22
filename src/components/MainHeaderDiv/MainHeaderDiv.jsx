import React from "react";
import logo from "../../images/PMPL-LOGO.png";
import { Link } from "react-router-dom";
import "./main-header.styles.css";

const MainHeaderDiv = ({ title, routeName }) => {
  return (
    <div className='main-header'>
      <div>
        <Link to='/'>
          <img src={logo} alt='Logo' className='logo-image' />
        </Link>
      </div>
      <Link to={`${routeName === "Home" ? "/" : routeName}`}>{title}</Link>
    </div>
  );
};

export default MainHeaderDiv;
