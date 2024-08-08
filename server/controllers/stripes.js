const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.sk_test_51PkaosBQXcWOHffQsKH01ZVJ0zGBA5yeFDwxiJfDRx8Yt5keO102fhKWitPVx9Ov9Ha0TlP4rj7QRmTJLAFgM9qU00yx4cZ7WR);  // Ensure your Stripe secret key is in your environment variables

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
