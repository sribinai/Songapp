import React from "react";
import { Form } from "react-bootstrap";

const Textarea = ({ title }) => {
  return (
    <div className='input-div'>
      <Form.Label className='title'>{title}</Form.Label>
      <Form.Control
        as='textarea'
        placeholder='Leave a comment here'
        style={{ height: "100px" }}
      />
    </div>
  );
};

export default Textarea;
