import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import productActions from "../redux/actions/product.actions";
import { Container, Row, Jumbotron } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";

function HomePage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(authActions.getCurrentUser(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    dispatch(productActions.getAllProduct());
  }, []);

  return (
    <Container className="d-flex justify-content-center">
      {loading ? (
        <h1>isLoading</h1>
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
