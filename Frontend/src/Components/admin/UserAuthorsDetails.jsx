import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdRestore } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function UserAuthorsDetails() {
  const [userAuthorDetails, setUserAuthorDetails] = useState([]);
  const [err, setErr] = useState([])
  async function getDetails() {
    const res = await axios.get('http://localhost:3000/admin-api/getUserAuthorDetails')
    const { message, payLoad } = res.data;
    if (message === 'success') {
      setUserAuthorDetails(payLoad);
    }
  }
  async function InactiveUser(user){
    const res = await axios.post('http://localhost:3000/admin-api/inactive',user)
    const { message, payLoad } = res.data;
    if (message === 'inactive') {
      setUserAuthorDetails(payLoad);
    }
  }
  async function RestoreUser(user){
    const res = await axios.post('http://localhost:3000/admin-api/active',user)
    const { message, payLoad } = res.data;
    if (message === 'active') {
      setUserAuthorDetails(payLoad);
    }
  }
  useEffect(() => {
    getDetails();
  }, [userAuthorDetails])
  return (
    <div className='user-author'>
      <h3>Details</h3>
      {
        userAuthorDetails?.length != 0
          ?
          <div className=" container mt-3 d-flex flex-column gap-3" >
            {
              userAuthorDetails?.map((ele, idx) => {
                return <div className="container d-flex justify-content-around gap-4 p-4" style={{ boxShadow: '1px 1px 6px 1px gray', borderRadius: "20px", width: "440px", height: "140px" }} key={idx}>
                  <div>
                    <img src={ele.profileImageUrl} width={"60px"} className='rounded-circle' alt="" />
                  </div>
                  <div className='p-0 m-0'>
                    <div className="name d-flex gap-2">
                      <h6 style={{ fontSize: "17px" }}>Name:</h6>
                      <p className="">{ele.firstName}</p>
                    </div>
                    <div className="email d-flex gap-2">
                      <h6 style={{ fontSize: "17px" }}>Email:</h6>
                      <p> {ele.email}</p>
                    </div>
                    <div className="role d-flex gap-2">
                      <h6 style={{ fontSize: "17px" }}>Role:</h6>
                      <p> {ele?.role}</p>
                    </div>
                  </div>
                  <div className="delete-restore">
                    {
                      ele.isActive === true ? (
                        <button className="me-2 btn" style={{ border: "none" }} onClick={()=>InactiveUser(ele)}>
                          <MdDelete className='text-danger fs-5' style={{ width: "24px", height: "24px" }} />
                        </button>
                      ) :
                        (<button className="me-2 btn" style={{ border: "none" }} onClick={()=>RestoreUser(ele)}>
                          <MdRestore className='text-info fs-5' style={{ width: "24px", height: "24px" }} />
                        </button>)
                    }
                  </div>
                </div>
              })
            }
          </div>
          :
          <></>
      }

    </div>
  )
}

export default UserAuthorsDetails