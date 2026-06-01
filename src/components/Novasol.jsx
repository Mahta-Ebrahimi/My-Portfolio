import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import novasolFigma from '../assets/NovaFigma.png';
import NovaDoc from '../assets/novasol.pdf';
import { getProjectNavigation } from '../data/projectNavigation';

const SECTIONS = [
  { id: 'overview',   num: '01', label: 'Overview' },
  { id: 'problem',    num: '02', label: 'Problem & Solution' },
  { id: 'research',   num: '03', label: 'Research' },
  { id: 'visual',     num: '04', label: 'Visual Direction' },
  { id: 'wireframes', num: '05', label: 'Wireframes' },
  { id: 'hifi',       num: '06', label: 'Final Design' },
  { id: 'learnings',  num: '07', label: 'Key Learnings' },
];

const PRINCIPLES = [
  { icon: '✦', title: 'Simplicity',       desc: 'Reduce cognitive load in booking flow' },
  { icon: '◎', title: 'Trust signals',    desc: 'Reviews, photos, clear pricing' },
  { icon: '♡', title: 'Visual appeal',    desc: 'Destinations as the hero' },
  { icon: '⊞', title: 'Consistency',      desc: '4pt grid, unified component system' },
];

const FEATURES = [
  { icon: '🗺️', title: 'Destination Showcase', desc: 'Immersive imagery-first layout' },
  { icon: '🔍', title: 'Smart Search',          desc: 'Filters by date, size, location' },
  { icon: '📋', title: 'Streamlined Booking',   desc: 'Fewer steps to confirmation' },
  { icon: '⭐', title: 'Trust & Reviews',        desc: 'Verified ratings, host profiles' },
];

const COLORS = [
  { hex: '#1B3A5C', label: 'Navy' },
  { hex: '#E8A84C', label: 'Gold' },
  { hex: '#F5F1EB', label: 'Sand' },
  { hex: '#2E7D5B', label: 'Green' },
  { hex: '#FFFFFF', label: 'White' },
];

const LEARNINGS = [
  { num: '01', title: 'Imagery drives conversion', desc: 'High-quality destination visuals reduced bounce rate in user tests by focusing attention on the destination, not the UI.' },
  { num: '02', title: 'Booking steps must be obvious', desc: 'Users abandoned multi-step forms. Breaking the flow into clear micro-steps with progress indicators kept them on track.' },
  { num: '03', title: 'Mobile-first, desktop second', desc: '68% of test users reached the site on mobile. Starting from the smallest screen forced the most important decisions first.' },
];

