import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './Home.css';
import firebase from "firebase";

import { useEffect } from 'react';

const Home: React.FC<RouteComponentProps> = function({ history }) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            // user is already logged in
            if(user) {
                history.push('/home');
            } else {
                history.push("/login");
            }
          });
    }, []);
    var provider = new firebase.auth.GoogleAuthProvider();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Splash</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    );
};

export default Home;
