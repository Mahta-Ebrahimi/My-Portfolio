export default function ProjectIndex({ projects, activeIndex, setActiveIndex, previewIndex, setPreviewIndex }) {
  return (
    <nav
      aria-label="Project index"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 58,
        flexShrink: 0,
        paddingTop: 2,
      }}
    >
      {projects.map((proj, idx) => {
        const isActive = idx === activeIndex;
        const isPrev   = previewIndex === idx;

        return (
          <button
            key={proj.id}
            aria-label={`Project ${idx + 1}: ${proj.title}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => { setActiveIndex(idx); setPreviewIndex(null); }}
            onMouseEnter={() => setPreviewIndex(idx)}
            onMouseLeave={() => setPreviewIndex(null)}
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: isActive
                ? 'var(--g-accent, #14F1D9)'
                : isPrev
                ? 'rgba(128,128,148,0.7)'
                : 'rgba(128,128,148,0.3)',
              background: 'none',
              border: 'none',
              borderRight: `2px solid ${isActive ? 'var(--g-accent, #14F1D9)' : 'transparent'}`,
              cursor: 'pointer',
              padding: '11px 0',
              minHeight: 44,
              width: '100%',
              textAlign: 'center',
              transition: 'color 0.22s ease, border-color 0.22s ease',
              outline: 'none',
            }}
          >
            {String(idx + 1).padStart(2, '0')}
          </button>
        );
      })}
    </nav>
  );
}
