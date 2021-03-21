import { apiProvider } from '../services/api/api-provider'
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
  isBusy: false,
  taskError: null,
  addLanguage: false
}

// const types
const STUDENT_REGISTER = 'STUDENT_REGISTER'
const STUDENT_REGISTER_COMPLETE = 'STUDENT_REGISTER_COMPLETE'
const GET_PROFILE = 'GET_PROFILE'
const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE'
const STUDENT_UPDATE = 'STUDENT_UPDATE'
const STUDENT_UPDATE_COMPLETE = 'STUDENT_UPDATE_COMPLETE'
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
        isBusy: true
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

    case STUDENT_REGISTER_COMPLETE:
      return {
        ...state,
        isBusy: false,
        name: action.payload.name,
        surname: action.payload.surname,
        lastname: action.payload.lastname,
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
        isBusy: false
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

const getProfile = (userId, token) => dispatch => {
  dispatch({ type: GET_PROFILE})
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

const updateStudent = data => (dispatch, getState) => {
  const { userId, token } = getState().user
  dispatch({ type: STUDENT_UPDATE })
  apiProvider
    .put('students', userId, data, token)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        dispatch({ type: STUDENT_UPDATE_COMPLETE, payload: res.data.student })
      }
    })
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

export const actions = {
  signOut,
  getProfile,
  registerStudent,
  updateStudent
}
