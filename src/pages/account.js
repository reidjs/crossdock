import React from 'react'
import UserAccount from '../components/user-account'
import Layout from '../components/layout'
import SEO from '../components/seo'
const Account = () => {
  return (
    <Layout>
      <SEO title="Account"/>
      <UserAccount pushToAccountPage={true} />
    </Layout>
  )
}

export default Account