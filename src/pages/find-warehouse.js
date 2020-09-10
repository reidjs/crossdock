import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import useFirebase from '../useFirebase';
import fb from 'firebase/app';
import logout from '../logout'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import MapContainer from '../components/map'
import EditableInput from '../components/editable-input'
import Spinner from '../components/spinner'

const COPY = ['1. Finding nearby warehouses that fit criteria', '2. Contacting nearby warehouses', '3. Negotiating best price with nearby warehouses', '4. Done!']

const FindWarehouse = () => {
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
    setIsActive(false)
  }

  const [position, setPosition] = useState([51.505, -0.09]);
  const [cost, setCost] = useState('Up to $500')

  if (typeof window !== 'undefined' && window.navigator) {
    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setPosition([+lat, +lng])

      console.log(`longitude: ${lng} | latitude: ${lat}`);
    }
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
  }
  const startSearch = e => {
    toggle()
    setStep(2)
  }

  const cancelSearch = e => {
    reset()
    setStep(1)
  }

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
        if (searchCopy < COPY.length - 1) {
          setCopy(searchCopy + 1)
        } else {
          reset()
          setStep(3)
        }
        // NOTE: these are not actually seconds, but time until the next copy step
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  return (
    <Layout>
      <SEO title="Find a Warehouse" />
      <div className="w-screen h-full">
        <MapContainer center={position} />
      </div>
      <div className={`${step !== 0 && `hidden `}`}>
        <div className={`p-8 container`}>
          <h2 className={`text-2xl mb-4`}>CrossDock can help you find nearby warehouses to:</h2>
          <ul className={`list-disc ml-4`}>
            <li className={``}>Fix freight that shifted during travel</li>
            <li>Clean up your cargo bay</li>
            <li>Keep your cargo safe for extended periods of time</li>
          </ul>
        </div>
        <button onClick={() => setStep(1)} className={`w-full p-6 bg-green-600 font-bold text-2xl text-white`}>Find Warehouse</button>
      </div>
      <div className={`${step !== 1 && `hidden `}`}>
        <div className={`min-w-full p-4 mb-8`}>
          <h2>Warehouse Requirements</h2>
          <small>Let the warehouse know what you need</small>
          <ul>
            <li>
              <details>
                <summary>How long do you need to dock?</summary>
                <div className={`p-4`}>
                  <EditableInput title="time needed (hours, days, etc.)" text="1 hour" />
                  <br />
                  <EditableInput title="expected time of arrival" text="3:00pm" />
                </div>
              </details>
            </li>
            <li>
              <details>
                <summary>Do you need any help or special equipment?</summary>
                <div className={`p-4`}>
                  <EditableInput title="help required (number of workers, tools, etc)" text="A dockhand and some pallets, etc" />
                </div>
              </details>
            </li>
            <li>
              <details>
                <summary>How far away can the warehouse be?</summary>
                <div className={`p-4`}>
                  <EditableInput title="distance to warehouse" text="Up to 2 miles away, etc" />
                </div>
              </details>
            </li>
            <li>
              <details>
                <summary>How much are you willing to spend?</summary>
                <div className={`p-4`}>
                  <EditableInput title="cost" text="between $200 and $500, etc" callback={setCost} />
                </div>
              </details>
            </li>
          </ul>
        </div>
        <div className={`flex`}>
          <button onClick={() => setStep(0)} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Cancel</button>
          <button onClick={() => startSearch()} className={`w-full p-6 bg-green-500 font-bold text-2xl text-white`}>Go</button>
        </div>
      </div>
      <div className={`${step !== 2 && `hidden `}`}>
        <div className="flex flex-col container p-5">
          <div className="flex flex-col items-center ">
            <Spinner />
            <h2>Searching...</h2>
            {/* {seconds} */}
            <h3 className="text-2xl">{COPY[searchCopy]}</h3>
          </div>
          <h2>Details:</h2>
          <details>
            <summary>Cost</summary>
            {cost}
          </details>
        </div>
        <button onClick={() => cancelSearch()} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Change Search</button>
      </div>
      <div className={`${step !== 3 && `hidden `}`}>
        <div className={`flex flex-col container p-5`}>
          <h2 className={`text-2xl mb-4`}>We found these warehouses (TODO: show on map)</h2>
          <ul>
            <li className={`flex justify-between mb-4`}>
              <details>
                <summary>Albany Warehouse Dock #1432</summary>
                <p>Supervisor: Johnny Cash</p>
                <p>Address: 99 Main Street, Albany CA 92323</p>
              </details>
              <button onClick={(e) => setStep(4)}>ACCEPT ($344.00)</button>
            </li>
            <li className={`flex justify-between mb-4`}>
              <details>
                <summary>Oakland Port Dock #122</summary>
                <p>Supervisor: Joe Smith</p>
                <p>Address: 442 Fake Street, Oakland CA 93323</p>
              </details>
              <button onClick={(e) => setStep(4)}>ACCEPT ($439.22)</button>
            </li>
          </ul>

        </div>
        <div className={`flex`}>

          <button onClick={() => setStep(1)} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Change Search</button>
          <button onClick={() => setStep(4)} className={`w-full p-6 bg-green-500 font-bold text-2xl text-white`}>Book Albany Warehouse</button>
        </div>
      </div>
      <div className={`${step !== 4 && `hidden `}`}>
        <div className={`p-5 flex flex-col container`}>
          <h2>Enter your billing information</h2>
          TODO: Add square integration
        </div>
        <div className={`flex`}>
          <button onClick={() => setStep(3)} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Back to warehouses</button>
          <button onClick={() => setStep(5)} className={`w-full p-6 bg-green-500 font-bold text-2xl text-white`}>Pay &amp; Get Directions</button>
        </div>
      </div>
      <div className={`${step !== 5 && `hidden `}`}>
        Click here for directions to the warehouse<br/>
        Print out your billing information<br/>
        Contact support<br/>
        <button onClick={() => setStep(0)} className={`w-full p-6 bg-red-500 font-bold text-2xl text-white`}>Restart</button>
      </div>
    </Layout >
  )
}

export default FindWarehouse
