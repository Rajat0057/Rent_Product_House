import axios from "axios";
import { getSessionStorage } from "./common";

let orderObject = getSessionStorage("order_object");

export const summary = () => {
  return new Promise((resolve, reject) => {
    backendApi
      .get("api/product/inventory_summary/")
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
