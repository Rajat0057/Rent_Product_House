import axios from "axios";

// Signup api to send new user data to backend
export const signup = (data) => {
  return new Promise((resolve, reject) => {
    backendApi
      .post("api/user/signup/", data)
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
