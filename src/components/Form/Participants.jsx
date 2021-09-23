import React from "react";
import { Form } from "react-bootstrap";

const Participants = ({ title }) => {
  return (
    <div className='input-div'>
      <Form.Label className='title'>{title}</Form.Label>
      <Form.Select>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
      </Form.Select>
    </div>
  );
};

export default Participants;
