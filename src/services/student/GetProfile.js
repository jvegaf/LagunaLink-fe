import api from '../API'

export const GetStudentProfile = (accessToken, studentId) => {
  api.defaults.headers.common.Authorization = accessToken

  const reqUri = `/students/${studentId}`
  return api.get(reqUri)
    .then(function (response) {
      return response.data.student
    })
    .catch(function (error) {
      return error
    })
}
