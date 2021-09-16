import React from "react";
// import waves from "../../images/music_waves.png";
import waves from "../../images/waves.png";
import { Container, Image } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <Container
      fluid
      style={{
        margin: "0",
        padding: "0",
        width: "100%",
        position: "relative",
        bottom: "0",
        // backgroundColor: "red",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          width: "350px",
          backgroundColor: "rgb(177, 37, 202)",
          minHeight: "60px",
          marginTop: "30px",
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
      <Image
        src={waves}
        alt='music waves'
        style={{
          margin: "0",
          padding: "0",
          height: "100px",
          width: "100%",
          //   position: "fixed",
          //   bottom: "20px",
        }}
      />
    </Container>
  );
};

export default FooterComponent;
