import React, { useEffect, useState } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../../functions/LoadingToRedirect.js";
import { currentAdmin } from "../../functions/axios.js";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        });
    }
  }, [user]);

  return ok ? children : <LoadingToRedirect />;
};
//   return ok ? children : <Navigate to="/login" replace />;

export default AdminRoute;
