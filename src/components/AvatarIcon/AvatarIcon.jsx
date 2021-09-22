import React from "react";
import { Figure } from "react-bootstrap";
import { FaRegCheckCircle } from "react-icons/fa";
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
            backgroundColor: statusDetails
              ? "rgb(64, 241, 64)"
              : "rgb(244, 153, 61)",
          }}
        >
          {statusDetails ? <FaRegCheckCircle /> : <BiWifiOff />}
        </div>
      )}
    </Figure>
  );
};

export default AvatarIcon;
