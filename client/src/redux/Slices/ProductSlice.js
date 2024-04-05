import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({

    name: 'productslice',
    initialState: {

        products: [],

    },
    reducers: {

        loadProducts: (state, action) => {
            state.products = action.payload;
        }

    }

});

export default productSlice.reducer;

export const { loadProducts } = productSlice.actions;