import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ ...rest }) => {
  let navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) return <Route {...rest} />;
  delete rest.component;
  return <Route {...rest} render={(props) => navigate("/")} />;
};

export default PrivateRoute;
