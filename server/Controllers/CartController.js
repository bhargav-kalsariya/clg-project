const { Product } = require("../Models/ProductSchema");
const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cartItemCheckoutHandler = async (req, res) => {

    try {
        const { products } = req.body;
        const lineItems = products.map(product => ({
            price_data: {
                currency: 'IN',
                product_data: {
                    name: product.title,
                    images: [product.image]
                },
                unit_amount: product.price * 100 // Convert to cents
            },
            quantity: product.quantity
        }));

        // Create checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_BASE_URL}#/payments/success`,
            cancel_url: `${process.env.CLIENT_BASE_URL}#/payments/failed`,
        });

        return res.send(Success(200, { sessionId: session.id }));

    } catch {

        res.status(500).json({ error: 'Internal server error' });

    }

};

module.exports = {

    cartItemCheckoutHandler

};