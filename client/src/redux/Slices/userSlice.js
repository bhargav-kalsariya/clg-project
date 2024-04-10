import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../utilities/axiosClient';

export const getMyProfile = createAsyncThunk('user/details',

    async () => {

        const response = await axiosClient.get('/user/details');

        return response.data.result;

    }

);

const userSlice = createSlice({

    name: 'userSlice',
    initialState: {

        myProfile: null,
        isAdmin: false

    },
    reducers: {

        isAdmin: (state, action) => {

            state.isAdmin = action.payload;

        }

    },
    extraReducers: (builder) => {

        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.currentUser;
        });

    }

});

export default userSlice.reducer;

export const { isAdmin } = userSlice.actions;