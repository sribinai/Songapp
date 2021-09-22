import React from "react";
import Participants from "../../components/Form/Participants";
import Textarea from "../../components/Form/Textarea";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";
import { Form, Button } from "react-bootstrap";

import "./create-room.styles.css";

const CreateRoom = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Join Room' />
      <div className='create-room-div'>
        <div className='create-room-heading'>
          <h1>Create Room</h1>
          <Button size='lg' className='create-room-button'>
            ROOM ID: THXQL &#128464;
          </Button>
        </div>
        <div className='create-room-inputs'>
          <div className='create-column'>
            <div className='input-div'>
              <Form.Label>Room Name:</Form.Label>
              <div className='text-div'>
                <input type='text' />
                <Button>SAVE</Button>
              </div>
            </div>

            <div className='input-div'>
              <Form.Label> Passcode: </Form.Label>
              <div className='text-div'>
                <input type='text' />
                <Button>&#128464;</Button>
              </div>
            </div>

            <div className='input-div'>
              <Button>GENERATE PASSCODE</Button>
            </div>
          </div>
          <div className='create-column'>
            <Participants title='Number of Participants' />
            <Textarea title='Game Rules' />
          </div>
        </div>
        <div className='create-room-button-div'>
          <Button className='create-room-button' size='lg' variant='primary'>
            CREATE ROOM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
