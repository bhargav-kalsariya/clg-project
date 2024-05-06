import React from 'react'
import './Cart.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { BsCartX } from 'react-icons/bs';
import { axiosClient } from '../../utilities/axiosClient'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Cart({ onClose }) {

    const cart = useSelector(state => state.cartReducer.cart);
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += (item.quantity * item.price);
    });
    const isCartEmpty = cart.length === 0

    async function handleCheckout() {
        try {
            const response = await axiosClient.post('/cart/checkout', {
                products: cart
            });
            console.log({ response });

            const sessionId = response?.data?.sessionId;
            if (!sessionId) {
                console.error("SessionId not provided in the response");
                return;
            }

            const stripe = await stripePromise;
            await stripe.redirectToCheckout({
                sessionId: sessionId
            });
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    }


    return (
        <div className='Cart'>
            <div className="overlay" onClick={onClose}>
            </div>
            <div className="cart-content">
                <div className="header">
                    <h3>Shopping Cart</h3>
                    <div className="close-btn center" onClick={onClose}><AiOutlineClose /> Close</div>
                </div>
                <div className="cartItems">
                    {cart?.map(item => <CartItem cart={item} key={item._id} />)}
                </div>
                {isCartEmpty &&
                    <div className="empty-cart-info">
                        <div className="icon"><BsCartX /></div>
                        <h4>Your Cart Is Empty</h4>
                    </div>
                }
                {!isCartEmpty &&
                    <div className="checkout-info">
                        <div className="total-amount">
                            <h3 className="total-message">Total :</h3>
                            <h3 className="total-value">₹ {totalAmount}</h3>
                        </div>
                        <div className="checkout btn-primary" onClick={handleCheckout}>Checkout Now</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart