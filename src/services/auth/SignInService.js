import api from '../API'

export async function SignInService ({ email, password }) {
  return api.post('/auth/signin', {
    email: email,
    password: password
  })
    .then(function (response) {
      return {
        status: response.status,
        user_id: response.data.user_id,
        user_role: response.data.user_role,
        token: response.data.access_token
      }
    })
    .catch(function (e) {
      throw e
    })
}
