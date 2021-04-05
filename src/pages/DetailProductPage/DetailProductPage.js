import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../redux/actions/product.actions";
import { useParams } from "react-router-dom";
import "./App.css";
import DetailProduct from "../../components/DetailProduct/DetailProduct";
import ClipLoader from "react-spinners/ClipLoader";

function DetailProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    dispatch(productActions.getSingleProduct(productId));
  }, [productId, dispatch]);

  return (
    <div>
      {!product ? (
        <ClipLoader size={30} />
      ) : (
        <DetailProduct product={product} />
      )}
    </div>
  );
}

export default DetailProductPage;
