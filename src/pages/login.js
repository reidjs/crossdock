import React, { useContext, useState } from 'react'
import { GoogleButton, LoginButton } from '../components/fancy-button'
import Layout from '../components/layout'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'

const COPY = ['Sign in to CrossDock', 'Create an Account']
const COPY2 = ['Register an Account', 'Log in to your Account']

const Login = () => {
  const store = useContext(StoreCtx)
  const dispatch = useContext(DispatchCtx)
  const [state, setState] = useState({email: '', password: '', copy: 0})
  // console.log(state)
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
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code, error.message)
      if (error.code == 'auth/email-already-in-use') {
        auth.signInWithEmailAndPassword(email, password).catch(function(error2) {
          console.log(error2.code, error2.message)
        })
      }
    });
  }
  const submit = (e) => {
    e.preventDefault()
    authUser(store.firebase.auth(), state.email, state.password)
    dispatch({ type: 'CHANGE_LOGIN'})
    // if successful, push to integrations, can watch auth and push on change
  }
  if (store && store.user) {
    navigate('/account')
  }
  return (
    <Layout>
      <form className="max-w-4xl my-0 mx-auto">
        <h1 className={`text-4xl mb-8`}>Sign in to CrossDock</h1>
        <div className={`flex flex-col mb-6`}>
          <label className={`font-bold`}>Email</label>
          <input className={`p-3 my-2 nice-border`} onChange={(e) => handleChange('email', e.target.value)} type="email" />
          <label className={`font-bold`}>Password</label>
          <input className={`p-3 my-2 nice-border`} onChange={(e) => handleChange('password', e.target.value)} type="password" />
          <small>At least 6 characters</small>
        </div>
        {/* <button onClick={this.submit}>Sign in to CrossDock</button> */}
        <div className={`mb-5`}>
          <LoginButton onClick={submit} text={COPY[state.copy]} />
        </div>
        <GoogleButton />
        <a onClick={toggleCopy}>{COPY2[state.copy]}</a>
      </form>
    </Layout>
  )
}


export default Login