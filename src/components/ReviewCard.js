import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./ReviewCard.css";
import DayJS from "react-dayjs";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

function ReviewCard({ review }) {
  return (
    <Container className="py-1">
      {!review ? (
        <div>....</div>
      ) : (
        <div class="review_card">
          <div>
            <p>{moment(review.createdAt).format("LL")}</p>
            <p
              class="card-text"
              style={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {review.user.name}
            </p>
            <StyledRating
              name="rating"
              value={review.rating}
              icon={<FavoriteIcon fontSize="inherit" />}
            />
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
