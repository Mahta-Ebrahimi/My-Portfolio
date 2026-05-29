import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import selskaklocal from '../assets/UI1.png';
import selskabslokaleDoc from '../assets/Ui Og grafisk design-Maryam Ebrahimi.pdf';
import { getProjectNavigation } from '../data/projectNavigation';

const SECTIONS = [
  { id: 'overview',   num: '01', label: 'Overview' },
  { id: 'problem',    num: '02', label: 'Problem & Solution' },
  { id: 'research',   num: '03', label: 'Research' },
  { id: 'visual',     num: '04', label: 'Visual Direction' },
  // { id: 'wireframes', num: '05', label: 'Wireframes' },
  // { id: 'hifi',       num: '06', label: 'Final Design' },
  { id: 'learnings',  num: '05', label: 'Key Learnings' },
];

const FEATURES = [
  { icon: '🏛️', title: 'Venue Discovery',   desc: 'Filter by size, style, and location' },
  { icon: '📸', title: 'Rich Galleries',     desc: 'Full photo tours of each venue' },
  { icon: '📅', title: 'Availability Check', desc: 'Live calendar with instant feedback' },
  { icon: '✉️', title: 'Enquiry Flow',       desc: 'Simple contact form per venue' },
];

const PRINCIPLES = [
  { icon: '✦', title: 'Elegance',        desc: 'The venue should feel premium at first glance' },
  { icon: '◎', title: 'Clarity',         desc: 'Venue details surfaced without hunting' },
  { icon: '♡', title: 'Emotional match', desc: 'Celebrations deserve visual warmth' },
  { icon: '⊞', title: 'Grid rhythm',     desc: 'Consistent 4pt spacing throughout' },
];

const COLORS = [
  { hex: '#2C2C2C', label: 'Charcoal' },
  { hex: '#C9A96E', label: 'Gold' },
  { hex: '#F9F6F1', label: 'Cream' },
  { hex: '#7D6B5D', label: 'Warm' },
  { hex: '#FFFFFF', label: 'White' },
];

const LEARNINGS = [
  { num: '01', title: 'Premium needs restraint',   desc: 'Adding more design elements made it feel cheaper. White space and large imagery were the primary luxury signals.' },
  { num: '02', title: 'The enquiry is the CTA',    desc: 'Users don\'t book venues impulsively. The goal was to make the enquiry form feel safe and frictionless.' },
  { num: '03', title: 'Photos carry the brand',    desc: 'No amount of copy replaced the impact of high-quality photography. Venue imagery was the highest-priority design constraint.' },
];

