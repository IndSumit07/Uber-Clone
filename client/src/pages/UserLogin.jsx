import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthNavbar from "../components/AuthNavbar";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const { setUser, backendUrl } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/login", form);

      if (response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        clearForm();
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const clearForm = () => {
    setForm({
      email: "",
      password: "",
    });
  };
  return (
    <div className="w-full h-[100dvh]">
      <AuthNavbar />
      <div className="w-full h-[calc(100dvh-85px)] py-8 flex flex-col px-5">
        <form onSubmit={handleSubmit} className="w-full justify-center">
          <p className="mb-3 ml-1 font-semibold text-xl">What's your email ?</p>

          <input
            onChange={handleChange}
            value={form.email}
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-[#F3F3F3] w-full px-5 py-3 rounded-lg"
          />
          <p className="mb-3 mt-8 ml-1 font-semibold text-xl">
            Enter your password
          </p>

          <input
            onChange={handleChange}
            value={form.password}
            type="password"
            name="password"
            required
            placeholder="Password"
            className="bg-[#F3F3F3] w-full px-5 py-3 rounded-lg"
          />
          <button className="mt-8 flex bg-black w-full justify-center items-center py-3 rounded-xl text-xl font-semibold text-white hover:opacity-75 transition-all duration-150">
            Login
          </button>
          <p className="mt-2 ml-1 font-semibold">
            Don't have an account ?{" "}
            <Link to="/user-signup" className="text-blue-600">
              Register now
            </Link>
          </p>
        </form>
        <Link
          to="/captain-login"
          className="mt-5 w-full flex justify-center items-center py-3 rounded-xl bg-green-500 text-white text-lg font-semibold"
        >
          Login as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
