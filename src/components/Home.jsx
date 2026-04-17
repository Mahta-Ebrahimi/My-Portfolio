import React, { useEffect, useState } from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const images = [img1, img2, img3];

const Home = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setBgImageIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true);
      }, 1000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[bgImageIndex];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0a192f] px-4 sm:px-8">
      {/* Hero Name — doubled size on mobile */}
      <div className="w-full text-center">
        {/* Mobile: extra large */}
        <div className="sm:hidden">
          <h1
            className={`font-extrabold leading-none animated-text ${fadeIn ? "fade-in" : "fade-out"} text-[20vw]`}
            style={{
              letterSpacing: "-0.08em",
              backgroundImage: `url(${currentImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              borderRadius: "5px",
            }}
          >
            mahta
          </h1>
        </div>

        {/* Tablet & Desktop: original size */}
        <h1
          className={`hidden sm:block font-extrabold leading-none animated-text ${fadeIn ? "fade-in" : "fade-out"}`}
          style={{
            fontSize: "clamp(4rem, 20vw, 384px)",
            letterSpacing: "-0.08em",
            backgroundImage: `url(${currentImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            borderRadius: "5px",
          }}
        >
          Mahta
        </h1>
      </div>

      {/* Role Line */}
      <p className="mt-2 text-base sm:text-lg font-medium text-gray-300 text-center tracking-wide">
        Mahta Ebrahimi
      </p>
      <p className="mt-2 text-base sm:text-lg font-medium text-gray-300 text-center tracking-wide">
        Front-end Developer &  UI/UX Designer 
      </p>

      {/* Tagline */}
      <p className="mt-2 text-lg sm:text-xl font-semibold text-[#FF9533] text-center italic tracking-tight">
        Design with precision. Code with intention.
      </p>

      {/* Styles */}
      <style>
        {`
          .animated-text {
            animation: floatTexture 20s ease-in-out infinite;
            transition: opacity 1s ease-in-out;
          }

          .fade-in {
            opacity: 1;
          }

          .fade-out {
            opacity: 0.4;
          }

          @keyframes floatTexture {
            0% {
              background-position: center 0%;
            }
            50% {
              background-position: center 30%;
            }
            100% {
              background-position: center 0%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
