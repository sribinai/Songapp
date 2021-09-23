import React from "react";
import { Container, Button } from "react-bootstrap";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";
import LinkSong from "../../components/Display/LinkSong";

import "./join-room.styles.css";

const JoinRoom = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Exit Room' routeName='Home' />
      <div className='px-5 py-3 d-flex flex-column align-items-center' fluid>
        <div
          className='d-flex justify-content-between align-items-center'
          style={{ width: "100%" }}
        >
          <div>
            <AvatarIcon imageUrl='https://robohash.org/9?set=set2' />
          </div>
          <div>
            <Button size='lg' style={{ height: "50px", width: "180px" }}>
              HOW TO PLAY
            </Button>
          </div>
        </div>
        <Container
          className='p-4'
          style={{ backgroundColor: "rgb(255, 210, 210)" }}
        >
          <div className='profile-icons-div'>
            <AvatarIcon
              imageUrl='https://robohash.org/10?set=set2'
              statusDetails={true}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/11?set=set2'
              statusDetails={false}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/12?set=set2'
              statusDetails={true}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/13?set=set2'
              statusDetails={false}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/14?set=set2'
              statusDetails={false}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/15?set=set2'
              statusDetails={true}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/16?set=set2'
              statusDetails={true}
              showStatus={true}
            />
          </div>
        </Container>
      </div>
      <LinkSong />
    </div>
  );
};

export default JoinRoom;
