import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import user from './user'
import student from './student'
import company from './company'

const rootReducer = combineReducers({
  user,
  student,
  company
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
  return store
}