import React, { useState } from 'react';
import cv from '../assets/MahtaCv.pdf';
import {
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const isProject = location.pathname.startsWith('/work/');
  const isFrontend = ['/work/glienke', '/work/soulimous'].includes(location.pathname);
  const projectLabel = isFrontend ? 'Frontend Project' : 'UI / UX Project';

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────────── */}
      <div className={`fixed w-full h-[80px] flex justify-between items-center px-8 md:px-12 border-b z-50 transition-colors duration-300 ${
        isDark
          ? 'bg-black border-[#1A1A1A] text-gray-300'
          : 'bg-white border-gray-200 text-gray-700'
      }`}>

        {/* LEFT */}
        {isProject ? (
          <a
            href="/#work"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isDark ? 'text-[#9CA3AF] hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <FaArrowLeft style={{ fontSize: '11px' }} />
            Back to Work
          </a>
        ) : (
          <div />
        )}

        {/* CENTER */}
        {isProject ? (
          <span className={`hidden md:block text-xs font-medium tracking-[0.2em] uppercase ${isDark ? 'text-[#4B5563]' : 'text-gray-400'}`}>
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
        <div className='flex items-center gap-3'>
          {isProject && (
            <a
              href="/#work"
              className='hidden md:block text-sm text-[#FF9533] hover:text-[#FF9533]/80 font-semibold transition-colors'
            >
              All Work
            </a>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isDark ? 'hover:bg-[#1A1A1A]' : 'hover:bg-gray-100'
            }`}
            aria-label="Toggle light / dark mode"
          >
            {isDark
              ? <FaSun size={15} color="#FF9533" />
              : <FaMoon size={15} color="#6b7280" />
            }
          </button>

          <button
            onClick={() => setNav(!nav)}
            className={`md:hidden z-50 text-3xl transition-colors ${isDark ? 'hover:text-[#FF9533]' : 'hover:text-[#FF9533]'}`}
          >
            {!nav ? <FaBars /> : <FaTimes />}
          </button>
        </div>
      </div>

      {/* ── Mobile full-screen menu ───────────────────────────────── */}
      <ul className={`${!nav ? 'hidden' : 'fixed'} pb-8 top-0 left-0 w-full h-screen flex flex-col justify-center items-center z-40 transition-colors duration-300 ${
        isDark ? 'bg-black text-gray-100' : 'bg-white text-gray-800'
      }`}>
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
    </>
  );
};

export default Navbar;
