import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import selskaklocal from '../assets/UI1.png';
import selskabslokaleDoc from '../assets/Ui Og grafisk design-Maryam Ebrahimi.pdf';
import { getProjectNavigation } from '../data/projectNavigation';
import { tr } from '../context/LanguageContext';

const SECTIONS = [
  { id: 'overview',   num: '01', label: tr("Overview", "Oversigt") },
  { id: 'problem',    num: '02', label: tr("Problem & Solution", "Problem & løsning") },
  { id: 'research',   num: '03', label: 'Research' },
  { id: 'visual',     num: '04', label: tr("Visual Direction", "Visuel retning") },
  // { id: 'wireframes', num: '05', label: 'Wireframes' },
  // { id: 'hifi',       num: '06', label: 'Final Design' },
  { id: 'learnings',  num: '05', label: tr("Key Learnings", "Vigtigste læringer") },
];

const FEATURES = [
  { icon: '🏛️', title: tr("Venue Discovery", "Find lokaler"),   desc: tr("Filter by size, style, and location", "Filtrér efter størrelse, stil og beliggenhed") },
  { icon: '📸', title: tr("Rich Galleries", "Fyldige gallerier"),     desc: tr("Full photo tours of each venue", "Komplette fotorundvisninger i hvert lokale") },
  { icon: '📅', title: tr("Availability Check", "Tjek ledighed"), desc: tr("Live calendar with instant feedback", "Live-kalender med øjeblikkelig feedback") },
  { icon: '✉️', title: tr("Enquiry Flow", "Forespørgselsflow"),       desc: tr("Simple contact form per venue", "Enkel kontaktformular for hvert lokale") },
];

const PRINCIPLES = [
  { icon: '✦', title: tr("Elegance", "Elegance"),        desc: tr("The venue should feel premium at first glance", "Lokalet skal føles eksklusivt ved første øjekast") },
  { icon: '◎', title: tr("Clarity", "Klarhed"),         desc: tr("Venue details surfaced without hunting", "Detaljer om lokalet er synlige uden at skulle lede") },
  { icon: '♡', title: tr("Emotional match", "Følelsesmæssigt match"), desc: tr("Celebrations deserve visual warmth", "Fester fortjener visuel varme") },
  { icon: '⊞', title: tr("Grid rhythm", "Grid-rytme"),     desc: tr("Consistent 4pt spacing throughout", "Konsistente 4pt-afstande overalt") },
];

const COLORS = [
  { hex: '#2C2C2C', label: tr("Charcoal", "Koksgrå") },
  { hex: '#C9A96E', label: tr("Gold", "Guld") },
  { hex: '#F9F6F1', label: tr("Cream", "Creme") },
  { hex: '#7D6B5D', label: tr("Warm", "Varm") },
  { hex: '#FFFFFF', label: tr("White", "Hvid") },
];

const LEARNINGS = [
  { num: '01', title: tr("Premium needs restraint", "Eksklusivitet kræver tilbageholdenhed"),   desc: tr("Adding more design elements made it feel cheaper. White space and large imagery were the primary luxury signals.", "Flere designelementer fik det til at virke billigere. Luft og store billeder var de vigtigste signaler om luksus.") },
  { num: '02', title: tr("The enquiry is the CTA", "Forespørgslen er CTA'en"),    desc: tr("Users don't book venues impulsively. The goal was to make the enquiry form feel safe and frictionless.", "Brugerne booker ikke lokaler impulsivt. Målet var at få forespørgselsformularen til at føles tryg og gnidningsfri.") },
  { num: '03', title: tr("Photos carry the brand", "Billederne bærer brandet"),    desc: tr("No amount of copy replaced the impact of high-quality photography. Venue imagery was the highest-priority design constraint.", "Ingen mængde tekst kunne erstatte effekten af fotografi i høj kvalitet. Billederne af lokalerne var designets højest prioriterede rammebetingelse.") },
];

