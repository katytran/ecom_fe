import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";

// // Components
// import CartItem from "../components/CartItem";

// // Actions
// import { addToCart, removeFromCart } from "../redux/actions/cartActions";

function CartPage2() {
  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  // useEffect(() => {}, []);

  // const qtyChangeHandler = (id, qty) => {
  //   dispatch(addToCart(id, qty));
  // };

  // const removeFromCartHandler = (id) => {
  //   dispatch(removeFromCart(id));
  // };

  // const getCartCount = () => {
  //   return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  // };

  // const getCartSubTotal = () => {
  //   return cartItems
  //     .reduce((price, item) => price + item.price * item.qty, 0)
  //     .toFixed(2);
  // };

  return (
    <>
      <div className="cart_container">
        <div className="cart_container__left">
          <h2>Shopping Cart</h2>

          {/* {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )} */}
          <CartItem />
        </div>

        <div className="cart_container__right">
          <div className="cart_container__info">
            {/* <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p> */}
            <p>Subtotal 2 items</p>
            <p>2</p>
          </div>
          <div>
            <button>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage2;
