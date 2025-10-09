import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fares, setFares] = useState(null);
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
      toast.error("Session Expired! Login Again");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateFares = async (pickup, destination) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/rides/fares`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Correct path based on your backend
      const calculatedFares = response.data?.fares;

      if (calculatedFares) {
        setFares(calculatedFares);
        toast.success("Fares calculated successfully ✅");
        return calculatedFares;
      } else {
        toast.error("No fares found in response");
        setFares(null);
      }
    } catch (error) {
      console.error("Fare calculation error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to calculate fares"
      );
      setFares(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createTrip = async (pickup, destination, vehicleType) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        toast.success("Ride created successfully!");
        return response.data;
      }
    } catch (error) {
      console.error("Ride creation error:", error);
      toast.error(error?.response?.data?.message || "Failed to create ride");
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
        value={{
          user,
          setUser,
          backendUrl,
          userLogout,
          isLoading,
          fares,
          calculateFares,
          createTrip,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
