import React from 'react'
import UserLogin from '../components/user-login'
import Layout from '../components/layout'
import Seo from '../components/seo'

const Login = () => {
  return (
    <Layout>
      <Seo title="Login" />
      <UserLogin></UserLogin>
    </Layout>
  )
}

export default Login