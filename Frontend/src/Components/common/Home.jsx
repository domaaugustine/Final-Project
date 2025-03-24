import React, { useContext, useEffect, useState } from 'react';
import { UserAuthorContextObj } from '../../Contexts/UserAuthorContext';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home() {
  const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj)

  const { isSignedIn, user, isLoaded } = useUser()
  const [role,setRole]=useState(false);
  const [error,setError]=useState("")
  const navi=useNavigate();

  async function onSelectRole(e){
    setError('')
      const selectedRole=e.target.value;
      console.log(selectedRole)
      currentUser.role=selectedRole;
      let res=null;
      if(selectedRole==='admin'){
        try{
          res=await axios.post('http://localhost:3000/admin-api/admin',currentUser)
          let {message,payLoad}=res.data;
          console.log("message is",message,"PayLoad is: ",payLoad)
          if(message==='admin'){
            setCurrentUser({...currentUser,...payLoad})
            // to store user to the local storage
            localStorage.setItem('currentUser',JSON.stringify(payLoad))

          }else{
            setError(message)
          }
        }catch(err){
          setError(err)
        }
      }

      if(selectedRole==='author'){
        try{
          res=await axios.post('http://localhost:3000/author-api/author',currentUser)
          let {message,payLoad}=res.data;
          console.log("message is",message,"PayLoad is: ",payLoad)
          if(message==='author'){
            setCurrentUser({...currentUser,...payLoad})
            // to store user to the local storage
            localStorage.setItem('currentUser',JSON.stringify(payLoad))

          }else{
            setError(message)
          }
        }catch(err){
          setError(err)
        }
      }
      if(selectedRole==='user'){
        try{
        res=await axios.post('http://localhost:3000/user-api/user',currentUser)
        let {message,payLoad}=res.data;
        console.log("message is",message,"PayLoad is: ",payLoad)
        if(message==='user'){
          setCurrentUser((currentUser)=>({...currentUser,...payLoad}))
          localStorage.setItem('currentUser',JSON.stringify(payLoad))
        }else{
          setError(message)
        }
      }catch(err){
        setError(err)
      }
      }

  } 

  async function fun(){
        const res=await axios.post('http://localhost:3000/author-api/checkEmail',{email:user.emailAddresses?.[0]?.emailAddress})
        const {message,payLoad}=res.data;
        console.log("message is ",message);
      if(message===true){
        setCurrentUser((currentUser)=>({...currentUser,...payLoad}));
      }
      setRole(message);
  }

  useEffect(() => { 
  if (!isLoaded || !user) return; // Prevent running effect when data isn't ready

  console.log("User is", user);

  setCurrentUser((prevUser) => ({
    ...prevUser, // Preserve previous state
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses?.[0]?.emailAddress,
    profileImageUrl: user?.imageUrl,
  }));
  fun(); // Ensure `fun()` does not trigger a state update causing re-renders
}, [isLoaded]); 

  useEffect(()=>{
    if(currentUser?.role==='admin'&&error.length===0){
      navi(`admin-profile/${currentUser.email}`)
    }
    if(currentUser?.role==='user'&&error.length===0 && currentUser?.isActive===true){
      navi(`user-profile/${currentUser.email}`)
    }
    if(currentUser?.role==='author'&&error.length===0 && currentUser?.isActive===true){
      navi(`author-profile/${currentUser.email}`)
    }
  },[currentUser?.role])

 console.log(currentUser)
  return (
    <div className='container'>
       {
        isSignedIn === false ? <div>
           <h2 className='mt-4'>Publish your passions, your way</h2>
        <h6 className='mt-3'>Create a unique and beautiful blog easily.</h6>
        <p className='lead mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolor sequi corporis libero in reiciendis iure perspiciatis dolores aperiam consequatur omnis eius esse, eum reprehenderit sit unde ipsa consequuntur qui blanditiis alias, quam enim culpa repellat. </p>      
       <p className="lead mt-2">Repellat quidem in placeat numquam at, aperiam quod suscipit maiores asperiores quaerat provident officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis est repellat expedita! Harum sit, nemo voluptatem provident, beatae accusantium eveniet ratione modi unde assumenda rem ullam! Amet nobis quibusdam nulla odit, qui ullam repellendus iure maiores, vel quas eum debitis dolore delectus ex perspiciatis sint quisquam nostrum ratione? Esse aliquam veritatis laboriosam corrupti est ab possimus! Dolorum veniam a voluptates est rerum accusantium repudiandae voluptas incidunt aliquid dignissimos quis quia numquam sunt deleniti aperiam eaque perspiciatis velit eligendi iste eum, expedita, natus nisi nostrum. Consequuntur corporis sed velit molestias iusto consequatur, atque explicabo reiciendis eveniet nostrum eum, sit, nemo provident.</p>
               
      <button className='btn btn-outline-primary m-4' onClick={()=>{navi('/signup')}}>Create your Blog</button>
        </div>
        :
        <>
        {
          
             currentUser.isActive!=null&&currentUser.isActive===true
             ?
           <>
           <div className='d-flex justify-content-evenly align-items-center bg-info p-3'>
            <img src={user?.imageUrl} width="100px" className='rounded-circle' alt="" />
            <p className="display-6">{user?.firstName}</p>
            <p className="lead">{user?.emailAddresses[0].emailAddress}</p>
          </div>
          <p className="lead">Select role</p>
          {error.length !== 0 && (
            <p
              className="text-danger fs-5"
              style={{ fontFamily: "sans-serif" }}
            >
              {error}
            </p>
          )}
          <div className='d-flex role-radio py-3 justify-content-center'>
          <div className="form-check">
              <input type="radio" name="role" id="admin" value="admin" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="admin" className="form-check-label">admin</label>
            </div>

            <div className="form-check me-4">
              <input type="radio" name="role" id="author" value="author" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="author" className="form-check-label">Author</label>
            </div>
            <div className="form-check">
              <input type="radio" name="role" id="user" value="user" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="user" className="form-check-label">User</label>
            </div>
           
          </div>
           </>
           :
           <>
           <p className="display-5">404 ERROR</p>
           <h6 className="text-danger">*You are blocked.Please contact the admin.</h6>
           </>
        }
        
        
        </>
      }

    </div>
  )
}

export default Home