import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./userThunks";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: ""
    },
    extraReducers: (builder) => {

        builder.addCase(registerUser.pending, state => {
            state.loading = true
        })

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        })

        builder.addCase(registerUser.rejected, state => {
            state.loading = false
            state.error = "Failed to register"
        })

        builder.addCase(loginUser.pending, state => {
            state.loading = true
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        })

        builder.addCase(loginUser.rejected, state => {
            state.loading = false
            state.error = "Failed to login"
        })

    }
})

export default userSlice.reducer