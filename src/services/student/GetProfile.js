import API from '../API'

export const GetProfile = ({ accessToken, studentId }) => {
  API.defaults.headers.common.Authorization = accessToken

  return API.get(`/students/${studentId}`)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
