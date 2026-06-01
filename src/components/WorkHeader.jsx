const WorkHeader = ({ filter, setFilter, setActiveIndex }) => {
  return (
    <div className='mb-8 md:mb-12'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none text-center mb-3'>My Work</h1>

      {/* Visible hint */}
      <p className='text-[#9CA3AF] text-base text-center mb-6 font-medium'>
        Click a project to explore
      </p>

      <div className='flex flex-col items-center md:items-end gap-4'>
        {/* Filter tabs */}
        <div className='flex flex-wrap justify-center md:justify-end gap-2'>
          {['all', 'uiux', 'frontend'].map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setActiveIndex(0); }}
              className={`px-6 py-2.5 text-sm font-bold tracking-wider border transition-colors ${
                filter === f
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-[#666] border-[#2A2A2A] hover:border-[#555] hover:text-[#999]'
              }`}
            >
              {f === 'all' ? 'All' : f === 'uiux' ? 'UI / UX' : 'Frontend'}
            </button>
          ))}
        </div>

        {/* Color legend */}
        <div className='flex flex-wrap justify-center md:justify-end gap-5'>
          <div className='flex items-center gap-2'>
            <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#00E5A0' }} />
            <span className='text-sm text-[#9CA3AF]'>AI Projects</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2.5 h-2.5 rounded-full' style={{ background: '#FF9533' }} />
            <span className='text-sm text-[#9CA3AF]'>UI/UX & Frontend</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHeader;
