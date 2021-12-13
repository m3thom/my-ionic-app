import {
    baseSplitApi,
    baseGetResourcesProvidesTags,
    baseResourceRequestTags,
    baseAddNewResourceInvalidatesTags,
    baseDeleteResourceInvalidatesTags
} from './_base'

const postsSlice = baseSplitApi.injectEndpoints({
    overrideExisting: false,
    endpoints: builder => ({
        getPosts: builder.query({
            query: config => config,
            providesTags: baseGetResourcesProvidesTags
        }),
        getPost: builder.query({
            query: config => config,
            providesTags: baseResourceRequestTags
        }),
        addNewPost: builder.mutation({
            query: config => ({
                ...config,
                method: 'POST',
            }),
            invalidatesTags: baseAddNewResourceInvalidatesTags
        }),
        editPost: builder.mutation({
            query: config => ({
                ...config,
                method: 'PATCH',
            }),
            invalidatesTags: baseResourceRequestTags
        }),
        deletePost: builder.mutation({
            query: config => ({
                ...config,
                method: 'DELETE',
            }),
            invalidatesTags: baseDeleteResourceInvalidatesTags
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
