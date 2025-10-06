import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(backendUrl + "/api/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/user-login");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser, backendUrl, logout }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
