import { apiProvider } from '../services/api/api-provider';

const initialState = {
  jobOpenings: [],
  isBusy: false,
  taskError: false,
  fetched: false
}

// const types


const FETCH_JOB_OPENINGS = 'FETCH_JOB_OPENINGS';
const FETCH_COMPLETE = 'FETCH_COMPLETE';
const FETCH_ERROR = 'FETCH_ERROR';


// reducers
const currentApp = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_OPENINGS:
      return {
        ...state,
        isBusy: true,
        taskError: false,
      }

    case FETCH_COMPLETE:
      return {
        ...state,
        jobOpenings: action.payload,
        isBusy: false,
        fetched: true
      }

    case FETCH_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: true
      }

    default:
      return state
  }
}

export default currentApp

// actions

const fetchAllJobOpen = token => (dispatch, getState) => {
  dispatch({type: FETCH_JOB_OPENINGS})
  apiProvider.getAll('job_openings', token)
  .then(res => dispatch({type: FETCH_COMPLETE, payload: res.data.jobOpenings}))
  .catch(e => dispatch({type: FETCH_ERROR}))
}





export const actions = {
 fetchAllJobOpen
}
