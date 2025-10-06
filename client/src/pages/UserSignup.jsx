import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthNavbar from "../components/AuthNavbar";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
const UserSignup = () => {
  const navigate = useNavigate();
  const { setUser, backendUrl } = useContext(UserDataContext);
  const [form, setForm] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "firstname" || e.target.name === "lastname") {
      setForm((prevForm) => ({
        ...prevForm,
        fullname: {
          ...prevForm.fullname,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + "/api/user/register",
        form
      );

      if (response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        clearForm();
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
          <p className="mb-3 ml-1 font-semibold text-xl">What's your name ?</p>

          <div className="flex gap-2 justify-between items-center">
            <input
              onChange={handleChange}
              name="firstname"
              type="text"
              placeholder="First Name"
              className="bg-[#F3F3F3] w-1/2 px-5 py-3 rounded-lg"
              value={form.fullname.firstname}
            />
            <input
              onChange={handleChange}
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={form.fullname.lastname}
              className="bg-[#F3F3F3] w-1/2 px-5 py-3 rounded-lg"
            />
          </div>
          <p className="mb-3 mt-8 ml-1 font-semibold text-xl">
            Enter your email
          </p>

          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            className="bg-[#F3F3F3] w-full px-5 py-3 rounded-lg"
          />
          <p className="mb-3 mt-8 ml-1 font-semibold text-xl">
            Enter your password
          </p>

          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            className="bg-[#F3F3F3] w-full px-5 py-3 rounded-lg"
          />
          <button className="mt-5 flex bg-black w-full justify-center items-center py-3 rounded-xl text-xl font-semibold text-white hover:opacity-75 transition-all duration-150">
            Sign Up
          </button>
          <p className="mt-2 ml-1 font-semibold">
            Already have an account ?{" "}
            <Link to="/user-login" className="text-blue-600">
              Login now
            </Link>
          </p>
        </form>
        <Link
          to="/captain-signup"
          className="mt-5 w-full flex justify-center items-center py-3 rounded-xl bg-green-500 text-white text-lg font-semibold"
        >
          Sign Up as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
