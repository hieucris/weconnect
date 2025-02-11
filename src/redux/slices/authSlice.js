import { createSlice } from "@reduxjs/toolkit";

const initialState={
    accessToken: null,
    RefreshToken: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.RefreshToken = action.payload.RefreshToken;
        },
    }
})

export const { login } = authSlice.actions
export default authSlice.reducer