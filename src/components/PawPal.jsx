import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import pawpalImg from '../assets/HIFIPawpal.png';
import ColorPallete from '../assets/paepalColorPalet.png';
import { getProjectNavigation } from '../data/projectNavigation';
import LoFIPawpal from '../assets/LOFIPawpal.png';
import pawpalComponents from '../assets/PawPalComponents.png';
import { tr } from '../context/LanguageContext';

const SECTIONS = [
  { id: 'overview',      num: '01', label: tr("Overview", "Oversigt") },
  { id: 'problem',       num: '02', label: tr("Problem & Solution", "Problem & løsning") },
  { id: 'research',      num: '03', label: 'Research' },
  { id: 'visual',        num: '04', label: tr("Design System &Component Library", "Designsystem & komponentbibliotek") },
  { id: 'wireframes',    num: '05', label: 'Wireframes' },
  { id: 'hifi',          num: '06', label: tr("Hi-Fi Design", "Hi-fi-design") },
  // { id: 'design-system', num: '07', label: 'Design System' },
  { id: 'learnings',     num: '07', label: tr("Key Learnings", "Vigtigste læringer") },
];

const PERSONAS = [
  {
    name: 'Anna & Julia', age: '42 & 40', role: tr("Family · Dog owners", "Familie · Hundeejere"),
    goals: [tr("Family-friendly sitters they fully trust", "Familievenlige hundepassere, de har fuld tillid til"), tr("Photos & media updates during long trips", "Billeder og opdateringer under lange rejser"), tr("Confidence looking for active sitters", "Tryghed i søgningen efter aktive hundepassere")],
    pain:  [tr("Nervous leaving Luna with strangers", "Nervøse for at efterlade Luna hos fremmede"), tr("Needs high personality match for Luna", "Har brug for et godt personlighedsmatch til Luna"), tr("Time-sensitive with family to support", "Tidspresset med en familie at tage sig af")],
  },
  {
    name: 'Emma', age: '28', role: tr("Single · Spontaneous", "Single · Spontan"),
    goals: [tr("Quick affordable bookings — no fuss", "Hurtige og billige bookinger – uden besvær"), tr("Exercise and affection for her dog", "Motion og kærlighed til hendes hund"), tr("Trust through verified reviews", "Tillid gennem verificerede anmeldelser")],
    pain:  [tr("Sudden trips cause stress and panic", "Pludselige rejser giver stress og panik"), tr("Distrusts strangers without social proof", "Har ikke tillid til fremmede uden social proof"), tr("Hates clunky booking flows", "Hader tunge bookingflows")],
  },
];

const PRINCIPLES = [
  { icon: '✦', title: tr("Clarity", "Klarhed"),          desc: tr("One clear outcome per screen", "Ét tydeligt mål pr. skærm") },
  { icon: '◎', title: tr("Accessibility", "Tilgængelighed"),    desc: tr("Contrast ratios, large touch targets", "Kontrastforhold og store touch-flader") },
  { icon: '♡', title: tr("Emotional warmth", "Følelsesmæssig varme"), desc: tr("Reduced friction and anxiety", "Mindre friktion og bekymring") },
  { icon: '⊞', title: tr("Grid spacing", "Grid-afstande"),     desc: tr("Consistent 4pt rhythm throughout", "Konsistent 4pt-rytme overalt") },
];

const FEATURES = [
  { icon: '🔍', title: tr("Browse & Filter", "Gennemse & filtrér"), desc: tr("Dates, service type, price", "Datoer, servicetype, pris") },
  { icon: '🐾', title: tr("Sitter Profiles", "Hundepasserprofiler"), desc: tr("Photos, services, reviews", "Billeder, ydelser, anmeldelser") },
  { icon: '📅', title: tr("Easy Booking", "Nem booking"),    desc: tr("Dates, service type, dog info", "Datoer, servicetype, info om hunden") },
  { icon: '💬', title: tr("Messaging", "Beskeder"),       desc: tr("Real-time updates during stay", "Opdateringer i realtid under opholdet") },
];

