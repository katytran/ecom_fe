import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../../redux/actions/cart.actions";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import CheckoutSteps from "./CheckoutSteps";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import orderActions from "../../redux/actions/order.actions";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function ReviewForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const userId = useSelector((state) => state.auth.user._id);
  const products = useSelector((state) => state.cart.cartItems);
  const shippingAddress = useSelector((state) => state.cart.addressForm);
  const paymentMethod = useSelector((state) => state.cart.paymentType);
  const order = useSelector((state) => state.order.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCartSubTotal = () => {
    return products.reduce(
      (price, product) => price + product.price * product.qty,
      0
    );
  };
  const estimatedPrice = getCartSubTotal();
  const toPrice = (num) => {
    return parseInt(num);
  };

  const shippingPrice = estimatedPrice > 100 ? 0 : 10;
  const taxPrice = 0.09 * estimatedPrice;
  const totalOrderPrice = (estimatedPrice + shippingPrice + taxPrice).toFixed(
    2
  );

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/checkout/payment");
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (order._id) {
      navigate(`/checkout/order/${order._id}`);
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        orderActions.createOrder(
          userId,
          products,
          shippingAddress,
          paymentMethod,
          estimatedPrice,
          shippingPrice,
          taxPrice,
          totalOrderPrice
        )
      );
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <CheckoutSteps activeStep={activeStep} stepper={classes.stepper} />

          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>

          <List disablePadding>
            {products.map((product) => (
              <ListItem className={classes.listItem} key={product.name}>
                <img src={product.image} width="10%" height="10%"></img>
                <ListItemText
                  className="ml-3"
                  primary={product.name}
                  secondary={`QTY: ${product.qty} x ${product.price}`}
                  style={{ textTransform: "capitalize" }}
                />
                <Typography variant="subtitle1">
                  {`$${(product.price * Number(product.qty)).toFixed(2)}`}
                </Typography>
              </ListItem>
            ))}
            <div className="ml-3 mt-2">
              <div className="d-flex ">
                <div style={{ flex: "1", fontSize: "17px" }}> Shipping</div>{" "}
                <div style={{ fontSize: "17px" }}>{`$${shippingPrice.toFixed(
                  2
                )}`}</div>
              </div>
              <div className="d-flex ">
                <div style={{ flex: "1", fontSize: "17px" }}> Tax</div>{" "}
                <div style={{ fontSize: "17px" }}>{`$${taxPrice.toFixed(
                  2
                )}`}</div>
              </div>
              <div className="d-flex ">
                <div style={{ flex: "1", fontSize: "17px" }}> Total</div>
                <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                  {`$${totalOrderPrice}`}
                </div>
              </div>
            </div>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping
              </Typography>
              <Typography gutterBottom>
                {shippingAddress.firstName + " " + shippingAddress.lastName}
              </Typography>
              <Typography gutterBottom>
                {shippingAddress.address1 +
                  " " +
                  shippingAddress.address2 +
                  ", " +
                  shippingAddress.state +
                  " " +
                  shippingAddress.zip}
              </Typography>
            </Grid>

            {/* <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid> */}
          </Grid>

          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              Create Order
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
