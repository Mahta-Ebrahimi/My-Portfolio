import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import chatbotImg from '../assets/aichatbot.png';
import dsFoundations from '../assets/Chatbot_DS_Foundations.png';
import dsComponents from '../assets/Chatbot_DS_Components.png';
import dsStates from '../assets/Chatbot_DS_States.png';
import { getProjectNavigation } from '../data/projectNavigation';

const ACCENT = '#38BDF8';
const PROTOTYPE_URL = 'https://www.figma.com/proto/rJ5uZ8H61kQgZwPFsuAlK5/Untitled?node-id=50-1713&t=gxN2o0fY8Y98rBHN-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A524';

const SECTIONS = [
  { id: 'overview',      num: '01', label: 'Overview' },
  { id: 'design',        num: '02', label: 'Design & UX' },
  { id: 'system',        num: '03', label: 'Design System' },
  { id: 'bots',          num: '04', label: 'The Two Assistants' },
  { id: 'build',         num: '05', label: 'Build' },
  { id: 'reflection',    num: '06', label: 'Reflection' },
];

const DESIGN_SYSTEM = [
  {
    label: 'Colours & Foundations',
    desc: 'A dark, low-glare palette built from five near-black surface tones: app canvas, the two assistant panels, cards, and the input field. They separate regions through subtle depth instead of heavy borders. Two saturated accents carry identity: blue (#00A8FF) for General AI and green (#00C77C) for Portfolio AI, with off-white primary text and a muted grey for secondary information. Typography follows a simple three-step scale (24px assistant titles, 16px body, 13px descriptions) on an 8–32px spacing rhythm, with 12, 16, 24px and pill-shaped corner radii.',
    img: dsFoundations,
    alt: 'Dual AI design system: colour palette, typography and spacing foundations',
  },
  {
    label: 'Core UI Components',
    desc: 'Both assistants are assembled from the same components, so only the identity colour changes between them. The assistant identity card pairs a coloured icon tile with the assistant name. Suggested prompt cards use a thin vertical accent bar to show which assistant they belong to while keeping the label as the focus. The pill-shaped chat input carries a circular send button that inherits the active assistant\'s colour.',
    img: dsComponents,
    alt: 'Dual AI core UI components: assistant identity cards, suggested prompt cards and chat input',
  },
  {
    label: 'Interaction Patterns & States',
    desc: 'Six chat states are defined to keep the interface predictable throughout a conversation: Empty, with suggested prompts visible; Typing, with the composer active; Generating, with an animated typing indicator; Response, when the assistant message is shown; Error, with a clear retry option; and Disabled, when an action is unavailable. For accessibility, every colour cue is paired with a text label, so state and identity are never communicated by colour alone.',
    img: dsStates,
    alt: 'Dual AI interaction patterns: six chat states and accessibility guidelines',
  },
];

const DESIGN_DECISIONS = [
  {
    icon: '◑',
    title: 'A Dedicated Space per Assistant',
    desc: 'Each assistant has its own panel with a header showing its name, icon, and purpose. The difference between the two is visible at a glance, without a settings menu to learn.',
  },
  {
    icon: '◐',
    title: 'Colour as Identity',
    desc: 'Blue marks General AI and green marks Portfolio AI. The colour runs through the icon, title, prompt cards, and send button, and is always paired with a text label.',
  },
  {
    icon: '▣',
    title: 'Prompt Cards Remove the Blank Page',
    desc: 'Three suggested prompts per assistant, each a short question with an arrow cue, show what each assistant can do and give the user a one-click starting point.',
  },
  {
    icon: '⊡',
    title: 'Predictable Feedback',
    desc: 'Clearly defined states, from empty and typing to generating, error, and disabled, keep the conversation feeling responsive and make it obvious what the system is doing.',
  },
];

const BOT_COMPARISON = [
  {
    name: 'General AI',
    tag: 'GPT-4o mini',
    color: '#00A8FF',
    desc: 'A general assistant focused on product design, from concepts and best practices to tools, trends, and real-world examples.',
    points: [
      'Blue identity colour',
      'Subtitle: "Powered by GPT-4o mini"',
      'Prompts: What is product design?, What are the best tools for product design?, What are the latest trends in product design?',
    ],
  },
  {
    name: 'Portfolio AI',
    tag: 'About Mahta',
    color: '#00C77C',
    desc: 'Designed for recruiters and collaborators. It answers questions about my skills, projects, background, and how to get in touch, in a friendly and professional tone.',
    points: [
      'Green identity colour',
      'Subtitle: "Explore my work and background"',
      'Prompts: Skills & expertise, Selected projects, Get in touch',
    ],
  },
];

const STACK = [
  { layer: 'Client', items: ['React', 'Tailwind CSS', 'Chat UI components'] },
  { layer: 'Server', items: ['Node.js', 'Express', 'OpenAI API (GPT-4o mini)', 'Custom knowledge base'] },
];

