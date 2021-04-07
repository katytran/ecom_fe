import React, { useState, useEffect } from "react";
import "./App.css";
import NewProduct from "./NewProduct";
import OrderList from "./OrderList";
import ProductList from "./ProductList";
import UserList from "./UserList";

function Dashboard() {
  const [content, setContent] = useState("ProductList");

  return (
    <div className="dashboard">
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
            <li class="sidebar-brand">
              <div>
                <button>Admin Dash Board</button>
              </div>
            </li>
            <li>
              <div>
                <button onClick={() => setContent("ProductList")}>
                  Product Lists
                </button>
              </div>
            </li>
            <li>
              <div>
                <button onClick={() => setContent("UserList")}>
                  User Lists
                </button>
              </div>
            </li>
            <li>
              <div>
                <button onClick={() => setContent("NewProduct")}>
                  Create New Product
                </button>
              </div>
            </li>
            <li>
              <div>
                <button onClick={() => setContent("OrderList")}>
                  Order List
                </button>
              </div>
            </li>
            <li>
              <div>
                <button>About</button>
              </div>
            </li>
          </ul>
        </div>
        {content === "ProductList" ? (
          <ProductList />
        ) : content === "UserList" ? (
          <UserList />
        ) : content === "OrderList" ? (
          <OrderList />
        ) : (
          <NewProduct />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
