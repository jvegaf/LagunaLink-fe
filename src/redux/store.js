import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './user'
import studentReducer from './student'
import companyReducer from './company'
import sharedReducer from './shared'

const rootReducer = combineReducers({
  user: userReducer,
  student: studentReducer,
  company: companyReducer,
  shared: sharedReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
  return store
}