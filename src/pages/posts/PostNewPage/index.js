import { IonButton, IonContent, IonPage } from '@ionic/react';
import { PostNewForm } from 'forms/PostsForm';
import { usePostsPathHelper } from 'helper/pathHelper/posts';
import { useRef } from 'react';
import { useAddNewPostMutation } from 'store/services/post'
import { useHistory } from 'react-router-dom'

const PostNewPage = () => {
    const { createPostsPath, indexPostsPath } = usePostsPathHelper()
    const [addNewPost, { isLoading }] = useAddNewPostMutation()
    const submitButtonRef = useRef()
    const history = useHistory()

    const handleSubmit = async (data) => {
        await addNewPost({ url: createPostsPath, body: data }).unwrap()
        history.push(indexPostsPath)
    }

    return (
        <IonPage>
            <IonContent>
                New pagee!

                <PostNewForm
                    submitButtonRef={submitButtonRef}
                    onSubmit={handleSubmit}
                />

                <IonButton
                    onClick={() => submitButtonRef.current.click()}
                    disabled={isLoading}
                >
                    Submit
                </IonButton>

            </IonContent>
        </IonPage>
    )
}

export default PostNewPage
