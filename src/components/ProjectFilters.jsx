const FILTERS = ['All', 'AI/ML', 'Banking', 'SaaS', 'Mobile', 'Web App'];

export default function ProjectFilters({ active, setActive }) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
    >
      {FILTERS.map(f => {
        const isOn = f === active;
        return (
          <button
            key={f}
            aria-pressed={isOn}
            onClick={() => setActive(f)}
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isOn ? 'var(--g-accent, #14F1D9)' : 'var(--g-secondary, #A1A1AA)',
              background: isOn ? 'var(--g-accent-bg, rgba(20,241,217,0.05))' : 'transparent',
              border: `1px solid ${isOn ? 'var(--g-accent-border, rgba(20,241,217,0.22))' : 'var(--g-border, rgba(255,255,255,0.07))'}`,
              borderRadius: 'var(--g-pill, 50px)',
              padding: '8px 18px',
              cursor: 'pointer',
              transition: 'color 0.22s ease, background 0.22s ease, border-color 0.22s ease',
              outline: 'none',
            }}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
