import API from '../API'

export const Publish = ({ accessToken, jobOpening }) => {
  API.defaults.headers.common.Authorization = accessToken

  return API.post('/job_openings', { jobOpening })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
