import { POSTS_BASE_PATH } from 'constants/routeConstants'
import useBasePathHelper from './_base'
/*
Path helper can be use for most of auto generated paths by Rails.
Example.
index path: /posts
show path: /posts/1
edit path: /posts/1/edit
update path /posts/2
delete path: /posts/1
*/
const usePostsPathHelper = (id) => {
    return useBasePathHelper(POSTS_BASE_PATH, id)
}

export {
    usePostsPathHelper
}
