import { apiProvider } from '../services/api/api-provider'

const initialState = {
  profile: {
    id: '',
    name: '',
    description: '',
    address: '',
    postalCode: '',
    region: '',
    city: '',
  },
  isBusy: false,
  taskError: null,
}

// const types
const COMPANY_REGISTER = 'COMPANY_REGISTER'
const COMPANY_REGISTER_COMPLETE = 'COMPANY_REGISTER_COMPLETE'
const GET_PROFILE = 'GET_PROFILE'
const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE'
const COMPANY_UPDATE = 'COMPANY_UPDATE'
const COMPANY_UPDATE_COMPLETE = 'COMPANY_UPDATE_COMPLETE'
const SET_ERROR = 'SET_ERROR'
const SIGN_OUT = 'SIGN_OUT'

// reducers
const currentCompany = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return initialState

    case COMPANY_REGISTER:
      return {
        ...state,
        isBusy: true,
      }

    case COMPANY_UPDATE:
      return {
        ...state,
        isBusy: true,
      }

    case GET_PROFILE:
      return {
        ...state,
        isBusy: true,
      }

    case GET_PROFILE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        profile: action.payload.company,
      }

    case COMPANY_REGISTER_COMPLETE:
      return {
        ...state,
        isBusy: false,
        profile: {
          name: action.payload.name,
          surname: action.payload.surname,
          lastname: action.payload.lastname,
        },
      }

    case SET_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: action.payload,
      }

    default:
      return state
  }
}

export default currentCompany

// actions

const signOut = dispatch => dispatch({ type: SIGN_OUT })

const getProfile = (userId, token) => dispatch => {
  dispatch({ type: GET_PROFILE })
  apiProvider
    .getSingle('companies', userId, token)
    .then(res => dispatch({ type: GET_PROFILE_COMPLETE, payload: res.data }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const registerCompany = (data, token) => dispatch => {
  dispatch({ type: COMPANY_REGISTER })
  apiProvider
    .post('/companies', data, token)
    .then(() => dispatch({ type: COMPANY_REGISTER_COMPLETE, payload: data }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const updateCompany = (userId, data, token) => dispatch => {
  dispatch({ type: COMPANY_UPDATE })
  apiProvider
    .put('companies', userId, data, token)
    .then(() => dispatch({ type: COMPANY_UPDATE_COMPLETE }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

export const actions = {
  signOut,
  getProfile,
  registerCompany,
  updateCompany
}
