import React, { useContext, useRef, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Wallet, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ChooseRide = () => {
  const { user, isLoading } = useContext(UserDataContext);

  const panelRef1 = useRef();
  const panelRef2 = useRef();
  const panelRef3 = useRef();

  const [ride, setRide] = useState(null);
  const [chooseRide, setChooseRide] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);

  // Animate Main Ride Panel
  useGSAP(() => {
    if (panelRef1.current) {
      gsap.to(panelRef1.current, {
        y: chooseRide || lookingForDriver ? "100%" : "0%",
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [chooseRide, lookingForDriver]);

  // Animate Confirm Ride Panel
  useGSAP(() => {
    if (panelRef2.current) {
      gsap.to(panelRef2.current, {
        y: chooseRide ? "0%" : "100%",
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [chooseRide]);

  // Animate Looking For Driver Panel
  useGSAP(() => {
    if (panelRef3.current) {
      gsap.to(panelRef3.current, {
        y: lookingForDriver ? "0%" : "100%",
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [lookingForDriver]);

  // Animate Main Panel Entry Once
  useGSAP(() => {
    gsap.fromTo(
      panelRef1.current,
      { y: "100%" },
      { y: "0%", duration: 1, ease: "power3.out" }
    );
  }, []);

  const rides = [
    {
      name: "Uber Premier",
      price: "198.86",
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/ukcomfort.png",
    },
    {
      name: "Uber Auto",
      price: "98.50",
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png",
    },
    {
      name: "Uber Bike",
      price: "50.24",
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png",
    },
  ];

  return (
    <div className="font-grot w-full h-[100dvh] overflow-hidden relative">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Loading...
        </div>
      )}

      {!isLoading && (
        <>
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/15/26/e1/1526e1add1ecb1dfc6186efd1dc47f5d.jpg')",
            }}
          ></div>

          {/* Logo */}
          <div className="absolute top-5 left-5 z-10">
            <Link to="/" className="text-black text-4xl font-orbitron">
              Uber
            </Link>
          </div>

          {/* Main Ride Selection Panel */}
          <div
            ref={panelRef1}
            className="absolute bottom-0 left-0 w-full bg-white px-5 pt-5 pb-0 rounded-t-2xl shadow-lg z-20 flex flex-col"
            style={{ height: "40vh" }}
          >
            <Link
              to="/home"
              state={{ panelClosed: true }}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <X strokeWidth={3} />
            </Link>

            <h3 className="text-xl font-bold">Choose a ride</h3>

            <div className="mt-5 space-y-3 py-3 overflow-y-auto h-full scrollbar-hide">
              {rides.map((rideOption, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setRide(i);
                    setChooseRide(true);
                  }}
                  className="w-full h-[85px] flex gap-5 px-5 py-2 rounded-xl items-center border-2 hover:border-black transition-all cursor-pointer"
                >
                  <img
                    className="w-20 object-contain"
                    src={rideOption.img}
                    alt={rideOption.name}
                  />

                  <div className="flex flex-col justify-center flex-1">
                    <h2 className="text-lg font-bold">{rideOption.name}</h2>
                    <p className="text-sm text-gray-600">2 mins away</p>
                  </div>

                  <div className="font-bold text-base">
                    &#8377;{rideOption.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Ride Panel */}
          {ride !== null && (
            <div
              ref={panelRef2}
              className="absolute bottom-0 left-0 w-full bg-white pt-3 overflow-y-auto rounded-t-2xl shadow-lg z-30 flex flex-col pb-5"
              style={{ height: "50vh", transform: "translateY(100%)" }}
            >
              <div
                onClick={() => {
                  setChooseRide(false);
                }}
                className="absolute top-5 right-5 cursor-pointer"
              >
                <X strokeWidth={3} />
              </div>

              <h3 className="px-5 py-5 text-xl font-bold">Confirm your ride</h3>

              <div className="flex flex-col items-center justify-center gap-3 h-full">
                <img
                  src={rides[ride].img}
                  alt={rides[ride].name}
                  className="w-28 scale-150 object-contain"
                />
              </div>

              <div className="w-full h-[0.5px] bg-black/50"></div>

              <div className="mt-5 pl-5 w-full">
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 w-1 h-1 rounded-full border-4 border-black"></div>
                  <div className="w-full">
                    <h3 className="font-bold text-lg">562/11-A</h3>
                    <p className="text-black/75">Basti, Uttar Pradesh</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pl-5 w-full">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-4 h-4 p-2 border-[3.5px] border-black"></div>
                  <div className="w-full">
                    <h3 className="font-bold text-lg">Third Wave Coffee</h3>
                    <p className="text-black/75 pr-5">
                      17th Cross Rd, PWS Quarters, 1st Sector, HSR Layout
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="mt-5 pl-5 w-full">
                <div className="flex items-center gap-3 w-full">
                  <Wallet strokeWidth={3} size={28} />
                  <div className="w-full">
                    <h3 className="font-bold text-lg">&#8377; 199.30</h3>
                    <p className="text-black/75">Cash</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center mt-5">
                <button
                  onClick={() => {
                    setLookingForDriver(true);
                    setChooseRide(false);
                  }}
                  className="bg-black px-6 py-3 rounded-full text-white hover:bg-gray-800 transition-all"
                >
                  Confirm Ride
                </button>
              </div>
            </div>
          )}

          {/* Looking For Driver Panel */}
          {lookingForDriver && (
            <div
              ref={panelRef3}
              className="absolute bottom-0 left-0 w-full bg-white pt-3 overflow-y-auto rounded-t-2xl shadow-lg z-40 flex flex-col pb-5"
              style={{ height: "50vh", transform: "translateY(100%)" }}
            >
              <div
                onClick={() => {
                  setLookingForDriver(false);
                  setChooseRide(true);
                }}
                className="absolute top-5 right-5 cursor-pointer"
              >
                <X strokeWidth={3} />
              </div>

              <h3 className="px-5 py-5 text-xl font-bold">
                Looking for driver...
              </h3>

              <div className="flex flex-col items-center justify-center gap-3 h-full">
                <img
                  src={rides[ride].img}
                  alt={rides[ride].name}
                  className="w-28 scale-150 object-contain"
                />
              </div>
              <p className="text-center pb-5 text-black/70">
                Searching nearby drivers...
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChooseRide;
