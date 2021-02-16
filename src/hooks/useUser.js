import { useCallback, useContext } from 'react'
import Context from '../context/UserContext'
import { SignInService } from '../services/auth/SignInService'

export const useUser = () => {
  const {
    token,
    setToken,
    email,
    setEmail,
    userId,
    setUserId,
    userRole,
    setUserRole,
    status,
    setStatus,
    isSigned,
    setIsSigned
  } = useContext(Context)

  const signInReq = useCallback(
    ({ email, password }) => {
      SignInService({ email, password })
        .then(response => {
          if (response === undefined) {
            return
          }
          console.log(response)
          setToken(response.token)
          window.localStorage.setItem('access_token', response.token)
          setEmail(email)
          window.localStorage.setItem('email', email)
          setUserId(response.user_id)
          window.localStorage.setItem('user_id', response.user_id)
          setUserRole(response.user_role)
          window.localStorage.setItem('user_role', response.user_role)
          setStatus(response.status)
          window.localStorage.setItem('signed', true)
          setIsSigned(true)
        }
        )
        .catch(e => {
          setStatus(e.response.status)
        })
    },
    [setToken, setEmail, setUserId, setUserRole, setStatus, setIsSigned]
  )

  const signOutReq = useCallback(() => {
    setToken(null)
    window.localStorage.removeItem('access_token')
    setIsSigned(false)
    window.localStorage.removeItem('signed')
    setUserRole(null)
    window.localStorage.removeItem('user_role')
    setEmail(null)
    window.localStorage.removeItem('email')
    setUserId(null)
    window.localStorage.removeItem('user_id')
    setStatus(0)
  }, [setToken, setIsSigned, setUserRole, setEmail, setUserId, setStatus])

  const resetStatus = useCallback(() => {
    setStatus(0)
  }, [setStatus])

  return {
    token,
    userId,
    isSigned,
    email,
    signInReq,
    signOutReq,
    status,
    resetStatus,
    userRole
  }
}
