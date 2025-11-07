import React from 'react';

const About = () => {
  return (
    <div name="about" className="w-full min-h-screen bg-[#0a192f] text-gray-300 pb-16 sm:pb-0">
      <div className="flex flex-col justify-start items-center w-full min-h-screen pt-4 sm:pt-8 px-4 sm:px-6 md:px-8">
        
        {/* Section Title */}
        <div className="max-w-[1000px] w-full flex flex-col items-center">
          <p className="text-4xl font-bold inline border-b-4 border-[#FF9533] text-[#FF9533] mb-4">
            About
          </p>

          {/* Role Title — Centered under "About" */}
          <p className="text-2xl sm:text-3xl font-bold text-[#FF9533] text-center leading-snug">
            {/* Mobile: stacked lines */}
            <span className="block sm:hidden">Front-End Developer</span>
            <span className="block sm:hidden">UI/UX Designer</span>

            {/* Desktop: single line with divider */}
            <span className="hidden sm:inline-flex items-center justify-center gap-4">
              <span>Front-End Developer</span>
              <span className="w-8 h-0.5 bg-[#FF9533]"></span>
              <span>UI/UX Designer</span>
            </span>
          </p>
        </div>

        {/* Bio Section */}
        <div className="w-[90%] sm:w-3/5 md:w-3/5 max-w-[1000px] mt-6 mb-16 sm:mb-0 text-justify leading-relaxed text-base sm:text-lg md:text-xl px-2">
          <p>
            I'm a Front-End Developer and UI/UX Designer who loves creating apps that are easy to use
            and designed with real people in mind. Design has always been close to me — it’s how I see
            and shape the world around me.
            <br /><br />
            I studied Front-End Development at Roskilde Tekniske Skole and later took courses in UI/UX and graphic design 
            at ITucation Skole, which helped me build a strong connection between coding and design. These experiences gave me the confidence to work independently 
            and create user-centered solutions.
            <br /><br />
            I’m also currently taking a UI course at Redi School, which has been a fantastic opportunity to deepen my expertise. 
            Together, these programs have enabled me to build user-friendly applications that are easy to navigate and focused on real user needs.
            <br /><br />
            As a freelancer, I’ve worked on different projects and learned something new with each one.
            My background in calligraphy gives me a strong sense of shape, balance, and color — adding
            a creative touch to everything I design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
