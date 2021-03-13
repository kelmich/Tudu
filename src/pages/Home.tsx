import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import firebase from 'firebase';
import { exitOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tudu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <IonButton onClick={() => { firebase.auth().signOut() }}>
                    Logout
                    <IonIcon slot="start" icon={exitOutline} />
                </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