const LEARNINGS = [
  { num: '01', title: 'Identity needs more than colour', desc: 'Colour makes the active assistant recognisable at a glance, but it only works reliably when paired with names, icons, and labels. Designing these together made the interface clearer and more accessible.' },
  { num: '02', title: 'Prompts set expectations', desc: 'Suggested prompt cards do more than save typing. They show what each assistant is for, which reduces uncertainty before the first message is sent.' },
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
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
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
            <p className="text-[#4B5563] text-[13px] mb-3">UI/UX Design · 2024</p>
            <div className="flex gap-1.5 flex-wrap">
              <span className="text-[12px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#020d14' }}>
                Figma
              </span>
              <span className="text-[12px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#020d14' }}>
                React
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-3 px-1" style={{ color: '#2A2A2A' }}>
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
                      <span className="font-mono text-[12px] shrink-0 tabular-nums" style={{ color: on ? ACCENT : '#2A2A2A' }}>
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
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
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">Role</p>
                <p className="text-[13px] text-[#9CA3AF]">UI/UX Designer & Developer</p>
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">Tools</p>
                <p className="text-[13px] text-[#9CA3AF]">Figma · React · Node · OpenAI</p>
              </div>
            </div>
            <a
              href="https://github.com/Mahta-Ebrahimi/automation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[13px] font-semibold border transition-colors hover:text-white hover:border-white"
              style={{ color: ACCENT, borderColor: ACCENT + '66' }}
            >
              <FaGithub size={11} /> GitHub
            </a>
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[13px] font-semibold text-[#0D0D0D] hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}
            >
              <FaExternalLinkAlt size={9} /> View Prototype
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>01 — Overview</p>
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">AI Chatbot App</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">Two assistants. One interface. Designed for clarity.</p>

            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-[#F0F0F0] overflow-hidden border border-[#E0E0E0] mb-8 rounded-lg"
            >
              <div className='p-2'>
                  <img src={chatbotImg} alt="AI Chatbot App" className="w-full object-cover" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> Prototype in Figma
                </span>
              </div>
            </a>

            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              A dual-assistant chat experience that brings two AI assistants into one interface. General AI answers
              questions about product design, from concepts to tools and trends. Portfolio AI answers questions about my skills, projects,
              and experience, so recruiters can have a real conversation about my work without waiting for a reply.
            </p>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              The focus of the project was the user experience: a calm, focused conversational UI where people
              always know which assistant they are talking to, what they can ask it, and what the system is doing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '2', label: 'Assistant identities' },
                { value: '1', label: 'Shared layout & component set' },
                { value: '6', label: 'Defined chat states' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-2xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-[13px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Design & UX */}
          <section id="design" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>02 — Design & UX</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Two Assistants, One Clear Experience</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              The core UX challenge was bringing two very different assistants into a single product without
              confusing the user. Each assistant needed its own recognisable identity, while sharing the same layout
              and interaction patterns so the product still feels like one coherent experience.
            </p>

            <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6 mb-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>Design Challenge</p>
              <p className="text-[#D1D5DB] text-[16px] leading-relaxed italic">
                How might we let people talk to two different AI assistants in one interface, while always making it
                clear who is answering and what each assistant can help with?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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

          {/* 03 — Design System */}
          <section id="system" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>03 — Design System</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">One System, Two Identities</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              The UI is built on a compact design system that lets two assistants share a single structure. Layout,
              components, and states are identical across both, while a dedicated identity colour tells the user
              which assistant they are talking to.
            </p>

            <div className="space-y-4">
              {DESIGN_SYSTEM.map(({ label, desc, img, alt }) => (
                <div key={label} className="bg-[#111] rounded-xl border border-[#222] overflow-hidden">
                  <div className="px-5 sm:px-6 pt-5 pb-4">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>{label}</p>
                    <p className="text-[#9CA3AF] text-[15px] leading-relaxed">{desc}</p>
                  </div>
                  <img src={img} alt={alt} className="w-full block border-t border-[#1A1A1A]" />
                </div>
              ))}
            </div>
          </section>

          {/* 04 — The Two Assistants */}
          <section id="bots" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>04 — The Two Assistants</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Meet the Assistants</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              Both assistants share the same layout and components. What sets them apart is their identity colour,
              their suggested prompts, and the content they are designed around.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BOT_COMPARISON.map(({ name, tag, color, desc, points }) => (
                <div key={name} className="bg-[#111] rounded-xl border border-[#222] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#1A1A1A]">
                    <span className="text-[12px] font-bold px-2 py-1 rounded font-mono" style={{ color, background: color + '18' }}>
                      {tag}
                    </span>
                    <p className="font-bold text-[15px] mt-3" style={{ color }}>{name}</p>
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

          {/* 05 — Build */}
          <section id="build" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>05 — Build</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">From Design to Working Product</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              I also built the app myself, so the design could be experienced in a real browser with real AI
              responses. The React frontend implements the chat UI, while a Node.js server calls OpenAI's
              GPT-4o mini and keeps the API key out of the client.
            </p>

            <div className="space-y-4">
              {STACK.map(({ layer, items }) => (
                <div key={layer} className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-[#1A1A1A] flex items-center gap-3">
                    <span className="font-mono text-[12px] font-bold" style={{ color: ACCENT }}>/{layer.toLowerCase()}</span>
                    <span className="text-[13px] font-semibold text-[#374151] uppercase tracking-wider">{layer}</span>
                  </div>
                  <div className="px-5 py-4 flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className="text-[12px] bg-[#111] border border-[#222] px-3 py-1.5 text-[#9CA3AF] rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 06 — Reflection */}
          <section id="reflection" className="mb-8">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>06 — Reflection</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">Key Learnings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold font-mono mb-4 leading-none" style={{ color: '#0a1520' }}>{num}</p>
                  <p className="text-white font-semibold text-[15px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="rounded-xl p-8 border mb-12 bg-[#020d14]" style={{ borderColor: ACCENT + '33' }}>
              <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>Try It</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                Explore the interface in the Figma prototype or dive into the source code on GitHub.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PROTOTYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm transition-opacity"
                  style={{ background: ACCENT, color: '#0D0D0D' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <FaExternalLinkAlt size={12} /> Prototype
                </a>
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
              </div>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A]">
              <button onClick={() => navigate('/#work')} className="text-[13px] text-[#6B7280] hover:text-white transition-colors">
                ← Back to Work
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
