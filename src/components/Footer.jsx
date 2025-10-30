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
    <footer className="w-full bg-[#565F69] text-[#0a192f] py-12 px-6">
  <p className="text-[#FF9533] font-semibold text-2xl text-center mb-8">Contact</p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center text-base sm:text-lg">
    <a href='https://www.linkedin.com/in/maryam-mahta-ebrahimi-b3a7bb87/' target='_blank' className='flex items-center gap-2 hover:text-[#009dae]'>
      <FaLinkedin size={24} /> LinkedIn
    </a>

    <a href='https://github.com/Mahta-Ebrahimi' target='_blank' className='flex items-center gap-2 hover:text-[#FF9533]'>
      <FaGithub size={24} /> GitHub
    </a>

    <a href='mailto:mahta.ir@gmail.com' target='_blank' className='flex items-center gap-2 hover:text-[#FF4f6f]'>
      <HiOutlineMail size={24} /> Email
    </a>

    <a href={cv} target='_blank' className='flex items-center gap-2 hover:text-[#FAC813]'>
      <BsFillPersonLinesFill size={24} /> Resume
    </a>

    <a href='https://wa.me/4542796567' target='_blank' className='flex items-center gap-2 hover:text-[#25D366]'>
      <FaWhatsapp size={24} /> WhatsApp
    </a>

    <a href='https://www.instagram.com/mahta.creative/' target='_blank' className='flex items-center gap-2 hover:text-[#c13584]'>
      <FaInstagram size={24} /> Instagram
    </a>
  </div>
</footer>

  );
};

export default Footer;
