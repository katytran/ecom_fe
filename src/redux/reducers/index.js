import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { cartReducer } from "./cart.reducer";
import categoryReducer from "./category.reducer";
import orderReducer from "./order.reducer";
import productReducer from "./product.reducer";
import reviewReducer from "./review.reducer";

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  category: categoryReducer,
  review: reviewReducer,
});
