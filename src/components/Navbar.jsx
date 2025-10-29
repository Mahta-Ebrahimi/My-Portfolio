import React, { useState } from 'react';
import cv from '../assets/MahtaCv.pdf';
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center pt-10 pr-20 bg-[#0a192f] text-gray-300 z-50'>
      <div>{/* Optional logo or initials */}</div>

      {/* Desktop menu */}
      <ul className='hidden md:flex font-bold'>
        <li className='hover:font-extrabold hover:text-[#009dae]'>
          <Link to='home'>Home</Link>
        </li>
        <li className='hover:font-extrabold hover:text-[#FF9533]'>
          <Link to='about'>About</Link>
        </li>
        <li className='hover:font-extrabold hover:text-[#FF4f6f]'>
          <Link to='skills'>Skills</Link>
        </li>
        <li className='relative group'>
          <Link to='work' className='hover:font-extrabold hover:text-[#FAC813]'>Work</Link>
          <ul className='absolute hidden group-hover:flex flex-col bg-[#0a192f] mt-2 rounded shadow-lg z-50 left-0'>
            <li className='py-1 px-6 min-w-[160px] hover:text-[#FF9533]'>
              <Link to='frontend' className='block w-full'>Front-End</Link>
            </li>
            <li className='py-1 px-6 min-w-[160px] hover:text-[#009dae]'>
              <Link to='uiux' className='block w-full'>UI/UX</Link>
            </li>
            <li className='py-1 px-6 min-w-[160px] hover:text-[#FF4f6f]'>
              <Link to='calligraphy' className='block w-full'>Calligraphy</Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* Hamburger */}
      <div onClick={handleClick} className='md:hidden z-50 hover:text-[#FF9533] text-4xl'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul className={`${!nav ? 'hidden' : 'absolute'} top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center z-40`}>
        <li className='py-6 text-4xl hover:text-[#FF9533]'>
          <Link onClick={handleClick} to='home'>Home</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[#FF9533]'>
          <Link onClick={handleClick} to='about'>About</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[#FF9533]'>
          <Link onClick={handleClick} to='skills'>Skills</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[#F6FCFC]'>
          <Link onClick={handleClick} to='work'>Work</Link>
        </li>

        {/* Divider */}
        <div className="w-4/5 border-t border-gray-600 my-6"></div>

        {/* Mobile Footer Contacts */}
        <div className="flex flex-col items-center gap-3 text-base text-gray-300 md:hidden">
          <p className="text-[#FF9533] font-semibold mb-2">Contact</p>
          <a href='https://www.linkedin.com/in/maryam-mahta-ebrahimi-b3a7bb87/' target='_blank' className='hover:text-[#009dae]'>LinkedIn</a>
          <a href='https://github.com/Mahta-Ebrahimi' target='_blank' className='hover:text-[#FF9533]'>GitHub</a>
          <a href='mailto:mahta.ir@gmail.com' target='_blank' className='hover:text-[#FF4f6f]'>Email</a>
          <a href={cv} target='_blank' className='hover:text-[#FAC813]'>Resume</a>
          <a href='https://wa.me/4542796567' target='_blank' className='hover:text-[#25D366]'>WhatsApp</a>
          <a href='https://www.instagram.com/mahta.creative/' target='_blank' className='hover:text-[#c13584]'>Instagram</a>
        </div>
      </ul>

      {/* Desktop Social Icons */}
      <div className='hidden lg:flex fixed flex-col top-[35%] left-0 z-40'>
        <ul>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600'>
            <a href='https://www.linkedin.com/in/maryam-mahta-ebrahimi-b3a7bb87/' target='_blank' className='flex justify-between items-center w-full text-gray-300'>
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]'>
            <a href='https://github.com/Mahta-Ebrahimi' target='_blank' className='flex justify-between items-center w-full text-gray-300'>
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]'>
            <a href='mailto:mahta.ir@gmail.com' target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-gray-300'>
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]'>
            <a href={cv} target='_blank' className='flex justify-between items-center w-full text-gray-300'>
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#25D366]'>
            <a href='https://wa.me/4542796567' target='_blank' rel='noreferrer' className='flex justify-between items-center w-full text-white'>
              WhatsApp <FaWhatsapp size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] bg-[#c13584]'>
            <a href='https://www.instagram.com/mahta.creative/' target='_blank' className='flex justify-between items-center w-full text-gray-300'>
              Instagram <FaInstagram size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
