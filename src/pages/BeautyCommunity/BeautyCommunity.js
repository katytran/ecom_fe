import React from "react";
import { Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function BeautyCommunity() {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://images.squarespace-cdn.com/content/v1/5b4f9af17e3c3a90849c1df4/1541703123309-LPMVZQV9AYR3IMQM3PH2/ke17ZwdGBToddI8pDm48kAoBnrVNfzz1YwYazzX2jZoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcu3aVcCMhTIR2Mbg725DF47eGkReiuu3AjrmVfU6N_iak2tyZ4kyuYDFvVuXMWEQ1/Screen+Shot+2018-10-24+at+2.42.47+PM.png?format=1500w"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://www.npd.com/wps/wcm/connect/npd/800ccd93-c564-46ea-b1f9-0b526c8641c4/makeup-maquillage-kit-set-palette-brus.jpg?MOD=AJPERES"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://katesfaceattire.files.wordpress.com/2020/11/img_0629.jpg?w=1024"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <hr></hr>
      <Container>
        <Row>Community Blogs</Row>
      </Container>
    </div>
  );
}

export default BeautyCommunity;
