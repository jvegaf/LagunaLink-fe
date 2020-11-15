import api from "../API";


export const Register = ({
  accessToken,
  student
}) => {
  
  api.defaults.headers.common['Authorization'] = accessToken;
  
  return api.post('/students', {student})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}