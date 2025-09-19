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
import novasolFigma from '../assets/NovaFigma.png';
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
// import { Link } from 'react-scroll';
const Work = () => {
  return (
    <div>
    
    <div name='work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pb-16'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'id="frontend">
        <div className='pb-8 sticky top-5' >
          <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-[#FF9533] text-[#FF9533]'>
            Front-end
          </p>
          <p className='py-6'>Check out some of creations!</p>
        </div>

{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-12'>
        


            {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${newsbox})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div '
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100 flex flex-col'>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                News Box
              </span>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                React Js
              </span>
              <div className='pt-8 text-center'>
                <a href='https://wonderful-beignet-22f3b4.netlify.app/'target="_blank">
                {/* <iframe src="https://your-app.netlify.app" style="width:375px; height:667px; border:1px solid #ccc; border-radius:20px;" /> */}
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                <a href='https://github.com/Rangeland5499/NewsBox'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${OnlineShop})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100 flex flex-col'>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                Online Shop
              </span>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                React Js
              </span>
              <div className='pt-8 text-center'>
                <a href='https://melodic-cuchufli-f56ece.netlify.app/' target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                <a href='https://github.com/Mahta-Ebrahimi/Online-Shop/tree/main/furniture-shop'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
            {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${search})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100 flex flex-col'>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                Google Search
              </span>
               <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                React Js
              </span>
              <div className='pt-8 text-center'>
                <a href='https://phenomenal-basbousa-c22dd3.netlify.app/'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                <a href='https://github.com/Rangeland5499/Google-Search-Translate-React'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${realEstate})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                Vue js Application
              </span>
              <div className='pt-8 text-center'>
                {/* <a href='https://github.com/Rangeland5499/m-gler-vue'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a> */}
                <a href='https://github.com/Rangeland5499/m-gler-vue'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
            {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${portfolio})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='relative z-10 opacity-0 flex flex-col group-hover:opacity-100 transition duration-500'>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                My Portfolio
              </span>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                React js
              </span>
              <div className='pt-8 text-center'>
                <a href='/'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                <a href='https://github.com/Mahta-Ebrahimi/My-Portfolio'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${chat})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='flex flex-col opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
                Chat Interface
              </span>
              <span className='text-2xl font-bold text-white tracking-wider m-auto'>
               React Js
              </span>
              <div className='pt-8 text-center'>
                {/* <a href='/'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a> */}
                <a href='https://github.com/Mahta-Ebrahimi/chat-interface-main'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>

            </div>
          </div>


<div
  style={{ backgroundImage: `url(${trainee})` }}
  className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
>
  <div className='opacity-0 group-hover:opacity-100 flex flex-col'>
    <span className='text-2xl font-bold text-white tracking-wider m-auto'>
       Trainee App
    </span>
      <span className='text-2xl font-bold text-white tracking-wider m-auto'>
       React Js
    </span>
    <div className='pt-8 text-center'>
      {/* <a href='https://your-demo-link.netlify.app/' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a> */}
      <a href='https://github.com/Mahta-Ebrahimi/Trainee-app' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Code
        </button>
      </a>
    </div>
  </div>
</div>


          <div
  style={{ backgroundImage: `url(${fruitApp})` }}
  className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
>
  <div className='opacity-0 group-hover:opacity-100 flex flex-col'>
    <span className='text-2xl font-bold text-white tracking-wider m-auto'>
       Fruit Shop App
    </span>
    <span className='text-2xl font-bold text-white tracking-wider m-auto'>
       React Js
    </span>
    <div className='pt-8 text-center'>
      {/* <a href='https://your-demo-link.netlify.app/' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a> */}
      <a href='https://github.com/Mahta-Ebrahimi/FruitApp-site' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Code
        </button>
      </a>
    </div>
    
  </div>
</div>
          <div
  style={{ backgroundImage: `url(${wordPress})` }}
  className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
>
  <div className='opacity-0 group-hover:opacity-100'>
    <span className='text-2xl font-bold text-white tracking-wider'>
      WordPress app
    </span>
    <div className='pt-8 text-center'>
      <a href='https://soulimous.com/' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a>
      {/* <a href='https://github.com/your-username/your-repo' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Code
        </button>
      </a> */}
    </div>
  </div>
</div>
        </div>
        
      </div>
    </div>
    <div name='work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pb-16'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'id="uiux">
        <div className='pb-8 top-5 sticky' >
          <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-[#FF9533] text-[#FF9533]'>
            UI/UX
          </p>
          {/* <p className='py-6'>Check out some of creations!</p> */}
        </div>

{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-12'>
        
            {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${selskaklocal})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100 flex flex-col align-center justify-center m-10'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                Selskabslokale<br/>UI/UX test Redesign 
              </span>
              <div className='pt-8 text-center'>
                <a href={selskabslokaleDoc}target="_blank">
                {/* <iframe src="https://your-app.netlify.app" style="width:375px; height:667px; border:1px solid #ccc; border-radius:20px;" /> */}
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Document
                  </button>
                </a>
                {/* <a href='https://github.com/Rangeland5499/NewsBox'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a> */}
              </div>
            </div>
          </div>
                    <div
  style={{ backgroundImage: `url(${wordPress})` }}
  className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
>
  <div className='opacity-0 group-hover:opacity-100'>
    <span className='text-2xl font-bold text-white tracking-wider'>
      WordPress app
    </span>
    <div className='pt-8 text-center'>
      <a href='https://soulimous.com/' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a>
      {/* <a href='https://github.com/your-username/your-repo' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Code
        </button>
      </a> */}
    </div>
  </div>
</div>
<div
            style={{ backgroundImage: `url(${GlienkeScreen})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
               Broderi & Strik<br/>Dandomain Website
              </span>
              <div className='pt-8 text-center'>
                {/* <a href={Ui2} target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a> */}
                <a href='https://www.glienkedesign.dk/shop/glienke-design-72s1.html'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${novasolFigma})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider flex alingn-center justify-center'>
                Novasol <br/>Travel Agancy<br/> Figma design
              </span>
              <div className='pt-8 text-center'>
                <a href={novasol} target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                {/* <a href='https://github.com/Mahta-Ebrahimi/Online-Shop/tree/main/furniture-shop'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a> */}
              </div>
            </div>
          </div>
          
       
            {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${Ui2Screen})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
               Baya OnlineShop<br/>Figma design
              </span>
              <div className='pt-8 text-center'>
                <a href={Ui2} target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                {/* <a href='https://github.com/Rangeland5499/Google-Search-Translate-React'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a> */}
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${Ui3})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                Job Guide Website<br/>Figma Design
              </span>
              <div className='pt-8 text-center'target="_blank">
                <a href={Ui3Screen} target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                {/* <a href={Ui3Screen}target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a> */}
              </div>
            </div>
          </div>
            {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${Ui5Screen})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='relative z-10 opacity-0 group-hover:opacity-100 transition duration-500'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                Mobile Draugstore<br/>Figma Design
              </span>
              <div className='pt-8 text-center'>
                <a href={Ui5}target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                {/* <a href='https://github.com/Mahta-Ebrahimi/My-Portfolio'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a> */}
              </div>
            </div>
          </div>
        
<div
  style={{ backgroundImage: `url(${Ui6Screen})` }}
  className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
>
  <div className='opacity-0 group-hover:opacity-100'>
    <span className='text-2xl font-bold text-white tracking-wider'>
       Drugstore<br/>Figma Design
    </span>
    <div className='pt-8 text-center'>
      <a href={Ui7} target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a>
      {/* <a href='https://github.com/Mahta-Ebrahimi/Trainee-app' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Code
        </button>
      </a> */}
    </div>
  </div>
</div>        
        </div>
      </div>
      <div name='work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pb-16'>
  <div id="calligraphy" className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
  <div className="pb-8 sticky top-5" >
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
      </div>
           
    </div>
    </div>
  );
};

export default Work;
