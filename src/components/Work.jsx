import React from 'react';
import WorkImg from '../assets/workImg.jpeg';
import google from "../assets/google.png";
import newsbox from "../assets/newsbox.png"
import realEstate from '../assets/realestate.jpg';
import OnlineShop from '../assets/OnlineShop.png'

const Work = () => {
  return (
    <div name='work' className='w-full min-h-screen text-gray-300 bg-[#0a192f] pb-16'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8 sticky top-5'>
          <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-[#FF9533] text-[#FF9533]'>
            Work- Front end
          </p>
          <p className='py-6'>Check out some of creations!</p>
        </div>

{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-12'>
        
<div
  style={{ backgroundImage: `url(${realEstate})` }}
  className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
>
  <div className='opacity-0 group-hover:opacity-100'>
    <span className='text-2xl font-bold text-white tracking-wider'>
      Project Title
    </span>
    <div className='pt-8 text-center'>
      <a href='https://your-demo-link.netlify.app/' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a>
      <a href='https://github.com/your-username/your-repo' target="_blank">
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
  <div className='opacity-0 group-hover:opacity-100'>
    <span className='text-2xl font-bold text-white tracking-wider'>
       Project Title
    </span>
    <div className='pt-8 text-center'>
      <a href='https://your-demo-link.netlify.app/' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a>
      <a href='https://github.com/your-username/your-repo' target="_blank">
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
  <div className='opacity-0 group-hover:opacity-100'>
    <span className='text-2xl font-bold text-white tracking-wider'>
       Project Title
    </span>
    <div className='pt-8 text-center'>
      <a href='https://your-demo-link.netlify.app/' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Demo
        </button>
      </a>
      <a href='https://github.com/your-username/your-repo' target="_blank">
        <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
          Code
        </button>
      </a>
    </div>
    
  </div>
</div>

            {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${newsbox})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                News Box
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
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                Online Shop
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
            style={{ backgroundImage: `url(${google})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                Google Search <br /> React Js
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
            style={{ backgroundImage: `url(${WorkImg})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                My Portfolio
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
            style={{ backgroundImage: `url(${realEstate})` }}
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <span className='text-2xl font-bold text-white tracking-wider'>
                React Chat Interface
              </span>
              <div className='pt-8 text-center'>
                <a href='/'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Demo
                  </button>
                </a>
                <a href='https://github.com/Mahta-Ebrahimi/chat-interface-main'target="_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
