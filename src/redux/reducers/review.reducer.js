import * as types from "../constants/review.constants";

const initialState = {
  // all reviews
  reviews: [],
  loading: false,
  totalPages: null,

  //single review
  selectedReview: null,
};

const reviewReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_REVIEW_REQUEST:
    case types.GET_SINGLE_REVIEW_REQUEST:
    case types.ADD_REVIEW_REQUEST:
      return { ...state, loading: true };

    case types.GET_ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: payload.requestedReviews,
        totalPages: payload.totalPages,
      };
    case types.ADD_REVIEW_SUCCESS:
    case types.GET_SINGLE_REVIEW_SUCCESS:
      return { ...state, selectedReview: payload.review, loading: false };

    case types.GET_ALL_REVIEW_FAILURE:
    case types.ADD_REVIEW_FAILURE:
    case types.GET_SINGLE_REVIEW_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default reviewReducer;
