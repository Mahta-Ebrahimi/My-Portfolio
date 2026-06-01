const WorkProjectList = ({ projects, activeIndex, setActiveIndex }) => {

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col border-t border-[#1A1A1A]'>
        {projects.map((project, idx) => {
          const isActive = idx === activeIndex;
          const accentColor = project.badgeColor === '#00E5A0' ? '#00E5A0' : '#FF9533';

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center gap-0 border border-[#1A1A1A] border-t-0 cursor-pointer transition-all duration-150 ${
                isActive ? 'bg-[#111]' : 'bg-transparent hover:bg-[#0A0A0A]'
              }`}
              style={{ borderLeft: `4px solid ${isActive ? accentColor : '#1A1A1A'}` }}
            >
              {/* Badge column — fixed width so all badges align */}
              <div
                className='shrink-0 flex items-center justify-center px-2 py-4 w-[130px]'
              >
                <span
                  className='text-xs font-mono font-bold px-2 border w-full text-center leading-tight whitespace-normal flex items-center justify-center h-[40px]'
                  style={{ color: accentColor, borderColor: accentColor + '44' }}
                >
                  {project.badge}
                </span>
              </div>

              {/* Title + category */}
              <div className='flex-1 min-w-0 px-4 py-4'>
                <h4 className={`text-base font-bold leading-tight truncate ${isActive ? 'text-white' : 'text-[#666]'}`}>
                  {project.title}
                </h4>
                <p className='text-sm text-[#555] mt-0.5'>{project.category}</p>
              </div>

              {/* Arrow */}
              <span className={`shrink-0 px-4 text-base ${isActive ? 'text-white' : 'text-[#333]'}`}>←</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkProjectList;
