import * as types from "../constants/category.constants";
import api from "../../api";

const getAllCategory = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_CATEGORY_REQUEST });
  try {
    const res = await api.get(`/category/`);
    dispatch({
      type: types.GET_ALL_CATEGORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_CATEGORY_FAILURE, payload: error });
  }
};

// const getAllCategory = (pageNum, limit, query, sortBy) => async (dispatch) => {
//   dispatch({ type: types.GET_ALL_CATEGORY_REQUEST });
//   try {
//     pageNum = pageNum || 1;
//     limit = limit || 100;
//     let queryString = "";
//     if (query) {
//       //queryString = `&name[$regex]=${query}&name[$options]=i&brand[$regex]=${query}&brand[$options]=i`;
//       queryString = query;
//     }

//     let sortByString = "";
//     if (sortBy?.key) {
//       sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
//     }
//     const res = await api.get(
//       `/categorys?page=${pageNum}&limit=${limit}&query=${queryString}${sortByString}`
//     );
//     dispatch({
//       type: types.GET_ALL_CATEGORY_SUCCESS,
//       payload: res.data.data,
//     });
//   } catch (error) {
//     dispatch({ type: types.GET_ALL_CATEGORY_FAILURE, payload: error });
//   }
// };

const categoryActions = {
  getAllCategory,
};
export default categoryActions;
