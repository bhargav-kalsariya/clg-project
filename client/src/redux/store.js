import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/userSlice';
import CategorySlice from './Slices/CategorySlice';

const store = configureStore({

    reducer: {
        userReducer: userSlice,
        categoryReducer: CategorySlice
    }

});

export default store;