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


const categoryActions = {
  getAllCategory,
};
export default categoryActions;
