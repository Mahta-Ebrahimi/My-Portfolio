import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import portfolio1 from '../assets/portfolio1.png';
import portfolio2 from '../assets/portfolio2.png';
import { getProjectNavigation } from '../data/projectNavigation';

const ACCENT = '#A78BFA';

const SECTIONS = [
  { id: 'overview',    num: '01', label: 'Overview' },
  { id: 'design',      num: '02', label: 'Design Process' },
  { id: 'frontend',    num: '03', label: 'Frontend Build' },
  { id: 'features',    num: '04', label: 'Key Features' },
  { id: 'reflection',  num: '05', label: 'Reflection' },
];

const DESIGN_DECISIONS = [
  {
    icon: '◼',
    title: 'Dark Minimal Aesthetic',
    desc: 'Black-first palette with controlled accent colors — each project section gets its own hue to signal context without noise.',
  },
  {
    icon: '▲',
    title: 'Typography as Structure',
    desc: 'Tiny uppercase tracking labels, large bold headlines, and muted body text create strong hierarchy without extra UI elements.',
  },
  {
    icon: '⊞',
    title: 'Sidebar Navigation Pattern',
    desc: 'Sticky sidebar with scroll-tracked active state — borrowed from developer documentation to signal precision and technical depth.',
  },
  {
    icon: '◎',
    title: '3D Card Stack on Work Page',
    desc: 'A layered card stack with depth offsets makes project browsing tactile — designed before a single line of code was written.',
  },
];

const TECH_STACK = [
  { name: 'React', note: 'Component-based SPA with React Router' },
  { name: 'Tailwind CSS', note: 'Utility-first styling, zero custom CSS files' },
  { name: 'React Router', note: 'Client-side routing for each project page' },
  { name: 'IntersectionObserver', note: 'Scroll-tracked sidebar highlights' },
  { name: 'Figma', note: 'Full hi-fi design before development started' },
  { name: 'Vercel', note: 'Continuous deployment from GitHub' },
];

const COMPONENTS = [
  { name: 'WorkCardStack', desc: 'Layered 3D card carousel with depth offsets and smooth transitions' },
  { name: 'WorkProjectList', desc: 'Synchronized list that mirrors the active card and filters by type' },
  { name: 'WorkHeader', desc: 'Filter tabs (All / UI·UX / Frontend) that reset active index' },
  { name: 'Skills', desc: 'Animated skill grid with hover interactions and category grouping' },
  { name: 'Navbar', desc: 'Scroll-aware transparent-to-solid transition with anchor smooth scroll' },
];

const FEATURES = [
  { num: '01', title: 'Dual discipline showcase', desc: 'Separate filter tabs for UI/UX and Frontend projects — designed so both audiences (designers and developers) instantly find relevant work.' },
  { num: '02', title: 'Per-project case study pages', desc: 'Every major project has its own route with a sticky sidebar, scroll-tracked table of contents, and prev/next navigation.' },
  { num: '03', title: 'Design-before-code workflow', desc: 'Every layout was prototyped in Figma before touching JSX — visible in the consistent spacing rhythm and component boundaries.' },
  { num: '04', title: 'Responsive across breakpoints', desc: 'Mobile-first Tailwind classes with lg: overrides. The card stack collapses to a single-column list on small screens.' },
  { num: '05', title: 'Zero UI library dependencies', desc: 'No component library used — every card, sidebar, and animation is custom-built to match the exact design intent.' },
];

const LEARNINGS = [
  { num: '01', title: 'Wearing both hats is a superpower', desc: 'Designing something you will also build removes the designer-developer gap entirely — handoff friction disappears when you are both.' },
  { num: '02', title: 'Constraints produce better design', desc: 'Committing to Tailwind-only styling forced precision. Every spacing decision had to map to the 4pt scale, which created consistency.' },
  { num: '03', title: 'The sidebar pattern earns trust', desc: 'Long-form project pages needed navigation. Sticky sidebars with scroll tracking — borrowed from docs — signal that content has depth.' },
];

