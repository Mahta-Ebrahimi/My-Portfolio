import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import chatbotImg from '../assets/Chatbot.png';
import { getProjectNavigation } from '../data/projectNavigation';

const ACCENT = '#38BDF8';

const SECTIONS = [
  { id: 'overview',      num: '01', label: 'Overview' },
  { id: 'design',        num: '02', label: 'Design & UX' },
  { id: 'architecture',  num: '03', label: 'Architecture' },
  { id: 'bots',          num: '04', label: 'The Two Bots' },
  { id: 'reflection',    num: '05', label: 'Reflection' },
];

const DESIGN_DECISIONS = [
  {
    icon: '◑',
    title: 'Two Bots, One Interface',
    desc: 'Both assistants live in a single UI, the user always knows which bot is active without cognitive load.',
  },
  {
    icon: '▣',
    title: 'Chat-first Layout',
    desc: 'Minimal chrome, maximum conversation space. The interface gets out of the way so the dialogue is the focus.',
  },
  {
    icon: '◎',
    title: 'Recruiter-ready Tone',
    desc: 'The personal bot answers in a professional, friendly tone — designed to feel like a first conversation, not a FAQ page.',
  },
  {
    icon: '⊡',
    title: 'Real-time Feedback',
    desc: 'Typing indicators and streaming responses keep the interaction feeling alive and immediate, not transactional.',
  },
];

const STACK = [
  { layer: 'Client', items: ['React', 'Tailwind CSS', 'Fetch API', 'Chat UI components'] },
  { layer: 'Server', items: ['Node.js', 'Express', 'OpenAI API (GPT-4o mini)', 'Custom knowledge base'] },
  { layer: 'Root', items: ['Monorepo structure', 'Shared config', 'npm workspaces', 'Environment management'] },
];

const BOT_COMPARISON = [
  {
    name: 'AI Assistant',
    tag: 'GPT-4o mini',
    color: '#38BDF8',
    desc: 'Connected to OpenAI GPT-4o mini model. Handles general questions, conversation, and open-ended topics. Fast, capable, and always available.',
    points: ['OpenAI API integration', 'Streaming response support', 'Conversation memory within session', 'General-purpose assistant'],
  },
  {
    name: 'Personal Bot',
    tag: 'About Mahta',
    color: '#A78BFA',
    desc: 'Trained on my background, skills, projects, and experience. Built so recruiters and collaborators can ask anything about me and get accurate, personal answers.',
    points: ['Custom knowledge base', 'Background & experience Q&A', 'Project and skills context', 'Designed for recruiters'],
  },
];

const FEATURES = [
  { num: '01', title: 'Dual-mode chatbot', desc: 'Toggle between a general AI assistant (GPT-4o mini) and a personal bot that answers questions specifically about Mahta background and work.' },
  { num: '02', title: 'Root / Client / Server monorepo', desc: 'Clean separation of concerns — React frontend in /client, Express API in /server, shared config at the root. Each layer has its own dependencies and scripts.' },
  { num: '03', title: 'OpenAI API integration', desc: 'The AI bot calls GPT-4o mini via the OpenAI API from the server layer, keeping the API key server-side and never exposed to the client.' },
  { num: '04', title: 'Custom personal knowledge base', desc: 'The personal bot is grounded in structured data about skills, experience, projects, and background — giving recruiters accurate, consistent answers.' },
  { num: '05', title: 'Full-stack from scratch', desc: 'No starter template, no BaaS. REST API, routing, CORS, environment config, and the chat UI were all built from the ground up.' },
];

const LEARNINGS = [
  { num: '01', title: 'Separation of concerns saves you', desc: 'The root/client/server split made it trivial to update the frontend or swap the AI model without touching the other layer.' },
  { num: '02', title: 'Server-side API calls are non-negotiable', desc: 'Keeping the OpenAI key on the server means no leaked credentials, no rate-limit abuse, and a clean proxy pattern for any future AI features.' },
  { num: '03', title: 'Design drives trust in chat UIs', desc: 'A chat interface lives or dies by feel. Streaming, typing state, and clear bot identity cues made the difference between feeling like a tool and feeling like a conversation.' },
];

