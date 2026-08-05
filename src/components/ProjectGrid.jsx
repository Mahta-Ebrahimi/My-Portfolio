import { useState, useMemo } from 'react';
// import ProjectFilters from './ProjectFilters';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const visible = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p =>
      Array.isArray(p.filterCategory)
        ? p.filterCategory.includes(activeFilter)
        : p.filterCategory === activeFilter
    );
  }, [projects, activeFilter]);

  return (
    <section
      aria-label="Project Library"
      style={{
        marginTop: 100,
        paddingTop: 72,
        borderTop: '1px solid var(--g-border, rgba(255,255,255,0.09))',
      }}
    >
      {/* Section heading + filters */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          marginBottom: 48,
          textAlign: 'center',
        }}
      >
        <h2 style={{
          fontSize: 'clamp(24px, 2vw, 36px)',
          fontWeight: 700,
          color: 'var(--g-text, #FFFFFF)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Project Library
        </h2>
        {/* <ProjectFilters active={activeFilter} setActive={setActiveFilter} /> */}
      </div>

      {/* Grid */}
      <div className="proj-grid">
        {visible.map(proj => (
          <ProjectCard key={proj.id} proj={proj} />
        ))}
      </div>

      {visible.length === 0 && (
        <p style={{
          textAlign: 'center',
          color: 'var(--g-subtle, #52526A)',
          fontSize: 14,
          padding: '60px 0',
        }}>
          No projects in this category.
        </p>
      )}
    </section>
  );
}
