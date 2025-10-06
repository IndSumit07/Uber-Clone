import React from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <div className="w-full h-[85px] bg-black flex justify-start items-center px-5">
      <Link to="/" className="text-white text-4xl font-orbitron">
        Uber
      </Link>
    </div>
  );
};

export default AuthNavbar;
