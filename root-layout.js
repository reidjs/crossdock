import React, { useReducer, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import useFirebase from './src/useFirebase';
import { Helmet } from "react-helmet"
import { StoreCtx, DispatchCtx } from './src/store-ctx'
const initialState = {
  loggedIn: false,
  firstName: '',
  firebase: null,
  user: null,
  bol: [
    ['Procter and Gamble', 'L\'Oreal', '7/1/2020', '100 cases'],
    ['', '', '7/15/2020', '50 cases'],
    ['', 'Head and Shoulders', '6/1/2020', '10 cases'],
    ['', 'Dove', '5/1/2020', '100 cases'],
    ['', '', '6/15/2020', '50 cases'],
    ['', '', '6/30/2020', '50 cases']
  ],
  bolOrig: [
    ['Procter and Gamble', 'L\'Oreal', '7/1/2020', '100 cases'],
    ['', '', '7/15/2020', '50 cases'],
    ['', 'Head and Shoulders', '6/1/2020', '10 cases'],
    ['', 'Dove', '5/1/2020', '100 cases'],
    ['', '', '6/15/2020', '50 cases'],
    ['', '', '6/30/2020', '50 cases']
  ]
  // rows: {
  //   0: ['Procter and Gamble', 'L\'Oreal', '7/1/2020', '100 cases'],
  //   1: ['', '', '7/15/2020', '50 cases'],
  //   2: ['', 'Head and Shoulders', '6/1/2020', '10 cases'],
  //   3: ['', 'Dove', '5/1/2020', '100 cases'],
  //   4: ['', '', '6/15/2020', '50 cases'],
  //   5: ['', '', '6/30/2020', '50 cases']

  // }
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
    case 'UPDATE_BOL':
      // const t = []
      // for(let i = 0; i < action.bol.length; i++) {
      //   t.push(action.bol[i].slice(0))
      // }
      // console.log('newbol', t)
      s.bol = action.bol.slice(0)
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