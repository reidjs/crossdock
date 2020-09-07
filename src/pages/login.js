import React, { useState } from 'react'
import { GoogleButton, LoginButton } from '../components/fancy-button'
import Layout from '../components/layout'
class Login extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '' }
  }
  handleChange = (key, value) => {
    const obj = {}
    obj[key] = value
    this.setState(obj)
  }
  submit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }
  render() {
    return (
      <Layout>
        <form className="max-w-4xl my-0 mx-auto">
          <h1 className={`text-4xl mb-8`}>Sign in to CrossDock</h1>
          <div className={`flex flex-col mb-6`}>
            <label className={`font-bold`}>Email</label>
            <input onChange={(e) => this.handleChange('email', e.target.value)} type="email"/>
            <label className={`font-bold`}>Password</label>
            <input onChange={(e) => this.handleChange('password', e.target.value)} type="password" />
            <small>At least 6 characters</small>
          </div>
          {/* <button onClick={this.submit}>Sign in to CrossDock</button> */}
          <div className={`mb-5`}>
            <LoginButton onClick={this.submit}/>
          </div>
          <GoogleButton />
        </form>
      </Layout>
    )
  }
}

export default Login