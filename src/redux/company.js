import { apiProvider } from '../services/api/api-provider'
import { actions as userActions } from './user'

const initialState = {
  name: '',
  description: '',
  address: '',
  postalCode: '',
  region: '',
  city: '',
  ownJobOpenings: [], 
  isBusy: false,
  taskError: null,
}

// const types
const COMPANY_REGISTER = 'COMPANY_REGISTER'
const COMPANY_REGISTER_COMPLETE = 'COMPANY_REGISTER_COMPLETE'
const GET_PROFILE = 'GET_PROFILE'
const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE'
const ADD_JOB_OPENING = 'ADD_JOB_OPENING'
const ADD_JOB_OPENING_COMPLETE = 'ADD_JOB_OPENING_COMPLETE'
const ADD_JOB_OPENING_ERROR = 'ADD_JOB_OPENING_ERROR'
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
        name: action.payload.name,
        description: action.payload.description,
        address: action.payload.address,
        postalCode: action.payload.postalCode,
        ownJobOpenings: action.payload.job_openings,
        region: action.payload.region,
        city: action.payload.city
      }

    case ADD_JOB_OPENING:
      return {
        ...state,
        taskError: null,
        isBusy: true
      }

    case ADD_JOB_OPENING_COMPLETE:
      return {
        ...state,
        isBusy: false,
        ownJobOpenings: action.payload
      }

    case ADD_JOB_OPENING_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: true
      }

    case COMPANY_REGISTER_COMPLETE:
      return {
        ...state,
        isBusy: false,
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

const signOut = () => dispatch => dispatch({ type: SIGN_OUT })

const getProfile = (userId, token) => dispatch => {
  dispatch({ type: GET_PROFILE })
  apiProvider
    .getSingle('companies', userId, token)
    .then(res => {
      dispatch(userActions.setPrefName(res.data.company.name))
      dispatch({ type: GET_PROFILE_COMPLETE, payload: res.data.company })
      dispatch(userActions.fetchCompleted())
    }).catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const registerCompany = (data, token) => dispatch => {
  dispatch({ type: COMPANY_REGISTER })
  apiProvider
    .post('companies', data, token)
    .then(() =>{ 
      userActions.unsetRegister()
      dispatch({ type: COMPANY_REGISTER_COMPLETE, payload: data })})
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const updateCompany = (userId, data, token) => dispatch => {
  dispatch({ type: COMPANY_UPDATE })
  apiProvider
    .put('companies', userId, data, token)
    .then(() => dispatch({ type: COMPANY_UPDATE_COMPLETE }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))

}

const addJobOpening = data => (dispatch, getState) => {
  const {userId, token} = getState().user
  const { ownJobOpenings } = getState().company
  const model = {...data, company: userId}
  dispatch({ type: ADD_JOB_OPENING})
  apiProvider
    .post('job_openings', model, token)
    .then((res) => {
      ownJobOpenings.push(res.data.job_opening)
      dispatch({ type: ADD_JOB_OPENING_COMPLETE, payload: ownJobOpenings })})
    .catch(e => dispatch({ type: ADD_JOB_OPENING_ERROR }))
}

export const actions = {
  signOut,
  getProfile,
  registerCompany,
  updateCompany,
  addJobOpening
}
