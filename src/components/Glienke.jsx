import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import GlienkeScreen from '../assets/GlienkeScreen.png';
import { getProjectNavigation } from '../data/projectNavigation';
import { tr } from '../context/LanguageContext';

const SECTIONS = [
  { id: 'overview',     num: '01', label: tr("Overview", "Oversigt") },
  { id: 'technologies', num: '02', label: tr("Technologies", "Teknologier") },
  { id: 'features',     num: '03', label: tr("Key Features", "Nøglefunktioner") },
  { id: 'website',      num: '04', label: tr("Live Website", "Live website") },
];

const ACCENT = '#FF9533';

export default function Glienke() {
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

      {/* ═══ SIDEBAR WRAPPER ═══════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div
          className="sticky flex flex-col overflow-y-auto"
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {/* Project identity */}
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: '14px' }}>🌐</span>
              <h2 className="text-white font-bold text-[14px] leading-tight">Glienke</h2>
            </div>
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("Website · Frontend Dev", "Website · Frontend-udvikling")}</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-[12px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#1a0a00' }}>HTML/CSS</span>
              <span className="text-[12px] bg-[#0D0D0D] text-[#4B5563] px-2 py-1 border border-[#1A1A1A]">2024</span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#2A2A2A] mb-3 px-1">
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
                      <span className={`font-mono text-[12px] shrink-0 tabular-nums`} style={{ color: on ? ACCENT : '#2A2A2A' }}>
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
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-4">
            <div className="space-y-2">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">{tr("Role", "Rolle")}</p>
                <p className="text-[13px] text-[#9CA3AF]">{tr("Web Developer & Designer", "Webudvikler & designer")}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">{tr("Duration", "Varighed")}</p>
                <p className="text-[13px] text-[#9CA3AF]">{tr("1 month", "1 måned")}</p>
              </div>
            </div>
            <a
              href="https://www.glienkedesign.dk/shop/glienke-design-72s1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[13px] font-semibold border transition-colors"
              style={{ color: ACCENT, borderColor: ACCENT + '66' }}
            >
              <FaExternalLinkAlt size={9} /> {tr("View Website", "Se website")}
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0 max-w-[800px] mx-auto px-4 sm:px-8 py-8 sm:py-12">

        {/* Overview */}
        <section id="overview" className="mb-16 scroll-mt-24">
          <p className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>{tr("01 — Overview", "01 — Oversigt")}</p>
          <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">Glienke Design</h1>
          <p className="text-[#6B7280] text-sm mb-6">{tr("Website Redesign · Frontend Development", "Redesign af website · Frontend-udvikling")}</p>
          <div className="w-full overflow-hidden border border-[#E0E0E0] mb-6 bg-[#F5F5F5] p-3">
            <img src={GlienkeScreen} alt="Glienke Design" className="w-full h-auto object-cover" />
          </div>
          <p className="text-[#9CA3AF] leading-relaxed text-lg">
            {tr("A complete website redesign for Glienke Design, focusing on modernizing the online presence and improving user experience. The project involved creating a cleaner, more professional layout that effectively showcases their design portfolio while maintaining a simple and accessible interface.", "Et komplet redesign af websitet for Glienke Design med fokus på at modernisere den digitale tilstedeværelse og forbedre brugeroplevelsen. Projektet gik ud på at skabe et renere og mere professionelt layout, der fremviser deres designportfolio effektivt og samtidig bevarer et enkelt og tilgængeligt interface.")}
          </p>
        </section>

        {/* Technologies */}
        <section id="technologies" className="mb-16 scroll-mt-24">
          <p className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>{tr("02 — Technologies", "02 — Teknologier")}</p>
          <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("Stack & Tools", "Stack & værktøjer")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['WordPress', 'HTML / CSS', 'JavaScript', tr("Responsive Design", "Responsivt design")].map((tech) => (
              <div key={tech} className="bg-[#0D0D0D] border border-[#1A1A1A] px-4 py-3 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                <span className="text-sm text-[#9CA3AF] font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mb-16 scroll-mt-24">
          <p className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>{tr("03 — Key Features", "03 — Nøglefunktioner")}</p>
          <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("What Was Built", "Det har jeg bygget")}</h2>
          <ul className="space-y-3">
            {[
              tr("Modernized visual design and layout", "Moderniseret visuelt design og layout"),
              tr("Improved product showcase and gallery", "Forbedret produktpræsentation og galleri"),
              tr("Fully mobile-responsive layout", "Fuldt mobilresponsivt layout"),
              tr("SEO-optimized structure", "SEO-optimeret struktur"),
              tr("Easy content management via WordPress", "Nem indholdsstyring via WordPress"),
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-3 border-b border-[#111] pb-3">
                <span className="font-mono text-[12px] mt-0.5 shrink-0" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[#9CA3AF] text-base">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Live Website */}
        <section id="website" className="mb-16 scroll-mt-24">
          <p className="text-[13px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>{tr("04 — Live Website", "04 — Live website")}</p>
          <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("See It Live", "Se det live")}</h2>
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <p className="text-white font-bold text-sm mb-1">Glienke Design</p>
              <p className="text-[#4B5563] text-[13px]">glienkedesign.dk</p>
            </div>
            <a
              href="https://www.glienkedesign.dk/shop/glienke-design-72s1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold border transition-colors"
              style={{ color: ACCENT, borderColor: ACCENT }}
            >
              <FaExternalLinkAlt size={10} /> {tr("Visit Site", "Besøg sitet")}
            </a>
          </div>
        </section>

        <div className="pt-8 border-t border-[#1A1A1A]">
          <button onClick={() => navigate('/#work')} className="text-[13px] text-[#6B7280] hover:text-white transition-colors">
            {tr("← Back to Work", "← Tilbage til projekter")}
          </button>
        </div>
      </main>
    </div>
  );
}
