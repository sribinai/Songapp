import React, { useState } from "react";

import { ToastContainer, Toast } from "react-bootstrap";
// import { render } from "react-router-dom";
import { render } from "react-dom";

export const NotifyToast = ({ title, message, type }) => {
  let bgColor = "white";
  const [show, setShow] = useState(true);

  if (type === "success") bgColor = "#45f754";
  else if (type === "warning") bgColor = "#fcbf30";
  else if (type === "error") bgColor = "#ff475a";

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={5000}
      autohide
      style={{ backgroundColor: bgColor }}
    >
      <Toast.Header style={{ backgroundColor: bgColor }}>
        <strong className='me-auto'>{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export const NotifyToastContainer = ({ title, message, type }) => {
  return (
    <ToastContainer
      style={{ position: "fixed", right: "4px", top: "80px", height: "100vh" }}
    >
      <NotifyToast title={title} message={message} type={type} />
    </ToastContainer>
  );
};
