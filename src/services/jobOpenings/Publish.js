import api from '../API'

export const Publish = ({ accessToken, jobOpening }) => {
  api.defaults.headers.common.Authorization = accessToken

  return api
    .post('/job_openings', { jobOpening })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
