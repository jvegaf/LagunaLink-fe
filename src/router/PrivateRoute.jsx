import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


export function PrivateRoute({ children, ...rest }) {
  const isSignedIn = useSelector(state => state.user.isSignedIn)
  return (
    <Route {...rest} render={({ location }) =>
        isSignedIn ? (children) :
        (<Redirect to={{ pathname: '/signin', state: { from: location } }} />)
      }
    />
  )
}