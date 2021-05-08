import { Provider } from 'react-redux'
import generateStore from './redux/store'
import Router from './router/router'
import { SnackbarProvider } from 'notistack';
import { Slide, ThemeProvider } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm'
import theme from './theme/index'

function App() {
  
  const store = generateStore()
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <SnackbarProvider anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        TransitionComponent={Slide} maxSnack={3}>
            <Router />
          </SnackbarProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
