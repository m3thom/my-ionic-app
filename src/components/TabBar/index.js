import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react'
import { ellipse, triangle } from 'ionicons/icons';

const TabBar = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                {/* To implment setting(hide tabbar) */}
            </IonRouterOutlet>

            <IonTabBar
                slot="bottom"
            // style={{ visibility: 'visible' }}
            >
                <IonTabButton tab="tab1" href="/home">
                    <IonIcon icon={triangle} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/posts">
                    <IonIcon icon={ellipse} />
                    <IonLabel>Posts</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default TabBar
