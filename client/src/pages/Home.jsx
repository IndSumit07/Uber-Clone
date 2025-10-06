import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
const Home = () => {
  const { userLogout, user } = useContext(UserDataContext);
  const { captainLogout } = useContext(CaptainDataContext);

  const handleLogout1 = async () => {
    userLogout();
  };
  const handleLogout2 = async () => {
    captainLogout();
  };
  return (
    <div className="p-10 text-xl flex flex-col justify-center items-center gap-5">
      <button onClick={handleLogout1}>User Logout</button>
      <button onClick={handleLogout2}>Captain Logout</button>
      <div>{user && JSON.stringify(user)}</div>
    </div>
  );
};

export default Home;
