import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { SignInPage } from '../pages/signIn/SignInPage'
import { SignUpPage } from '../pages/signUp/SignUpPage'
import { RegisterPage } from '../pages/register/RegisterPage'
import { ConfirmedPage } from '../pages/confirmed/ConfirmedPage'
import { MainPage } from '../pages/main/MainPage'
import { PrivateRoute } from './PrivateRoute'
import DashboardPage from '../pages/dashboard/DashBoardPage'
export default function Router() {
  const { isSigned } = useUser()

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isSigned ? <Redirect to="/main" /> : <Redirect to="/signin" />
          }}
        />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/register/:accountType" component={RegisterPage} />
        <Route path="/auth/confirmed" component={ConfirmedPage} />
        <PrivateRoute path="/main">
          <MainPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <DashboardPage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
