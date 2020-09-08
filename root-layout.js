import React, { createContext, useReducer, useEffect } from 'react';
import firebase from 'firebase/app';
import useFirebase from './src/useFirebase';
import { StoreCtx } from './src/store-ctx'
const initialState = {
  loggedIn: false,
  firstName: '',
  firebase: null
}


function storeReducer(state, action) {
  const s = Object.assign({}, state)
  console.log('state, action', state, action)
  switch(action.type) {
    case 'CHANGE_LOGIN':
      s.loggedIn = !s.loggedIn
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

  useEffect(() => {
    if (!fbHook) return;
    return dispatch({ type: 'SET_FIREBASE', firebase })
   }, [fbHook]);
  return (
    <>
      <StoreCtx.Provider value={{state, dispatch}}>
        {children}
      </StoreCtx.Provider>
    </>
  );
}