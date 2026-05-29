const WorkHeader = ({ filter, setFilter, setActiveIndex }) => {
  return (
    <div className='mb-8 md:mb-12'>
      {/* Title + subtitle centered */}
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none text-center mb-2'>My Work</h1>
      <p className='text-[#444] text-sm text-center mb-6'>Click a project to explore</p>

      {/* Filter tabs — wrap on mobile */}
      <div className='flex flex-wrap justify-center md:justify-end gap-2'>
        {['all', 'uiux', 'frontend'].map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setActiveIndex(0); }}
            className={`px-5 py-2 text-xs font-bold tracking-wider border transition-colors ${
              filter === f
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-[#555] border-[#2A2A2A] hover:border-[#555] hover:text-[#999]'
            }`}
          >
            {f === 'all' ? 'All' : f === 'uiux' ? 'UI/UX' : 'Frontend'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkHeader;
