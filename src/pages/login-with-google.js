import React, { useEffect } from "react"
import useFirebase from '../useFirebase';
import fb from 'firebase/app';
import { navigate } from "gatsby"
const  { NODE_ENV } = process.env

// If logged in, push to index, otherwise to login w/ google
const LoginWithGoogle = () => {
  const firebase = useFirebase();
  const pushToIndexPage = () => {
    return navigate(NODE_ENV == 'production' ? "https://crossdock.me" : "http://localhost:8000/")
  }
  useEffect(() => {
    if (!firebase) return;
    return firebase.auth().onAuthStateChanged((user) => {
      console.log('User:', user);
      if (!user) {
        const provider = new fb.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        return fb.auth().signInWithRedirect(provider).then(function(result) {
          console.log(result)
        })
        return pushToIndexPage()
      } else {
        return pushToIndexPage()
      }
    });
   }, [firebase]);
  return (
    <h1>Logging you in with google...</h1>
  )
}

export default LoginWithGoogle