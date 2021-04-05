import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartProduct from "../../components/CartProduct/CartProduct";
import cartActions from "../../redux/actions/cart.actions";
import LoginCheckout from "../LoginPage/LoginCheckout";
function CartPage2() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const cart = useSelector((state) => state.cart.cartItems);

  const getTotalItems = () => {
    return cart.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cart
      .reduce((price, product) => price + product.price * product.qty, 0)
      .toFixed(2);
  };

  const handlePopup = () => {
    isAuthenticated ? navigate("/checkout/shipping") : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isAuthenticated && open) navigate("/checkout/shipping");

  return (
    <>
      <div className={open ? "open" : "close"}>
        <button onClick={handleClose} className={open ? "btn_open" : "close"}>
          x
        </button>
        <LoginCheckout />
      </div>
      <div className="cart_container">
        <div className="cart_container__left">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <div>
              Your basket is currently empty.{" "}
              <button>
                <Link to="/">Shop new arrivals</Link>
              </button>
            </div>
          ) : (
            cart.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))
          )}
          <CartProduct />
        </div>

        <div className="cart_container__right">
          <div className="cart_container__info">
            <p>Total: {getTotalItems()} items</p>
            <p>Subtotal: ${getCartSubTotal()}</p>
            <p> Tax: TBD </p>
            <p>Estimated Total: ${getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={handlePopup}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage2;
