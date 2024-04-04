import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../redux/Slices/ProductSlice';

const store = configureStore({

    reducers: {
        productReducer: productSlice,
    }

});

export default store;