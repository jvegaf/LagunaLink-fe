import api from '../API'

export function SignUpService ({ email, password, role }) {
  return api
    .post('/auth/signup', {
      email: email,
      password: password,
      role: role
    })
    .then(function (response) {
      console.log(response)
      return response.status
    })
    .catch(function (error) {
      return error.response.status
    })
}
