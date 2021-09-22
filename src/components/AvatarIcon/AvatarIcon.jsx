import React from "react";
import { Figure } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
// import { FaRegCheckCircle } from "react-icons/fa";
import { BiWifiOff } from "react-icons/bi";

import "./avatar-icon.styles.css";

const AvatarIcon = ({ imageUrl, showStatus, statusDetails }) => {
  return (
    <Figure
      // style={{ height: "100px", width: "100px" }}
      className='avatar-icon-shape'
    >
      <Figure.Image
        height='100px'
        width='100px'
        alt='profile-image'
        src={imageUrl}
        className='avatar-icon'
        roundedCircle
      />
      {showStatus && (
        <div
          className='user-status'
          style={{
            // backgroundColor: statusDetails ? "#05D505" : "#07C9C9",
            backgroundColor: statusDetails ? "#05D505" : "rgb(244, 153, 61)",
          }}
        >
          {statusDetails ? <FaCheck /> : <BiWifiOff />}
          {/* {statusDetails ? <FaRegCheckCircle /> : <BiWifiOff />} */}
        </div>
      )}
    </Figure>
  );
};

export default AvatarIcon;
