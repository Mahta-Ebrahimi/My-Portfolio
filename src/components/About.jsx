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
            ahta Ebrahimi is a Product Designer based in Copenhagen, Denmark, focused on
            creating intuitive, meaningful, and visually refined digital products.
          </p>

          <p>
            I specialize in end-to-end product design, from understanding user needs and
            solving problems to crafting seamless experiences, high-fidelity interfaces, and scalable design systems.
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            As a calligraphy artist, I've developed a strong eye for aesthetics, typography,
            composition, and visual balance — bringing an artistic perspective and attention to detail to my design work.
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            With a background in Front-End Development and three UI/UX design certifications, I combine
            creative thinking with technical understanding.
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            I also integrate AI-powered tools into my workflow to explore ideas, streamline
            processes, and create smarter, human-centered experiences.
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            My goal is to design products that solve real problems, balance user needs with business
            goals, and feel as good as they look.
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
