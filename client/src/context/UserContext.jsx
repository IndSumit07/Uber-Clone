import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const userLogout = async () => {
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

  const getUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div>
      <UserDataContext.Provider
        value={{ user, setUser, backendUrl, userLogout, isLoading }}
      >
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
