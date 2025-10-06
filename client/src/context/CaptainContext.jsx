import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const navigate = useNavigate();
  const [captain, setCaptain] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const captainLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(backendUrl + "/api/captain/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/user-login");

        toast.success(response.data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <CaptainDataContext.Provider
        value={{
          captain,
          setCaptain,
          backendUrl,
          captainLogout,
        }}
      >
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
