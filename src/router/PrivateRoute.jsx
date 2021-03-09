import React from 'react'
import { useUser } from '../hooks/useUser'
import { Redirect, Route } from 'react-router-dom'


export function PrivateRoute({ children, ...rest }) {
  const { isSigned } = useUser()
  return (
    <Route {...rest} render={({ location }) =>
        isSigned ? (children) :
        (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
      }
    />
  )
}