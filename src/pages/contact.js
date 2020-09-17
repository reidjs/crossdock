import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import reid from '../images/reidheadshot.jpeg'
import steve from '../images/steveheadshot.jpeg'
const Contact = () => {
  return (
    <Layout>
      <Seo title="Contact" />
      <div className="my-10 mx-auto">
        <h1 className="text-2xl text-center mb-8 font-bold underline">The Team</h1>
        <div className="flex">
          <div className="mr-10">
            <img className="rounded-full" src={reid} />
            <div className="text-center">
              <h1 className="font-bold">Reid Sherman</h1>
              <small>Software Developer</small>
              <ul>
                <li>Web Application</li>
                <li>Product Design</li>
                <li><a className="text-blue-500 underline" href="https://www.linkedin.com/in/reidsherman/">Linkedin</a></li>
              </ul>
            </div>
          </div>
          <div>
            <img className="rounded-full" src={steve} />
            <div className="text-center">
            <h1 className="font-bold">Stephen Schlect</h1>
            <small>Supply Chain Manager</small>
            <ul>
              <li>Business Planning</li>
              <li>Operations</li>
              <li><a className="text-blue-500 underline" href="https://www.linkedin.com/in/stephenschlecht/">Linkedin</a></li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact