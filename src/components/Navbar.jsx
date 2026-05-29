import React, { useState } from 'react';
import cv from '../assets/MahtaCv.pdf';
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaArrowLeft
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isProject = location.pathname.startsWith('/work/');
  const isFrontend = ['/work/glienke', '/work/soulimous'].includes(location.pathname);
  const projectLabel = isFrontend ? 'Frontend Project' : 'UI / UX Project';

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────────── */}
      <div className='fixed w-full h-[80px] flex justify-between items-center px-8 md:px-12 bg-black border-b border-[#1A1A1A] text-gray-300 z-50'>

        {/* LEFT */}
        {isProject ? (
          <a
            href="/#work"
            className='flex items-center gap-2 text-[#9CA3AF] hover:text-white text-sm font-semibold transition-colors'
          >
            <FaArrowLeft style={{ fontSize: '11px' }} />
            Back to Work
          </a>
        ) : (
          <div />
        )}

        {/* CENTER */}
        {isProject ? (
          <span className='hidden md:block text-[#4B5563] text-xs font-medium tracking-[0.2em] uppercase'>
            {projectLabel}
          </span>
        ) : (
          <ul className='hidden md:flex font-bold gap-6'>
            <li className='hover:text-[#FF9533] cursor-pointer'>
              <Link to='about' smooth={true} duration={500}>About</Link>
            </li>
            <li className='hover:text-[#00E5A0] cursor-pointer'>
              <Link to='skills' smooth={true} duration={500}>Skills</Link>
            </li>
            <li className='hover:text-[#FF9533] cursor-pointer'>
              <Link to='work' smooth={true} duration={500}>Work</Link>
            </li>
            <li className='hover:text-[#00E5A0] cursor-pointer'>
              <Link to='footer' smooth={true} duration={500}>Contact</Link>
            </li>
          </ul>
        )}

        {/* RIGHT */}
        <div className='flex items-center gap-4'>
          {isProject && (
            <a
              href="/#work"
              className='hidden md:block text-sm text-[#FF9533] hover:text-white font-semibold transition-colors'
            >
              All Work
            </a>
          )}
          <button
            onClick={() => setNav(!nav)}
            className='md:hidden z-50 hover:text-[#FF9533] text-3xl'
          >
            {!nav ? <FaBars /> : <FaTimes />}
          </button>
        </div>
      </div>

      {/* ── Mobile full-screen menu ───────────────────────────────── */}
      <ul className={`${!nav ? 'hidden' : 'fixed'} pb-8 top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center z-40`}>
        {isProject ? (
          <>
            <li className='py-4 text-2xl hover:text-[#FF9533]'>
              <a href="/#work" onClick={() => setNav(false)}>← Back to Work</a>
            </li>
          </>
        ) : (
          <>
            <li className='py-4 text-2xl hover:text-[#FF9533]'>
              <Link onClick={() => setNav(false)} to='about' smooth={true} duration={500}>About</Link>
            </li>
            <li className='py-4 text-2xl hover:text-[#00E5A0]'>
              <Link onClick={() => setNav(false)} to='skills' smooth={true} duration={500}>Skills</Link>
            </li>
            <li className='py-4 text-2xl hover:text-[#FF9533]'>
              <Link onClick={() => setNav(false)} to='work' smooth={true} duration={500}>Work</Link>
            </li>
            <li className='py-4 text-2xl hover:text-[#00E5A0]'>
              <Link onClick={() => setNav(false)} to='footer' smooth={true} duration={500}>Contact</Link>
            </li>
          </>
        )}
      </ul>

      {/* ── Desktop social slide-out panel ───────────────────────── */}
      {/* <div className='hidden lg:flex fixed flex-col top-[35%] left-0 z-40'>
        <ul>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600'>
            <a href='https://www.linkedin.com/in/maryam-mahta-ebrahimi-b3a7bb87/' target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-gray-300 px-3'>
              Linkedin <FaLinkedin size={28} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]'>
            <a href='https://github.com/Mahta-Ebrahimi' target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-gray-300 px-3'>
              Github <FaGithub size={28} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]'>
            <a href='mailto:mahta.ir@gmail.com' target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-gray-300 px-3'>
              Email <HiOutlineMail size={28} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]'>
            <a href={cv} target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-gray-300 px-3'>
              Resume <BsFillPersonLinesFill size={28} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#25D366]'>
            <a href='https://wa.me/4542796567' target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-white px-3'>
              WhatsApp <FaWhatsapp size={28} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#c13584]'>
            <a href='https://www.instagram.com/mahta.creative/' target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-gray-300 px-3'>
              Instagram <FaInstagram size={28} />
            </a>
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default Navbar;
