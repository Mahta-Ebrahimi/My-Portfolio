import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import pharmaChat from '../assets/pharma.png';
import dsFoundations from '../assets/01_Foundations.png';
import dsComponents from '../assets/02_Components.png';
import dsPatterns from '../assets/03_Patterns.png';
import dsLayout from '../assets/04_Layout.png';

const ACCENT = '#3CC4B4';   // lighter tint of the brand teal, readable on the dark page
const PROTOTYPE_URL = 'https://www.figma.com/proto/rJ5uZ8H61kQgZwPFsuAlK5/Untitled?node-id=10-361&t=gxN2o0fY8Y98rBHN-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A524';

// PharmaAI design tokens
const BRAND = {
  primary: '#147D75',
  bg:      '#F7FAF9',
  mint:    '#DDF2ED',
  text:    '#253B48',
  warning: '#EFB85C',
};

// ── Sidebar sections ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',        num: '01', label: 'Hero' },
  { id: 'overview',    num: '02', label: 'Overview' },
  { id: 'challenge',   num: '03', label: 'Challenge & Goals' },
  { id: 'process',     num: '04', label: 'Design Process' },
  { id: 'decisions',   num: '05', label: 'UI Decisions' },
  { id: 'screens',     num: '06', label: 'Key Screens' },
  { id: 'system',      num: '07', label: 'Design System' },
  { id: 'responsible', num: '08', label: 'Responsible AI' },
  { id: 'final',       num: '09', label: 'Final Design' },
  { id: 'reflection',  num: '10', label: 'Reflection' },
];

// ── Content data ──────────────────────────────────────────────────────────────
const GOALS = [
  {
    category: 'Visual Goals',
    items: [
      'Create a calm, clinical visual language that feels trustworthy without feeling cold.',
      'Use colour with a clear meaning, with a single reserved colour for safety information.',
      'Establish a typographic hierarchy that makes dense medical content easy to scan.',
    ],
  },
  {
    category: 'Interface Goals',
    items: [
      'Present AI responses as structured cards with headings and numbered points, not as blocks of text.',
      'Give sources, limitations, and the pharmacist button a permanent, visible place in the layout.',
      'Build one consistent component set and three-region layout that works across all eight screens.',
      'Define clear visual states for buttons, inputs, chips, and cards: default, hover, selected, focus, and disabled.',
    ],
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'AI-assisted exploration',
    desc: 'AI-assisted design tools were used early on to explore layout and visual directions quickly. This made it possible to compare several looks before committing to one, treating the generated output as a starting point rather than a finished design.',
  },
  {
    num: '02',
    title: 'Refinement in Figma',
    desc: 'The chosen direction was rebuilt and refined in Figma. Layout, spacing, typography, colour, and components were reworked by hand until the interface felt calm, consistent, and clinical.',
  },
  {
    num: '03',
    title: 'Design system',
    desc: 'The visual decisions were turned into a design system: colour, type, and spacing tokens, a component library with interactive states, product-specific patterns, and a desktop layout grid.',
  },
  {
    num: '04',
    title: 'Screens & prototype',
    desc: 'The system was applied to all eight screens, which were then connected into a clickable Figma prototype to present the interface as a whole.',
  },
];

const DECISIONS = [
  {
    icon: '▤',
    title: 'Sidebar navigation',
    desc: 'A white sidebar lists every main destination with a simple icon and label. "New conversation" is a filled teal button at the top, the active item is marked with a mint highlight, and Settings is set apart at the bottom below a divider.',
  },
  {
    icon: '◫',
    title: 'Three-region layout',
    desc: 'Sidebar, main content, and context panel sit side by side on a 1440px desktop grid. The context panel uses a soft tinted background so it reads as secondary to the conversation while still keeping references and the safety notice in view.',
  },
  {
    icon: '◐',
    title: 'Colour with meaning',
    desc: 'Teal marks the brand and primary actions, mint highlights the user\'s own messages and soft surfaces, and amber is reserved for safety information. Because amber is used nowhere else, a warning always reads as a warning.',
  },
  {
    icon: 'Aa',
    title: 'Typography & hierarchy',
    desc: 'A clean sans-serif on a five-step scale: display (32), heading (24), section (18), body (16), and caption (12) for metadata such as timestamps and source labels. AI answers use a heading and a numbered list, so the key points can be scanned at a glance.',
  },
];

