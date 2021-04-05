import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import productActions from "../redux/actions/product.actions";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/core";
import queryString from "query-string";
import PaginationBar from "../components/Pagination";

function HomePage() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const totalPages = useSelector((state) => state.products.totalPages);
  const limit = 12;
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const location = useLocation();
  //=> '?foo=bar'
  useEffect(() => {
    const parsed = queryString.parse(location.search);

    if (parsed.query) {
      dispatch(productActions.getAllProduct(pageNum, limit, parsed.query));
    } else {
      dispatch(productActions.getAllProduct(pageNum, limit));
    }
  }, [location, pageNum, limit, dispatch]);

  const override = css`
    color: red;
  `;

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
          <PaginationBar
            className=".pagination_color "
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
          />
          <Row>
            {products.map((product, index) => (
              <ProductCard
                key={index}
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
