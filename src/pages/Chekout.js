import React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import "../style/checkout.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Checkout = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};
  const navigate = useNavigate(); // Use useNavigate here

  if (!clientSecret) {
    return <Navigate to="/watchlist" />;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} navigate={navigate} />
      </Elements>
    </div>
  );
};

const CheckoutForm = ({ clientSecret, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe.js has not yet loaded.");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      toast.error(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Payment succeeded! Thank you for your purchase.");
      navigate("/user-dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement className="card-element" />
      <button type="submit" disabled={!stripe} className="submit-button">
        Pay Now
      </button>
    </form>
  );
};

export default Checkout;
