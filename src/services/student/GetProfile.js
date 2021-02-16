import API from '../API'

export const GetStudentProfile = (accessToken, studentId) => {
  API.defaults.headers.common.Authorization = accessToken

  const reqUri = `/students/${studentId}`
  console.log(reqUri)
  return API.get(reqUri)
    .then(function (response) {
      console.log(response)
      return response
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
}