export default function Selskabslokale() {
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

      {/* ═══ SIDEBAR WRAPPER — full-height background ═══════════ */}
      <div className="w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div
          className="sticky flex flex-col overflow-y-auto"
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {/* Project identity */}
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: '14px' }}>🏛️</span>
              <h2 className="text-white font-bold text-[13px] leading-tight">Selskabslokale</h2>
            </div>
            <p className="text-[#4B5563] text-[11px] mb-3">Venue Platform · UI/UX</p>
            <div className="flex gap-2">
              <span className="text-[10px] bg-[#1C1508] text-[#C9A96E] px-2 py-1 rounded-md border border-[#C9A96E]/20">Figma</span>
              <span className="text-[10px] bg-[#0D0D0D] text-[#4B5563] px-2 py-1 rounded-md border border-[#1A1A1A]">2025</span>
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
                      <span className={`font-mono text-[9px] shrink-0 tabular-nums ${on ? 'text-[#C9A96E]' : 'text-[#1F2D1A] group-hover:text-[#374151]'}`}>
                        {num}
                      </span>
                      <span className={`text-[11px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-4 bg-[#C9A96E] rounded-full shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Meta + CTA */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-4">
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#1F2D1A] mb-1">Role</p>
                <p className="text-[11px] text-[#9CA3AF] leading-tight">UI/UX Designer</p>
              </div>
              <div>
                {/* <p className="text-[9px] uppercase tracking-widest text-[#1F2D1A] mb-1">Duration</p> */}
                {/* <p className="text-[11px] text-[#9CA3AF] leading-tight">2 months</p> */}
              </div>
            </div>
            <a
              href={selskabslokaleDoc} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#C9A96E] text-[#0D1117] text-[11px] font-bold py-2 rounded-lg hover:bg-[#B8944A] transition-colors"
            >
              <FaFileAlt style={{ fontSize: '9px' }} /> Design Document
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-8 py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-3">01 — Overview</p>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">Selskabslokale</h1>
            <p className="text-xl text-[#6B7280] font-light mb-6">Venue Rental Platform · UI/UX Redesign</p>
            <div className="rounded-2xl overflow-hidden mb-8 bg-[#111]">
              <img src={selskaklocal} alt="Selskabslokale Redesign" className="w-full object-cover" />
            </div>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              A complete UI/UX redesign for a venue rental platform serving events and celebrations, making it easier to discover, evaluate, and enquire about the perfect venue.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ value: 'Figma', label: 'Tool' }, { value: 'Danish', label: 'Language' }].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-xl font-bold text-[#C9A96E] mb-2">{value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-3">02 — The Problem &amp; Solution</p>
            <h2 className="text-2xl font-bold text-white mb-6 leading-snug">Finding the Perfect Venue Should Feel Special</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The existing platform had a cluttered layout, poor imagery presentation, and a confusing enquiry flow — making users lose confidence in the venues listed. The redesign centred on trust, elegance, and a clear path from discovery to enquiry.
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
            <blockquote className="border-l-[3px] border-[#C9A96E] pl-6 py-1">
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "A venue booking isn't a transaction — it's the beginning of a memory. The design had to feel worthy of the occasion."
              </p>
            </blockquote>
          </section>

          {/* 03 — Research */}
          <section id="research" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-3">03 — Research</p>
            <h2 className="text-2xl font-bold text-white mb-6">Understanding the Event Planner</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                {
                  name: 'The Private Host', role: '35–55 · Birthday / Anniversary',
                  goals: ['Find venues matching the occasion mood', 'See real photos, not stock images', 'Simple enquiry, fast response'],
                  pain: ['Hard to compare venues side-by-side', 'Pricing never clearly stated', 'Contact forms feel generic and cold'],
                },
                {
                  name: 'The Corporate Planner', role: '30–45 · Business events',
                  goals: ['Capacity and AV details upfront', 'Professional venue presentation', 'Reliable availability information'],
                  pain: ['Missing technical specs on listings', 'No indication of catering options', 'Long back-and-forth before a quote'],
                },
              ].map(({ name, role, goals, pain }) => (
                <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <div className="mb-5">
                    <p className="text-white font-bold text-sm">{name}</p>
                    <p className="text-[#C9A96E] text-[11px] mt-0.5">{role}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#374151] mb-2">Goals</p>
                    <ul className="space-y-1.5">
                      {goals.map(g => (
                        <li key={g} className="text-[11px] text-[#9CA3AF] flex gap-2 leading-tight">
                          <span className="text-[#C9A96E] shrink-0">+</span>{g}
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
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A96E] mb-2">Key Design Insight</p>
              <p className="text-[#D1D5DB] text-sm leading-relaxed">
                Photography is the highest-trust signal. Users decided within seconds whether a venue felt right — before reading any text. Leading with imagery was non-negotiable.
              </p>
            </div>
          </section>

          {/* 04 — Visual Direction */}
          <section id="visual" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-3">04 — Visual Direction</p>
            <h2 className="text-2xl font-bold text-white mb-4">Design Approach</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              Charcoal and gold carry a premium, celebratory feel without being ostentatious. Generous white space lets the venue imagery breathe and speak for itself.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span className="text-[#C9A96E] text-lg shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[11px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Color Palette</p>
              <div className="flex gap-4">
                {COLORS.map(({ hex, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl border border-white/10" style={{ backgroundColor: hex }} />
                    <p className="text-[9px] text-[#6B7280]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 — Wireframes */}
          {/* <section id="wireframes" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-3">05 — Wireframes</p>
            <h2 className="text-2xl font-bold text-white mb-4">Low-Fidelity Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              Lo-fi wireframes established navigation patterns, venue card layouts, and the enquiry form flow before any visual styling was applied.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center border border-[#222]" style={{ minHeight: '200px' }}>
              <p className="text-[#374151] text-sm mb-1">Low-fi wireframes</p>
              <p className="text-[#2D3A4A] text-xs">Homepage · Listing · Detail · Enquiry</p>
            </div>
          </section> */}

          {/* 06 — Final Design */}
          {/* <section id="hifi" className="mb-20">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-3">06 — Final Design</p>
            <h2 className="text-2xl font-bold text-white mb-4">Hi-Fi Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              Final screens apply the complete design system — typography hierarchy, colour tokens, photography placement rules, and interactive states for forms and filters.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-8 border border-[#222]" style={{ minHeight: '200px' }}>
              <p className="text-[#374151] text-sm mb-1">Final hi-fi screens</p>
              <p className="text-[#2D3A4A] text-xs">Complete venue rental flow</p>
            </div>
            <div className="bg-[#080808] border border-[#C9A96E]/25 rounded-xl p-8 text-center">
              <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-2">Design Document</p>
              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">Full process documentation — research, wireframes, and final screens</p>
              <a
                href={selskabslokaleDoc} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#0D1117] font-bold px-8 py-3 rounded-lg hover:bg-[#B8944A] transition-colors text-sm"
              >
                <FaFileAlt style={{ fontSize: '11px' }} /> Open Document
              </a>
            </div>
          </section> */}

          {/* 07 — Key Learnings */}
          <section id="learnings" className="mb-8">
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#C9A96E] uppercase mb-3">05 — Reflection</p>
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
