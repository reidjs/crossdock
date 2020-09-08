import React, { useContext, useState, useEffect } from 'react'
import { StoreCtx, DispatchCtx } from '../store-ctx'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import { FancyButton, LoginButton } from '../components/fancy-button'
import Svg from '../components/svg'
// import useStore from '../useStore'

const CheckMark = () => (
  <Svg className="w-4 h-4 inline-block" html={`<path xmlns="http://www.w3.org/2000/svg" d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/> <polyline xmlns="http://www.w3.org/2000/svg" points="352 176 217.6 336 160 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>`}/>
)

const Account = () => {
  // if no user then push to login page
  // show logout
  // useStore()
  const [state, setState] = useState({ name: '', userId: null, dbUser: null })
  const [dbUser, setDbUser] = useState(null)
  // const [databaseState, ]
  const store = useContext(StoreCtx)
  const dispatch = useContext(DispatchCtx)
  const logout = () => {
    store.firebase.auth().signOut().then(res => {
      dispatch({ type: 'LOGOUT_USER' })
      navigate('/')
    })
  }

  const handleBlur = (key, value) => {
    const obj = {}
    obj[key] = value
    dbUser.update(obj)
    // dbUser.once('value').then(snapshot => {
    //   console.log(snapshot.val())
    // })

  }
  const handleChange = (key, value) => {
    const obj = Object.assign({}, state)
    obj[key] = value
    setState(obj)
  }

  const syncLocalWithDb = async (d) => {
    await d.once('value').then(snapshot => {
      const obj = snapshot.val() || {} 
      const s = Object.assign({}, state)
      Object.keys(obj).forEach(key => {
        if (key in state && state[key] !== obj[key]) {
          // console.log(snapshot.val())
          s[key] = obj[key]
        }
      })
      setState(s)
    })
  }

  useEffect(() => {
    if (store && store.user && !dbUser) {
      // state.userId = store.user && store.user.uid
      // handleChange({userId: store.user.uid})
      const d = store.firebase.database().ref('users/' + store.user.userId)
      setDbUser(d)
      syncLocalWithDb(d)
      // const email = store.user.email
      // handleChange('email', email)
      // console.log('d', d)
      // (async () => {
      // })
      // d.once('value').then(snapshot => {
      //   console.log('snapshot.val()', snapshot.val())
      //   const obj = snapshot.val() || {} 
      //   Object.keys(obj).forEach(key => {
      //     console.log('key', key)
      //     const s = Object.assign({}, state)
      //     if (key in state && state[key] !== obj[key]) {
      //       console.log(snapshot.val())
      //       s[key] = obj[key]
      //       setState(s)
      //     }
      //   })
      // })

    }
    // if (state && !state.email && store && store.user) {
    //   const email = store.user.email
    //   console.log('email', email)
    //   handleChange('email', email)
    // }
    // if (dbUser) {
    //   dbUser.on('value', function (snapshot) {
        
    //     // if any are different in the DB, update locally
    //     const obj = snapshot.val() || {} 
    //     Object.keys(obj).forEach(key => {
    //       const s = Object.assign({}, state)
    //       if (state[key] && state[key] !== obj[key]) {
    //         console.log(snapshot.val())
    //         s[key] = obj[key]
    //         setState(s)
    //       }
    //     })
    //   })
    // }
  }, [store, dbUser])
  // console.log('userId', userId)


  // if (snapshot.val() !== )
  // setState(snapshot.val())
// if (!store.user) {
//   navigate('/login')
// }
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
          <p>{state.name} {state.name && <CheckMark />}</p>
        </div>
      </form>
      <form className={`container max-w-2xl p-8`}>
        <h1 className={`text-4xl mb-8`}>Your Trucks</h1>
        <LoginButton text="Add new truck" />
      </form>
      <form className={`container max-w-2xl p-8`}>
        <h1 className={`text-4xl mb-8`}>Your Warehouses</h1>
        <LoginButton text="Add new warehouse" />
      </form>
      <hr />
      <FancyButton onClick={logout} text="Log Out"></FancyButton>
    </div>
  </Layout>
)
}


export default Account