import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const curItem = product ? {
                title: product.title,
                price: product.price,
                image: product.image,
                _id: product._id
            } : action.payload;
            const index = state.cart.findIndex(item => item._id === curItem._id);
            if (index === -1) {
                state.cart.push({ ...curItem, quantity: 1 });
            } else {
                state.cart[index].quantity += 1;
            }
        },
        removeFromCart: (state, action) => {
            const curKey = action.payload?._id;
            const index = state.cart.findIndex(item => item._id === curKey);
            if (index === -1) return;
            if (state.cart[index].quantity === 1) {
                state.cart = state.cart.filter(item => item._id !== curKey);
            } else {
                state.cart[index].quantity -= 1;
            }
        },
        resetCart: (state, action) => {
            state.cart = [];
        }

    }
});
export default cartSlice.reducer
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;