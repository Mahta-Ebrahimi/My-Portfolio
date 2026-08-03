import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { getProjectNavigation } from '../data/projectNavigation';
import MatchMeComponent from '../assets/MatchMeComponent.png';
import MatchMeHIFI from '../assets/MatchMeHIFI.png';

const ACCENT = '#F472B6';

// ── Sidebar navigation (8 chapters) ──────────────────────────────────────────
const SECTIONS = [
  { id: 'overview',   num: '01', label: 'Overview' },
  { id: 'problem',    num: '02', label: 'Problem' },
  { id: 'research',   num: '03', label: 'Research & Users' },
  { id: 'direction',  num: '04', label: 'Design Direction' },
  { id: 'journey',    num: '05', label: 'User Journey' },
  { id: 'process',    num: '06', label: 'Design Process' },
  { id: 'solution',   num: '07', label: 'Final Solution' },
  { id: 'reflection', num: '08', label: 'Reflection' },
];

// ── Data ──────────────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    name: 'Lena', age: '34', role: 'Working parent · Needs reliable help',
    goals: ['Find a trusted babysitter or tutor fast', 'See compatibility scores with clear reasoning behind each match', 'Book and pay in one flow without back-and-forth'],
    pain: ['Generic platforms show everyone — no intelligent filtering', 'No way to know if a helper actually fits her schedule and needs', 'Wasted time on interviews that lead nowhere'],
  },
  {
    name: 'Karim', age: '29', role: 'Freelancer · Looking for home & fitness services',
    goals: ['One platform to find cleaners, trainers, and handymen', 'AI that understands his preferences without long forms', 'Transparent reviews and AI-summarised helper profiles'],
    pain: ['Switches between 5 different apps for different services', "Can't tell from a profile if the helper is a real fit", 'Booking feels manual and disconnected'],
  },
];

const PRINCIPLES = [
  { icon: '🤖', title: 'AI-first onboarding',     desc: 'A short AI quiz builds a user preference profile — no manual filters needed' },
  { icon: '🎯', title: 'Best-fit scoring',         desc: "Every helper gets an AI compatibility score unique to each user's needs" },
  { icon: '◎',  title: 'Transparent AI decisions', desc: "Users see why the AI recommended a match — not just who" },
  { icon: '⊞',  title: 'One flow end-to-end',      desc: 'Search, match, book, pay, and message — all in one place' },
];

const AI_FEATURES = [
  { icon: '🤖', title: 'AI Onboarding Quiz',          desc: 'Conversational quiz builds a preference model in under 2 minutes — no manual filter setup' },
  { icon: '🧠', title: 'Mood & Personality Matching',  desc: "AI analyses helper personality from profile data and matches it to the user's communication style" },
  { icon: '⭐', title: 'Best-Fit Scoring',             desc: 'Each helper is scored 0–100% for compatibility based on location, availability, skills, and personality fit' },
  { icon: '💬', title: 'AI Conversation Assistant',    desc: 'In-chat AI helps users write their first message and suggests follow-up questions' },
  { icon: '📋', title: 'AI Profile Summaries',         desc: "AI generates a short, plain-language summary of each helper so users don't have to read everything" },
  { icon: '🔍', title: 'Smart Recommendations',        desc: "AI surfaces helpers the user hasn't searched for but are statistically likely to be a strong match" },
];

const STANDARD_FEATURES = [
  { icon: '🗺️', title: 'Map & Search',    desc: 'Filter by distance, availability, service type, and price' },
  { icon: '📅', title: 'Calendar Booking', desc: 'Real-time availability with instant or request-based booking' },
  { icon: '💬', title: 'Messaging',        desc: 'Built-in chat with read receipts and AI conversation prompts' },
  { icon: '💳', title: 'Integrated Payments', desc: 'Secure payment, receipts, and tip — no cash, no third-party tools' },
];

const LEARNINGS = [
  { num: '01', title: 'AI needs to explain itself',    desc: 'Users trusted AI recommendations significantly more when the UI surfaced the reason — "matched because: same area, evening availability, 4.9 stars with families." Opacity kills adoption.' },
  { num: '02', title: 'The quiz replaces all filters', desc: 'A 5-question AI onboarding quiz produced better matches than manual filter UIs. Users felt guided rather than overwhelmed — and the AI model had richer data to work with.' },
  { num: '03', title: 'Universal beats vertical',      desc: 'Designing one matching model for all service types — not separate apps — forced a smarter AI layer. The same preference engine that finds a babysitter finds a fitness trainer, just with different scoring weights.' },
];

