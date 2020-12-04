import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTqx3_TS9WdxhMkpO-_XyuyIALkSLENDs",
  authDomain: "clients-project-e9028.firebaseapp.com",
  databaseURL: "https://clients-project-e9028.firebaseio.com",
  projectId: "clients-project-e9028",
  storageBucket: "clients-project-e9028.appspot.com",
  messagingSenderId: "919784764072",
  appId: "1:919784764072:web:ff30fb97cdbd58be8cc89d",
  measurementId: "G-JXHCZXJ08W"
};
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const storage= firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{storage,db,firebaseApp,provider, firebase as default};