const OTHER_SCREENS = [
  { title: 'Dashboard',           desc: 'The starting point of the workspace, giving an overview before a task begins.' },
  { title: 'Chat History',        desc: 'Previous conversations, so earlier questions and answers can be found and revisited.' },
  { title: 'Medication Library',  desc: 'A browsable library of medication reference information.' },
  { title: 'Drug Interactions',   desc: 'A dedicated workflow for screening potential interactions between medications.' },
  { title: 'Clinical Guidelines', desc: 'Access to clinical reference material and practice guidance.' },
  { title: 'Saved Items',         desc: 'Saved responses and references, collected in one place.' },
  { title: 'Settings',            desc: 'Workspace and account preferences.' },
];

const CHAT_ANNOTATIONS = [
  { num: '01', title: 'Structured response card', desc: 'The answer sits in a white card with a header, a divider, and numbered points in small mint markers. A mint "Sources: 2" badge in the header gives the references a clear visual presence.' },
  { num: '02', title: 'Suggested question chips', desc: 'Rounded outline chips such as "Side effects?" and "Interactions?" sit below the answer in a lighter visual weight, so they offer a next step without competing with the response.' },
  { num: '03', title: 'Clinical context panel',   desc: 'A tinted side panel groups the selected medication, numbered reference cards, and the safety notice into a quieter secondary column.' },
  { num: '04', title: 'Pharmacist button',        desc: '"Consult a pharmacist" uses the filled primary style at full panel width, giving it the strongest visual weight in the context panel.' },
];

const DESIGN_SYSTEM = [
  {
    label: 'Foundations',
    desc: 'Twelve colour tokens, including hover and pressed states for the primary teal and semantic colours for warning, danger, and success. A five-step type scale runs from 32px display to 12px caption, on spacing tokens from 4 to 32px and corner radii of 8, 12, 16, and 24px.',
    img: dsFoundations,
    alt: 'PharmaAI foundations: colour palette, typography scale, spacing and radius tokens',
  },
  {
    label: 'UI Components',
    desc: 'Primary, secondary, outline, and disabled buttons; default, filled, and error inputs; status chips for active, reviewed, needs review, error, and AI-assisted content; sidebar navigation; and the default, hover, selected, and focus states shared across interactive elements.',
    img: dsComponents,
    alt: 'PharmaAI UI components: buttons, form controls, chips, navigation and interactive states',
  },
  {
    label: 'Product Patterns',
    desc: 'Product-specific patterns built from those components: the chat bubble and AI response card with references, information cards for medications, guidelines, and saved conversations, clinical safety and success feedback, and the input composer with its verification reminder.',
    img: dsPatterns,
    alt: 'PharmaAI product patterns: chat components, information cards, safety feedback and input composer',
  },
  {
    label: 'Desktop Layout',
    desc: 'A 1440 × 900 desktop artboard split into three regions: a sidebar of about 246px, a fluid main content area for the primary workflow, and a context panel of about 320px. Spacing follows an 8px base rhythm, with visible labels, focus, and status as accessibility conventions.',
    img: dsLayout,
    alt: 'PharmaAI desktop layout: three-region grid and layout guidelines',
  },
];

const RESPONSIBLE_AI = [
  {
    label: 'Source visibility',
    title: 'Every answer shows its references',
    desc: 'Sources are designed into the response card itself: a mint badge in the header shows the source count, numbered reference cards in the context panel list them by type, and a small caption under each answer labels the reference material as example content.',
    examples: ['Sources: 2', 'References panel', 'Reference materials · Example content only'],
  },
  {
    label: 'Uncertainty warnings',
    title: 'Limitations are stated, not implied',
    desc: 'The Clinical safety card is the only amber surface in the interface, with a warning icon and a bold final line: "Verify before clinical use." The same message is repeated as small helper text inside the input composer.',
    examples: ['Clinical safety card', 'AI responses require professional verification.', 'AI assisted label'],
  },
  {
    label: 'Pharmacist review',
    title: 'The human expert stays in the loop',
    desc: 'The response content ends with "Refer patient-specific concerns to a pharmacist", and the context panel closes with a full-width "Consult a pharmacist" button in the primary style, the most prominent action in that column.',
    examples: ['Consult a pharmacist', 'Refer patient-specific concerns to a pharmacist'],
  },
  {
    label: 'Scope & data',
    title: 'Clear about what the product is not',
    desc: 'Small secondary-text captions state that no patient data is connected and label the interface as a concept, not a medical device. They are quiet in the visual hierarchy, but always present.',
    examples: ['No patient data connected', 'Concept UI · Not a medical device'],
  },
];

