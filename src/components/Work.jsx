import React, { useState, useRef, useEffect } from 'react';
import danskeBank from '../assets/danskeBank.png';
import pawpal from '../assets/HIFIPawpal.png';
import novasolFigma from '../assets/NovaFigma.png';
import selskaklocal from '../assets/UI1.png';
import GlienkeScreen from '../assets/GlienkeScreen.png';
import wordPress from '../assets/wordpress2.png';
import newsbox from '../assets/newsbox.png';
import OnlineShop from '../assets/OnlineShop.png';
import search from '../assets/search.png';
import portfolio1 from '../assets/portfolio1.png';
import realEstate from '../assets/realestate.jpg';
import iplay from '../assets/iplaymusic.png';
import chat from '../assets/chat.png';
import trainee from '../assets/trainee.png';
import fruitApp from '../assets/fruitApp.png';
import WorkHeader from './WorkHeader';
import WorkCardStack from './WorkCardStack';
import WorkProjectList from './WorkProjectList';
import detectAI from '../assets/DashboardAI.png';
import matchMeHIFI from '../assets/MatchMeHIFI.png';
import chatbot from '../assets/Chatbot.png';

const projects = [
  
  {
    id: 1,
    title: 'MatchMe App',
    category: 'AI Service Matchmaking- Desktop UX/UI ',
    badge: 'AI Matchmaking',
    badgeColor: '#00E5A0',
    tools: ['Figma', 'AI Features', 'UX Research', 'Prototyping'],
    image: matchMeHIFI,
    type: 'uiux',
    route: '/work/matchme'
  },
  {
    id: 2,
    title: 'Detect AI Security',
    category: 'AI Security Design- Desktop UX/UI ',
    badge: 'AI Security',
    badgeColor: '#00E5A0',
    tools: ['Figma', 'AI Systems', 'Product Design','Automation Logic'],
    image: detectAI,
    type: 'uiux',
    route: '/work/secureflow'
  },
   {
    id: 3,
    title: 'PawPal App',
    category: 'Mobile- UX/UI',
    badge: 'Mobile- UX/UI',
    badgeColor: '#000',
    tools: ['Figma', 'UX Research', 'Prototyping', 'UI Design'],
    image: pawpal,
    type: 'uiux',
    route: '/work/pawpal'
  },
     {
    id: 4,
    title: 'AI Chatbot App',
    category: 'UX/UI + Full-Stack + AI',
    badge: 'AI + Full-Stack',
    badgeColor: '#38BDF8',
    tools: ['React', 'Node.js', 'OpenAI', 'Tailwind'],
    image: chatbot,
    type: ['uiux', 'frontend'],
    route: '/work/chatbot'
  },
   {
    id: 5,
    title: 'My Portfolio',
    category: 'UX/UI + React',
    badge: 'UX/UI + React',
    badgeColor: '#A78BFA',
    tools: ['Figma', 'React', 'Tailwind'],
    image: portfolio1,
    type: ['uiux', 'frontend'],
    route: '/work/portfolio'
  },
 
   {
    id: 6,
    title: 'Selskabslokale',
    category: 'UX Research-SEO Analysis-Heatmaps',
    badge: 'UX Research',
    badgeColor: '#000',
    tools: ['Figma', 'Research','Test','SEO','AIHeatmap' ],
    image: selskaklocal,
    type: 'uiux',
    route: '/work/selskabslokale'
  },
  {
    id: 7,
    title: 'Bank DevSec AI',
    category: 'AI Product Design',
    badge: 'AI Product Design',
    badgeColor: '#00E5A0',
    tools: ['Figma', 'React', 'TypeScript'],
    image: danskeBank,
    type: ['uiux', 'frontend'],
    route: '/work/danske-bank'
  },
 
  // {
  //   id: 7,
  //   title: 'Novasol Travel',
  //   category: 'UX Redesign',
  //   badge: 'UX Redesign',
  //   badgeColor: '#000',
  //   tools: ['Figma', 'IA', 'Accessibility'],
  //   image: novasolFigma,
  //   type: 'uiux',
  //   route: '/work/novasol'
  // },
 
  
  // {
  //   id: 8,
  //   title: 'Glienke Design',
  //   category: 'Frontend Dev',
  //   badge: 'Frontend Dev',
  //   badgeColor: '#000',
  //   tools: ['HTML', 'CSS', 'JavaScript'],
  //   image: GlienkeScreen,
  //   type: 'frontend',
  //   route: '/work/glienke'
  // },
  {
    id: 9,
    title: 'Soulimous',
    category: 'WordPress',
    badge: 'WordPress',
    badgeColor: '#000',
    tools: ['WordPress', 'CMS', 'UI Design'],
    image: wordPress,
    type: ['uiux', 'frontend'],
    route: '/work/soulimous'
  },
  // {
  //   id: 8,
  //   title: 'News Box',
  //   category: 'React App',
  //   badge: 'React',
  //   badgeColor: '#000',
  //   tools: ['React', 'JavaScript', 'CSS'],
  //   image: newsbox,
  //   type: 'frontend',
  //   route: 'https://wonderful-beignet-22f3b4.netlify.app/',
  //   external: true
  // },
  // {
  //   id: 8,
  //   title: 'Online Shop',
  //   category: 'React App',
  //   badge: 'React',
  //   badgeColor: '#000',
  //   tools: ['React', 'JavaScript', 'CSS'],
  //   image: OnlineShop,
  //   type: 'frontend',
  //   route: 'https://melodic-cuchufli-f56ece.netlify.app/',
  //   external: true
  // },
  // {
  //   id: 9,
  //   title: 'Google Search',
  //   category: 'React App',
  //   badge: 'React',
  //   badgeColor: '#000',
  //   tools: ['React', 'JavaScript', 'API'],
  //   image: search,
  //   type: 'frontend',
  //   route: 'https://phenomenal-basbousa-c22dd3.netlify.app/',
  //   external: true
  // },
 

  // {
  //   id: 11,
  //   title: 'Real Estate – Vue.js',
  //   category: 'Vue App',
  //   badge: 'Vue.js',
  //   badgeColor: '#000',
  //   tools: ['Vue.js', 'JavaScript', 'CSS'],
  //   image: realEstate,
  //   type: 'frontend',
  //   route: 'https://github.com/Rangeland5499/m-gler-vue',
  //   external: true
  // },
  // {
  //   id: 9,
  //   title: 'iPlayMusic App',
  //   category: 'React App',
  //   badge: 'React',
  //   badgeColor: '#000',
  //   tools: ['React', 'JavaScript', 'CSS'],
  //   image: iplay,
  //   type: 'frontend',
  //   route: 'https://github.com/rts-cmk-wu07/iplaymusic-uptempo-folk/tree/master',
  //   external: true
  // },
  // {
  //   id: 13,
  //   title: 'Chat Interface',
  //   category: 'React App',
  //   badge: 'React',
  //   badgeColor: '#000',
  //   tools: ['React', 'JavaScript', 'CSS'],
  //   image: chat,
  //   type: 'frontend',
  //   route: 'https://github.com/Mahta-Ebrahimi/chat-interface-main',
  //   external: true
  // },
  // {
  //   id: 10,
  //   title: 'Trainee App',
  //   category: 'React App',
  //   badge: 'React',
  //   badgeColor: '#000',
  //   tools: ['React', 'JavaScript', 'CSS'],
  //   image: trainee,
  //   type: 'frontend',
  //   route: 'https://github.com/Mahta-Ebrahimi/Trainee-app',
  //   external: true
  // },
  // {
  //   id: 11,
  //   title: 'Fruit Shop App',
  //   category: 'React App',
  //   badge: 'React',
  //   badgeColor: '#000',
  //   tools: ['React', 'JavaScript', 'CSS'],
  //   image: fruitApp,
  //   type: 'frontend',
  //   route: 'https://github.com/Mahta-Ebrahimi/FruitApp-site',
  //   external: true
  // },
];

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => Array.isArray(p.type) ? p.type.includes(filter) : p.type === filter);

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  const activeProject = filteredProjects[activeIndex];
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(null);
  const [hoveredListIndex, setHoveredListIndex] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (cardRef.current) setCardHeight(cardRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [filter]);

  return (
    <div name='work' id='work' className='w-full min-h-screen bg-black pb-16'>
      <div className='max-w-[1200px] mx-auto px-4 pt-20 lg:pt-36 pb-16'>
        <WorkHeader />

        {/* Filter tabs + legend — full width, left-aligned, above both columns */}
        <div className='mb-4 lg:pl-6'>
          {/* Buttons row */}
          <div className='flex items-center gap-3 flex-wrap'>
            {['all', 'uiux', 'frontend'].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setActiveIndex(0); }}
                className={`px-5 py-2 text-sm font-bold tracking-wider border transition-colors ${
                  filter === f
                    ? 'bg-white text-black border-transparent'
                    : 'bg-transparent text-[#666] border-[#2A2A2A] hover:border-[#555] hover:text-[#999]'
                }`}
              >
                {f === 'all' ? 'All' : f === 'uiux' ? 'UI / UX' : 'Frontend'}
              </button>
            ))}
            {/* Legend inline — desktop only */}
            <div className='hidden lg:flex items-center gap-4 ml-1'>
              <div className='flex items-center gap-2'>
                <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#00E5A0' }} />
                <span className='text-sm text-[#9CA3AF]'>AI</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#FF9533' }} />
                <span className='text-sm text-[#9CA3AF]'>UI/UX & Frontend</span>
              </div>
            </div>
          </div>
          {/* Legend below buttons — mobile only */}
          <div className='flex lg:hidden items-center gap-4 mt-2'>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#00E5A0' }} />
              <span className='text-sm text-[#9CA3AF]'>AI</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#FF9533' }} />
              <span className='text-sm text-[#9CA3AF]'>UI/UX & Frontend</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout — no gap so list and card sit flush inline */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 items-start'>
          {/* LEFT COLUMN: Project List */}
          <div className='order-1 lg:order-1 lg:pl-6 relative z-20'>
            <WorkProjectList
              projects={filteredProjects}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              cardHeight={cardHeight}
              onHoverIndex={setHoveredListIndex}
            />
          </div>

          {/* RIGHT COLUMN: Stack Card + Navigation */}
          <div className='flex flex-col order-2 lg:order-2 lg:pl-10'>
            <div ref={cardRef}>
              <WorkCardStack
                activeProject={activeProject}
                projects={filteredProjects}
                activeIndex={activeIndex}
                isHinted={hoveredListIndex !== null && hoveredListIndex !== activeIndex}
              />
            </div>

            {/* Navigation arrows + dots — below the card */}
            <div className='flex items-center justify-center gap-4 mt-6'>
              <button
                onClick={handlePrev}
                className='px-5 py-2 text-xs font-bold tracking-wider border border-[#333] text-white hover:bg-white hover:text-black transition-colors'
              >
                ←
              </button>
              <div className='flex gap-2 items-center'>
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-white scale-125' : 'bg-[#444] hover:bg-[#666]'}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className='px-5 py-2 text-xs font-bold tracking-wider border border-[#333] text-white hover:bg-white hover:text-black transition-colors'
              >
                →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Work;