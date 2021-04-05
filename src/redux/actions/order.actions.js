import * as types from "../constants/order.constants";
import api from "../../api";

const createOrder = (
  userId,
  products,
  shippingAddress,
  paymentMethod,
  estimatedPrice,
  shippingPrice,
  taxPrice,
  totalOrderPrice
) => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_CREATE_REQUEST, payload: null });
  try {
    const res = await api.post(`/orders/add`, {
      userId,
      products,
      shippingAddress,
      paymentMethod,
      estimatedPrice,
      shippingPrice,
      taxPrice,
      totalOrderPrice,
    });
    dispatch({
      type: types.ORDER_CREATE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.ORDER_CREATE_FAILURE,
      payload: error,
    });
  }
};

const payOrder = (orderId, paymentResult) => async (dispatch) => {
  dispatch({ type: types.PAY_ORDER_REQUEST, payload: null });
  try {
    const res = await api.put(`/orders/${orderId}/pay`, {
      orderId,
      paymentResult,
    });
    dispatch({
      type: types.PAY_ORDER_SUCCESS,
      payload: res.data.data,
    });

    // dispatch({
    //   type: types.ORDER_RESET,
    // });
  } catch (error) {
    dispatch({
      type: types.PAY_ORDER_FAILURE,
      payload: error,
    });
  }
};

const getMyOrder = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ORDER_REQUEST, payload: null });
  try {
    const res = await api.get(`orders/myorders`);
    dispatch({
      type: types.GET_ALL_ORDER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_ORDER_FAILURE,
      payload: error,
    });
  }
};

const getOrderDetail = (orderId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_ORDER_REQUEST, payload: null });
  try {
    const res = await api.get(`/orders/${orderId}`, {});
    dispatch({
      type: types.GET_SINGLE_ORDER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_ORDER_FAILURE,
      payload: error,
    });
  }
};

const resetOrderPay = () => async (dispatch) => {
  dispatch({
    type: types.ORDER_RESET,
  });
};

const orderActions = {
  createOrder,
  payOrder,
  getOrderDetail,
  resetOrderPay,
  getMyOrder,
};
export default orderActions;
