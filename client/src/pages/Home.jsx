import {
  ChevronDown,
  Clock,
  MapPin,
  ShoppingCart,
  Utensils,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const panelRef = useRef(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  useGSAP(() => {
    if (isActive) {
      gsap.fromTo(
        panelRef.current,
        { height: "40vh" },
        {
          height: "100dvh",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.fromTo(
        panelRef.current,
        { height: "100dvh" },
        {
          height: "40vh",
          duration: 0.5,
          ease: "power3.inOut",
        }
      );
    }
  }, [isActive]);

  const getIcon = (type) => {
    if (type === "location") {
      return <MapPin strokeWidth={2.5} />;
    } else if (type === "restaurant") {
      return <Utensils strokeWidth={2.5} />;
    } else if (type === "shopping") {
      return <ShoppingCart strokeWidth={2.5} />;
    }
  };

  const dummyData = [
    {
      name: "Brajesh Hair Salon",
      address: "Agra Road, Mallah Ka Nagla, Aligarh, Uttar Pradesh, India",
      type: "shopping",
    },
    {
      name: "Brajdhaam Guest House",
      address:
        "near Misra Electric company, Gandhi Nagar, Aligarh, Uttar Pradesh, India",
      type: "location",
    },
    {
      name: "Brajesh Kumar General Store",
      address:
        "Agra Road, Mabood Nagar, Civil Lines, Aligarh, Uttar Pradesh, India",
      type: "shopping",
    },
    {
      name: "Sunrise Restaurant",
      address: "Sector 5, Aligarh, Uttar Pradesh, India",
      type: "restaurant",
    },
    {
      name: "City Bookstore",
      address: "Main Street, Aligarh, Uttar Pradesh, India",
      type: "shopping",
    },
    {
      name: "Aligarh Central Park",
      address: "Link Road, Aligarh, Uttar Pradesh, India",
      type: "location",
    },
    {
      name: "Green Valley Cafe",
      address: "Hill View, Aligarh, Uttar Pradesh, India",
      type: "restaurant",
    },
    {
      name: "Royal Electronics",
      address: "Market Road, Aligarh, Uttar Pradesh, India",
      type: "shopping",
    },
    {
      name: "Lakshmi Temple",
      address: "Temple Street, Aligarh, Uttar Pradesh, India",
      type: "location",
    },
    {
      name: "Blue Lagoon Diner",
      address: "River Side, Aligarh, Uttar Pradesh, India",
      type: "restaurant",
    },
  ];

  return (
    <div className="w-full h-[100dvh] relative">
      {/* Logo */}
      <div className="absolute top-5 left-5 z-20">
        <Link to="/" className="text-black text-4xl font-orbitron">
          Uber
        </Link>
      </div>

      {/* Background */}
      <div
        className="w-full h-[100dvh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/15/26/e1/1526e1add1ecb1dfc6186efd1dc47f5d.jpg')",
        }}
      ></div>

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 w-full bg-white overflow-hidden px-5 py-5 rounded-t-2xl shadow-lg z-50 flex flex-col "
        style={{ height: "40vh" }}
      >
        {/* Close Button */}
        <div
          onClick={() => setIsActive(false)}
          className="absolute top-5 right-5 cursor-pointer z-10"
        >
          <X strokeWidth={3} />
        </div>

        {/* Header */}
        <h3 className="text-xl font-bold">Find a trip</h3>

        {/* Form */}
        <form className="w-full mt-5 flex flex-col gap-5 relative">
          <input
            value={pickup}
            onClick={() => setIsActive(true)}
            type="text"
            className="bg-[#F3F3F3] w-full px-5 pl-12 py-4 rounded-xl"
            placeholder="Add a pick-up location"
          />
          <div className="absolute top-5 left-5 flex flex-col gap-2 justify-center items-center">
            <div className="p-1 w-1 h-1 rounded-full border-4 border-black"></div>
            <div className="w-1 rounded-xl h-[43px] bg-black"></div>
            <div className="p-1 border-4 border-black"></div>
          </div>
          <input
            value={destination}
            onClick={() => setIsActive(true)}
            type="text"
            className="bg-[#F3F3F3] w-full px-5 pl-12 py-4 rounded-xl"
            placeholder="Enter your destination"
          />
          <div>
            <button className="flex justify-start bg-[#f3f3f3] items-center px-5 py-3 rounded-full gap-2">
              <Clock strokeWidth={3} />
              <span className="font-bold text-base">Leave Now</span>
              <ChevronDown />
            </button>
          </div>
        </form>

        {isActive && (
          <div className="mt-8 grid grid-cols-1 gap-5 overflow-y-auto flex-1">
            {dummyData.map((data, index) => (
              <div
                key={index}
                className="flex justify-start items-center gap-3 "
                onClick={() => {
                  setDestination(data.address);
                  setPickup("Your Location");
                }}
              >
                <div className="flex justify-center items-center bg-[#f3f3f3] p-3 rounded-full">
                  {getIcon(data.type)}
                </div>
                <div>
                  <h3 className="font-bold">{data.name}</h3>
                  <p className="text-xs text-black/75">{data.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
