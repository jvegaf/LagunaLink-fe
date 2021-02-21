import api from '../API'

export const GetCompanyProfile = (accessToken, companyId) => {
  api.defaults.headers.common.Authorization = accessToken

  const reqUri = `/companies/${companyId}`
  return api.get(reqUri)
    .then(function (response) {
      return response.data.company
    })
    .catch(function (error) {
      return error
    })
}
