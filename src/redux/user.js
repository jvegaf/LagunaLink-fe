import { apiProvider } from '../services/api/api-provider'
import { actions as companyActions } from './company'
import { actions as studentActions } from './student'
import { actions as sharedActions } from './shared'

const initialState = {
  token: '',
  userId: '',
  email: '',
  isBusy: false,
  role: '',
  needStudentRegister: false,
  needCompanyRegister: false,
  isSignedIn: false,
  isSignedUp: false,
  inactiveError: false,
  signinError: null,
  prevRegisteredError: false,
  avatarDeleteError: null,
  prefName: '',
  avatar: ''
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
const STUDENT_REGISTER_NEEDED = 'STUDENT_REGISTER_NEEDED'
const COMPANY_REGISTER_NEEDED = 'COMPANY_REGISTER_NEEDED'
const REGISTER_COMPLETED = 'REGISTER_COMPLETED'
const SIGNIN_ERROR = 'SIGNIN_ERROR'
const INACTIVE_ERROR = 'INACTIVE_ERROR'
const SIGN_OUT = 'SIGN_OUT'
const SIGN_UP = 'SIGN_UP'
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
const PREVIOUSLY_REGISTERED_ERROR = 'PREVIOUSLY_REGISTERED_ERROR'
const SET_NAME = 'SET_NAME'
const AVATAR_UPLOAD = 'AVATAR_UPLOAD'
const AVATAR_UPLOADED = 'AVATAR_UPLOADED'
const AVATAR_DELETE = 'AVATAR_DELETE'
const AVATAR_DELETED = 'AVATAR_DELETED'
const AVATAR_DELETE_ERROR = 'AVATAR_DELETED_ERROR'
const UPDATE = 'UPDATE'
const UPDATED = 'UPDATED'

// reducers
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        isBusy: true,
        signinError: false,
        inactiveError: false,

      }

    case SIGN_UP:
      return {
        ...state,
        isBusy: true,
        sigupError: null,
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
        avatarDeleteError: null,
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

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignedUp: true,
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

    case AVATAR_DELETE_ERROR:
      return {
        ...state,
        avatar: '',
        isBusy: false,
        avatarDeleteError: true
      }

    case SIGNIN_ERROR:
      return {
        ...state,
        isBusy: false,
        signinError: true,
      }


    case PREVIOUSLY_REGISTERED_ERROR:
      return {
        ...state,
        isBusy: false,
        prevRegisteredError: true,
      }

    case SIGN_OUT:
      return initialState

    case STUDENT_REGISTER_NEEDED:
      return {
        ...state,
        userId: action.payload.user_id,
        token: action.payload.access_token,
        email: action.payload.email,
        role: action.payload.user_role,
        isBusy: false,
        needStudentRegister: true,
      }
    case COMPANY_REGISTER_NEEDED:
      return {
        ...state,
        userId: action.payload.user_id,
        token: action.payload.access_token,
        email: action.payload.email,
        role: action.payload.user_role,
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
        inactiveError: true,
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

export default userReducer

// actions

const signIn = data => dispatch => {
  dispatch({ type: SIGNIN })
  apiProvider
    .post('auth/signin', data)
    .then(response => {
      if (response.status === STUDENT_NEW) {
        dispatch({ type: STUDENT_REGISTER_NEEDED, payload: response.data })
      }
      if (response.status === COMPANY_NEW) {
        dispatch({ type: COMPANY_REGISTER_NEEDED, payload: response.data })
      }
      if (response.status === STATUS_OK) {
        dispatch(sharedActions.fetchAllCompanies(response.data.access_token))
        dispatch(sharedActions.fetchAllJobOpen(response.data.access_token))

        if (response.data.user_role === ROLE_STUDENT) {
          dispatch(studentActions.getProfile(response.data.user_id, response.data.access_token))
        }
        if (response.data.user_role === ROLE_COMPANY) {
          dispatch(companyActions.getProfile(response.data.user_id, response.data.access_token))
        }

        dispatch({
          type: SIGNIN_SUCCESS,
          payload: { ...response.data, email: data.email },
        })
      }
    })
    .catch(e => {
      console.log({e})
      if (e.response.status === BAD_REQUEST) {
        dispatch({ type: SIGNIN_ERROR })
      }
      if (e.response.status === USER_INACTIVE) {
        dispatch({ type: INACTIVE_ERROR })
      }
    })
}

const signOut = () => dispatch => {
  dispatch(studentActions.signOut())
  dispatch(companyActions.signOut())
  dispatch({ type: SIGN_OUT })
}

const signUp = data => dispatch => {
  dispatch({type: SIGN_UP})
  apiProvider
    .post('auth/signup', data)
    .then(response=>{
      if (response.status === 201){
        dispatch({type: SIGN_UP_SUCCESS})
      }
    })
    .catch(e => {
      if(e.response.status === 430)
      dispatch({type: PREVIOUSLY_REGISTERED_ERROR, payload: e.message})
    })
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
        const avatarPath = res.data.avatar
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
    dispatch({type: AVATAR_DELETE_ERROR})
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
