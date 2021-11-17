import React, { useState } from "react";

const FloatingDiv = ({
  position,
  padding,
  borderRadius,
  bgColor,
  color,
  title,
  textDivColor,
  textColor,
  children,
}) => {
  const [showTextDiv, setShowTextDiv] = useState(true);

  const divStyle = {
    position: "fixed",
    color: color,
    left: `${position[0]}vw`, // left position in percentage
    top: `${position[1]}vh`, // top position in pixels
    minHeight: "40px",
    maxHeight: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 4,
  };
  const textDiv = {
    backgroundColor: textDivColor,
    padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
    height: "100%",
    maxWidth: showTextDiv ? "100%" : "0px",
    display: showTextDiv ? "flex" : "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const endDivStyle = {
    width: "20px",
    position: "relative",
    // height: "100%",
    minHeight: "50px",
    // maxHeight: "inherit",
    backgroundColor: bgColor,
    borderRadius: `${borderRadius[0]}px ${borderRadius[1]}px ${borderRadius[2]}px ${borderRadius[3]}px`,
    color: textColor,
    textAlign: "center",
    writingMode: "vertical-lr",
    textOrientation: "upright",
    letterSpacing: "-4px",
    fontSize: "10px",
    fontWeight: "800",
    cursor: "pointer",
  };
  return (
    <div style={divStyle}>
      <div style={textDiv}>
        <span>{title}</span>
        {children}
      </div>
      <div style={endDivStyle} onClick={() => setShowTextDiv(!showTextDiv)}>
        {showTextDiv ? "HIDE" : "SHOW"}
      </div>
    </div>
  );
};

export default FloatingDiv;
