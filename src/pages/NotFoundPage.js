import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  console.log("in not found");
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>404</h1>
          <p>The page you are looking for does not exist.</p>skdasld
        </Col>
      </Row>
    </Container>
  );
};
export default NotFoundPage;
