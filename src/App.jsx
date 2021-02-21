import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignInPage from './pages/signIn/SignInPage'
import { SignUpPage } from './pages/signUp/SignUpPage'
import { MainPage } from './pages/main/MainPage'
import { RegisterPage } from './pages/register/RegisterPage'
import { ConfirmedPage } from './pages/confirmed/ConfirmedPage'
import DashboardPage from './pages/dashboard/DashBoardPage'
import { RegistryPage } from './pages/student/RegistryPage'
import { UserContextProvider } from './context/UserContext'
import { StudentContextProvider } from './context/StudentContext'
import { CompanyContextProvider } from './context/CompanyContext'

function App () {
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
              <Route path="/student/register/:section" component={RegistryPage} />
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