export default function Portfolio() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('overview');
  const { prev, next } = getProjectNavigation(location.pathname);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR ═══════════════════════════════════════════════ */}
      <div className="w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div
          className="sticky flex flex-col overflow-y-auto"
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {/* Project identity */}
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: '14px' }}>◈</span>
              <h2 className="text-white font-bold text-[14px] leading-tight">Portfolio</h2>
            </div>
            <p className="text-[#4B5563] text-[11px] mb-3">UI/UX + Frontend · 2024</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#0e0a1a' }}>
                React
              </span>
              <span className="text-[10px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#0e0a1a' }}>
                Figma
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-3 px-1" style={{ color: '#2A2A2A' }}>
              Contents
            </p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, num, label }) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-3 px-2 py-[7px] rounded-lg text-left transition-all duration-150 group ${on ? 'bg-[#111]' : 'hover:bg-[#0D0D0D]'}`}
                    >
                      <span className="font-mono text-[9px] shrink-0 tabular-nums" style={{ color: on ? ACCENT : '#2A2A2A' }}>
                        {num}
                      </span>
                      <span className={`text-[11px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-4 rounded-full shrink-0" style={{ background: ACCENT }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Meta + CTA */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3">
            <div className="space-y-2">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#2A2A2A] mb-0.5">Role</p>
                <p className="text-[11px] text-[#9CA3AF]">UI/UX Designer & Frontend Dev</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#2A2A2A] mb-0.5">Stack</p>
                <p className="text-[11px] text-[#9CA3AF]">React · Tailwind · Figma</p>
              </div>
            </div>
            <a
              href="https://github.com/Mahta-Ebrahimi/My-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[11px] font-bold border transition-colors hover:text-white hover:border-white"
              style={{ color: ACCENT, borderColor: ACCENT + '66' }}
            >
              <FaGithub size={11} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-8 py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>01 — Overview</p>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">My Portfolio</h1>
            <p className="text-xl text-[#6B7280] font-light mb-6">Designed in Figma. Built in React.</p>

            <div className="overflow-hidden border border-[#1A1A1A] mb-8 rounded-lg">
              <img src={portfolio1} alt="Portfolio Screenshot" className="w-full object-cover" />
            </div>

            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              This portfolio is the one project where I owned every decision — from the first wireframe
              in Figma to the final deployed component in React. It is both a design artifact and a
              working codebase, and the constraints of each discipline directly shaped the other.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '100%', label: 'Custom — no UI library' },
                { value: '2', label: 'Disciplines: Design + Dev' },
                { value: '8+', label: 'Project case study pages' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-2xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Design Process */}
          <section id="design" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>02 — Design Process</p>
            <h2 className="text-2xl font-bold text-white mb-4">UI/UX Thinking</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The design started with a clear audience problem: a portfolio needs to speak to two very
              different readers — a designer and a developer — without losing either. The solution was
              an explicit filter system and per-project case study pages that can go as deep as needed.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {DESIGN_DECISIONS.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 border border-[#222]">
                  <span className="text-lg mb-3 block" style={{ color: ACCENT }}>{icon}</span>
                  <p className="text-white text-sm font-semibold mb-2">{title}</p>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* <div className="overflow-hidden border border-[#1A1A1A] rounded-lg mb-6">
              <img src={portfolio2} alt="Portfolio Design Detail" className="w-full object-cover" />
            </div> */}

            {/* <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "Design the thing before you build it — even when you are both the designer and the developer."
              </p>
            </blockquote> */}
          </section>

          {/* 03 — Frontend Build */}
          <section id="frontend" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>03 — Frontend Build</p>
            <h2 className="text-2xl font-bold text-white mb-4">React Architecture</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The codebase is a single-page React application with client-side routing. Each project
              detail page is an independent component — same layout shell, different content and accent
              color — keeping code DRY while allowing complete per-project customization.
            </p>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Stack</p>
              <div className="grid grid-cols-2 gap-3">
                {TECH_STACK.map(({ name, note }) => (
                  <div key={name} className="bg-[#0D0D0D] border border-[#1A1A1A] px-4 py-3 flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
                    <div>
                      <p className="text-white text-[12px] font-semibold">{name}</p>
                      <p className="text-[#4B5563] text-[10px] leading-relaxed mt-0.5">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key components */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Key Components</p>
              <ul className="space-y-0">
                {COMPONENTS.map(({ name, desc }, i) => (
                  <li key={name} className={`flex items-start gap-4 py-4 ${i < COMPONENTS.length - 1 ? 'border-b border-[#111]' : ''}`}>
                    <code className="text-[11px] font-mono shrink-0 mt-0.5" style={{ color: ACCENT }}>{name}</code>
                    <p className="text-[#9CA3AF] text-[12px] leading-relaxed">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 04 — Key Features */}
          <section id="features" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>04 — Key Features</p>
            <h2 className="text-2xl font-bold text-white mb-8">What Makes It Work</h2>
            <ul className="space-y-0">
              {FEATURES.map(({ num, title, desc }, i) => (
                <li key={num} className={`flex items-start gap-5 py-5 ${i < FEATURES.length - 1 ? 'border-b border-[#111]' : ''}`}>
                  <span className="font-mono text-[11px] shrink-0 mt-0.5 tabular-nums" style={{ color: ACCENT }}>{num}</span>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[12px] leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 05 — Reflection */}
          <section id="reflection" className="mb-8">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>05 — Reflection</p>
            <h2 className="text-2xl font-bold text-white mb-8">Key Learnings</h2>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold font-mono mb-4 leading-none" style={{ color: '#1A1A2E' }}>{num}</p>
                  <p className="text-white font-semibold text-sm mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* GitHub CTA */}
            <div className="rounded-xl p-8 text-center border mb-12" style={{ borderColor: ACCENT + '33', background: '#0a0614' }}>
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>Source Code</p>
              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
                Full source available on GitHub — React components, Tailwind config, routing setup
              </p>
              <a
                href="https://github.com/Mahta-Ebrahimi/My-Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg transition-colors text-sm"
                style={{ background: ACCENT, color: '#0D0D0D' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <FaGithub size={14} /> View on GitHub
              </a>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A]">
              <button onClick={() => navigate('/#work')} className="text-xs text-[#6B7280] hover:text-white transition-colors">
                ← Back to Work
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
