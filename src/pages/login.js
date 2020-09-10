import React, { useContext, useState, useEffect } from 'react'
import { LoginButton } from '../components/fancy-button'
import Layout from '../components/layout'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'
import firebase from 'firebase/app';
// import GoogleLogin from '../components/google-login'
// import fbHook from '../useFirebase'
// import { Helmet } from 'react-helmet'
import Seo from '../components/seo'

const COPY = ['Sign in to CrossDock', 'Create an Account']
const COPY2 = ['Register an Account', 'Log in to your Account']

const Login = () => {
  const [failMessage, setError] = useState('')
  const [loaded, setLoaded] = useState('')
  const [hasMounted, setHasMounted] = React.useState(false);


  const store = useContext(StoreCtx)
  const dispatch = useContext(DispatchCtx)
  const [state, setState] = useState({ email: '', password: '', copy: 0 })
  // console.log(state)
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
    setLoaded('loggingin')
    // dispatch({ type: 'TEST' })
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
        // console.log('credential', credential)
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function () {
          setLoaded('pushuser')
          console.log('here!')
        }).catch(function (error) {
          // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // The email of the user's account used.
          // const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // const credential = error.credential;
          console.log('error', error)

          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
        navigate('/account')
      }
    });
  }
  const handleFail = (err) => {
    console.log('err', err)
    setError('Error: ', err.error)
  }
  const toggleCopy = () => {
    const copy = state.copy === 0 ? 1 : 0
    const s = Object.assign({}, state, { copy })
    setState(s)
  }
  const handleChange = (key, value) => {
    const obj = Object.assign({}, state)
    obj[key] = value
    setState(obj)
  }
  const authUser = (auth, email, password) => {
    auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      console.log(error.code, error.message)
      if (error.code == 'auth/email-already-in-use') {
        auth.signInWithEmailAndPassword(email, password).then(function () {
          navigate('/account')
        }).catch(function (error2) {
          console.log(error2.code, error2.message)
        })
      }
    });
  }
  const submit = (e) => {
    e.preventDefault()
    authUser(store.firebase.auth(), state.email, state.password)
    dispatch({ type: 'CHANGE_LOGIN' })
    // if successful, push to integrations, can watch auth and push on change
  }
  const guestLogin = e => {
    e.preventDefault()
    authUser(store.firebase.auth(), 'a@b.com', '123456')
    dispatch({ type: 'CHANGE_LOGIN' })

  }

  useEffect(() => {
    if (window && window.gapi && window.gapi.signin2 && loaded !== 'loggingin') {
      // console.log('window.gapi', window.gapi)
      // we need this to trigger BEFORE the script?
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
    if (loaded === 'pushuser') {
      console.log('here!')
      navigate('/account')
    }
  })
  // Hack to get the google button to repaint 😞 race condition?
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log(`state: ${loaded}!`)
  //     if (window) {
  //       console.log(window.gapi)
  //     }
  //     if (window && window.gapi && window.gapi.signin2 && loaded !== 'loggingin') {
  //       // console.log('window.gapi', window.gapi)
  //       try {
  //         window.gapi.signin2.render('g-signin2', {
  //           'scope': 'profile',
  //           // 'width': '300',
  //           'height': 50,
  //           // 'longtitle': true,
  //           // 'theme': 'dark',
  //           'onsuccess': onSignIn,
  //           'onfailure': handleFail,
  //         })
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }
  //     setLoaded('loading')
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, [loaded]);


  // if (store && store.user) {
  //   navigate('/account')
  // }
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // if (!hasMounted) {
  //   console.log('hasMounted', hasMounted)
  //   return null
  // }

  return (
    <Layout>
      <Seo title="Login"/>

      <form className="max-w-4xl my-0 mx-auto">
        <h1 className={`text-4xl mb-8`}>Sign in to CrossDock</h1>
        <div className={`flex flex-col mb-6`}>
          <label className={`font-bold`}>Email</label>
          <input className={`p-3 my-2 nice-border`} onChange={(e) => handleChange('email', e.target.value)} type="email" />
          <label className={`font-bold`}>Password</label>
          <input className={`p-3 my-2 nice-border`} onChange={(e) => handleChange('password', e.target.value)} type="password" />
          <small>At least 6 characters</small>
        </div>
        {/* EMAIL/PASSWORD LOGIN */}
        <div className={`mb-5`}>
          <LoginButton onClick={submit} text={COPY[state.copy]} />
        </div>
        {/* REGISTER ACCT */}
        <div className={`mb-5`}>
          <a className={`text-blue underline cursor-pointer`} onClick={toggleCopy}>{COPY2[state.copy]}</a>
        </div>
        {/* GOOOGLE LOGIN */}
        <div className={`mb-5`} >
          <div className="w-full" id="g-signin2"></div>
          <small className={`text-color-red`}>{failMessage}</small>
          <small>Cookies are required for Google Login</small>
        </div>
        {/* GUEST LOGIN */}
        <div className={`mb-5`}>
          <LoginButton onClick={guestLogin} text="Continue as Guest"></LoginButton>
        </div>
        {/* <Helmet>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="1044355092273-3u80rrukpjon6ov7bjrln207hce7m5rs.apps.googleusercontent.com" />
        <meta name="google-signin-cookiepolicy" content="single_host_origin" />
        <meta name="google-signin-scope" content="profile email" />
      </Helmet> */}
      </form>
    </Layout>
  )
}


export default Login