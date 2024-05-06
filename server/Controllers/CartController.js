const { Product } = require("../Models/ProductSchema");
const { User } = require("../Models/UserSchema");
const { Failure, Success } = require("../utilities/ResponseWrapper");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cartItemCheckoutHandler = async (req, res) => {

    const { products } = req.body;

    try {

        const lineItems = products.map(product => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.title,
                    images: [product.image.url]
                },
                unit_amount: Math.round(product.price * 100)
            },
            quantity: product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_BASE_URL}/payments/success`,
            cancel_url: `${process.env.CLIENT_BASE_URL}/payments/failed`,
        });

        return res.send(Success(200, { sessionId: session.id }));

    } catch (error) {

        return res.send(Failure(500, 'internal server error' + error.message));

    }

};

module.exports = {

    cartItemCheckoutHandler

};