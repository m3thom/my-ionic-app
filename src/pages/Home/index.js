import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import applicationSlice from 'store/slices/application';
import './Home.css';

const Home = () => {
  const applicationState = useSelector(state => state.application)
  const dispatch = useDispatch()
  const toggleModal = () => {
    dispatch(applicationSlice.actions.toggleModal())
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
        <div>
          <button onClick={toggleModal}>Toggle</button>
          Modal: {applicationState.isModalOpen.toString()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
