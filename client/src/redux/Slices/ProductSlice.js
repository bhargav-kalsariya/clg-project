import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../utilities/axiosClient';

export const fetchProducts = createAsyncThunk('fetch/products',

    async () => {

        const response = await axiosClient.get('/product/all');

        return response.data;

    }

);

const productSlice = createSlice({

    name: 'productslice',
    initialState: {

        products: [],

    },
    extraReducers: (builder) => {

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })

    }

});

export default productSlice.reducer;