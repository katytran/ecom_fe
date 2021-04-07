import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import DayJS from "react-dayjs";
import { Row, Col, Form } from "react-bootstrap";
import orderActions from "../../redux/actions/order.actions";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "react-bootstrap/Button";

function UpdateOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getOrderDetail(id));
  }, [dispatch, id]);
  const order = useSelector((state) => state.order.order);
  const [deliver, setDeliver] = useState("false");
  const products = order ? order.products : [];
  const { shippingAddress } = order;
  console.log("products", products);
  console.log("shipping", shippingAddress);

  const deliverChangeHandler = (result) => {
    console.log("result", result);
    setDeliver(result);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("result", deliver);
  };
  return (
    <Container className="pt-5">
      <div className="text-center py-4" style={{ fontSize: "20px" }}>
        Update Delivered
      </div>
      {products &&
        products.map((product) => (
          <div className="cartproduct">
            <div className="cartproduct__image">
              <img
                src={product.image}
                alt={product.name}
                width={120}
                height={120}
              />
            </div>
            {
              <Link
                to={`/products/${product._id}`}
                className="cartproduct__name"
              >
                <p>{product.name}</p>
              </Link>
            }

            {<p className="cartproduct__price">${product.price}</p>}
            {<p className="cartproduct__price">Qty: {product.qty}</p>}
            {
              <p className="cartproduct__price">
                Total: ${Number(product.qty) * product.price}
              </p>
            }
          </div>
        ))}
      <div>
        <hr></hr>
        <div className="ml-3 mt-2">
          <div className="d-flex ">
            <div style={{ flex: "1", fontSize: "17px" }}> Shipping</div>{" "}
            <div style={{ fontSize: "17px" }}>{`$${
              order && Number(order.shippingPrice).toFixed(2)
            }`}</div>
          </div>
          <div className="d-flex ">
            <div style={{ flex: "1", fontSize: "17px" }}> Tax</div>{" "}
            <div style={{ fontSize: "17px" }}>{`$${
              order && Number(order.taxPrice).toFixed(2)
            }`}</div>
          </div>
          <div className="d-flex ">
            <div style={{ flex: "1", fontSize: "17px" }}> Total</div>
            <div style={{ fontSize: "17px", fontWeight: "bold" }}>
              {`$${order && Number(order.totalOrderPrice).toFixed(2)}`}
            </div>
          </div>
        </div>

        <Grid container spacing={2} className="ml-2 pt-3">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Shipping
            </Typography>
            <Typography gutterBottom>
              {shippingAddress &&
                shippingAddress.firstName + " " + shippingAddress.lastName}
            </Typography>
            <Typography gutterBottom>
              {shippingAddress &&
                shippingAddress.address1 +
                  " " +
                  shippingAddress.address2 +
                  ", " +
                  shippingAddress.zip +
                  " " +
                  shippingAddress.country}
            </Typography>
          </Grid>
        </Grid>
        <hr></hr>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Delivered?</Form.Label>

              <Form.Control
                as="select"
                onChange={(e) => deliverChangeHandler(e.target.value)}
                value={deliver}
              >
                <option value="false">Not Delivered</option>
                <option value="true">Delivered</option>
              </Form.Control>
              <Form.Group
                as={Col}
                controlId="formGridCity"
                className="mt-3 text-end"
              >
                <Button
                  variant="warning"
                  type="submit"
                  size="sm"
                  onClick={handleClick}
                >
                  Update product
                </Button>
              </Form.Group>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    </Container>
  );
}

export default UpdateOrder;
