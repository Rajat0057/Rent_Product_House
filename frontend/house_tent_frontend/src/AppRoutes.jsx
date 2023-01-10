import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Product from "./components/Product/Product/Product";
import RentProductPage from "./components/Product/RentProductPage/RentProductPage";
import Thanks from "./components/Thanks/Thanks";
import Profile from "./components/Product/Profile/Profile";
import Inventory from "./components/Product/Inventory/Inventory";
import Transaction from "./components/Transaction/Transaction";
import OutProduct from "./components/Product/OutProduct/OutProduct";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/signup" element={<Signup />}/>
      <Route
        path="/dashboard" element={< Product/>}/>
        <Route
        path="/rent" element={< RentProductPage/>}/>
        <Route
        path="/thanks" element={< Thanks/>}/>
         <Route
        path="/profile" element={< Profile/>}/>
        <Route
        path="/summary" element={< Inventory/>}/>
        <Route
        path="/transaction" element={< Transaction/>}/>
        <Route
        path="/out" element={< OutProduct/>}/>
      </Routes>
  );
};

export default AppRoutes;