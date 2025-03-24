import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function AdminProfile() {
  const [har,setHar]=useState("");
  return (
    <div className='admin-profile'>
        <ul className="d-flex justify-content-around list-unstyled fs-3">
                <li className='nav-item'>
                  <NavLink to='articles' className={har==="articles"?"btn btn-primary text-light":"btn text-secondary"} style={{textDecoration:"none",fontSize:"19px",border:"none",borderRadius:"18px",cursor:"pointer"}} onClick={()=>setHar('articles')}>Articles</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='user-authors' className={har==="user-authors"?"btn btn-primary text-light":"btn text-secondary"} style={{textDecoration:"none",fontSize:"19px",border:"none",borderRadius:"18px",cursor:"pointer"}} onClick={()=>setHar('user-authors')}>Users & Authors</NavLink>
                </li>
              </ul>
              <div className="mt-5">
                <Outlet/>
              </div>
    </div>
  )
}

export default AdminProfile