import React from "react";

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
  const divStyle = {
    position: "fixed",
    // backgroundColor: bgColor,
    color: color,
    // padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
    // borderRadius: `${borderRadius[0]}px ${borderRadius[1]}px ${borderRadius[2]}px ${borderRadius[3]}px`,
    left: `${position[0]}vw`, // left position in percentage
    top: `${position[1]}vh`, // top position in pixels
    minHeight: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 4,
  };
  const textDiv = {
    backgroundColor: textDivColor,
    padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const endDivStyle = {
    width: "20px",
    // height: "100%",
    minHeight: "50px",
    // minHeight: "inherit",
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
      <div style={endDivStyle}>SHOW</div>
    </div>
  );
};

export default FloatingDiv;
