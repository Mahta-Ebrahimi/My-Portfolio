import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkHeader          from './WorkHeader';
import MeshBackground      from './MeshBackground';
import ProjectIndex        from './ProjectIndex';
import FeaturedProjectCard from './FeaturedProjectCard';
import ProjectGrid         from './ProjectGrid';

import matchMeHIFI    from '../assets/MatchMeHIFI.png';
import detectAI       from '../assets/DashboardAI.png';
import pawpal         from '../assets/HIFIPawpal.png';
import chatbot        from '../assets/Chatbot.png';
import portfolio1     from '../assets/portfolio1.png';
import selskabslokale from '../assets/UI1.png';
import danskeBank     from '../assets/danskeBank.png';
import wordPress      from '../assets/wordpress2.png';

export const PROJECTS = [
  {
    id: 1,
    title: 'MatchMe App',
    navCategory: 'AI · Desktop UX/UI',
    category: 'AI Service Matchmaking',
    filterCategory: 'AI/ML',
    description: 'AI-assisted compatibility matching for local services. A preference quiz builds a user model; the platform surfaces ranked helpers with clear reasoning behind each result.',
    year: '2025', role: 'UI/UX Designer',
    badge: 'AI Matchmaking', badgeColor: '#00E5A0',
    tools: ['Figma', 'AI Features', 'UX Research', 'Prototyping'],
    image: matchMeHIFI, type: 'uiux', route: '/work/matchme',
  },
  {
    id: 2,
    title: 'Detect AI Security',
    navCategory: 'AI · Desktop UX/UI',
    category: 'AI Security Platform',
    filterCategory: 'AI/ML',
    description: 'AI-powered platform for SOC analysts. Threat signals correlate automatically, anomalies are flagged in context, and response workflows surface actionable alerts.',
    year: '2025', role: 'UI/UX Designer',
    badge: 'AI Security', badgeColor: '#00E5A0',
    tools: ['Figma', 'AI Systems', 'Product Design', 'Automation'],
    image: detectAI, type: 'uiux', route: '/work/secureflow',
  },
  {
    id: 3,
    title: 'PawPal App',
    navCategory: 'Mobile App',
    category: 'Mobile UX/UI',
    filterCategory: 'Mobile',
    description: 'Mobile app connecting pet owners with trusted vets, groomers, and walkers. Designed around trust, location-based discovery, and frictionless booking.',
    year: '2024', role: 'UI/UX Designer',
    badge: 'Mobile UX/UI', badgeColor: '#A78BFA',
    tools: ['Figma', 'UX Research', 'Prototyping', 'UI Design'],
    image: pawpal, type: 'uiux', route: '/work/pawpal',
  },
  {
    id: 4,
    title: 'AI Chatbot App',
    navCategory: 'AI · Full-Stack',
    category: 'AI + Full-Stack Development',
    filterCategory: 'AI/ML',
    description: 'Full-stack conversational AI built with React, Node.js, and OpenAI. Features context retention, session memory, and a custom-designed chat interface.',
    year: '2024', role: 'Designer & Developer',
    badge: 'AI + Full-Stack', badgeColor: '#38BDF8',
    tools: ['React', 'Node.js', 'OpenAI', 'Tailwind'],
    image: chatbot, type: ['uiux', 'frontend'], route: '/work/chatbot',
  },
  {
    id: 5,
    title: 'My Portfolio',
    navCategory: 'UX/UI · React',
    category: 'Portfolio Design & Development',
    filterCategory: 'Web App',
    description: 'Designed in Figma and built in React with a dark/light theme system and smooth scroll navigation. The portfolio itself is a design case study.',
    year: '2025', role: 'Designer & Developer',
    badge: 'UX/UI + React', badgeColor: '#A78BFA',
    tools: ['Figma', 'React', 'Tailwind'],
    image: portfolio1, type: ['uiux', 'frontend'], route: '/work/portfolio',
  },
  {
    id: 6,
    title: 'Selskabslokale',
    navCategory: 'UX Research',
    category: 'UX Research & SEO Analysis',
    filterCategory: 'SaaS',
    description: 'UX research, heatmap analysis, and SEO audit for a Danish venue booking platform. Identified high-drop points in the booking flow and proposed validated improvements.',
    year: '2024', role: 'UX Researcher',
    badge: 'UX Research', badgeColor: '#F59E0B',
    tools: ['Figma', 'Research', 'Heatmaps', 'SEO'],
    image: selskabslokale, type: 'uiux', route: '/work/selskabslokale',
  },
  {
    id: 7,
    title: 'Bank DevSec AI',
    navCategory: 'AI Product',
    category: 'AI Product Design',
    filterCategory: 'Banking',
    description: 'AI-assisted DevSecOps dashboard for a banking environment. Surfaces CI/CD pipeline vulnerabilities in real time with prioritised, contextual remediation guidance.',
    year: '2025', role: 'UI/UX Designer',
    badge: 'AI Product', badgeColor: '#00E5A0',
    tools: ['Figma', 'React', 'TypeScript'],
    image: danskeBank, type: ['uiux', 'frontend'], route: '/work/danske-bank',
  },
  {
    id: 8,
    title: 'Soulimous',
    navCategory: 'WordPress',
    category: 'Web Design & Development',
    filterCategory: 'Web App',
    description: 'Custom WordPress site designed and built for an artist. The visual identity, layout, and content structure all reflect the artist\'s personal aesthetic.',
    year: '2024', role: 'Designer & Developer',
    badge: 'WordPress', badgeColor: '#6B7280',
    tools: ['WordPress', 'CMS', 'UI Design'],
    image: wordPress, type: ['uiux', 'frontend'], route: '/work/soulimous',
  },
];