export default function Selskabslokale() {
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
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div
          className="sticky flex flex-col overflow-y-auto"
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {/* Project identity */}
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: '14px' }}>🏛️</span>
              <h2 className="text-white font-bold text-sm leading-tight">Selskabslokale</h2>
            </div>
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("Venue Platform · UI/UX", "Lokaleplatform · UI/UX")}</p>
            <div className="flex gap-2">
              <span className="text-[12px] bg-[#1C1508] text-[#C9A96E] px-2 py-1 rounded-md border border-[#C9A96E]/20">Figma</span>
              <span className="text-[12px] bg-[#0D0D0D] text-[#4B5563] px-2 py-1 rounded-md border border-[#1A1A1A]">2025</span>
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
                      <span className={`font-mono text-[12px] shrink-0 tabular-nums ${on ? 'text-[#C9A96E]' : 'text-[#1F2D1A] group-hover:text-[#374151]'}`}>
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-4 bg-[#C9A96E] rounded-full shrink-0" />}
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
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#1F2D1A] mb-1">{tr("Role", "Rolle")}</p>
                <p className="text-[13px] text-[#9CA3AF] leading-tight">{tr("UI/UX Designer", "UI/UX-designer")}</p>
              </div>
              <div>
                {/* <p className="text-[12px] font-medium uppercase tracking-widest text-[#1F2D1A] mb-1">Duration</p> */}
                {/* <p className="text-[13px] text-[#9CA3AF] leading-tight">2 months</p> */}
              </div>
            </div>
            <a
              href={selskabslokaleDoc} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#C9A96E] text-[#0D1117] text-[13px] font-semibold py-2 rounded-lg hover:bg-[#B8944A] transition-colors"
            >
              <FaFileAlt style={{ fontSize: '9px' }} /> {tr("Design Document", "Designdokument")}
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-3">{tr("01 — Overview", "01 — Oversigt")}</p>
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">Selskabslokale</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">{tr("Venue Rental Platform · UI/UX Redesign", "Platform til udlejning af lokaler · UI/UX-redesign")}</p>
            <div className="rounded-2xl overflow-hidden mb-8 bg-[#F0F0F0] p-3">
              <img src={selskaklocal} alt={tr("Selskabslokale Redesign", "Selskabslokale-redesign")} className="w-full object-cover" />
            </div>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("A complete UI/UX redesign for a venue rental platform serving events and celebrations, making it easier to discover, evaluate, and enquire about the perfect venue.", "Et komplet UI/UX-redesign af en platform til udlejning af lokaler til arrangementer og fester, så det bliver nemmere at finde, vurdere og forespørge på det perfekte lokale.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[{ value: 'Figma', label: tr("Tool", "Værktøj") }, { value: tr("Danish", "Dansk"), label: tr("Language", "Sprog") }].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-xl font-bold text-[#C9A96E] mb-2">{value}</p>
                  <p className="text-[13px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Problem & Solution */}
          <section id="problem" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-3">{tr("02 — The Problem & Solution", "02 — Problemet & løsningen")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("Finding the Perfect Venue Should Feel Special", "Det skal føles særligt at finde det perfekte lokale")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("The existing platform had a cluttered layout, poor imagery presentation, and a confusing enquiry flow — making users lose confidence in the venues listed. The redesign centred on trust, elegance, and a clear path from discovery to enquiry.", "Den eksisterende platform havde et rodet layout, en svag præsentation af billeder og et forvirrende forespørgselsflow – og brugerne mistede tilliden til de viste lokaler. Redesignet tog udgangspunkt i tillid, elegance og en klar vej fra opdagelse til forespørgsel.")}
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
            <blockquote className="border-l-[3px] border-[#C9A96E] pl-6 py-1">
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                {tr("\"A venue booking isn't a transaction — it's the beginning of a memory. The design had to feel worthy of the occasion.\"", "\"At booke et lokale er ikke en transaktion – det er begyndelsen på et minde. Designet skulle føles værdigt til anledningen.\"")}
              </p>
            </blockquote>
          </section>

          {/* 03 — Research */}
          <section id="research" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-3">{tr("03 — Research", "03 — Research")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("Understanding the Event Planner", "Forståelse af arrangøren")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  name: 'The Private Host', role: tr("35–55 · Birthday / Anniversary", "35–55 · Fødselsdag / jubilæum"),
                  goals: [tr("Find venues matching the occasion mood", "Finde lokaler, der matcher stemningen ved anledningen"), tr("See real photos, not stock images", "Se rigtige billeder, ikke stockfotos"), tr("Simple enquiry, fast response", "Enkel forespørgsel, hurtigt svar")],
                  pain: [tr("Hard to compare venues side-by-side", "Svært at sammenligne lokaler side om side"), tr("Pricing never clearly stated", "Priserne står aldrig tydeligt"), tr("Contact forms feel generic and cold", "Kontaktformularer føles generiske og kolde")],
                },
                {
                  name: 'The Corporate Planner', role: tr("30–45 · Business events", "30–45 · Erhvervsarrangementer"),
                  goals: [tr("Capacity and AV details upfront", "Kapacitet og AV-detaljer fra start"), tr("Professional venue presentation", "Professionel præsentation af lokalet"), tr("Reliable availability information", "Pålidelig information om ledighed")],
                  pain: [tr("Missing technical specs on listings", "Manglende tekniske specifikationer på lokalesiderne"), tr("No indication of catering options", "Ingen oplysninger om cateringmuligheder"), tr("Long back-and-forth before a quote", "Lang korrespondance frem og tilbage før et tilbud")],
                },
              ].map(({ name, role, goals, pain }) => (
                <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <div className="mb-5">
                    <p className="text-white font-bold text-[15px]">{name}</p>
                    <p className="text-[#C9A96E] text-sm mt-0.5">{role}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Goals", "Mål")}</p>
                    <ul className="space-y-1.5">
                      {goals.map(g => (
                        <li key={g} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                          <span className="text-[#C9A96E] shrink-0">+</span>{g}
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
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#C9A96E] mb-2">{tr("Key Design Insight", "Vigtigste designindsigt")}</p>
              <p className="text-[#D1D5DB] text-base leading-relaxed">
                {tr("Photography is the highest-trust signal. Users decided within seconds whether a venue felt right — before reading any text. Leading with imagery was non-negotiable.", "Fotografi er det stærkeste tillidssignal. Brugerne afgjorde på få sekunder, om et lokale føltes rigtigt – før de havde læst nogen tekst. At lade billederne gå forrest var ikke til forhandling.")}
              </p>
            </div>
          </section>

          {/* 04 — Visual Direction */}
          <section id="visual" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-3">{tr("04 — Visual Direction", "04 — Visuel retning")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Design Approach", "Designtilgang")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("Charcoal and gold carry a premium, celebratory feel without being ostentatious. Generous white space lets the venue imagery breathe and speak for itself.", "Koksgrå og guld giver et eksklusivt og festligt udtryk uden at blive prangende. Rigelig luft lader billederne af lokalerne ånde og tale for sig selv.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span className="text-[#C9A96E] text-lg shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-4">{tr("Color Palette", "Farvepalet")}</p>
              <div className="flex gap-4">
                {COLORS.map(({ hex, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl border border-white/10" style={{ backgroundColor: hex }} />
                    <p className="text-[13px] text-[#6B7280]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 — Wireframes */}
          {/* <section id="wireframes" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-3">05 — Wireframes</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Low-Fidelity Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-base">
              Lo-fi wireframes established navigation patterns, venue card layouts, and the enquiry form flow before any visual styling was applied.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center border border-[#222]" style={{ minHeight: '200px' }}>
              <p className="text-[#374151] text-sm mb-1">Low-fi wireframes</p>
              <p className="text-[#2D3A4A] text-[13px]">Homepage · Listing · Detail · Enquiry</p>
            </div>
          </section> */}

          {/* 06 — Final Design */}
          {/* <section id="hifi" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-3">06 — Final Design</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">Hi-Fi Screens</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-base">
              Final screens apply the complete design system — typography hierarchy, colour tokens, photography placement rules, and interactive states for forms and filters.
            </p>
            <div className="bg-[#111] rounded-xl p-8 flex flex-col items-center justify-center text-center mb-8 border border-[#222]" style={{ minHeight: '200px' }}>
              <p className="text-[#374151] text-sm mb-1">Final hi-fi screens</p>
              <p className="text-[#2D3A4A] text-[13px]">Complete venue rental flow</p>
            </div>
            <div className="bg-[#080808] border border-[#C9A96E]/25 rounded-xl p-8 text-center">
              <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-2">Design Document</p>
              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">Full process documentation — research, wireframes, and final screens</p>
              <a
                href={selskabslokaleDoc} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#0D1117] font-bold px-8 py-3 rounded-lg hover:bg-[#B8944A] transition-colors text-sm"
              >
                <FaFileAlt style={{ fontSize: '11px' }} /> Open Document
              </a>
            </div>
          </section> */}

          {/* 07 — Key Learnings */}
          <section id="learnings" className="mb-8">
            <p className="text-[13px] font-mono tracking-[0.18em] text-[#C9A96E] uppercase mb-3">{tr("05 — Reflection", "05 — Refleksion")}</p>
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
