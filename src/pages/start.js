import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { WarehouseStartButton, TruckerStartButton } from '../components/fancy-button'

const Start = () => {

  return (
    <Layout>
      <Seo title="Get Started" />
      {/* <div className="p-10 md:w-3/4 flex w-full flex-col md:flex-row justify-center md:justify-between items-center md:items-start mx-auto my-10"> */}
      {/* <Link to="/warehouse-dashboard" className="w-full mb-4"><button className="">I am a warehouse manager or worker</button></Link> */}
      <div className="flex container p-20 mx-auto my-2 lg:my-10 flex-col lg:flex-row pt-4">
        <div className="w-full mr-0 lg:mr-16 md:w-1/2 flex flex-col items-between mb-12 lg:mb-0">
          <div className="mb-16">
            <h1 className="font-bold text-lg lg:text-2xl nowrap">Warehouse and Dock Managers</h1>
            <h2 className="text-base lg:text-lg lg:pl-2 mb-2">CrossDock can generate extra revenue by:</h2>
            <ul className="lg:pl-4 list-disc">
              <li>Helping you book unused warehouse and dock space.</li>
              <li>Advertise your services to nearby shippers</li>
              <li>Keep track of your GS1 Bill of Lading documentation</li>
            </ul>
          </div>
          <div className="px-10">
            <WarehouseStartButton />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-between">
          <div className="mb-16">
            <h1 className="font-bold text-lg lg:text-2xl nowrap">Truck Drivers, Shippers, and Dispatchers</h1>
            <h2 className="text-base lg:text-lg lg:pl-2 mb-2">CrossDock can save you money by:</h2>
            <ul className="lg:pl-4 list-disc">
              <li>Helping you book unused warehouse and dock space.</li>
              <li>Advertise your services to nearby shippers</li>
              <li>Keep track of your GS1 Bill of Lading documentation</li>
            </ul>
          </div>
          <div className="px-10">
            <TruckerStartButton />
          </div>
        </div>

        {/* <Link to="/find-warehouse" className="w-full"><button className="">I am a truck driver or dispatcher</button></Link> */}
        {/* <button onClick={toFindWarehouse}>I am a dispatcher</button> */}
      </div>
    </Layout>
  )
}

export default Start