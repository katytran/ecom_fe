import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import orderActions from "../redux/actions/order.actions";
import DayJS from "react-dayjs";
import Button from "react-bootstrap/Button";

function OrderHistoryPage() {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  console.log("orders", orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getMyOrder());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Container className="pt-5">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Id</th>
                <th>Date Order</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Detail order</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>
                    <DayJS asString={true}>{order.paidAt}</DayJS>
                  </td>
                  <td>{order.totalOrderPrice}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.isDelivered ? "Delivered" : "Pending"}</td>
                  <td>
                    <Button onClick={() => navigate(`/myorders/${order._id}`)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
}

export default OrderHistoryPage;
