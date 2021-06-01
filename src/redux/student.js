import { apiProvider } from '../services/api/api-provider'
import { dateToISOString } from './../services/date/dateFormatter'
import { actions as sharedActions } from './shared'
import { actions as userActions } from './user'

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
  enrolls: null,
  isBusy: false,
  taskError: null,
}

// const types
const SET_PROFILE = 'SET_STUDENT_PROFILE'
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

    case STUDENT_UPDATE:
      return {
        ...state,
        isBusy: true,
      }

    case SET_PROFILE:
      return {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        lastname: action.payload.lastname,
        qualification: action.payload.qualification,
        languages: action.payload.languages,
        jobExperiences: action.payload.job_experiences,
        enrolls: action.payload.enrolls,
      }

    case ENROLL_THIS_JOB:
      return {
        ...state,
        isBusy: true,
      }

    case UNENROLL_THIS_JOB:
      return {
        ...state,
        isBusy: true,
      }

    case UNENROLL_THIS_JOB_COMPLETE:
      return {
        ...state,
        isBusy: false,
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
        isBusy: false
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

const setProfile = profile => (dispatch, getState) => {
  const { enrolls, jobOpenings, companies } = profile;
  dispatch(sharedActions.setJobsEnrollable(enrolls));
  const enr = enrolls.map(en =>{
    en.jobDetail = jobOpenings.find(j => j._id === en.job_opening)
    en.jobDetail.companyDetail = companies.find(c => c._id === en.jobDetail.company)
    return en
  })
  const props = {...profile, enrolls: enr}
  dispatch({ type: SET_PROFILE, payload: props })
}

const updateStudent = data => (dispatch, getState) => {
  const { userId, accessToken } = getState().user
  dispatch({ type: STUDENT_UPDATE })
  apiProvider
    .put('students', userId, data, accessToken)
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: STUDENT_UPDATE_COMPLETE, payload: res.data.student })
      }
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const enrollThisJob = jobId => (dispatch, getState) => {
  const { accessToken, email, userId, userRole, avatar } = getState().user
  const todayDate = Date.now()
  const today = dateToISOString(todayDate)
  const data = {
    student: userId,
    jobOpening: jobId,
    enrollmentDate: today
  }
  dispatch({ type: ENROLL_THIS_JOB })
  apiProvider
    .post(`enrollments/${jobId}`, data, accessToken)
    .then(res => {
      dispatch({ type: ENROLL_THIS_JOB_COMPLETE})
      dispatch(userActions.getProfile({ accessToken, email, userId, userRole, avatar }))
      dispatch(sharedActions.setJobsEnrollable(res.data.enrollments))
    })
    .catch(e => dispatch({ type: ENROLL_THIS_JOB_ERROR, payload: e }))
}

const unenrollThisJob = enrollId => (dispatch, getState) => {
  const { accessToken, email, userId, userRole, avatar } = getState().user
  dispatch({ type: UNENROLL_THIS_JOB })
  apiProvider
    .remove(`enrollments`, enrollId, accessToken)
    .then(res => {
      dispatch({ type: UNENROLL_THIS_JOB_COMPLETE })
      dispatch(userActions.getProfile({ accessToken, email, userId, userRole, avatar }))
      dispatch(sharedActions.setJobsEnrollable(res.data.enrollments))
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}


export const actions = {
  signOut,
  setProfile,
  updateStudent,
  enrollThisJob,
  unenrollThisJob,
}
