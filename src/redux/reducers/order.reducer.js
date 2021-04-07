import * as types from "../constants/order.constants";

const initialState = {
  orders: [],
  order: {},
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ORDER_CREATE_REQUEST:
    case types.ORDER_DELETE_REQUEST:
    case types.GET_ALL_ORDER_REQUEST:
    case types.GET_MY_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.PAY_ORDER_REQUEST:
    case types.GET_SINGLE_ORDER_REQUEST:
      return { ...state, loading: true, order: {} };

    case types.ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: payload.order };
    case types.ORDER_DELETE_SUCCESS:
      return { loading: false, order: {} };
    case types.PAY_ORDER_SUCCESS:
    case types.GET_SINGLE_ORDER_SUCCESS:
      return { ...state, loading: false, order: payload.order };
    case types.GET_ALL_ORDER_SUCCESS:
      return { ...state, loading: false, orders: payload.requestedOrders };
    case types.GET_MY_ORDER_SUCCESS:
      return { ...state, loading: false, orders: payload.order };
    case types.ORDER_DELETE_FAILURE:
    case types.ORDER_CREATE_FAILURE:
    case types.PAY_ORDER_FAILURE:
    case types.GET_MY_ORDER_FAILURE:
    case types.GET_SINGLE_ORDER_FAILURE:
    case types.GET_ALL_ORDER_FAILURE:
      return { ...state, loading: false, error: payload };
    case types.ORDER_RESET:
      return { ...state, loading: false, order: {} };
    default:
      return state;
  }
};
export default orderReducer;
