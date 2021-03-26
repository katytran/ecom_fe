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
        className="product-card d-flex flex-column  align-items-center my-3"
        onClick={handleClick}
      >
        <div className="product-card--wrapper mt-3">
          <img src={product.images[0]} style={{ height: "10em" }} />
          <img
            src={product.images[1]}
            style={{ height: "10em" }}
            className="product-card-img-hover"
          />
        </div>
        <p
          className="text-center pt-2"
          style={{
            fontSize: "14px",
            fontWeight: "700",
            lineHeight: "20px",
            height: "40px",
          }}
        >
          {product.brand}
        </p>
        <p
          className="text-center pt-2"
          style={{
            textTransform: "capitalize",
            fontSize: "small",
            height: "3em",
          }}
        >
          {product.name}
        </p>
      </div>
    </Col>
  );
}

export default ProductCard;
