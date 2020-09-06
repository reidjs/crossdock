import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo" 
import FancyButton from "../components/fancy-button" 
import s from './index.module.css'
const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Home" />
    <section className={`container p-10`}>
      <h1 className={`text-6xl mb-10 font-semibold`}>The New Way Forward</h1>
      <p className={`text-2xl mb-2`}>Your business is evolving. Shouldn't your freight forwarder?</p>
      <p className={`text-lg font-light mb-8`}>Say goodbye to the black box of freight forwarding. Only Flexport delivers deep visibility and control, low and predictable supply chain costs, with faster and more reliable transit times. All from a powerful technology platform.</p>
      <FancyButton text="Get Started" />
    </section>  
  </Layout>
)}

export default IndexPage
