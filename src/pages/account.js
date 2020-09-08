import React, { useContext } from 'react'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
// import useStore from '../useStore'


const Account = () => {
  // if no user then push to login page
  // show logout
  // useStore()
  const store = useContext(StoreCtx)
  const dispatch = useContext(DispatchCtx)
  console.log('store.state', store)
  const logout = () => {
    store.firebase.auth().signOut().then(res => {
      console.log('res', res)
      dispatch({ type: 'LOGOUT_USER' })
      navigate('/')
    })
  }
  // if (!store.user) {
  //   navigate('/login')
  // }
  return (
    <div>
      <h1>Your Account</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}


export default Account