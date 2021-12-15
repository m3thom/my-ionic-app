import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonList,
    IonButtons,
    IonBackButton,
    IonButton,
} from "@ionic/react";
import postsPathHelper from "helper/pathHelper/posts";
import usersPathHelper from "helper/pathHelper/users";
// import useApiRequestWrapper from "hooks/useApiRequestWrapper";
import { Link, Redirect, useHistory } from "react-router-dom";
import { postsSlice, useGetPostsQuery } from 'store/services/posts'
import { useMemo } from "react";
import { baseSplitApi } from "store/services/_base";
import { useDispatch } from "react-redux";
import { resetLocalData } from "helper/localStorageHelper";
import { resetCredentials } from "store/slices/auth";
import { useSignOutUserMutation } from "store/services/users";
import Paginate from 'components/Paginate'
import { POSTS_BASE_PATH, } from 'constants/routeConstants'
import usePagesConfig from "hooks/usePagesConfig";
import { PARTIAL_LIST_TAG_ID, POST_TAG_TYPE } from "constants/apiConstants";

const PostExcerpt = ({ post }) => {
    const { showPostsPath } = postsPathHelper(post.id)
    return (
        <IonItem routerLink={showPostsPath}>
            <IonLabel>{post.content}</IonLabel>
        </IonItem>
    )
}

const Posts = () => {
    const [{ page }, { setPage, resetPage }] = usePagesConfig(POSTS_BASE_PATH)

    const history = useHistory();
    const dispatch = useDispatch()
    const { indexPostsPath, newPostsPath } = postsPathHelper()
    const { deleteUserSessionsPath } = usersPathHelper()

    const [signOutUser,] = useSignOutUserMutation()

    const queryOptions = useMemo(() => {
        return {
            url: indexPostsPath,
            params: {
                page,
            }
        }
    }, [indexPostsPath, page])

    const {
        data,
        // isLoading,
        isSuccess,
        isError,
        error,
        isFetching,
        refetch
    } = useGetPostsQuery(queryOptions)
    // useApiRequestWrapper
    const handleSignOut = async () => {
        try {
            await signOutUser({ url: deleteUserSessionsPath });
            await resetLocalData();
            dispatch(baseSplitApi.util.resetApiState());
            dispatch(resetCredentials());
            history.replace('/');
        } catch (error) {
            console.error(error);
        }
    }
    const handleRefresh = () => {
        dispatch(postsSlice.util.invalidateTags([{ type: POST_TAG_TYPE, id: PARTIAL_LIST_TAG_ID }]))
        resetPage()
        refetch()
    }

    let RenderContent
    if (isFetching) {
        RenderContent = <IonLabel>Loading...</IonLabel>
    } else if (isSuccess) {
        if (data.data) {
            RenderContent = <IonList>
                {data.data.map(post => <PostExcerpt post={post} key={post.id} />)}
            </IonList>
        } else {
            RenderContent = <div>
                :(, No content yet 
            </div>
        }

    } else if (isError) {
        switch (error?.originalStatus) {
            case 401:
                return <Redirect to='/users/sign_up' />;
            case 404:
                return <Redirect to='/page_not_found' />;
            default:
                return <Redirect to='/' />;
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Posts</IonTitle>
                </IonToolbar>
            </IonHeader>

            {" "}
            <Link to={newPostsPath}>New post</Link>
            {" "}
            <Link to={'/'}>Home</Link>
            {" "}
            <button onClick={handleSignOut}>Sign out</button>

            <Paginate
                pagy={data?.pagy}
                setPage={setPage}
                isFetching={isFetching}
                isSuccess={isSuccess}
            />
            <IonButton
                onClick={handleRefresh}
                disabled={isFetching}
            >
                Refresh
            </IonButton>

            <IonContent className="ion-padding">
                {RenderContent}
            </IonContent>
        </IonPage>
    )
}

export default Posts
