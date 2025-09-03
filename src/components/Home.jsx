import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';

const Home = () => {
  return (
    <div name='home' className='w-full h-screen bg-[#0a192f]'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full '>

      <p style={{color:"white", padding:"40px",fontSize:"40px"}}>ADD CERTIFICATE </p>
        <p className='text-[#FF9533]'>Hi, my name is</p>


       
        <h1 className='text-4xl sm:text-7xl font-bold text-[#ccd6f6]'>
          Mahta(Maryam) Ebrahimi
        </h1>
        <h2 className='flex flex-col text-center text-4xl sm:text-7xl font-bold text-[#FF9533] vertical-align: baseline '>
        Front end Developer<br/>UI/UX Designer
        </h2>
        <br/>
        <p className='flex flex-col text-center text-[#8892b0] mx-auto py-8 max-w-[850px]'>
        I craft fast, responsive,
         and user-friendly web applications, blending clean code with great design.
          Passionate about creating seamless digital experiences that look and feel amazing on any device.
        </p>
        <div>
          
        {/* <button className='text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-pink-600 hover:border-pink-600'>
            View Work
            <span className='group-hover:rotate-90 duration-300'>
              <HiArrowNarrowRight className='ml-3 ' />
            </span>
          </button> */}
          
        </div>
      </div>
    </div>
  );
};

export default Home;
