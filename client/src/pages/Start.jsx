import React from "react";
import HomePageBg from "../../public/HomePageBg.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const Start = () => {
  return (
    <div className="w-full h-[100dvh] flex flex-col justify-start items-center relative">
      <div className="absolute font-orbitron text-4xl top-5 left-5 font-bold">
        Uber
      </div>
      <div
        style={{ backgroundImage: `url(${HomePageBg})` }}
        className="flex w-full h-[75%] justify-center items-center bg-cover bg-center"
      ></div>
      <div className="w-full h-[25%] z-50 flex flex-col gap-5 justify-center items-center bg-[black] text-white px-10">
        <h3 className="text-start text-xl font-semibold">
          Get Started With Uber
        </h3>
        <Link
          to="/user-login"
          className="w-full flex justify-center items-center text-black gap-1 text-center py-3 bg-[#E0E0E0] rounded-xl text-xl font-bold"
        >
          <p>Continue</p> <ArrowRight strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
};

export default Start;
