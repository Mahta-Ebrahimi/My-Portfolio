import React, { useState } from 'react';
import myImage from '../assets/myImage.jpg';
import { tr } from '../context/LanguageContext';

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
            {tr(
              'ahta Ebrahimi is a Product Designer based in Copenhagen, Denmark, focused on creating intuitive, meaningful, and visually refined digital products.',
              'ahta Ebrahimi er produktdesigner med base i København og skaber intuitive, meningsfulde og visuelt gennemarbejdede digitale produkter.'
            )}
          </p>

          <p>
            {tr(
              'I specialize in end-to-end product design, from understanding user needs and solving problems to crafting seamless experiences, high-fidelity interfaces, and scalable design systems.',
              'Jeg er specialiseret i end-to-end-produktdesign – fra at forstå brugernes behov og løse problemer til at skabe sømløse oplevelser, high-fidelity interfaces og skalerbare designsystemer.'
            )}
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            {tr(
              "As a calligraphy artist, I've developed a strong eye for aesthetics, typography, composition, and visual balance — bringing an artistic perspective and attention to detail to my design work.",
              'Som kalligrafikunstner har jeg udviklet et skarpt øje for æstetik, typografi, komposition og visuel balance – og jeg bringer et kunstnerisk perspektiv og sans for detaljen ind i mit designarbejde.'
            )}
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            {tr(
              'With a background in Front-End Development and three UI/UX design certifications, I combine creative thinking with technical understanding.',
              'Med en baggrund i frontend-udvikling og tre UI/UX-designcertificeringer kombinerer jeg kreativ tænkning med teknisk forståelse.'
            )}
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            {tr(
              'I also integrate AI-powered tools into my workflow to explore ideas, streamline processes, and create smarter, human-centered experiences.',
              'Jeg integrerer også AI-drevne værktøjer i min arbejdsgang for at udforske idéer, effektivisere processer og skabe smartere, menneskecentrerede oplevelser.'
            )}
          </p>

          <p className={`${expanded ? 'block' : 'hidden'} sm:block`}>
            {tr(
              'My goal is to design products that solve real problems, balance user needs with business goals, and feel as good as they look.',
              'Mit mål er at designe produkter, der løser reelle problemer, balancerer brugernes behov med forretningens mål – og føles lige så godt, som de ser ud.'
            )}
          </p>

        </div>

        {/* Read more / Show less — mobile only */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="sm:hidden mt-6 flex items-center gap-2 text-sm font-semibold text-[#00E5A0] hover:text-white transition-colors"
        >
          {expanded ? tr('Show less ↑', 'Vis mindre ↑') : tr('Read more ↓', 'Læs mere ↓')}
        </button>

        {/* Clear float */}
        <div style={{ clear: 'both' }} />

        {/* Role line */}
        <p className="mt-8 text-[13px] font-semibold tracking-[0.2em] uppercase text-[#6B7280]">
          {tr('UI/UX Designer', 'UI/UX-designer')} &nbsp;·&nbsp; {tr('Front-End Developer', 'Frontend-udvikler')} &nbsp;·&nbsp; {tr('AI Workflow Designer', 'AI-workflowdesigner')} &nbsp;·&nbsp; {tr('Copenhagen', 'København')}
        </p>

      </div>
    </div>
  );
};

export default About;