const COLORS = [
  { hex: '#4A6741', label: tr("Primary", "Primær") },
  { hex: '#2D3F2C', label: tr("Dark", "Mørk") },
  { hex: '#8B7355', label: tr("Warm", "Varm") },
  { hex: '#F5F0E8', label: 'BG' },
  { hex: '#E8E0D0', label: tr("Light", "Lys") },
];

const LEARNINGS = [
  { num: '01', title: tr("Trust is the product", "Tillid er produktet"),      desc: tr("Every screen was evaluated: does the user trust enough to leave their dog? Simplicity guided everything.", "Hver skærm blev vurderet: Har brugeren tillid nok til at efterlade sin hund? Enkelhed styrede alt.") },
  { num: '02', title: tr("Fewer choices, more flow", "Færre valg, mere flow"),  desc: tr("A cleaner navigation map kept users linear — fewer decision points meant better conversion and less anxiety.", "En enklere navigationsstruktur holdt brugerne på et lineært spor – færre beslutningspunkter gav bedre konvertering og mindre bekymring.") },
  { num: '03', title: tr("Research shapes components", "Research former komponenterne"), desc: tr("Persona insights directly influenced navigation structure, search priorities, and every component decision.", "Indsigter fra personaerne påvirkede direkte navigationsstrukturen, søgeprioriteterne og hver eneste komponentbeslutning.") },
];

