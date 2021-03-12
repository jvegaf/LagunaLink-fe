import { apiProvider } from '../services/api/api-provider'

const initialState = {
  profile: {
    id: '',
    name: '',
    surname: '',
    lastname: '',
    qualification: null,
    languages: [],
    jobExperiences: [],
  },
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
const currentStudent = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return initialState

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
        profile: action.payload.student,
      }

    case STUDENT_REGISTER_COMPLETE:
      return {
        ...state,
        isBusy: false,
        profile: {
          name: action.payload.name,
          surname: action.payload.surname,
          lastname: action.payload.lastname,
        },
      }

    case ADD_QUALIFICATION_COMPLETE:
      return {
        ...state,
        isBusy: false,
        profile: {
          qualification: action.payload
        }
      }

    case ADD_LANGUAGE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        profile: {
          languages: action.payload
        }
      }

    case ADD_JOB_EXPERIENCE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        profile: {
          jobExperiences: action.payload
        }
      }

    case SET_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: action.payload
      }

    default:
      return state
  }
}

export default currentStudent

// actions

const signOut = dispatch => dispatch({ type: SIGN_OUT })

const getProfile = (userId, token) => dispatch => {
  dispatch({ type: GET_PROFILE })
  apiProvider
    .getSingle('students', userId, token)
    .then(res => dispatch({ type: GET_PROFILE_COMPLETE, payload: res.data }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const registerStudent = (data, token) => dispatch => {
  dispatch({ type: STUDENT_REGISTER })
  apiProvider
    .post('/students', data, token)
    .then(() => dispatch({ type: STUDENT_REGISTER_COMPLETE, payload: data }))
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

const addLanguage = (userId, data, token) => (dispatch, getState ) => {
  dispatch({ type: ADD_LANGUAGE })
  const { profile } = getState().student
  const langs = [...profile.languages, data ]
  apiProvider
    .put('students', userId, { languages: langs }, token)
    .then(() => dispatch({ type: ADD_LANGUAGE_COMPLETE, payload: langs }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const addJobExperience = (userId, data, token) => (dispatch, getState ) => {
  dispatch({ type: ADD_JOB_EXPERIENCE })
  const { profile } = getState().student
  const jobEx = [...profile.jobExperiences, data ]
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
