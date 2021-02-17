import API from '../API'

export const GetStudentProfile = (accessToken, studentId) => {
  API.defaults.headers.common.Authorization = accessToken

  const reqUri = `/students/${studentId}`
  return API.get(reqUri)
    .then(function (response) {
      return response.data.student
    })
    .catch(function (error) {
      return error
    })
}
