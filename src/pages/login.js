import React, { useState } from 'react'
import { GoogleButton, LoginButton } from '../components/fancy-button'
import Layout from '../components/layout'
import { StoreCtx } from '../store-ctx'

const COPY = ['Sign in to CrossDock', 'Create an Account']
const COPY2 = ['Register an Account', 'Log in to your Account']

class Login extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '', copy: 0 }
  }
  handleChange = (key, value) => {
    const obj = {}
    obj[key] = value
    this.setState(obj)
  }
  authUser = (auth, email, password) => {
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code, error.message)
      if (error.code == 'auth/email-already-in-use') {
        auth.signInWithEmailAndPassword(email, password).catch(function(error2) {
          console.log(error2.code, error2.message)
        })
      }
    });
  }
  submit = (e, store) => {
    e.preventDefault()
    this.authUser(store.state.firebase.auth(), this.state.email, this.state.password)
    store.dispatch({ type: 'CHANGE_LOGIN'})
  }
  toggleCopy = () => {
    const copy = this.state.copy === 0 ? 1 : 0
    this.setState({ copy })
  }
  render() {
    console.log('this.context', this.context)
    return (
      <StoreCtx.Consumer>
        {store => {
          return (
            <Layout>
              <form className="max-w-4xl my-0 mx-auto">
                <h1 className={`text-4xl mb-8`}>Sign in to CrossDock</h1>
                <div className={`flex flex-col mb-6`}>
                  <label className={`font-bold`}>Email</label>
                  <input onChange={(e) => this.handleChange('email', e.target.value)} type="email" />
                  <label className={`font-bold`}>Password</label>
                  <input onChange={(e) => this.handleChange('password', e.target.value)} type="password" />
                  <small>At least 6 characters</small>
                </div>
                {/* <button onClick={this.submit}>Sign in to CrossDock</button> */}
                <div className={`mb-5`}>
                  <LoginButton onClick={(e) => this.submit(e, store)} text={COPY[this.state.copy]}/>
                </div>
                <GoogleButton />
                <a onClick={this.toggleCopy}>{COPY2[this.state.copy]}</a>
              </form>
            </Layout>
          )
        }
        }
      </StoreCtx.Consumer>
    )
  }
}

export default Login