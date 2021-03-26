import * as types from "../constants/product.constants";

const initialState = {
  products: [],
  totalPageNum: 1,
  selectedProduct: null,
  loading: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_PRODUCT_REQUEST:
    case types.ADD_PRODUCT_REQUEST:
    case types.UPDATE_PRODUCT_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
    case types.GET_SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case types.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.requestedProducts,
        totalPageNum: payload.totalPages,
      };

    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, selectedProduct: payload.product, loading: false };

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: payload,
      };

    case types.ADD_PRODUCT_FAILURE:
    case types.UPDATE_PRODUCT_FAILURE:
    case types.DELETE_PRODUCT_FAILURE:
    case types.GET_ALL_PRODUCT_FAILURE:
    case types.GET_SINGLE_PRODUCT_FAILURE:
      return { ...state, loading: false };

    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: {},
      };

    default:
      return state;
  }
};

export default productReducer;
