import api from "../API";


export function SignInService({ email, password }) {
  
  return api.post('/auth/signin', {
    email: email,
    password: password
  })
  .then(function (response) {
    console.log(response);
    return {
      status: response.status,
      token: response.data.access_token
    };
  })
  .catch(function (error) {
    console.log(error);
  });
}
