import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: null,
  loading: false,
  messages: [],
  acessToken: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
        accessToken: payload.accessToken,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        isAuthenticated: true,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.LOGOUT_REQUEST:
      return { ...initialState, isAuthenticated: false };

    default:
      return state;
  }
};

export default authReducer;
