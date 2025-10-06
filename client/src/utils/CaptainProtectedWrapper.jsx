import axios from "axios";
import React from "react";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/captain-login" replace />;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
