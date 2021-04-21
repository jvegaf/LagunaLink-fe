import { Provider } from 'react-redux'
import generateStore from './redux/store'
import Router from './router/router'
import { SnackbarProvider } from 'notistack';
import { Slide } from '@material-ui/core';


function App() {
  
  const store = generateStore()
  
  return (
    <Provider store={store}>
      <SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
    }}
    TransitionComponent={Slide} maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </Provider>
  )
}

export default App
