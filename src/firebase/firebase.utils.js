import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
  apiKey: "AIzaSyBTCj62kE7hWMBwc2KO0SzNo_aHpl6foaI",
  authDomain: "new-threads.firebaseapp.com",
  databaseURL: "https://new-threads.firebaseio.com",
  projectId: "new-threads",
  storageBucket: "new-threads.appspot.com",
  messagingSenderId: "511913319353",
  appId: "1:511913319353:web:174b7df7bffec34f11b468",
  measurementId: "G-F27G2TCVHD"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
