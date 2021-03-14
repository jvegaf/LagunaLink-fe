import { apiProvider } from '../services/api/api-provider'
import { actions as userActions } from './user'

const initialStudentState = {
  id: '',
  email: '',
  name: '',
  surname: '',
  lastname: '',
  qualification: '',
  languages: [],
  jobExperiences: [],
  isBusy: false,
  taskError: null,
}

// const types
const STUDENT_REGISTER = 'STUDENT_REGISTER'
const STUDENT_REGISTER_COMPLETE = 'STUDENT_REGISTER_COMPLETE'
const GET_PROFILE = 'GET_PROFILE'
const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE'
const STUDENT_UPDATE = 'STUDENT_UPDATE'
const STUDENT_UPDATE_COMPLETE = 'STUDENT_UPDATE_COMPLETE'
const ADD_LANGUAGE = 'ADD_LANGUAGE'
const ADD_LANGUAGE_COMPLETE = 'ADD_LANGUAGE_COMPLETE'
const ADD_QUALIFICATION = 'ADD_QUALIFICATION'
const ADD_QUALIFICATION_COMPLETE = 'ADD_QUALIFICATION_COMPLETE'
const ADD_JOB_EXPERIENCE = 'ADD_JOB_EXPERIENCE'
const ADD_JOB_EXPERIENCE_COMPLETE = 'ADD_JOB_EXPERIENCE_COMPLETE'
const SET_ERROR = 'SET_ERROR'
const SIGN_OUT = 'SIGN_OUT'

// reducers
const currentStudent = (state = initialStudentState, action) => {
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
        email: action.payload
      }

    case ADD_LANGUAGE:
      return {
        ...state,
        isBusy: true,
      }

    case ADD_JOB_EXPERIENCE:
      return {
        ...state,
        isBusy: true,
      }

    case ADD_QUALIFICATION:
      return {
        ...state,
        isBusy: true,
      }

    case GET_PROFILE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        lastname: action.payload.lastname,
        qualification: action.payload.qualification,
        languages: action.payload.languages,
        jobExperiences: action.payload.job_experiences,
      }

    case STUDENT_REGISTER_COMPLETE:
      return {
        ...state,
        isBusy: false,
        name: action.payload.name,
        surname: action.payload.surname,
        lastname: action.payload.lastname,
      }

    case ADD_QUALIFICATION_COMPLETE:
      return {
        ...state,
        isBusy: false,
        qualification: action.payload,
      }

    case ADD_LANGUAGE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        languages: action.payload,
      }

    case ADD_JOB_EXPERIENCE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        jobExperiences: action.payload,
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

export default currentStudent

// actions

const signOut = () => dispatch => dispatch({ type: SIGN_OUT })

const getProfile = (userId, token, email) => dispatch => {
  dispatch({ type: GET_PROFILE, payload: email})
  apiProvider
    .getSingle('students', userId, token)
    .then(res => {
      const prefName = `${res.data.student.name} ${res.data.student.surname}`
      dispatch(userActions.setPrefName(prefName))
      dispatch({ type: GET_PROFILE_COMPLETE, payload: res.data.student })
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const registerStudent = (data, token) => dispatch => {
  dispatch({ type: STUDENT_REGISTER })
  apiProvider
    .post('/students', data, token)
    .then(() => {
      userActions.unsetRegister()
      dispatch({ type: STUDENT_REGISTER_COMPLETE, payload: data })
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const updateStudent = (userId, data, token) => dispatch => {
  dispatch({ type: STUDENT_UPDATE })
  apiProvider
    .put('students', userId, data, token)
    .then(() => dispatch({ type: STUDENT_UPDATE_COMPLETE }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const addQualification = (userId, data, token) => dispatch => {
  dispatch({ type: ADD_QUALIFICATION })
  apiProvider
    .put('students', userId, { qualification: data }, token)
    .then(() => dispatch({ type: ADD_QUALIFICATION_COMPLETE, payload: data }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const addLanguage = (userId, data, token) => (dispatch, getState) => {
  dispatch({ type: ADD_LANGUAGE })
  const { profile } = getState().student
  const langs = [...profile.languages, data]
  apiProvider
    .put('students', userId, { languages: langs }, token)
    .then(() => dispatch({ type: ADD_LANGUAGE_COMPLETE, payload: langs }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const addJobExperience = (userId, data, token) => (dispatch, getState) => {
  dispatch({ type: ADD_JOB_EXPERIENCE })
  const { profile } = getState().student
  const jobEx = [...profile.jobExperiences, data]
  apiProvider
    .put('students', userId, { job_experiences: jobEx }, token)
    .then(() => dispatch({ type: ADD_JOB_EXPERIENCE_COMPLETE, payload: jobEx }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

export const actions = {
  signOut,
  getProfile,
  registerStudent,
  updateStudent,
  addQualification,
  addLanguage,
  addJobExperience,
}
