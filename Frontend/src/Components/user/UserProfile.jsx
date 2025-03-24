import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function UserProfile() {
  return (
   <div className='user-profile'>

         <ul className="list-unstyled fs-3">
           <li className='nav-item'>
             <NavLink to='articles' className="btn btn-primary text-light" style={{textDecoration:"none",fontSize:"19px",border:"none",borderRadius:"18px",cursor:"pointer"}}>Articles</NavLink>
           </li>
         </ul>

         <div className="mt-5">
           <Outlet/>
         </div>

       </div>
  )
}

export default UserProfile