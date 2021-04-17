import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { DashBoard } from '../layouts/dashboard/Dashboard'
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
            return isSignedIn ? <Redirect to="/app/dashboard" /> : <Redirect to="/signin" />
          }}
        />
        <Route path="/signin"><Main reqView={'signin'} /></Route>
        <Route path="/signup"><Main reqView={'signup'} /></Route>
        <Route path="/register/student"><Main reqView={'studentRegistry'} /></Route>
        <Route path="/register/company"><Main reqView={'companyRegistry'} /></Route>
        <Route path="/auth/confirmed"><Main reqView={'confirmed'} /></Route>
        <PrivateRoute exact path="/app"><DashBoard reqView={'dashboard'}/></PrivateRoute>
        <PrivateRoute path="/app/dashboard"><DashBoard reqView={'dashboard'}/></PrivateRoute>
        <PrivateRoute path="/app/profile"><DashBoard reqView={'profile'}/></PrivateRoute>
        <PrivateRoute path="/app/enrollments"><DashBoard reqView={'enrollments'}/></PrivateRoute>
        <PrivateRoute path="/app/detail/job_opening/:id"><DashBoard reqView={'jobOpeningDetail'}/></PrivateRoute>
        <PrivateRoute path="/app/job_openings"><DashBoard reqView={'jobOpenings'}/></PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}
