import React, { useState } from 'react'

const Context = React.createContext({})

export function UserContextProvider ({ children }) {
  const [token, setToken] = useState(
    () => window.sessionStorage.getItem('access_token')
  )

  const [email, setEmail] = useState(
    () => window.sessionStorage.getItem('email')
  )

  const [userId, setUserId] = useState(
    () => window.sessionStorage.getItem('userId')
  )

  return (
    <Context.Provider value={{
      token,
      setToken,
      email,
      setEmail,
      userId,
      setUserId
    }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
