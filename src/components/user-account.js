import React, { useContext, useState, useEffect, useRef } from 'react'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'
// import Layout from '../components/layout'
import firebase from 'firebase/app'
import { FancyButton, LoginButton } from '../components/fancy-button'
import Svg from '../components/svg'
import truck from '../images/truck.jpg'
import EditableInput from '../components/editable-input'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";


const CheckMark = () => (
  <Svg className="w-4 h-4 inline-block" html={`<path xmlns="http://www.w3.org/2000/svg" d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/> <polyline xmlns="http://www.w3.org/2000/svg" points="352 176 217.6 336 160 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>`} />
)

const TruckCard = ({ type, deleteTruck, isCurrentTruck, setAsCurrentTruck }) => {
  // const [isCurrentTruck, setCurrentTruck] = useState(true)
  return (
    <div className={`p-4 flex flex-col ${isCurrentTruck ? 'border-green-500 border-8' : 'nice-border'}`}>
      <div className={`flex justify-between`}>
        <span className="text-green-500">{isCurrentTruck ? <CheckMark /> : <span className="cursor-pointer" onClick={setAsCurrentTruck}>Set as current truck</span>}</span>
        <span className="text-right cursor-pointer text-xl text-red-600" onClick={deleteTruck}>
          &times;
        </span>
      </div>
      <div className={`flex flex-col md:flex-row`}>
        <img src={truck} className={`md:mr-4 mx-auto my-0 mb-4 md:my-0 md:ml-0`} />
        {/* <p>{type}</p> */}
        <ul className={`flex flex-col`}>
          <li className={`mb-4`}><EditableInput text="What is the license #?" title="License #" /></li>
          <li className={`mb-4`}><EditableInput text="What make is it?" title="Make" /></li>
          <li className={``}><EditableInput text="What model is it?" title="Model" /></li>
        </ul>
      </div>
    </div>
  )
}



