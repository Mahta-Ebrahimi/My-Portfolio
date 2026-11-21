import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import portfolio1 from '../assets/portfolio1.png';
import portfolio2 from '../assets/portfolio2.png';
import { getProjectNavigation } from '../data/projectNavigation';
import { tr } from '../context/LanguageContext';

const ACCENT = '#A78BFA';

const SECTIONS = [
  { id: 'overview',    num: '01', label: tr("Overview", "Oversigt") },
  { id: 'design',      num: '02', label: tr("Design Process", "Designproces") },
  { id: 'frontend',    num: '03', label: tr("Frontend Build", "Frontend-udvikling") },
  { id: 'features',    num: '04', label: tr("Key Features", "Nøglefunktioner") },
  { id: 'reflection',  num: '05', label: tr("Reflection", "Refleksion") },
];

const DESIGN_DECISIONS = [
  {
    icon: '◼',
    title: tr("Dark Minimal Aesthetic", "Mørk, minimalistisk æstetik"),
    desc: tr("Black-first palette with controlled accent colors — each project section gets its own hue to signal context without noise.", "En overvejende sort palet med kontrollerede accentfarver – hver projektsektion får sin egen farvetone, der signalerer kontekst uden at forstyrre."),
  },
  {
    icon: '▲',
    title: tr("Typography as Structure", "Typografi som struktur"),
    desc: tr("Tiny uppercase tracking labels, large bold headlines, and muted body text create strong hierarchy without extra UI elements.", "Små labels med versaler og spatiering, store fede overskrifter og dæmpet brødtekst skaber et stærkt hierarki uden ekstra UI-elementer."),
  },
  {
    icon: '⊞',
    title: tr("Sidebar Navigation Pattern", "Navigation med sidebar"),
    desc: tr("Sticky sidebar with scroll-tracked active state — borrowed from developer documentation to signal precision and technical depth.", "En fastlåst sidebar, der følger med, når man scroller – lånt fra udviklerdokumentation for at signalere præcision og teknisk dybde."),
  },
  {
    icon: '◎',
    title: tr("3D Card Stack on Work Page", "3D-kortstak på projektsiden"),
    desc: tr("A layered card stack with depth offsets makes project browsing tactile — designed before a single line of code was written.", "En lagdelt kortstak med dybdeforskydning gør det håndgribeligt at gennemse projekterne – designet før der blev skrevet en eneste linje kode."),
  },
];

const TECH_STACK = [
  { name: 'React', note: tr("Component-based SPA with React Router", "Komponentbaseret SPA med React Router") },
  { name: 'Tailwind CSS', note: tr("Utility-first styling, zero custom CSS files", "Utility-first styling, ingen egne CSS-filer") },
  { name: 'React Router', note: tr("Client-side routing for each project page", "Routing på klientsiden for hver projektside") },
  { name: 'IntersectionObserver', note: tr("Scroll-tracked sidebar highlights", "Markering i sidebaren, der følger scroll") },
  { name: 'Figma', note: tr("Full hi-fi design before development started", "Komplet hi-fi-design, før udviklingen begyndte") },
  { name: 'Vercel', note: tr("Continuous deployment from GitHub", "Løbende deployment fra GitHub") },
];

const COMPONENTS = [
  { name: 'WorkCardStack', desc: tr("Layered 3D card carousel with depth offsets and smooth transitions", "Lagdelt 3D-kortkarrusel med dybdeforskydning og bløde overgange") },
  { name: 'WorkProjectList', desc: tr("Synchronized list that mirrors the active card and filters by type", "Synkroniseret liste, der spejler det aktive kort og filtrerer efter type") },
  { name: 'WorkHeader', desc: tr("Filter tabs (All / UI·UX / Frontend) that reset active index", "Filterfaner (Alle / UI·UX / Frontend), der nulstiller det aktive indeks") },
  { name: 'Skills', desc: tr("Animated skill grid with hover interactions and category grouping", "Animeret kompetencegrid med hover-interaktioner og gruppering i kategorier") },
  { name: 'Navbar', desc: tr("Scroll-aware transparent-to-solid transition with anchor smooth scroll", "Scroll-bevidst overgang fra gennemsigtig til ensfarvet med blød scroll til ankre") },
];

