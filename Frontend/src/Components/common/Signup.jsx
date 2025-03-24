import React from 'react'
import {SignIn, SignUp} from '@clerk/clerk-react'

function Signup() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <SignUp/>
    </div>
  )
}

export default Signup