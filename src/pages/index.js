import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import image from "../images/cargoship.png"
import SEO from "../components/seo"
import { FancyButton } from "../components/fancy-button"
import s from './index.module.css'
import hero from '../images/hero3.jpg'
import vid from '../images/vid.mp4'
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <section className={`hero flex relative min-w-full min-h-full flex-col justify-center container md:text-white text-shadow overflow-hidden w-full min-h-screen`}>
        <div className={`p-16 w-full md:w-1/2`}>
          <h1 className={`text-3xl md:text-6xl mb-10 font-semibold`}>Docks on Demand</h1>
          <p className={`text-2xl mb-2`}>Don't let issues in transit affect your bottom line. Use CrossDock to book nearby warehouse and dock space instantly.</p>
          <p className={`text-lg font-light mb-8`}>We are a one-stop-shop to fix issues that occur in transit. Broken pallets? Shifted merchandise? Need to secure your truck for the day? Our intuitive technology platform will get you where you need to go. Fast.</p>
          <FancyButton text="Let's Go" />
        </div>
        <img className={`relative md:absolute w-full h-full -z-1 max-h-full`} src={hero} />
      </section>
      <section className={`container min-w-full p-10`}>
        <div className={`container min-w-full flex items-center justify-center flex-col min-h-half`}>
          <h2 className={`uppercase`}>top blog posts</h2>
          <ul className={`flex flex-col md:flex-row`}>
            <li className={`p-4 items-center flex md:flex-row flex-col`}>
              <img className={`w-40 h-40 md:mr-4 mr-0`} src={image} />
              <p className="text-center md:text-left">Trade Embargos Revisited: How do They Affect Us?</p>
            </li>
            <li className={`p-4 items-center flex md:flex-row flex-col`}>
              <img className={`w-40 h-40 md:mr-4 mr-0`} src={image} />
              <p className="text-center md:text-left">There's a New Player in the Freight Brokerage Game, and They're Breaking all the Rules.</p></li>
            <li className={`p-4 items-center flex md:flex-row flex-col`}>
              <img className={`w-40 h-40 md:mr-4 mr-0`} src={image} />
              <p className="text-center md:text-left">International Trade, How Does it Work? Who is Involved?</p></li>
          </ul>
        </div>
      </section>
      <section className={`relative hero justify-center flex-col flex min-w-full items-center`}>
        <video className={`relative md:absolute max-h-full min-w-full md:min-h-screen`} style={{ width: "100%", zIndex: '-1' }} loop autoPlay muted playsInline><source src={vid} type="video/mp4" /></video>
        <div className={`z-10 md:text-white flex flex-col ml-half sm:ml-0 p-8 md:pr-16`}>
          <h1 className={`text-3xl md:text-4xl lg:text-6xl mb-10 font-semibold text-shadow`}>We Are the Premium Dock and Warehouse Broker</h1>
          <p className={`text-2xl mb-2 text-shadow`}>Quick booking. Easy to use. Straightforward pricing.</p>
          <p className={`text-lg font-light mb-8 text-shadow`}>When you use CrossDock, you can't lose. </p>
          <FancyButton text="Learn More" />
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
