import React, { useContext, useState, useEffect } from 'react'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import firebase from 'firebase/app'
import { FancyButton, LoginButton } from '../components/fancy-button'
import Svg from '../components/svg'

const CheckMark = () => (
  <Svg className="w-4 h-4 inline-block" html={`<path xmlns="http://www.w3.org/2000/svg" d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/> <polyline xmlns="http://www.w3.org/2000/svg" points="352 176 217.6 336 160 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>`} />
)

const Account = () => {
  const [state, setState] = useState({ checkmark: false, name: '', trucks: [], userId: null, dbUser: null })
  const [dbUser, setDbUser] = useState(null)

  const store = useContext(StoreCtx)
  const dispatch = useContext(DispatchCtx)

  const logout = () => {
    firebase.auth().signOut().then(res => {
      dispatch({ type: 'LOGOUT_USER' })
      navigate('/')
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
    const obj = {}
    obj[key] = value
    dbUser.update(obj).then(() => {
      handleChange('checkmark', true)
    })
  }
  

  const syncUser = (d) => {
    d.once('value').then(snapshot => {
      const obj = snapshot.val() || {}
      const s = Object.assign({}, state)
      Object.keys(obj).forEach(key => {
        if (key in state && state[key] !== obj[key]) {
          s[key] = obj[key]
        }
      })
      setState(s)
    })
  }

  const syncTruckArray = d => {
    d.once('value').then(snapshot => {
      const obj = snapshot.val() || {}
      const s = Object.assign({}, state)
      s.trucks = []
      Object.keys(obj).forEach(key => {
        s.trucks.push({key, ...obj[key]})
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
      owner: store.user.uid
    })

    syncTruckArray(trucks)
  }
  return (
    <Layout>
      <div className={`p-4`}>
        <h1 className={`text-4xl mb-8`}>Your Account</h1>
        <form className={`container max-w-2xl p-8`}>
          <div className={`flex flex-col mb-6`}>
            <h1 className={`text-4xl mb-8`}>About you</h1>
            <label className={`font-bold`}>Your Email</label>
            <p className={`mb-4`}>{store && store.user && store.user.email}</p>
            <label className={`font-bold`}>Your Name</label>
            <input
              className={`p-3 my-2 nice-border`}
              onBlur={e => handleBlur('name', e.target.value)}
              onChange={(e) => handleChange('name', e.target.value)}
              type="text"
            />
            <p>{state.name} {state.checkmark && <CheckMark />}</p>
          </div>
        </form>
        <form className={`container max-w-2xl p-8`}>
          <h1 className={`text-4xl mb-8`}>Your Trucks ({state.trucks.length})</h1>
          <LoginButton onClick={addTruck} text="Add new truck" />
        </form>
        {/* <form className={`container max-w-2xl p-8`}>
          <h1 className={`text-4xl mb-8`}>Your Warehouses</h1>
          <LoginButton text="Add new warehouse" />
        </form> */}
        <hr />
        <FancyButton onClick={logout} text="Log Out"></FancyButton>
      </div>
    </Layout>
  )
}


export default Account