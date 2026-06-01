import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { getProjectNavigation } from '../data/projectNavigation';
import MatchMeComponent from '../assets/MatchMeComponent.png';
import MatchMeHIFI from '../assets/MatchMeHIFI.png';

const ACCENT = '#F472B6';

const SECTIONS = [
  { id: 'overview',   num: '01', label: 'Overview' },
  { id: 'problem',    num: '02', label: 'Problem & Solution' },
  { id: 'research',   num: '03', label: 'Research' },
  { id: 'visual',     num: '04', label: 'Design System & Component Library' },
  // { id: 'wireframes', num: '05', label: 'Wireframes' },
  { id: 'hifi',       num: '05', label: 'Hi-Fi Design' },
  { id: 'learnings',  num: '07', label: 'Key Learnings' },
];

const PERSONAS = [
  {
    name: 'Lena', age: '34', role: 'Working parent · Needs reliable help',
    goals: ['Find a trusted babysitter or tutor fast', 'See AI-verified profiles with real compatibility scores', 'Book and pay in one flow without back-and-forth'],
    pain: ['Generic platforms show everyone — no intelligent filtering', 'No way to know if a helper actually fits her schedule and needs', 'Wasted time on interviews that lead nowhere'],
  },
  {
    name: 'Karim', age: '29', role: 'Freelancer · Looking for home & fitness services',
    goals: ['One app to find cleaners, trainers, and handymen', 'AI that understands his preferences without long forms', 'Transparent reviews and AI-summarised helper profiles'],
    pain: ['Switches between 5 different apps for different services', 'Can\'t tell from a profile if the helper is a real fit', 'Booking feels manual and disconnected'],
  },
];

const PRINCIPLES = [
  { icon: '🤖', title: 'AI-first onboarding',      desc: 'A short AI quiz builds a user preference profile — no manual filters needed' },
  { icon: '🎯', title: 'Best-fit scoring',          desc: 'Every helper gets an AI compatibility score unique to each user\'s needs' },
  { icon: '◎', title: 'Transparent AI decisions',  desc: 'Users see why the AI recommended a match — not just who' },
  { icon: '⊞', title: 'One flow end-to-end',       desc: 'Search, match, book, pay, and message — all in a single app' },
];

const AI_FEATURES = [
  { icon: '🤖', title: 'AI Onboarding Quiz',         desc: 'Conversational quiz builds a preference model in under 2 minutes — no manual filter setup' },
  { icon: '🧠', title: 'Mood & Personality Matching', desc: 'AI analyses helper personality from profile data and matches it to the user\'s communication style' },
  { icon: '⭐', title: 'Best-Fit Scoring',            desc: 'Each helper is scored 0–100% for compatibility based on location, availability, skills, and personality fit' },
  { icon: '💬', title: 'AI Conversation Assistant',   desc: 'In-chat AI helps users write their first message and suggests follow-up questions' },
  { icon: '📋', title: 'AI Profile Summaries',        desc: 'AI generates a short, plain-language summary of each helper so users don\'t have to read everything' },
  { icon: '🔍', title: 'Smart Recommendations',       desc: 'AI surfaces helpers the user hasn\'t searched for but are statistically likely to be a strong match' },
];

const STANDARD_FEATURES = [
  { icon: '🗺️', title: 'Map & Search',    desc: 'Filter by distance, availability, service type, and price' },
  { icon: '📅', title: 'Calendar Booking', desc: 'Real-time availability with instant or request-based booking' },
  { icon: '💬', title: 'Messaging',        desc: 'Built-in chat with read receipts and AI conversation prompts' },
  { icon: '💳', title: 'In-app Payments',  desc: 'Secure payment, receipts, and tip — no cash, no third-party apps' },
];

const LEARNINGS = [
  { num: '01', title: 'AI needs to explain itself',    desc: 'Users trusted AI recommendations significantly more when the UI surfaced the reason — "matched because: same area, evening availability, 4.9 stars with families." Opacity kills adoption.' },
  { num: '02', title: 'The quiz replaces all filters', desc: 'A 5-question AI onboarding quiz produced better matches than manual filter UIs. Users felt guided rather than overwhelmed — and the AI model had richer data to work with.' },
  { num: '03', title: 'Universal beats vertical',      desc: 'Designing one matching model for all service types — not separate apps — forced a smarter AI layer. The same preference engine that finds a babysitter finds a fitness trainer, just with different scoring weights.' },
];

