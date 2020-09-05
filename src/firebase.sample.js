import firebase from 'firebase/app';
import 'firebase/auth'; // importing the auth module as an example

// Firebase web config
const config = {
  apiKey: "INSERTAPIKEYHERE",
  authDomain: "crossdockme.firebaseapp.com",
  databaseURL: "https://crossdockme.firebaseio.com",
  projectId: "crossdockme",
  storageBucket: "crossdockme.appspot.com",
  messagingSenderId: "655565698803",
  appId: "1:655565698803:web:a7f4aff7c6c41ca1592986"
}

let instance = null;

export default function getFirebase() {
  if (typeof window !== 'undefined') {
    if (instance) return instance;
    instance = firebase.initializeApp(config);
    return instance;
  }

  return null;
}