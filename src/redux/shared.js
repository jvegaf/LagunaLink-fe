import { apiProvider } from '../services/api/api-provider'

const initialState = {
  backendBaseURL: 'https://lagunalink-be.herokuapp.com',
  jobOpenings: [],
  companies: [],
  isBusy: false,
  taskError: false,
  jobsFetched: false,
  companiesFetched: false
}

// const types

const FETCH_JOB_OPENINGS = 'FETCH_JOB_OPENINGS'
const FETCH_COMPANIES = 'FETCH_COMPANIES'
const FETCH_JOBS_COMPLETE = 'FETCH_JOBS_COMPLETE'
const FETCH_COMPANIES_COMPLETE = 'FETCH_COMPANIES_COMPLETE'
const COMPANIES_UPDATED = 'COMPANIES_UPDATED'
const FETCH_ERROR = 'FETCH_ERROR'


// reducers
const currentApp = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_OPENINGS:
      return {
        ...state,
        isBusy: true,
        taskError: false,
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
        jobOpenings: action.payload,
        isBusy: false,
        jobsFetched: true,
      }

    case FETCH_COMPANIES_COMPLETE:
      return {
        ...state,
        companies: action.payload,
        isBusy: false,
        companiesFetched: true,
      }

    case COMPANIES_UPDATED:
      return {
        ...state,
        companies: action.payload,
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

export default currentApp

// actions

const fetchAllJobOpen = token => dispatch => {
  dispatch({ type: FETCH_JOB_OPENINGS })
  apiProvider
    .getAll('job_openings', token)
    .then(res => dispatch({ type: FETCH_JOBS_COMPLETE, payload: res.data.jobOpenings }))
    .catch(e => dispatch({ type: FETCH_ERROR }))
}

const fetchAllCompanies = token => (dispatch, getState) => {
  const { backendBaseURL } = getState().shared
  dispatch({ type: FETCH_COMPANIES })
  apiProvider
    .getAll('companies', token)
    .then(async res => {
      const companies = [...res.data.companies];
      for (const company of res.data.companies) {
        const avatarId = await getCompanyAvatar(company.id, token)
        company.avatar = `${backendBaseURL}/${avatarId}`
      }
      dispatch({ type: FETCH_COMPANIES_COMPLETE, payload: companies })
    })
    .catch(e => dispatch({ type: FETCH_ERROR }))
}

const getCompanyAvatar = async (companyId, token) => {

  try {
    const response = await apiProvider.getSingle(`user/${companyId}`, 'avatar', token)
    return response.data.avatarId
  }catch (e) {
    console.error(e.message)
  }
}

export const actions = {
  fetchAllJobOpen,
  fetchAllCompanies,
  getCompanyAvatar,
}
