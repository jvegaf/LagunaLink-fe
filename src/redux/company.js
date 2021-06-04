import { apiProvider } from '../services/api/api-provider'
import { actions as sharedActions } from './shared'
import { actions as userActions } from './user'

const initialState = {
  name: '',
  description: '',
  address: '',
  postalCode: '',
  region: '',
  city: '',
  jobOpenings: null,
  studentsAvatar: null,
  avatarsFetched: false,
  isBusy: false,
  taskError: null,
}

// const types
const SET_PROFILE = 'SET_COMPANY_PROFILE'
const ADD_JOB_OPENING = 'ADD_JOB_OPENING'
const ADD_JOB_OPENING_COMPLETE = 'ADD_JOB_OPENING_COMPLETE'
const ADD_JOB_OPENING_ERROR = 'ADD_JOB_OPENING_ERROR'
const COMPANY_UPDATE = 'COMPANY_UPDATE'
const COMPANY_UPDATE_COMPLETE = 'COMPANY_UPDATE_COMPLETE'
const JOB_OPENING_UPDATE = 'JOB_OPENING_UPDATE'
const JOB_OPENING_UPDATE_COMPLETE = 'JOB_OPENING_UPDATE_COMPLETE'
const JOB_OPENING_DEACTIVATE = 'JOB_OPENING_DEACTIVATE'
const FETCH_STUDENTS_AVATARS = 'FETCH_STUDENTS_AVATARS'
const FETCH_STUDENTS_AVATARS_COMPLETE = 'FETCH_STUDENTS_AVATARS_COMPLETE'
const JOB_OPENING_DEACTIVATE_COMPLETE = 'JOB_OPENING_DEACTIVATE_COMPLETE'
const SET_ERROR = 'SET_ERROR'
const SIGN_OUT = 'SIGN_OUT'

// reducers
const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return initialState

    case COMPANY_UPDATE:
      return {
        ...state,
        isBusy: true,
      }

    case COMPANY_UPDATE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        name: action.payload.name,
        description: action.payload.description,
        address: action.payload.address,
        postalCode: action.payload.postalCode,
        region: action.payload.region,
        city: action.payload.city,
      }

    case JOB_OPENING_UPDATE:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case FETCH_STUDENTS_AVATARS:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case JOB_OPENING_UPDATE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        jobOpenings: action.payload,
      }

    case FETCH_STUDENTS_AVATARS_COMPLETE:
      return {
        ...state,
        isBusy: false,
        studentsAvatar: action.payload,
        avatarsFetched: true
      }

    case SET_PROFILE:
      return {
        ...state,
        isBusy: false,
        name: action.payload.name,
        description: action.payload.description,
        address: action.payload.address,
        postalCode: action.payload.postalCode,
        region: action.payload.region,
        city: action.payload.city,
        jobOpenings: action.payload.jobs,
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
      }

    case ADD_JOB_OPENING_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: true,
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

const setProfile = profile => (dispatch, getState) => {
  const { accessToken } = getState().user
  const { jobOpenings, enrolls, students } = profile
  dispatch(actions.fetchAllAvatars(students, accessToken))
  const enrlls = enrolls.map(en => {
    en.studentDetail = students.find(s => s.id === en.student)
    return en
  })
  const jobs = jobOpenings.map(j => {
    const enr = enrlls.filter(en => en.job_opening === j._id)
    j.enrolls = enr
    return j
  })

  const jobsF = []
  jobs.forEach(job => {
    if (jobsF.findIndex(j => j._id === job._id) < 0) {
      jobsF.push(job)
    }
  })
  const props = { ...profile, jobs: jobsF.filter(j => j.isActive) }

  dispatch({ type: SET_PROFILE, payload: props })
}

const updateCompany = data => (dispatch, getState) => {
  dispatch({ type: COMPANY_UPDATE })
  const { userId, accessToken } = getState().user

  apiProvider
    .put('companies', userId, data, accessToken)
    .then(() => dispatch({ type: COMPANY_UPDATE_COMPLETE, payload: data }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const addJobOpening = data => (dispatch, getState) => {
  const { accessToken, email, userId, userRole, avatar } = getState().user

  const model = { ...data, company: userId }
  dispatch({ type: ADD_JOB_OPENING })
  apiProvider
    .post('job_openings', model, accessToken)
    .then(res => {
      dispatch(userActions.getProfile({ accessToken, email, userId, userRole, avatar }))
      dispatch(sharedActions.fetchAllJobOpen(accessToken))
      dispatch({ type: ADD_JOB_OPENING_COMPLETE })
    })
    .catch(e => dispatch({ type: ADD_JOB_OPENING_ERROR }))
}

const updateJobOpening = job => (dispatch, getState) => {
  const { accessToken, email, userId, userRole, avatar } = getState().user
  dispatch({ type: JOB_OPENING_UPDATE })
  apiProvider.put('job_openings', job.id, job, accessToken).then(res => {
    dispatch(userActions.getProfile({ accessToken, email, userId, userRole, avatar }))
    dispatch(sharedActions.fetchAllJobOpen(accessToken))
    dispatch({ type: JOB_OPENING_UPDATE_COMPLETE })
  })
}

const removeJobOpening = jobId => (dispatch, getState) => {
  dispatch({ type: JOB_OPENING_DEACTIVATE })
  const { accessToken, email, userId, userRole, avatar } = getState().user
  apiProvider.remove('job_openings', jobId, accessToken).then(res => {
    dispatch(userActions.getProfile({ accessToken, email, userId, userRole, avatar }))
    dispatch(sharedActions.fetchAllJobOpen(accessToken))
    dispatch({ type: JOB_OPENING_DEACTIVATE_COMPLETE })
  })
}

const fetchAllAvatars = (students, accessToken) => async dispatch => {
  dispatch({ type: FETCH_STUDENTS_AVATARS })
  const avatarsFetched = []
  for (const student of students) {
    const avatar = {}
    avatar.id = student.id
    avatar.url = await getAvatar(student.id, accessToken)
    avatarsFetched.push(avatar)
  }
  dispatch({ type: FETCH_STUDENTS_AVATARS_COMPLETE, payload: avatarsFetched })
}

export const actions = {
  signOut,
  setProfile,
  updateCompany,
  addJobOpening,
  updateJobOpening,
  removeJobOpening,
  fetchAllAvatars,
}

const getAvatar = async (userId, accessToken) => {
  try {
    const response = await apiProvider.getSingle('avatar', userId, accessToken)
    return response.data.avatarURL
  } catch (e) {
    console.error(e.message)
  }
}
