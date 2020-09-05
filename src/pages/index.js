import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import useFirebase from '../useFirebase';
import fb from 'firebase/app';
import logout from '../logout'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo" 


const createUser = (auth, email, password) => {
  // auth if fb.auth()
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error.code, error.message)
    // ...
  });

}
const IndexPage = () => {
  const [user, setUser] = useState(null)
  const firebase = useFirebase();
  console.log(process.env)
  console.log(process.env.NODE_ENV)
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
    { user ?
      <button onClick={logout}>logout</button> :
      <div>
        <Link to="/login-with-google/">Login with Google</Link>
        <button onClick={() => createUser(fb.auth(), 'reidsherman@gmail.com', '123456')}>Create account with email/pass</button>
      </div>
    } 
    <br />
    {/* <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
  </Layout>
)}

export default IndexPage
