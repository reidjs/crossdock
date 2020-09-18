import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import useFirebase from '../useFirebase';
import fb from 'firebase/app';
import logout from '../logout'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import MapContainer from '../components/map'
import EditableInput from '../components/editable-input'
import Spinner from '../components/spinner'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkout-form";
import { useLocation } from '@reach/router';
// TODO: https://www.gatsbyjs.com/docs/gatsby-link/ programmatic navigation

const COPY = ['1. Finding nearby warehouses that fit criteria', '2. Contacting nearby warehouses', '3. Negotiating best price with nearby warehouses', '4. Done!']

const STEPS = ['1. Introduction', '2. Your Requirements', '3. Get Nearby Warehouses', '4. Pick Your Warehouse', '5. Billing Info', '6. Finished']
const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const FindWarehouse = () => {
  // const x = URLSearchParams.get()
  // console.log('x', x)
  // const location = useLocation();
  // console.log('location', location)
  // console.log('location.search', location.search)

  const [step, setStep] = useState(0)
  const [searchCopy, setCopy] = useState(0)
  const [showBillingInformation, changeBillingInformation] = useState(false)
  // timer, not actually seconds, but time until next piece of copy is shown
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }
  function reset() {
    setCopy(0)
    setSeconds(0)
    clearInterval(interval)
  }

  const [position, setPosition] = useState([51.505, -0.09]);
  const [cost, setCost] = useState('Up to $500')

  if (typeof window !== 'undefined' && window.navigator) {
    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setPosition([+lat, +lng])

      // console.log(`longitude: ${lng} | latitude: ${lat}`);
    }
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
  }
  const startSearch = e => {
    setCopy(0)
    setIsActive(true)
    setStep(2)
  }

  const cancelSearch = e => {
    reset()
    setStep(1)
  }


  const nextStep = () => {
    reset()
    changeStep(step + 1)
  }

  const prevStep = () => {
    reset()
    changeStep(step - 1)
  }

  const changeStep = val => {
    reset()
    // TODO: enable back/forward functionality
    // navigate(`?step=${val}`)
    if (val == 2) {
      console.log('here')
      setIsActive(true)
    } else {
      setIsActive(false)
    }
    setStep(val)
  }

  let interval = null
  useEffect(() => {
    // if (interval) clearInterval(interval)
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
        if (searchCopy < COPY.length - 1) {
          setCopy(searchCopy + 1)
        } else {
          reset()
          // setStep(3)
          changeStep(3)
        }
        // NOTE: these are not actually seconds, but time until the next copy step
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])
  const discreteSteps = STEPS.map((title, idx) => {
    const calculatedWidth = ((100 / STEPS.length) - 5) + "%"
    const startStep = async (i) => {
      // cancelSearch()
      if (i === 0) {
        // console.log(i)
        // return null
      }
      if (i === 2) {
        // reset()
        // startSearch()
        return
      }
      // setStep(i)
    }
    return (
      <div key={title} onClick={() => changeStep(idx)} className={`nice-border mb-8 bg-white text-left mx-4 cursor-pointer px-4 py-2 w-full ${step === idx && 'font-bold bg-blue-400 text-white'}`} style={{ minWidth: calculatedWidth }}>{title}</div>
    )
  })

  return (
    <Layout>
      <SEO title="Find a Warehouse" />
      <div className="flex flex-col md:flex-row">
        <details className="p-10 md:hidden z-50">
          <summary className="cursor-pointer" open>Show Steps</summary>
          <div className="absolute z-50">
            {discreteSteps}
          </div>
        </details>
        <div className="mt-8  flex-col px-16 justify-start w-1/3 hidden md:flex">
          <div className="mb-4">
          {discreteSteps}
          </div>
        </div>
        <div className="w-full md:w-2/3 ">
          <div className={`my-0 mx-auto w-full flex`}>
            <div className={`${step !== 1 ? `hidden` : ''} flex flex-col items-center w-full mt-4 p-16`}>
              <h2 className={`text-2xl mb-4`}>Your Information</h2>
              <EditableInput text="Where are you?" title="address" />
              <br />
              <EditableInput text="What's your license plate #?" title="license #" />
            </div>
            <div className={` ${step !== 1 ? `w-full md:w-full` : `hidden`} p-10`}>
              <MapContainer center={position} />
            </div>
          </div>
          {/* <nav className={`px-8 justify-center`}> */}

          {/* </nav> */}
          {/* <div className="flex flex-col items-center w-full"> */}
          <div className={`${step !== 0 ? `hidden` : 'm-container'}`}>
            <div className={`p-8 container mb-32`}>
              <h2 className={`text-2xl mb-4`}>CrossDock can help you find nearby warehouses to:</h2>
              <ul className={`list-disc ml-4`}>
                <li className={``}>Fix freight that shifted during travel</li>
                <li>Clean up your cargo bay</li>
                <li>Keep your cargo safe for extended periods of time</li>
              </ul>
            </div>
            <button onClick={nextStep} className={`w-full p-6 bg-green-600 font-bold text-base md:text-2xl text-white`}>Find Docks &amp; Warehouses</button>
          </div>
          <div className={`${step !== 1 ? `hidden ` : 'm-container'}`}>
            <div className={`min-w-full p-4 mb-4`}>
              <h2 className={`text-2xl`}>Warehouse Requirements</h2>
              <small>Let the warehouse know what you need</small>
              <ul>
                <li>
                  <details open>
                    <summary>How long do you need to dock? (required)</summary>
                    <div className={`p-4`}>
                      <EditableInput title="time needed" text="1 hour" />
                      <br />
                      <EditableInput title="expected time of arrival" text="3:00pm" />
                    </div>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>What service do you need?</summary>
                    <div className={`p-4`}>
                      <EditableInput title="service required" text="Reworking of product, re-palletizing, new pallets, etc." />
                    </div>
                  </details>
                </li>
                {/* <li>
              <details>
                <summary>How far away can the warehouse be?</summary>
                <div className={`p-4`}>
                  <EditableInput title="distance to warehouse" text="Up to 2 miles away, etc" />
                </div>
              </details>
            </li> */}
                {/* <li>
              <details>
                <summary>How much are you willing to spend?</summary>
                <div className={`p-4`}>
                  <EditableInput title="cost" text="between $200 and $500, etc" callback={setCost} />
                </div>
              </details>
            </li> */}
              </ul>
            </div>

            <div className={`w-full flex px-10 md:flex-row flex-col`}>
              <button onClick={prevStep} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Cancel</button>
              <button onClick={nextStep} className={`w-full p-6 bg-green-500 font-bold text-2xl text-white`}>Go</button>
            </div>
          </div>
          <div className={`${step !== 2 ? `hidden ` : `m-container `}`}>
            <div className="flex flex-col container p-5">
              <div className="flex flex-col items-center ">
                <Spinner />
                <h2>Searching...</h2>
                {/* {seconds} */}
                <h3 className="text-2xl">{COPY[searchCopy]}</h3>
              </div>
              {/* <h2>Details:</h2>
              <details>
                <summary></summary>
                {cost}
              </details> */}
            </div>
            <button onClick={prevStep} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Change Search</button>
          </div>
          <div className={`${step !== 3 ? `hidden ` : `m-container `}`}>
            <div className={`flex flex-col container p-5 mb-4`}>
              <h2 className={`text-2xl mb-4`}>We found these warehouses</h2>
              <ul>
                <li className={`flex mb-4 flex-col md:flex-row`}>
                  <details className="mr-16 w-64">
                    <summary>Albany Warehouse Dock #1432</summary>
                    <p>Supervisor: Johnny Cash</p>
                    <p>Address: 99 Main Street, Albany CA 92323</p>
                  </details>
                  <button className="h-16 w-full md:w-64 flex items-center" onClick={nextStep}>ACCEPT ($344.00)</button>
                </li>
                <li className={`flex flex-col md:flex-row`}>
                  <details className="mr-16 w-64 flex items-center">
                    <summary>Oakland Port Dock #122</summary>
                    <p>Supervisor: Joe Smith</p>
                    <p>Address: 442 Fake Street, Oakland CA 93323</p>
                  </details>
                  <button className="md:w-64 w-full h-16 flex items-center" onClick={nextStep}>ACCEPT ($439.22)</button>
                </li>
              </ul>

            </div>
            <div className={`flex w-full`}>

              <button onClick={() => changeStep(1)} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Change Search</button>
              {/* <button onClick={() => setStep(4)} className={`w-full p-6 bg-green-500 font-bold text-2xl text-white`}>Book Albany Warehouse</button> */}
            </div>
          </div>
          <div className={`${step !== 4 ? `hidden ` : `m-container `}`}>
            <div className={`p-5 flex flex-col container`}>
              <h2 className={`text-2xl`}>Enter your billing information</h2>
              <div className="container">
                <Elements stripe={promise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
            <div className={`flex w-full flex-col md:flex-row`}>
              <button onClick={() => changeStep(3)} className={`w-full p-6 bg-red-500  text-base md:text-2xl font-bold text-white`}>Back to warehouses</button>
              <button onClick={nextStep} className={`w-full p-6 bg-green-500 font-bold text-base md:text-2xl text-white`}>Pay &amp; Get Directions</button>
            </div>
          </div>
          <div className={`${step !== 5 ? `hidden ` : `m-container `}`}>
            <h2 className={`text-2xl`}>Thank you for booking through CrossDock.</h2>
            <ul>
              <li><a className="text-blue-500 underline" href="#">Get directions to the warehouse</a></li>
              <li>Print out your billing information</li>
              <li>Contact support</li>
            </ul>
            <button onClick={() => changeStep(0)} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Restart</button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout >
  )
}

export default FindWarehouse
