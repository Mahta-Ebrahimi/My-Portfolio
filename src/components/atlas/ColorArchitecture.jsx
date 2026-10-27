import React from 'react';
import { Board, SectionHeader, SpecLabel, Icon, Reveal } from './ui';
import { PALETTES, AMBER, SEMANTIC, hexOf } from './tokens';

const isDark = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.36;
};

const tokenName = ([key, step]) => (key === 'white' ? 'white' : `${key}-${step}`);

// ── One primitive ramp ────────────────────────────────────────────────────────
const Ramp = ({ name, role, steps, anchor, delay }) => (
  <Reveal delay={delay} className="grid grid-cols-1 lg:grid-cols-[170px_1fr] gap-3 lg:gap-6 items-start">
    <div className="lg:pt-3">
      <p className="text-[15px] font-bold tracking-[-0.01em]">{name}</p>
      <p className="text-[13px] leading-[1.45] mt-0.5" style={{ color: '#64748B' }}>{role}</p>
    </div>
    <ul className="grid grid-cols-5 md:grid-cols-10 gap-[3px]" aria-label={`${name} palette`}>
      {steps.map(({ step, hex }, i) => {
        const dark = isDark(hex);
        const isAnchor = step === anchor;
        return (
          <li key={step} className="group">
            <div
              className="relative h-[64px] md:h-[84px] flex items-start justify-end p-2 transition-transform duration-200 group-hover:-translate-y-1"
              style={{
                background: hex,
                borderRadius: i === 0 ? '10px 4px 4px 10px' : i === steps.length - 1 ? '4px 10px 10px 4px' : 4,
                boxShadow: step === 50 ? 'inset 0 0 0 1px #E2E8F0' : 'none',
              }}
            >
              {isAnchor && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[4px]" style={{ background: dark ? 'rgba(255,255,255,.18)' : 'rgba(15,23,42,.08)', color: dark ? '#fff' : '#0F172A' }}>
                  BASE
                </span>
              )}
            </div>
            <p className="text-[12px] font-semibold mt-2 tabular-nums">{step}</p>
            <p className="text-[11px] font-mono uppercase" style={{ color: '#64748B' }}>{hex.replace('#', '')}</p>
          </li>
        );
      })}
    </ul>
  </Reveal>
);

