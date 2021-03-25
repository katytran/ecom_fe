import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import productActions from "../../redux/actions/product.actions";
import { useParams } from "react-router-dom";
import "./App.css";
import authActions from "../../redux/actions/auth.actions";

function DetailProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const loading = useSelector((state) => state.products.loading);
  console.log("product", product);
  useEffect(() => {
    dispatch(productActions.getSingleProduct(productId));
  }, [productId, dispatch]);

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          <div>{product.brand}</div>
          <div>{product.description}</div>
          <div>{product.categories.map((category) => category.name)}</div>
          <div>
            {product.images.map((image) => (
              <div>
                <img src={image}></img>
                <h1>{image}</h1>
              </div>
            ))}
          </div>
          {/* <div>{imagesArray}</div> */}
        </div>
      )}
    </div>
  );
}

export default DetailProductPage;
