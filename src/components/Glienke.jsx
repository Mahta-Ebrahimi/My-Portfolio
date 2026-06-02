import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import GlienkeScreen from '../assets/GlienkeScreen.png';
import { getProjectNavigation } from '../data/projectNavigation';

const SECTIONS = [
  { id: 'overview',     num: '01', label: 'Overview' },
  { id: 'technologies', num: '02', label: 'Technologies' },
  { id: 'features',     num: '03', label: 'Key Features' },
  { id: 'website',      num: '04', label: 'Live Website' },
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
            <p className="text-[#4B5563] text-xs mb-3">Website · Frontend Dev</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#1a0a00' }}>HTML/CSS</span>
              <span className="text-xs bg-[#0D0D0D] text-[#4B5563] px-2 py-1 border border-[#1A1A1A]">2024</span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#2A2A2A] mb-3 px-1">
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
                      <span className={`font-mono text-xs shrink-0 tabular-nums`} style={{ color: on ? ACCENT : '#2A2A2A' }}>
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

          {/* Meta + CTA */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-4">
            <div className="space-y-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#2A2A2A] mb-0.5">Role</p>
                <p className="text-xs text-[#9CA3AF]">Web Developer & Designer</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#2A2A2A] mb-0.5">Duration</p>
                <p className="text-xs text-[#9CA3AF]">1 month</p>
              </div>
            </div>
            <a
              href="https://www.glienkedesign.dk/shop/glienke-design-72s1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold border transition-colors"
              style={{ color: ACCENT, borderColor: ACCENT + '66' }}
            >
              <FaExternalLinkAlt size={9} /> View Website
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0 max-w-[800px] mx-auto px-4 sm:px-8 py-8 sm:py-12">

        {/* Overview */}
        <section id="overview" className="mb-16 scroll-mt-24">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: ACCENT }}>01 — Overview</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Glienke Design</h1>
          <p className="text-[#6B7280] text-sm mb-6">Website Redesign · Frontend Development</p>
          <div className="w-full overflow-hidden border border-[#E0E0E0] mb-6 bg-[#F5F5F5] p-3">
            <img src={GlienkeScreen} alt="Glienke Design" className="w-full h-auto object-cover" />
          </div>
          <p className="text-[#9CA3AF] leading-relaxed text-lg">
            A complete website redesign for Glienke Design, focusing on modernizing the online
            presence and improving user experience. The project involved creating a cleaner,
            more professional layout that effectively showcases their design portfolio while
            maintaining a simple and accessible interface.
          </p>
        </section>

        {/* Technologies */}
        <section id="technologies" className="mb-16 scroll-mt-24">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: ACCENT }}>02 — Technologies</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Stack & Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['WordPress', 'HTML / CSS', 'JavaScript', 'Responsive Design'].map((tech) => (
              <div key={tech} className="bg-[#0D0D0D] border border-[#1A1A1A] px-4 py-3 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                <span className="text-sm text-[#9CA3AF] font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mb-16 scroll-mt-24">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: ACCENT }}>03 — Key Features</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">What Was Built</h2>
          <ul className="space-y-3">
            {[
              'Modernized visual design and layout',
              'Improved product showcase and gallery',
              'Fully mobile-responsive layout',
              'SEO-optimized structure',
              'Easy content management via WordPress',
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-3 border-b border-[#111] pb-3">
                <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[#9CA3AF] text-base">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Live Website */}
        <section id="website" className="mb-16 scroll-mt-24">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: ACCENT }}>04 — Live Website</p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">See It Live</h2>
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <p className="text-white font-bold text-sm mb-1">Glienke Design</p>
              <p className="text-[#4B5563] text-xs">glienkedesign.dk</p>
            </div>
            <a
              href="https://www.glienkedesign.dk/shop/glienke-design-72s1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold border transition-colors"
              style={{ color: ACCENT, borderColor: ACCENT }}
            >
              <FaExternalLinkAlt size={10} /> Visit Site
            </a>
          </div>
        </section>

        <div className="pt-8 border-t border-[#1A1A1A]">
          <button onClick={() => navigate('/#work')} className="text-xs text-[#6B7280] hover:text-white transition-colors">
            ← Back to Work
          </button>
        </div>
      </main>
    </div>
  );
}
