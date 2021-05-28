import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


export function PrivateRoute(props) {
  const { component: Component, location, ...rest } = props
  const isSignedIn = useSelector(state => state.user.isSignedIn)
  return (
    <Route {...rest} render={ (props) =>
        isSignedIn ? <Component {...props} {...rest}/> :
        (<Redirect to={{ pathname: '/signin', state: { from: location } }} />)
      }
    />
  )
}