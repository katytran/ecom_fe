import * as types from "../constants/auth.constants";
import api from "../../api";
import { toast } from "react-toastify";

/**Login with email password*/
const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("auth/login", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

/**Register new account*/
const register = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/user", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    toast.success(`Thank you for your registration, ${name}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

/**Get current user infomation*/
const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    const res = await api.get(`/user/me`);
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

/**log out*/
const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
  dispatch({ type: types.LOGOUT_REQUEST, payload: null });
};

const authActions = {
  loginRequest,
  register,
  getCurrentUser,
  logout,
};
export default authActions;
