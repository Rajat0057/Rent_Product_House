import axios from "axios";
import { getSessionStorage } from "./common";
let orderObject = getSessionStorage("order_object");

export const transaction = (data) => {
  return new Promise((resolve, reject) => {
    console.log("false data is ", data);
    backendApi
      .post("api/transaction/store_product/", data)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const get_details = () => {
  return new Promise((resolve, reject) => {
    backendApi
      .get("api/transaction/transaction_details/")
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
    Authorization: "Bearer " + orderObject?.access_token,
  },
});
