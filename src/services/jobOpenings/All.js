import API from "../API";


export const All = ({accessToken}) => {
  
  API.defaults.headers.common['Authorization'] = accessToken;
  
  return API.get('/job_openings')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}