import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import usersPathHelper from 'helper/pathHelper/users';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'store/slices/application';
import './Home.scss';

const Home = () => {
  const { newUserRegistrationsPath, newUserSessionsPath } = usersPathHelper()
  const applicationState = useSelector(state => state.application)
  const dispatch = useDispatch()
  const handleToggleModal = () => {
    dispatch(toggleModal())
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/posts">
            <IonLabel>Posts</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem routerLink={newUserRegistrationsPath}>
            <IonLabel>Sign up</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem routerLink={newUserSessionsPath}>
            <IonLabel>Sign in</IonLabel>
          </IonItem>
        </IonList>
        <div>
          <button onClick={handleToggleModal}>Toggle</button>
          Modal: {applicationState.isModalOpen.toString()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
