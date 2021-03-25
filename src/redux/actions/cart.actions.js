import * as types from "../constants/cart.constants";
import api from "../../api";
import productActions from "../actions/product.actions";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const addToCart = (productId) => async (dispatch, getState) => {
  const dispatch = useDispatch();
  dispatch(productActions.getSingleProduct(productId));
  const loading = useSelector((state) => state.products.loading);
  if (!loading) {
    const product = useSelector((state) => state.products.selectedProduct);
    dispatch({
      type: types.ADD_TO_CART,
      payload: {
        ...product,
      },
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  }
};

const cartActions = {
  addToCart,
};
export default cartActions;
