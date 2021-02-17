import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignInPage from './pages/signInPage'
import { SignUpPage } from './pages/signUpPage'
import { MainPage } from './pages/MainPage/MainPage'
import { RegisterPage } from './pages/registerPage'
import { ConfirmedPage } from './pages/confirmedPage'
import path from 'path'
import dotenv from 'dotenv'

import { UserContextProvider } from './context/UserContext'
import DashboardPage from './pages/dashboardPage/DashBoardPage'
import { StudentContextProvider } from './context/StudentContext'
import { CompanyContextProvider } from './context/CompanyContext'

function App () {
  dotenv.config()
  const defaultEnv = 'local'
  const envPath = path.resolve(process.cwd(), `.env.${defaultEnv}`)
  dotenv.config({ path: envPath })

  return (
    <UserContextProvider>
      <StudentContextProvider>
        <CompanyContextProvider>

          <Router>
            <Switch>
              <Redirect exact from="/" to="/main" />
              <Route path="/signin">
                <SignInPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="/register/:accountType" component={RegisterPage} />
              <Route path="/dashboard">
                <DashboardPage />
              </Route>
              <Route path="/auth/confirmed">
                <ConfirmedPage />
              </Route>
              <Route path="/main">
                <MainPage />
              </Route>
            </Switch>
          </Router>
        </CompanyContextProvider>
      </StudentContextProvider>
    </UserContextProvider>
  )
}

export default App