const UserAccount = () => {
  const [state, setState] = useState({ checkmark: false, age: '', trucks: [], userId: null, dbUser: null })
  const [name, setName] = useState('')
  const [dbUser, setDbUser] = useState(null)

  const store = useContext(StoreCtx)
  const dispatch = useContext(DispatchCtx)
  const numTrucks = state.trucks.length
  const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

  const logout = () => {
    firebase.auth().signOut().then(res => {
      dispatch({ type: 'LOGOUT_USER' })
      // navigate('/')
    })
    if (window && window.gapi && window.gapi.auth2) {
      console.log('window.gapi.auth2.getAuthInstance()', window.gapi.auth2.getAuthInstance())
      window.gapi.auth2.getAuthInstance().signOut().then(f => {
        console.log('f', f)
      })
    }
  }

  const handleChange = (key, value) => {
    const obj = Object.assign({}, state)
    obj[key] = value
    if (key === 'name') {
      obj.checkmark = false
    }
    setState(obj)
  }

  const handleBlur = (key, value) => {
    if (!dbUser) return
    const obj = {}
    obj[key] = value
    dbUser.update(obj).then(() => {
      if (key === 'name') {
        handleChange('checkmark', true)
        setName(value)
      }
    })
  }


  const syncUser = (d) => {
    d.once('value').then(snapshot => {
      const obj = snapshot.val() || {}
      const s = Object.assign({}, state)

      Object.keys(obj).forEach(key => {
        if (key in state && state[key] !== obj[key]) {
          console.log('s[key], obj[key]', s[key], obj[key])
          s[key] = obj[key]
        }
      })
      if (obj['name']) {
        setName(obj['name'])
      }
      console.log('s', s)
      setState(s)
    })
  }

  const syncTruckArray = d => {
    d.once('value').then(snapshot => {
      const obj = snapshot.val() || {}
      const s = Object.assign({}, state)
      s.trucks = []
      Object.keys(obj).forEach(key => {
        s.trucks.push({ key, ...obj[key] })
      })
      setState(s)
    })
  }

  useEffect(() => {
    if (store && store.user && !dbUser) {
      const db = store.firebase.database()
      const uid = store.user.uid
      const user = db.ref('users/' + uid)
      const trucks = db.ref('trucks/' + uid)
      setDbUser(user)
      syncUser(user)
      syncTruckArray(trucks)
    }
    else if (dbUser) {
      dbUser.on('value', snapshot => {
        console.log('snapshot.val()', snapshot.val())
      })
    }
  }, [store, dbUser])

  const addTruck = (d) => {
    const trucks = store.firebase.database().ref('trucks/' + store.user.uid)
    const truck = trucks.push()
    truck.set({
      type: 'bigtruck',
      owner: store.user.uid,
      key: truck.key,
      isCurrentTruck: false
    })

    syncTruckArray(trucks)
  }
  const deleteTruck = t => {
    const trucks = store.firebase.database().ref('trucks/' + store.user.uid)
    const truck = store.firebase.database().ref('trucks/' + store.user.uid + '/' + t.key)
    truck.remove()
    syncTruckArray(trucks)
  }
  const setAsCurrentTruck = t => {
    const trucks = store.firebase.database().ref('trucks/' + store.user.uid)
    // const truck = store.firebase.database().ref('trucks/' + store.user.uid + '/' + t.key)
    trucks.once('value').then(snapshot => {
      // console.log('snapshot.val()', snapshot.val())
      snapshot.forEach(child => {
        // console.log('truck.key, truck.val()', truck.key, truck.val())
        // truck.set({isCurrentTruck: false})
        const truck = store.firebase.database().ref('trucks/' + store.user.uid + '/' + child.key)
        if (child.key === t.key) {
          truck.set({ isCurrentTruck: true })
        } else {
          truck.set({ isCurrentTruck: false })
        }
      })

      syncTruckArray(trucks)
    })
    // truck.set({isCurrentTruck: true })
  }
  const truckList = state.trucks.map((t, i) => {
    return (
      <li
        key={t.key}
        className="my-4"><TruckCard
          type={t.type}
          deleteTruck={() => deleteTruck(t)}
          setAsCurrentTruck={() => setAsCurrentTruck(t)}
          isCurrentTruck={t.isCurrentTruck || numTrucks === 1}
        />
      </li>
    )
  })
  return (
    <div className={`p-4`}>
      <h1 className={`text-4xl my-8`}>Your Account</h1>
      <form className={`container max-w-2xl p-8`}>
        <div className={`flex flex-col mb-6`}>
          <h1 className={`text-4xl mb-8`}>About you</h1>
          <ul className="flex flex-col">
            <li className="mb-4 flex flex-col">
              <span>{store && store.user && store.user.email}</span>
              <label className={`font-bold`}>Your Email</label>
            </li>
            <li className="mb-4"><EditableInput title="Your Name" text={name ? name : 'What\'s your name?'} callback={(t) => handleBlur('name', t)} /></li>
            <li className="mb-4"><EditableInput title="Your Age" text="How old are you?" /></li>
            <li className="mb-4"><EditableInput title="Your Phone Number" text="What's your phone number?" /></li>
          </ul>
        </div>
      </form>
      <h1 className={`text-4xl my-8`}>Payment Information</h1>
      {/* <form> */}
      <div className="container">
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
      {/* </form> */}
      <h1 className={`text-4xl my-8`}>{`Your Truck${numTrucks > 1 ? 's' : ''} (${numTrucks})`}</h1>
      <form className={`container max-w-2xl p-8`}>
        <ul>
          {truckList}
        </ul>
        <LoginButton onClick={addTruck} text="Add new truck" />
      </form>
      {/* <form className={`container max-w-2xl p-8`}>
          <h1 className={`text-4xl mb-8`}>Your Warehouses</h1>
          <LoginButton text="Add new warehouse" />
        </form> */}
      <hr />
      <FancyButton onClick={logout} text="Log Out"></FancyButton>
    </div>
  )
}


export default UserAccount