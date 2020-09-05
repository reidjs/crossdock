import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import useFirebase from '../useFirebase';
import fb from 'firebase/app';
import logout from '../logout'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [user, setUser] = useState(null)
  const firebase = useFirebase();
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
      <Link to="/login-with-google/">Login with Google</Link>
    } 
    <br />
    {/* <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
  </Layout>
)}

export default IndexPage