const FEATURES = [
  { num: '01', title: tr("Dual discipline showcase", "Præsentation af to discipliner"), desc: tr("Separate filter tabs for UI/UX and Frontend projects — designed so both audiences (designers and developers) instantly find relevant work.", "Separate filterfaner for UI/UX- og frontend-projekter – designet, så begge målgrupper (designere og udviklere) straks finder relevant arbejde.") },
  { num: '02', title: tr("Per-project case study pages", "En case-side for hvert projekt"), desc: tr("Every major project has its own route with a sticky sidebar, scroll-tracked table of contents, and prev/next navigation.", "Hvert større projekt har sin egen rute med en fastlåst sidebar, en indholdsfortegnelse, der følger scroll, og navigation til forrige/næste.") },
  { num: '03', title: tr("Design-before-code workflow", "Design før kode"), desc: tr("Every layout was prototyped in Figma before touching JSX — visible in the consistent spacing rhythm and component boundaries.", "Hvert layout blev prototypet i Figma, før jeg rørte JSX – det ses i den konsistente afstandsrytme og de klare komponentgrænser.") },
  { num: '04', title: tr("Responsive across breakpoints", "Responsivt på tværs af breakpoints"), desc: tr("Mobile-first Tailwind classes with lg: overrides. The card stack collapses to a single-column list on small screens.", "Mobile-first Tailwind-klasser med lg:-overrides. Kortstakken bliver til en liste i én kolonne på små skærme.") },
  { num: '05', title: tr("Zero UI library dependencies", "Ingen afhængigheder af UI-biblioteker"), desc: tr("No component library used — every card, sidebar, and animation is custom-built to match the exact design intent.", "Der er ikke brugt noget komponentbibliotek – hvert kort, hver sidebar og hver animation er specialbygget til at matche designet præcist.") },
];

const LEARNINGS = [
  { num: '01', title: tr("Wearing both hats is a superpower", "At have begge kasketter på er en superkraft"), desc: tr("Designing something you will also build removes the designer-developer gap entirely — handoff friction disappears when you are both.", "Når man designer noget, man også selv skal bygge, forsvinder kløften mellem designer og udvikler helt – der er ingen friktion i overleveringen, når man er begge dele.") },
  { num: '02', title: tr("Constraints produce better design", "Begrænsninger giver bedre design"), desc: tr("Committing to Tailwind-only styling forced precision. Every spacing decision had to map to the 4pt scale, which created consistency.", "At holde mig til ren Tailwind-styling tvang mig til præcision. Hver afstand skulle passe ind i 4pt-skalaen, og det skabte konsistens.") },
  { num: '03', title: tr("The sidebar pattern earns trust", "Sidebar-mønstret skaber tillid"), desc: tr("Long-form project pages needed navigation. Sticky sidebars with scroll tracking — borrowed from docs — signal that content has depth.", "Lange projektsider havde brug for navigation. Fastlåste sidebars, der følger scroll – lånt fra dokumentation – signalerer, at indholdet har dybde.") },
];

