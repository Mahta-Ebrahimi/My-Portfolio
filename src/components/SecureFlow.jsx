import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import lofisecureflow from '../assets/lofisecureflow.png';
import IADiagram from '../assets/digram.png';
import { getProjectNavigation } from '../data/projectNavigation';
import ColorPallete from '../assets/Color plateDetectAI.png';
import Componentlibrary from '../assets/Component library.png';
import HIFIDetectAI from '../assets/HIFI Detect AI.png';
import DaShboardAI from '../assets/DashboardAI.png';

const ACCENT = '#22D3EE';

// ── Sidebar sections ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',        num: '01', label: 'Hero' },
  { id: 'overview',    num: '02', label: 'Overview' },
  { id: 'problem',     num: '03', label: 'Problem' },
  { id: 'goals',       num: '04', label: 'Goals' },
  { id: 'research',    num: '05', label: 'Research' },
  { id: 'principles',  num: '06', label: 'Design Process' },
  { id: 'solution',    num: '07', label: 'Solution' },
  { id: 'reflection',  num: '08', label: 'Reflection' },
];

// Maps every page section ID → its parent nav item ID
const SECTION_TO_NAV = {
  hero:         'hero',
  summary:      'overview',
  overview:     'overview',
  problem:      'problem',
  goals:        'goals',
  research:     'research',
  personas:     'research',     // subsection of Research (05.1)
  principles:   'principles',   // start of Design Process (06)
  ia:           'principles',
  userflow:     'principles',
  features:     'principles',
  wireframes:   'principles',
  designsystem: 'principles',
  solution:     'solution',
  prototype:    'solution',
  decisions:    'solution',
  metrics:      'solution',
  reflection:   'reflection',
  takeaways:    'reflection',
};

// ── Content data ──────────────────────────────────────────────────────────────
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
  { icon: '◈', title: 'Support judgment, don\'t replace it', desc: 'AI informs the decision. The analyst owns it.' },
  { icon: '◎', title: 'Make AI reasoning visible',           desc: 'Show the evidence behind every AI recommendation so analysts can verify before acting.' },
  { icon: '⊞', title: 'Bring context into one place',       desc: 'Everything needed to investigate an alert is available in a single view.' },
  { icon: '⚡', title: 'Surface signal, suppress noise',     desc: 'Prioritize information so analysts focus on what matters, not what\'s loudest.' },
  { icon: '✦', title: 'Speed through clarity, not shortcuts', desc: 'Better-organized information enables faster decisions without reducing analyst control.' },
];

const FEATURES = [
  { icon: '', title: 'Autonomous Threat Response', desc: 'AI detects and isolates potential threats, initiating a defined response before the alert reaches the analyst.' },
  { icon: '', title: 'Decision Trail',              desc: 'Each alert surfaces the AI\'s confidence level, supporting evidence, and the action taken, so analysts have the context they need before making a decision.' },
  { icon: '', title: 'Analyst Certification',       desc: 'Analysts confirm, flag, or escalate each alert in a single step, with their name attached to the outcome.' },
  { icon: '', title: 'Live Alert Feed',             desc: 'Delivers a prioritized view of active alerts awaiting analyst review, organized by severity and status.' },
];

const GOALS = [
  {
    category: 'Business Goals',
    items: [
      'Reduce the volume of manual investigation work so teams can direct analyst capacity toward incidents that carry real risk.',
      'Make security operations more scalable by reducing the time required per triage decision without compromising investigation quality.',
      'Make AI-assisted decisions auditable and traceable, so organizations can adopt automation with confidence and clear ownership.',
    ],
  },
  {
    category: 'User Goals',
    items: [
      'Give analysts everything they need to investigate an alert in a single view, without switching between tools.',
      'Keep low-priority alerts out of the analyst\'s active queue so attention stays focused on genuine threats.',
      'Enable confident triage decisions — dismiss, investigate, or escalate — with less effort and less uncertainty.',
    ],
  },
  {
    category: 'Design Goals',
    items: [
      'Reduce cognitive load by surfacing the most decision-relevant information first and revealing additional detail progressively.',
      'Consolidate alert data, threat context, and AI insights into a single screen to eliminate context switching.',
      'Make AI assistance transparent and easy to override, so analysts can trust it without depending on it.',
      'Use visual hierarchy to help analysts distinguish critical signals from background noise at a glance.',
    ],
  },
];

