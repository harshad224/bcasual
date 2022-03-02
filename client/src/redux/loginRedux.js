import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const loginUser = createAsyncThunk(
    //action type string
    'logins/loginUser',
    // callback function
    async (userData) => {
        const res = await axios.post("https://bcasual.herokuapp.com/api/auth/login", userData)
        return res.data

    })



const initialState = {
    isLoading: false,
    currenUser: null,
    error: false,
}

export const userSlice = createSlice({
    name: 'logins',
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.isLoading = true;
            state.currentUser = payload;
            state.error = false
        },
        [loginUser.rejected]: (state) => {
            state.isLoading = false
            state.error = true
        },
    },
})

export const loginReducer = userSlice.reducer