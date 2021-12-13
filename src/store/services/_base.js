// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseSplitApi = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const { token } = getState()?.auth
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    // The "endpoints" represent operations and requests for this server
    endpoints: () => ({}),
    tagTypes: [
        'Post',
        'User',
    ],
})

/*
All of these functions recieved same arguments
1. result: The result data return from the API.
2. error: The error data return from the API.
3. arg: The argument recieved from function call in the component.
*/
export const baseGetResourcesProvidesTags = ({ data = [], type }, _error, _arg) => [
    type,
    { type, id: 'PARTIAL-LIST' },
    ...data.map(({ id }) => ({ type, id }))
]
export const baseResourceRequestTags = ({ type }, _error, arg) => [{ type, id: arg.id }]
export const baseAddNewResourceInvalidatesTags = ({ type }, _error, _arg) => [type]
export const baseDeleteResourceInvalidatesTags = ({ type }, _error, _arg) => [{ type, id: 'PARTIAL-LIST' }]
