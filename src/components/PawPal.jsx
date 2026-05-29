import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import pawpalImg from '../assets/HIFIPawpal.png';
import ColorPallete from '../assets/paepalColorPalet.png';
import { getProjectNavigation } from '../data/projectNavigation';
import LoFIPawpal from '../assets/LOFIPawpal.png';
import pawpalComponents from '../assets/PawPalComponents.png';

const SECTIONS = [
  { id: 'overview',      num: '01', label: 'Overview' },
  { id: 'problem',       num: '02', label: 'Problem & Solution' },
  { id: 'research',      num: '03', label: 'Research' },
  { id: 'visual',        num: '04', label: 'Design System &Component Library' },
  { id: 'wireframes',    num: '05', label: 'Wireframes' },
  { id: 'hifi',          num: '06', label: 'Hi-Fi Design' },
  // { id: 'design-system', num: '07', label: 'Design System' },
  { id: 'learnings',     num: '07', label: 'Key Learnings' },
];

const PERSONAS = [
  {
    name: 'Anna & Julia', age: '42 & 40', role: 'Family · Dog owners',
    goals: ['Family-friendly sitters they fully trust', 'Photos & media updates during long trips', 'Confidence looking for active sitters'],
    pain:  ['Nervous leaving Luna with strangers', 'Needs high personality match for Luna', 'Time-sensitive with family to support'],
  },
  {
    name: 'Emma', age: '28', role: 'Single · Spontaneous',
    goals: ['Quick affordable bookings — no fuss', 'Exercise and affection for her dog', 'Trust through verified reviews'],
    pain:  ['Sudden trips cause stress and panic', 'Distrusts strangers without social proof', 'Hates clunky booking flows'],
  },
];

const PRINCIPLES = [
  { icon: '✦', title: 'Clarity',          desc: 'One clear outcome per screen' },
  { icon: '◎', title: 'Accessibility',    desc: 'Contrast ratios, large touch targets' },
  { icon: '♡', title: 'Emotional warmth', desc: 'Reduced friction and anxiety' },
  { icon: '⊞', title: 'Grid spacing',     desc: 'Consistent 4pt rhythm throughout' },
];

const FEATURES = [
  { icon: '🔍', title: 'Browse & Filter', desc: 'Dates, service type, price' },
  { icon: '🐾', title: 'Sitter Profiles', desc: 'Photos, services, reviews' },
  { icon: '📅', title: 'Easy Booking',    desc: 'Dates, service type, dog info' },
  { icon: '💬', title: 'Messaging',       desc: 'Real-time updates during stay' },
];

const COLORS = [
  { hex: '#4A6741', label: 'Primary' },
  { hex: '#2D3F2C', label: 'Dark' },
  { hex: '#8B7355', label: 'Warm' },
  { hex: '#F5F0E8', label: 'BG' },
  { hex: '#E8E0D0', label: 'Light' },
];

const LEARNINGS = [
  { num: '01', title: 'Trust is the product',      desc: 'Every screen was evaluated: does the user trust enough to leave their dog? Simplicity guided everything.' },
  { num: '02', title: 'Fewer choices, more flow',  desc: 'A cleaner navigation map kept users linear — fewer decision points meant better conversion and less anxiety.' },
  { num: '03', title: 'Research shapes components', desc: 'Persona insights directly influenced navigation structure, search priorities, and every component decision.' },
];

const DS_TAGS = ['Components', 'Forms', 'Icons', 'Booking', 'Payment', 'Navigation'];

