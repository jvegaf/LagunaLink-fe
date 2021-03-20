import { apiProvider } from '../services/api/api-provider'
import { actions as companyActions } from './company'
import { actions as studentActions } from './student'

const initialState = {
  token: '',
  userId: '',
  email: '',
  isBusy: false,
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
const AVATAR_UPLOAD = 'AVATAR_UPLOAD'
const AVATAR_UPLOADED = 'AVATAR_UPLOADED'
const AVATAR_DELETE = 'AVATAR_DELETE'
const AVATAR_DELETED = 'AVATAR_DELETED'
const UPDATE = 'UPDATE'
const UPDATED = 'UPDATED'

// reducers
const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        isBusy: true,
        signinError: null,
      }

    case AVATAR_UPLOAD:
      return {
        ...state,
        isBusy: true,
        signinError: null,
      }

    case AVATAR_DELETE:
      return {
        ...state,
        isBusy: true,
        signinError: null,
      }

      case UPDATE:
      return {
        ...state,
        isBusy: true,
        signinError: null,
      }

      

    case SIGNIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.user_id,
        email: action.payload.email,
        token: action.payload.access_token,
        role: action.payload.user_role,
        avatar: action.payload.avatar,
        isSignedIn: true,
        isBusy: false,
      }

    case AVATAR_UPLOADED:
      return {
        ...state,
        avatar: action.payload,
        isBusy: false,
      }

    case AVATAR_DELETED:
      return {
        ...state,
        avatar: '',
        isBusy: false,
      }

    case SIGNIN_ERROR:
      return {
        ...state,
        isBusy: false,
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
        isBusy: false,
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
        isBusy: false,
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
        isBusy: false,
        inactiveError: action.payload.error,
      }

    case UPDATED:
      return {
        ...state,
        isBusy: false,
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

        if (response.data.avatar !== '') {
          response.data.avatar = `https://lagunalink-be.herokuapp.com/${response.data.avatar}`
        }

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

const uploadAvatar = file => (dispatch, getState) => {
  dispatch({ type: AVATAR_UPLOAD })
  const { token, userId } = getState().user

  const formData = new FormData()
  formData.append('image', file)
  apiProvider
    .upload(userId, formData, token)
    .then(res => {
      if (res.status === 200) {
        const avatarPath = `https://lagunalink-be.herokuapp.com/${res.data.avatar}`
        dispatch({ type: AVATAR_UPLOADED, payload: avatarPath })
      }
    })
    .catch(e => {
      // TODO: dispath con error
      console.log({ e })
    })
}

const deleteAvatar = dispatch => (dispatch, getState) => {
  dispatch({ type: AVATAR_DELETE })
  const { token, userId } = getState().user

  apiProvider.removeAvatar(userId, token).then(res => {
    if (res.status === 200) {
      dispatch({type: AVATAR_DELETED})
    }
  }).catch(e => {
    console.log({ e })
  })
}

const update = data => (dispatch, getState) => {
  dispatch({type: UPDATE })
  const { token, userId } = getState().user
  apiProvider.put('user',userId, data, token)
  .then(res => {
    if (res.status === 200) dispatch({type: UPDATED, payload: res.data.user})
  }).catch(e => {
    console.log({ e })
  })
}



export const actions = {
  signIn,
  signOut,
  signUp,
  update,
  unsetRegister,
  setPrefName,
  uploadAvatar,
  deleteAvatar
}
