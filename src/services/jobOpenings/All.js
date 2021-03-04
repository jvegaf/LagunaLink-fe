import api from '../API'

export const All = ({ accessToken }) => {
  api.defaults.headers.common.Authorization = accessToken

  return api
    .get('/job_openings')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
