import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { cartReducer } from "./cart.reducer";
import productReducer from "./product.reducer";

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});
