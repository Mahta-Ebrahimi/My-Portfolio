import React from 'react';
import { Icon, Logo, ScaledFrame } from './ui';
import { LineChart, Legend } from './Charts';
import { KpiCard, StatusBadge } from './DataComponents';
import { KPIS, REVENUE, ACCOUNTS, money } from './data';
import { PALETTES } from './tokens';

// Compact dashboard used as the hero's centrepiece (920px design width)
function MiniDashboard() {
  return (
    <div className="at-ink flex overflow-hidden" style={{ width: 920, borderRadius: 16, background: 'var(--bg-default)', boxShadow: '0 50px 100px -30px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.08)' }}>
      <aside className="shrink-0 p-3 flex flex-col gap-1" style={{ width: 176, background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 px-2 py-2 mb-3"><Logo size={24} /><span className="text-[14px] font-bold">ATLAS</span></div>
        {[['overview', 'Overview'], ['chart', 'Reports'], ['users', 'Accounts'], ['billing', 'Billing'], ['settings', 'Settings']].map(([i, l], k) => (
          <span key={l} className={`at-nav-item ${k === 0 ? 'is-active' : ''}`} style={{ height: 32, fontSize: 13 }}><Icon name={i} />{l}</span>
        ))}
      </aside>
      <div className="flex-1 min-w-0 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[19px] font-bold tracking-[-0.02em]">Revenue overview</p>
            <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Jul 2025 – Jun 2026</p>
          </div>
          <div className="at-seg" aria-hidden="true"><button type="button" tabIndex={-1}>30D</button><button type="button" tabIndex={-1}>90D</button><button type="button" tabIndex={-1} aria-pressed="true">12M</button></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {KPIS.slice(0, 3).map(k => <KpiCard key={k.label} {...k} compact />)}
        </div>
        <div className="at-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[14px] font-semibold">Monthly recurring revenue</p>
            <Legend items={REVENUE.series} />
          </div>
          <LineChart data={REVENUE} height={210} caption="Hero preview: monthly recurring revenue" interactive={false} />
        </div>
        <div className="at-card overflow-hidden">
          {ACCOUNTS.slice(0, 3).map((r, i) => (
            <div key={r.id} className="flex items-center gap-3 px-4 h-11 text-[13px]" style={{ borderTop: i ? '1px solid var(--bg-subtle)' : 'none' }}>
              <span className="at-avatar" style={{ background: r.av, borderRadius: 6, width: 24, height: 24, fontSize: 10 }}>{r.name.slice(0, 2).toUpperCase()}</span>
              <span className="font-semibold">{r.name}</span>
              <span className="ml-auto tabular-nums font-semibold">{money(r.mrr)}</span>
              <span className="w-[92px] flex justify-end"><StatusBadge status={r.status} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SwatchCard = () => {
  const violet = PALETTES[0].steps;
  return (
    <div className="at-card at-ink p-4 w-full lg:w-[250px]" style={{ boxShadow: 'var(--elev-4)' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-semibold">Violet</p>
        <span className="font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>50 – 900</span>
      </div>
      <div className="flex h-14 rounded-[8px] overflow-hidden">
        {violet.map(s => <span key={s.step} className="flex-1" style={{ background: s.hex }} />)}
      </div>
      <div className="grid grid-cols-5 gap-1.5 mt-3">
        {['#7C3AED', '#3B82F6', '#14B8A6', '#F43F5E', '#0F172A'].map(c => (
          <span key={c} className="h-6 rounded-[6px]" style={{ background: c }} />
        ))}
      </div>
      <p className="font-mono text-[11px] mt-3" style={{ color: 'var(--text-secondary)' }}>action/primary → violet-600</p>
    </div>
  );
};

const ComponentCard = () => (
  <div className="at-card at-ink p-4 w-full lg:w-[270px] space-y-3" style={{ boxShadow: 'var(--elev-4)' }}>
    <div className="flex gap-2">
      <span className="at-btn at-btn--primary at-btn--sm"><Icon name="plus" />Create</span>
      <span className="at-btn at-btn--secondary at-btn--sm">Export</span>
    </div>
    <span className="at-input is-focus flex items-center text-[13px]" style={{ height: 36 }}>Q2 revenue review</span>
    <div className="flex items-center justify-between">
      <div className="flex gap-1.5"><span className="at-badge at-badge--success"><i />Active</span><span className="at-badge at-badge--warning"><i />Due</span></div>
      <span className="at-switch is-on" style={{ display: 'inline-block' }} />
    </div>
  </div>
);

const TypeCard = () => (
  <div className="at-card at-ink p-4 w-full lg:w-[230px]" style={{ boxShadow: 'var(--elev-4)' }}>
    <div className="flex items-end gap-3">
      <span className="text-[52px] font-bold leading-none tracking-[-0.04em]" style={{ color: '#7C3AED' }}>Aa</span>
      <span className="pb-1">
        <span className="block text-[13px] font-semibold">Plus Jakarta Sans</span>
        <span className="block text-[11px]" style={{ color: 'var(--text-secondary)' }}>400 · 500 · 600 · 700</span>
      </span>
    </div>
    <p className="font-mono text-[11px] mt-3 tracking-[0.02em]" style={{ color: 'var(--text-secondary)' }}>56 · 40 · 32 · 24 · 20 · 18 · 16 · 14</p>
  </div>
);

export default function HeroComposition() {
  return (
    <div className="relative lg:h-[650px]" aria-label="ATLAS design system preview: dashboard, colour palette, components and typography" role="img">
      <div className="lg:absolute lg:left-[14%] lg:right-[8%] lg:top-[92px]" aria-hidden="true">
        <ScaledFrame width={920}><MiniDashboard /></ScaledFrame>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 lg:mt-0" aria-hidden="true">
        <div className="lg:absolute lg:left-0 lg:top-[20px] at-float"><SwatchCard /></div>
        <div className="lg:absolute lg:right-0 lg:top-0 at-float at-float--late"><ComponentCard /></div>
        <div className="lg:absolute lg:left-[3%] lg:bottom-0 at-float at-float--later"><TypeCard /></div>
      </div>
    </div>
  );
}
