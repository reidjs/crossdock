/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Svg from './svg'
import Header from "./header"
// import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      {/* <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer> */}
      <footer className={`container flex flex-col justify-center items-center w-100 mx-auto my-0`}>
        <ul className={`flex m-10`}>
          <li className={`mr-6`}>Why CrossDock</li>
          <li className={`mr-6`}>Logistics Services</li>
          <li className={`mr-6`}>Supply Chain Services</li>
          <li className={`mr-6`}>Resources</li>
          <li className={`mr-6`}>Company</li>
        </ul>
        <ul className={`flex m-6`}>
          <li><Svg className={`w-8 h-8 mr-4`} html={`<path xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;fill:#010101;" d="M480,257.35c0-123.7-100.3-224-224-224s-224,100.3-224,224 c0,111.8,81.9,204.47,189,221.29V322.12h-56.89v-64.77H221v-49.36c0-56.13,33.45-87.16,84.61-87.16c24.51,0,50.15,4.38,50.15,4.38 v55.13h-28.26c-27.81,0-36.51,17.26-36.51,35v42.02h62.12l-9.92,64.77h-52.2v156.53C398.1,461.85,480,369.18,480,257.35L480,257.35z "/>`}/></li>
          <li><Svg className={`w-8 h-8 mr-4`} html={`<path xmlns="http://www.w3.org/2000/svg" d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"/>`}/></li>
          <li><Svg className={`w-8 h-8`} html={`<rect xmlns="http://www.w3.org/2000/svg" x="48" y="96" width="416" height="320" rx="40" ry="40" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline xmlns="http://www.w3.org/2000/svg" points="112 160 256 272 400 160" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>`}/></li>
        </ul>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
