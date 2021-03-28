import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavBar/PublicNavbar";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
import LoginPage2 from "./pages/LoginPage/LoginPage2";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage2 from "./pages/CartPage2/CartPage2";
import PrivateRoute from "./routes/PrivateRoute";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage";
function App() {
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    localStorage.getItem("cart");
  }, []);
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        {/* <PrivateRoute exact path="/" component={HomePage} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage2 />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage2 />} />
        <Route path="/products/:productId" element={<DetailProductPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
