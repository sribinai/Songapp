import React from "react";
// import waves from "../../images/music_waves.png";
import waves from "../../images/waves.png";
import { Container, Image } from "react-bootstrap";

import "./footer.styles.css";

const FooterComponent = () => {
  return (
    <Container className='footer-div' fluid>
      <Container
        style={{
          width: "350px",
          backgroundColor: "rgb(177, 37, 202)",
          minHeight: "60px",
          marginTop: "20px",
          marginBottom: "10px",
          // border: "1px solid black",
          borderRadius: "10px",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "500",
        }}
      >
        How to Play&nbsp;&nbsp;&#10233;
      </Container>
      <Image className='footer-image' src={waves} alt='music waves' />
    </Container>
  );
};

export default FooterComponent;