/* ── Mobile project card (< lg) ─────────────────────────────── */
function MobileCard({ proj }) {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);
  const go = () => proj.external ? window.open(proj.route, '_blank') : navigate(proj.route);

  return (
    <article
      onClick={go}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--g-surface, rgba(12,18,24,0.78))',
        border: `1px solid ${hov ? 'rgba(20,241,217,0.22)' : 'var(--g-border, rgba(255,255,255,0.09))'}`,
        borderRadius: 'var(--g-radius, 24px)',
        overflow: 'hidden',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'border-color 0.28s ease, transform 0.28s ease',
        transform: hov ? 'translateY(-4px)' : 'none',
        marginBottom: 16,
      }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={proj.image} alt={proj.title} loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: 'top center',
            transform: hov ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.45s ease',
          }}
        />
      </div>
      <div style={{ padding: '22px 24px 26px' }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--g-accent, #14F1D9)', margin: '0 0 8px' }}>
          {proj.category}
        </p>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--g-text, #FFFFFF)', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          {proj.title}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--g-secondary, #A1A1AA)', margin: '0 0 18px' }}>
          {proj.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
          {proj.tools.map(t => (
            <span key={t} style={{
              fontSize: 9, padding: '3px 8px', borderRadius: 5,
              border: '1px solid var(--g-border, rgba(255,255,255,0.07))', color: 'var(--g-secondary, #A1A1AA)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>{t}</span>
          ))}
        </div>
        <button onClick={go} style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--g-accent, #14F1D9)', border: '1px solid var(--g-accent-border, rgba(20,241,217,0.22))', padding: '10px 22px',
          borderRadius: 50, background: 'var(--g-accent-bg, rgba(20,241,217,0.05))', cursor: 'pointer',
        }}>
          View Case Study →
        </button>
      </div>
    </article>
  );
}

/* ── Projects Showcase ───────────────────────────────────────── */
export default function Work() {
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [previewIndex, setPreviewIndex] = useState(null);

  const displayIndex = previewIndex ?? activeIndex;

  return (
    <div name="work" id="work" style={{ minHeight: '100vh', paddingBottom: 100 }}>
      <div style={{ maxWidth: 1500, margin: '0 auto', padding: '80px 32px 0' }}>
        <WorkHeader />

        {/* ── Desktop: Project Index + Featured Card (lg+) ──── */}
        <div
          className="hidden lg:flex"
          style={{ position: 'relative', gap: 20, alignItems: 'stretch', maxWidth: '70%', margin: '0 auto' }}
        >
          {/* Mesh background — covers the featured area */}
          <MeshBackground
            maskPosition="65% 50%"
            style={{ borderRadius: 28, zIndex: 0 }}
          />

          {/* Project Index */}
          <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <ProjectIndex
              projects={PROJECTS}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              previewIndex={previewIndex}
              setPreviewIndex={setPreviewIndex}
            />
          </div>

          {/* Featured Card */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, minWidth: 0 }}>
            <FeaturedProjectCard project={PROJECTS[displayIndex]} />
          </div>
        </div>

        {/* ── Mobile (< lg) ──────────────────────────────────── */}
        <div className="lg:hidden">
          {/* Number selector pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                  padding: '7px 14px', borderRadius: 50,
                  border: `1px solid ${idx === activeIndex ? 'rgba(20,241,217,0.35)' : 'rgba(255,255,255,0.09)'}`,
                  background: idx === activeIndex ? 'rgba(20,241,217,0.07)' : 'transparent',
                  color: idx === activeIndex ? '#14F1D9' : '#52526A',
                  cursor: 'pointer', transition: 'all 0.22s ease',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
          <MobileCard proj={PROJECTS[activeIndex]} />
        </div>

        {/* ── All Projects grid (all breakpoints) ─────────────── */}
        <ProjectGrid projects={PROJECTS} />
      </div>
    </div>
  );
}
