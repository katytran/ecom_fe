import * as types from "../constants/cart.constants";
const cartItems = JSON.parse(localStorage.getItem("cart"));
const initialState = {
  cartItems: cartItems || [],
  total: cartItems.reduce((total, item) => total + item.qty, 0) || 0,
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART:
      const existItem = state.cartItems.find((x) => x.name === payload.name);
      let sum = 0;
      for (let i of state.cartItems) {
        console.log("i", i);
        sum += i.qty;
      }

      // {name: B, q: 1}
      // cartItems : [{name: B, q:1}, {name: A, q: 5},{name: C, q: 5} ]

      if (existItem) {
        payload.qty = existItem.qty + 1;
        console.log("sume", sum + 1);
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? payload : x
          ),
          total: state.total + 1,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
          total: state.total + 1,
        };
      }
    case types.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.name !== payload),
      };
    default:
      return state;
  }
};
export default cartReducer;
