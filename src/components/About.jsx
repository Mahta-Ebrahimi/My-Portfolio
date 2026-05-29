import React from 'react';
import myImage from '../assets/myImage.jpg';

const About = () => {
  return (
    <div
      name="about"
      id="about"
      className="w-full bg-black text-gray-300 py-12 md:py-20 px-6"
    >
      <div className="max-w-[860px] mx-auto">

        {/* Image — stacks on mobile, floats left on desktop */}
        <div className="about-image border border-[#2A2A2A]">
          <img
            src={myImage}
            alt="Mahta Ebrahimi"
            className="w-full block object-cover grayscale"
          />
        </div>

        {/* Bio text */}
        <div className="leading-relaxed text-[#9CA3AF] text-sm sm:text-base space-y-5 text-justify">

          {/* Drop cap first paragraph */}
          <p>
            <span className="drop-cap">M</span>
            ahta Ebrahimi is a UI/UX Designer, Front-End Developer, and
            AI-integrated workflow designer based in Copenhagen, Denmark.
            I sit at the intersection of design, code, and intelligent automation, 
            building products that don't just look right, they work smart.
          </p>

          <p>
            I actively use AI tools across every stage of my work, from
            accelerating research and generating design iterations to writing
            cleaner code faster. 
            {/* Beyond using AI, I design the workflows behind
            it: mapping automation logic, building AI-assisted user flows, and
            creating interfaces that make AI capabilities accessible and
            intuitive for real users. */}
          </p>

          <p>
            I studied front-end development formally and hold three certified
            UI/UX design qualifications. That combination lets me take a project
            from the first sketch to a shipped, working product entirely on my
            own, research, design, automation logic, and production code.
          </p>

          <p>
            You can explore some of my projects here. Each one follows the same principle:<br/> understand the user,
             design with intention, build cleanly, and let AI handle what it does best.
          </p>
{/* 
          <p>
            As a freelancer I take projects from early discovery to polished
            delivery, leading UX, writing production code, or designing the
            AI automation layer that connects them. That end-to-end range means
            faster delivery and fewer gaps between idea and product.
          </p> */}

        </div>

        {/* Clear float */}
        <div style={{ clear: 'both' }} />

        {/* Role line */}
        <p className="mt-8 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#444]">
          UI/UX Designer &nbsp;·&nbsp; Front-End Developer &nbsp;·&nbsp; AI Workflow Designer &nbsp;·&nbsp; Copenhagen
        </p>

      </div>
    </div>
  );
};

export default About;
