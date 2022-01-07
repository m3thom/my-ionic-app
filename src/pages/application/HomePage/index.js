import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import usersPathHelper from 'helper/pathHelper/users';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'store/slices/application';
import './Home.scss';
import { PushNotifications } from '@capacitor/push-notifications';
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
     
const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
 
const Home = () => {
  const { newUserRegistrationsPath, newUserSessionsPath } = usersPathHelper()
  const applicationState = useSelector(state => state.application)
  const dispatch = useDispatch()
  const handleToggleModal = () => {
    dispatch(toggleModal())
  }
  const [notifications, setnotifications] = useState([]);

  useEffect(() => {
    if (!isPushNotificationsAvailable) return

    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== 'granted') {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === 'denied') {
            console.log('Push Notification permission denied');
          }
          else {
            console.log('Push Notification permission granted');
            register();
          }
        });
      }
      else {
        register();
      }
    });
  }, [])

  useEffect(() => {

    console.log('notifications', notifications);

  }, [notifications])

  const register = () => {
    console.log('Initializing HomePage');

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token is:', token.value);
    }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
    }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
    }
    );
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
          Modal ieie ja: {applicationState.isModalOpen.toString()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
