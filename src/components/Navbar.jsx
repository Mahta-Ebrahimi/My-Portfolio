import React, { useState } from 'react';
import cv from '../assets/MahtaCv.pdf';
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaInstagram
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
// import Logo from '../assets/logo.png';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-right pt-10 pr-20 bg-[#0a192f] text-gray-300'>
      <div>
        {/* <img src={Logo} alt='Logo Image' style={{ width: '50px' }} /> */}
        {/* <h3 className=''>ME</h3> */}
      </div>

      {/* menu */}
      <ul className='hidden md:flex font-bold '>
        <li className='hover:font-extrabold hover:text-[#009dae]'>
          <Link to='home' smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className='hover:font-extrabold hover:text-[#FF9533]'>
          <Link to='about' smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li className='hover:font-extrabold hover:text-[#FF4f6f]'>
          <Link to='skills' smooth={true} duration={500}>
            Skills
          </Link>
        </li>
        {/* <li>
          <Link to='work' smooth={true} duration={500} className='hover:font-extrabold hover:text-[#FAC813]'>
            Work
          </Link>
        </li> */}
        <li className="relative group">
  <Link
    to="work"
    smooth={true}
    duration={500}
    className="hover:font-extrabold hover:text-[#FAC813]"
  >
    Work
  </Link>

  {/* Sub-menu */}
  <ul className="absolute hidden group-hover:flex flex-col bg-[#0a192f] mt-2 rounded shadow-lg z-500 left-0">
    <li className="py-1 px-6 min-w-[160px] hover:text-[#FF9533]">
      <Link to="frontend"className="block w-full">
        Front-End
      </Link>
    </li>
    <li className="py-1 px-6 min-w-[160px] hover:text-[#009dae]">
      <Link to="uiux" className="block w-full">
        UI/UX
      </Link>
    </li>
    <li className="py-1 px-6 min-w-[160px] hover:text-[#FF4f6f]">
      <Link to="calligraphy" className="block w-full">
        Calligraphy
      </Link>
    </li>
  </ul>
</li>
        {/* <li className='hover:font-extrabold hover:text-pink-600'>
          <Link to='contact' smooth={true} duration={500}>
            Contact
          </Link>
        </li> */}
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className='md:hidden z-10 hover:text-[#FF9533] text-4xl'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center'
        }
      >
        <li className='py-6 text-4xl hover:text-[#FF9533]'>
          <Link onClick={handleClick} to='home' smooth={true} duration={500} >
            Home
          </Link>
        </li>
        <li className='py-6 text-4xl hover:text-[#FF9533]'>
          {' '}
          <Link onClick={handleClick} to='about' smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li className='py-6 text-4xl hover:text-[#FF9533] '>
          {' '}
          <Link onClick={handleClick} to='skills' smooth={true} duration={500}>
            Skills
          </Link>
        </li>
        <li className='py-6 text-4xl hover:text-[#F6FCFC]'>
          {' '}
          <Link onClick={handleClick} to='work' smooth={true} duration={500}>
            Work
          </Link>
        </li>
        {/* <li className='py-6 text-4xl'>
          {' '}
          <Link onClick={handleClick} to='contact' smooth={true} duration={500}>
            Contact
          </Link>
        </li> */}
      </ul>

      {/* Social icons */}
      <div className='hidden lg:flex fixed flex-col top-[35%] left-0'>
        <ul>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://www.linkedin.com/in/maryam-mahta-ebrahimi-b3a7bb87/'
              target="_blank"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://github.com/Mahta-Ebrahimi'target="_blank"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href="mailto:mahta.ir@gmail.com" target="_blank" rel = "noreferrer"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href={cv}target="_blank"
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
          
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#25D366]'>
            <a
              className='flex justify-between items-center w-full text-white '
              href="https://wa.me/4542796567" target="_blank" rel = "noreferrer"
            >
              WhatsApp <FaWhatsapp size={30} />
            </a>
          </li>
            <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px]  bg-[#c13584]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://www.instagram.com/mahta.creative/' target="_blank"
            >
              Instagram <FaInstagram size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
