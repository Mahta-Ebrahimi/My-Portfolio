import React, { useState } from 'react';
import myImage from '../assets/myImage.jpg';

const About = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      name="about"
      id="about"
      className="w-full bg-black text-gray-300 py-12 md:py-20 px-8 md:px-6"
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
        <div className="text-[#D1D5DB] text-[16px] sm:text-[18px] leading-[1.75] space-y-6 text-justify">

          {/* Drop cap first paragraph */}
          <p>
            <span className="drop-cap">M</span>
            ahta Ebrahimi is a UI/UX Designer, Front‑End Developer, and AI‑integrated workflow designer based in Copenhagen, Denmark.
             I work at the intersection of design, code, and intelligent automation — creating products that not only look right but work smart.
          </p>

          <p>
           AI is part of my daily workflow, helping me accelerate research, explore design directions, and write clean, reliable code.
            I also design the systems around AI: defining automation logic, shaping AI‑driven user journeys, and creating interfaces that make complex AI behavior feel simple and human‑centered
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            I studied front‑end development formally and hold three certified UI/UX design qualifications. This combination allows me to take a project from the first sketch to
            a fully shipped product — including research, UX, UI, design systems, automation logic, and production‑ready code.
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            You can explore some of my projects here. Each one follows the same principle:<br/> understand the user,
             design with intention, build cleanly, and let AI handle what it does best.
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
           I take projects from discovery to delivery: leading UX, applying design systems,
            designing the AI automation layer, and writing front‑end code. End‑to‑end ownership means faster results and fewer gaps between idea and product.
          </p>

        </div>

        {/* Read more / Show less — mobile only */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="sm:hidden mt-6 flex items-center gap-2 text-sm font-semibold text-[#00E5A0] hover:text-white transition-colors"
        >
          {expanded ? 'Show less ↑' : 'Read more ↓'}
        </button>

        {/* Clear float */}
        <div style={{ clear: 'both' }} />

        {/* Role line */}
        <p className="mt-8 text-[13px] font-semibold tracking-[0.2em] uppercase text-[#6B7280]">
          UI/UX Designer &nbsp;·&nbsp; Front-End Developer &nbsp;·&nbsp; AI Workflow Designer &nbsp;·&nbsp; Copenhagen
        </p>

      </div>
    </div>
  );
};

export default About;
