import * as types from "../constants/cart.constants";
import api from "../../api";
import { toast } from "react-toastify";
import { useEffect } from "react-redux";

const addToCart = (product, quantity) => async (dispatch, getState) => {
  const { name, brand, description, price, images } = { ...product };
  const image = images[0];
  const qty = quantity ? quantity : 1;
  dispatch({
    type: types.ADD_TO_CART,
    payload: {
      name,
      brand,
      description,
      price,
      image,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

const cartActions = {
  addToCart,
};
export default cartActions;
