import React, { useEffect, useState } from "react"
// import useFirebase from '../useFirebase';
import firebase from 'firebase/app';
import { navigate, Link } from "gatsby"
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
const { NODE_ENV } = process.env
// If logged in, push to index, otherwise to login w/ google
const GoogleLogin = () => {
  const [failMessage, setError] = useState('')
  const [loaded, setLoaded] = useState('loading')
  // const firebase = useFirebase();
  const pushToIndexPage = () => {
    return navigate(NODE_ENV == 'production' ? "https://crossdock.me" : "http://localhost:8000/")
  }
  // useEffect(() => {
  //   if (!firebase) {
  //     console.log('firebase empty?', firebase)
  //     setTieout(1000)
  //     return
  //   };
  //   return firebase.auth().onAuthStateChanged((user) => {
  //     console.log('User:', user);
  //     if (!user) {
  //       const provider = new fb.auth.GoogleAuthProvider()
  //       // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //       provider.addScope('profile')
  //       return fb.auth().signInWithRedirect(provider).then(function(result) {
  //         console.log(result)
  //         return fb.auth().getRedirectResult().then(function(result) {
  //           const u = result.user 
  //           const t = result.credential.accessToken
  //           console.log('u, t', u, t)
  //           // return pushToIndexPage()
  //         })
  //         // return pushToIndexPage()
  //       }).catch(err => {
  //         console.log('err', err)
  //       })
  //     } else {
  //       // return pushToIndexPage()
  //     }
  //   });
  //  }, [firebase]);
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    setLoaded('loggingin')
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
        console.log('credential', credential)
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function() {
          console.log('here!')
          setLoaded('pushtoaccount')
          navigate('/account')
        }).catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          console.log('error', error)
          
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }
  const handleFail = (err) => {
    console.log('err', err)
    setError('Error: ', err.error)
  }
  useEffect(() => {
    if (window && window.gapi && window.gapi.signin2) {
      try {
        window.gapi.signin2.render('g-signin2', {
          'scope': 'profile',
          // 'width': '300',
          'height': 50,
          // 'longtitle': true,
          // 'theme': 'dark',
          'onsuccess': onSignIn,
          'onfailure': handleFail,
        })
      } catch (err) {
        console.log(err)
      }
    }

  })
  return (
    // <Layout>
    <div>
      <Helmet>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="1044355092273-3u80rrukpjon6ov7bjrln207hce7m5rs.apps.googleusercontent.com" />
        <meta name="google-signin-cookiepolicy" content="single_host_origin" />
        <meta name="google-signin-scope" content="profile email" />
      </Helmet>
      {/* <p>Cookies are required for Google Signin</p> */}
      <div className="w-full" className="g-signin2" id="g-signin2">{loaded}</div>
      <small className={`text-color-red`}>{failMessage}</small>
    </div>
  )
}

export default GoogleLogin