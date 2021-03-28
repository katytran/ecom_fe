import * as types from "../constants/product.constants";
import api from "../../api";
//import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const getAllProduct = (
  pageNum = 1,
  limit = 30,
  query = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_PRODUCT_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      //queryString = `&name[$regex]=${query}&name[$options]=i&brand[$regex]=${query}&brand[$options]=i`;
      queryString = query;
    }

    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/products?page=${pageNum}&limit=${limit}&query=${queryString}${sortByString}`
    );
    dispatch({
      type: types.GET_ALL_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_PRODUCT_FAILURE, payload: error });
  }
};

const getSingleProduct = (productId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.get(`/products/${productId}`);
    dispatch({
      type: types.GET_SINGLE_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

const addProduct = (name, description, price, categories, images) => async (
  dispatch
) => {
  dispatch({ type: types.ADD_PRODUCT_REQUEST, payload: null });
  try {
    // For uploading file manually
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.length) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("images", images[index]);
    //   }
    // }
    // const res = await api.product("/products", formData);

    // Upload images using cloudinary already

    const res = await api.post("/products/add", {
      name,
      description,
      price,
      categories,
      images,
    });

    dispatch({
      type: types.ADD_PRODUCT_SUCCESS,
      payload: res.data.data,
    });

    //dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("product created");
    dispatch(productActions.productsRequest());
  } catch (error) {
    dispatch({ type: types.ADD_PRODUCT_FAILURE, payload: error });
  }
};

const updateproduct = (productId, title, content, images) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/products/${productId}`, {
      title,
      content,
      images,
    });

    dispatch({
      payload: res.data.data,
      type: types.UPDATE_PRODUCT_SUCCESS,
    });
    //dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("product updated.");
  } catch (error) {
    dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: error });
  }
};

const deleteproduct = (productId) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/products/${productId}`);
    console.log(res);
    dispatch({
      payload: res.data,
      type: types.DELETE_PRODUCT_SUCCESS,
    });
    //dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("product deleted.");
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error });
  }
};

const productActions = {
  getAllProduct,
  addProduct,
  getSingleProduct,
};
export default productActions;
