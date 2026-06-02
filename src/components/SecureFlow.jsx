import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import lofisecureflow from '../assets/lofisecureflow.png';
import { getProjectNavigation } from '../data/projectNavigation';
import ColorPallete from '../assets/Color plateDetectAI.png';
import Componentlibrary from '../assets/Component library.png';
import HIFIDetectAI from '../assets/HIFI Detect AI.png';
import DaShboardAI from '../assets/DashboardAI.png';

const ACCENT = '#22D3EE';

const SECTIONS = [
  { id: 'overview',   num: '01', label: 'Overview' },
  { id: 'problem',    num: '02', label: 'Problem & Solution' },
  { id: 'research',   num: '03', label: 'Research' },
  { id: 'visual',     num: '04', label: 'Design System & Component Library' },
  { id: 'wireframes', num: '05', label: 'Wireframes' },
  { id: 'hifi',       num: '06', label: 'Hi-Fi Design' },
  { id: 'learnings',  num: '07', label: 'Key Learnings' },
];

const PERSONAS = [
  {
    name: 'The Level 3 Analyst', role: '28–38 · SOC environment',
    goals: ['Leverage AI to process alerts faster', 'Maintain clear audit trail on every decision', 'Certify reports without reviewing every raw log'],
    pain: ['Alert fatigue from hundreds of AI outputs per shift', 'No visibility into how AI reached a decision', 'Pressure to approve fast but accountability falls on them'],
  },
  {
    name: 'The CISO', role: '40–55 · Security leadership',
    goals: ['Human accountability on all reports to leadership', 'Proof that AI actions were reviewed before escalation', 'Operational speed without compliance risk'],
    pain: ['Full automation is too risky — no oversight trail', 'Manual approval processes negate automation value', 'Existing tools offer no middle ground'],
  },
];

const PRINCIPLES = [
  { icon: '⚡', title: 'AI-first, human-certified', desc: 'AI acts autonomously. Humans verify and certify — not approve before.' },
  { icon: '◎', title: 'Transparent automation',    desc: 'Every AI decision is explained: confidence score, action taken, timeline.' },
  { icon: '✦', title: 'Attribution by design',     desc: 'Analyst name attached to each certified report — accountability without friction.' },
  { icon: '⊞', title: 'Signal over noise',          desc: 'Dashboard hierarchy surfaces what needs human attention first.' },
];

const FEATURES = [
  { icon: '🛡️', title: 'Autonomous Threat Response', desc: 'AI detects, isolates, and acts independently within defined parameters' },
  { icon: '🧠', title: 'Decision Trail',              desc: 'Full confidence scores, reasoning, and action timeline per alert' },
  { icon: '✅', title: 'Analyst Certification',       desc: 'One-step verification with named analyst accountability attached' },
  { icon: '📊', title: 'Live Alert Feed',             desc: 'Real-time dashboard of AI actions awaiting human review' },
];

const LEARNINGS = [
  { num: '01', title: 'Transparency unlocks trust',     desc: 'When analysts can see exactly how AI reached a decision — confidence score, evidence chain, action taken — verification becomes fast. Opacity is what slows review down, not automation itself.' },
  { num: '02', title: 'Level 3 beats Level 5',          desc: 'Full automation removes human accountability. Full manual review defeats the point of AI. The sweet spot is AI acting first, human verifying after — fast enough to scale, accountable enough to certify.' },
  { num: '03', title: 'Attribution is the feature',     desc: 'Adding an analyst\'s name to a certified report isn\'t just compliance — it transforms the verification step from a burden into a signal of professional judgment. Ownership changes behavior.' },
];

