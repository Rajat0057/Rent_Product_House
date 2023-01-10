import axios from "axios";
import { transaction } from "./transaction";
import { getSessionStorage } from "./common";
let orderObject = getSessionStorage("order_object");

export const product = () => {
  return new Promise((resolve, reject) => {
    backendApi
      .get("api/product/get_product/")
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const rentproduct = (data) => {
  return new Promise((resolve, reject) => {
    console.log("rent data is ", data);
    backendApi
      .post("api/product/rent_product/", data)
      .then((res) => {
        resolve(res);
        transaction(data);
        console.log(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const outproduct = (data) => {
  return new Promise((resolve, reject) => {
    console.log("out data is ", data);
    backendApi
      .post("api/product/out_product/", data)
      .then((res) => {
        resolve(res);
        transaction(data);
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
