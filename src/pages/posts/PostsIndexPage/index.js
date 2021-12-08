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
import { usePostsPathHelper } from "helper/pathHelper/posts";
// import useApiRequestWrapper from "hooks/useApiRequestWrapper";
import { Link, Redirect } from "react-router-dom";
import { useGetPostsQuery } from 'store/services/post'
import { useMemo, useState } from "react";

const PostExcerpt = ({ post }) => {
    const { showPostsPath } = usePostsPathHelper(post.id)
    return (
        <IonItem routerLink={showPostsPath}>
            <IonLabel>{post.content}</IonLabel>
        </IonItem>
    )
}

const Posts = () => {
    const { indexPostsPath, newPostsPath } = usePostsPathHelper()
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(15)

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
                return <Redirect to='/users/sign_in' />;
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
                <Link to={'/dashboard'}>Dash</Link>
            </IonContent>
        </IonPage>
    )
}

export default Posts
