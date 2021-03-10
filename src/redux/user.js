import { apiProvider } from '../services/api/api-provider'

const initialState = {
  token: '',
  userId: '',
  email: '',
  isFetching: false,
  role: '',
  isSignedIn: false,
  signinError: null,
}

// const types
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
const SIGNIN = 'SIGNIN'
const STUDENT_REGISTER = 'STUDENT_REGISTER'
const COMPANY_REGISTER = 'COMPANY_REGISTER'
const SIGNIN_ERROR = 'SIGNIN_ERROR'
const INACTIVE_ERROR = 'INACTIVE_ERROR'



// reducers
const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.data.user_id,
        token: action.payload.data.access_token,
        email: action.payload.data.email,
        role: action.payload.data.user_role,
        isSignedIn: true,
        status: action.payload.status,
      }
      case STUDENT_REGISTER:
      case COMPANY_REGISTER:
      case SIGNIN_ERROR:
      case INACTIVE_ERROR:

    default:
      return state
  }
}

export default currentUser

// actions

const signInAction = data => dispatch => {
  apiProvider
    .post('/auth/signin', data)
    .then(response => {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: response,
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const actions = {
  signInAction
}