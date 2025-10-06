import axios from "axios";
import React, { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(backendUrl + "/api/captain/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        Navigate("/user-login");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <CaptainDataContext.Provider
        value={{
          captain,
          setCaptain,
          backendUrl,
          logout,
        }}
      >
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