export default function Chatbot() {
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
              <span style={{ fontSize: '13px', color: ACCENT }}>◑</span>
              <h2 className="text-white font-bold text-[14px] leading-tight">AI Chatbot</h2>
            </div>
            <p className="text-[#4B5563] text-xs mb-3">Full-Stack · UI/UX · 2024</p>
            <div className="flex gap-1.5 flex-wrap">
              <span className="text-xs px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#020d14' }}>
                React
              </span>
              <span className="text-xs px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#020d14' }}>
                Node.js
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 px-1" style={{ color: '#2A2A2A' }}>
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
                      <span className="font-mono text-xs shrink-0 tabular-nums" style={{ color: on ? ACCENT : '#2A2A2A' }}>
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

          {/* Meta */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3">
            <div className="space-y-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#2A2A2A] mb-0.5">Role</p>
                <p className="text-xs text-[#9CA3AF]">UI/UX Designer & Full-Stack Dev</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#2A2A2A] mb-0.5">Stack</p>
                <p className="text-xs text-[#9CA3AF]">React · Node · OpenAI</p>
              </div>
            </div>
            <a
              href="https://github.com/Mahta-Ebrahimi/automation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold border transition-colors hover:text-white hover:border-white"
              style={{ color: ACCENT, borderColor: ACCENT + '66' }}
            >
              <FaGithub size={11} /> GitHub
            </a>
            <button
              disabled
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold border border-[#1A1A1A] text-[#333] cursor-not-allowed"
              title="Coming soon"
            >
              <FaExternalLinkAlt size={9} /> View App
            </button>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-8 py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>01 — Overview</p>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">AI Chatbot App</h1>
            <p className="text-xl text-[#6B7280] font-light mb-6">Two bots. One interface. Built from scratch.</p>

            <div className="bg-[#F0F0F0] overflow-hidden border border-[#E0E0E0] mb-8 rounded-lg">
              <div className='p-2'>
                  <img src={chatbotImg} alt="AI Chatbot App" className="w-full object-cover" />
              </div>
            </div>

            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              A full-stack chatbot application with two distinct AI assistants in a single interface.
              One is a general-purpose AI connected to GPT-4o mini. The other is a personal bot
              loaded with my background, skills, and project history, built specifically so recruiters
              can have a real conversation about who I am and what I do, without waiting for a reply.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '2', label: 'AI Bots in one app' },
                { value: '3', label: 'Layers: Root, Client, Server' },
                { value: '0', label: 'Starter templates used' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-2xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-xs uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Design & UX */}
          <section id="design" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>02 — Design & UX</p>
            <h2 className="text-2xl font-bold text-white mb-4">Chat Interface Design</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              The design challenge was making two completely different bots feel natural inside a
              single product. Each bot has its own visual identity while sharing the same core layout,
              the user always knows where they are without needing instructions.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {DESIGN_DECISIONS.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 border border-[#222]">
                  <span className="text-lg mb-3 block" style={{ color: ACCENT }}>{icon}</span>
                  <p className="text-white text-[15px] font-semibold mb-2">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "A chatbot UI is not just a chat window — it's a handshake. The design has to make
                the user feel heard before they've even typed anything."
              </p>
            </blockquote>
          </section>

          {/* 03 — Architecture */}
          <section id="architecture" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>03 — Architecture</p>
            <h2 className="text-2xl font-bold text-white mb-4">Root / Client / Server</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              The app is structured as a three-layer monorepo. Each layer has its own responsibilities,
              dependencies, and scripts — making it easy to develop, test, and scale each part
              independently without tangling concerns.
            </p>

            <div className="space-y-4 mb-8">
              {STACK.map(({ layer, items }) => (
                <div key={layer} className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-[#1A1A1A] flex items-center gap-3">
                    <span className="font-mono text-xs font-bold" style={{ color: ACCENT }}>/{layer.toLowerCase()}</span>
                    <span className="text-xs text-[#374151] font-bold uppercase tracking-wider">{layer}</span>
                  </div>
                  <div className="px-5 py-4 flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className="text-xs bg-[#111] border border-[#222] px-3 py-1.5 text-[#9CA3AF] rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <ul className="space-y-0">
              {FEATURES.map(({ num, title, desc }, i) => (
                <li key={num} className={`flex items-start gap-5 py-5 ${i < FEATURES.length - 1 ? 'border-b border-[#111]' : ''}`}>
                  <span className="font-mono text-xs shrink-0 mt-0.5 tabular-nums" style={{ color: ACCENT }}>{num}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 04 — The Two Bots */}
          <section id="bots" className="mb-20">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>04 — The Two Bots</p>
            <h2 className="text-2xl font-bold text-white mb-4">Meet the Assistants</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              Both bots share the same React frontend and Express backend, but are driven by
              completely different data sources and serve different purposes.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {BOT_COMPARISON.map(({ name, tag, color, desc, points }) => (
                <div key={name} className="bg-[#111] rounded-xl border border-[#222] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#1A1A1A]">
                    <span className="text-xs font-bold px-2 py-1 rounded font-mono" style={{ color, background: color + '18' }}>
                      {tag}
                    </span>
                    <p className="text-white font-bold text-[15px] mt-3">{name}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[#6B7280] text-base leading-relaxed mb-4">{desc}</p>
                    <ul className="space-y-2">
                      {points.map(pt => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-[#9CA3AF]">
                          <span style={{ color }}>+</span>{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — Reflection */}
          <section id="reflection" className="mb-8">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>05 — Reflection</p>
            <h2 className="text-2xl font-bold text-white mb-8">Key Learnings</h2>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold font-mono mb-4 leading-none" style={{ color: '#0a1520' }}>{num}</p>
                  <p className="text-white font-semibold text-[15px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="rounded-xl p-8 border mb-12" style={{ borderColor: ACCENT + '33', background: '#020d14' }}>
              <p className="text-xs font-mono tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>Try It</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                Explore the source code or launch the app and ask the personal bot anything about me.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Mahta-Ebrahimi/automation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm transition-opacity"
                  style={{ background: ACCENT, color: '#0D0D0D' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <FaGithub size={14} /> GitHub
                </a>
                <button
                  disabled
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm border border-[#222] text-[#444] cursor-not-allowed"
                  title="Coming soon"
                >
                  <FaExternalLinkAlt size={12} /> View App — Coming Soon
                </button>
              </div>
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
