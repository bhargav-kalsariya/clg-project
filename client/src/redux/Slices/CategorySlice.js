import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../../utilities/axiosClient'

export const fetchCategories = createAsyncThunk('get/categories', async () => {
    try {
        const response = await axiosClient.get('/category/');
        return response.data.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        categories: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload.category
        })
    }
})
export default categorySlice.reducer