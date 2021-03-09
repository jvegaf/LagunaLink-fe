import { UserContextProvider } from './context/UserContext'
import { StudentContextProvider } from './context/StudentContext'
import { CompanyContextProvider } from './context/CompanyContext'
import { SnackbarProvider } from 'notistack'
import { Slide } from '@material-ui/core'
import Router from './router/router'

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      TransitionComponent={Slide}
    >
      <UserContextProvider>
        <StudentContextProvider>
          <CompanyContextProvider>
            <Router />
          </CompanyContextProvider>
        </StudentContextProvider>
      </UserContextProvider>
    </SnackbarProvider>
  )
}

export default App
