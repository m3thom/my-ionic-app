import { baseSplitApi } from './_base'

const usersSlice = baseSplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: builder => ({
        signUpUser: builder.mutation({
            query: config => ({
                ...config,
                method: 'POST',
            })
        }),
        signInUser: builder.mutation({
            query: config => ({
                ...config,
                method: 'POST',
            }),
        }),
        refreshTokenUser: builder.mutation({
            query: config => ({
                ...config,
                method: 'POST',
            }),
        }),
        signOutUser: builder.mutation({
            query: config => ({
                ...config,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useSignUpUserMutation,
    useSignInUserMutation,
    useSignOutUserMutation,
    useRefreshTokenUserMutation,
} = usersSlice
