import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import CheckoutSteps from "./CheckoutSteps";
import Button from "@material-ui/core/Button";
import api from "../../api";
import orderActions from "../../redux/actions/order.actions";
import cartActions from "../../redux/actions/cart.actions";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles((theme) => ({
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

export default function PaymentProcess() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(3);
  const navigate = useNavigate();
  const order = useSelector((state) => state.order.order);
  const { orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await api.get("config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

  }, [dispatch, orderId, sdkReady, order]);

  useEffect(() => {
    if (
      order.isPaid &&
      order.paymentResult !== null &&
      order &&
      order._id === orderId
    ) {
      dispatch(orderActions.resetOrderPay());
      dispatch(cartActions.resetCart());
      navigate(`/checkout/order/success/${order._id}`);
    }
  }, [order]);

  const handleSubmit = (e) => {};
  const handleSuccessPayment = (paymentResult) => {
    try {
      dispatch(orderActions.payOrder(orderId, paymentResult));
    } catch (e) {}
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
            Pay
          </Typography>

          {/*          
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              Continue
            </Button>
          </div> */}
          {!order.isPaid && (
            <div>
              {!sdkReady ? (
                <ClipLoader size={30} />
              ) : (
                <>
                  {/* {errorPay && (
                    <MessageBox variant="danger">{errorPay}</MessageBox>
                  )}
                  {loadingPay && <LoadingBox></LoadingBox>} */}
                  <PayPalButton
                    amount={order.totalOrderPrice}
                    onSuccess={handleSuccessPayment}
                  ></PayPalButton>
                </>
              )}
            </div>
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
}
