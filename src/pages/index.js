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
const IndexPage = () => {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const firebase = useFirebase();
  const position = [51.505, -0.09]

  useEffect(() => {
    if (!firebase) return;
    return firebase.auth().onAuthStateChanged((user) => {
      console.log('User:', user);
      setUser(user)
    })
   }, [firebase]);
  return (
  <Layout>
    <SEO title="Home" />
    <h1>Crossdock</h1>
    <div style={{width: '400px', height: '400px'}}>
      <MapContainer />
    </div>
    { user ?
      <button onClick={logout}>logout</button> :
      <div>
        <Link to="/login-with-google/">Login with Google</Link> <br />
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/> <br />
        <button onClick={() => createUser(fb.auth(), email, password)}>Login with email &amp; password</button>
        {/* <button onClick={}>Register with email &amp; password</button> */}
      </div>
    } 
    <br />
  </Layout>
)}

export default IndexPage
