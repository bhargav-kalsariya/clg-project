import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchAllProducts = createAsyncThunk('getAllProducts', async () => {

    const products = await fetch('https://api.escuelajs.co/api/v1/products');
    const Allproducts = await products.json();

    return Allproducts;

});

const productSlice = createSlice({

    name: 'productslice',
    initialState: {

        products: [],

    },
    reducers: {

        loadProducts: (state, action) => {
            state.products = action.payload;
        }

    },
    extraReducers: function (builder) {

        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })

    }

});

export default productSlice.reducer;

export const { loadProducts } = productSlice.actions;