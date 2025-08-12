import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUserApi, registerUserApi } from "../services/userApi"

export const registerUser = createAsyncThunk('users/registerUser', async (data) => {
    const response = await registerUserApi(data)
    console.log(response)
    return response.data
})

export const loginUser = createAsyncThunk('users/loginUser', async (data) => {
    const response = await loginUserApi(data)
    console.log(response)
    return response.data
})

