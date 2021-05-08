import { apiProvider } from '../services/api/api-provider'
import { actions as userActions } from './user'
import { dateToISOString } from './../services/date/dateFormatter'
import { actions as sharedActions } from './shared'

const initialStudentState = {
  name: '',
  surname: '',
  lastname: '',
  qualification: {
    title: '',
    start_date: '',
    end_date: '',
  },
  languages: null,
  jobExperiences: null,
  enrollments: null,
  isBusy: false,
  registered: false,
  taskError: null,
}

// const types
const STUDENT_REGISTER = 'STUDENT_REGISTER'
const STUDENT_REGISTER_COMPLETE = 'STUDENT_REGISTER_COMPLETE'
const GET_PROFILE = 'GET_PROFILE'
const GET_ENROLLS = 'GET_ENROLLS'
const GET_ENROLLS_ERROR = 'GET_ENROLLS_ERROR'
const GET_ENROLLS_COMPLETE = 'GET_ENROLLS_COMPLETE'
const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE'
const ENROLL_THIS_JOB = 'ENROLL_THIS_JOB'
const ENROLL_THIS_JOB_ERROR = 'ENROLL_THIS_JOB_ERROR'
const ENROLL_THIS_JOB_COMPLETE = 'ENROLL_THIS_JOB_COMPLETE'
const UNENROLL_THIS_JOB = 'UNENROLL_THIS_JOB'
const UNENROLL_THIS_JOB_COMPLETE = 'UNENROLL_THIS_JOB_COMPLETE'
const STUDENT_UPDATE = 'STUDENT_UPDATE'
const STUDENT_UPDATE_COMPLETE = 'STUDENT_UPDATE_COMPLETE'
const SET_ERROR = 'SET_ERROR'
const SIGN_OUT = 'SIGN_OUT'

// reducers
const studentReducer = (state = initialStudentState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return initialStudentState

    case STUDENT_REGISTER:
      return {
        ...state,
        isBusy: true,
      }

    case STUDENT_UPDATE:
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
        surname: action.payload.surname,
        lastname: action.payload.lastname,
        qualification: action.payload.qualification,
        languages: action.payload.languages,
        jobExperiences: action.payload.job_experiences,
      }

    case GET_ENROLLS:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case GET_ENROLLS_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: action.payload,
      }

    case GET_ENROLLS_COMPLETE:
      return {
        ...state,
        isBusy: false,
        enrollments: action.payload,
      }

    case ENROLL_THIS_JOB:
      return {
        ...state,
        isBusy: true,
      }

    case ENROLL_THIS_JOB_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: action.payload
      }

    case ENROLL_THIS_JOB_COMPLETE:
      return {
        ...state,
        isBusy: false,
        enrollments: action.payload,
      }

    case STUDENT_REGISTER_COMPLETE:
      return {
        ...state,
        isBusy: false,
        name: action.payload.name,
        surname: action.payload.surname,
        lastname: action.payload.lastname,
        registered: true,
      }

    case STUDENT_UPDATE_COMPLETE:
      return {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        lastname: action.payload.lastname,
        qualification: action.payload.qualification,
        languages: action.payload.languages,
        jobExperiences: action.payload.job_experiences,
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

export default studentReducer

// actions

const signOut = () => dispatch => dispatch({ type: SIGN_OUT })

const getProfile = (userId, token) => dispatch => {
  dispatch({ type: GET_PROFILE })
  apiProvider
    .getSingle('students', userId, token)
    .then(res => {
      const prefName = `${res.data.student.name} ${res.data.student.surname}`
      dispatch(userActions.setPrefName(prefName))
      dispatch(fetchEnrolls(userId, token))
      dispatch({ type: GET_PROFILE_COMPLETE, payload: res.data.student })
    })
    .catch(e => {
      dispatch({ type: SET_ERROR, payload: e })
    })
}

const registerStudent = data => (dispatch, getState) => {
  const { token } = getState().user
  dispatch({ type: STUDENT_REGISTER })
  apiProvider
    .post('students', data, token)
    .then(() => {
      userActions.unsetRegister()
      dispatch({ type: STUDENT_REGISTER_COMPLETE, payload: data })
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const updateStudent = data => (dispatch, getState) => {
  const { userId, token } = getState().user
  dispatch({ type: STUDENT_UPDATE })
  apiProvider
    .put('students', userId, data, token)
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: STUDENT_UPDATE_COMPLETE, payload: res.data.student })
      }
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const enrollThisJob = jobId => (dispatch, getState) => {
  const { userId, token } = getState().user
  const todayDate = Date.now()
  const today = dateToISOString(todayDate)
  const data = {
    student: userId,
    jobOpening: jobId,
    enrollmentDate: today
  }
  dispatch({ type: ENROLL_THIS_JOB })
  apiProvider
    .post(`job_openings/${jobId}/enrollments`, data, token)
    .then(res => {
      dispatch({ type: ENROLL_THIS_JOB_COMPLETE, payload: res.data.enrollments })
      dispatch(sharedActions.setJobsEnrollable(res.data.enrollments))
    })
    .catch(e => dispatch({ type: ENROLL_THIS_JOB_ERROR, payload: e }))
}

const unenrollThisJob = enrollId => (dispatch, getState) => {
  const { token } = getState().user
  dispatch({ type: UNENROLL_THIS_JOB })
  apiProvider
    .remove(`enrollments`, enrollId, token)
    .then(res => {
      dispatch({ type: UNENROLL_THIS_JOB_COMPLETE, payload: res.data.enrollments })
      dispatch(sharedActions.setJobsEnrollable(res.data.enrollments))
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const fetchEnrolls = (userId, token) => dispatch => {
  dispatch({ type: GET_ENROLLS })
  apiProvider.getAll(`students/${userId}/enrollments`, token)
  .then(res => {
    dispatch({ type: GET_ENROLLS_COMPLETE, payload: res.data.enrollments })
    dispatch(sharedActions.setJobsEnrollable(res.data.enrollments))
  })
  .catch(e =>{ dispatch({type: GET_ENROLLS_ERROR, payload: e})})
}



export const actions = {
  signOut,
  getProfile,
  registerStudent,
  updateStudent,
  fetchEnrolls,
  enrollThisJob,
  unenrollThisJob,
}
