import { useCallback, useContext } from 'react'
import Context from '../context/UserContext'
import { SignInService } from '../services/auth/SignInService'

export const useUser = () => {
  const { token, setToken, email, setEmail, setUserId, status, setStatus } = useContext(Context)

  const signInReq = useCallback(
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

  const signOutReq = useCallback(() => {
    window.localStorage.removeItem('access_token')
    window.sessionStorage.removeItem('email')
    window.localStorage.removeItem('user_id')
    setToken(undefined)
    setEmail(null)
    setUserId(null)
    setStatus(0)
  }, [setToken, setEmail, setUserId, setStatus])

  const resetStatus = useCallback(() => {
    setStatus(0)
  },
  [setStatus]
  )

  return {
    isSigned: Boolean(token),
    email,
    signInReq,
    signOutReq,
    status,
    resetStatus
  }
}
