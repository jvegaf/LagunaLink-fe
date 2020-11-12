import API from "../API";


export const SignUp = ({ email, password, role }) => {
  return API.post('/auth/signup', {
    email: email,
    password: password,
    role: role
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