const JOURNEY_STEPS = [
  { step: '01', label: 'Need Help',         desc: 'User recognises a need — childcare, a home service, or fitness support.' },
  { step: '02', label: 'Describe the Need', desc: 'A short AI onboarding quiz captures preferences, schedule, and personality in under 2 minutes.' },
  { step: '03', label: 'Receive Matches',   desc: 'AI returns a ranked match feed with best-fit scores and plain-language reasoning.' },
  { step: '04', label: 'Compare Helpers',   desc: 'User views AI-summarised profiles and compatibility details side by side.' },
  { step: '05', label: 'Book',              desc: 'Real-time calendar availability — instant confirmation or request-based booking.' },
  { step: '06', label: 'Message',           desc: 'Built-in chat launches with AI conversation prompts to help users get started.' },
  { step: '07', label: 'Complete Service',  desc: 'Helper completes the job; user confirms completion in MatchMe.' },
  { step: '08', label: 'Review',            desc: 'User rates the helper; the AI preference model updates for future matches.' },
];

// ── Shared components ─────────────────────────────────────────────────────────
const SectionTag = ({ num, label }) => (
  <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>
    {num} — {label}
  </p>
);

const SubLabel = ({ children }) => (
  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-3">
    {children}
  </p>
);

const Placeholder = ({ label }) => (
  <div className="rounded-xl border border-dashed border-[#1C1C1C] bg-[#080808] px-6 py-8 text-center">
    <p className="text-[12px] font-mono text-[#272727] tracking-[0.2em] uppercase mb-1">{label}</p>
    <p className="text-[#242424] text-[13px]">Content to be refined in the next pass.</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#111] rounded-xl p-5 flex gap-4 items-start border border-[#222]">
    <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
    <div>
      <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
      <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
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
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div
          className="sticky flex flex-col overflow-y-auto"
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {/* Project identity */}
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">MatchMe</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">AI Matchmaking</p>
            <div className="flex gap-2">
              <span
                className="text-[12px] font-medium px-2 py-1 rounded-md border"
                style={{ background: '#2D0A1A', color: ACCENT, borderColor: `${ACCENT}33` }}
              >
                Figma
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#2D1220] mb-3 px-1">
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
                        className="font-mono text-[12px] shrink-0 tabular-nums"
                        style={{ color: on ? ACCENT : '#2D1220' }}
                      >
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
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
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2D1220] mb-1">Role</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">UI/UX Designer</p>
            </div>
            <a
              href="https://www.figma.com/proto/cGnfgwa8uCDZeKk6yCyURy/Match-Me?node-id=1-2208&viewport=1060%2C-1165%2C0.19&t=xOfO6RXWl1PniIrH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2208&page-id=0%3A1&show-proto-sidebar=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-[#0D1117] text-[13px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}
            >
              <FaExternalLinkAlt style={{ fontSize: '9px' }} /> View Prototype
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* ── 01 OVERVIEW ─────────────────────────────────────────── */}
          <section id="overview" className="mb-24">
            <SectionTag num="01" label="Overview" />
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">MatchMe</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">Local service help is scattered across platforms and hard to evaluate.</p>

            <div className="rounded-2xl overflow-hidden mb-8 bg-[#F0F0F0] p-3">
              <img src={MatchMeHIFI} alt="MatchMe Desktop Interface" className="w-full object-cover" />
            </div>

            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              MatchMe is a desktop web marketplace where people find local service providers — babysitters, cleaners, personal trainers, and more — with AI-assisted compatibility matching. The design challenge was making the right choice feel obvious before a user reads a single profile: surfacing ranked helpers with clear reasoning behind each result. Delivered as a full end-to-end Figma prototype from problem framing to high-fidelity screens.
            </p>

            {/* Project metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Role',     value: 'UI/UX Designer' },
                { label: 'Type',     value: 'Concept Project' },
                { label: 'Platform', value: 'Desktop Web App' },
                { label: 'Tool',     value: 'Figma' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#111] rounded-xl p-4 border border-[#222]">
                  <p className="text-[12px] uppercase tracking-wider text-[#374151] mb-1">{label}</p>
                  <p className="text-white text-[14px] font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Project statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '10+', label: 'Service Categories' },
                { value: '6',   label: 'AI Features' },
                { value: '1',   label: 'Clickable Prototype' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-3xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-[13px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 PROBLEM ──────────────────────────────────────────── */}
          <section id="problem" className="mb-24">
            <SectionTag num="02" label="Problem" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              The burden of finding the right helper falls entirely on the user.
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>Current Situation</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  People regularly need different kinds of help — childcare, home maintenance, fitness, elder care — but each category lives on a separate platform with its own search logic and onboarding. Finding help across multiple needs means starting from scratch each time, in a different place.
                </p>
              </div>

              <div>
                <SubLabel>Core Problem</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  Profiles show ratings, availability, and location — but not whether a helper's schedule, communication style, or approach fits a specific person's needs. Users invest time reaching out to helpers who turn out not to match. The friction is not finding options. It is knowing which option is right.
                </p>
              </div>

              <div>
                <SubLabel>Opportunity</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  A desktop web marketplace that assesses compatibility before the user scrolls through a single result could remove most of that uncertainty. A short preference-building step and a ranking model that explains its reasoning reduce the gap between recognising a need and making a confident booking.
                </p>
              </div>

              <div>
                <SubLabel>Design Challenge</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  The core question was how to make AI-assisted recommendations feel transparent rather than arbitrary. Compatibility reasoning had to be visible and specific enough to act on — without turning the interface into a scorecard.
                </p>
              </div>
            </div>

            <blockquote className="border-l-[3px] pl-6 py-1 mt-10" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "The goal wasn't to build a better directory. It was to remove the search entirely."
              </p>
            </blockquote>
          </section>

          {/* ── 03 RESEARCH & USERS ─────────────────────────────────── */}
          <section id="research" className="mb-24">
            <SectionTag num="03" label="Research & Users" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              Who Needs MatchMe
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>Research Approach</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-base">
                  This project began with problem space exploration rather than formal primary research. Competitor platforms were reviewed, and recurring patterns — category fragmentation, time pressure, and the difficulty of assessing helper fit from profiles alone — shaped the user types and design priorities.
                </p>
              </div>

              <div>
                <SubLabel>Research Objectives</SubLabel>
                <ul className="space-y-2">
                  {[
                    'Who needs personal service help and how they currently find it.',
                    'What information is absent from existing platforms that prevents confident booking.',
                    'What would make a user trust an AI-assisted recommendation.',
                    'How service needs vary across categories.',
                  ].map((item) => (
                    <li key={item} className="text-[#9CA3AF] text-base flex gap-3 leading-snug">
                      <span className="shrink-0 mt-0.5" style={{ color: ACCENT }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SubLabel>Key Insights</SubLabel>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Users want to be matched, not to search',
                      desc: 'Users want to be told who is right for them — not presented with a list to evaluate themselves. The burden of filtering belongs to the system.',
                    },
                    {
                      title: 'Trust in a recommendation depends on its explanation',
                      desc: 'Users only act on a recommendation when they understand why it was made. Compatibility reasoning needs to be visible — not implied by a score.',
                    },
                    {
                      title: 'Service needs cross multiple categories',
                      desc: 'A single user may need childcare, home maintenance, and fitness help at different times. No existing platform handles more than one of these categories well.',
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-5">
                      <p className="text-white text-[14px] font-semibold mb-1.5">{title}</p>
                      <p className="text-[#9CA3AF] text-base leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>Target Users</SubLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PERSONAS.map(({ name, age, role, goals, pain }) => (
                    <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                      <div className="mb-5">
                        <p className="text-white font-bold text-[15px]">{name}, {age}</p>
                        <p className="text-sm mt-0.5" style={{ color: ACCENT }}>{role}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Goals</p>
                        <ul className="space-y-1.5">
                          {goals.map(g => (
                            <li key={g} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                              <span style={{ color: ACCENT }} className="shrink-0">+</span>{g}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Pain Points</p>
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
              </div>

              <div>
                <SubLabel>Assumptions & Limitations</SubLabel>
                <ul className="space-y-2">
                  {[
                    'Personas are hypothetical, not validated through interviews or surveys.',
                    'Compatibility scoring and weighting are design assumptions, not based on real user data.',
                    'No usability testing was conducted; this project covers design only with no live implementation.',
                  ].map((item) => (
                    <li key={item} className="text-[#9CA3AF] text-base flex gap-3 leading-snug">
                      <span className="shrink-0 mt-0.5 text-[#374151]">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── 04 DESIGN DIRECTION ─────────────────────────────────── */}
          <section id="direction" className="mb-24">
            <SectionTag num="04" label="Design Direction" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              AI-First Design Principles
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>Design Principles</SubLabel>
                <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
                  The design system was built around one constraint: AI decisions must be surfaced, not hidden. Every component that presents a recommendation includes the reasoning behind it — score, matched criteria, and why this helper fits this user specifically.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              </div>

              <div>
                <SubLabel>AI Matching Layer</SubLabel>
                <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
                  Six AI capabilities form the core value proposition — replacing manual filtering with a model that learns, scores, and explains every match.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AI_FEATURES.map(({ icon, title, desc }) => (
                    <FeatureCard key={title} icon={icon} title={title} desc={desc} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 05 USER JOURNEY ─────────────────────────────────────── */}
          <section id="journey" className="mb-24">
            <SectionTag num="05" label="User Journey" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              End-to-End Service Journey
            </h2>

            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              The primary flow covers every step from recognising a need to completing the service and feeding that outcome back into the AI preference model.
            </p>

            <ol className="space-y-2 mb-8">
              {JOURNEY_STEPS.map(({ step, label, desc }) => (
                <li key={step} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span
                    className="font-mono text-[12px] shrink-0 tabular-nums mt-0.5 w-6 text-right"
                    style={{ color: ACCENT }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="text-white text-[14px] font-semibold mb-0.5">{label}</p>
                    <p className="text-[#6B7280] text-[14px] leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Placeholder label="Journey map visual" />
          </section>

          {/* ── 06 DESIGN PROCESS ───────────────────────────────────── */}
          <section id="process" className="mb-24">
            <SectionTag num="06" label="Design Process" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              From Concept to Component
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>Information Architecture</SubLabel>
                <Placeholder label="IA diagram or sitemap" />
              </div>

              <div>
                <SubLabel>Wireframes</SubLabel>
                <Placeholder label="Low-fidelity screens" />
              </div>

              <div>
                <SubLabel>Core Feature Set</SubLabel>
                <p className="text-[#9CA3AF] leading-7 mb-4 text-base">
                  Alongside the AI matching layer, four platform features cover the complete service lifecycle.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STANDARD_FEATURES.map(({ icon, title, desc }) => (
                    <FeatureCard key={title} icon={icon} title={title} desc={desc} />
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>Component Library</SubLabel>
                <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <img
                    src={MatchMeComponent}
                    alt="MatchMe Component Library"
                    className="w-full block"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── 07 FINAL SOLUTION ───────────────────────────────────── */}
          <section id="solution" className="mb-24">
            <SectionTag num="07" label="Final Solution" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">
              Final Screens &amp; Prototype
            </h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              High-fidelity screens cover the full flow: onboarding quiz, match feed with best-fit scores and reasoning, helper profiles with AI-generated summaries, calendar booking, in-chat AI prompts, and integrated payment.
            </p>

            <div className="bg-[#F5F5F5] rounded-xl p-4 mb-8 border border-[#E0E0E0]">
              <img src={MatchMeHIFI} alt="MatchMe Hi-Fi Screens" className="w-full object-cover" />
            </div>

            <div className="border p-8 text-center bg-[#2D0A1A]" style={{ borderColor: `${ACCENT}25` }}>
              <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>
                Try MatchMe in Figma
              </p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                Full clickable prototype — AI onboarding quiz, match feed with best-fit scores, booking, and messaging
              </p>
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

          {/* ── 08 REFLECTION ───────────────────────────────────────── */}
          <section id="reflection" className="mb-8">
            <SectionTag num="08" label="Reflection" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              Key Learnings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold text-[#374151]/50 font-mono mb-4 leading-none">{num}</p>
                  <p className="text-white font-semibold text-[15px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-12">
              <div>
                <SubLabel>Limitations</SubLabel>
                <Placeholder label="Known limitations of this project" />
              </div>
              <div>
                <SubLabel>Future Validation</SubLabel>
                <Placeholder label="Next steps for testing and iteration" />
              </div>
              <div>
                <SubLabel>Closing Reflection</SubLabel>
                <Placeholder label="Closing reflection" />
              </div>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A]">
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
