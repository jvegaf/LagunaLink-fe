import api from "../API";


export const SignUpService = ({ email, password, role }) => {
  console.log(api.prototype);
  return api.post('/auth/signup', {
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
