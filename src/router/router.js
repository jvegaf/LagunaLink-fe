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
        <Route path="/auth/confirmed"><Main reqView={'confirmed'} /></Route>
        <PrivateRoute exact path="/app" component={DashBoard} reqView={'dashboard'}/>
        <PrivateRoute path="/app/dashboard" component={DashBoard} reqView={'dashboard'}/>
        <PrivateRoute path="/app/profile" component={DashBoard} reqView={'profile'}/>
        <PrivateRoute path="/app/enrollments" component={DashBoard} reqView={'enrollments'}/>
        <PrivateRoute exact path="/app/detail/job_opening" component={DashBoard} reqView={'jobOpeningDetail'}/>
        <PrivateRoute exact path="/app/detail/student" component={DashBoard} reqView={'studentDetail'}/>
        <PrivateRoute exact path="/app/job_openings" component={DashBoard} reqView={'jobOpenings'}/>
        <PrivateRoute exact path="/app/job_opening/enrollments" component={DashBoard} reqView={'jobEnrollments'}/>
        <PrivateRoute exact path="/app/job_openings/new" component={DashBoard} reqView={'newjobOpening'}/>
      </Switch>
    </BrowserRouter>
  )
}
