import { apiProvider } from '../services/api/api-provider'
import { actions as companyActions } from './company'
import { actions as studentActions } from './student'
import { actions as sharedActions } from './shared'

const initialState = {
  accessToken: '',
  userId: '',
  email: '',
  isBusy: false,
  userRole: '',
  isSignedIn: false,
  isSignedUp: false,
  inactiveError: false,
  signinError: null,
  prevRegisteredError: false,
  avatarDeleteError: null,
  profile: null,
  taskError: null,
  prefName: '',
  avatar: '',
}

// const types
const ROLE_STUDENT = 'ROLE_STUDENT'
const ROLE_COMPANY = 'ROLE_COMPANY'
const STATUS_OK = 200
const BAD_REQUEST = 400
const USER_INACTIVE = 450

const GET_PROFILE = 'GET_PROFILE'
const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE'
const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR'
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
const SIGNIN = 'SIGNIN'
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

    case GET_PROFILE:
      return {
        ...state,
        isBusy: true,
        taskError: null,
      }

    case GET_PROFILE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        profile: action.payload,
      }

    case GET_PROFILE_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: action.payload,
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
        userId: action.payload.userId,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        userRole: action.payload.userRole,
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
        avatarDeleteError: true,
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
      if (response.status === STATUS_OK) {
        fetchCompaniesAndJobs(dispatch, response.data.accessToken)

        const payload = { ...response.data, email: data.email }

        dispatch(actions.getProfile(payload))

        data.rememberMe ? persistInLocalStorage(payload) : persistInSessionStorage(payload)

        dispatch({
          type: SIGNIN_SUCCESS,
          payload,
        })
      }
    })
    .catch(e => {
      if (e.response.status === BAD_REQUEST) {
        dispatch({ type: SIGNIN_ERROR })
      }
      if (e.response.status === USER_INACTIVE) {
        dispatch({ type: INACTIVE_ERROR })
      }
    })
}

const signOut = () => dispatch => {
  clearStorage()
  dispatch(studentActions.signOut())
  dispatch(companyActions.signOut())
  dispatch(sharedActions.signOut())
  dispatch({ type: SIGN_OUT })
}

const signUp = data => dispatch => {
  dispatch({ type: SIGN_UP })
  apiProvider
    .post('auth/signup', data)
    .then(response => {
      if (response.status === 201) {
        dispatch({ type: SIGN_UP_SUCCESS })
      }
    })
    .catch(e => {
      if (e.response.status === 430) dispatch({ type: PREVIOUSLY_REGISTERED_ERROR, payload: e.message })
    })
}

const setPrefName = name => dispatch => {
  dispatch({ type: SET_NAME, payload: name })
}

const uploadAvatar = file => (dispatch, getState) => {
  dispatch({ type: AVATAR_UPLOAD })
  const { accessToken, userId } = getState().user

  const formData = new FormData()
  formData.append('image', file)
  apiProvider
    .upload(userId, formData, accessToken)
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
  const { accessToken, userId } = getState().user

  apiProvider
    .remove('avatar', userId, accessToken)
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: AVATAR_DELETED })
      }
    })
    .catch(e => {
      console.log({ e })
      dispatch({ type: AVATAR_DELETE_ERROR })
    })
}

const update = data => (dispatch, getState) => {
  dispatch({ type: UPDATE })
  const { accessToken, userId } = getState().user
  apiProvider
    .put('user', userId, data, accessToken)
    .then(res => {
      if (res.status === 200) dispatch({ type: UPDATED, payload: res.data.user })
    })
    .catch(e => {
      console.log({ e })
    })
}

const getCredentials = () => dispatch => {
  const LStoken = localStorage.getItem('accessToken')
  const SStoken = sessionStorage.getItem('accessToken')

  if (LStoken) {
    const accessToken = LStoken
    const email = localStorage.getItem('email')
    const userId = localStorage.getItem('userId')
    const userRole = localStorage.getItem('userRole')
    const avatar = localStorage.getItem('avatarURI')

    const props = { accessToken, email, userId, userRole, avatar }
    dispatch(actions.getProfile(props))

    fetchCompaniesAndJobs(dispatch, accessToken)

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: props,
    })
  }

  if (SStoken) {
    const accessToken = SStoken
    const email = sessionStorage.getItem('email')
    const userId = sessionStorage.getItem('userId')
    const userRole = sessionStorage.getItem('userRole')
    const avatar = sessionStorage.getItem('avatarURI')

    const props = { accessToken, email, userId, userRole, avatar }
    dispatch(actions.getProfile(props))

    fetchCompaniesAndJobs(dispatch, accessToken)

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: props,
    })
  }
}

const getProfile = payload => dispatch => {
  dispatch({ type: GET_PROFILE })
  const { accessToken } = payload
  apiProvider
    .getAll('user/profile', accessToken)
    .then(res => {
      dispatch(actions.setUserProfile({ ...payload, profile: res.data.profile }))
      dispatch({ type: GET_PROFILE_COMPLETE, payload: res.data.profile })
    })
    .catch(e => {
      dispatch({ type: GET_PROFILE_ERROR, payload: e.response.data })
    })
}

const setUserProfile = payload => dispatch => {
  const { userRole, profile } = payload
  switch (userRole) {
    case ROLE_COMPANY:
      dispatch(companyActions.setProfile(profile))
      break

    case ROLE_STUDENT:
      dispatch(studentActions.setProfile(profile))
      break
  }
}

export const actions = {
  signIn,
  signOut,
  getCredentials,
  getProfile,
  setUserProfile,
  signUp,
  update,
  setPrefName,
  uploadAvatar,
  deleteAvatar,
}

const fetchCompaniesAndJobs = (dispatch, accessToken) => {
  dispatch(sharedActions.fetchAllCompanies(accessToken))
  dispatch(sharedActions.fetchAllJobOpen(accessToken))
}

const persistInLocalStorage = payload => {
  localStorage.setItem('accessToken', payload.accessToken)
  localStorage.setItem('email', payload.email)
  localStorage.setItem('userId', payload.userId)
  localStorage.setItem('userRole', payload.userRole)
  localStorage.setItem('avatarURI', payload.avatar)
}

const persistInSessionStorage = payload => {
  sessionStorage.setItem('accessToken', payload.accessToken)
  sessionStorage.setItem('email', payload.email)
  sessionStorage.setItem('userId', payload.userId)
  sessionStorage.setItem('userRole', payload.userRole)
  sessionStorage.setItem('avatarURI', payload.avatar)
}

const clearStorage = () => {
  sessionStorage.clear()
  localStorage.clear()
}
