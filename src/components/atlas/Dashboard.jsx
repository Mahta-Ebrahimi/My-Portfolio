import React, { useState } from 'react';
import { Icon, Logo, ScaledFrame, SectionHeader, SampleNote, Reveal } from './ui';
import { LineChart, BarChart, DonutChart } from './Charts';
import { KpiCard, DataTable, ChartCard, StatusBadge } from './DataComponents';
import { KPIS, REVENUE, NEW_ACCOUNTS, PLAN_MIX, ACCOUNTS, REGIONS, money } from './data';

const NAV = [
  ['overview', 'Overview'], ['chart', 'Reports'], ['users', 'Accounts', 128], ['billing', 'Billing'], ['plug', 'Integrations'],
];

function Seg({ options, initial, label, small }) {
  const [v, setV] = useState(initial);
  return (
    <div className="at-seg" role="group" aria-label={label}>
      {options.map((o, i) => (
        <button key={o} type="button" aria-pressed={v === i} onClick={() => setV(i)} style={small ? { padding: '0 10px' } : undefined}>{o}</button>
      ))}
    </div>
  );
}

const ACTIVITY = [
  { icon: 'success', color: '#0D9488', title: 'Orbit Logistics upgraded to Enterprise', meta: '+DKK 4,200 MRR · 1 h ago' },
  { icon: 'warning', color: '#B45309', title: 'Fernway Health payment past due', meta: 'Invoice INV-2291 · 3 h ago' },
  { icon: 'info',    color: '#2563EB', title: 'Brightline Co. started a trial', meta: 'Growth plan · 14 min ago' },
  { icon: 'error',   color: '#E11D48', title: 'Quayside Retail cancelled', meta: '−DKK 3,800 MRR · yesterday' },
];

