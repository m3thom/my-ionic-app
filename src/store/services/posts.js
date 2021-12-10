import { baseSplitApi } from './_base'

const postsSlice = baseSplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: builder => ({
        getPosts: builder.query({
            query: config => config,
            providesTags: (result = [], _error, _arg) => [
                'Post',
                { type: 'Post', id: 'PARTIAL-LIST' },
                ...result.map(({ id }) => ({ type: 'Post', id }))
            ]
        }),
        getPost: builder.query({
            query: config => config,
            providesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        addNewPost: builder.mutation({
            query: config => ({
                ...config,
                method: 'POST',
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation({
            query: config => ({
                ...config,
                method: 'PATCH',
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }]
        }),
        deletePost: builder.mutation({
            query: config => ({
                ...config,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, _arg) => [{ type: 'Post', id: 'PARTIAL-LIST' }]
        }),
    }),
})

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation,
    useEditPostMutation,
    useDeletePostMutation,
} = postsSlice
