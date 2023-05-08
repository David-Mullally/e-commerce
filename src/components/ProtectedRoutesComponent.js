import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";
import LogInPage from "../pages/LogInPage";

import axios from "axios";
import React, { useState, useEffect } from "react";

const ProtectedRoutesComponent = ({ admin }) => {
const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token)
        console.log(isAuth)
      }
      return isAuth;
    });
  }, [isAuth])

  if (isAuth === undefined) return <LogInPage />;

  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  ) : (
    <Navigate to="/admin/orders" />
  );
};

export default ProtectedRoutesComponent;
