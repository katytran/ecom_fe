import * as types from "../constants/product.constants";
import api from "../../api";
import { toast } from "react-toastify";

const getAllProduct = (pageNum, limit, query, sortBy, filter) => async (
  dispatch
) => {
  dispatch({ type: types.GET_ALL_PRODUCT_REQUEST });
  try {
    let queryString = "";
    let filter2 = "";
    if (query) {
      queryString = query;
    }

    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }

    if (filter) {
      filter2 = filter;
    }

    const res = await api.get(
      `/products?page=${pageNum}&limit=${limit}&query=${queryString}${sortByString}&filter=${filter2}`
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

const addProduct = (formData) => async (dispatch) => {
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
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      images: formData.images,
      ingredients: formData.ingredients,
      countInStock: formData.countInStock,
    });

    dispatch({
      type: types.ADD_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
    toast.success("product created");
    
  } catch (error) {
    dispatch({ type: types.ADD_PRODUCT_FAILURE, payload: error });
  }
};

const updateproduct = (formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.put(`/products/${formData.id}/update`, {
      id: formData.id,
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      images: formData.images,
      ingredients: formData.ingredients,
      countInStock: formData.countInStock,
      countSold: formData.countSold,
    });

    dispatch({
      payload: res.data.data,
      type: types.UPDATE_PRODUCT_SUCCESS,
    });
    toast.success("product updated.");
    
  } catch (error) {
    dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: error });
  }
};

const deleteproduct = (productId) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/products/${productId}/delete`);
    console.log(res);
    dispatch({
      payload: res.data,
      type: types.DELETE_PRODUCT_SUCCESS,
    });
    toast.success("product deleted.");
    
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error });
  }
};

const productActions = {
  getAllProduct,
  addProduct,
  getSingleProduct,
  updateproduct,
  deleteproduct,
};
export default productActions;
