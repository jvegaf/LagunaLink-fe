import { apiProvider } from '../services/api/api-provider'

const initialState = {
  token: '',
  userId: '',
  email: '',
  isFetching: false,
  role: '',
  isSignedIn: false,
  inactiveError: null,
  signinError: null,
  profile: null,
}

// const types
const ROLE_STUDENT = 'ROLE_STUDENT'
const STATUS_OK = 200
const STUDENT_NEW = 230
const COMPANY_NEW = 231
const BAD_REQUEST = 400
const USER_INACTIVE = 450

const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
const SIGNIN = 'SIGNIN'
const STUDENT_REGISTER = 'STUDENT_REGISTER'
const COMPANY_REGISTER = 'COMPANY_REGISTER'
const SIGNIN_ERROR = 'SIGNIN_ERROR'
const INACTIVE_ERROR = 'INACTIVE_ERROR'
const SIGN_OUT = 'SIGN_OUT'

// reducers
const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        isFetching: true,
        signinError: null,
      }
    
      case SIGNIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.response.data.user_id,
        token: action.payload.response.data.access_token,
        email: action.payload.response.data.email,
        role: action.payload.response.data.user_role,
        isSignedIn: true,
        isFetching: false,
        profile: action.payload.profile,
      }
    
      case SIGNIN_ERROR:
      return {
        ...state,
        isFetching: false,
        signinError: action.payload.err,
      }

    case SIGN_OUT:
      return initialState

    case STUDENT_REGISTER:
    break    // LLAMAR A LA ACCION DE REGISTRO
    case COMPANY_REGISTER:
    break   // LLAMAR A LA ACCION DE REGISTRO
    case INACTIVE_ERROR:
      return {
        ...state,
        isFetching: false,
        inactiveError: action.payload.error,
      }

    default:
      return state
  }
}

export default currentUser

// actions

const signIn = data => dispatch => {
  dispatch({ type: SIGNIN })
  apiProvider
    .post('/auth/signin', data)
    .then(response => {
      if (response.status === STUDENT_NEW) {
        dispatch({ type: STUDENT_REGISTER, payload: response })
      }
      if (response.status === COMPANY_NEW) {
        dispatch({ type: COMPANY_REGISTER, payload: response })
      }
      if (response.status === BAD_REQUEST) {
        dispatch({ type: SIGNIN_ERROR, payload: { message: 'Correo o Contraseña erroneo' } })
      }
      if (response.status === USER_INACTIVE) {
        dispatch({ type: INACTIVE_ERROR, payload: { message: 'Necesitas verificar tu cuenta antes de ingresar' } })
      }
      if (response.status === STATUS_OK) {
        const path = response.data.user_role === ROLE_STUDENT ? 'students' : 'companies'
        apiProvider.getSingle(path, response.data.user_id, response.data.access_token).then(profile =>
          dispatch({
            type: SIGNIN_SUCCESS,
            payload: { response, profile },
          })
        )
      }
    })
    .catch(err => {
      dispatch({
        type: SIGNIN_ERROR,
        payload: { err },
      })
    })
}

const signOut = dispatch => dispatch({ type: SIGN_OUT })

const signUp = data => dispatch => {
  apiProvider
      .post('/auth/signup', data)
      .then(response => {
        return response.status
      })
      .catch(e => {
        return e.response.status
      })
}

export const actions = {
  signIn,
  signOut,
  signUp
}
