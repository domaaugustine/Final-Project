import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserAuthorContextObj } from "../../Contexts/UserAuthorContext";

function Profile() {
    const {currentUser}=useContext(UserAuthorContextObj);
    console.log("currentUser from profile: ",currentUser)
  return (
    <div className='Profile'>
        {
            currentUser!=null
            &&
            <div className='container card align-items-center p-3' style={{boxShadow:"1px 1px 6px 1px",borderRadius:"24px",width:"380px",height:"380px"}}>
            <img src={currentUser?.profileImageUrl} width="96px" className='rounded-circle mt-5' alt="" />
            <div className="card-body d-flex flext-start flex-column mt-2">
                <div className="name d-flex gap-3">
                    <h6 style={{fontSize:"17px"}}>Name:</h6>
                <p className="">{currentUser.firstName}</p>
                </div>
                <div className="email d-flex gap-3">
                    <h6 style={{fontSize:"17px"}}>Email:</h6>
                    <p> {currentUser.email}</p>
                </div>
                <div className="role d-flex gap-3">
                    <h6 style={{fontSize:"17px"}}>Role:</h6>
                    <p> {currentUser.role}</p>

                </div>
            </div>
          </div>
        }
        {
            currentUser.role=='author'
            ?
            <>
            <Link to={`/author-profile/${ currentUser.email}/articles`} style={{textDecoration:"none"}}><button className="btn btn-outline-primary mt-4">Go-to-articles</button></Link>
            </>
            :
            <>
            <button className="btn btn-outline-primary mt-4"><Link to={`/user-profile/${ currentUser.email}/articles`} style={{textDecoration:"none"}}>Go-to-articles</Link></button>
            </>
        }
        
    </div>
  )
}

export default Profile