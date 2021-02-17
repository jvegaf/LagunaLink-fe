import API from '../API'

export const GetCompanyProfile = (accessToken, companyId) => {
  API.defaults.headers.common.Authorization = accessToken

  const reqUri = `/companies/${companyId}`
  return API.get(reqUri)
    .then(function (response) {
      return response.data.company
    })
    .catch(function (error) {
      return error
    })
}