export default function Portfolio() {
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
              <span style={{ fontSize: '14px' }}>◈</span>
              <h2 className="text-white font-bold text-[14px] leading-tight">Portfolio</h2>
            </div>
            <p className="text-[#4B5563] text-[13px] mb-3">UI/UX + Frontend · 2024</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[12px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#0e0a1a' }}>
                React
              </span>
              <span className="text-[12px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#0e0a1a' }}>
                Figma
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-3 px-1" style={{ color: '#2A2A2A' }}>
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

          {/* Meta + CTA */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3">
            <div className="space-y-2">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">{tr("Role", "Rolle")}</p>
                <p className="text-[13px] text-[#9CA3AF]">{tr("UI/UX Designer & Frontend Dev", "UI/UX-designer & frontend-udvikler")}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">Stack</p>
                <p className="text-[13px] text-[#9CA3AF]">React · Tailwind · Figma</p>
              </div>
            </div>
            <a
              href="https://github.com/Mahta-Ebrahimi/My-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[13px] font-semibold border transition-colors hover:text-white hover:border-white"
              style={{ color: ACCENT, borderColor: ACCENT + '66' }}
            >
              <FaGithub size={11} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("01 — Overview", "01 — Oversigt")}</p>
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">{tr("My Portfolio", "Min portfolio")}</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">{tr("Designed in Figma. Built in React.", "Designet i Figma. Bygget i React.")}</p>

            <div className="overflow-hidden border border-[#E0E0E0] mb-8 rounded-lg bg-[#F5F5F5] p-3">
              <img src={portfolio1} alt={tr("Portfolio Screenshot", "Skærmbillede af portfolioen")} className="w-full object-cover" />
            </div>

            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("This portfolio is the one project where I owned every decision — from the first wireframe in Figma to the final deployed component in React. It is both a design artifact and a working codebase, and the constraints of each discipline directly shaped the other.", "Denne portfolio er det ene projekt, hvor jeg har ejet hver eneste beslutning – fra den første wireframe i Figma til den endelige komponent i React. Den er både et designartefakt og en fungerende kodebase, og begrænsningerne i hver disciplin har direkte formet den anden.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '100%', label: tr("Custom — no UI library", "Specialbygget – intet UI-bibliotek") },
                { value: '2', label: tr("Disciplines: Design + Dev", "Discipliner: design + udvikling") },
                { value: '8+', label: tr("Project case study pages", "Case-sider for projekterne") },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-2xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-[13px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Design Process */}
          <section id="design" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("02 — Design Process", "02 — Designproces")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("UI/UX Thinking", "UI/UX-tænkning")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("The design started with a clear audience problem: a portfolio needs to speak to two very different readers — a designer and a developer — without losing either. The solution was an explicit filter system and per-project case study pages that can go as deep as needed.", "Designet startede med en klar udfordring om målgruppen: En portfolio skal tale til to meget forskellige læsere – en designer og en udvikler – uden at miste nogen af dem. Løsningen var et tydeligt filtersystem og en case-side for hvert projekt, der kan gå så meget i dybden som nødvendigt.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {DESIGN_DECISIONS.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 border border-[#222]">
                  <span className="text-lg mb-3 block" style={{ color: ACCENT }}>{icon}</span>
                  <p className="text-white text-[15px] font-semibold mb-2">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* <div className="overflow-hidden border border-[#1A1A1A] rounded-lg mb-6">
              <img src={portfolio2} alt="Portfolio Design Detail" className="w-full object-cover" />
            </div> */}

            {/* <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                "Design the thing before you build it — even when you are both the designer and the developer."
              </p>
            </blockquote> */}
          </section>

          {/* 03 — Frontend Build */}
          <section id="frontend" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("03 — Frontend Build", "03 — Frontend-udvikling")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("React Architecture", "React-arkitektur")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("The codebase is a single-page React application with client-side routing. Each project detail page is an independent component — same layout shell, different content and accent color — keeping code DRY while allowing complete per-project customization.", "Kodebasen er en single-page React-applikation med routing på klientsiden. Hver projektside er en selvstændig komponent – samme layoutramme, forskelligt indhold og accentfarve – så koden holdes DRY, mens hvert projekt stadig kan tilpasses fuldt ud.")}
            </p>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-4">Stack</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TECH_STACK.map(({ name, note }) => (
                  <div key={name} className="bg-[#0D0D0D] border border-[#1A1A1A] px-4 py-3 flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
                    <div>
                      <p className="text-white text-sm font-semibold">{name}</p>
                      <p className="text-[#4B5563] text-[13px] leading-relaxed mt-0.5">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key components */}
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-4">{tr("Key Components", "Centrale komponenter")}</p>
              <ul className="space-y-0">
                {COMPONENTS.map(({ name, desc }, i) => (
                  <li key={name} className={`flex items-start gap-4 py-4 ${i < COMPONENTS.length - 1 ? 'border-b border-[#111]' : ''}`}>
                    <code className="text-[12px] font-mono shrink-0 mt-0.5" style={{ color: ACCENT }}>{name}</code>
                    <p className="text-[#9CA3AF] text-base leading-relaxed">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 04 — Key Features */}
          <section id="features" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("04 — Key Features", "04 — Nøglefunktioner")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">{tr("What Makes It Work", "Det, der får det til at fungere")}</h2>
            <ul className="space-y-0">
              {FEATURES.map(({ num, title, desc }, i) => (
                <li key={num} className={`flex items-start gap-5 py-5 ${i < FEATURES.length - 1 ? 'border-b border-[#111]' : ''}`}>
                  <span className="font-mono text-[12px] shrink-0 mt-0.5 tabular-nums" style={{ color: ACCENT }}>{num}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 05 — Reflection */}
          <section id="reflection" className="mb-8">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("05 — Reflection", "05 — Refleksion")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">{tr("Key Learnings", "Vigtigste læringer")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold font-mono mb-4 leading-none" style={{ color: '#1A1A2E' }}>{num}</p>
                  <p className="text-white font-semibold text-[15px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* GitHub CTA */}
            <div className="rounded-xl p-8 text-center border mb-12 bg-[#0a0614]" style={{ borderColor: ACCENT + '33' }}>
              <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>{tr("Source Code", "Kildekode")}</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                {tr("Full source available on GitHub — React components, Tailwind config, routing setup", "Hele kildekoden ligger på GitHub – React-komponenter, Tailwind-konfiguration og routing-opsætning")}
              </p>
              <a
                href="https://github.com/Mahta-Ebrahimi/My-Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg transition-colors text-sm"
                style={{ background: ACCENT, color: '#0D0D0D' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <FaGithub size={14} /> {tr("View on GitHub", "Se på GitHub")}
              </a>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A]">
              <button onClick={() => navigate('/#work')} className="text-[13px] text-[#6B7280] hover:text-white transition-colors">
                {tr("← Back to Work", "← Tilbage til projekter")}
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
