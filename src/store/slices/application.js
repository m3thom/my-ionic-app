import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isModalOpen: false,
    theme: 'dark',
    locale: 'en'
}

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        openModal(state) {
            state.isModalOpen = true
        },
        closeModal(state) {
            state.isModalOpen = false
        },
        toggleModal(state) {
            state.isModalOpen = !state.isModalOpen
        },
    },
})

export const {
    toggleModal,
    closeModal,
    openModal
} = applicationSlice.actions

export default applicationSlice
