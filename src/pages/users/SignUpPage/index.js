import { IonButton, IonContent, IonPage } from '@ionic/react';
import { UserSignUpForm } from 'forms/usersForm';
import postsPathHelper from 'helper/pathHelper/posts';
import usersPathHelper from 'helper/pathHelper/users';
import { useRef } from 'react';
import { useSignUpUserMutation } from 'store/services/users'
import { useHistory } from 'react-router-dom'
import { setCredentials } from 'store/slices/auth';
import { useDispatch } from 'react-redux';
import { setLocalData } from 'helper/localStorageHelper';
import useRedirectIfAlreadyAuth from 'hooks/useRedirectIfAlreadyAuth';
import { AUTH_SLICE_NAME } from 'constants/sliceNameConstants';
import { Link } from 'react-router-dom'

const SignUpPage = () => {
    const dispatch = useDispatch();
    const { indexPostsPath } = postsPathHelper();
    const {
        createUserRegistrationsPath,
        newUserSessionsPath
    } = usersPathHelper();
    const [createUserRegistration, { isLoading }] = useSignUpUserMutation();
    const submitButtonRef = useRef();
    const history = useHistory();

    useRedirectIfAlreadyAuth();

    const handleSubmit = async (data) => {
        try {
            const user = await createUserRegistration({
                url: createUserRegistrationsPath,
                body: data
            }).unwrap()
            await setLocalData(AUTH_SLICE_NAME, user)
            dispatch(setCredentials(user))
            history.push(indexPostsPath)
        } catch (error) {
            console.error('SignUpPage#handleSubmit', error)
        }
    }

    return (
        <IonPage>
            <IonContent>
                Sign up

                <UserSignUpForm
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
                <Link to={newUserSessionsPath}>Sign in</Link>

            </IonContent>
        </IonPage>
    )
}

export default SignUpPage
