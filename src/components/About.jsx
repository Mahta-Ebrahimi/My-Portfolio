import React from 'react';
import myImage from '../assets/myImage.jpg'; // <-- replace with your actual image path

const About = () => {
  return (
    <div
      name="about"
      className="w-full min-h-screen bg-[#0a192f] text-gray-300 pb-16 sm:pb-16"
    >
      <div className="flex flex-col justify-start items-center w-full min-h-screen pt-4 sm:pt-8 px-8 sm:px-6 md:px-8">
         <div className="flex justify-center">
            <img
              src={myImage}
              alt="Profile"
              className="rounded-lg shadow-lg w-2/3 sm:w-1/2 md:w-1/3 object-cover"
            />
          </div>
        {/* Section Title */}
        <div className="max-w-[1000px] w-full flex flex-col items-center">
          {/* <p className="text-4xl font-bold inline border-b-4 border-[#FF9533] text-[#FF9533] mb-4">
            About
          </p> */}

          {/* Role Title */}
          <p className="text-2xl sm:text-3xl font-bold text-[#FF9533] text-center leading-snug pt-8">
            <span className="block sm:hidden">Front-End Developer</span>
            <span className="block sm:hidden">UI/UX Designer</span>
            <span className="hidden sm:inline-flex items-center justify-center gap-4">
              <span>Front-End Developer</span>
              <span className="w-8 h-0.5 bg-[#FF9533]"></span>
              <span>UI/UX Designer</span>
            </span>
          </p>
        </div>

        {/* Image on Top + Text Underneath */}
        <div className="max-w-[800px] w-full flex flex-col items-center mt-8 gap-6">
          
          {/* Top: Image */}
         

          {/* Under: Bio */}
          <div className="text-justify leading-relaxed text-base sm:text-lg md:text-xl px-2 space-y-6">
            <p>
    I’m a Front‑End Developer and UI/UX Designer who loves making apps easy, clear, and enjoyable for people.
  </p>

  <p>
    I also focus on DevSecOps, building security into my work from the start, using CI/CD practices, and writing safe code. This way, the apps I create are not just easy to use but also strong and reliable.
  </p>

  <p>
   Freelance work and calligraphy sharpened my eye for balance, color, and detail, adding a creative edge to every design.
  </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
