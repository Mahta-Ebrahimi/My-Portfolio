import React from 'react';
import WorkImg from '../assets/workImg.jpeg';
import google from "../assets/google.png";
import newsbox from "../assets/newsbox.png"
import realEstate from '../assets/realestate.jpg';
import OnlineShop from '../assets/OnlineShop.png';
import search from '../assets/search.png';
import portfolio from '../assets/portfolio1.png';
import chat from '../assets/chat.png';
import trainee from '../assets/trainee.png';
import fruitApp from '../assets/fruitApp.png';
import wordPress from '../assets/wordpress2.png';
import GlienkeScreen from '../assets/GlienkeScreen.png';
import Ui2 from '../assets/Ui2.png';
import Ui2Screen from '../assets/Ui2Screen.png';
import Ui3 from '../assets/Ui3Screen.png';
import Ui3Screen from '../assets/ui3.png';
import Ui4 from '../assets/Ui4.png';
import Ui5 from '../assets/Ui5.png';
import Ui5Screen from '../assets/Ui5Screen.png';
import Ui6 from '../assets/Ui6.png';
import Ui6Screen from '../assets/Ui6Screen.png';
import Ui7 from '../assets/Ui7.png';
import novasol from '../assets/NovasolBoth.png';
import NovaDoc from '../assets/novasol.pdf';
import novasolFigma from '../assets/NovaFigma.png';
import ipaly from '../assets/iplaymusic.png';
import selskabslokaleDoc from '../assets/Ui Og grafisk design-Maryam Ebrahimi.pdf';
import calligraphy1 from '../assets/1.jpg';
import calligraphy2 from '../assets/2.jpg';
import calligraphy3 from '../assets/3.jpg';
import calligraphy4 from '../assets/4.jpg';
import calligraphy5 from '../assets/5.jpg';
import calligraphy6 from '../assets/6.jpg';
import calligraphy7 from '../assets/7.jpg';
import calligraphy8 from '../assets/8.jpg';
import calligraphy9 from '../assets/9.jpg';
import calligraphy10 from '../assets/10.jpg';
import calligraphy11 from '../assets/11.jpg';
import calligraphy12 from '../assets/12.jpg';
import selskaklocal from '../assets/UI1.png';
import danskeBank from '../assets/danskeBank.png';
// import { Link } from 'react-scroll';
const Work = () => {
  return (
    <div>
    
    <div name='work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pb-16'>
      <div className='max-w-[1000px] mx-auto p-8 flex flex-col justify-center w-[90%] h-full'id="frontend">
        <div className='pb-8 sticky top-5' >
          <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-[#FF9533] text-[#FF9533]'>
            Front-end
          </p>
          
        </div>

{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-12'>
      
            {/* Grid Item */}
          <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    News Box – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${newsbox})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://wonderful-beignet-22f3b4.netlify.app/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    <a href="https://github.com/Rangeland5499/NewsBox" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>
      <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Danske Bank DevSecAI- React Js
  </h2>

  {/* Image section */}
  <div 
    style={{ backgroundImage: `url(${danskeBank})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://danske-bank-workflow-demo.vercel.app/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    <a href="https://github.com/Mahta-Ebrahimi/Danske-Bank-Workflow-Demo" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>
          <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Online Shop – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${OnlineShop})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://melodic-cuchufli-f56ece.netlify.app/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    <a href="https://github.com/Mahta-Ebrahimi/Online-Shop/tree/main/furniture-shop" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>

            {/* Grid Item */}
          <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Google Search – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${search})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://phenomenal-basbousa-c22dd3.netlify.app/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    <a href="https://github.com/Rangeland5499/Google-Search-Translate-React" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>
         <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    My Portfolio – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${portfolio})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    <a href="https://github.com/Mahta-Ebrahimi/My-Portfolio" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>

          <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Vue.js Application – Real Estate
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${realEstate})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    {/* Uncomment if you want Demo button */}
    {/* <a href="https://github.com/Rangeland5499/m-gler-vue" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a> */}
    <a href="https://github.com/Rangeland5499/m-gler-vue" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>

            {/* Grid Item */}
 
<div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    iPlayMusic App – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${ipaly})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    {/* Uncomment if you want Demo button */}
    {/* <a href="/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a> */}
    <a href="https://github.com/rts-cmk-wu07/iplaymusic-uptempo-folk/tree/master" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>

          
          <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Chat Interface – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${chat})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    {/* Uncomment if you want Demo button */}
    {/* <a href="/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a> */}
    <a href="https://github.com/Mahta-Ebrahimi/chat-interface-main" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>



<div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Trainee App – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${trainee})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    {/* Uncomment if you want Demo button */}
    {/* <a href="https://your-demo-link.netlify.app/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a> */}
    <a href="https://github.com/Mahta-Ebrahimi/Trainee-app" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>



<div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Fruit Shop App – React Js
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${fruitApp})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    {/* Uncomment if you want Demo button */}
    {/* <a href="https://your-demo-link.netlify.app/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a> */}
    <a href="https://github.com/Mahta-Ebrahimi/FruitApp-site" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a>
  </div>
</div>

<div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    WordPress App
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${wordPress})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://soulimous.com/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    {/* Uncomment if you want Code button too */}
    {/* <a href="https://github.com/your-username/your-repo" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a> */}
  </div>
</div>

        </div>
        
      </div>
    </div>
    <div name='work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pb-16'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-[90%] h-full'id="uiux">
        <div className='pb-8 top-5 sticky' >
          <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-[#FF9533] text-[#FF9533]'>
            UI/UX
          </p>
          {/* <p className='py-6'>Check out some of creations!</p> */}
        </div>

{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-12'>
        
            {/* Grid Item */}
          <div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Selskabslokale – UI/UX Test Redesign
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${selskaklocal})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href={selskabslokaleDoc} target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Document
      </button>
    </a>
    {/* Uncomment if you want Demo too */}
    {/* <a href="https://github.com/Rangeland5499/NewsBox" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a> */}
  </div>
</div>

<div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    WordPress App
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${wordPress})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://soulimous.com/" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    {/* Uncomment if you want Code button too */}
    {/* <a href="https://github.com/your-username/your-repo" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a> */}
  </div>
</div>

<div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2 mt-4">
    Glienke Design – Dandomain Website
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${GlienkeScreen})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://www.glienkedesign.dk/shop/glienke-design-72s1.html" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    {/* Uncomment if you want another button (e.g., Code or Document) */}
    {/* <a href={Ui2} target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Code
      </button>
    </a> */}
  </div>
</div>

         {/* Project Title outside the section */}


{/* Card Section */}
<div className="shadow-m shadow-[#1e3a8a] container rounded-md flex flex-col items-center mx-auto content-div max-w-md bg-[#0f1f4d]">
  {/* Project Title */}
  <h2 className="text-l font-bold text-white tracking-wide text-center mb-2
   mt-4">
    Travel Agency Redesign
  </h2>

  {/* Image section */}
  <div
    style={{ backgroundImage: `url(${novasolFigma})` }}
    className="w-full h-72 bg-cover bg-center rounded-t-md"
  ></div>

  {/* Buttons stacked vertically */}
  <div className="flex flex-col items-center space-y-3 w-full py-4">
    <a href="https://www.figma.com/proto/PEZSnKDt63mPmeIKPUEbTB/Din-m%C3%83%C2%A6gler--2-?page-id=63%3A0&node-id=420-23&starting-point-node-id=420%3A23&t=COlUHCgSLO1qCgTY-1" target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Demo
      </button>
    </a>
    <a href={NovaDoc} target="_blank">
      <button className="w-40 text-center rounded-lg px-4 py-2 bg-white text-gray-700 font-bold text-base shadow-md">
        Document
      </button>
    </a>
  </div>
</div>


          
       
         
          
        
       
        </div>
      </div>
      {/* <div name='work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pb-16'>
  <div id="calligraphy" className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-[90%] h-full">
  <div className="pb-8 sticky top-5 mt-20" >
    <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-[#FF9533] text-[#FF9533]">
      Calligraphy
    </p>
    <p className="py-6">A glimpse into my artistic side</p>
  </div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {[calligraphy1, calligraphy2, calligraphy3, calligraphy4, calligraphy5, calligraphy6, calligraphy7, calligraphy8, calligraphy9, calligraphy10,calligraphy11,calligraphy12].map((img, index) => (
    <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-lg">
      <img
        src={img}
        alt={`Calligraphy ${index + 1}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  ))}
</div>

</div>
      </div> */}
           
    </div>
    </div>
  );
};

export default Work;
