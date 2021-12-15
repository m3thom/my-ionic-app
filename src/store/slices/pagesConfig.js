import { createSlice } from '@reduxjs/toolkit'
import {
    POSTS_BASE_PATH,
} from 'constants/routeConstants'
import { PAGESCONFIG_SLICE_NAME } from 'constants/sliceNameConstants'

const initialSubState = {
    page: 1
}

const initialState = {
    [POSTS_BASE_PATH]: initialSubState,
}

const pagesConfigSlice = createSlice({
    name: PAGESCONFIG_SLICE_NAME,
    initialState,
    reducers: {
        setPage(state, { payload }) {
            const { stateKey, page } = payload
            state[stateKey].page = page
        },
        resetPage(state, { payload }) {
            const { stateKey } = payload
            state[stateKey].page = 1
        },
    },
})

export const {
    setPage,
    resetPage,
} = pagesConfigSlice.actions

export const selectPageConfig = (stateName) => (state) => state[PAGESCONFIG_SLICE_NAME][stateName]

export default pagesConfigSlice
