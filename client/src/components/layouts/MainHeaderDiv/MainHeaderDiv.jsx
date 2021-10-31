import React from "react";
import logo from "../../../images/PMPL-LOGO.png";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./main-header.styles.css";

const MainHeaderDiv = ({ title, routeName, redirectPromt, promptMessage }) => {
  const history = useHistory();
  const promptCall = (path) => {
    Swal.fire({
      title: promptMessage,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const redirectHome = () => {
    if (redirectPromt) {
      promptCall("/");
    } else {
      history.push("/");
    }
  };

  const redirectPage = () => {
    if (redirectPromt) {
      promptCall(routeName);
    } else {
      history.push(routeName);
    }
  };

  return (
    <div className='main-header'>
      <div>
        <img
          src={logo}
          alt='Logo'
          className='logo-image'
          onClick={redirectHome}
        />
      </div>
      <span onClick={redirectPage}>{title}</span>
    </div>
  );
};

export default MainHeaderDiv;
