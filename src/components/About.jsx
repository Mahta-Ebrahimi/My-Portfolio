import React from 'react';

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#0a192f] text-gray-300'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
          <div className='sm:text-right pb-8 pl-4'>
            <p className='text-4xl font-bold inline border-b-4 border-[#FF9533] text-[#FF9533]'>
              About
            </p>
          </div>
          <div></div>
          </div>
          <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-3'>
            <div >
            <p>Crafting digital experiences</p> 
              <p className='sm:text-left text-4xl font-bold'>Innovative design & development</p>
            </div>
            <div>
             
              <p>Frontend Developer & UI/UX Designer specializing in user-friendly,  
                  intuitive, digital experiences. Passionate about blending design 
                  thinking with frontend technologies to build seamless, engaging 
                  products. Skilled in usability and component-based design 
                  systems, ensuring both functionality and aesthetics across all 
                  screen sizes.</p>  
            </div>
          </div>
      </div>
    </div>
  );
};

export default About;
