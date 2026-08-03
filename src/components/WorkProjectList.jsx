import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const WorkProjectList = ({ projects, activeIndex, setActiveIndex, cardHeight, onHoverIndex }) => {
  const { isDark } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const listHeight = isMobile ? 220 : cardHeight;

  return (
    <div
      className='flex flex-col bg-[#111] overflow-y-auto'
      style={{ direction: 'rtl', ...(listHeight ? { height: `${listHeight}px` } : {}) }}
    >
      <div className='flex flex-col border-t border-[#555]' style={{ direction: 'ltr' }}>
        {projects.map((project, idx) => {
          const isActive = idx === activeIndex;
          const accentColor = project.badgeColor === '#00E5A0' ? '#00E5A0' : '#FF9533';
          const isGreen = accentColor === '#00E5A0';

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => { onHoverIndex?.(idx); setHoveredIdx(idx); }}
              onMouseLeave={() => { onHoverIndex?.(null); setHoveredIdx(null); }}
              className={`group flex items-center border border-[#555] border-t-0 cursor-pointer transition-all duration-150 ${
                isActive
                  ? isGreen ? 'bg-[#051a0f]' : 'bg-[#1a0e00]'
                  : isGreen ? 'bg-transparent hover:bg-[#1a5c38]' : 'bg-transparent hover:bg-[#5c2d00]'
              }`}
              style={{
                borderLeft: `4px solid ${isActive ? accentColor : isDark ? '#2a2a2a' : '#d1d5db'}`,
              }}
            >
              {/* Badge column */}
              <div className='shrink-0 flex items-center justify-center px-2 py-3 w-[110px]'>
                <span
                  className='text-[12px] font-mono font-semibold px-1.5 border w-full text-center leading-tight whitespace-normal flex items-center justify-center h-[34px]'
                  style={{ color: accentColor, borderColor: accentColor + '55' }}
                >
                  {project.badge}
                </span>
              </div>

              {/* Title + category */}
              <div className='flex-1 min-w-0 px-3 py-3'>
                <h4 className={`text-[14px] font-semibold leading-tight truncate transition-colors duration-150 ${
                  isActive
                    ? 'text-white'
                    : isDark
                      ? 'text-[#666] group-hover:text-[#ffffff]'
                      : 'text-[#666] group-hover:text-[#111111]'
                }`}>
                  {project.title}
                </h4>
                <p className='text-[12px] text-[#555] mt-0.5'>{project.category}</p>
              </div>

              {/* Arrow indicator — points right on desktop, down on mobile (card is below) */}
              <span
                className='shrink-0 px-3 text-[14px] font-semibold transition-colors duration-150'
                style={{
                  color: isActive || hoveredIdx === idx
                    ? accentColor
                    : isDark ? '#3a3a3a' : '#c0bbb5'
                }}
              >
                {isMobile ? '↓' : '›'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkProjectList;
