import React, { useState } from "react";
import "./App.css";
import EnhancedTable from "./EnhancedTable";
import NewProduct from "./NewProduct";
import ProductList from "./ProductList";
import UserList from "./UserList";

function Dashboard() {
  const [content, setContent] = useState();

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
                <button>Overview</button>
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
        ) : (
          <NewProduct />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
