import API from "../API";


export const SignIn = ({ email, password }) => {
  return API.post('/auth/signin', {
    email: email,
    password: password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
