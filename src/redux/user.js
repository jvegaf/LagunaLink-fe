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
  needStudentRegister: false,
  needCompanyRegister: false,
  isSignedIn: false,
  isSignedUp: false,
  inactiveError: false,
  signinError: null,
  prevRegisteredError: false,
  avatarDeleteError: null,
  profile: null,
  prefName: '',
  avatar: '',
}

// const types
const ROLE_STUDENT = 'ROLE_STUDENT'
const ROLE_COMPANY = 'ROLE_COMPANY'
const STATUS_OK = 200
const REGISTER_NEEDED = 230
const BAD_REQUEST = 400
const USER_INACTIVE = 450

const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
const SIGNIN = 'SIGNIN'
const NEED_REGISTER = 'NEED_REGISTER'
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
        userId: action.payload.userId,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        userRole: action.payload.userRole,
        avatar: action.payload.avatar,
        profile: action.payload.profile,
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

    case NEED_REGISTER:
      return {
        ...state,
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        email: action.payload.email,
        userRole: action.payload.userRole,
        isBusy: false,
        needStudentRegister: action.payload.userRole === ROLE_STUDENT,
        needCompanyRegister: action.payload.userRole === ROLE_COMPANY,
      }

    case REGISTER_COMPLETED:
      return {
        ...state,
        needCompanyRegister: false,
        needStudentRegister: false,
        isSignedIn: true,
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
      if (response.status === REGISTER_NEEDED) {
        dispatch({ type: NEED_REGISTER, payload: response.data })
      }
      if (response.status === STATUS_OK) {
        fetchCompaniesAndJobs(dispatch, response.data.accessToken)

        const payload = { ...response.data, email: data.email }

        setUserProfile(payload, dispatch)

        data.rememberMe
          ? persistInLocalStorage({ ...payload, accessToken: response.data.accessToken })
          : persistInSessionStorage({ ...payload, accessToken: response.data.accessToken })

        dispatch({
          type: SIGNIN_SUCCESS,
          payload,
        })
      }
    })
    .catch(e => {
      console.log({ e })
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

const unsetRegister =
  ({ userRole, userId, accessToken }) =>
  dispatch => {
    dispatch({ type: REGISTER_COMPLETED })
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
    .removeAvatar(userId, accessToken)
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
    const email = localStorage.getItem('userEmail')
    const userId = localStorage.getItem('userId')
    const userRole = localStorage.getItem('userRole')
    const avatar = localStorage.getItem('avatarURI')
    const profile = localStorage.getItem('profile')

    setUserProfile({userRole, profile}, dispatch);

    fetchCompaniesAndJobs(dispatch, LStoken)

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: { email, userId, userRole, avatar, profile },
    })
  }

  if (SStoken) {
    const email = sessionStorage.getItem('userEmail')
    const userId = sessionStorage.getItem('userId')
    const userRole = sessionStorage.getItem('userRole')
    const avatar = sessionStorage.getItem('avatarURI')
    const profile = sessionStorage.getItem('profile')

    setUserProfile({userRole, profile}, dispatch);

    fetchCompaniesAndJobs(dispatch, SStoken)

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: { email, userId, userRole, avatar, profile },
    })
  }
}

export const actions = {
  signIn,
  signOut,
  getCredentials,
  signUp,
  update,
  unsetRegister,
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
  localStorage.setItem('profile', payload.profile)
}

const persistInSessionStorage = payload => {
  sessionStorage.setItem('accessToken', payload.accessToken)
  sessionStorage.setItem('email', payload.email)
  sessionStorage.setItem('userId', payload.userId)
  sessionStorage.setItem('userRole', payload.userRole)
  sessionStorage.setItem('avatarURI', payload.avatar)
  sessionStorage.setItem('profile', payload.profile)
}

const clearStorage = () => {
  sessionStorage.clear()
  localStorage.clear()
}

const setUserProfile = (payload, dispatch) => {
  switch (payload.userRole) {
    case ROLE_COMPANY:
      dispatch(companyActions.setProfile(payload.profile))
      break

    case ROLE_STUDENT:
      dispatch(studentActions.setProfile(payload.profile))
      break
  }
}