const DS_TAGS = [tr("Components", "Komponenter"), tr("Forms", "Formularer"), tr("Icons", "Ikoner"), 'Booking', tr("Payment", "Betaling"), tr("Navigation", "Navigation")];

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
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
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
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("Mobile App · UI/UX", "Mobilapp · UI/UX")}</p>
            <div className="flex gap-2">
              <span className="text-[12px] bg-[#0F2318] text-[#4ADE80] px-2 py-1 rounded-md border border-[#4ADE80]/20">Figma</span>
              {/* <span className="text-xs bg-[#0D0D0D] text-[#4B5563] px-2 py-1 rounded-md border border-[#1A1A1A]">2024</span> */}
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#1F2D1A] mb-3 px-1">
              {tr("Contents", "Indhold")}
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
                      <span className={`font-mono text-[12px] shrink-0 tabular-nums ${on ? 'text-[#4ADE80]' : 'text-[#1F2D1A] group-hover:text-[#374151]'}`}>
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
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
              <p className="text-[12px] font-medium uppercase tracking-widest text-[#1F2D1A] mb-1">{tr("Role", "Rolle")}</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">{tr("UI/UX Designer", "UI/UX-designer")}</p>
            </div>
            <a
              href="https://www.figma.com/proto/hr07ubZBbbWwdw2kWrwJGD/Mahta-Ebrahimi?node-id=326-4264&t=nK5Mq8QwGYZAuGdV-1&scaling=min-zoom&content-scaling=fixed&page-id=37%3A23&starting-point-node-id=326%3A4415&show-proto-sidebar=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#4ADE80] text-[#0D1117] text-[13px] font-semibold py-2 rounded-lg hover:bg-[#22C55E] transition-colors"
            >
              <FaExternalLinkAlt style={{ fontSize: '9px' }} />
              {tr("View Prototype", "Se prototype")}
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">{tr("01 — Overview", "01 — Oversigt")}</p>
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">PawPal</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">{tr("Peace for owners. Care for dogs.", "Ro for ejerne. Omsorg for hundene.")}</p>
            <div className="rounded-2xl overflow-hidden mb-8 bg-[#F0F0F0] p-3">
              <img src={pawpalImg} alt={tr("PawPal App", "PawPal-appen")} className="w-full object-cover" />
            </div>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("A mobile app connecting dog owners with trusted local sitters — designed from research to hi-fi prototype with a complete user-centered process.", "En mobilapp, der forbinder hundeejere med betroede lokale hundepassere – designet fra research til hi-fi-prototype gennem en komplet brugercentreret proces.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[{ value: '2', label: tr("User Personas", "Brugerpersonaer") }, { value: '20+', label: tr("Design Iterations", "Designiterationer") }, { value: '1', label: tr("User in Prototype", "Bruger i prototypen") }].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-3xl font-bold text-[#4ADE80] mb-2">{value}</p>
                  <p className="text-[13px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">{tr("02 — The Problem & Solution", "02 — Problemet & løsningen")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("Finding the Right Sitter Should Feel Safe", "Det skal føles trygt at finde den rette hundepasser")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("Dog owners struggle to find trusted sitters quickly. Existing solutions feel untrustworthy — leaving pet owners anxious when they leave home. The challenge was to design a mobile experience that feels safe, simple, and personal.", "Hundeejere har svært ved hurtigt at finde hundepassere, de kan stole på. Eksisterende løsninger virker utroværdige – og efterlader ejerne bekymrede, når de tager hjemmefra. Udfordringen var at designe en mobiloplevelse, der føles tryg, enkel og personlig.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
            <blockquote className="border-l-[3px] border-[#4ADE80] pl-6 py-1">
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                {tr("\"The goal wasn't to build an app. It was to make a dog owner feel safe enough to leave.\"", "\"Målet var ikke at bygge en app. Det var at få en hundeejer til at føle sig tryg nok til at tage af sted.\"")}
              </p>
            </blockquote>
          </section>

          {/* 03 — Research */}
          <section id="research" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">{tr("03 — Research", "03 — Research")}</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{tr("Understanding Users", "Forståelse af brugerne")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {PERSONAS.map(({ name, age, role, goals, pain }) => (
                <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <div className="mb-5">
                    <p className="text-white font-bold text-[15px]">{name}, {age}</p>
                    <p className="text-[#4ADE80] text-sm mt-0.5">{role}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Goals", "Mål")}</p>
                    <ul className="space-y-1.5">
                      {goals.map(g => (
                        <li key={g} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                          <span className="text-[#4ADE80] shrink-0">+</span>{g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Pain Points", "Udfordringer")}</p>
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
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#4ADE80] mb-2">{tr("Key Design Insight", "Vigtigste designindsigt")}</p>
              <p className="text-[#D1D5DB] text-base leading-relaxed">
                {tr("Both personas share one core need: ", "Begge personaer deler ét grundlæggende behov: ")}<em>{tr("trust", "tillid")}</em>{tr(". Every design decision — navigation, typography, copy, imagery — was evaluated through this single lens first.", ". Hver designbeslutning – navigation, typografi, tekst og billeder – blev først vurderet gennem netop denne linse.")}
              </p>
            </div>
          </section>

          {/* 04 — Visual Direction */}
          <section id="visual" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">{tr("04 — Design System & Component Library", "04 — Designsystem & komponentbibliotek")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Design Approach", "Designtilgang")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("Soft greens and earthy tones create a calm, friendly atmosphere — reassuring for pet owners anxious about leaving their dogs. Playful illustration pairs with clean UI.", "Bløde grønne og jordfarvede toner skaber en rolig, venlig stemning – beroligende for ejere, der er nervøse for at efterlade deres hund. Legende illustrationer kombineres med et rent UI.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span className="text-[#4ADE80] text-lg shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-4">{tr("Color Palette", "Farvepalet")}</p>
              {/* <div className="flex gap-4">
                {COLORS.map(({ hex, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl border border-white/5" style={{ backgroundColor: hex }} />
                    <p className="text-[13px] text-[#6B7280]">{label}</p>
                  </div>
                ))}
              </div> */}
               <img
                src={ColorPallete}
                alt={tr("PawPal low-fidelity wireframes", "PawPal low-fidelity-wireframes")}
                className="w-full block"
              />

              
            </div>
          </section>

          {/* 05 — Wireframes */}
          <section id="wireframes" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">{tr("05 — Wireframes", "05 — Wireframes")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Low-Fidelity Screens", "Low-fidelity-skærme")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("Wireframes focused on information hierarchy and navigation patterns before any visual design. Key flows: onboarding, sitter search, profile view, booking form, messaging, payment.", "Wireframes fokuserede på informationshierarki og navigationsmønstre før det visuelle design. Centrale flows: onboarding, søgning efter hundepasser, profilvisning, bookingformular, beskeder og betaling.")}
            </p>
            <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center mb-6 border border-[#E0E0E0]" style={{ minHeight: '200px' }}>
               <img
                src={LoFIPawpal}
                alt={tr("PawPal low-fidelity wireframes", "PawPal low-fidelity-wireframes")}
                className="w-full block"
              />
              
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center mb-6 border border-[#E0E0E0]" style={{ minHeight: '180px' }}>
             <img src={pawpalComponents} alt={tr("PawPal App", "PawPal-appen")} className="w-full object-cover" />
            </div>
           
          </section>

          {/* 06 — Hi-Fi Design */}
          <section id="hifi" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">{tr("06 — Hi-Fi Design", "06 — Hi-fi-design")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Final Screens & Prototype", "Endelige skærme & prototype")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("High-fidelity screens combining the design system, real content, and micro-interactions. The prototype demonstrates the complete user journey from onboarding to booking confirmation.", "High-fidelity-skærme, der kombinerer designsystemet, rigtigt indhold og mikrointeraktioner. Prototypen viser hele brugerrejsen fra onboarding til bookingbekræftelse.")}
            </p>
            <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center mb-8 border border-[#E0E0E0]" style={{ minHeight: '200px' }}>
                      <img src={pawpalImg} alt={tr("PawPal App", "PawPal-appen")} className="w-full object-cover" />

            </div>
            <div className="bg-[#080808] border border-[#4ADE80]/25 rounded-xl p-8 text-center">
              <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-2">{tr("Try PawPal in Figma", "Prøv PawPal i Figma")}</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">{tr("Full clickable prototype — onboarding, sitter search, booking, and messaging interactions", "Fuldt klikbar prototype – onboarding, søgning efter hundepasser, booking og beskeder")}</p>
              <a href="https://www.figma.com/proto/hr07ubZBbbWwdw2kWrwJGD/Mahta-Ebrahimi?node-id=326-4264&t=vM5OXkdmQE4ws2pv-1&scaling=min-zoom&content-scaling=fixed&page-id=37%3A23&starting-point-node-id=326%3A4415&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D1117] font-bold px-8 py-3 rounded-lg hover:bg-[#22C55E] transition-colors text-sm">
                <FaExternalLinkAlt style={{ fontSize: '11px' }} />
                {tr("Open Prototype", "Åbn prototype")}
              </a>
            </div>
          </section>

          {/* 07 — Design System
          <section id="design-system" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">07 — Design System</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Component Library</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              Complete component library — forms, offer cards, booking flows, payment screens, navigation bars, system elements. Built for consistency and developer handoff.
            </p>
            <div className="bg-[#F5F5F5] rounded-xl p-4 flex flex-col items-center justify-center text-center mb-6 border border-[#E0E0E0]" style={{ minHeight: '180px' }}>
             <img src={pawpalComponents} alt="PawPal App" className="w-full object-cover" />
            </div>
            <div className="flex flex-wrap gap-2">
              {DS_TAGS.map(cat => (
                <span key={cat} className="text-[13px] bg-[#111] text-[#9CA3AF] px-4 py-2 rounded border border-[#374151]/60">
                  {cat}
                </span>
              ))}
            </div>
          </section> */}

          {/* 07 — Key Learnings */}
          <section id="learnings" className="mb-8">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#4ADE80] uppercase mb-3">{tr("07 — Reflection", "07 — Refleksion")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">{tr("Key Learnings", "Vigtigste læringer")}</h2>
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
                <FaArrowLeft style={{ fontSize: '11px' }} /> {tr("Back to Work", "Tilbage til projekter")}
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
