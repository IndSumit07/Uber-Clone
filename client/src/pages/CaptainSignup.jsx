import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthNavbar from "../components/AuthNavbar";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const { setCaptain, backendUrl } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      vehicleType: "",
      color: "",
      capacity: "",
      plate: "",
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "firstname" || e.target.name === "lastname") {
      setForm((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [e.target.name]: e.target.value,
        },
      }));
    } else if (
      e.target.name === "vehicleType" ||
      e.target.name === "color" ||
      e.target.name === "capacity" ||
      e.target.name === "plate"
    ) {
      setForm((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + "/api/captain/register",
        form
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
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
      vehicle: {
        vehicleType: "",
        color: "",
        capacity: "",
        plate: "",
      },
    });
  };
  return (
    <div className="w-full min-h-[100dvh] h-auto">
      <AuthNavbar />
      <div className="w-full py-8 flex flex-col px-5">
        <form onSubmit={handleSubmit} className="w-full justify-center">
          <p className="mb-3 ml-1 font-semibold text-xl">What's your name ?</p>

          <div className="flex gap-2 justify-between items-center">
            <input
              onChange={handleChange}
              name="firstname"
              type="text"
              placeholder="First Name"
              value={form.fullname.firstname}
              className="bg-[#F3F3F3] w-1/2 px-5 py-3 rounded-lg"
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
          <p className="mb-3 mt-8 ml-1 font-semibold text-xl">
            Veichle Information
          </p>
          <div className="flex gap-2 justify-between items-center">
            <select
              onChange={handleChange}
              name="vehicleType"
              className="bg-[#F3F3F3] w-1/2 px-5 py-3 rounded-lg"
              value={form.vehicle.vehicleType}
            >
              <option value="" disabled selected hidden>
                Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="motorcycle">MotorCycle</option>
              <option value="auto">Auto</option>
            </select>
            <input
              onChange={handleChange}
              name="plate"
              type="text"
              placeholder="Plate no."
              value={form.vehicle.plate}
              className="bg-[#F3F3F3] w-1/2 px-5 py-3 rounded-lg"
            />
          </div>
          <div className="flex gap-2 justify-between items-center mt-5">
            <input
              onChange={handleChange}
              name="color"
              type="text"
              placeholder="Color"
              value={form.vehicle.color}
              className="bg-[#F3F3F3] w-1/2 px-5 py-3 rounded-lg"
            />
            <input
              onChange={handleChange}
              name="capacity"
              type="number"
              placeholder="Capacity"
              value={form.vehicle.capacity}
              className="bg-[#F3F3F3] w-1/2 px-5 py-3 rounded-lg"
            />
          </div>
          <button className="mt-5 flex bg-green-500 w-full justify-center items-center py-3 rounded-xl text-xl font-semibold text-white hover:opacity-75 transition-all duration-150">
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
          to="/user-signup"
          className="mt-5 w-full flex justify-center items-center py-3 rounded-xl bg-black text-white text-lg font-semibold"
        >
          Sign Up as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
