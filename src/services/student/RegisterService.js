import api from "../API";

export function RegisterService ({ token, data }) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
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