// ── Mini interface rendered twice: light and dark use the SAME component code ──
const ThemePreview = ({ dark }) => (
  <div className={`${dark ? 'at-theme-dark' : ''} rounded-[16px] p-5 sm:p-6 h-full`} style={{ background: 'var(--bg-default)', border: '1px solid var(--border)' }}>
    <div className="flex items-center justify-between mb-4">
      <span className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: 'var(--text-secondary)' }}>{dark ? 'Dark mode' : 'Light mode'}</span>
      <span className="font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>background/default</span>
    </div>
    <div className="at-card p-5" style={{ boxShadow: dark ? 'none' : undefined }}>
      <div className="flex items-start justify-between gap-3 mb-1">
        <p className="text-[16px] font-semibold" style={{ color: 'var(--text-primary)' }}>Workspace usage</p>
        <span className="at-badge" style={{ background: 'var(--action-subtle)', color: 'var(--action-text)' }}><i />Enterprise</span>
      </div>
      <p className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>212 of 250 seats in use this billing cycle.</p>
      <div className="h-2 rounded-full mb-5" style={{ background: 'var(--bg-subtle)' }}>
        <div className="h-2 rounded-full" style={{ width: '85%', background: 'var(--action)' }} />
      </div>
      <label className="at-field mb-4">
        <span className="at-label">Seat limit</span>
        <input className="at-input" defaultValue="250" aria-label={`Seat limit (${dark ? 'dark' : 'light'} preview)`} />
      </label>
      <ul className="space-y-2 mb-5 text-[13px]">
        {[['success', 'Sync completed', 'var(--success)'], ['warning', 'Renewal in 14 days', 'var(--warning)'], ['error', '2 invoices failed', 'var(--error)']].map(([icon, label, color]) => (
          <li key={label} className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Icon name={icon} size={16} style={{ color }} />{label}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="at-btn at-btn--primary at-btn--sm">Upgrade plan</button>
        <button type="button" className="at-btn at-btn--secondary at-btn--sm">Manage seats</button>
      </div>
    </div>
  </div>
);

const CONTRAST = [
  { pair: 'text/primary on surface/primary', mode: 'Light', ratio: '17.85:1', level: 'AAA' },
  { pair: 'text/secondary on surface/primary', mode: 'Light', ratio: '4.76:1', level: 'AA' },
  { pair: 'white on action/primary', mode: 'Light', ratio: '5.70:1', level: 'AA' },
  { pair: 'text/secondary on surface/primary', mode: 'Dark', ratio: '5.71:1', level: 'AA' },
  { pair: 'navy on action/primary', mode: 'Dark', ratio: '6.56:1', level: 'AA' },
  { pair: 'status/success icon on surface', mode: 'Light', ratio: '3.74:1', level: 'UI ≥ 3:1' },
];

export default function ColorArchitecture() {
  return (
    <section id="color" className="mb-28 md:mb-36 scroll-mt-24">
      <SectionHeader num="03" label="Color Architecture" title="Two layers of colour: primitives and meaning">
        <p>
          ATLAS separates <em>what a colour is</em> from <em>what a colour does</em>. Five primitive ramps hold every raw value from 50 to 900. Semantic tokens then give those values a job: background, surface, text, border, action and status.
        </p>
        <p>
          Components only ever reference semantic tokens. That is what makes dark mode, theming and accessibility fixes possible without touching a single component.
        </p>
      </SectionHeader>

      <div className="space-y-6">
        {/* Primitive ramps */}
        <Board title="Primitive palettes" meta="Layer 1 · 5 ramps × 10 steps">
          <div className="space-y-8 md:space-y-10">
            {PALETTES.map((p, i) => <Ramp key={p.key} {...p} delay={i * 70} />)}
          </div>
          <div className="mt-10 pt-6 grid grid-cols-1 lg:grid-cols-[170px_1fr] gap-3 lg:gap-6 items-center" style={{ borderTop: '1px dashed #CBD5E1' }}>
            <div>
              <p className="text-[14px] font-bold">Amber · support</p>
              <p className="text-[12px]" style={{ color: '#64748B' }}>Reserved for warning states only</p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {AMBER.map(({ step, hex }) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-[8px]" style={{ background: hex, boxShadow: 'inset 0 0 0 1px rgba(15,23,42,.08)' }} />
                  <span className="text-[12px] leading-tight"><b className="font-semibold">{step}</b><br /><span className="font-mono uppercase text-[11px]" style={{ color: '#64748B' }}>{hex.slice(1)}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </Board>

        {/* Mapping */}
        <Board title="Primitive → semantic mapping" meta="Layer 2 · 10 core tokens · light & dark">
          <div className="hidden md:grid grid-cols-[1.3fr_1fr_24px_1fr_1fr] gap-4 pb-3 mb-1" style={{ borderBottom: '1px solid #E2E8F0' }}>
            {['Semantic token', 'Light value', '', 'Dark value', 'Used for'].map((h, i) => <SpecLabel key={i}>{h}</SpecLabel>)}
          </div>
          <ul>
            {SEMANTIC.map(({ token, light, dark, use }, i) => (
              <Reveal as="li" key={token} delay={i * 30}
                className="grid grid-cols-2 md:grid-cols-[1.3fr_1fr_24px_1fr_1fr] gap-x-4 gap-y-2 items-center py-3"
                style={{ borderBottom: i < SEMANTIC.length - 1 ? '1px solid #F1F5F9' : 'none' }}
              >
                <code className="col-span-2 md:col-span-1 font-mono text-[13px] font-semibold" style={{ color: '#5B21B6' }}>{token}</code>
                {[light, null, dark].map((ref, k) => ref === null ? (
                  <span key={k} className="hidden md:block text-center" style={{ color: '#94A3B8' }} aria-hidden="true">/</span>
                ) : (
                  <span key={k} className="flex items-center gap-2 min-w-0">
                    <span className="w-7 h-7 rounded-[7px] shrink-0" style={{ background: hexOf(ref[0], ref[1]), boxShadow: 'inset 0 0 0 1px rgba(15,23,42,.1)' }} />
                    <span className="min-w-0">
                      <span className="block font-mono text-[12px] font-medium truncate">{tokenName(ref)}</span>
                      <span className="block font-mono text-[11px] uppercase" style={{ color: '#64748B' }}>{hexOf(ref[0], ref[1]).slice(1)}</span>
                    </span>
                  </span>
                ))}
                <span className="col-span-2 md:col-span-1 text-[13px]" style={{ color: '#64748B' }}>{use}</span>
              </Reveal>
            ))}
          </ul>
        </Board>

        {/* Light & dark */}
        <Board title="One component, two themes" meta="Same markup · semantic tokens swapped at the theme root">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ThemePreview />
            <ThemePreview dark />
          </div>
          <div className="mt-8">
            <SpecLabel className="mb-3">Contrast checks · WCAG 2.2</SpecLabel>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CONTRAST.map(({ pair, mode, ratio, level }) => (
                <li key={pair + mode} className="flex items-center justify-between gap-3 rounded-[10px] px-4 py-3" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium leading-snug">{pair}</span>
                    <span className="block text-[12px]" style={{ color: '#64748B' }}>{mode} · {ratio}</span>
                  </span>
                  <span className="at-badge at-badge--success shrink-0"><Icon name="check" size={12} />{level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Board>
      </div>
    </section>
  );
}
