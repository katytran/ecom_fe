import * as types from "../constants/review.constants";
import api from "../../api";

const getSingleReview = (reviewId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.get(`/review/${reviewId}`);
    dispatch({
      type: types.GET_SINGLE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_REVIEW_FAILURE,
      payload: error,
    });
  }
};

const createReview = (productId, title, rating, body) => async (dispatch) => {
  dispatch({ type: types.ADD_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/review/add`, {
      productId,
      title,
      rating,
      body,
    });
    dispatch({
      type: types.ADD_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.ADD_REVIEW_FAILURE,
      payload: error,
    });
  }
};

const getReviewOneProduct = (
  productId,
  pageNum,
  limit,
  query,
  sortBy,
  filter
) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_REVIEW_REQUEST });
  try {
    let pageNum2 = pageNum || 1;

    console.log("produc id", productId);
    let queryString = "";
    let filter2 = "";
    if (query) {
      //queryString = `&name[$regex]=${query}&name[$options]=i&brand[$regex]=${query}&brand[$options]=i`;
      queryString = query;
    }

    let sortByString = "";
    if (sortBy) {
      // sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
      sortByString = sortBy;
    }

    if (filter) {
      filter2 = filter;
    }

    const res = await api.get(
      `/review?productId=${productId}&page=${pageNum2}&limit=${limit}&query=${queryString}&sortBy=${sortByString}&filter=${filter2}`
    );
    dispatch({
      type: types.GET_ALL_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_REVIEW_FAILURE, payload: error });
  }
};

const reviewActions = {
  getSingleReview,
  createReview,
  getReviewOneProduct,
};
export default reviewActions;
