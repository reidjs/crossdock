import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import useFirebase from '../useFirebase';
import fb from 'firebase/app';
import logout from '../logout'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo" 
import MapContainer from '../components/map'

const createUser = (auth, email, password) => {
  // auth is fireb.auth()
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error.code, error.message)
    if (error.code == 'auth/email-already-in-use') {
      auth.signInWithEmailAndPassword(email, password).catch(function(error2) {
        console.log(error2.code, error2.message)
      })
    }
  });
}


const editUser = (db, id, changes) => {
  const dbUser = db.ref('users/' + id)
  console.log('changes', changes)
  dbUser.update(changes)
  dbUser.on('value', function(snapshot) {
    console.log(snapshot.val())
  })
}

const Integrations = () => {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [key, setKey] = useState(null)
  const [val, setVal] = useState(null)
  const [password, setPassword] = useState('')
  const firebase = useFirebase();
  const [position, setPosition] = useState([51.505, -0.09]);

  if (typeof window !== 'undefined' && window.navigator) {
    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setPosition([+lat, +lng])
    
      console.log(`longitude: ${ lng } | latitude: ${ lat }`);
    }
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
    
    // console.log('navigator', navigator)
  }
  let kvpair = {};
  useEffect(() => {
    if (!firebase) return;
    return firebase.auth().onAuthStateChanged((user) => {
      console.log('User:', user);
      setUser(user)
    })
   }, [firebase]);
  useEffect(() => {
    kvpair[key] = val
   }, [key, val]);
  return (
  <Layout>
    <SEO title="Home" />
    {/* <h1 className="container mt-4">Crossdock!</h1> */}
    <div className="w-full">
      <MapContainer center={position}/>
    </div>
    
    <br />
  </Layout>
)}

export default Integrations

// { user ?
//   <div>
//     <button onClick={logout}>logout</button>
//     <div>
//       <h2>Edit Profile</h2>
//       <input placeholder="key" onChange={(e) => setKey(e.target.value)}></input>
//       <input placeholder="value" onChange={(e) => setVal(e.target.value)}></input>
//       <button onClick={() => editUser(fb.database(), user.uid, kvpair)}>Submit</button>
//     </div>
//   </div> :
//   <div>
//     <Link to="/google-login/">Login with Google</Link> <br />
//     <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
//     <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/> <br />
//     <button onClick={() => createUser(fb.auth(), email, password)}>Login with email &amp; password</button>
//     {/* <button onClick={}>Register with email &amp; password</button> */}
//   </div>
// } 