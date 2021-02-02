import { useCallback, useContext } from 'react'
import { Context } from '../context/UserContext'
import { SignInService } from '../services/auth/SignInService'

export const useUser = () => {
  const { token, setToken, setEmail, setUserId, setStatus } = useContext(Context)

  const signIn = useCallback(
    ({ email, password }) => {
      SignInService({ email, password })
        .then(response => {
          if (response === undefined) {
            return
          }
          window.localStorage.setItem('access_token', response.token)
          setToken(response.token)
          window.sessionStorage.setItem('email', email)
          setEmail(email)
          window.localStorage.setItem('user_id', response.userId)
          setUserId(response.userId)
          setStatus(response.status)
        }
        )
        .catch(e => {
          setStatus(e.response.status)
        })
    },
    [setToken, setEmail, setUserId, setStatus]
  )

  const signOut = useCallback(() => {
    window.localStorage.removeItem('access_token')
    window.sessionStorage.removeItem('email')
    window.localStorage.removeItem('user_id')
    setToken(null)
    setEmail(null)
    setUserId(null)
  }, [setToken, setEmail, setUserId])

  return {
    isSigned: Boolean(token),
    signIn,
    signOut,
    status,
    setStatus
  }
}