// ── Desktop (1280px design width) ─────────────────────────────────────────────
function DesktopDashboard() {
  const [nav, setNav] = useState(0);
  return (
    <div className="at-frame" style={{ width: 1320 }}>
      <div className="at-chrome"><i /><i /><i />
        <span className="mx-auto font-mono text-[11px] px-16 py-1 rounded-[6px]" style={{ background: '#F8FAFC', color: '#64748B' }}>app.atlas-analytics.example/overview</span>
      </div>
      <div className="flex" style={{ background: 'var(--bg-default)' }}>
        {/* Sidebar */}
        <aside className="shrink-0 flex flex-col p-4" style={{ width: 240, background: 'var(--surface)', borderRight: '1px solid var(--border)', minHeight: 1180 }}>
          <div className="flex items-center gap-2.5 px-2 mb-6">
            <Logo size={30} />
            <div>
              <p className="text-[15px] font-bold tracking-[-0.01em] leading-tight">ATLAS</p>
              <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Analytics</p>
            </div>
          </div>
          <button type="button" className="flex items-center gap-2 w-full px-3 h-10 mb-5 rounded-[10px] text-left" style={{ border: '1px solid var(--border)', background: 'var(--bg-default)' }}>
            <span className="w-5 h-5 rounded-[5px] grid place-items-center text-[10px] font-bold text-white" style={{ background: '#0D9488' }}>F</span>
            <span className="text-[13px] font-semibold">Finance workspace</span>
            <Icon name="sort" size={14} style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }} />
          </button>
          <p className="at-spec-label px-3 mb-2">Main</p>
          <nav aria-label="Dashboard navigation" className="space-y-0.5">
            {NAV.map(([icon, label, count], i) => (
              <button key={label} type="button" className={`at-nav-item ${nav === i ? 'is-active' : ''}`} aria-current={nav === i ? 'page' : undefined} onClick={() => setNav(i)}>
                <Icon name={icon} />{label}{count && <span className="at-count">{count}</span>}
              </button>
            ))}
          </nav>
          <p className="at-spec-label px-3 mt-6 mb-2">Saved views</p>
          {['Enterprise accounts', 'At-risk renewals', 'Nordics pipeline'].map((v, i) => (
            <button key={v} type="button" className="at-nav-item">
              <span className="w-2 h-2 rounded-full" style={{ background: ['#7C3AED', '#F59E0B', '#3B82F6'][i] }} />{v}
            </button>
          ))}
          <div className="mt-auto">
            <div className="rounded-[12px] p-4 mb-4" style={{ background: 'var(--action-subtle)', border: '1px solid #DDD6FE' }}>
              <p className="text-[13px] font-semibold" style={{ color: '#5B21B6' }}>212 of 250 seats used</p>
              <div className="h-1.5 rounded-full my-2.5" style={{ background: '#DDD6FE' }}><div className="h-1.5 rounded-full" style={{ width: '85%', background: '#7C3AED' }} /></div>
              <button type="button" className="text-[12px] font-semibold" style={{ color: '#6D28D9' }}>Manage seats →</button>
            </div>
            <button type="button" className="at-nav-item"><Icon name="settings" />Settings</button>
            <div className="flex items-center gap-3 px-2 pt-4 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
              <span className="at-avatar" style={{ background: '#7C3AED', width: 32, height: 32 }}>LK</span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold truncate">Louise Kristensen</p>
                <p className="text-[11px] truncate" style={{ color: 'var(--text-secondary)' }}>Revenue lead</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <header className="flex items-center gap-4 px-8 h-16" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <ol className="at-crumbs">
              <li>Finance</li><li aria-hidden="true"><Icon name="chevRight" size={14} /></li><li aria-current="page">Overview</li>
            </ol>
            <label className="at-input-wrap ml-auto" style={{ width: 300 }}>
              <span className="at-sr">Search</span><Icon name="search" />
              <input className="at-input" style={{ height: 36, paddingRight: 48 }} placeholder="Search…" />
              <kbd className="at-kbd">⌘K</kbd>
            </label>
            <button type="button" className="at-btn at-btn--secondary at-btn--icon at-btn--sm relative" aria-label="Notifications, 3 unread">
              <Icon name="bell" /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#F43F5E', boxShadow: '0 0 0 2px #fff' }} />
            </button>
          </header>

          <div className="px-8 py-7 space-y-6">
            {/* Title + toolbar */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-[28px] font-bold tracking-[-0.02em] leading-tight">Revenue overview</h3>
                <p className="text-[14px] mt-1" style={{ color: 'var(--text-secondary)' }}>Subscription performance across all workspaces · updated 4 min ago</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="at-btn at-btn--secondary at-btn--sm"><Icon name="download" />Export</button>
                <button type="button" className="at-btn at-btn--primary at-btn--sm"><Icon name="plus" />Share report</button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 p-3 rounded-[12px]" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <Seg options={['7D', '30D', '90D', '12M']} initial={3} label="Date preset" />
              <button type="button" className="at-btn at-btn--secondary at-btn--sm"><Icon name="calendar" />1 Jul 2025 – 30 Jun 2026<Icon name="chevDown" /></button>
              <span className="w-px h-6 mx-1" style={{ background: 'var(--border)' }} />
              <select className="at-select" style={{ height: 32, width: 160, fontSize: 13 }} aria-label="Region" defaultValue="Europe">{REGIONS.map(r => <option key={r}>{r}</option>)}</select>
              <select className="at-select" style={{ height: 32, width: 140, fontSize: 13 }} aria-label="Plan" defaultValue="All plans"><option>All plans</option><option>Enterprise</option><option>Growth</option></select>
              <span className="at-badge at-badge--violet" style={{ height: 28, paddingRight: 4 }}>
                Currency: DKK
                <button type="button" aria-label="Remove currency filter" className="grid place-items-center w-5 h-5 rounded-full hover:bg-white/60"><Icon name="x" size={12} /></button>
              </span>
              <button type="button" className="at-btn at-btn--tertiary at-btn--sm ml-auto"><Icon name="filter" />More filters</button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {KPIS.map(k => <KpiCard key={k.label} {...k} />)}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ChartCard className="col-span-2" title="Monthly recurring revenue" subtitle="In thousands DKK" legend={REVENUE.series}
                action={<Seg options={['MRR', 'ARR']} initial={0} label="Metric" small />}>
                <LineChart data={REVENUE} height={250} caption="Dashboard: monthly recurring revenue" />
              </ChartCard>
              <ChartCard title="MRR by plan" subtitle="Current month">
                <div className="pt-2"><DonutChart data={PLAN_MIX} size={170} thickness={22} caption="Dashboard: MRR by plan" /></div>
              </ChartCard>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ChartCard title="New accounts by plan" subtitle="Per quarter" legend={NEW_ACCOUNTS.series}>
                <BarChart data={NEW_ACCOUNTS} height={220} caption="Dashboard: new accounts per quarter" />
              </ChartCard>
              <ChartCard title="Account activity" subtitle="Latest events" action={<button type="button" className="at-btn at-btn--tertiary at-btn--sm">View all</button>}>
                <ul>
                  {ACTIVITY.map((a, i) => (
                    <li key={a.title} className="flex items-start gap-3 py-3" style={{ borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--bg-subtle)' : 'none' }}>
                      <span className="w-8 h-8 rounded-[8px] grid place-items-center shrink-0" style={{ background: 'var(--bg-default)', color: a.color }}><Icon name={a.icon} size={16} /></span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium">{a.title}</span>
                        <span className="block text-[12px]" style={{ color: 'var(--text-secondary)' }}>{a.meta}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </ChartCard>
            </div>

            <DataTable pageSize={5} title="Accounts" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tablet (768px) ────────────────────────────────────────────────────────────
function TabletDashboard() {
  return (
    <div style={{ width: 788, padding: 10, borderRadius: 34, background: '#0B1120', boxShadow: '0 30px 60px -20px rgba(0,0,0,.6), inset 0 0 0 1px #1E293B' }}>
      <div className="at-ink flex overflow-hidden" style={{ borderRadius: 24, background: 'var(--bg-default)', height: 1000 }}>
        <aside className="shrink-0 flex flex-col items-center gap-2 py-4" style={{ width: 68, background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
          <Logo size={30} />
          <div className="h-3" />
          {NAV.map(([icon, label], i) => (
            <span key={label} className={`at-nav-item ${i === 0 ? 'is-active' : ''}`} style={{ width: 44, justifyContent: 'center', padding: 0 }} title={label}><Icon name={icon} /></span>
          ))}
          <span className="at-avatar mt-auto" style={{ background: '#7C3AED', width: 32, height: 32 }}>LK</span>
        </aside>
        <div className="flex-1 min-w-0 p-6 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[22px] font-bold tracking-[-0.02em]">Revenue overview</h3>
            <span className="at-btn at-btn--secondary at-btn--icon at-btn--sm"><Icon name="filter" /></span>
          </div>
          <div className="flex items-center gap-2">
            <Seg options={['7D', '30D', '90D', '12M']} initial={3} label="Tablet date preset" />
            <span className="at-btn at-btn--secondary at-btn--sm"><Icon name="calendar" />Jul 25 – Jun 26</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {KPIS.map(k => <KpiCard key={k.label} {...k} compact />)}
          </div>
          <ChartCard title="Monthly recurring revenue" legend={REVENUE.series}>
            <LineChart data={REVENUE} height={220} caption="Tablet: monthly recurring revenue" />
          </ChartCard>
          <div className="at-card overflow-hidden">
            <p className="text-[15px] font-semibold px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>Accounts</p>
            <table className="at-table">
              <thead><tr><th>Account</th><th className="is-num">MRR</th><th>Status</th></tr></thead>
              <tbody>
                {ACCOUNTS.slice(0, 4).map(r => (
                  <tr key={r.id}><td className="font-semibold">{r.name}</td><td className="is-num">{money(r.mrr)}</td><td><StatusBadge status={r.status} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile (375px) ────────────────────────────────────────────────────────────
function MobileDashboard() {
  return (
    <div style={{ width: 395, padding: 10, borderRadius: 48, background: '#0B1120', boxShadow: '0 30px 60px -20px rgba(0,0,0,.6), inset 0 0 0 1px #1E293B' }}>
      <div className="at-ink relative flex flex-col overflow-hidden" style={{ borderRadius: 38, background: 'var(--bg-default)', height: 1000 }}>
        <div className="flex items-center justify-between px-6 pt-4 pb-2 text-[12px] font-semibold"><span>9:41</span><span className="w-24 h-6 rounded-full" style={{ background: '#0B1120' }} /><span>100%</span></div>
        <header className="flex items-center gap-3 px-4 h-14" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <span className="at-btn at-btn--tertiary at-btn--icon at-btn--sm" style={{ color: 'var(--text-primary)' }}><Icon name="menu" /></span>
          <p className="text-[16px] font-bold">Overview</p>
          <span className="at-avatar ml-auto" style={{ background: '#7C3AED', width: 30, height: 30 }}>LK</span>
        </header>
        <div className="flex-1 p-4 space-y-4 overflow-hidden">
          <div className="flex gap-2">
            <Seg options={['7D', '30D', '90D', '12M']} initial={3} label="Mobile date preset" small />
            <span className="at-btn at-btn--secondary at-btn--icon at-btn--sm ml-auto"><Icon name="filter" /></span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {KPIS.map(k => (
              <div key={k.label} className="at-card p-3">
                <p className="text-[11px] font-medium leading-tight" style={{ color: 'var(--text-secondary)' }}>{k.label}</p>
                <p className="text-[20px] font-bold tabular-nums mt-1 tracking-[-0.02em]">{k.value}</p>
                <p className="flex items-center gap-1 text-[11px] font-semibold mt-1" style={{ color: (k.good ?? k.up) ? '#0F766E' : '#BE123C' }}>
                  <Icon name={k.up ? 'arrowUp' : 'arrowDown'} size={11} />{k.delta}
                </p>
              </div>
            ))}
          </div>
          <div className="at-card p-4">
            <p className="text-[14px] font-semibold mb-2">MRR · 12 months</p>
            <LineChart
              data={{ ...REVENUE, series: [REVENUE.series[0]] }} tickEvery={3}
              width={330} height={190} caption="Mobile: monthly recurring revenue"
            />
          </div>
          <p className="text-[14px] font-semibold pt-1">Accounts</p>
          {ACCOUNTS.slice(0, 3).map(r => (
            <div key={r.id} className="at-card p-3 flex items-center gap-3">
              <span className="at-avatar" style={{ background: r.av, borderRadius: 8, width: 34, height: 34 }}>{r.name.slice(0, 2).toUpperCase()}</span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold truncate">{r.name}</p>
                <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{r.plan} · {money(r.mrr)}</p>
              </div>
              <span className="ml-auto"><StatusBadge status={r.status} /></span>
            </div>
          ))}
        </div>
        <nav className="flex items-center justify-around h-16 shrink-0" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }} aria-label="Mobile tab bar">
          {NAV.slice(0, 4).map(([icon, label], i) => (
            <span key={label} className="flex flex-col items-center gap-1 text-[10px] font-semibold" style={{ color: i === 0 ? '#6D28D9' : 'var(--text-secondary)' }}>
              <Icon name={icon} size={20} />{label}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}

const ADAPT = [
  { el: 'Navigation', d: 'Sidebar with labels', t: 'Icon rail (68px)', m: 'Bottom tab bar + menu' },
  { el: 'KPI cards', d: '4 across with sparklines', t: '2 × 2, compact', m: '2 × 2, value + delta only' },
  { el: 'Filters', d: 'Inline toolbar', t: 'Preset + filter button', m: 'Preset + filter sheet' },
  { el: 'Charts', d: 'Line + donut side by side', t: 'Full-width line', m: 'Single series, taller' },
  { el: 'Data table', d: 'Full table, 8 columns', t: '3 priority columns', m: 'Stacked account cards' },
];

export default function DashboardSection() {
  return (
    <section id="dashboard" className="mb-28 md:mb-36 scroll-mt-24">
      <SectionHeader num="08" label="Design System in Action" title="One system, one analytics dashboard">
        <p>
          To test whether the system holds together, ATLAS is applied to a revenue analytics dashboard: sidebar navigation, header and toolbar, date-range and filter controls, KPI cards, charts, an activity feed, and a full data table, all built only from the components and tokens above.
        </p>
      </SectionHeader>

      <Reveal>
        <ScaledFrame width={1320} label="ATLAS analytics dashboard, desktop layout">
          <DesktopDashboard />
        </ScaledFrame>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-[#6B7280]">Desktop · 1320px frame, scaled to fit. The controls, chart tooltips and table are live.</p>
          <SampleNote dark />
        </div>
      </Reveal>

      <div className="mt-16 md:mt-20">
        <Reveal className="max-w-[760px] mb-10">
          <h3 className="text-white text-[22px] md:text-[26px] font-bold tracking-[-0.02em] mb-3">Adapting to tablet and mobile</h3>
          <p className="text-[#9CA3AF] text-[16px] leading-[1.7]">
            The same components reflow rather than being redesigned. Navigation condenses, KPI cards regroup, and the table gives way to priority columns and then to stacked cards.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.75fr_1fr] gap-8 md:gap-10 items-start">
          <Reveal>
            <ScaledFrame width={788} label="Tablet layout"><TabletDashboard /></ScaledFrame>
            <p className="text-[13px] text-[#6B7280] mt-3 text-center">Tablet · 768px</p>
          </Reveal>
          <Reveal delay={120} className="max-w-[300px] w-full mx-auto">
            <ScaledFrame width={395} label="Mobile layout"><MobileDashboard /></ScaledFrame>
            <p className="text-[13px] text-[#6B7280] mt-3 text-center">Mobile · 375px</p>
          </Reveal>
        </div>

        <Reveal className="mt-12 overflow-x-auto rounded-[16px]" style={{ border: '1px solid var(--page-line)' }}>
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <caption className="at-sr">How dashboard elements adapt per breakpoint</caption>
            <thead>
              <tr className="bg-[#0D0D0D]">
                {['Element', 'Desktop', 'Tablet', 'Mobile'].map(h => (
                  <th key={h} scope="col" className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] font-medium" style={{ color: 'var(--page-accent)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADAPT.map(({ el, d, t, m }) => (
                <tr key={el} style={{ borderTop: '1px solid var(--page-line)' }}>
                  <th scope="row" className="px-5 py-3.5 text-white font-semibold">{el}</th>
                  <td className="px-5 py-3.5 text-[#9CA3AF]">{d}</td>
                  <td className="px-5 py-3.5 text-[#9CA3AF]">{t}</td>
                  <td className="px-5 py-3.5 text-[#9CA3AF]">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