const DESIGN_DECISIONS = [
  {
    num: '01',
    decision: 'Certify after, not approve before',
    why: 'Pre-approval gates slow investigation under high alert volume and undermine the efficiency benefit of AI-assisted response. Certifying after the fact keeps analysts accountable without blocking the workflow.',
    considered: 'Pre-approval modal required per alert before AI could act',
    tradeoff: 'The interface must maintain a clear distinction between "AI acted" and "analyst certified" at all times.',
  },
  {
    num: '02',
    decision: 'Decision trail as primary content',
    why: "Analysts cannot verify what they cannot see. Surfacing the AI reasoning chain — confidence level, evidence, and action taken — as the primary content of each alert removes the need to navigate elsewhere during investigation.",
    considered: 'Raw log view with an AI summary panel in the sidebar',
    tradeoff: 'AI reasoning must be structured and consistently formatted: a free-text summary is difficult to evaluate at speed.',
  },
  {
    num: '03',
    decision: 'Named attribution on every certified report',
    why: "Recording a decision under a specific analyst's name rather than a team changes the nature of the step. Certification becomes a professional judgment call, not an administrative task.",
    considered: 'Team-level attribution — "SOC Team approved"',
    tradeoff: 'The interface must clearly communicate what the analyst is confirming before submission, so responsibility is explicit, not assumed.',
  },
];

const LEARNINGS = [
  { num: '01', title: 'Transparency is the foundation of trust',             desc: 'Analysts need to understand how the AI reached a decision, not just accept what it decided. When the reasoning is visible, certification becomes a considered judgment rather than a routine sign-off. Presenting that reasoning clearly was as important as the accuracy of the AI itself.' },
  { num: '02', title: 'The right level of automation is the hardest problem', desc: 'The central design question was not how to make the workflow efficient — it was how much to automate. SecureFlow keeps analysts responsible for every final decision, with AI handling detection and analysis but never the outcome. That division shaped the structure of every screen.' },
  { num: '03', title: 'Attribution as a design principle',                    desc: "Attaching an analyst's name to a certified outcome was not planned as a design decision — it emerged as one. Making attribution part of the action rather than a separate step changed the nature of certification and gave accountability a concrete place in the workflow." },
];

const IA_TREE = [
  {
    level: 'L1', label: 'Dashboard', sub: 'Operational awareness',
    children: [
      { label: 'Prioritized alert feed', sub: 'An organized view of active alerts that helps analysts quickly identify what needs attention' },
      { label: 'Triage orientation',     sub: 'Controls that allow analysts to filter and navigate the alert queue without leaving the main view' },
    ],
  },
  {
    level: 'L2', label: 'Alert Detail', sub: 'Investigation and decision-making',
    children: [
      { label: 'Consolidated threat context', sub: 'Brings together the evidence and AI analysis needed to understand an alert — in one place' },
      { label: 'Transparent AI analysis',     sub: 'Surfaces the reasoning behind AI recommendations so analysts can evaluate them before deciding' },
    ],
  },
  {
    level: 'L3', label: 'Certification Flow', sub: 'Human review and accountability',
    children: [
      { label: 'Analyst decision point', sub: 'A focused step where analysts confirm, flag, or escalate based on their own judgment' },
      { label: 'Outcome record',         sub: 'Every decision is logged with clear analyst ownership, ensuring accountability without added friction' },
    ],
  },
];

const USER_FLOW_STEPS = [
  { num: '01', actor: 'AI',      label: 'Threat Detected',        desc: 'AI identifies a potential threat and flags it for analyst review, filtering noise from the queue.' },
  { num: '02', actor: 'AI',      label: 'Alert Generated',        desc: 'The alert reaches the analyst with confidence level, threat classification, and supporting evidence already organized.' },
  { num: '03', actor: 'Analyst', label: 'Reviews Decision Trail', desc: 'The analyst reviews the AI\'s reasoning — evidence, confidence level, and recommended action — before forming a judgment.' },
  { num: '04', actor: 'Analyst', label: 'Certifies or Escalates', desc: 'The analyst confirms, flags for review, or escalates, and the decision is recorded under their name.' },
  { num: '05', actor: 'System',  label: 'Report Generated',       desc: 'A certified report is generated capturing the AI analysis, analyst decision, and timestamp as a traceable record.' },
];

// ── Helper components ─────────────────────────────────────────────────────────

const SectionTag = ({ num, label }) => (
  <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>
    {num ? `${num} — ${label}` : label}
  </p>
);

const Card = ({ children, className = '', style = {} }) => (
  <div className={`bg-[#111] rounded-xl border border-[#222] ${className}`} style={style}>
    {children}
  </div>
);

const InsightCard = ({ label, children }) => (
  <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6">
    {label && (
      <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>{label}</p>
    )}
    {children}
  </div>
);

