import React from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { fetchAuth } from "./api";


function AuthRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin")
    return (
      isLogin ? (
        children
      ) : (
        <Navigate to="/login" />
      )
    );
}
  export default AuthRoute;

