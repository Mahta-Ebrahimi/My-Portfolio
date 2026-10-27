import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './atlas/atlas.css';
import { ACCENT, Reveal, SectionHeader } from './atlas/ui';
import HeroComposition from './atlas/HeroComposition';
import ColorArchitecture from './atlas/ColorArchitecture';
import Foundations from './atlas/Foundations';
import ComponentLibrary from './atlas/ComponentLibrary';
import DataComponentsSection from './atlas/DataComponents';
import Anatomy from './atlas/Anatomy';
import DashboardSection from './atlas/Dashboard';
import Handoff from './atlas/Handoff';

// ── Sidebar sections ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',        num: '01', label: 'Hero' },
  { id: 'overview',    num: '02', label: 'Overview' },
  { id: 'color',       num: '03', label: 'Color Architecture' },
  { id: 'foundations', num: '04', label: 'Typography & Layout' },
  { id: 'components',  num: '05', label: 'Component Library' },
  { id: 'data',        num: '06', label: 'Data Components' },
  { id: 'anatomy',     num: '07', label: 'Anatomy & Legend' },
  { id: 'dashboard',   num: '08', label: 'System in Action' },
  { id: 'handoff',     num: '09', label: 'Developer Handoff' },
  { id: 'outcome',     num: '10', label: 'Final Outcome' },
];

// ── Content data ──────────────────────────────────────────────────────────────
const META = [
  { field: 'Role',         value: 'UI Designer' },
  { field: 'Tools',        value: 'Figma' },
  { field: 'Project type', value: 'Independent concept' },
  { field: 'Focus',        value: 'Design systems · SaaS UI' },
];

const PRINCIPLES = [
  { num: '01', title: 'Consistent',  desc: 'One visual language across every screen, so similar things always look and behave the same.' },
  { num: '02', title: 'Accessible',  desc: 'Contrast, focus states and non-colour cues are designed into the tokens, not added afterwards.' },
  { num: '03', title: 'Reusable',    desc: 'Components are built once from tokens and composed into larger patterns.' },
  { num: '04', title: 'Documented',  desc: 'Every part has a name, a token and guidance, so design and development speak the same language.' },
];

const INVENTORY = [
  { value: '50', label: 'Primitive colours' },
  { value: '10', label: 'Semantic core tokens' },
  { value: '10', label: 'Type styles' },
  { value: '11', label: 'Spacing steps' },
  { value: '20+', label: 'Components' },
];

const OUTCOMES = [
  { title: 'A consistent visual language', desc: 'One palette, type scale and spacing rhythm shared by every component and screen.' },
  { title: 'Scalable component patterns', desc: 'Primitives such as buttons and inputs combine into complex patterns like the data table and dashboard.' },
  { title: 'Structured color architecture', desc: 'Primitive ramps and semantic tokens separate value from meaning, enabling light and dark themes from one component set.' },
  { title: 'Clear documentation principles', desc: 'Anatomy, legends, usage guidance and handoff specs that link design decisions to implementation.' },
  { title: 'Applied to a realistic SaaS dashboard', desc: 'The system holds together across a desktop dashboard and its tablet and mobile adaptations.' },
];

const NEXT_STEPS = [
  'Test the components and dashboard with people who work in data-heavy tools.',
  'Rebuild the library in code with a component workbench to validate the token structure.',
  'Extend the chart set with heatmaps, stacked areas and empty or loading states.',
];