const Placeholder = ({ label, hint = 'Add content here', height = 200 }) => (
  <div
    className="rounded-xl flex flex-col items-center justify-center text-center p-8 border border-dashed"
    style={{ minHeight: height, borderColor: '#2A2A2A' }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-dashed"
      style={{ borderColor: '#333' }}
    >
      <span style={{ color: '#555', fontSize: 18 }}>+</span>
    </div>
    <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1" style={{ color: '#444' }}>{label}</p>
    <p className="text-[13px]" style={{ color: '#333' }}>{hint}</p>
  </div>
);

const GoalTag = ({ label }) => (
  <span
    className="text-[12px] font-mono px-2 py-0.5 rounded border"
    style={{ color: ACCENT, borderColor: ACCENT + '33', background: ACCENT + '0D' }}
  >
    {label}
  </span>
);

const ActorTag = ({ actor }) => {
  const map = {
    AI:      { color: ACCENT,     bg: ACCENT + '10',     border: ACCENT + '44'     },
    Analyst: { color: '#4ADE80',  bg: '#4ADE8010',       border: '#4ADE8044'       },
    System:  { color: '#F59E0B',  bg: '#F59E0B10',       border: '#F59E0B44'       },
  };
  const s = map[actor] || map.System;
  return (
    <span
      className="text-[12px] font-mono px-2 py-0.5 rounded border"
      style={{ color: s.color, background: s.bg, borderColor: s.border }}
    >
      {actor}
    </span>
  );
};

const MoSCoWBadge = ({ label }) => {
  let color = ACCENT;
  let bg    = ACCENT + '15';
  let border = ACCENT + '33';
  if (label === 'Should Have') { color = '#F59E0B'; bg = '#F59E0B15'; border = '#F59E0B33'; }
  if (label === 'Could Have')  { color = '#4ADE80'; bg = '#4ADE8015'; border = '#4ADE8033'; }
  if (label === "Won't Have")  { color = '#6B7280'; bg = '#6B728015'; border = '#6B728033'; }
  return (
    <span
      className="text-[12px] font-mono font-bold px-2 py-0.5 rounded border"
      style={{ color, background: bg, borderColor: border }}
    >
      {label}
    </span>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export default function SecureFlow() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [active, setActive] = useState('hero');
  const { prev, next } = getProjectNavigation(location.pathname);

  useEffect(() => {
    const observers = Object.keys(SECTION_TO_NAV).map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(SECTION_TO_NAV[id]); },
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
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR ══════════════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div className="sticky flex flex-col" style={{ top: '80px', height: 'calc(100vh - 80px)' }}>

          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A] shrink-0">
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">Detect AI Security</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">AI Security Platform · UI/UX</p>
            <div className="flex gap-2">
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#071619', color: ACCENT, borderColor: ACCENT + '33' }}>Figma</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#1A2A2A] mb-3 px-1">Contents</p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, num, label }) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-lg text-left transition-all duration-150 group ${on ? 'bg-[#111]' : 'hover:bg-[#0D0D0D]'}`}
                    >
                      <span className="font-mono text-[12px] shrink-0 tabular-nums" style={{ color: on ? ACCENT : '#1F3030' }}>
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight truncate ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-3 rounded-full shrink-0" style={{ background: ACCENT }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3 shrink-0">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#1A2A2A] mb-1">Role</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">UI/UX Designer</p>
            </div>
            <a
              href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&t=XcUaykmv6BsMdlzP-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
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

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* ── 01 HERO ──────────────────────────────────────────── */}
          <section id="hero" className="mb-20">
            <SectionTag num="01" label="Hero" />
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">Detect AI Security</h1>
            <p className="text-[18px] sm:text-[20px] text-[#6B7280] font-light mb-6">AI acts. Humans certify. Accountability stays intact.</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['UI/UX Design', 'AI Platform', 'B2B · SaaS', 'Figma'].map(tag => (
                <span key={tag} className="text-[13px] font-medium px-3 py-1 border rounded-full" style={{ color: ACCENT, borderColor: ACCENT + '44', background: ACCENT + '0D' }}>
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&t=XcUaykmv6BsMdlzP-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-[#1A1A1A] overflow-hidden"
              style={{ background: '#BFD3D7' }}
            >
              <div className="p-6">
                <img src={DaShboardAI} alt="DetectAI Security Dashboard" className="w-full block" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> Prototype in Figma
                </span>
              </div>
            </a>
          </section>

          {/* ── 02 PROJECT SUMMARY ───────────────────────────────── */}
          <section id="summary" className="mb-20">
            <SectionTag num="" label="Summary" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">At a Glance</h2>
            <Card className="divide-y divide-[#1A1A1A]">
              {[
                { field: 'Role',             value: 'Product Designer' },
                { field: 'Timeline',         value: '6 Weeks' },
                { field: 'Platform',         value: 'Web Application' },
                { field: 'Team',             value: 'Solo Project' },
                { field: 'Focus',            value: 'AI-Assisted Cybersecurity' },
              ].map(({ field, value }) => (
                <div key={field} className="flex items-center gap-6 px-6 py-4">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 w-28">{field}</p>
                  <p className="text-white text-[15px] font-medium">{value}</p>
                </div>
              ))}
              <div className="px-6 py-4">
                <div className="flex items-start gap-6">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 w-28 pt-1">Responsibilities</p>
                  <div className="flex flex-wrap gap-2">
                    {['UX Research', 'Product Design', 'UI Design', 'Prototyping', 'Design System'].map(r => (
                      <span key={r} className="text-[13px] font-medium px-3 py-1 rounded-full border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: ACCENT + '0D' }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* ── 03 PROJECT OVERVIEW ──────────────────────────────── */}
          <section id="overview" className="mb-20">
            <SectionTag num="02" label="Overview" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">What is SecureFlow?</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              SecureFlow is a concept for an AI-assisted cybersecurity platform designed to help Security Operations Center (SOC) analysts investigate and respond to security alerts more efficiently.
            </p>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              Modern SOC teams process hundreds of alerts every day, many of which are repetitive or false positives. This creates alert fatigue, slows investigations, and increases the risk of missing critical threats.
            </p>
            <p className="text-[#9CA3AF] leading-7 text-lg">
              SecureFlow explores how AI can support, not replace, security analysts by providing contextual threat analysis, explainable recommendations, and a streamlined investigation workflow. The focus of this project was designing a product experience that reduces cognitive load while keeping human analysts in control of every security decision.
            </p>
          </section>

          {/* ── 04 PROBLEM ───────────────────────────────────────── */}
          <section id="problem" className="mb-20">
            <SectionTag num="03" label="Problem" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-10 leading-snug">Security analysts are spending their time managing tools, not investigating threats.</h2>

            <div className="space-y-8">
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Current Situation</p>
                <p className="text-[#9CA3AF] leading-7 text-[15px]">
                  SOC analysts monitor security events, triage incoming alerts, and escalate genuine threats, all while switching between multiple disconnected security tools. Every alert demands a judgment call: investigate further, dismiss as a false positive, or escalate. At high volume, that workload leaves little time for the investigations that actually matter.
                </p>
              </div>

              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>The Problem</p>
                <p className="text-[#9CA3AF] leading-7 text-[15px]">
                  Most alerts are false positives, but analysts cannot know that without investigating each one, which leaves less time for genuine threats. Context is also fragmented across tools, so every alert requires switching systems and manually assembling information before investigation can begin. Analysts spend more time managing the workflow than doing the work.
                </p>
              </div>

              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Opportunity</p>
                <p className="text-[#9CA3AF] leading-7 text-[15px]">
                  AI can handle the repetitive, pattern-based work that currently consumes most of an analyst's time, pre-filtering low-signal alerts and surfacing relevant context automatically at the point of investigation. The goal is not automation for its own sake, but giving analysts the focus to concentrate on the investigations that genuinely require human judgment.
                </p>
              </div>

              <InsightCard label="Design Challenge">
                <p className="text-[#D1D5DB] text-[16px] leading-relaxed italic">
                  How might we design an investigation workflow that reduces the cognitive cost of alert triage, so SOC analysts can focus on the decisions that matter rather than the noise surrounding them?
                </p>
              </InsightCard>
            </div>
          </section>

          {/* ── 05 GOALS ─────────────────────────────────────────── */}
          <section id="goals" className="mb-20">
            <SectionTag num="04" label="Goals" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Goals</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              Each goal connects directly to the core problems: alert fatigue, fragmented workflows, and the need to keep analysts in control of every decision.
            </p>
            <div className="space-y-4">
              {GOALS.map(({ category, items }) => (
                <Card key={category} className="p-6">
                  <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-4" style={{ color: ACCENT }}>{category}</p>
                  <ul className="space-y-3">
                    {items.map((goal, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{goal}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 05 RESEARCH ──────────────────────────────────────── */}
          <section id="research" className="mb-20" style={{ scrollMarginTop: '96px' }}>
            <SectionTag num="05" label="Research" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Research Approach</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              Grounded in exploratory desk research, this project mapped the problem space through existing documentation, tooling analysis, and competitive review.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Research Objectives</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      'Understand the SOC analyst investigation workflow and identify where existing tools create the most friction.',
                      'Explore how other security platforms navigate the balance between automation and human oversight.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Research Questions</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      'What information does an analyst need to make a confident triage decision without switching tools?',
                      'What makes analysts willing to act on an AI-generated recommendation?',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pt-4">
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: ACCENT }}>Desk Research</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      'Industry documentation on SOC analyst workflows and alert triage processes.',
                      'Design patterns used in high-information-density B2B and decision-support tools.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: ACCENT }}>Competitive Analysis</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      'Existing SIEM platforms are built for log search, not analyst decision-making.',
                      'Many AI-assisted security tools prioritize output over explanation, which can create a trust and accountability gap.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            <div className="mb-8 pt-4">
              <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: ACCENT }}>Assumptions</p>
              <Card className="p-5">
                <p className="text-[13px] text-[#4B5563] mb-3 leading-relaxed">No primary research was conducted. The assumptions below shaped the design direction and would need validation before any real deployment.</p>
                <ul className="space-y-3">
                  {[
                    'Alert fatigue stems more from the effort per investigation than from alert volume alone.',
                    'Analysts are more likely to trust AI when its reasoning is visible and its output remains open to review.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: '#F59E0B' }} />
                      <p className="text-[#9CA3AF] text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div>
              <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>Key Insights</p>
              <div className="space-y-3">
                {[
                  { title: 'The bottleneck is the workflow, not detection',            desc: "Threat detection is fast. Investigation, across disconnected tools, isn't." },
                  { title: 'Context switching drives cognitive load',                  desc: "Analysts don't struggle because cases are complex — they struggle because the context they need is scattered across too many tools." },
                  { title: 'AI is most valuable when it reduces effort, not judgment', desc: "Analysts remain responsible for the final decision. AI is most effective when it accelerates investigation without replacing human expertise." },
                ].map(({ title, desc }) => (
                  <InsightCard key={title}>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{desc}</p>
                  </InsightCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── 07 PERSONAS ──────────────────────────────────────── */}
          <section id="personas" className="mb-20">
            <SectionTag num="05.1" label="Personas" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-2 leading-snug">Primary Persona</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              Based on exploratory desk research and documented assumptions. No primary user research was conducted.
            </p>

            <Card className="p-6">
              <div className="pb-5 mb-6 border-b border-[#1A1A1A]">
                <p className="text-white font-bold text-[16px] mb-1">SOC Analyst</p>
                <p className="text-sm" style={{ color: ACCENT }}>Security Operations Center, primary user</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Role</p>
                  <ul className="space-y-1.5">
                    {[
                      'Monitors security event streams and reviews incoming alerts in real time.',
                      'Triages alerts by deciding whether to investigate, dismiss, or escalate.',
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Responsibilities</p>
                  <ul className="space-y-1.5">
                    {[
                      'Investigates potential threats by gathering context across multiple tools.',
                      'Documents findings and closes or escalates cases with clear accountability.',
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Goals</p>
                  <ul className="space-y-1.5">
                    {[
                      'Reduce time spent on repetitive triage and focus attention on alerts that represent genuine risk.',
                      'Access the full investigation context needed for a confident decision, without switching tools.',
                      'Reach confident decisions through explainable AI, while keeping human judgment in control.',
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>+</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Pain Points</p>
                  <ul className="space-y-1.5">
                    {[
                      'Investigation fatigue accumulates from the repetitive effort of processing low-signal alerts, not alert volume alone.',
                      'Investigation context is spread across multiple tools: SIEM, ticketing, threat feeds, and internal documentation.',
                      'AI-generated recommendations often arrive without visible reasoning, making them difficult to trust or act on confidently.',
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="text-red-400 shrink-0 mt-[1px]">−</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Needs</p>
                  <ul className="space-y-1.5">
                    {[
                      'A single view that consolidates alert context, threat intelligence, and AI output.',
                      'Visible AI reasoning so recommendations can be understood and reviewed.',
                      'A workflow that reduces cognitive load without removing human judgment.',
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>+</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">Behaviors</p>
                  <ul className="space-y-1.5">
                    {[
                      'Frequently moves between multiple tools during each investigation to gather and cross-reference context.',
                      'Relies on pattern recognition and prior experience to distinguish genuine threats from false positives.',
                      'Reviews and verifies AI recommendations before acting when supporting evidence is unclear.',
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* ── 08 DESIGN PRINCIPLES ─────────────────────────────── */}
          <section id="principles" className="mb-20">
            <SectionTag num="06.1" label="Design Principles" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Principles guiding every decision</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              Five principles that translate the research into concrete design direction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <Card key={title} className="p-4 flex items-start gap-4">
                  <span className="text-lg shrink-0 mt-0.5" style={{ color: ACCENT }}>{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 09 INFORMATION ARCHITECTURE ──────────────────────── */}
          <section id="ia" className="mb-20">
            <SectionTag num="06.2" label="Information Architecture" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Designed around the investigation workflow</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              The architecture follows the analyst's natural investigation process rather than organizing screens by feature. Each level builds on the previous one, progressively revealing context as analysts move from awareness to investigation to a final decision, minimizing context switching at every step.
            </p>

            <div className="border border-[#1A1A1A] rounded-xl overflow-hidden mb-8 bg-[#0A0A0A] p-4">
              <img src={IADiagram} alt="SecureFlow Information Architecture — three-level investigation workflow" className="w-full block" />
            </div>

            <div className="space-y-3">
              {IA_TREE.map(({ level, label, sub, children }) => (
                <Card key={label} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[12px] font-mono font-bold" style={{ color: ACCENT }}>{level}</span>
                    <div>
                      <p className="text-white font-semibold text-[15px]">{label}</p>
                      <p className="text-[13px] text-[#6B7280]">{sub}</p>
                    </div>
                  </div>
                  <div className="pl-6 space-y-2 border-l border-[#2A2A2A]">
                    {children.map(c => (
                      <div key={c.label} className="flex items-start gap-2">
                        <span className="text-[#333] text-[12px] mt-0.5 shrink-0">└</span>
                        <div>
                          <p className="text-[#9CA3AF] text-[15px] font-medium">{c.label}</p>
                          <p className="text-[13px] text-[#4B5563]">{c.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 10 USER FLOW ─────────────────────────────────────── */}
          <section id="userflow" className="mb-20">
            <SectionTag num="06.3" label="User Flow" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Primary Investigation Flow</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The primary workflow from AI threat detection to a certified analyst decision. AI handles detection and context; analysts review the reasoning and own every final call.
            </p>
            {/* User Flow Diagram */}

            <div className="space-y-2">
              {USER_FLOW_STEPS.map(({ num, actor, label, desc }, idx) => (
                <div key={num} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                      style={{ background: ACCENT + '18', color: ACCENT, border: `1px solid ${ACCENT}44` }}
                    >
                      {num}
                    </div>
                    {idx < USER_FLOW_STEPS.length - 1 && (
                      <div className="w-px mt-1" style={{ background: '#2A2A2A', height: 24 }} />
                    )}
                  </div>
                  <Card className="flex-1 p-4 mb-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold text-[15px]">{label}</p>
                      <ActorTag actor={actor} />
                    </div>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* ── 11 FEATURE PRIORITIZATION ────────────────────────── */}
          <section id="features" className="mb-20">
            <SectionTag num="06.4" label="Feature Prioritization" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">MoSCoW Prioritization</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              MoSCoW (Must Have, Should Have, Could Have, and Won't Have) is a prioritization framework for defining product scope. It was applied here to focus the MVP on one complete workflow, from AI threat detection through analyst investigation to a certified decision.
            </p>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MoSCoWBadge label="Must Have" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map(({ title, desc }) => (
                  <Card key={title} className="p-4">
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[15px] leading-[1.65]">{desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MoSCoWBadge label="Should Have" />
                </div>
                <div className="space-y-2">
                  {[
                    { title: 'Team Dashboard',    desc: 'Gives team leads visibility into alert volume, analyst workload, and overall investigation status.' },
                    { title: 'Report Templates',  desc: 'Standardized formats that reduce the effort required to document and communicate triage outcomes to stakeholders.' },
                    { title: 'Bulk Certification', desc: 'Enables analysts to certify multiple low-risk alerts at once, reducing manual effort on routine cases.' },
                  ].map(({ title, desc }) => (
                    <Card key={title} className="p-4">
                      <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MoSCoWBadge label="Could Have" />
                </div>
                <div className="space-y-2">
                  {[
                    { title: 'Advanced Analytics',    desc: 'Trend data and investigation metrics that help teams identify patterns and improve triage processes over time.' },
                    { title: 'External Integrations', desc: 'Connections to ticketing and communication tools so certified outcomes can be routed without manual handoff.' },
                    { title: 'Custom Alert Rules',    desc: 'Configurable thresholds that allow teams to tailor detection sensitivity to their operational context.' },
                  ].map(({ title, desc }) => (
                    <Card key={title} className="p-4">
                      <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MoSCoWBadge label="Won't Have" />
                </div>
                <div className="space-y-2">
                  {[
                    { title: 'Mobile Application',         desc: 'Deferred to a later phase; the primary analyst workflow is desktop-first and requires full investigation context.' },
                    { title: 'Custom AI Model Training',   desc: 'Deferred to a later phase; model configuration is a distinct capability that sits outside the scope of the analyst-facing workflow.' },
                    { title: 'Threat Hunting Workspace',   desc: 'Deferred to a later phase; proactive investigation is a distinct workflow that extends beyond the reactive triage loop this product addresses.' },
                    { title: 'Multi-Tenant Administration', desc: 'Deferred to a later phase; tenancy management is a platform-level capability that would be defined alongside organizational deployment requirements.' },
                  ].map(({ title, desc }) => (
                    <Card key={title} className="p-4">
                      <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 12 WIREFRAMES ────────────────────────────────────── */}
          <section id="wireframes" className="mb-20">
            <SectionTag num="06.5" label="Wireframes" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Low-Fidelity Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              Low-fidelity wireframes were created to explore layout, information hierarchy, navigation, and the primary investigation workflow early in the process. Working at this level of fidelity allowed structural decisions to be made and revised quickly, before high-fidelity design added visual complexity.
            </p>
            <div className="border border-[#E0E0E0] overflow-hidden mb-6 bg-[#F5F5F5] p-3">
              <img src={lofisecureflow} alt="DetectAI Security Low-Fidelity Wireframes" className="w-full block" />
            </div>
            <p className="text-[#9CA3AF] leading-7 text-[15px]">
              The wireframing phase helped validate the overall structure before moving into high-fidelity design. Layout, hierarchy, and workflow decisions were confirmed at this stage, which reduced the need for structural changes later in the process.
            </p>
          </section>

          {/* ── 13 DESIGN SYSTEM ─────────────────────────────────── */}
          <section id="designsystem" className="mb-20">
            <SectionTag num="06.6" label="Design System" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Design System &amp; Component Library</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              A lightweight design system was established to ensure visual and functional consistency across all screens. It provides a shared foundation for AI-assisted security workflows, defining how status, hierarchy, and interaction are communicated throughout the product.
            </p>
            <div className="bg-[#BFD3D7] rounded-xl p-6 border border-[#222] mb-4">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-3">Color System — Semantic by Design</p>
              <p className="text-sm text-[#374151] mb-4 leading-relaxed">
                Color is used to communicate system status rather than decoration. Each value carries a defined meaning: cyan for AI activity, red for active threats, amber for pending review, and green for certified outcomes. This allows analysts to interpret the state of an alert at a glance, without relying solely on text labels.
              </p>
              <img src={ColorPallete} alt="DetectAI Security Color System" className="w-full block" />
            </div>
            <div className="bg-[#BFD3D7] rounded-xl p-6 border border-[#222]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-3">Component Library</p>
              <p className="text-sm text-[#374151] mb-4 leading-relaxed">
                Reusable components, including buttons, cards, tables, alert badges, status indicators, and form controls, were built to maintain consistency across screens and reduce design effort on repeated patterns. The library makes the interface easier to extend and keeps the visual language coherent as the product scales.
              </p>
              <img src={Componentlibrary} alt="DetectAI Security Component Library" className="w-full block" />
            </div>
          </section>

          {/* ── 14 FINAL SOLUTION ────────────────────────────────── */}
          <section id="solution" className="mb-20">
            <SectionTag num="07" label="Solution" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Final Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              The final interface brings AI-assisted detection and human decision-making together into a unified investigation workflow. The design system is applied consistently across every screen, so analysts can review alerts, understand AI reasoning, and certify outcomes without losing context at any stage.
            </p>
            <a
              href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&t=XcUaykmv6BsMdlzP-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block mb-8 border border-[#E0E0E0] overflow-hidden bg-[#F5F5F5] p-3"
            >
              <img src={HIFIDetectAI} alt="DetectAI Security High-Fidelity Screens" className="w-full block" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> Interactive Prototype
                </span>
              </div>
            </a>
            <div className="space-y-3 mb-16">
              {[
                {
                  title: 'Dashboard',
                  desc: 'The starting point for each investigation shift. Analysts see a prioritized view of active alerts organized by severity and status, giving them an immediate sense of what requires attention and in what order.',
                },
                {
                  title: 'Alert Detail',
                  desc: 'The primary investigation screen. All relevant context, including the detected threat, AI analysis, and supporting evidence, is consolidated in one view, so analysts can assess the situation without navigating between tools.',
                },
                {
                  title: 'Decision Trail',
                  desc: "The transparency layer between AI and analyst. Analysts can review the AI's confidence level, the evidence it considered, and the action it took before forming their own judgment, so every decision is informed rather than assumed.",
                },
                {
                  title: 'Analyst Certification',
                  desc: 'The final step in the investigation workflow. Analysts confirm the outcome, request further review, or escalate, all in a single action. The decision is recorded under their name, providing clear ownership of the outcome.',
                },
              ].map(({ title, desc }) => (
                <Card key={title} className="p-4">
                  <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-bold text-white mb-3">Interactive Prototype</h3>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              The prototype covers the complete investigation workflow, from the initial alert queue through AI reasoning review to final analyst certification, across the primary screens and decision points.
            </p>
            <div className="border p-8 text-center" style={{ background: '#071619', borderColor: ACCENT + '25' }}>
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

          {/* ── 16 DESIGN DECISIONS ──────────────────────────────── */}
          <section id="decisions" className="mb-20">
            <SectionTag num="07.2" label="Design Decisions" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Key Decisions &amp; Rationale</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              Each decision below is grounded in a specific analyst need, with a real alternative considered and a clear rationale for the direction chosen.
            </p>
            <div className="space-y-4">
              {DESIGN_DECISIONS.map(({ num, decision, why, considered, tradeoff }) => (
                <Card key={num} className="p-6">
                  <div className="flex items-start gap-4">
                    <p className="text-4xl font-bold font-mono leading-none shrink-0" style={{ color: ACCENT + '28' }}>{num}</p>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-[16px] mb-3 leading-snug">{decision}</p>
                      <p className="text-[#9CA3AF] text-base leading-relaxed mb-4">{why}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#1A1A1A]">
                          <p className="text-[12px] font-mono uppercase tracking-widest text-red-400 mb-1">Alternative Considered</p>
                          <p className="text-[14px] text-[#6B7280]">{considered}</p>
                        </div>
                        <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#1A1A1A]">
                          <p className="text-[12px] font-mono uppercase tracking-widest mb-1" style={{ color: ACCENT }}>Trade-off</p>
                          <p className="text-[14px] text-[#6B7280]">{tradeoff}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 17 SUCCESS METRICS ───────────────────────────────── */}
          <section id="metrics" className="mb-20">
            <SectionTag num="07.3" label="Success Metrics" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">How success would be measured</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The metrics below were identified during the design process as indicators of whether the product meets its original goals. Actual targets would need to be defined in collaboration with stakeholders and measured after implementation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { category: 'Speed',          metric: 'Time to certify per alert',               note: 'Target: To be defined with stakeholders' },
                { category: 'Accountability', metric: 'Certification rate with named attribution', note: 'Target: To be defined with stakeholders' },
                { category: 'Volume',         metric: 'Alerts handled per analyst shift',         note: 'Target: To be defined with stakeholders' },
              ].map(({ category, metric, note }) => (
                <Card key={category} className="p-5 text-center">
                  <p className="text-[13px] font-semibold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>{category}</p>
                  <p className="text-white text-[15px] font-medium mb-3 leading-snug">{metric}</p>
                  <p className="text-[13px] italic" style={{ color: '#374151' }}>{note}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 18 REFLECTION ────────────────────────────────────── */}
          <section id="reflection" className="mb-8">
            <SectionTag num="08" label="Reflection" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">Key Learnings</h2>
            <div className="space-y-4 mb-16">
              {LEARNINGS.map(({ num, title, desc }) => (
                <Card key={num} className="p-6 sm:p-8">
                  <p className="text-3xl font-bold font-mono mb-2 leading-none" style={{ color: ACCENT, opacity: 0.35 }}>{num}</p>
                  <p className="text-white font-semibold text-[18px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-[15px] leading-7 max-w-2xl">{desc}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-[20px] font-semibold text-white mb-6">Closing Reflection</h3>
            <div className="space-y-5 max-w-2xl">
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                The core challenge in SecureFlow was not detection — it was trust. An AI can be accurate and still be unusable if analysts cannot see how it reached a decision. That insight shaped the certification model and most of what followed: every screen exists to make AI reasoning legible enough for a human to act on it with confidence.
              </p>
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                The remaining open question is whether the design holds up under real conditions. Testing the investigation flow with actual SOC analysts — observing how they read evidence, where they hesitate, and what they actually need before certifying — would surface assumptions this concept cannot answer on its own.
              </p>
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
