// import React from 'react';

// const About = () => {
//   return (
//     <div>
//     <div name='about' className='w-full h-screen bg-[#0a192f] text-gray-300'>
//       <div className='flex flex-col justify-center items-center w-full h-full'>
//         <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
//           <div className='sm:text-right pb-12 pl-4'>
//             <p className='text-4xl font-bold inline border-b-4 border-[#FF9533] text-[#FF9533]'>
//               About
//             </p>
//           </div>
          
//           </div>
//            <p className='sm:text-left text-4xl font-bold'>Designer & develop</p><br/>
//           <div className='max-w-[1000px] w-full  flex flex-col justify-center items-center text-justify leading-relaxed  px-4'>
//             <div >
//             {/* <p>Crafting digital experiences</p>  */}
             
//             </div>
//             <div>
             
//               <p>I'm a Front-End Developer and UI/UX Designer who loves creating apps that are easy to use 
//                 and designed with real people in mind.
//                  Design has always been close to me, it’s how I see and shape the world around me.<br/><br/>
//                  I studied Front-End Development at Roskilde Tekniske Skole and later took courses
//                   in UI/UX and graphic design at ITucation Skole, plus a UI course at Redi School.
//                    These experiences helped me build clean,
//                   user-friendly applications that are simple to navigate and focused on what users really 
//                   need.<br/><br/>
//                     As a freelancer, I’ve worked on different projects and learned something new with each one. My background in calligraphy gives me a strong sense of shape, 
//                     balance, and color, adding a creative touch to everything I design.</p>  
//             </div>
//           </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default About;
import React from 'react';

const About = () => {
  return (
    <div name="about" className="w-full min-h-screen bg-[#0a192f] text-gray-300">
      <div className="flex flex-col justify-start items-center w-full min-h-screen pt-40 px-4">
        
        {/* Section Title */}
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-8 pl-4">
            <p className="text-4xl font-bold inline border-b-4 border-[#FF9533] text-[#FF9533]">
              About
            </p>
          </div>
          <div></div>
        </div>

        {/* Designer & Developer Section */}
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="text-left">
            <p className="text-4xl font-bold text-[#FF9533]">Designer & Developer</p>
          </div>
          <div></div>
        </div>

        {/* Bio Section */}
        <div className="max-w-[1000px] w-full mt-8 text-justify leading-relaxed">
          <p>
            I'm a Front-End Developer and UI/UX Designer who loves creating apps that are easy to use
            and designed with real people in mind. Design has always been close to me, it’s how I see
            and shape the world around me.
            <br /><br />
            I studied Front-End Development at Roskilde Tekniske Skole and later took courses in UI/UX
            and graphic design at ITucation Skole, plus a UI course at Redi School. These experiences
            helped me build clean, user-friendly applications that are simple to navigate and focused
            on what users really need.
            <br /><br />
            As a freelancer, I’ve worked on different projects and learned something new with each one.
            My background in calligraphy gives me a strong sense of shape, balance and color, adding
            a creative touch to everything I design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
