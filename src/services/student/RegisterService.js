import api from "../API";

export function RegisterService ({ accessToken, data }) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return api
    .post("/students", data, config)
    .then(function (response) {
      console.log(response);
      return response.status;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.status;
    });
};
