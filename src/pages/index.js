import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import image from "../images/cargoship.png"
import SEO from "../components/seo" 
import FancyButton from "../components/fancy-button" 
import s from './index.module.css'
import hero from '../images/hero2.jpg'
import vid from '../images/vid.mp4'
const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Home" />
    <section className={`hero flex relative min-w-full min-h-full flex-col justify-center container md:text-white text-shadow overflow-hidden w-full min-h-screen`}>
      <div className={`p-16 w-full md:w-1/2`}>
        <h1 className={`text-6xl mb-10 font-semibold`}>The New Way Forward</h1>
        <p className={`text-2xl mb-2`}>Your business is evolving. Shouldn't your freight forwarder?</p>
        <p className={`text-lg font-light mb-8`}>Say goodbye to the black box of freight forwarding. Only Flexport delivers deep visibility and control, low and predictable supply chain costs, with faster and more reliable transit times. All from a powerful technology platform.</p>
        <FancyButton text="Get Started" />
      </div>
      <img className={`relative md:absolute w-full h-full -z-1 max-h-full`} src={hero}/>
    </section>
    <section className={`container min-w-full p-10`}>
      <div className={`container min-w-full flex items-center justify-center flex-col min-h-half`}>
        <h2 className={`uppercase`}>featured blog posts</h2>
        <ul className={`flex flex-col md:flex-row`}>
          <li className={`p-4 items-center flex`}>
            <img className={`w-40 h-40 mr-4`} src={image} />
            <p>Recent Trade Volatility Sheds Light on How Shippers Should Think About Forecasting</p>
          </li>
          <li className={`p-4 items-center flex`}>
            <img className={`w-40 h-40 mr-4`} src={image} />
            <p>Brexit Update: Trade Issues Explained as the Clock Ticks Down</p></li>
          <li className={`p-4 items-center flex`}>
          <img className={`w-40 h-40 mr-4`} src={image} />

            <p>The Art and Science of Simplifying the Complexity of Global Trade</p></li>
        </ul>
      </div>
    </section>
    <section className={`relative hero justify-center flex-col flex min-w-full items-center`}>
      <video className={`relative md:absolute max-h-full min-w-full md:min-h-screen`}style={{width: "100%", 'z-index': '-1'}} loop autoPlay muted ><source src={vid} type="video/mp4"/></video>
      <div className={`z-10 md:text-white flex flex-col ml-half sm:ml-0 p-16`}>
        <h1 className={`text-6xl mb-10 font-semibold text-shadow`}>We Are the Operating System for Global Trade</h1>
        <p className={`text-2xl mb-2 text-shadow`}>Technology. Infrastructure. Expertise.</p>
        <p className={`text-lg font-light mb-8 text-shadow`}>It takes more than dashboards or digital marketplaces to be a true freight forwarding partner. </p>
        <FancyButton text="Learn More"/>
      </div>
    </section>
  </Layout>
)}

export default IndexPage