export default function Novasol() {
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
              <span style={{ fontSize: '14px' }}>🌊</span>
              <h2 className="text-white font-bold text-[14px] leading-tight">Novasol</h2>
            </div>
            <p className="text-[#4B5563] text-xs mb-3">Travel Agency · UI/UX</p>
            <div className="flex gap-2">
              <span className="text-xs bg-[#0F1B2D] text-[#60A5FA] px-2 py-1 rounded-md border border-[#60A5FA]/20">Figma</span>
              <span className="text-xs bg-[#0D0D0D] text-[#4B5563] px-2 py-1 rounded-md border border-[#1A1A1A]">2024</span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1F2D1A] mb-3 px-1">
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
                      <span className={`font-mono text-xs shrink-0 tabular-nums ${on ? 'text-[#60A5FA]' : 'text-[#1F2D1A] group-hover:text-[#374151]'}`}>
                        {num}
                      </span>
                      <span className={`text-xs font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-4 bg-[#60A5FA] rounded-full shrink-0" />}
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
                <p className="text-xs uppercase tracking-widest text-[#1F2D1A] mb-1">Role</p>
                <p className="text-xs text-[#9CA3AF] leading-tight">UI/UX Designer</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#1F2D1A] mb-1">Duration</p>
                <p className="text-xs text-[#9CA3AF] leading-tight">3 months</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.figma.com/proto/PEZSnKDt63mPmeIKPUEbTB/Din-m%C3%83%C2%A6gler--2-?page-id=63%3A0&node-id=420-23&starting-point-node-id=420%3A23&t=COlUHCgSLO1qCgTY-1"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#60A5FA] text-[#0D1117] text-xs font-bold py-2 rounded-lg hover:bg-[#3B82F6] transition-colors"
              >
                <FaExternalLinkAlt style={{ fontSize: '9px' }} /> View Prototype
              </a>
              <a
                href={NovaDoc} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#111] text-[#9CA3AF] text-xs font-bold py-2 rounded-lg hover:bg-[#374151] transition-colors border border-[#374151]"
              >
                <FaFileAlt style={{ fontSize: '9px' }} /> Design Doc
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-8 py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-3">01 — Overview</p>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">Novasol</h1>
            <p className="text-xl text-[#6B7280] font-light mb-6">Travel Agency Redesign</p>
            <div className="rounded-2xl overflow-hidden mb-8 bg-[#F0F0F0] p-3">
              <img src={novasolFigma} alt="Novasol Redesign" className="w-full object-cover" />
            </div>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              A complete UI/UX redesign for Novasol travel agency — modernising the booking experience and visual identity to better match how users actually discover and book holiday destinations.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ value: 'Figma', label: 'Tool' }, { value: '3 mo', label: 'Duration' }, { value: 'UI/UX', label: 'Discipline' }].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-xl font-bold text-[#60A5FA] mb-2">{value}</p>
                  <p className="text-xs uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-3">02 — The Problem &amp; Solution</p>
            <h2 className="text-2xl font-bold text-white mb-6 leading-snug">Booking a Holiday Shouldn't Feel Like Work</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              The original Novasol site had an outdated visual identity and a fragmented booking flow that caused users to drop off before completing a reservation. The redesign aimed to make destination discovery beautiful and conversion frictionless.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 flex gap-4 items-start border border-[#222]">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <blockquote className="border-l-[3px] border-[#60A5FA] pl-6 py-1">
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "Users don't book holidays — they book feelings. The design needed to sell the destination, not the form."
              </p>
            </blockquote>
          </section>

          {/* 03 — Research */}
          <section id="research" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-3">03 — Research</p>
            <h2 className="text-2xl font-bold text-white mb-6">Understanding the Traveller</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                {
                  name: 'The Family Planner', role: '35–50 · Group travel',
                  goals: ['Easy cabin/house comparison', 'Clear pricing for groups', 'Kid-friendly location filters'],
                  pain: ['Too many options, no smart filtering', 'Hidden costs discovered late', 'Long booking flows on mobile'],
                },
                {
                  name: 'The Spontaneous Couple', role: '28–38 · Short trips',
                  goals: ['Last-minute availability', 'Quick checkout', 'Inspiring destination pages'],
                  pain: ['Slow search results', 'Cluttered listing pages', 'No clear trust signals'],
                },
              ].map(({ name, role, goals, pain }) => (
                <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <div className="mb-5">
                    <p className="text-white font-bold text-[15px]">{name}</p>
                    <p className="text-[#60A5FA] text-sm mt-0.5">{role}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-2">Goals</p>
                    <ul className="space-y-1.5">
                      {goals.map(g => (
                        <li key={g} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                          <span className="text-[#60A5FA] shrink-0">+</span>{g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-2">Pain Points</p>
                    <ul className="space-y-1.5">
                      {pain.map(p => (
                        <li key={p} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                          <span className="text-red-400 shrink-0">−</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#60A5FA] mb-2">Key Design Insight</p>
              <p className="text-[#D1D5DB] text-base leading-relaxed">
                Both personas abandon at the same point: when the booking form becomes complex. Reducing steps and showing progress was the highest-impact improvement.
              </p>
            </div>
          </section>

          {/* 04 — Visual Direction */}
          <section id="visual" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-3">04 — Visual Direction</p>
            <h2 className="text-2xl font-bold text-white mb-4">Design Approach</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              Navy and gold convey heritage and trust, while sand tones bring warmth. Full-bleed destination photography replaces dense text, letting visuals do the selling.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span className="text-[#60A5FA] text-lg shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Color Palette</p>
              <div className="flex gap-4">
                {COLORS.map(({ hex, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl border border-white/10" style={{ backgroundColor: hex }} />
                    <p className="text-xs text-[#6B7280]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 — Wireframes */}
          <section id="wireframes" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-3">05 — Wireframes</p>
            <h2 className="text-2xl font-bold text-white mb-4">Low-Fidelity Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              Lo-fi wireframes established the information hierarchy before any visual polish. Homepage, search results, listing detail, and checkout flow were mapped first.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center border border-[#222]" style={{ minHeight: '200px' }}>
              <p className="text-[#374151] text-sm mb-1">Low-fi wireframes</p>
              <p className="text-[#2D3A4A] text-xs">Homepage · Search · Listing · Checkout</p>
            </div>
          </section>

          {/* 06 — Final Design */}
          <section id="hifi" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-3">06 — Final Design</p>
            <h2 className="text-2xl font-bold text-white mb-4">Hi-Fi Screens &amp; Prototype</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              High-fidelity screens applied the full design system — typography, colour tokens, photography guidelines, and interactive states. The Figma prototype covers the complete booking journey.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-8 border border-[#222]" style={{ minHeight: '200px' }}>
              <p className="text-[#374151] text-sm mb-1">Final hi-fi screens</p>
              <p className="text-[#2D3A4A] text-xs">Complete booking flow</p>
            </div>
            <div className="bg-[#080808] border border-[#60A5FA]/25 rounded-xl p-8 text-center">
              <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-2">View in Figma</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">Interactive prototype with full booking flow</p>
              <a
                href="https://www.figma.com/proto/PEZSnKDt63mPmeIKPUEbTB/Din-m%C3%83%C2%A6gler--2-?page-id=63%3A0&node-id=420-23&starting-point-node-id=420%3A23&t=COlUHCgSLO1qCgTY-1"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#60A5FA] text-[#0D1117] font-bold px-8 py-3 rounded-lg hover:bg-[#3B82F6] transition-colors text-sm"
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> Open Prototype
              </a>
            </div>
          </section>

          {/* 07 — Key Learnings */}
          <section id="learnings" className="mb-8">
            <p className="text-xs font-mono tracking-[0.2em] text-[#60A5FA] uppercase mb-3">07 — Reflection</p>
            <h2 className="text-2xl font-bold text-white mb-8">Key Learnings</h2>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold text-[#374151]/50 font-mono mb-4 leading-none">{num}</p>
                  <p className="text-white font-semibold text-[15px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
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
