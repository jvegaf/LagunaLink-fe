import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { DashBoard } from '../layouts/Dashboard'
import { ConfirmedPage } from '../pages/confirmed/ConfirmedPage'
import DashboardPage from '../pages/dashboard/DashBoardPage'
import { RegisterPage } from '../pages/register/RegisterPage'
import { SignInPage } from '../pages/signIn/SignInPage'
import { SignUpPage } from '../pages/signUp/SignUpPage'
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
            return isSignedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />
          }}
        />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/register/:accountType" component={RegisterPage} />
        <Route path="/auth/confirmed" component={ConfirmedPage} />
        <PrivateRoute path="/main">
          <DashBoard />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <DashboardPage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
