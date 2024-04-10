import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../redux/Slices/ProductSlice';
import userSlice from './Slices/userSlice';

const store = configureStore({

    reducer: {
        productReducer: productSlice,
        userReducer: userSlice
    }

});

export default store;