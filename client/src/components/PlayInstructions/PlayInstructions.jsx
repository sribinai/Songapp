import React from "react";
import { Modal } from "react-bootstrap";

function PlayInstructionsModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          PLAY MY PLAYLIST
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <i>The rules for the games are as follows:</i>
          <li>Login to your create account.</li>
          <li>Create a room for the players to join.</li>
          <li>
            After the room is created, Join the room using the credentials.
          </li>
          <li>
            After joining, each player must choose a few songe from their side.
          </li>
        </ol>
      </Modal.Body>
    </Modal>
  );
}

export default PlayInstructionsModal;
