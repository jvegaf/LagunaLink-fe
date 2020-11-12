import React, { useState } from 'react'


const Context = React.createContext({})

export function UserContextProvider({children}) {
  const [token, setToken] = useState(
    () => window.sessionStorage.getItem('token')
  )

  const [isSigned, setIsSigned] = useState(
    // () => token === undefined ? false : true 
    true
  );

  return <Context.Provider value={{
    token,
    setToken,
    isSigned,
    setIsSigned
  }}>
    {children}
  </Context.Provider>
}

export default Context
