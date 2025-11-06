import React, { useEffect, useState } from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const images = [img1, img2, img3];

const Home = () => {
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prev) => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0a192f] px-4 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-center gap-4 w-full">
        <h1
          className="text-center font-extrabold uppercase leading-none w-full"
          style={{
            fontSize: "clamp(3rem, 16vw, 192px)",
            backgroundImage: `url(${bgImage})`,
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

        {/* Floating Dot with fade */}
        <span className="floating-dot"></span>
      </div>

      {/* Dot Animation Style */}
      <style>
        {`
          .floating-dot {
            width: 24px;
            height: 24px;
            background-color: #FF9533;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            top: 0.2em;
            animation: floatFade 5s ease-in-out infinite;
          }

          @keyframes floatFade {
            0% {
              transform: translateY(0);
              opacity: 0.4;
            }
            50% {
              transform: translateY(-10px);
              opacity: 1;
            }
            100% {
              transform: translateY(0);
              opacity: 0.4;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
