import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Board, SectionHeader, SampleNote, SpecLabel, Reveal } from './ui';
import { LineChart, BarChart, DonutChart, Sparkline, Legend } from './Charts';
import { ACCOUNTS, KPIS, REVENUE, NEW_ACCOUNTS, PLAN_MIX, STATUS_BADGE, initials, money } from './data';

// ── KPI card ──────────────────────────────────────────────────────────────────
export function KpiCard({ label, value, delta, up, good, note, spark, compact = false }) {
  const positive = good ?? up;
  // Currency prefix renders smaller so long DKK values still fit beside the sparkline
  const [unit, num] = value.startsWith('DKK ') ? ['DKK', value.slice(4)] : [null, value];
  return (
    <div className={`at-card ${compact ? 'p-4' : 'p-5'}`}>
      <p className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</p>
      <div className="flex items-end justify-between gap-3 mt-2">
        <p className="font-bold tabular-nums" style={{ fontSize: compact ? 24 : 28, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          {unit && <span style={{ fontSize: '0.5em', fontWeight: 600, color: 'var(--text-secondary)', marginRight: 4, letterSpacing: 0 }}>{unit}</span>}
          {num}
        </p>
        {!compact && <Sparkline values={spark} color={positive ? '#7C3AED' : '#E11D48'} />}
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className={`at-badge ${positive ? 'at-badge--success' : 'at-badge--error'}`} style={{ height: 20, paddingLeft: 6 }}>
          <Icon name={up ? 'arrowUp' : 'arrowDown'} size={12} />
          {delta}
        </span>
        <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{note}</span>
      </div>
    </div>
  );
}

export const StatusBadge = ({ status }) => (
  <span className={`at-badge at-badge--${STATUS_BADGE[status]}`}><i />{status}</span>
);

const SortIcon = ({ dir }) => <Icon name={dir === 'asc' ? 'chevUp' : dir === 'desc' ? 'chevDown' : 'sort'} />;

// ── Data table: search, filters, sorting, selection, pagination ───────────────
export function DataTable({ rows = ACCOUNTS, pageSize = 5, title = 'Accounts', dense = false }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [plan, setPlan] = useState('All');
  const [sort, setSort] = useState({ key: 'mrr', dir: 'desc' });
  const [selected, setSelected] = useState(() => new Set(['a3']));
  const [page, setPage] = useState(0);
  const allRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter(r =>
      (status === 'All' || r.status === status) &&
      (plan === 'All' || r.plan === plan) &&
      (!q || r.name.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q))
    );
    const { key, dir } = sort;
    return [...list].sort((a, b) => {
      const av = a[key], bv = b[key];
      const c = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return dir === 'asc' ? c : -c;
    });
  }, [rows, query, status, plan, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages - 1);
  const visible = filtered.slice(current * pageSize, current * pageSize + pageSize);
  const visibleSelected = visible.filter(r => selected.has(r.id)).length;

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = visibleSelected > 0 && visibleSelected < visible.length;
  }, [visibleSelected, visible.length]);
  useEffect(() => { setPage(0); }, [query, status, plan]);

  const toggleSort = key => setSort(s => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }));
  const ariaSort = key => (sort.key === key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none');
  const toggleRow = id => setSelected(s => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });
  const toggleAll = () => setSelected(s => {
    const n = new Set(s);
    const allOn = visible.every(r => n.has(r.id));
    visible.forEach(r => (allOn ? n.delete(r.id) : n.add(r.id)));
    return n;
  });
  const clear = () => { setQuery(''); setStatus('All'); setPlan('All'); };

  // Plain render function (not a component) so the button keeps keyboard focus across re-renders
  const sortTh = (k, label, num) => (
    <th aria-sort={ariaSort(k)} className={num ? 'is-num' : ''}>
      <button type="button" className={`at-sort ${sort.key === k ? 'is-sorted' : ''}`} onClick={() => toggleSort(k)}>
        {label}<SortIcon dir={sort.key === k ? sort.dir : null} />
      </button>
    </th>
  );

  return (
    <div className="at-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4" style={{ borderBottom: '1px solid var(--border)' }}>
        {selected.size > 0 ? (
          <div className="flex flex-wrap items-center gap-3 w-full">
            <span className="at-badge at-badge--violet">{selected.size} selected</span>
            <button type="button" className="at-btn at-btn--tertiary at-btn--sm" onClick={() => setSelected(new Set())}>Clear selection</button>
            <div className="flex gap-2 ml-auto">
              <button type="button" className="at-btn at-btn--secondary at-btn--sm"><Icon name="download" />Export</button>
              <button type="button" className="at-btn at-btn--danger at-btn--sm"><Icon name="trash" />Archive</button>
            </div>
          </div>
        ) : (
          <>
            <h4 className="text-[15px] font-semibold mr-2" style={{ color: 'var(--text-primary)' }}>{title}</h4>
            <span className="at-badge at-badge--neutral">{filtered.length}</span>
            <button type="button" className="at-btn at-btn--secondary at-btn--sm ml-auto"><Icon name="download" />Export</button>
          </>
        )}
        <div className="flex flex-wrap gap-3 w-full">
          <label className="at-input-wrap flex-1 min-w-[180px]">
            <span className="at-sr">Search accounts</span>
            <Icon name="search" />
            <input className="at-input" style={{ height: 36 }} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search accounts or owners" />
          </label>
          <label className="w-[150px]">
            <span className="at-sr">Filter by status</span>
            <select className="at-select" style={{ height: 36 }} value={status} onChange={e => setStatus(e.target.value)}>
              {['All', 'Active', 'Trial', 'Past due', 'Churned'].map(s => <option key={s} value={s}>{s === 'All' ? 'All statuses' : s}</option>)}
            </select>
          </label>
          <label className="w-[140px]">
            <span className="at-sr">Filter by plan</span>
            <select className="at-select" style={{ height: 36 }} value={plan} onChange={e => setPlan(e.target.value)}>
              {['All', 'Enterprise', 'Growth', 'Starter'].map(s => <option key={s} value={s}>{s === 'All' ? 'All plans' : s}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="at-table-wrap">
        <table className="at-table" style={dense ? { fontSize: 13 } : undefined}>
          <caption className="at-sr">{title}, sortable by account, MRR and seats</caption>
          <thead>
            <tr>
              <th className="is-check">
                <input ref={allRef} type="checkbox" className="at-check" aria-label="Select all rows on this page"
                  checked={visible.length > 0 && visibleSelected === visible.length} onChange={toggleAll} />
              </th>
              {sortTh('name', 'Account')}
              <th>Plan</th>
              <th>Owner</th>
              {sortTh('mrr', 'MRR', true)}
              {sortTh('seats', 'Seats', true)}
              <th>Status</th>
              <th>Last active</th>
              <th><span className="at-sr">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {visible.map(r => {
              const on = selected.has(r.id);
              return (
                <tr key={r.id} className={on ? 'is-selected' : ''}>
                  <td className="is-check">
                    <input type="checkbox" className="at-check" checked={on} onChange={() => toggleRow(r.id)} aria-label={`Select ${r.name}`} />
                  </td>
                  <td>
                    <span className="flex items-center gap-3">
                      <span className="at-avatar" style={{ background: r.av, borderRadius: 8 }}>{initials(r.name)}</span>
                      <span className="font-semibold">{r.name}</span>
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.plan}</td>
                  <td>{r.owner}</td>
                  <td className="is-num font-semibold">{money(r.mrr)}</td>
                  <td className="is-num" style={{ color: 'var(--text-secondary)' }}>{r.seats}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.updated}</td>
                  <td>
                    <button type="button" className="at-btn at-btn--tertiary at-btn--icon at-btn--sm" aria-label={`More actions for ${r.name}`} style={{ color: 'var(--text-secondary)' }}>
                      <Icon name="more" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={9} style={{ height: 160, textAlign: 'center', whiteSpace: 'normal' }}>
                  <p className="font-semibold mb-1">No accounts match these filters</p>
                  <p className="text-[13px] mb-3" style={{ color: 'var(--text-secondary)' }}>Try a different search term or reset the filters.</p>
                  <button type="button" className="at-btn at-btn--secondary at-btn--sm" onClick={clear}>Clear filters</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }} aria-live="polite">
          {filtered.length
            ? <>Showing <b style={{ color: 'var(--text-primary)' }}>{current * pageSize + 1}–{Math.min(filtered.length, (current + 1) * pageSize)}</b> of {filtered.length} accounts</>
            : 'No results'}
        </p>
        <nav className="at-pager" aria-label="Table pagination">
          <button type="button" onClick={() => setPage(current - 1)} disabled={current === 0} aria-label="Previous page"><Icon name="chevLeft" /></button>
          {Array.from({ length: pages }, (_, i) => (
            <button type="button" key={i} onClick={() => setPage(i)} aria-current={i === current ? 'page' : undefined}>{i + 1}</button>
          ))}
          <button type="button" onClick={() => setPage(current + 1)} disabled={current >= pages - 1} aria-label="Next page"><Icon name="chevRight" /></button>
        </nav>
      </div>
    </div>
  );
}

// ── Chart card wrapper ────────────────────────────────────────────────────────
export const ChartCard = ({ title, subtitle, legend, action, children, className = '' }) => (
  <div className={`at-card p-5 ${className}`}>
    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
      <div>
        <h4 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h4>
        {subtitle && <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
    {legend && <Legend items={legend} className="mb-3" />}
    {children}
  </div>
);

// ── Section 06 ────────────────────────────────────────────────────────────────
const LEGEND_SPECS = [
  { title: 'Categorical order', desc: 'Series take violet → blue → teal in a fixed order. A filter never repaints the remaining series.' },
  { title: 'Never colour alone', desc: 'Every multi-series chart has a legend, selective direct labels and a screen-reader data table.' },
  { title: 'Comparison is neutral', desc: 'Previous-period lines use dashed neutral-400, so the current period always leads.' },
  { title: 'Status is reserved', desc: 'Teal, amber and rose status tokens always come with an icon or label — never as “series 4”.' },
];

export default function DataComponentsSection() {
  return (
    <section id="data" className="mb-28 md:mb-36 scroll-mt-24">
      <SectionHeader num="06" label="Advanced Data Components" title="Patterns for data-dense screens">
        <p>
          Enterprise products live in tables and charts. These components combine the foundations into working patterns: a data table with search, filters, sorting, selection and pagination; KPI tiles; and a chart set with shared legend rules.
        </p>
        <p className="text-[14px] text-[#6B7280]">Every example here is interactive. Try sorting the table, selecting rows or hovering the charts.</p>
      </SectionHeader>

      <div className="space-y-6">
        <Board title="KPI cards" meta="Card / Metric · 4 variants">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {KPIS.map(k => <KpiCard key={k.label} {...k} />)}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <SpecLabel>Delta = arrow + value + label · direction never shown by colour alone</SpecLabel>
            <SampleNote />
          </div>
        </Board>

        <Board title="Data table" meta="Table / Accounts · toolbar · bulk actions · pagination" bodyClass="!p-3 sm:!p-6">
          <DataTable />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
            <SpecLabel>Row 52px · header 40px · cell padding 16px · numeric columns right-aligned, tabular figures</SpecLabel>
            <SampleNote />
          </div>
        </Board>

        <Board title="Charts & legends" meta="Chart / Line · Bar · Donut">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <ChartCard
              className="lg:col-span-3" title="Monthly recurring revenue" subtitle="Jul 2025 – Jun 2026 · in thousands"
              legend={REVENUE.series}
            >
              <LineChart data={REVENUE} caption="Monthly recurring revenue, this period vs previous period" />
            </ChartCard>
            <ChartCard className="lg:col-span-2" title="MRR by plan" subtitle="Share of current MRR">
              <DonutChart data={PLAN_MIX} size={180} caption="MRR split by plan" />
            </ChartCard>
            <ChartCard className="lg:col-span-3" title="New accounts by plan" subtitle="Per quarter" legend={NEW_ACCOUNTS.series}>
              <BarChart data={NEW_ACCOUNTS} caption="New accounts per quarter, grouped by plan" />
            </ChartCard>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 content-start">
              {LEGEND_SPECS.map(({ title, desc }, i) => (
                <Reveal key={title} delay={i * 60} className="rounded-[12px] p-4" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                  <p className="text-[14px] font-semibold mb-1">{title}</p>
                  <p className="text-[13px] leading-[1.55]" style={{ color: '#64748B' }}>{desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-5"><SampleNote /></div>
        </Board>
      </div>
    </section>
  );
}
