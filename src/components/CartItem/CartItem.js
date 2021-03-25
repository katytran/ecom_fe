import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartItem() {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        {/* <img src={item.imageUrl} alt={item.name} /> */}
        <img src="https://picsum.photos/200/300" width={100} height={100}></img>
      </div>
      {/* <Link to={`/product/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link> */}
      <p>Foreo</p>
      {/* <p className="cartitem__price">${item.price}</p> */}
      <p>50 usd</p>
      {/* <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select> */}

      <button
        className="cartItem__deleteBtn"
        // onClick={() => removeHandler(item.product)}
      >
        <FontAwesomeIcon icon={faTrash} />
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default CartItem;
