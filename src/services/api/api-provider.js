
import axios from 'axios'
import { handleResponse, handleError } from './response'

const BASE_URL = 'https://lagunalink-be.herokuapp.com'

const getAll = (resource) => {
  return axios
    .get(`${BASE_URL}/${resource}`)
    .then(handleResponse)
    .catch(handleError)
}

const getSingle = (resource, id) => {
  return axios
    .get(`${BASE_URL}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError)
}

const post = (resource, model) => {
  return axios
    .post(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError)
}

const put = (resource, model) => {
  return axios
    .put(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError)
}

const patch = (resource, model) => {
  return axios
    .patch(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError)
}

const remove = (resource, id) => {
  return axios
    .delete(`${BASE_URL}/${resource}`, id)
    .then(handleResponse)
    .catch(handleError)
}

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove
}
