import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

async function login(username, password) {
  const docRef = doc(db, "users", username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const userCredential = await signInWithEmailAndPassword(
      auth,
      username + "@example.com",
      docSnap.data().enc_password
    );
    console.log(userCredential);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export default login;
