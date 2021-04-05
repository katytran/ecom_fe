import * as types from "../constants/cart.constants";
import * as orderTypes from "../constants/order.constants";
import api from "../../api";

const addToCart = (product, quantity) => async (dispatch, getState) => {
  const { name, brand, description, price, images, _id } = { ...product };
  const image = images[0];
  let qty = quantity ? Number(quantity) : 1;

  dispatch({
    type: types.ADD_TO_CART,
    payload: {
      _id,
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

const editCart = (productId, quantity, orderId) => async (
  dispatch,
  getState
) => {
  console.log("prodyct edit", productId);
  if (quantity === 0) {
    dispatch({
      type: types.REMOVE_FROM_CART,
      payload: productId,
    });
  } else {
    dispatch({
      type: types.EDIT_CART,
      payload: {
        _id: productId,
        qty: quantity,
      },
    });
  }
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));

  if (orderId && orderId !== "noId") {
    dispatch({ type: orderTypes.ORDER_DELETE_REQUEST, payload: null });
    try {
      console.log("order id", orderId);
      const res = await api.delete(`/orders/${orderId}`);
      console.log(res);
      dispatch({
        payload: res.data,
        type: orderTypes.ORDER_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({ type: orderTypes.ORDER_DELETE_FAILURE, payload: error });
    }
  }
};

const resetCart = () => async (dispatch) => {
  dispatch({
    type: types.CART_RESET,
  });
  localStorage.removeItem("cart");
};

const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: types.REMOVE_FROM_CART,
    payload: productId,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

const saveAddressForm = (addressForm) => async (dispatch, getState) => {
  dispatch({
    type: types.SAVE_ADDRESS,
    payload: addressForm,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(addressForm));
};

const savePaymentMethod = (paymentType) => async (dispatch, getState) => {
  dispatch({
    type: types.SAVE_PAYMENT_METHOD,
    payload: paymentType,
  });
};

const cartActions = {
  addToCart,
  removeFromCart,
  editCart,
  resetCart,
  saveAddressForm,
  savePaymentMethod,
};
export default cartActions;
