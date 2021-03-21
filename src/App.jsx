import { Provider } from 'react-redux'
import generateStore from './redux/store'
import Router from './router/router'

function App() {
  
  const store = generateStore()
  
  return (
    <Provider store={store}>
      <Router />
    </Provider>
    
  )
}

export default App
