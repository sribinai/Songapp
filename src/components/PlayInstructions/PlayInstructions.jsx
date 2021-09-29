import React from "react";
import { Modal, Button } from "react-bootstrap";





function MyVerticallyCenteredModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            PLAY MY PLAYLIST
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>RULES</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quasi incidunt dolores praesentium. Ipsa laudantium blanditiis velit facilis corrupti tempora! Deleniti aspernatur sunt doloremque quidem rem debitis nihil excepturi ratione aperiam eos nisi exercitationem iste voluptatem placeat, consequuntur, corporis modi sint adipisci obcaecati facilis quo eaque qui! Eveniet, ducimus minus?
          </p>
        </Modal.Body>
        <Modal.Footer>
           <Button onClick={props.onHide}>Close</Button> 
        </Modal.Footer>
      </Modal>
    );
  }
  

export default MyVerticallyCenteredModal;
