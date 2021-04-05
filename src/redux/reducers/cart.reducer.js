import * as types from "../constants/cart.constants";
// let cartItems = JSON.parse(localStorage.getItem("cart"));
// if (!cartItems) cartItems = [];
const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  addressForm: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentType: null,
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART: {
      const existItem = state.cartItems.find((x) => x.name === payload.name);

      if (existItem) {
        console.log("exist item qty", existItem.qty);
        console.log("payload", payload);
        payload.qty = Number(existItem.qty) + Number(payload.qty);
        console.log("payload new", payload);
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.name === existItem.name ? payload : x
          ),
        };
      } else {
        payload.qty = 1;
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }
    }

    case types.EDIT_CART: {
      const existItem = state.cartItems.find((x) => x._id === payload._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.name === existItem.name ? { ...x, qty: payload.qty } : x
          ),
        };
      }
    }

    case types.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((product) => product._id !== payload),
      };
    case types.SAVE_ADDRESS:
      return {
        ...state,
        addressForm: payload,
      };
    case types.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentType: payload,
      };
    case types.CART_RESET:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
export default cartReducer;
