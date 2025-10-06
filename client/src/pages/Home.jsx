import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Home = () => {
  const { logout, user } = useContext(UserDataContext);

  const handleLogout = async () => {
    logout();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>{user ? user : "Not Found"}</div>
    </div>
  );
};

export default Home;
