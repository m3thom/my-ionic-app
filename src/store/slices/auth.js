import { createSlice } from '@reduxjs/toolkit'
import { AUTH_SLICE_NAME } from 'constants/sliceNameConstants'

const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: AUTH_SLICE_NAME,
    initialState,
    reducers: {
        setCredentials(
            state,
            { payload: { user, token } }
        ) {
            state.user = user
            state.token = token
        },
        resetCredentials(state) {
            state.user = null
            state.token = null
        }
    },
})

export const {
    setCredentials,
    resetCredentials
} = authSlice.actions

export default authSlice

export const selectCurrentUser = (state) => state[AUTH_SLICE_NAME].user