const LEARNINGS = [
  { num: '01', title: 'Trust can be designed visually',           desc: 'Sources, warnings, and the pharmacist button only build trust if they are seen when an answer is read. Giving them a fixed place in the layout, with their own colour and visual weight, became one of the main UI decisions in the concept.' },
  { num: '02', title: 'AI is a fast start, not a finished design', desc: 'AI-assisted tools made it quick to explore directions, but the result still needed careful work in Figma. Consistent spacing, a coherent component set, and colour that carries meaning all came from manual refinement.' },
  { num: '03', title: 'Restraint makes warnings work',            desc: 'Reserving amber for safety information only, and keeping the rest of the palette calm, makes the warning stand out without making the interface feel alarming. Every colour that is used sparingly is easier to notice.' },
];

const NEXT_STEPS = [
  { title: 'Design the remaining states',   desc: 'Extend the screens with loading, empty, error, and low-confidence states, using the existing chips and feedback patterns.' },
  { title: 'Contrast & accessibility pass', desc: 'Check colour contrast, focus styles, and text sizes across all screens, with special attention to the amber warning surfaces and secondary text.' },
  { title: 'Tablet & smaller layouts',      desc: 'Adapt the three-region layout to smaller screens, for example by collapsing the context panel into a drawer.' },
  { title: 'Grow the component library',    desc: 'Add components such as an inline source preview and visual severity indicators for drug interaction results.' },
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

const Pill = ({ children }) => (
  <span className="text-[13px] font-medium px-3 py-1 border rounded-full" style={{ color: ACCENT, borderColor: ACCENT + '44', background: ACCENT + '0D' }}>
    {children}
  </span>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function PharmaAI() {
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
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR ══════════════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div className="sticky flex flex-col" style={{ top: '80px', height: 'calc(100vh - 80px)' }}>

          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A] shrink-0">
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">PharmaAI</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">AI Healthcare Concept · UI Design</p>
            <div className="flex gap-2">
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#06171A', color: ACCENT, borderColor: ACCENT + '33' }}>Figma</span>
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#06171A', color: ACCENT, borderColor: ACCENT + '33' }}>Concept</span>
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
              <p className="text-[13px] text-[#9CA3AF] leading-tight">UI Designer</p>
            </div>
            <a
              href={PROTOTYPE_URL}
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
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">PharmaAI</h1>
            <p className="text-[18px] sm:text-[20px] text-[#6B7280] font-light mb-6">AI-powered pharmacy assistant. Sources visible. Pharmacists in the loop.</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['UI Design', 'Design System', 'Healthcare', 'AI Assistant', 'Desktop Web', 'Figma'].map(tag => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>

            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-[#1A1A1A] overflow-hidden rounded-lg"
              style={{ background: BRAND.mint }}
            >
              <div className="p-4 sm:p-6">
                <img src={pharmaChat} alt="PharmaAI AI Chatbot screen" className="w-full block rounded-md shadow-lg" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> Prototype in Figma
                </span>
              </div>
            </a>

            <p className="text-[#9CA3AF] leading-7 mt-8 text-lg">
              PharmaAI is a UI design concept for an AI-powered pharmacy assistant for healthcare professionals. The project focuses on the interface: a calm, clinical visual language, a complete design system, and a clear visual hierarchy that keeps sources, limitations, and the pharmacist in view on every answer.
            </p>
          </section>

          {/* ── 02 OVERVIEW ──────────────────────────────────────── */}
          <section id="overview" className="mb-20">
            <SectionTag num="02" label="Overview" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">At a Glance</h2>
            <Card className="divide-y divide-[#1A1A1A] mb-8">
              {[
                { field: 'Type',         value: 'Independent concept project' },
                { field: 'Role',         value: 'UI Designer' },
                { field: 'Platform',     value: 'Desktop Web Application' },
                { field: 'Tools',        value: 'Figma · AI-assisted design tools' },
                { field: 'Target users', value: 'Healthcare professionals and pharmacy teams' },
                { field: 'Category',     value: 'Healthcare · AI · UI Design' },
              ].map(({ field, value }) => (
                <div key={field} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 sm:w-32">{field}</p>
                  <p className="text-white text-[15px] font-medium">{value}</p>
                </div>
              ))}
              <div className="px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 sm:w-32 pt-1">Scope</p>
                  <div className="flex flex-wrap gap-2">
                    {['UI Design', 'Visual Design', 'Design System', 'Prototyping'].map(r => (
                      <Pill key={r}>{r}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              An AI assistant in a clinical setting has to look trustworthy. Its interface needs to feel calm and precise, present dense medical information clearly, and make it visually obvious where an answer comes from and when a pharmacist should be involved.
            </p>
            <p className="text-[#9CA3AF] leading-7 text-lg">
              PharmaAI explores what that interface could look like. The concept covers eight desktop screens, from the dashboard and AI chatbot to the medication library, interaction screening, and clinical guidelines, all built on one shared design system.
            </p>
          </section>

          {/* ── 03 CHALLENGE & GOALS ─────────────────────────────── */}
          <section id="challenge" className="mb-20">
            <SectionTag num="03" label="Challenge & Goals" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">Making AI answers useful without making them look more certain than they are.</h2>

            <div className="mb-10">
              <InsightCard label="Design Challenge">
                <p className="text-[#D1D5DB] text-[16px] leading-relaxed italic">
                  How might we design an interface for an AI pharmacy assistant that feels calm and trustworthy, presents medical information clearly, and makes sources, limitations, and pharmacist review a visible part of every answer?
                </p>
              </InsightCard>
            </div>

            <div className="space-y-6">
              {GOALS.map(({ category, items }) => (
                <div key={category}>
                  <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{category}</p>
                  <Card className="divide-y divide-[#1A1A1A]">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 px-5 py-4">
                        <span className="font-mono text-[12px] shrink-0 mt-1 tabular-nums" style={{ color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-[#9CA3AF] text-[15px] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 DESIGN PROCESS ────────────────────────────────── */}
          <section id="process" className="mb-20">
            <SectionTag num="04" label="Design Process" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">From AI-assisted exploration to Figma refinement</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The project combined fast exploration with careful manual design. AI-assisted tools helped open up options early, and Figma was where the concept was turned into a consistent, usable interface.
            </p>

            <ul className="relative">
              {PROCESS.map(({ num, title, desc }, i) => (
                <li key={num} className="relative flex items-start gap-5 pb-8 last:pb-0">
                  {i < PROCESS.length - 1 && (
                    <span className="absolute left-[15px] top-9 bottom-0 w-px" style={{ background: ACCENT + '33' }} />
                  )}
                  <span
                    className="relative z-10 w-8 h-8 shrink-0 rounded-full border flex items-center justify-center font-mono text-[11px] font-bold"
                    style={{ color: ACCENT, borderColor: ACCENT + '66', background: '#06171A' }}
                  >
                    {num}
                  </span>
                  <div className="pt-1">
                    <p className="text-white text-[16px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[15px] leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 05 UI DECISIONS ──────────────────────────────────── */}
          <section id="decisions" className="mb-20">
            <SectionTag num="05" label="UI Decisions" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">A calm, clinical workspace</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The interface needed to feel trustworthy and quiet, letting the content lead. Each decision below uses layout, colour, and type to keep the most important information visually prominent.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {DECISIONS.map(({ icon, title, desc }) => (
                <Card key={title} className="p-5 transition-colors duration-200 hover:border-[#2F4A47]">
                  <span className="text-lg mb-3 block font-semibold" style={{ color: ACCENT }}>{icon}</span>
                  <p className="text-white text-[15px] font-semibold mb-2">{title}</p>
                  <p className="text-[#6B7280] text-[15px] leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>

            <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "In a clinical tool, the most important information is not always the answer. Sometimes it is the source, or the reminder to ask a pharmacist."
              </p>
            </blockquote>
          </section>

          {/* ── 06 KEY SCREENS ───────────────────────────────────── */}
          <section id="screens" className="mb-20">
            <SectionTag num="06" label="Key Screens" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">AI Chatbot</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              The AI Chatbot is the core screen of PharmaAI and brings together most of the design system: the sidebar, message bubbles, the response card, chips, reference cards, the safety card, and the input composer.
            </p>

            <div className="border border-[#E0E0E0] overflow-hidden mb-6 rounded-lg p-3" style={{ background: BRAND.bg }}>
              <img src={pharmaChat} alt="PharmaAI AI Chatbot screen with structured response, references, and clinical safety notice" className="w-full block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {CHAT_ANNOTATIONS.map(({ num, title, desc }) => (
                <Card key={num} className="p-5">
                  <p className="font-mono text-[12px] mb-2" style={{ color: ACCENT }}>{num}</p>
                  <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-bold text-white mb-3">All Eight Screens</h3>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              The remaining seven screens share the same navigation, layout, and components. They can be explored in the interactive prototype.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OTHER_SCREENS.map(({ title, desc }, i) => (
                <a
                  key={title}
                  href={PROTOTYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#111] rounded-xl border border-[#222] p-4 transition-colors duration-200 hover:border-[#2F4A47]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-[14px] font-semibold">
                      <span className="font-mono text-[12px] mr-2" style={{ color: ACCENT }}>{String(i + 2).padStart(2, '0')}</span>
                      {title}
                    </p>
                    <FaExternalLinkAlt className="text-[#333] group-hover:text-[#9CA3AF] transition-colors" style={{ fontSize: '10px' }} />
                  </div>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* ── 07 DESIGN SYSTEM ─────────────────────────────────── */}
          <section id="system" className="mb-20">
            <SectionTag num="07" label="Design System" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Design System &amp; Components</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              A small, focused design system keeps all eight screens consistent. It is organised into four boards in Figma: foundations, UI components, product patterns, and desktop layout.
            </p>

            <div className="space-y-4">
              {DESIGN_SYSTEM.map(({ label, desc, img, alt }) => (
                <div key={label} className="rounded-xl p-4 sm:p-6 border border-[#222]" style={{ background: '#DCEBE8' }}>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: BRAND.text }}>{label}</p>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: BRAND.text }}>{desc}</p>
                  <img src={img} alt={alt} className="w-full block rounded-lg" />
                </div>
              ))}
            </div>
          </section>

          {/* ── 08 RESPONSIBLE AI ────────────────────────────────── */}
          <section id="responsible" className="mb-20">
            <SectionTag num="08" label="Responsible AI" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Designing for trust, not blind reliance</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              In healthcare, an AI answer that looks confident but cannot be checked is a risk. PharmaAI treats transparency as part of the interface itself. These patterns are built into the AI Chatbot screen.
            </p>

            <div className="space-y-4">
              {RESPONSIBLE_AI.map(({ label, title, desc, examples }) => (
                <Card key={label} className="p-6">
                  <p className="text-[12px] font-mono uppercase tracking-widest mb-2" style={{ color: label === 'Uncertainty warnings' ? BRAND.warning : ACCENT }}>{label}</p>
                  <p className="text-white font-semibold text-[16px] mb-2 leading-snug">{title}</p>
                  <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {examples.map(ex => (
                      <span key={ex} className="text-[12px] font-mono px-2 py-1 rounded border border-[#222] bg-[#0A0A0A] text-[#9CA3AF]">
                        {ex}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 09 FINAL DESIGN ──────────────────────────────────── */}
          <section id="final" className="mb-20">
            <SectionTag num="09" label="Final Design" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Interactive Prototype</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              The Figma prototype connects all eight screens, presenting the complete interface built on the PharmaAI design system.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Dashboard', 'AI Chatbot', 'Chat History', 'Medication Library', 'Drug Interactions', 'Clinical Guidelines', 'Saved Items', 'Settings'].map(s => (
                <span key={s} className="text-[12px] font-mono px-2.5 py-1 rounded border border-[#222] bg-[#111] text-[#9CA3AF]">{s}</span>
              ))}
            </div>
            <div className="border rounded-xl p-8 text-center" style={{ background: '#06171A', borderColor: ACCENT + '25' }}>
              <p className="text-[#9CA3AF] text-[15px] mb-6">Explore the complete PharmaAI concept in Figma.</p>
              <a
                href={PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
                style={{ background: ACCENT, color: '#0D1117' }}
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> Open Prototype
              </a>
            </div>
          </section>

          {/* ── 10 REFLECTION ────────────────────────────────────── */}
          <section id="reflection" className="mb-8">
            <SectionTag num="10" label="Reflection" />
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

            <h3 className="text-[20px] font-semibold text-white mb-6">Next Steps</h3>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px] max-w-2xl">
              The interface could be taken further in several directions:
            </p>
            <ul className="mb-16">
              {NEXT_STEPS.map(({ title, desc }, i) => (
                <li key={title} className={`flex items-start gap-5 py-5 ${i < NEXT_STEPS.length - 1 ? 'border-b border-[#111]' : ''}`}>
                  <span className="font-mono text-[12px] shrink-0 mt-0.5 tabular-nums" style={{ color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[15px] leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-[20px] font-semibold text-white mb-6">Closing Reflection</h3>
            <div className="space-y-5 max-w-2xl">
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                PharmaAI started as a chat interface and became a project about visual trust. The most important UI work was not the chat bubbles themselves, but everything around them: how sources, warnings, and the pharmacist button are given colour, weight, and a fixed place in the layout.
              </p>
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                Building the design system alongside the screens kept all eight screens consistent and made each new screen faster to design. As an independent concept, the project shows a visual direction rather than a finished product.
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
