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
import { Link } from "react-router-dom";
import { useGetPostsQuery } from 'store/services/post'

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

    const {
        data,
        // isLoading,
        isSuccess,
        isError,
        error,
        isFetching
    } = useGetPostsQuery({ url: indexPostsPath, params: { page: 1, per_page: 10 } })
    let RenderContent
    if (isFetching) {
        RenderContent = <IonLabel>Loading...</IonLabel>
    } else if (isSuccess) {
        RenderContent = <IonList>
            {data.map(post => <PostExcerpt post={post} key={post.id} />)}
        </IonList>
    } else if (isError) {
        RenderContent = <div>{error.toString()}</div>
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
