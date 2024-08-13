import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      console.log('PaymentMethod:', paymentMethod);
      alert('Payment Successful')

      // You can send the paymentMethod.id to your server here for further processing.
      setIsProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};
export default CheckoutForm;