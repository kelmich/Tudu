import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './Home.css';
import firebase from "firebase";

import { person } from 'ionicons/icons';
import { useEffect } from 'react';

const Home: React.FC<RouteComponentProps> = function ({ history }) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            // user is already logged in
            if (user) {
                history.push('/home');
            } else {
                // user returned from external login
                firebase.auth()
                    .getRedirectResult()
                    .then((result: firebase.auth.UserCredential) => {
                        if (result.credential) {
                            firebase.auth().signInWithCredential(result.credential);
                            history.push('/home');
                        } else {
                            history.push("/login");
                        }
                    });
            }
        });
    }, []);
    var provider = new firebase.auth.GoogleAuthProvider();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonButton onClick={() => { firebase.auth().signInWithRedirect(provider); }}>
                    Login
                    <IonIcon slot="start" icon={person} />
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
