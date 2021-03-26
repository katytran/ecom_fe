import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import productActions from "../../redux/actions/product.actions";
import { useParams } from "react-router-dom";
import "./App.css";
import authActions from "../../redux/actions/auth.actions";
import DetailProduct from "../../components/DetailProduct/DetailProduct";

function DetailProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    console.log("get single");
    dispatch(productActions.getSingleProduct(productId));
  }, [productId, dispatch]);

  return (
    <div>
      {!product ? <div>loading</div> : <DetailProduct product={product} />}
    </div>
  );
}

export default DetailProductPage;
