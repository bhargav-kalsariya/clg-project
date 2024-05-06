const { Product } = require("../Models/ProductSchema");
const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cartItemCheckoutHandler = async (req, res) => {
    const { products } = req.body;

    try {
        // Create checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            line_items: products.map(product => ({
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: product.title,
                        images: [product.image]
                    },
                    unit_amount: Math.round(product.price * 100)
                },
                quantity: product.quantity
            })),
            mode: 'payment',
            success_url: `${process.env.CLIENT_BASE_URL}/payments/success`,
            cancel_url: `${process.env.CLIENT_BASE_URL}/payments/failed`,
        });

        // Redirect user to checkout page with sessionId
        return res.send(Success(200, { sessionId: session.id }));
    } catch (error) {
        return res.send(Failure(500, 'Internal server error'));
    }
};


module.exports = {

    cartItemCheckoutHandler

};