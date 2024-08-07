import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PkaosBQXcWOHffQHW9QTb6hsvDwhuY77FOEWIrrUaaxzmo1hEHzkuCLX9Zyp5LsFImaFYl9RP2tHorUCR9Oa5Db00qLa3iHzF');

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};