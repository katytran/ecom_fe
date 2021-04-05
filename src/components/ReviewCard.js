import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import reviewActions from "../redux/actions/review.actions";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  return (
    <Container className="py-1">
      {!review ? (
        <div>....</div>
      ) : (
        <div class="review_card">
          <div>
            <p>time</p>
            <p class="card-text">{review.user.name}</p>
            <p class="card-text">{review.rating} stars</p>
          </div>
          <div>
            <h5 class="card-title">{review.title}</h5>
            <p class="card-text">{review.body}</p>
          </div>
        </div>
      )}
    </Container>
  );
}

export default ReviewCard;
