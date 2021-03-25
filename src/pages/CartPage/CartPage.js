import React from "react";
import "./CartPage.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartPage() {
  return (
    <Container bsPrefix="container cart">
      <Row>
        <Col md={9}>
          <Row className="align-items-center justify-content-center cart_product">
            <Col lg={3}>
              <img
                src="https://picsum.photos/200/300"
                width={100}
                height={100}
              ></img>
            </Col>
            <Col md={4}>
              <Row>FOREO</Row>
              <Row>
                FOREO featuring Tarte™ - Into The Deep Holiday Hydration Set
              </Row>
              <Row>ITEM 2291979</Row>
            </Col>
            <Col md={2}>
              <select
              // value={item.qty}
              // onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
              // className="cartItem__select"
              >
                {/* {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))} */}
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </Col>
            <Col md={1}>$169.00</Col>
            <button
              className="cartDeleteBtn"
              // onClick={() => removeHandler(item.product)}
            >
              <FontAwesomeIcon icon={faTrash} />
              <i className="fas fa-trash"></i>
            </button>
          </Row>
        </Col>
        <Col lg={3} className="align-items-center justify-content-end">
          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <p>Subtotal 2 items</p>
              <p> Merchandise Subtotal: 5 items</p>
              <p> Shipping & Handling</p>
              <p>Estimated Total $247.00</p>
            </div>
            <div>
              <button>Proceed To Checkout</button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
