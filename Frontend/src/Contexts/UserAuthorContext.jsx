import React, { createContext, useEffect, useState } from "react";

export const UserAuthorContextObj = createContext();

function UserAuthorContext({ children }) {
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImageUrl: '',
    role: ''
  });
  useEffect(()=>{
    const userInStorage=localStorage.getItem('currentUser')
    if(userInStorage){
    setCurrentUser(JSON.parse(userInStorage))
    }
  },[])

  return (
    <UserAuthorContextObj.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserAuthorContextObj.Provider>
  );
}

export default UserAuthorContext;
