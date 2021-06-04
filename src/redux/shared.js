import { apiProvider } from '../services/api/api-provider'

const initialState = {
  backendStatus: undefined,
  allJobOpenings: [],
  allCompanies: [],
  avatars: [],
  isBusy: false,
  taskError: false,
  jobsFetched: false,
  companiesFetched: false,
}

// const types

const GET_STATUS = 'GET_STATUS'
const GET_STATUS_SUCCESS = 'GET_STATUS_SUCCESS'
const GET_STATUS_ERROR = 'GET_STATUS_ERROR'
const FETCH_JOB_OPENINGS = 'FETCH_JOB_OPENINGS'
const UPDATE_JOB_OPENINGS = 'UPDATE_JOB_OPENINGS'
const UPDATE_JOB_OPENINGS_COMPLETE = 'UPDATE_JOB_OPENINGS_COMPLETE'
const FETCH_COMPANIES = 'FETCH_COMPANIES'
const FETCH_JOBS_COMPLETE = 'FETCH_JOBS_COMPLETE'
const FETCH_COMPANIES_AVATAR = 'FETCH_COMPANIES_AVATAR'
const FETCH_COMPANIES_AVATAR_COMPLETE = 'FETCH_COMPANIES_AVATAR_COMPLETE'
const FETCH_COMPANIES_COMPLETE = 'FETCH_COMPANIES_COMPLETE'
const COMPANIES_UPDATED = 'COMPANIES_UPDATED'
const FETCH_ERROR = 'FETCH_ERROR'
const SIGN_OUT_SHARED = 'SIGN_OUT_SHARED'

// reducers
const sharedReducer = (state = initialState, action) => {
  switch (action.type) {

    case SIGN_OUT_SHARED:
      return initialState

    case GET_STATUS:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case GET_STATUS_SUCCESS:
      return {
        ...state,
        isBusy: false,
        backendStatus: 200,
      }

    case GET_STATUS_ERROR:
      return {
        ...state,
        isBusy: false,
        backendStatus: 500,
        taskError: true,
      }

    case FETCH_JOB_OPENINGS:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case UPDATE_JOB_OPENINGS:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case UPDATE_JOB_OPENINGS_COMPLETE:
      return {
        ...state,
        isBusy: false,
        allJobOpenings: action.payload,
      }

    case FETCH_COMPANIES:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case FETCH_JOBS_COMPLETE:
      return {
        ...state,
        allJobOpenings: action.payload,
        isBusy: false,
        jobsFetched: true,
      }

    case FETCH_COMPANIES_AVATAR:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case FETCH_COMPANIES_AVATAR_COMPLETE:
      return {
        ...state,
        isBusy: false,
        avatars: action.payload,
        companiesFetched: true
      }

    case FETCH_COMPANIES_COMPLETE:
      return {
        ...state,
        allCompanies: action.payload,
        isBusy: false
      }

    case COMPANIES_UPDATED:
      return {
        ...state,
        allCompanies: action.payload,
        isBusy: false,
      }

    case FETCH_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: true,
      }

    default:
      return state
  }
}

export default sharedReducer

// actions

const getStatus = () => dispatch => {
  dispatch({type: GET_STATUS})
  apiProvider
    .getAll('status')
    .then(res => dispatch({type: GET_STATUS_SUCCESS}))
    .catch(e => dispatch({type: GET_STATUS_ERROR}))
}

const fetchAllJobOpen = accessToken => dispatch => {
  dispatch({ type: FETCH_JOB_OPENINGS })
  apiProvider
    .getAll('job_openings', accessToken)
    .then(res => dispatch({ type: FETCH_JOBS_COMPLETE, payload: res.data.jobOpenings }))
    .catch(e => dispatch({ type: FETCH_ERROR }))
}

const fetchAllCompanies = accessToken => (dispatch, getState) => {
  dispatch({ type: FETCH_COMPANIES })
  apiProvider
    .getAll('companies', accessToken)
    .then(async res => {
      const companies = [...res.data.companies]
      dispatch(actions.fetchAllAvatars(res.data.companies, accessToken))
      dispatch({ type: FETCH_COMPANIES_COMPLETE, payload: companies })
    })
    .catch(e => dispatch({ type: FETCH_ERROR }))
}

const fetchAllAvatars = (companies, accessToken) => async dispatch => {
  dispatch({type: FETCH_COMPANIES_AVATAR})
  const avatarsFetched = []
  for (const company of companies) {
    const avatar = {}
    avatar.id = company.id
    avatar.url = await getAvatar(company.id, accessToken)
    avatarsFetched.push(avatar)
  }
  dispatch({type: FETCH_COMPANIES_AVATAR_COMPLETE, payload: avatarsFetched})
}

const getAvatar = async (userId, accessToken) => {
  try {
    const response = await apiProvider.getSingle('avatar', userId, accessToken)
    return response.data.avatarURL
  } catch (e) {
    console.error(e.message)
  }
}

const setJobsEnrollable = enrollments => (dispatch, getState) => {
  const { allJobOpenings } = getState().shared
  const jobs = allJobOpenings.map(job => {
    job.enrolled = enrollments.some(e => e.job_opening === job.id)
    job.enrollable = !job.enrolled
    return job
  })
  dispatch({type: UPDATE_JOB_OPENINGS_COMPLETE, payload: jobs})
}

const signOut = () => dispatch => dispatch({type: SIGN_OUT_SHARED})


export const actions = {
  getStatus,
  fetchAllJobOpen,
  setJobsEnrollable,
  fetchAllCompanies,
  fetchAllAvatars,
  getAvatar,
  signOut
}
