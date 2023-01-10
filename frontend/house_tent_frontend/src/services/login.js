import axios from "axios";

// login api to send user data to backend
export const login = (data) => {
  return new Promise((resolve, reject) => {
    backendApi
      .post("api/user/login/", data)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const backendApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}`,
  headers: {
    "Content-type": "application/json",
  },
});