export default function MatchMe() {
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
              {/* <span style={{ fontSize: '14px' }}>💞</span> */}
              <h2 className="text-white font-bold text-[14px] leading-tight">MatchMe</h2>
            </div>
            <p className="text-[#4B5563] text-xs mb-3">AI Matchmaking</p>
            <div className="flex gap-2">
              <span
                className="text-xs px-2 py-1 rounded-md border"
                style={{ background: '#2D0A1A', color: ACCENT, borderColor: `${ACCENT}33` }}
              >
                Figma
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#2D1220] mb-3 px-1">
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
                      <span
                        className="font-mono text-xs shrink-0 tabular-nums"
                        style={{ color: on ? ACCENT : '#2D1220' }}
                      >
                        {num}
                      </span>
                      <span className={`text-xs font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && (
                        <div
                          className="ml-auto w-[3px] h-4 rounded-full shrink-0"
                          style={{ backgroundColor: ACCENT }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Meta + CTA */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#2D1220] mb-1">Role</p>
              <p className="text-xs text-[#9CA3AF] leading-tight">UI/UX Designer</p>
            </div>
            <a
              href="https://www.figma.com/proto/cGnfgwa8uCDZeKk6yCyURy/Match-Me?node-id=1-2208&viewport=1060%2C-1165%2C0.19&t=xOfO6RXWl1PniIrH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2208&page-id=0%3A1&show-proto-sidebar=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-[#0D1117] text-xs font-bold py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}
            >
              <FaExternalLinkAlt style={{ fontSize: '9px' }} /> View Prototype
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-8 py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>01 — Overview</p>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">MatchMe</h1>
            <p className="text-xl text-[#6B7280] font-light mb-6">Find any helper. Matched by AI.</p>
            <div className="rounded-2xl overflow-hidden mb-8 bg-[#F0F0F0] p-3">
              <img src={MatchMeHIFI} alt="MatchMe App" className="w-full object-cover" />
            </div>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              MatchMe is a universal AI-powered service matchmaking app. Users can find babysitters, tutors, fitness trainers, cleaners, handymen, pet sitters, elderly care helpers, and more — all matched by AI based on personality, availability, location, and need. Designed end-to-end in Figma from research to hi-fi prototype.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '10+', label: 'Service Categories' },
                { value: '6', label: 'AI Features' },
                { value: '1', label: 'Clickable Prototype' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-3xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-xs uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>02 — The Problem &amp; Solution</p>
            <h2 className="text-2xl font-bold text-white mb-6 leading-snug">Finding the Right Helper Shouldn't Require Five Different Apps</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              People need different kinds of help at different times — a babysitter this week, a personal trainer next month, a handyman on Saturday. Existing platforms are siloed by category, rely on manual filters, and offer zero intelligence about whether a helper is actually a good fit for <em>you</em>.
            </p>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              MatchMe solves this with a single AI-powered platform that learns what each user needs through a short onboarding quiz, then surfaces the right helpers across any service type — scored for compatibility, not just proximity.
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-3">AI Features</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {AI_FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 flex gap-4 items-start border border-[#222]">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-3">Core Platform Features</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {STANDARD_FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 flex gap-4 items-start border border-[#222]">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "The goal wasn't to build a service directory. It was to make AI do the work of finding the right person — so users don't have to."
              </p>
            </blockquote>
          </section>

          {/* 03 — Research */}
          <section id="research" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>03 — Research</p>
            <h2 className="text-2xl font-bold text-white mb-6">Who Needs MatchMe</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {PERSONAS.map(({ name, age, role, goals, pain }) => (
                <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <div className="mb-5">
                    <p className="text-white font-bold text-[15px]">{name}, {age}</p>
                    <p className="text-sm mt-0.5" style={{ color: ACCENT }}>{role}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-2">Goals</p>
                    <ul className="space-y-1.5">
                      {goals.map(g => (
                        <li key={g} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                          <span style={{ color: ACCENT }} className="shrink-0">+</span>{g}
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
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>Key Design Insight</p>
              <p className="text-[#D1D5DB] text-base leading-relaxed">
                Both personas don't want to search — they want to be matched. The AI layer has to remove the effort of filtering entirely, replacing it with a confident, explained recommendation the user can act on immediately.
              </p>
            </div>
          </section>

          {/* 04 — Design System & Component Library */}
          <section id="visual" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>04 — Design System &amp; Component Library</p>
            <h2 className="text-2xl font-bold text-white mb-4">AI-First Design Principles</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              The design system was built around one constraint: AI decisions must be surfaced, not hidden. Every component that presents a recommendation includes the reasoning behind it — score, matched criteria, and why this helper fits this user specifically.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span className="text-lg shrink-0 mt-0.5" style={{ color: ACCENT }}>{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Component Library</p>
              <img
                src={MatchMeComponent}
                alt="MatchMe Component Library"
                className="w-full block"
              />
            </div>
          </section>

          {/* 05 — Wireframes
          <section id="wireframes" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>05 — Wireframes</p>
            <h2 className="text-2xl font-bold text-white mb-4">Low-Fidelity Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              Wireframes mapped the AI-assisted user journey before any visual design. Key flows: AI onboarding quiz, match feed with scores, helper profile with AI summary, booking and calendar, in-app messaging with conversation assistant, and payment.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center border border-[#222]" style={{ minHeight: '200px' }}>
              <p className="text-[#374151] text-sm">Lo-Fi wireframes coming soon</p>
            </div>
          </section> */}

          {/* 06 — Hi-Fi Design */}
          <section id="hifi" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>05 — Hi-Fi Design</p>
            <h2 className="text-2xl font-bold text-white mb-4">Final Screens &amp; Prototype</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              High-fidelity screens show the full AI-powered flow: the onboarding quiz that builds a user profile, the match feed with AI best-fit scores and reasoning, helper profiles with AI-generated summaries, booking with calendar availability, in-chat AI conversation prompts, and in-app payment.
            </p>
            <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center mb-8 border border-[#E0E0E0]" style={{ minHeight: '200px' }}>
              <img src={MatchMeHIFI} alt="MatchMe Hi-Fi Design" className="w-full object-cover" />
            </div>
            <div className="border p-8 text-center" style={{ background: '#2D0A1A', borderColor: `${ACCENT}25` }}>
              <p className="text-xs font-mono tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>Try MatchMe in Figma</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">Full clickable prototype — AI onboarding quiz, match feed with best-fit scores, booking, and messaging</p>
              <a
                href="https://www.figma.com/proto/cGnfgwa8uCDZeKk6yCyURy/Match-Me?node-id=1-2208&viewport=1060%2C-1165%2C0.19&t=xOfO6RXWl1PniIrH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2208&page-id=0%3A1&show-proto-sidebar=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
                style={{ background: ACCENT, color: '#0D1117' }}
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> Open Prototype
              </a>
            </div>
          </section>

          {/* 07 — Key Learnings */}
          <section id="learnings" className="mb-8">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>07 — Reflection</p>
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
