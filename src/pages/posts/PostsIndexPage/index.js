import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonList,
} from "@ionic/react";
import postsPathHelper from "helper/pathHelper/posts";
import usersPathHelper from "helper/pathHelper/users";
// import useApiRequestWrapper from "hooks/useApiRequestWrapper";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useGetPostsQuery } from 'store/services/posts'
import { useMemo, useState } from "react";
import { baseSplitApi } from "store/services/_base";
import { useDispatch } from "react-redux";
import { resetLocalData } from "helper/localStorageHelper";
import { resetCredentials } from "store/slices/auth";
import { useSignOutUserMutation } from "store/services/users";

const PostExcerpt = ({ post }) => {
    const { showPostsPath } = postsPathHelper(post.id)
    return (
        <IonItem routerLink={showPostsPath}>
            <IonLabel>{post.content}</IonLabel>
        </IonItem>
    )
}

const Posts = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { indexPostsPath, newPostsPath } = postsPathHelper()
    const { deleteUserSessionsPath } = usersPathHelper()
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(15)

    const [signOutUser, { }] = useSignOutUserMutation()

    const queryOptions = useMemo(() => {
        return {
            url: indexPostsPath,
            params: {
                page,
                per_page: perPage
            }
        }
    }, [indexPostsPath, page])

    const {
        data,
        // isLoading,
        isSuccess,
        isError,
        error,
        isFetching
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

    let RenderContent
    if (isFetching) {
        RenderContent = <IonLabel>Loading...</IonLabel>
    } else if (isSuccess) {
        RenderContent = <IonList>
            {data.map(post => <PostExcerpt post={post} key={post.id} />)}
        </IonList>
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
                    <IonTitle>Posts</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                {RenderContent}

                {" "}
                <Link to={newPostsPath}>New post</Link>
                {" "}
                <Link to={'/'}>Home</Link>
                {" "}
                <button onClick={handleSignOut}>Sign out</button>
            </IonContent>
        </IonPage>
    )
}

export default Posts
