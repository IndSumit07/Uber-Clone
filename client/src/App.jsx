import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import { ToastContainer } from "react-toastify";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserProtectedWrapper from "./utils/UserProtectedWrapper";
import UserPublicWrapper from "./utils/UserPublicWrapper";
import CaptainPublicWrapper from "./utils/CaptainPublicWrapper";
import CaptainProtectedWrapper from "./utils/CaptainProtectedWrapper";
import ChooseRide from "./pages/ChooseRide";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/user-login"
          element={
            <UserPublicWrapper>
              <ChooseRide />
            </UserPublicWrapper>
          }
        />
        <Route
          path="/user-signup"
          element={
            <UserPublicWrapper>
              <UserSignup />
            </UserPublicWrapper>
          }
        />
        <Route
          path="/captain-login"
          element={
            <CaptainPublicWrapper>
              <CaptainLogin />
            </CaptainPublicWrapper>
          }
        />
        <Route
          path="/captain-signup"
          element={
            <CaptainPublicWrapper>
              <CaptainSignup />
            </CaptainPublicWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/choose-ride"
          element={
            <UserProtectedWrapper>
              <ChooseRide />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <Home />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
