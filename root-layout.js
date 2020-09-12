import React, { createContext, useReducer, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import useFirebase from './src/useFirebase';
import { Helmet } from "react-helmet"
import { StoreCtx, DispatchCtx } from './src/store-ctx'
const initialState = {
  loggedIn: false,
  firstName: '',
  firebase: null,
  user: null
}


function storeReducer(state, action) {
  const s = Object.assign({}, state)
  console.log('state, action', state, action)
  switch (action.type) {
    case 'CHANGE_LOGIN':
      s.loggedIn = !s.loggedIn
      return s
    case 'SET_USER':
      s.user = action.user
      return s
    case 'LOGOUT_USER':
      s.user = null
      return s
    case 'SET_FIREBASE':
      s.firebase = action.firebase
      return s
    default:
      return s
  }
}

export default function RootLayout({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const fbHook = useFirebase();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!fbHook) return;
    fbHook.auth().onAuthStateChanged((user) => {
      dispatch({ type: 'SET_USER', user })
    })
    dispatch({ type: 'SET_FIREBASE', firebase })
  }, [fbHook]);
  useEffect(() => {
    // Prevent FOUC
    const timeout = setTimeout(() => {
      setMounted(true)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Helmet
        htmlAttributes={{
          class: mounted ? 'js' : 'no-js'
        }}>
        {/* <script>{`window.document.documentElement.className="js"`}</script> */}
      </Helmet>
      <StoreCtx.Provider value={state}>
        <DispatchCtx.Provider value={dispatch}>
          {children}
        </DispatchCtx.Provider>
      </StoreCtx.Provider>
    </>
  );
}