export default function SecureFlow() {
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

      {/* ═══ SIDEBAR ══════════════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div className="sticky flex flex-col overflow-y-auto" style={{ top: '80px', height: 'calc(100vh - 80px)' }}>

          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-1">
              {/* <span style={{ fontSize: '14px' }}>🔐</span> */}
              <h2 className="text-white font-bold text-sm leading-tight">Detect AI Security</h2>
            </div>
            <p className="text-[#4B5563] text-xs mb-3">AI Security Platform · UI/UX</p>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded-md border" style={{ background: '#071619', color: ACCENT, borderColor: ACCENT + '33' }}>Figma</span>
              {/* <span className="text-xs bg-[#0D0D0D] text-[#4B5563] px-2 py-1 rounded-md border border-[#1A1A1A]">2025</span> */}
            </div>
          </div>

          <nav className="flex-1 px-4 py-5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A2A2A] mb-3 px-1">Contents</p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, num, label }) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-3 px-2 py-[7px] rounded-lg text-left transition-all duration-150 group ${on ? 'bg-[#111]' : 'hover:bg-[#0D0D0D]'}`}
                    >
                      <span className={`font-mono text-xs shrink-0 tabular-nums`} style={{ color: on ? ACCENT : '#1F3030' }}>
                        {num}
                      </span>
                      <span className={`text-xs font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-4 rounded-full shrink-0" style={{ background: ACCENT }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#1A2A2A] mb-1">Role</p>
              <p className="text-xs text-[#9CA3AF] leading-tight">UI/UX Designer</p>
            </div>
            <a
              href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&t=XcUaykmv6BsMdlzP-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
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

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>01 — Overview</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">Detect AI Security</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">AI acts. Humans certify. Accountability stays intact.</p>

            {/* Hero visual — abstract cyber grid */}
            <div className="mb-8 border border-[#1A1A1A] overflow-hidden" style={{ background: '#BFD3D7', minHeight: '280px', position: 'relative' }}>
              {/* Simulated dashboard preview */}
              <div className="p-6">
               
                <div className="flex gap-4">
                <img
                src={DaShboardAI}
                alt="DetectAI Security High-Fidelity Screens"
                className="w-full block"
              />
              
              </div>
              </div>
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>02 — The Problem &amp; Solution</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">AI can handle the threats. The gap is who's accountable for the call.</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              Security analysts handle hundreds of AI-generated alerts every shift. The core tension: AI can detect and respond to threats autonomously, but organizations require human accountability before any report reaches leadership.
            </p>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              DetectAI Security is an AI security oversight platform designed for Level 3 automation — where AI detects threats and responds autonomously, and analysts verify decisions after the fact rather than approving them upfront. The result is full-speed AI automation with preserved human accountability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[{ value: 'L3', label: 'Automation Level' }, { value: 'AI-first', label: 'Approach' }, { value: 'Figma', label: 'Tool' }].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-xs uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>02 — The Problem &amp; Solution</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">AI can handle the threats. The gap is who's accountable for the call.</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              Security analysts handle hundreds of AI-generated alerts every shift. The core tension: AI can detect and respond to threats autonomously, but organizations require human accountability before any report reaches leadership.
            </p>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              Existing tools sit at the extremes. Full automation moves fast but leaves no one accountable. Manual approval loops preserve accountability but collapse under alert volume, forcing analysts to rubber-stamp decisions they haven't genuinely reviewed. DetectAI Security operates at <strong className="text-white">Level 3</strong> — AI acts first, humans verify after, and every certified report has an analyst's name attached.
            </p>

            {/* Two-column problem/solution split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#111] rounded-xl p-5 border border-[#1A1A1A]">
                <p className="text-xs uppercase tracking-[0.15em] text-red-400 mb-3 font-bold">The Broken Extremes</p>
                <ul className="space-y-2">
                  {['Full automation — fast, zero accountability', 'Manual approval — accountable, completely unscalable', 'Alert fatigue — 200+ actions per shift, no triage logic', 'No decision trail — AI acts, no one knows why'].map(p => (
                    <li key={p} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                      <span className="text-red-400 shrink-0 mt-0.5">−</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#111] rounded-xl p-5 border" style={{ borderColor: ACCENT + '33' }}>
                <p className="text-xs uppercase tracking-[0.15em] mb-3 font-bold" style={{ color: ACCENT }}>DetectAI Security's Level 3</p>
                <ul className="space-y-2">
                  {['AI detects, isolates, reports — autonomously', 'Full decision trail surfaced for fast review', 'Analysts certify, not approve — minutes not hours', 'Named attribution on every certified output'].map(p => (
                    <li key={p} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                      <span className="shrink-0 mt-0.5" style={{ color: ACCENT }}>+</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </section>

          {/* 03 — Research */}
          <section id="research" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>03 — Research</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Who lives inside this problem every day</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {PERSONAS.map(({ name, role, goals, pain }) => (
                <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <div className="mb-5">
                    <p className="text-white font-bold text-[15px]">{name}</p>
                    <p className="text-sm mt-0.5" style={{ color: ACCENT }}>{role}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-2">Goals</p>
                    <ul className="space-y-1.5">
                      {goals.map(g => (
                        <li key={g} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                          <span className="shrink-0" style={{ color: ACCENT }}>+</span>{g}
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
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>Core Design Tension</p>
              <p className="text-[#D1D5DB] text-base leading-relaxed">
                Both users need the same thing from opposite directions. The analyst needs AI to handle volume so they can focus on judgment. The CISO needs proof that judgment was applied before anything gets certified. The design had to serve both without compromise.
              </p>
            </div>
          </section>

          {/* 04 — Visual Direction */}
          <section id="visual" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>04 — Visual Direction</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Designed for high-stakes, high-speed environments</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              Security operations centers are dark, dense, and fast-moving. The interface needed to feel native to that environment — not a consumer product that was adapted. Deep blacks, a tight typographic system, and a strict color hierarchy were non-negotiable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
            <div className="bg-[#BFD3D7] rounded-xl p-6 border border-[#222]">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Color System — Semantic by Design</p>
              <div className="flex gap-4">
                <img
                src={ColorPallete}
                alt="DetectAI Security Low-Fidelity Wireframes"
                className="w-full block"
              />
                {/* {[
                  { hex: '#050F10', label: 'Background' },
                  { hex: '#22D3EE', label: 'AI Actions' },
                  { hex: '#EF4444', label: 'Active Threat' },
                  { hex: '#F59E0B', label: 'Pending' },
                  { hex: '#4ADE80', label: 'Certified' },
                ].map(({ hex, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl border border-white/10" style={{ backgroundColor: hex }} />
                    <p className="text-xs text-[#6B7280] text-center leading-tight">{label}</p>
                  </div>
                ))} */}
              </div>
            </div>

            <div className="bg-[#BFD3D7] rounded-xl p-6 border border-[#222] mt-4">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#374151] mb-4">Component Library</p>
              <div className="flex gap-4">
                <img
                src={Componentlibrary}
                alt="DetectAI Security Low-Fidelity Wireframes"
                className="w-full block"
              />
              
              </div>
            </div>
            
          </section>

          {/* 05 — Wireframes */}
          <section id="wireframes" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>05 — Wireframes</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Low-Fidelity Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              Wireframes mapped the full analyst workflow before any visual styling. The priority was information hierarchy — what does an analyst need to see the moment they open a flagged alert, and in what order does the AI's decision trail need to be surfaced?
            </p>

            <div className="border border-[#E0E0E0] overflow-hidden mb-6 bg-[#F5F5F5] p-3">
              <img
                src={lofisecureflow}
                alt="DetectAI Security Low-Fidelity Wireframes"
                className="w-full block"
              />
            </div>

            <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "The wireframes answered one question: can an analyst understand what the AI did and why — in under 30 seconds?"
              </p>
            </blockquote>
          </section>

          {/* 06 — Hi-Fi Design */}
          <section id="hifi" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>06 — Hi-Fi Design</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Final Screens &amp; Prototype</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              High-fidelity screens are in progress — applying the full dark design system, semantic color hierarchy, and interactive states across all analyst workflows.
            </p>
             <div className="border border-[#E0E0E0] overflow-hidden mb-6 bg-[#F5F5F5] p-3">
              <img
                src={HIFIDetectAI}
                alt="DetectAI Security High-Fidelity Screens"
                className="w-full block"
              />
            </div>
            <div className="border p-8 text-center bg-[#071619]" style={{ borderColor: ACCENT + '25' }}>
              <p className="text-xs font-mono tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>Try DetectAI Security in Figma</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">Full clickable prototype — dashboard, alert detail, AI decision trail, and analyst certification flow</p>
              <a
                href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&viewport=-1132%2C-2663%2C0.47&t=KftzYpuQktPqZlFd-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
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
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">Key Learnings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
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
