import React, { useContext, useRef } from "react";
import { UserDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ChooseRide = () => {
  const { user, isLoading } = useContext(UserDataContext);
  const panelRef = useRef();

  // ✅ Animate panel slide-up
  useGSAP(() => {
    gsap.fromTo(
      panelRef.current,
      { y: "100%" },
      {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="font-grot w-full h-[100dvh] overflow-hidden relative">
      {/* Loading State */}
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

          {/* Bottom Panel */}
          <div
            ref={panelRef}
            className="absolute bottom-0 left-0 w-full bg-white px-5 pt-5 pb-0 rounded-t-2xl shadow-lg z-20 flex flex-col"
            style={{ height: "40vh" }}
          >
            {/* Close Button */}
            <Link
              to="/home"
              state={{ panelClosed: true }}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <X strokeWidth={3} />
            </Link>

            <h3 className="text-xl font-bold">Choose a ride</h3>

            {/* Ride Options */}
            <div className="mt-4 space-y-3 overflow-y-auto h-full ">
              {/* Ride Card */}
              {[
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
              ].map((ride, i) => (
                <div
                  key={i}
                  className="w-full h-[85px] flex gap-5 px-5 py-2 rounded-xl items-center border border-transparent hover:border-black transition-all cursor-pointer"
                >
                  {/* Image */}
                  <div className="w-[20%] flex justify-center items-center">
                    <img
                      className="w-20 object-contain"
                      src={ride.img}
                      alt={ride.name}
                    />
                  </div>

                  {/* Ride Info */}
                  <div className="w-[50%] flex flex-col justify-center">
                    <h2 className="text-lg font-bold leading-tight">
                      {ride.name}
                    </h2>
                    <p className="text-[14px] text-gray-700">2 mins away</p>
                    <p className="text-[13px] text-gray-500 mt-1">
                      Comfortable ride
                    </p>
                  </div>

                  {/* Price */}
                  <div className="w-[20%] flex justify-center items-center gap-1">
                    &#8377;
                    <span className="text-base font-bold">{ride.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseRide;
