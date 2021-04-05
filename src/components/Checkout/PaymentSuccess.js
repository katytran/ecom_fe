import React from "react";
import "./PaymentSuccess.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="payment">
      <div className="content">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <h1>Payment success !</h1>
            <p>Thank you for your purchase </p>
            <p>you should receive a confirmation email soon </p>
            <button
              className="go-home"
              onClick={() => navigate(`/myorders/${id}`)}
            >
              Check order status
            </button>
          </div>
          <div className="footer-like">
            <p>
              Email not received?
              <a href="#">Click here to send again</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
