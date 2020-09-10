import React, { useContext, useState, useEffect, useRef } from 'react'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import firebase from 'firebase/app'
import { FancyButton, LoginButton } from '../components/fancy-button'
import Svg from '../components/svg'
import truck from '../images/truck.jpg'

const CheckMark = () => (
  <Svg className="w-4 h-4 inline-block" html={`<path xmlns="http://www.w3.org/2000/svg" d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/> <polyline xmlns="http://www.w3.org/2000/svg" points="352 176 217.6 336 160 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>`} />
)

const TruckCard = (props) => {
  return (
    <div>
      <img src={truck}/>
      <p>{props.type}</p>
    </div>
  )
}

const EditableInput = (props) => {
  const [isEditing, setEditing] = useState(false)
  const [newText, changeText] = useState(props.text)
  const [changed, setChanged] = useState(false)
  // let changed = false
  const saveText = (e) => {
    const t = e.target.value
    changeText(t)
    setEditing(false)
    props.callback && props.callback(t)
    setChanged(true)
  }
  const inputRef = useRef(null)
  const focusInput = (e) => {
    setEditing(true)
  }
  useEffect(() => {
    inputRef.current.focus()
  }, [isEditing])

  return (
    <span className={`cursor-text text-xl`}>
      <div className={`${isEditing && 'hidden '} flex flex-col`}>
        <div className={``}  onClick={focusInput}>
          <span className={`pr-3`}  >{changed ? newText : props.text}</span>
          <Svg className={`cursor-pointer w-4 h-4 inline-block`} html={`<path xmlns="http://www.w3.org/2000/svg" d="M384,224V408a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V168a40,40,0,0,1,40-40H271.48" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/> <path xmlns="http://www.w3.org/2000/svg" d="M459.94,53.25a16.06,16.06,0,0,0-23.22-.56L424.35,65a8,8,0,0,0,0,11.31l11.34,11.32a8,8,0,0,0,11.34,0l12.06-12C465.19,69.54,465.76,59.62,459.94,53.25Z"/> <path xmlns="http://www.w3.org/2000/svg" d="M399.34,90,218.82,270.2a9,9,0,0,0-2.31,3.93L208.16,299a3.91,3.91,0,0,0,4.86,4.86l24.85-8.35a9,9,0,0,0,3.93-2.31L422,112.66A9,9,0,0,0,422,100L412.05,90A9,9,0,0,0,399.34,90Z"/>`}/>
        </div>
        <small className={`font-bold`}>{props.title}</small>
      </div>
      <input ref={inputRef} onBlur={saveText} tabIndex={1} className={`${!isEditing && 'hidden '} p-2 nice-border`} placeholder={changed ? newText : props.text} type="text"></input>
    </span>
  )
}

const Account = () => {
  const [state, setState] = useState({ checkmark: false, trucks: [], userId: null, dbUser: null })
  const [name, setName] = useState('')
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
      owner: store.user.uid,
      key: truck.key
    })

    syncTruckArray(trucks)
  }
  const truckList = state.trucks.map((t, i) => {
    return (
      <li key={t.key}><TruckCard type={t.type} /></li>
    )
  })
  return (
    <Layout>
      <div className={`p-4`}>
        <h1 className={`text-4xl mb-8`}>Your Account</h1>
        <form className={`container max-w-2xl p-8`}>
          <div className={`flex flex-col mb-6`}>
            <h1 className={`text-4xl mb-8`}>About you</h1>
            <label className={`font-bold`}>Your Email</label>
            <p className={`mb-4`}>{store && store.user && store.user.email}</p>
            {/* <label className={`font-bold`}>Your Name</label> */}
            {/* <input
              className={`p-3 my-2 nice-border`}
              onBlur={e => handleBlur('name', e.target.value)}
              onChange={(e) => handleChange('name', e.target.value)}
              type="text"
            /> */}
            {/* <p>{name} {state.checkmark && <CheckMark />}</p> */}
            <EditableInput title="Your Name" text={name ? name : 'Your Name'} callback={(e) => handleBlur('name', e)} />
            <EditableInput title="Your Age" text="Your Age" />
          </div>
        </form>
        <form className={`container max-w-2xl p-8`}>
          <h1 className={`text-4xl mb-8`}>Your Trucks ({state.trucks.length})</h1>
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
    </Layout>
  )
}


export default Account