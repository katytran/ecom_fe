import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import categoryActions from "../../redux/actions/category.actions";
import productActions from "../../redux/actions/product.actions";
import { useDispatch, useSelector } from "react-redux";
import ProductCard2 from "./ProductCard2";
import ClipLoader from "react-spinners/ClipLoader";

import { css } from "@emotion/core";

const override = css`
  color: red;
  size: small;
`;

function MakeupPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(categoryActions.getAllCategory());
    dispatch(
      productActions.getAllProduct(
        null,
        null,
        null,
        null,
        "606889389b6a31879419175e"
      )
    );
  }, [dispatch]);

  const handleClick = (term) => {
    const category = categories.find((category) => category.name === term);
    dispatch(productActions.getAllProduct("", "", "", "", category._id));
  };
  return (
    <Container>
      <Row>
        <Col sm={3}>
          <div className="category_wrapper">
            <div className="category_nav">
              Face
              <ul>
                <li
                  onClick={() => {
                    handleClick("foundation-makeup");
                  }}
                >
                  Foundation
                </li>
                <li
                  onClick={() => {
                    handleClick("concealer");
                  }}
                >
                  Concealer
                </li>
              </ul>
            </div>
            <div className="category_nav">
              Eye
              <ul>
                <li
                  onClick={() => {
                    handleClick("eyeshadow-palettes");
                  }}
                >
                  Eye Palettes
                </li>
                <li
                  onClick={() => {
                    handleClick("eyeliner");
                  }}
                >
                  Eyeliner
                </li>
                <li
                  onClick={() => {
                    handleClick("eyebrow-makeup-pencils");
                  }}
                >
                  Eyebrow
                </li>
              </ul>
            </div>
            <div className="category_nav">
              Lip
              <ul>
                <li
                  onClick={() => {
                    handleClick("lipstick");
                  }}
                >
                  Lip Stick
                </li>
                <li
                  onClick={() => {
                    handleClick("lip-gloss");
                  }}
                >
                  Lip Gloss
                </li>
              </ul>
            </div>
            <div className="category_nav">
              Cheek
              <ul>
                <li
                  onClick={() => {
                    handleClick("blush");
                  }}
                >
                  Blush
                </li>
                <li
                  onClick={() => {
                    handleClick("bronzer-makeup");
                  }}
                >
                  Bronzer
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col sm={9}>
          {loading ? (
            <ClipLoader loading={loading} css={override} size={30} />
          ) : (
            <div className="d-flex flex-wrap justify-center ml-5">
              {products.map((product, index) => (
                <ProductCard2 key={index} product={product} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MakeupPage;
