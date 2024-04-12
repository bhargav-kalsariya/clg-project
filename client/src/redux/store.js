import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/userSlice';
import CategorySlice from './Slices/CategorySlice';
import CartSlice from './Slices/CartSlice';

const store = configureStore({

    reducer: {
        userReducer: userSlice,
        categoryReducer: CategorySlice,
        cartReducer: CartSlice
    }

});

export default store;