import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavBar/PublicNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage2 from "./pages/LoginPage/LoginPage2";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage2 from "./pages/CartPage2/CartPage2";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage";
import AddressForm from "./components/Checkout/AddressForm";
import PaymentForm from "./components/Checkout/PaymentForm";
import ReviewForm from "./components/Checkout/ReviewForm";
import PaymentProcess from "./components/Checkout/PaymentProcess";
import authActions from "./redux/actions/auth.actions";
import { useDispatch } from "react-redux";
import PaymentSuccess from "./components/Checkout/PaymentSuccess";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderHistoryCard from "./components/OrderHistoryCard/OrderHistoryCard";
import Dashboard from "./components/Admin/Dashboard";
import MakeupPage from "./pages/MakeupPage/MakeupPage";
import ReviewProduct from "./components/ReviewProduct.js/ReviewProduct";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.getCurrentUser());
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
        <Route path="/makeup" element={<MakeupPage />} />

        <Route
          path="makeup/products/:productId"
          element={<DetailProductPage />}
        />

        <Route path="addReview/product/:id" element={<ReviewProduct />} />
        <Route path="/checkout/shipping" element={<AddressForm />} />
        <Route path="/checkout/payment" element={<PaymentForm />} />
        <Route path="/checkout/review" element={<ReviewForm />} />
        <Route
          path="/checkout/order/success/:id"
          element={<PaymentSuccess />}
        />
        <Route path="/checkout/order/:orderId" element={<PaymentProcess />} />
        <Route path="/myorders/:id" element={<OrderHistoryCard />} />
        <Route path="/myorders" element={<OrderHistoryPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
