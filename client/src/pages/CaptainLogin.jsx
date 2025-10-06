import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthNavbar from "../components/AuthNavbar";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const { setCaptain, backendUrl } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastname") {
      setForm((prevForm) => ({
        ...prevForm,
        fullname: {
          ...prevForm.fullname,
          [name]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + "/api/captain/login",
        form
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        clearForm();
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };

  const clearForm = () => {
    setForm({
      fullname: {
        firstname: "",
        lastname: "",
      },
      email: "",
      password: "",
    });
  };
  return (
    <div className="w-full h-[100dvh]">
      <AuthNavbar />
      <div className="w-full h-[calc(100dvh-85px)] py-8 flex flex-col px-5">
        <form onSubmit={handleSubmit} className="w-full justify-center">
          <p className="mb-3 ml-1 font-semibold text-xl">Enter your email</p>

          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            className="bg-[#F3F3F3] w-full px-5 py-3 rounded-lg"
          />
          <p className="mb-3 ml-1 mt-8 font-semibold text-xl">
            Enter your password
          </p>

          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            className="bg-[#F3F3F3] w-full px-5 py-3 rounded-lg"
          />
          <button className="mt-5 flex bg-green-500 w-full justify-center items-center py-3 rounded-xl text-xl font-semibold text-white hover:opacity-75 transition-all duration-150">
            Login
          </button>
          <p className="mt-2 ml-1 font-semibold">
            Already have an account ?{" "}
            <Link to="/user-login" className="text-blue-600">
              Login now
            </Link>
          </p>
        </form>
        <Link
          to="/user-login"
          className="mt-5 w-full flex justify-center items-center py-3 rounded-xl bg-black text-white text-lg font-semibold"
        >
          Login as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
