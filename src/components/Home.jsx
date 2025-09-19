
import portfolioo from '../assets/portfolioo.png';
import React, { useState } from "react";

const Home = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      name="home"
      className="w-full h-screen flex items-center justify-end"
      style={{
        backgroundImage: `url(${portfolioo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="max-w-[1200px] px-8 flex flex-col justify-center items-center h-full w-full">
        {/* Intro */}
        <div className="flex flex-col items-start w-3/4">
        <p className="text-[#FF9533] mb-4 flex m-auto">Hi, my name is</p>
        <h1 className="text-sm sm:text-xl font-bold text-[#ccd6f6] mb-6 flex m-auto">
          Mahta (Maryam) Ebrahimi
        </h1>
        </div>

        {/* Two parts stacked on right */}
        <div className="flex flex-row gap-10">
          {/* Frontend Developer Section */}
          <div
            onMouseEnter={() => setHovered("frontend")}
            onMouseLeave={() => setHovered(null)}
             className={`group relative overflow-hidden shadow-md shadow-[#FF4F6F] cursor-pointer transition-all duration-100 ${
                  hovered === "frontend"
                    ? "w-[500px] h-[360px] rounded-xl"
                    : "w-80 h-80 md:w-80 md:h-80 rounded-full"
                }`}
                        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9533] to-[#ffcd80] opacity-40 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-snug">
                Front-end Developer
              </h2>
              <p className="text-[#0D1C30] text-sm md:text-lg">
                {hovered === "frontend"
                  ? "Front-End Developer with experience building responsive web applications using JavaScript, React. Skilled in creating reusable component libraries (Tailwind CSS, Material UI) and Optimizing  processes through CI/CD pipelines. Collaborated with teams in Agile/Scrum environments to build fast, accessible, and SEO-friendly interfaces from design mockups."
                  : ""}
              </p>
            </div>
          </div>

          {/* UI/UX Designer Section */}
          <div
  onMouseEnter={() => setHovered("uiux")}
  onMouseLeave={() => setHovered(null)}
  className={`group relative overflow-hidden shadow-md shadow-[#FF4F6F] cursor-pointer transition-all duration-100 ${
    hovered === "uiux"
      ? "w-[500px] h-[360px] rounded-xl"
      : "w-60 h-60 md:w-80 md:h-80 rounded-full"
  }`}
>
            <div className="absolute inset-0 bg-gradient-to-r from-[#009DAE] to-[#00d4ff] opacity-40 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-normal">
                UI/UX Designer
              </h2>
              <p className="text-navy text-sm md:text-lg">
                {hovered === "uiux"
                  ? "UI/UX Designer focused on creating functional, accessible, and well-structured user experiences. I apply UX methods and modern design tools to improve usability and support SEO. My work is guided by user testing to ensure every design meets real needs and delivers a consistent user journey."
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
