import React from 'react';
import cv from '../assets/MahtaCv.pdf';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <div 
    name="footer"
    id="footer"
    className="w-full bg-black text-gray-100 py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-[640px] mx-auto text-center mb-14">
        <p className="text-[#FF9533] font-semibold text-[24px] leading-snug mb-4">Let's Work Together</p>
        <p className="text-[#9CA3AF] text-[16px] leading-[1.65] mb-2">
          I'm currently available for new projects and would love to hear what you're building.
          Whether it's a product redesign, a new digital experience, or a front-end build from scratch,
          reach out with as much detail as you can about the scope, timeline, and budget,
          and let's find out if we're a good fit.
        </p>
        <a
          href="mailto:mahta.ir@gmail.com"
          className="inline-block mt-6 px-8 py-3 text-[14px] font-semibold border border-[#FF9533] text-[#FF9533] hover:bg-[#FF9533] hover:text-black transition-colors tracking-wider"
        >
          Get In Touch
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center text-[14px] sm:text-[16px] mb-10">
        <a
          href="https://www.linkedin.com/in/mahta-ebrahimi-b3a7bb87/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#009dae]"
        >
          <FaLinkedin size={24} /> LinkedIn
        </a>

        <a
          href="https://github.com/Mahta-Ebrahimi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#FF9533]"
        >
          <FaGithub size={24} /> GitHub
        </a>

        <a
          href="mailto:mahta.ir@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#FF4f6f]"
        >
          <HiOutlineMail size={24} /> Email
        </a>

        <a
          href={cv}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#FAC813]"
        >
          <BsFillPersonLinesFill size={24} /> Resume
        </a>

        <a
          href="https://wa.me/4542796567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#25D366]"
        >
          <FaWhatsapp size={24} /> WhatsApp
        </a>

        <a
          href="https://www.instagram.com/mahta.creative/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#c13584]"
        >
          <FaInstagram size={24} /> Instagram
        </a>
      </div>

      <p className="text-center text-[13px] text-gray-500">
        © {new Date().getFullYear()} Mahta Ebrahimi. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
