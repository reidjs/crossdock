import React, { useContext, useState } from 'react'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import { FancyButton, LoginButton } from '../components/fancy-button'
// import useStore from '../useStore'


const Account = () => {
  // if no user then push to login page
  // show logout
  // useStore()
  const [state, setState] = useState({name: ''})

  const store = useContext(StoreCtx)
  const dispatch = useContext(DispatchCtx)
  const logout = () => {
    store.firebase.auth().signOut().then(res => {
      console.log('res', res)
      dispatch({ type: 'LOGOUT_USER' })
      navigate('/')
    })
  }
  const handleChange = (key, value) => {
    const obj = Object.assign({}, state)
    obj[key] = value
    setState(obj)
  }
  // if (!store.user) {
  //   navigate('/login')
  // }
  return (
    <Layout>
      <div className={`p-4`}>
        <h1 className={`text-4xl mb-8`}>Your Account</h1>
        <form className={`container max-w-2xl p-8`}>
          <div className={`flex flex-col mb-6`}>
          <h1 className={`text-4xl mb-8`}>About you</h1>
          <label className={`font-bold`}>Your Name</label>
          <input className={`p-3 my-2 nice-border`} onChange={(e) => handleChange('name', e.target.value)} type="text" />
          
          </div>
        </form>
        <form className={`container max-w-2xl p-8`}>
          <h1 className={`text-4xl mb-8`}>Your Trucks</h1>
          <LoginButton text="Add new truck"/>
        </form>
        <hr />
        <FancyButton onClick={logout} text="Log Out"></FancyButton>
      </div>
    </Layout>
  )
}


export default Account