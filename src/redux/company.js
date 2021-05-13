import moment from 'moment'
import { apiProvider } from '../services/api/api-provider'
import { actions as userActions } from './user'

const initialState = {
  name: '',
  description: '',
  address: '',
  postalCode: '',
  region: '',
  city: '',
  registered: false,
  ownJobOpenings: [],
  jobEnrolls: [],
  isBusy: false,
  taskError: null,
}

// const types
const COMPANY_REGISTER = 'COMPANY_REGISTER'
const COMPANY_REGISTER_COMPLETE = 'COMPANY_REGISTER_COMPLETE'
const GET_PROFILE = 'GET_PROFILE'
const FETCH_JOBS_ENROLLS = 'FETCH_JOB_ENROLLS'
const FETCH_JOBS_ENROLLS_COMPLETE = 'FETCH_JOB_ENROLLS_COMPLETE'
const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE'
const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR'
const ADD_JOB_OPENING = 'ADD_JOB_OPENING'
const ADD_JOB_OPENING_COMPLETE = 'ADD_JOB_OPENING_COMPLETE'
const ADD_JOB_OPENING_ERROR = 'ADD_JOB_OPENING_ERROR'
const COMPANY_UPDATE = 'COMPANY_UPDATE'
const COMPANY_UPDATE_COMPLETE = 'COMPANY_UPDATE_COMPLETE'
const JOB_OPENING_UPDATE = 'JOB_OPENING_UPDATE'
const JOB_OPENING_UPDATE_COMPLETE = 'JOB_OPENING_UPDATE_COMPLETE'
const SET_ERROR = 'SET_ERROR'
const SIGN_OUT = 'SIGN_OUT'

// reducers
const companyReducer = (state = initialState, action) => {
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

    case JOB_OPENING_UPDATE:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case FETCH_JOBS_ENROLLS:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case FETCH_JOBS_ENROLLS_COMPLETE:
      return {
        ...state,
        jobEnrolls: action.payload,
        taskError: null,
      }

    case JOB_OPENING_UPDATE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        ownJobOpenings: action.payload,
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
        city: action.payload.city,
      }

    case GET_PROFILE_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: action.payload,
      }

    case ADD_JOB_OPENING:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case ADD_JOB_OPENING_COMPLETE:
      return {
        ...state,
        isBusy: false,
        ownJobOpenings: action.payload,
      }

    case ADD_JOB_OPENING_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: true,
      }

    case COMPANY_REGISTER_COMPLETE:
      return {
        ...state,
        isBusy: false,
        registered: true,
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

export default companyReducer

// actions

const signOut = () => dispatch => dispatch({ type: SIGN_OUT })

const getProfile = (userId, token) => dispatch => {
  dispatch({ type: GET_PROFILE })
  apiProvider
    .getSingle('companies', userId, token)
    .then(res => {
      dispatch(userActions.setPrefName(res.data.company.name))
      dispatch({ type: GET_PROFILE_COMPLETE, payload: res.data.company })
    })
    .catch(e => dispatch({ type: GET_PROFILE_ERROR, payload: e }))
}

const registerCompany = (data, token) => dispatch => {
  dispatch({ type: COMPANY_REGISTER })
  apiProvider
    .post('companies', data, token)
    .then(() => {
      userActions.unsetRegister()
      dispatch({ type: COMPANY_REGISTER_COMPLETE, payload: data })
    })
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
  const { userId, token } = getState().user
  const { ownJobOpenings } = getState().company
  const model = { ...data, company: userId }
  dispatch({ type: ADD_JOB_OPENING })
  apiProvider
    .post('job_openings', model, token)
    .then(res => {
      const jobs = [...ownJobOpenings, data]
      dispatch({ type: ADD_JOB_OPENING_COMPLETE, payload: jobs })
    })
    .catch(e => dispatch({ type: ADD_JOB_OPENING_ERROR }))
}

const removeJobOpening = jobId => (dispatch, getState) => {
  dispatch({ type: JOB_OPENING_UPDATE })
  const { token } = getState().user
  const { ownJobOpenings } = getState().company
  const job = ownJobOpenings.find(j => j.id === jobId)
  const hDate = moment().subtract(3, 'years').format('YYYY-MM-DD')
  const model = { ...job, hiringDate: hDate }
  apiProvider.put('job_openings', jobId, model, token).then(res => {
    const jobs = res.data.job_openings.filter(jb => moment(jb.hiringDate) > moment())
    dispatch({ type: JOB_OPENING_UPDATE_COMPLETE, payload: jobs })
  })
}

const getEnrollsOfJobs = jobs => async (dispatch, getState) => {
  dispatch({ type: FETCH_JOBS_ENROLLS })
  const { token } = getState().user
  const _jobs = await Promise.all(
    jobs.map(async job => {
      if (job.enrollsCount < 1) return
      const res = await apiProvider.getAll(`job_openings/${job.id}/enrollments`, token)
      job.enrolls = res.data.enrolls
      return job
    })
  )
  dispatch({ type: FETCH_JOBS_ENROLLS_COMPLETE, payload: _jobs })
}

export const actions = {
  signOut,
  getProfile,
  registerCompany,
  updateCompany,
  addJobOpening,
  removeJobOpening,
  getEnrollsOfJobs,
}
