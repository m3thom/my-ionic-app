import {
    IonButton,
    IonContent,
    IonHeader,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import postsPathHelper from "helper/pathHelper/posts";
import { useDeletePostMutation, useGetPostQuery } from 'store/services/posts'
import { useHistory, useParams } from "react-router"

const Post = () => {
    const history = useHistory()

    const { id } = useParams()

    const {
        showPostsPath,
        editPostsPath,
        indexPostsPath,
        deletePostsPath
    } = postsPathHelper(id)

    const {
        data,
        isFetching,
        isSuccess
    } = useGetPostQuery({ url: showPostsPath, id })

    const [deletePost, { isLoading }] = useDeletePostMutation()

    const handleDetele = async () => {
        await deletePost({ url: deletePostsPath, id }).unwrap()
        history.push(indexPostsPath)
    }

    const post = data

    let content
    if (isFetching) {
        content = <IonLabel>Loading...</IonLabel>
    } else if (isSuccess) {
        content = (
            <article className="post">
                <h2>{post.content}</h2>
            </article>
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Post</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div>
                    Hello World, welcome to post show  page
                </div>

                {content}

                <IonButton
                    disabled={isLoading}
                    routerLink={editPostsPath}>
                    Edit
                </IonButton>
                <IonButton
                    disabled={isLoading}
                    onClick={handleDetele}>
                    Delete
                </IonButton>

            </IonContent>
        </IonPage>
    )
}

export default Post
