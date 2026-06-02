import { useTheme } from '../context/ThemeContext';

const WorkProjectList = ({ projects, activeIndex, setActiveIndex, cardHeight }) => {
  const { isDark } = useTheme();

  return (
    <div
      className='flex flex-col bg-[#111] overflow-y-auto'
      style={cardHeight ? { height: `${cardHeight}px` } : undefined}
    >
      <div className='flex flex-col border-t border-[#555]'>
        {projects.map((project, idx) => {
          const isActive = idx === activeIndex;
          const accentColor = project.badgeColor === '#00E5A0' ? '#00E5A0' : '#FF9533';
          const isGreen = accentColor === '#00E5A0';

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`group flex items-center border border-[#555] border-t-0 cursor-pointer transition-all duration-150 ${
                isActive
                  ? isGreen ? 'bg-[#051a0f]' : 'bg-[#1a0e00]'
                  : isGreen ? 'bg-transparent hover:bg-[#0a3520]' : 'bg-transparent hover:bg-[#351800]'
              }`}
              style={{
                borderLeft: `4px solid ${isActive ? accentColor : isDark ? '#2a2a2a' : '#d1d5db'}`,
              }}
            >
              {/* Badge column */}
              <div className='shrink-0 flex items-center justify-center px-2 py-4 w-[130px]'>
                <span
                  className='text-xs font-mono font-bold px-2 border w-full text-center leading-tight whitespace-normal flex items-center justify-center h-[40px]'
                  style={{ color: accentColor, borderColor: accentColor + '55' }}
                >
                  {project.badge}
                </span>
              </div>

              {/* Title + category */}
              <div className='flex-1 min-w-0 px-4 py-4'>
                <h4 className={`text-base font-bold leading-tight truncate transition-colors duration-150 ${
                  isActive
                    ? 'text-white'
                    : isDark
                      ? 'text-[#666] group-hover:text-[#ffffff]'
                      : 'text-[#666] group-hover:text-[#111111]'
                }`}>
                  {project.title}
                </h4>
                <p className='text-sm text-[#555] mt-0.5'>{project.category}</p>
              </div>

              {/* Active indicator */}
              <span
                className='shrink-0 px-4 text-sm'
                style={{ color: isActive ? accentColor : isDark ? '#333' : '#bbb' }}
              >
                {isActive ? '●' : '○'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkProjectList;
