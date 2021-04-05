import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import cartActions from "../../redux/actions/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import CheckoutSteps from "./CheckoutSteps";
import Button from "@material-ui/core/Button";
import orderActions from "../../redux/actions/order.actions";

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

export default function PaymentForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order.order);
  const [activeStep, setActiveStep] = React.useState(1);
  const addressForm = useSelector((state) => state.cart.addressForm);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!addressForm.firstName) {
      console.log("navigate 2");
      navigate("/checkout/shipping");
    }
  }, [addressForm]);

  // useEffect(() => {
  //   dispatch(orderActions.resetOrderPay());
  // }, [order]);

  const [value, setValue] = React.useState("paypal");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(cartActions.savePaymentMethod(value));
      navigate("/checkout/review");
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
            Payment method
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="payment"
              name="payment"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PAYPAL"
              />
              <FormControlLabel
                value="stripe"
                control={<Radio />}
                label="CREDIT CARD"
              />
            </RadioGroup>
          </FormControl>

          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              Continue
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
