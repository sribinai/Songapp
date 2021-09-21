import React from "react";
import Participants from "../../components/Form/Participants";
import Textarea from "../../components/Form/Textarea";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";

import "./create-room.styles.css";

const CreateRoom = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Join Room' />
      <div className='create-room-div'>
        <div className='create-room-inputs'>
          <div className='create-column'>svsj</div>
          <div className='create-column'>
            <Participants title='Number of Participants' />
            <Textarea title='Game Rules' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
