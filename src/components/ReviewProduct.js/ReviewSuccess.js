import React from "react";
import "./ReviewSuccess.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function ReviewSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="payment">
      <div className="content">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <h1>We have posted your review !</h1>
            <p>Thank you for sharing your thoughts </p>
            <button
              className="go-home"
              onClick={() => navigate(`/products/${id}`)}
            >
              Check product detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSuccess;
