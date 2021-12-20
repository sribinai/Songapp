import React from "react";
import { Figure } from "react-bootstrap";
import { FaCheck, FaMicrophoneAlt, FaMicrophoneAltSlash, FaTrophy, FaVideo, FaVideoSlash } from "react-icons/fa";
// import { FaRegCheckCircle } from "react-icons/fa";
import { BiWifiOff } from "react-icons/bi";

import "./avatar-icon.styles.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const AvatarIcon = ({
  AvatarWidth = 100,
  imageUrl,
  showStatus,
  statusDetails = "connected",
  streamButtons,
  streamStatus,
  streamData,
  recieveStream,
  declineStream,
}) => {
  return (
    <Figure
      style={{ height: `${AvatarWidth}px`, width: `${AvatarWidth}px` }}
      className='avatar-icon-shape'
    >
      <Figure.Image
        height={`${AvatarWidth}px`}
        width={`${AvatarWidth}px`}
        alt='profile-image'
        src={imageUrl}
        className='avatar-icon'
        roundedCircle
      />
      {/* <video src="rabbit320.webm" controls>
        <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.webm">link to the video</a> instead.</p>
      </video> */}

      {streamButtons && (
        <span
        className="d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            left: "25px",
            bottom: "10px",
            height: "30px",
            width: "30px",
            border: "1px solid rgb(0,0,0,0.4)",
            borderRadius: "50%",
            backgroundColor: "rgb(250, 100, 100)"
          }}
        >
          {/* <FaMicrophoneAlt /> */}
          <FaMicrophoneAltSlash />
        </span>
      )}
      {streamButtons && (
        <span
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            right: "25px",
            bottom: "10px",
            height: "30px",
            width: "30px",
            border: "1px solid rgb(250,250,250,0.9)",
            borderRadius: "50%",
            backgroundColor: "rgb(100, 200, 100)"
          }}
        >
          <FaVideo />
          {/* <FaVideoSlash /> */}
        </span>
      )}

      {showStatus && (
        <div
          className='user-status'
          style={{
            // backgroundColor: statusDetails ? "#05D505" : "#07C9C9",
            backgroundColor:
              statusDetails === "connected"
                ? "#05D505"
                : statusDetails === "network-issue"
                ? "rgb(244, 153, 61)"
                : statusDetails === "thinking"
                ? "rgb(100,100,200)"
                : statusDetails === "winner" && "rgb(50,50,50, 0.7)",
            color: statusDetails === "winner" && "yellow",
          }}
        >
          {statusDetails === "connected" ? (
            <FaCheck />
          ) : statusDetails === "network-issue" ? (
            <BiWifiOff />
          ) : statusDetails === "thinking" ? (
            <IoChatbubbleEllipsesOutline />
          ) : (
            statusDetails === "winner" && <FaTrophy />
          )}
          {/* {statusDetails ? <FaCheck /> : <BiWifiOff />} */}
          {/* {statusDetails ? <FaRegCheckCircle /> : <BiWifiOff />} */}
        </div>
      )}
    </Figure>
  );
};

export default AvatarIcon;
