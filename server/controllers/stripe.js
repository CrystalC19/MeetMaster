const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.pk_test_51PkaosBQXcWOHffQHW9QTb6hsvDwhuY77FOEWIrrUaaxzmo1hEHzkuCLX9Zyp5LsFImaFYl9RP2tHorUCR9Oa5Db00qLa3iHzF);  // Ensure your Stripe secret key is in your environment variables

// Route to handle POST request for payment
router.post('/charge', async (req, res) => {
    try {
        const { amount, source } = req.body;
        const charge = await stripe.charges.create({
            amount: amount,  // Charge amount in cents
            currency: 'usd',
            source: source,
            description: 'Sample Charge'
        });

        res.json(charge);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
