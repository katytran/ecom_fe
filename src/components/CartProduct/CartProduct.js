import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import cartActions from "../../redux/actions/cart.actions";
function CartProduct({ product }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  let orderId = !order ? "noId" : order._id;

  const qtyChangeHandler = (productId, qty, orderId) => {
    console.log(orderId);
    dispatch(cartActions.editCart(productId, qty, orderId));
  };

  const removeFromCart = (productId) => {
    dispatch(cartActions.removeFromCart(productId));
  };

  return (
    <>
      {!product ? (
        <div></div>
      ) : (
        <div className="cartproduct">
          <div className="cartproduct__image">
            <img
              src={product.image}
              alt={product.name}
              width={120}
              height={120}
            />
          </div>

          <Link
            to={`/makeup/products/${product._id}`}
            className="cartproduct__name"
          >
            <p>{product.name}</p>
          </Link>

          <p className="cartproduct__price">${product.price}</p>

          <select
            disabled={product.countInStock === 0}
            value={product.qty}
            onChange={(e) =>
              qtyChangeHandler(product._id, e.target.value, orderId)
            }
            className="cartproduct__select"
          >
            {/* {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))} */}

            <option value="">--</option>
            {(() => {
              const options = [];
              for (let i = 1; i <= 10; i++) {
                options.push(<option value={i}>{i}</option>);
              }
              return options;
            })()}
          </select>

          <div
            className="cartproduct__deleteBtn"
            onClick={() => removeFromCart(product._id)}
          >
            <FontAwesomeIcon icon={faMinusSquare} />
          </div>
        </div>
      )}
    </>
  );
}

export default CartProduct;
