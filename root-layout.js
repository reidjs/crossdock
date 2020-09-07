import React, { createContext, useReducer } from 'react';
const FirebaseCtx = createContext()
const initialState = {
  loggedIn: false,
  firstName: '', 
}


function storeReducer(state, action) {
  const s = Object.assign({}, state)
  console.log('state, action', state, action)
  switch(action.type) {
    case 'CHANGE_LOGIN':
      s.loggedIn = !s.loggedIn
      return s
    default:
      return s
  }
}

export default function RootLayout({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <>
      <FirebaseCtx.Provider value={{state, dispatch}}>
        {children}
      </FirebaseCtx.Provider>
    </>
  );
}