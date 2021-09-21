import React from "react";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";
import { Form, Button } from "react-bootstrap";

import "./create-room.styles.css";

const CreateRoom = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Join Room' />
      <div className='create-room-div'>
        <div className='create-room-inputs'>
          <div className='create-column1'>
          {
          
          <div className="buttons">
               <h1>Create Room</h1>
              <Button variant="primary" type="submit">ROOM ID: THXQL ❏</Button>
             
            
          </div>
        }
          {
          
          <div classname="inputs">
             <label>Room Name:</label>
               <input type="text" name="save" className="text1" />
               <Button variant="primary" type="submit" className="save">SAVE</Button>
             
          </div>
        }
           
          { 

         <div className="buttons2">
           <div className="pass">
           <label> Passcode:  </label>
           </div>
             <input type="text" name="copy" className="text2" />
             <Button variant="primary" type="submit" className="copy">❏</Button>
           
          </div>
          }
          
          { 

          <div className="buttons">
          <Button variant="primary" type="submit" className="btn1">GENERATE PASSCODE</Button>
          
          </div>
          }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
