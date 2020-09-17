import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
const Contact = () => {
  return (
    <Layout>
      <Seo title="Contact"/>
      <div>
        <h1>Reid Sherman</h1>
        <small>Software Developer</small>
        <ul>
          <li>Web Application</li>
          <li>Product Design</li>
        </ul>
        <h1>Stephen Schlect</h1>
        <small>Logistics Specialist</small>
        <ul>
          <li>Business Plan</li>
          <li>Operations</li>
        </ul>
      </div>
    </Layout>
  )
}

export default Contact