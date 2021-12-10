import { IonButton, IonContent, IonPage } from '@ionic/react';
import { UserSignInForm } from 'forms/usersForm';
import postsPathHelper from 'helper/pathHelper/posts';
import usersPathHelper from 'helper/pathHelper/users';
import { useRef } from 'react';
import { useSignInUserMutation } from 'store/services/users'
import { useHistory } from 'react-router-dom'
import { setCredentials } from 'store/slices/auth';
import { useDispatch } from 'react-redux';
import { setLocalData } from 'helper/localStorageHelper';
import useRedirectIfAlreadyAuth from 'hooks/useRedirectIfAlreadyAuth';
import { AUTH_SLICE_NAME } from 'constants/sliceNameConstants';
import { Link } from 'react-router-dom'

const SignInPage = () => {
    const dispatch = useDispatch();
    const { indexPostsPath } = postsPathHelper();
    const {
        newUserRegistrationsPath,
        createUserSessionsPath
    } = usersPathHelper();
    const [createUserSession, { isLoading }] = useSignInUserMutation();
    const submitButtonRef = useRef();
    const history = useHistory();

    useRedirectIfAlreadyAuth();

    const handleSubmit = async (data) => {
        try {
            const user = await createUserSession({
                url: createUserSessionsPath,
                body: data
            }).unwrap()
            await setLocalData(AUTH_SLICE_NAME, user)
            dispatch(setCredentials(user))
            history.push(indexPostsPath)
        } catch (error) {
            console.error('SignInPage#handleSubmit', error)
        }
    }

    return (
        <IonPage>
            <IonContent>
                Sign in

                <UserSignInForm
                    submitButtonRef={submitButtonRef}
                    onSubmit={handleSubmit}
                />

                <IonButton
                    onClick={() => submitButtonRef.current.click()}
                    disabled={isLoading}
                >
                    Submit
                </IonButton>

                {" "}
                <Link to={newUserRegistrationsPath}>Sign up</Link>

            </IonContent>
        </IonPage>
    )
}

export default SignInPage
