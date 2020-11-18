import React, { useState } from 'react'


const Context = React.createContext({})

export function UserContextProvider({children}) {
  const [token, setToken] = useState(
    () => window.sessionStorage.getItem('access_token')
  )

  const [isSigned, setIsSigned] = useState(
    () => token === undefined ? false : true 
  );

  const [email, setEmail] = useState(
    () => window.sessionStorage.getItem('email')
  )

  return <Context.Provider value={{
    token,
    setToken,
    isSigned,
    setIsSigned,
    email,
    setEmail
  }}>
    {children}
  </Context.Provider>
}

export default Context