// ── Main component ────────────────────────────────────────────────────────────
export default function Atlas() {
  const [active, setActive] = useState('hero');

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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="atlas flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR ══════════════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div className="sticky flex flex-col" style={{ top: '80px', height: 'calc(100vh - 80px)' }}>

          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A] shrink-0">
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">ATLAS</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">Enterprise Design System</p>
            <div className="flex gap-2">
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#140D24', color: '#C4B5FD', borderColor: '#A78BFA33' }}>Figma</span>
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#140D24', color: '#C4B5FD', borderColor: '#A78BFA33' }}>Concept</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 overflow-y-auto" aria-label="Case study contents">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#2A2440] mb-3 px-1">Contents</p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, num, label }) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      aria-current={on ? 'true' : undefined}
                      className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-lg text-left transition-all duration-150 group ${on ? 'bg-[#111]' : 'hover:bg-[#0D0D0D]'}`}
                    >
                      <span className="font-mono text-[12px] shrink-0 tabular-nums" style={{ color: on ? ACCENT : '#2E2840' }}>{num}</span>
                      <span className={`text-[13px] font-medium leading-tight truncate ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>{label}</span>
                      {on && <div className="ml-auto w-[3px] h-3 rounded-full shrink-0" style={{ background: ACCENT }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3 shrink-0">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2A2440] mb-1">Role</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">UI Designer</p>
            </div>
            <a href="/#work" className="flex items-center justify-center gap-2 w-full text-[13px] font-semibold py-2 rounded-lg border border-[#2A2A2A] text-[#9CA3AF] hover:text-white hover:border-[#444] transition-colors">
              <FaArrowLeft style={{ fontSize: '9px' }} /> All projects
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 xl:px-12 py-8 sm:py-12 pb-24">

          {/* ── 01 HERO ──────────────────────────────────────────── */}
          <section id="hero" className="mb-28 md:mb-36 scroll-mt-24">
            <div className="relative rounded-[28px] overflow-hidden at-hero-grid px-5 sm:px-10 xl:px-14 pt-10 sm:pt-14 pb-8 sm:pb-12" style={{ background: '#0F172A', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)' }}>
              <div aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-10%', top: '-20%', width: '70%', height: '80%', background: 'radial-gradient(closest-side, rgba(124,58,237,.28), transparent)' }} />

              <Reveal className="relative">
                <p className="font-mono text-[12px] sm:text-[13px] tracking-[0.22em] uppercase mb-6" style={{ color: '#C4B5FD' }}>
                  UI Design <span className="text-[#475569]">/</span> Design System <span className="text-[#475569]">/</span> SaaS
                </p>
                <h1 className="font-extrabold leading-[0.88]" style={{ color: '#FFFFFF', fontSize: 'clamp(76px, 15vw, 184px)', letterSpacing: '-0.055em' }}>
                  ATLAS
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-end mt-6 sm:mt-8">
                  <div>
                    <p className="font-light tracking-[-0.02em]" style={{ color: '#FFFFFF', fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.15 }}>
                      Enterprise Design System
                    </p>
                    <p className="text-[#94A3B8] text-[17px] sm:text-[19px] leading-[1.6] mt-3 max-w-[560px]">
                      A scalable visual language for modern SaaS applications.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 self-start lg:self-end text-[12px] font-semibold px-3 py-1.5 rounded-full" style={{ color: '#C4B5FD', background: 'rgba(124,58,237,.14)', border: '1px solid rgba(167,139,250,.3)' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#A78BFA' }} />Independent concept project
                  </span>
                </div>

                <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 mt-10 sm:mt-12">
                  {META.map(({ field, value }) => (
                    <div key={field} className="py-4 sm:py-5" style={{ borderTop: '1px solid rgba(148,163,184,.22)' }}>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#64748B] mb-1.5">{field}</dt>
                      <dd className="text-[15px] sm:text-[16px] font-medium" style={{ color: '#F8FAFC' }}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="relative mt-6 sm:mt-10" delay={150}>
                <HeroComposition />
              </Reveal>
            </div>
          </section>

          {/* ── 02 OVERVIEW ──────────────────────────────────────── */}
          <section id="overview" className="mb-28 md:mb-36 scroll-mt-24">
            <SectionHeader num="02" label="Project Overview" title="Building consistency at scale" />

            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-[20px] overflow-hidden mb-14" style={{ background: 'var(--page-line)', border: '1px solid var(--page-line)' }}>
              <div className="bg-[#0A0A0A] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>The challenge</p>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ color: '#C4B5FD', background: 'rgba(124,58,237,.14)' }}>Conceptual scenario</span>
                </div>
                <p className="text-[#D1D5DB] text-[17px] leading-[1.7]">
                  Modern SaaS products often contain complex interfaces, data-heavy screens and many reusable UI patterns. Without a shared design language, visual inconsistencies can emerge across components and workflows.
                </p>
              </div>
              <div className="bg-[#0A0A0A] p-6 sm:p-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] mb-4" style={{ color: ACCENT }}>The objective</p>
                <p className="text-[#D1D5DB] text-[17px] leading-[1.7]">
                  Explore a scalable visual foundation that supports consistency, accessibility, reusability and clear communication between design and development, demonstrated through a modern analytics dashboard.
                </p>
              </div>
            </Reveal>

            <h3 className="text-white text-[20px] font-semibold mb-6">Design principles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 mb-14">
              {PRINCIPLES.map(({ num, title, desc }, i) => (
                <Reveal key={num} delay={i * 70} className="pt-5 pb-8" style={{ borderTop: `2px solid ${i === 0 ? '#7C3AED' : 'var(--page-line)'}` }}>
                  <p className="font-mono text-[12px] mb-3" style={{ color: ACCENT }}>{num}</p>
                  <p className="text-white text-[18px] font-semibold mb-2">{title}</p>
                  <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{desc}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="rounded-[20px] p-6 sm:p-8" style={{ background: 'var(--page-panel)', border: '1px solid var(--page-line)' }}>
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] mb-6" style={{ color: '#6B7280' }}>System inventory</p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6">
                {INVENTORY.map(({ value, label }) => (
                  <li key={label}>
                    <p className="text-white font-bold tabular-nums leading-none" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', letterSpacing: '-0.04em' }}>{value}</p>
                    <p className="text-[#9CA3AF] text-[14px] mt-2">{label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <ColorArchitecture />
          <Foundations />
          <ComponentLibrary />
          <DataComponentsSection />
          <Anatomy />
          <DashboardSection />
          <Handoff />

          {/* ── 10 FINAL OUTCOME ─────────────────────────────────── */}
          <section id="outcome" className="mb-8 scroll-mt-24">
            <SectionHeader num="10" label="Final Outcome" title="A unified foundation for complex interfaces">
              <p>
                ATLAS brings colour, typography, layout, components and documentation together into one coherent system. The concept demonstrates:
              </p>
            </SectionHeader>

            <ol className="mb-16" style={{ borderTop: '1px solid var(--page-line)' }}>
              {OUTCOMES.map(({ title, desc }, i) => (
                <Reveal as="li" key={title} delay={i * 60} className="grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_1.2fr] gap-x-4 gap-y-1 py-6 md:py-7 items-baseline" style={{ borderBottom: '1px solid var(--page-line)' }}>
                  <span className="font-mono text-[13px] tabular-nums" style={{ color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-white text-[18px] md:text-[22px] font-semibold tracking-[-0.01em]">{title}</p>
                  <p className="col-start-2 md:col-start-3 text-[#9CA3AF] text-[15px] leading-[1.65]">{desc}</p>
                </Reveal>
              ))}
            </ol>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              <Reveal className="rounded-[20px] p-6 sm:p-8" style={{ background: 'var(--page-panel)', border: '1px solid var(--page-line)' }}>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] mb-4" style={{ color: ACCENT }}>About this concept</p>
                <p className="text-[#9CA3AF] text-[15px] leading-[1.7]">
                  ATLAS is a self-initiated project designed in Figma. It has not been tested with users, used by a client, or implemented in production. The examples on this page are recreated in HTML and CSS to present the system interactively, and all data shown is illustrative.
                </p>
              </Reveal>
              <Reveal className="rounded-[20px] p-6 sm:p-8" delay={80} style={{ background: 'var(--page-panel)', border: '1px solid var(--page-line)' }}>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] mb-4" style={{ color: ACCENT }}>Next steps</p>
                <ul className="space-y-3">
                  {NEXT_STEPS.map((s, i) => (
                    <li key={s} className="flex gap-3 text-[#9CA3AF] text-[15px] leading-[1.6]">
                      <span className="font-mono text-[12px] mt-1 shrink-0" style={{ color: '#4B5563' }}>{String(i + 1).padStart(2, '0')}</span>{s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="mt-16 pt-8 border-t border-[#1A1A1A]">
              <a href="/#work" className="flex items-center gap-2 text-[#6B7280] hover:text-white transition-colors text-[14px]">
                <FaArrowLeft style={{ fontSize: '11px' }} /> Back to Work
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
