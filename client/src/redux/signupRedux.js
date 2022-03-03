import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const signupUser = createAsyncThunk(
    'signups/signupUser',
    async (user) => {

        const res = await axios.post("/auth/register", user)

        return res.data
    })

const initialState = {
    isLoading: false,
    currenUser: null,
    error: false,
}

export const signupSlice = createSlice({
    name: 'signups',
    initialState,
    reducers: {},
    extraReducers: {
        [signupUser.pending]: (state) => {
            state.isLoading = true
        },
        [signupUser.fulfilled]: (state, { payload }) => {
            state.isLoading = true;
            state.currentUser = payload;
            state.error = false
        },
        [signupUser.rejected]: (state) => {
            state.isLoading = false
            state.error = true
        },
    },
})

export const signupReducer = signupSlice.reducer