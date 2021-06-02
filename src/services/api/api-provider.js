import axios from 'axios'
import { handleResponse, handleError } from './response'

// const BASE_URL = 'http://localhost:3300'
const BASE_URL = 'https://lagunalink-be.herokuapp.com'

const getAll = (resource, accessToken) => {
  axios.defaults.headers.common.Authorization = accessToken
  return axios.get(`${BASE_URL}/${resource}`).then(handleResponse).catch(handleError)
}

const getSingle = (resource, id, accessToken) => {
  axios.defaults.headers.common.Authorization = accessToken
  return axios.get(`${BASE_URL}/${resource}/${id}`).then(handleResponse).catch(handleError)
}

const post = (resource, model, accessToken) => {
  if (accessToken !== undefined) {
    axios.defaults.headers.common.Authorization = accessToken
  }
  return axios.post(`${BASE_URL}/${resource}`, model).then(handleResponse).catch(handleError)
}

const put = (resource, id, model, accessToken) => {
  axios.defaults.headers.common.Authorization = accessToken
  return axios.put(`${BASE_URL}/${resource}/${id}`, model).then(handleResponse).catch(handleError)
}

const remove = (resource, id, accessToken) => {
  axios.defaults.headers.common.Authorization = accessToken
  return axios.delete(`${BASE_URL}/${resource}/${id}`).then(handleResponse).catch(handleError)
}

const upload = (id, model, accessToken) => {
  axios.defaults.headers.common.Authorization = accessToken
  axios.defaults.headers.put['Content-Type'] = 'multipart/form-data'
  return axios.put(`${BASE_URL}/avatar/${id}`, model).then(handleResponse).catch(handleError)
}


export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  remove,
  upload
}
