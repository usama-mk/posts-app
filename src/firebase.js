import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCo3t3Semc_CA4HND3oVesJ-YR2z8JS5Fw",
  authDomain: "uniswap-final.firebaseapp.com",
  projectId: "uniswap-final",
  storageBucket: "uniswap-final.appspot.com",
  messagingSenderId: "569592795905",
  appId: "1:569592795905:web:ce1c32c31140ccd64dc100"
};
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const storage= firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{storage,db,firebaseApp,provider, firebase as default};