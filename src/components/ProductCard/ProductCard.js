import React from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./App.css";

function ProductCard({ product }) {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`products/${product._id}`);
  };
  return (
    <Col xl={2} md={3} sm={4} xs={4}>
      <div
        className="product-card d-flex flex-column justify-content-center align-items-center h-100 my-3"
        onClick={handleClick}
      >
        <div className="product-card--wrapper">
          <img src={product.images[0]} />
          <img src={product.images[1]} className="product-card-img-hover" />
        </div>
        <p
          className="text-center pt-3"
          style={{ fontSize: "14px", fontWeight: "700" }}
        >
          {product.brand}
        </p>
        <p
          className="text-center"
          style={{ textTransform: "capitalize", fontSize: "small" }}
        >
          {product.name}
        </p>
      </div>
    </Col>
  );
}

export default ProductCard;
