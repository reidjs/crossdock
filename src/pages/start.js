import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const Start = () => {

  return (
    <Layout>
      <Seo title="Get Started" />
      <div className="p-10 md:w-1/2 flex w-full flex-col justify-center items-center mx-auto my-10">
        <Link to="/find-warehouse" className="w-full mb-8"><button className="">I am a truck driver or dispatcher</button></Link>
        {/* <button onClick={toFindWarehouse}>I am a dispatcher</button> */}
        <Link to="/warehouse-dashboard" className="w-full"><button className="">I am a warehouse manager or worker</button></Link>
      </div>
    </Layout>
  )
}

export default Start