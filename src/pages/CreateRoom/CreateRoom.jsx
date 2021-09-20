import React from "react";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";

import "./create-room.styles.css";

const CreateRoom = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Join Room' />
      <div className='create-room-div'>
        <div className='create-room-inputs'>
          <div className='create-column1'></div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
