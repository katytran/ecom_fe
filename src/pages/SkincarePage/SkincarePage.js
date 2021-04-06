import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import categoryActions from "../../redux/actions/category.actions";
import productActions from "../../redux/actions/product.actions";
import { useDispatch, useSelector } from "react-redux";
import ProductCard2 from "../MakeupPage/ProductCard2";
import ClipLoader from "react-spinners/ClipLoader";

import { css } from "@emotion/core";

const override = css`
  color: red;
  size: small;
`;

function SkincarePage() {
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
        "606c548407f8640ee81086b8"
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
              Moisturizers
              <ul>
                <li
                  onClick={() => {
                    handleClick("moisturizer-skincare");
                  }}
                >
                  Moisturizers
                </li>
                <li
                  onClick={() => {
                    handleClick("cleansing-oil-face-oil");
                  }}
                >
                  Face Oil
                </li>
              </ul>
            </div>
            <div className="category_nav">
              Cleanser
              <ul>
                <li
                  onClick={() => {
                    handleClick("face-wash-facial-cleanser");
                  }}
                >
                  Face Wash
                </li>
                <li
                  onClick={() => {
                    handleClick("exfoliating-scrub-exfoliator");
                  }}
                >
                  Exfoiliators
                </li>
              </ul>
            </div>
            <div className="category_nav">
              Treatment
              <ul>
                <li
                  onClick={() => {
                    handleClick("face-serum");
                  }}
                >
                  Face serums
                </li>
                <li
                  onClick={() => {
                    handleClick("acne-products-acne-cream");
                  }}
                >
                  {`Acnes Care`}
                </li>
              </ul>
            </div>
            <div className="category_nav">
              Eye
              <ul>
                <li
                  onClick={() => {
                    handleClick("eye-treatment-dark-circle-treatment");
                  }}
                >
                  Eye cream
                </li>
              </ul>
            </div>
            <div className="category_nav">
              Mask
              <ul>
                <li
                  onClick={() => {
                    handleClick("face-mask");
                  }}
                >
                  Face Mask
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

export default SkincarePage;
