import API from "../API";


export const Register = ({
  accessToken,
  student
}) => {
  
  API.defaults.headers.common['Authorization'] = accessToken;
  
  return API.post('/students', {student})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}