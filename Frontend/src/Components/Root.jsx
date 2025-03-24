import React from 'react'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import Home from './common/Home.jsx'
import { Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

// import the key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function Root() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <div>
        <Header/>
        <div style={{minHeight:"100vph"}}>
            <Outlet/>
        </div>
        <Footer/>
    </div>
    </ClerkProvider>
  )
}

export default Root