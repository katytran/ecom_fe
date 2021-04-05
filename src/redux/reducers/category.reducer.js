import * as types from "../constants/category.constants";

const initialState = {
  // all CATEGORYs
  categories: [],
  loading: false,
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case types.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: payload.requestedCategories,
      };

    case types.GET_ALL_CATEGORY_FAILURE:

    default:
      return state;
  }
};

export default categoryReducer;
