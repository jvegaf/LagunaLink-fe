import React, { useState } from 'react'

const Context = React.createContext({})

export function UserContextProvider({children}) {
  const [token, setToken] = useState(() => window.localStorage.getItem('access_token'))

  const [email, setEmail] = useState(() => window.localStorage.getItem('email'))

  const [userId, setUserId] = useState(() => window.localStorage.getItem('user_id'))

  const [status, setStatus] = useState(0)

  const [isSigned, setIsSigned] = useState(() => window.localStorage.getItem('signed'))

  const [userRole, setUserRole] = useState(() => window.localStorage.getItem('user_role'))

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        email,
        setEmail,
        userId,
        setUserId,
        status,
        setStatus,
        isSigned,
        setIsSigned,
        userRole,
        setUserRole
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
