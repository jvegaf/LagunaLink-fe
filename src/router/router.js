import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { DashBoard } from '../layouts/Dashboard'
import { Main } from '../layouts/main/Main'
import { PrivateRoute } from './PrivateRoute'

export default function Router() {
  const isSignedIn = useSelector(state => state.user.isSignedIn)

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isSignedIn ? <Redirect to="/app" /> : <Redirect to="/signin" />
          }}
        />
        <Route path="/signin"><Main reqView={'signin'} /></Route>
        <Route path="/signup"><Main reqView={'signup'} /></Route>
        {/* <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/register/:accountType" component={RegisterPage} /> */}
        {/* <Route path="/auth/confirmed" component={ConfirmedPage} /> */}
        <PrivateRoute path="/app">
          <DashBoard />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