export default function PawPal() {
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
    /* paddingTop pushes content below the fixed 80px navbar */
    <div className="flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR WRAPPER — full-height, not sticky ═══════════ */}
      {/* The wrapper stretches full page height so bg fills completely */}
      <div className="w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        {/* Inner sticky panel — stays in viewport */}
        <div
          className="sticky flex flex-col overflow-y-auto"
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {/* Project identity */}
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: '14px' }}>🐾</span>
              <h2 className="text-white font-bold text-[14px] leading-tight">PawPal</h2>
            </div>
            <p className="text-[#4B5563] text-[11px] mb-3">Mobile App · UI/UX</p>
            <div className="flex gap-2">
              <span className="text-[10px] bg-[#0F2318] text-[#4ADE80] px-2 py-1 rounded-md border border-[#4ADE80]/20">Figma</span>
              {/* <span className="text-[10px] bg-[#0D0D0D] text-[#4B5563] px-2 py-1 rounded-md border border-[#1A1A1A]">2024</span> */}
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#1F2D1A] mb-3 px-1">
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
                      <span className={`font-mono text-[9px] shrink-0 tabular-nums ${on ? 'text-[#4ADE80]' : 'text-[#1F2D1A] group-hover:text-[#374151]'}`}>
                        {num}
                      </span>
                      <span className={`text-[11px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-4 bg-[#4ADE80] rounded-full shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Meta + CTA */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-4">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[#1F2D1A] mb-1">Role</p>
              <p className="text-[11px] text-[#9CA3AF] leading-tight">UI/UX Designer</p>
            </div>
            <a
              href="https://www.figma.com/proto/hr07ubZBbbWwdw2kWrwJGD/Mahta-Ebrahimi?node-id=326-4264&t=nK5Mq8QwGYZAuGdV-1&scaling=min-zoom&content-scaling=fixed&page-id=37%3A23&starting-point-node-id=326%3A4415&show-proto-sidebar=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#4ADE80] text-[#0D1117] text-[11px] font-bold py-2 rounded-lg hover:bg-[#22C55E] transition-colors"
            >
              <FaExternalLinkAlt style={{ fontSize: '9px' }} />
              View Prototype
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-8 py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">01 — Overview</p>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">PawPal</h1>
            <p className="text-xl text-[#6B7280] font-light mb-6">Peace for owners. Care for dogs.</p>
            <div className="rounded-2xl overflow-hidden mb-8 bg-[#111]">
              <img src={pawpalImg} alt="PawPal App" className="w-full object-cover" />
            </div>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              A mobile app connecting dog owners with trusted local sitters — designed from research to hi-fi prototype with a complete user-centered process.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ value: '2', label: 'User Personas' }, { value: '20+', label: 'Design Iterations' }, { value: '1', label: 'User in Prototype' }].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-3xl font-bold text-[#4ADE80] mb-2">{value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">02 — The Problem &amp; Solution</p>
            <h2 className="text-2xl font-bold text-white mb-6 leading-snug">Finding the Right Sitter Should Feel Safe</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              Dog owners struggle to find trusted sitters quickly. Existing solutions feel untrustworthy — leaving pet owners anxious when they leave home. The challenge was to design a mobile experience that feels safe, simple, and personal.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 flex gap-4 items-start border border-[#222]">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <blockquote className="border-l-[3px] border-[#4ADE80] pl-6 py-1">
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "The goal wasn't to build an app. It was to make a dog owner feel safe enough to leave."
              </p>
            </blockquote>
          </section>

          {/* 03 — Research */}
          <section id="research" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">03 — Research</p>
            <h2 className="text-2xl font-bold text-white mb-6">Understanding Users</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {PERSONAS.map(({ name, age, role, goals, pain }) => (
                <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <div className="mb-5">
                    <p className="text-white font-bold text-sm">{name}, {age}</p>
                    <p className="text-[#4ADE80] text-[11px] mt-0.5">{role}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#374151] mb-2">Goals</p>
                    <ul className="space-y-1.5">
                      {goals.map(g => (
                        <li key={g} className="text-[11px] text-[#9CA3AF] flex gap-2 leading-tight">
                          <span className="text-[#4ADE80] shrink-0">+</span>{g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#374151] mb-2">Pain Points</p>
                    <ul className="space-y-1.5">
                      {pain.map(p => (
                        <li key={p} className="text-[11px] text-[#9CA3AF] flex gap-2 leading-tight">
                          <span className="text-red-400 shrink-0">−</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#4ADE80] mb-2">Key Design Insight</p>
              <p className="text-[#D1D5DB] text-sm leading-relaxed">
                Both personas share one core need: <em>trust</em>. Every design decision — navigation, typography, copy, imagery — was evaluated through this single lens first.
              </p>
            </div>
          </section>

          {/* 04 — Visual Direction */}
          <section id="visual" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">04 — Design System & Component Library</p>
            <h2 className="text-2xl font-bold text-white mb-4">Design Approach</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              Soft greens and earthy tones create a calm, friendly atmosphere — reassuring for pet owners anxious about leaving their dogs. Playful illustration pairs with clean UI.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span className="text-[#4ADE80] text-lg shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[11px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Color Palette</p>
              {/* <div className="flex gap-4">
                {COLORS.map(({ hex, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl border border-white/5" style={{ backgroundColor: hex }} />
                    <p className="text-[9px] text-[#6B7280]">{label}</p>
                  </div>
                ))}
              </div> */}
               <img
                src={ColorPallete}
                alt="DetectAI Security Low-Fidelity Wireframes"
                className="w-full block"
              />

              
            </div>
          </section>

          {/* 05 — Wireframes */}
          <section id="wireframes" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">05 — Wireframes</p>
            <h2 className="text-2xl font-bold text-white mb-4">Low-Fidelity Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              Wireframes focused on information hierarchy and navigation patterns before any visual design. Key flows: onboarding, sitter search, profile view, booking form, messaging, payment.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 border border-[#222]" style={{ minHeight: '200px' }}>
               <img
                src={LoFIPawpal}
                alt="DetectAI Security Low-Fidelity Wireframes"
                className="w-full block"
              />
              
            </div>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 border border-[#222]" style={{ minHeight: '180px' }}>
             <img src={pawpalComponents} alt="PawPal App" className="w-full object-cover" />
            </div>
           
          </section>

          {/* 06 — Hi-Fi Design */}
          <section id="hifi" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">06 — Hi-Fi Design</p>
            <h2 className="text-2xl font-bold text-white mb-4">Final Screens &amp; Prototype</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              High-fidelity screens combining the design system, real content, and micro-interactions. The prototype demonstrates the complete user journey from onboarding to booking confirmation.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-8 border border-[#222]" style={{ minHeight: '200px' }}>
                      <img src={pawpalImg} alt="PawPal App" className="w-full object-cover" />

            </div>
            <div className="bg-[#080808] border border-[#4ADE80]/25 rounded-xl p-8 text-center">
              <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-2">Try PawPal in Figma</p>
              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">Full clickable prototype — onboarding, sitter search, booking, and messaging interactions</p>
              <a href="https://www.figma.com/proto/hr07ubZBbbWwdw2kWrwJGD/Mahta-Ebrahimi?node-id=326-4264&t=vM5OXkdmQE4ws2pv-1&scaling=min-zoom&content-scaling=fixed&page-id=37%3A23&starting-point-node-id=326%3A4415&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D1117] font-bold px-8 py-3 rounded-lg hover:bg-[#22C55E] transition-colors text-sm">
                <FaExternalLinkAlt style={{ fontSize: '11px' }} />
                Open Prototype
              </a>
            </div>
          </section>

          {/* 07 — Design System
          <section id="design-system" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">07 — Design System</p>
            <h2 className="text-2xl font-bold text-white mb-4">Component Library</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              Complete component library — forms, offer cards, booking flows, payment screens, navigation bars, system elements. Built for consistency and developer handoff.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 border border-[#222]" style={{ minHeight: '180px' }}>
             <img src={pawpalComponents} alt="PawPal App" className="w-full object-cover" />
            </div>
            <div className="flex flex-wrap gap-2">
              {DS_TAGS.map(cat => (
                <span key={cat} className="text-xs bg-[#111] text-[#9CA3AF] px-4 py-2 rounded border border-[#374151]/60">
                  {cat}
                </span>
              ))}
            </div>
          </section> */}

          {/* 07 — Key Learnings */}
          <section id="learnings" className="mb-8">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#4ADE80] uppercase mb-3">07 — Reflection</p>
            <h2 className="text-2xl font-bold text-white mb-8">Key Learnings</h2>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold text-[#374151]/50 font-mono mb-4 leading-none">{num}</p>
                  <p className="text-white font-semibold text-sm mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-[#1A1A1A]">
              <a href="/#work" className="flex items-center gap-2 text-[#6B7280] hover:text-white transition-colors text-sm">
                <FaArrowLeft style={{ fontSize: '11px' }} /> Back to Work
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
