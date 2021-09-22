import React from "react";
import { Figure } from "react-bootstrap";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiWifiOff } from "react-icons/bi";

import "./avatar-icon.styles.css";

const AvatarIcon = ({ imageUrl, showStatus, statusDetails }) => {
  return (
    <Figure className='avatar-icon-shape'>
      <Figure.Image
        alt='profile-image'
        src={imageUrl}
        className='avatar-icon'
        roundedCircle
      />
      {showStatus && (
        <div
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            fontSize: "20px",
            backgroundColor: "lightgreen",
            borderRadius: "50%",
            height: "25px",
            width: "25px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {statusDetails ? <FaRegCheckCircle /> : <BiWifiOff />}
          {/* <FaRegCheckCircle /> */}
          {/* <BiWifiOff /> */}
          {/* &#128504; */}
        </div>
      )}
    </Figure>
  );
};

export default AvatarIcon;
