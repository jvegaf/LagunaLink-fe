import { apiProvider } from '../services/api/api-provider'
import { actions as studentActions } from './student'
import { actions as companyActions } from './company'

const initialState = {
  token: '',
  userId: '',
  email: '',
  isFetching: false,
  role: '',
  needStudentRegister: false,
  needCompanyRegister: false,
  isSignedIn: false,
  inactiveError: null,
  signinError: null,
  prefName: '',
  avatar: '',
}

// const types
const ROLE_STUDENT = 'ROLE_STUDENT'
const ROLE_COMPANY = 'ROLE_COMPANY'
const STATUS_OK = 200
const STUDENT_NEW = 230
const COMPANY_NEW = 231
const BAD_REQUEST = 400
const USER_INACTIVE = 450

const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
const SIGNIN = 'SIGNIN'
const STUDENT_REGISTER = 'STUDENT_REGISTER'
const COMPANY_REGISTER = 'COMPANY_REGISTER'
const REGISTER_COMPLETED = 'REGISTER_COMPLETED'
const SIGNIN_ERROR = 'SIGNIN_ERROR'
const INACTIVE_ERROR = 'INACTIVE_ERROR'
const SIGN_OUT = 'SIGN_OUT'
const SIGN_UP = 'SIGN_UP'
const SET_NAME = 'SET_NAME'

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
        userId: action.payload.user_id,
        token: action.payload.access_token,
        role: action.payload.user_role,
        avatar: action.payload.avatar,
        isSignedIn: true,
        isFetching: false,
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
      return {
        ...state,
        userId: action.payload.user_id,
        token: action.payload.access_token,
        email: action.payload.email,
        role: action.payload.user_role,
        isSignedIn: true,
        isFetching: false,
        needStudentRegister: true,
      }
    case COMPANY_REGISTER:
      return {
        ...state,
        userId: action.payload.user_id,
        token: action.payload.access_token,
        email: action.payload.email,
        role: action.payload.user_role,
        isSignedIn: true,
        isFetching: false,
        needCompanyRegister: true,
      }

    case REGISTER_COMPLETED:
      return {
        ...state,
        needCompanyRegister: false,
        needStudentRegister: false,
      }

    case SET_NAME:
      return {
        ...state,
        prefName: action.payload,
      }

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
        dispatch({ type: STUDENT_REGISTER })
      }
      if (response.status === COMPANY_NEW) {
        dispatch({ type: COMPANY_REGISTER })
      }
      if (response.status === BAD_REQUEST) {
        dispatch({ type: SIGNIN_ERROR, payload: { message: 'Correo o Contraseña erroneo' } })
      }
      if (response.status === USER_INACTIVE) {
        dispatch({ type: INACTIVE_ERROR, payload: { message: 'Necesitas verificar tu cuenta antes de ingresar' } })
      }
      if (response.status === STATUS_OK) {
        if (response.data.user_role === ROLE_STUDENT) {
          dispatch(studentActions.getProfile(response.data.user_id, response.data.access_token, data.email))
        }
        if (response.data.user_role === ROLE_COMPANY) {
          dispatch(companyActions.getProfile(response.data.user_id, response.data.access_token, data.email))
        }

        if(response.data.avatar !== "") { response.data.avatar = `https://lagunalink-be.herokuapp.com/${response.data.avatar}` }

        dispatch({
          type: SIGNIN_SUCCESS,
          payload: { ...response.data, email: data.email },
        })
      }
    })
    .catch(err => {
      dispatch({
        type: SIGNIN_ERROR,
        payload: { err },
      })
    })
}

const signOut = () => dispatch => {
  dispatch(studentActions.signOut())
  dispatch(companyActions.signOut())
  dispatch({ type: SIGN_OUT })
}

const signUp = data => dispatch => {
  apiProvider
    .post('/auth/signup', data)
    .catch(e => {
      console.log({ e })
    })
    .then(dispatch({ type: SIGN_UP }))
}

const setPrefName = name => dispatch => {
  dispatch({ type: SET_NAME, payload: name })
}

const unsetRegister = dispatch => dispatch({ type: REGISTER_COMPLETED })


export const actions = {
  signIn,
  signOut,
  signUp,
  unsetRegister,
  setPrefName
}
