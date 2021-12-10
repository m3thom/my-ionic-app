import { IonButton, IonContent, IonLabel, IonPage } from "@ionic/react"
import { PostEditForm } from "forms/postsForm"
import postsPathHelper from "helper/pathHelper/posts"
import { useRef } from "react"
import { useHistory, useParams } from "react-router"
import { useEditPostMutation, useGetPostQuery } from "store/services/posts"

const PostEditPage = () => {
    const { id } = useParams();
    const {
        showPostsPath,
        updatePostsPath,
        indexPostsPath,
    } = postsPathHelper(id)

    const {
        data,
        isFetching,
        isSuccess
    } = useGetPostQuery({ url: showPostsPath, id })

    const [editPost, { isLoading }] = useEditPostMutation()
    const submitButtonRef = useRef()
    const history = useHistory()

    const handleSubmit = async (data) => {
        await editPost({ url: updatePostsPath, body: data, id }).unwrap()
        history.push(indexPostsPath)
    }

    let content
    if (isFetching) {
        content = <IonLabel>Loading...</IonLabel>
    } else if (isSuccess) {
        content = (
            <>
                <PostEditForm
                    data={data}
                    submitButtonRef={submitButtonRef}
                    onSubmit={handleSubmit}
                />

                <IonButton
                    onClick={() => submitButtonRef.current.click()}
                    disabled={isLoading}
                >
                    Submit
                </IonButton>
            </>
        )
    }

    return (
        <IonPage>
            <IonContent>
                Edit pagee!

                {content}

            </IonContent>
        </IonPage >
    )
}

export default PostEditPage
