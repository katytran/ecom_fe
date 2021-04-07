import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import orderActions from "../../redux/actions/order.actions";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
const capitalizeFirstLetters = (words) => {
  let tempWords = words.split(" ");
  tempWords = tempWords.map((word) => word[0].toUpperCase() + word.slice(1));
  return tempWords.join(" ");
};

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(orderActions.getAllOrder());
  }, [dispatch, orders]);

  console.log("products", orders);
  // const [data, setData] = useState({ columns: [], row: [] });
  // setData({ row: ["happy"] });
  // console.log(data);

  let data = {
    columns: [
      {
        label: "Order ID",
        field: "orderId",
        sort: "asc",
        width: 270,
      },
      {
        label: "Customer",
        field: "userId",
        sort: "asc",
        width: 270,
      },
      {
        label: "Payment Method",
        field: "paymentmethod",
        sort: "asc",
        width: 200,
      },

      {
        label: "Paid",
        field: "paid",
        sort: "asc",
        width: 100,
      },
      {
        label: "Total",
        field: "total",
        sort: "asc",
        width: 100,
      },
      {
        label: "Delivered",
        field: "delivered",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],

    rows: orders
      ? orders.map((order) => {
          return {
            orderId: order._id,
            userId: order.userId.name,

            paymentmethod: order.paymentMethod,

            paid: order.paymentResult.status,

            total: order.totalOrderPrice,

            delivered: `${order.isDelivered}`,

            action: (
              <button
                style={{
                  borderRadius: "10px",
                  background: "red",
                  color: "white",
                  border: "1px solid red",
                }}
                onClick={() => navigate(`/order/${order._id}/update`)}
              >
                Edit
              </button>
            ),
          };
        })
      : [],
  };

  return (
    <div>
      <div id="page-content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <h1>Order List</h1>

              {loading ? (
                <ClipLoader loading={loading} size={30} />
              ) : (
                // <div>data</div>
                <MDBDataTable searchTop striped bordered small data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
