import { useCallback, useContext, useState } from 'react'
import { Context } from '../context/UserContext'
import { SignInService } from '../services/auth/SignInService'

export const useUser = () => {
  const { token, setToken, setEmail, setUserId } = useContext(Context)
  const [statusError, setStatusError] = useState(null)

  const signIn = useCallback(
    ({ email, password }) => {
      SignInService({ email, password })
        .then(
          (response) => {
            if (response === undefined) {
              return
            }
            setToken(response.token)
            setEmail(email)
            setUserId(response.userId)
            if (response.status === 200) history.push('/main')
            response.status === 230
              ? history.push('/register/student')
              : history.push('/register/company')
          }
        )
        .catch(e => {
          setStatusError(e.response.status)
        })
    },
    [setToken, setEmail, setUserId, setStatusError]
  )

  const signOut = useCallback(() => {
    setToken(null)
  }, [setToken])

  return {
    isSigned: Boolean(token),
    signIn,
    signOut,
    statusError,
    setStatusError
  }
}
