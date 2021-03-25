import * as types from "../constants/cartConstants";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case type.ADD_TO_CART:
      const item = payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case type.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };
    default:
      return state;
  }
};
