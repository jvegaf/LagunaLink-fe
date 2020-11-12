import API from "../API";


export const Register = ({accessToken, company}) => {
  
  API.defaults.headers.common['Authorization'] = accessToken;
  
  return API.post('/companies', {company})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}