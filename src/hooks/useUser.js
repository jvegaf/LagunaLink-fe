import { useCallback, useContext } from 'react'
import Context from '../context/UserContext'
import { apiProvider } from '../services/api/api-provider'

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
    setIsSigned,
  } = useContext(Context)

  const signIn = useCallback(
    ({ email, password }) => {
      apiProvider
        .post('/auth/signin', {
          email: email,
          password: password,
        })
        .then(response => {
          if (response === undefined) {
            return
          }
          console.log(response)
          setToken(response.data.access_token)
          window.localStorage.setItem('access_token', response.data.access_token)
          setEmail(email)
          window.localStorage.setItem('email', email)
          setUserId(response.data.user_id)
          window.localStorage.setItem('user_id', response.data.user_id)
          setUserRole(response.data.user_role)
          window.localStorage.setItem('user_role', response.data.user_role)
          setStatus(response.status)
          window.localStorage.setItem('signed', true)
          setIsSigned(true)
        })
        .catch(e => {
          console.error({ e })
          setStatus(e.response.status)
        })
    },
    [setToken, setEmail, setUserId, setUserRole, setStatus, setIsSigned]
  )

  const signOut = useCallback(() => {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const signUp = useCallback(data => {
    return apiProvider
      .post('/auth/signup', {
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .then(response => {
        return response.status
      })
      .catch(e => {
        return e.response.status
      })
  })

  const resetStatus = useCallback(() => {
    setStatus(0)
  }, [setStatus])

  const getTokenAndId = useCallback(() => {
    return { token, userId }
  }, [token, userId])

  return {
    token,
    userId,
    getTokenAndId,
    isSigned,
    email,
    signIn,
    signOut,
    signUp,
    status,
    resetStatus,
    setStatus,
    userRole,
  }
}
