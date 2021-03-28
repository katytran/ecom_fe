import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import productActions from "../redux/actions/product.actions";
import { Container, Row, Jumbotron } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/core";
import queryString from "query-string";
import store from "../redux/store";

function HomePage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const location = useLocation();
  //=> '?foo=bar'
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    console.log("pa", parsed);
    if (parsed.query) {
      dispatch(productActions.getAllProduct(1, 30, parsed.query));
    } else {
      dispatch(productActions.getAllProduct());
    }
  }, [location]);

  const override = css`
    color: red;
  `;

  localStorage.setItem(
    "cart2",
    JSON.stringify(store.getState().cart.cartItems)
  );

  useEffect(() => {
    dispatch(authActions.getCurrentUser(accessToken));
  }, [dispatch, accessToken]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ minHeight: "100vh" }}
    >
      {loading ? (
        <DotLoader size={150} css={override} />
      ) : (
        <div>
          <Row>
            <img src="https://www.sephora.com/contentimages/homepage/030221/Homepage/DesktopMweb/2021-03-15-hp-slide-bestsellers-foundation-us-d-slice.jpg?imwidth=1200"></img>
          </Row>

          <Row>
            {products.map((product) => (
              <ProductCard
                className="d-flex justify-content-center"
                product={product}
              />
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}

export default HomePage;
