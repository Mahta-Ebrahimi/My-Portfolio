import React from 'react';
import { Board, SectionHeader, SpecLabel, Icon, ScaledFrame, Reveal } from './ui';
import { StatusBadge } from './DataComponents';

const Marker = ({ n, x, y }) => (
  <span className="at-marker at-marker--abs" style={{ left: x - 11, top: y - 11 }} aria-hidden="true">{n}</span>
);

// Rose measurement line with value. Horizontal when h is undefined.
const Measure = ({ x, y, w, h, label }) => {
  const v = h !== undefined;
  const line = v ? { left: x - 1, top: y, width: 2, height: h } : { left: x, top: y - 1, width: w, height: 2 };
  const cap = { position: 'absolute', background: '#F43F5E', ...(v ? { width: 8, height: 2, left: -3 } : { width: 2, height: 8, top: -3 }) };
  const text = v ? { left: 10, top: '50%', transform: 'translateY(-50%)' } : { top: 8, left: '50%', transform: 'translateX(-50%)' };
  return (
    <span className="at-measure" style={line} aria-hidden="true">
      <span style={{ position: 'absolute', inset: 0, background: '#F43F5E' }} />
      <span style={{ ...cap, ...(v ? { top: 0 } : { left: 0 }) }} />
      <span style={{ ...cap, ...(v ? { bottom: 0 } : { right: 0 }) }} />
      <span style={{ position: 'absolute', whiteSpace: 'nowrap', background: '#fff', padding: '0 3px', borderRadius: 3, ...text }}>{label}</span>
    </span>
  );
};

const BUTTON_PARTS = [
  { n: 1, name: 'Container',     spec: 'Fill action/primary · min-width 64' },
  { n: 2, name: 'Padding',       spec: 'Inline space/400 (16px) · md size' },
  { n: 3, name: 'Icon',          spec: '16px · optional leading or trailing' },
  { n: 4, name: 'Label',         spec: '14/20 Semibold · sentence case' },
  { n: 5, name: 'Spacing',       spec: 'Icon-to-label gap space/200 (8px)' },
  { n: 6, name: 'Border',        spec: '1px · transparent on primary, border/strong on secondary' },
  { n: 7, name: 'Radius',        spec: 'radius/md (8px)' },
  { n: 8, name: 'Focus state',   spec: '2px surface gap + 2px violet-500 ring' },
];

const BUTTON_STATES = [
  { label: 'Default',  cls: '',            token: 'action/primary' },
  { label: 'Hover',    cls: 'is-hover',    token: 'action/primary-hover' },
  { label: 'Pressed',  cls: 'is-press',    token: 'action/primary-pressed' },
  { label: 'Focus',    cls: 'is-focus',    token: 'focus/ring' },
  { label: 'Disabled', cls: 'is-disabled', token: 'background/subtle' },
];

const TABLE_PARTS = [
  { n: 1, name: 'Toolbar',            spec: 'Search, filters and bulk actions · 16px padding' },
  { n: 2, name: 'Header cell',        spec: 'Label 12/16 uppercase · background/default · 40px' },
  { n: 3, name: 'Sort indicator',     spec: '14px chevron · active column in action/primary' },
  { n: 4, name: 'Selection column',   spec: '44px · checkbox 18px · header supports indeterminate' },
  { n: 5, name: 'Cell padding',       spec: 'Inline 16px · row height 52px (40px dense)' },
  { n: 6, name: 'Numeric alignment',  spec: 'Right-aligned · tabular figures' },
  { n: 7, name: 'Status badge',       spec: 'Dot + label · status tokens, never colour alone' },
  { n: 8, name: 'Row states',         spec: 'Hover background/default · selected violet-50' },
  { n: 9, name: 'Row divider',        spec: '1px background/subtle · no vertical rules' },
  { n: 10, name: 'Pagination',        spec: 'Result count + pager · 32px targets' },
];

const GUIDELINES = [
  { title: 'When to use', icon: 'check', tone: 'success', items: [
    'Comparing many records across the same set of attributes.',
    'Users need to sort, filter, select or act on records in bulk.',
    'Exact values matter more than the overall trend.',
  ] },
  { title: 'When not to use', icon: 'x', tone: 'error', items: [
    'Fewer than ~5 rows or attributes. Use a list or cards instead.',
    'The goal is to show a trend or proportion. Use a chart.',
    'Content is long-form or highly visual.',
  ] },
  { title: 'Accessibility', icon: 'info', tone: 'info', items: [
    'Native <table> with a <caption>, scoped headers and aria-sort on sortable columns.',
    'Status is communicated with text and dots, not colour alone.',
    'Text and key UI meet WCAG 2.2 AA contrast. Targets are at least 32 × 32px.',
  ] },
  { title: 'Keyboard focus', icon: 'layers', tone: 'violet', items: [
    'Tab order: toolbar → header sort buttons → row checkboxes → row actions → pager.',
    'Every interactive element shows the 2px violet focus ring.',
    'Bulk-action bar replaces the toolbar title while focus stays in place.',
  ] },
  { title: 'Responsive behaviour', icon: 'overview', tone: 'info', items: [
    '≥ 1024px: full table. 768–1023px: low-priority columns (Seats, Owner) hide.',
    '< 768px: rows become stacked cards with the name, status and MRR.',
    'Toolbar filters wrap below search. The table itself scrolls within its container.',
  ] },
  { title: 'Developer specs', icon: 'copy', tone: 'violet', items: [
    'Props: columns, rows, sort, selection, pageSize, density, emptyState.',
    'Density tokens: table/row-height/default 52, table/row-height/dense 40.',
    'Emits onSortChange, onSelectionChange and onPageChange.',
  ] },
];

const TONE = { success: ['#F0FDFA', '#0F766E'], error: ['#FFF1F2', '#BE123C'], info: ['#EFF6FF', '#1D4ED8'], violet: ['#F5F3FF', '#6D28D9'] };

const PartsList = ({ parts, cols = 1 }) => (
  <ol className={`grid gap-x-8 ${cols === 2 ? 'sm:grid-cols-2' : ''}`}>
    {parts.map(({ n, name, spec }) => (
      <li key={n} className="flex items-start gap-3 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
        <span className="at-marker" aria-hidden="true">{n}</span>
        <span>
          <span className="block text-[14px] font-semibold">{name}</span>
          <span className="block text-[13px] leading-[1.5]" style={{ color: '#64748B' }}>{spec}</span>
        </span>
      </li>
    ))}
  </ol>
);

// ── Button drawing at 200% (fixed coordinates, scaled to fit) ─────────────────
function ButtonDrawing() {
  return (
    <ScaledFrame width={520} label="Annotated primary button drawn at 200 percent">
      <div className="relative" style={{ width: 520, height: 260, backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
        <div
          className="absolute flex items-center"
          style={{
            left: 90, top: 90, width: 308, height: 80, padding: '0 32px', gap: 16, borderRadius: 16, background: '#7C3AED', color: '#fff',
            boxShadow: '0 0 0 4px #F8FAFC, 0 0 0 8px #8B5CF6',
          }}
        >
          <Icon name="plus" size={32} style={{ outline: '1.5px dashed rgba(255,255,255,.6)', outlineOffset: 2 }} />
          <span style={{ width: 196, fontSize: 28, fontWeight: 600, lineHeight: '40px', outline: '1.5px dashed rgba(255,255,255,.6)', outlineOffset: 2, whiteSpace: 'nowrap' }}>Create report</span>
        </div>
        {/* Padding + gap highlights */}
        <span className="absolute" style={{ left: 90, top: 90, width: 32, height: 80, background: 'rgba(244,63,94,.28)', borderRadius: '16px 0 0 16px' }} />
        <span className="absolute" style={{ left: 154, top: 90, width: 16, height: 80, background: 'rgba(244,63,94,.28)' }} />

        <Measure x={90} y={204} w={32} label="16" />
        <Measure x={154} y={204} w={16} label="8" />
        <Measure x={122} y={60} w={32} label="16" />
        <Measure x={436} y={90} h={80} label="40" />

        <Marker n={1} x={70} y={74} />
        <Marker n={2} x={106} y={236} />
        <Marker n={3} x={100} y={46} />
        <Marker n={4} x={268} y={70} />
        <Marker n={5} x={162} y={236} />
        <Marker n={6} x={240} y={170} />
        <Marker n={7} x={398} y={90} />
        <Marker n={8} x={404} y={176} />
        <span className="absolute font-mono text-[11px]" style={{ right: 12, bottom: 10, color: '#64748B' }}>Drawn at 200% · values in px</span>
      </div>
    </ScaledFrame>
  );
}

// ── Annotated table (static, fixed width) ─────────────────────────────────────
function TableDrawing() {
  const rows = [
    { name: 'Orbit Logistics', mrr: 'DKK 22,950', status: 'Active', sel: true },
    { name: 'Fernway Health', mrr: 'DKK 6,100', status: 'Past due', hover: true },
    { name: 'Brightline Co.', mrr: 'DKK 4,200', status: 'Trial' },
  ];
  return (
    <ScaledFrame width={780} label="Annotated data table">
      <div className="relative p-6" style={{ width: 780, backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
        <div className="at-card relative" style={{ overflow: 'visible' }}>
          {/* Toolbar */}
          <div className="relative flex items-center gap-3 p-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
            <span className="at-input-wrap" style={{ width: 260 }}><Icon name="search" /><span className="at-input flex items-center" style={{ height: 36, color: '#94A3B8' }}>Search accounts</span></span>
            <span className="at-select flex items-center" style={{ height: 36, width: 140 }}>All statuses</span>
            <span className="at-btn at-btn--secondary at-btn--sm ml-auto"><Icon name="download" />Export</span>
            <Marker n={1} x={-6} y={30} />
          </div>
          <table className="at-table">
            <thead>
              <tr>
                <th className="is-check relative"><span className="at-check" style={{ display: 'inline-block', background: '#7C3AED', borderColor: '#7C3AED' }} /><Marker n={4} x={14} y={-4} /></th>
                <th className="relative">Account<Marker n={2} x={110} y={20} /></th>
                <th className="is-num">
                  <span className="relative inline-flex items-center gap-1" style={{ color: '#6D28D9' }}>
                    <Marker n={3} x={-16} y={8} />MRR<Icon name="chevDown" size={14} />
                  </span>
                </th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.name} className={r.sel ? 'is-selected' : ''}>
                  <td className="is-check" style={r.hover ? { background: '#F8FAFC' } : undefined}>
                    <input type="checkbox" className="at-check" readOnly checked={!!r.sel} tabIndex={-1} aria-hidden="true" />
                  </td>
                  <td className="relative font-semibold" style={r.hover ? { background: '#F8FAFC' } : undefined}>
                    {i === 0 && <span className="absolute" style={{ left: 0, top: 0, width: 16, height: '100%', background: 'rgba(244,63,94,.22)' }} />}
                    {r.name}
                    {i === 0 && <Marker n={5} x={8} y={-2} />}
                  </td>
                  <td className="is-num relative font-semibold" style={r.hover ? { background: '#F8FAFC' } : undefined}>
                    {r.mrr}{i === 0 && <Marker n={6} x={22} y={26} />}
                  </td>
                  <td className="relative" style={r.hover ? { background: '#F8FAFC' } : undefined}>
                    <StatusBadge status={r.status} />{i === 1 && <Marker n={7} x={112} y={26} />}
                  </td>
                  <td className="relative" style={{ color: '#64748B', ...(r.hover ? { background: '#F8FAFC' } : {}) }}>
                    {['Mette Jensen', 'Lars Pedersen', 'Jonas Hansen'][i]}
                    {i === 1 && <Marker n={8} x={150} y={26} />}
                    {i === 2 && <Marker n={9} x={150} y={0} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="relative flex items-center justify-between px-4 py-3">
            <span className="text-[13px]" style={{ color: '#64748B' }}>Showing 1–3 of 12</span>
            <span className="at-pager"><button type="button" tabIndex={-1} aria-current="page">1</button><button type="button" tabIndex={-1}>2</button><button type="button" tabIndex={-1}>3</button></span>
            <Marker n={10} x={720} y={-2} />
          </div>
        </div>
      </div>
    </ScaledFrame>
  );
}

export default function Anatomy() {
  return (
    <section id="anatomy" className="mb-28 md:mb-36 scroll-mt-24">
      <SectionHeader num="07" label="Component Anatomy" title="Documentation precise enough to build from">
        <p>
          Each component page in ATLAS breaks the component into numbered parts, links every part to a token, and pairs it with usage and accessibility guidance. Below are two examples: a simple primitive and a complex pattern.
        </p>
      </SectionHeader>

      <div className="space-y-6">
        <Board title="Button · anatomy" meta="Button / Primary / Medium">
          <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr] gap-8 items-start">
            <div>
              <ButtonDrawing />
              <div className="mt-6">
                <SpecLabel className="mb-3">State tokens</SpecLabel>
                <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {BUTTON_STATES.map(s => (
                    <li key={s.label} className="flex flex-col items-start gap-2">
                      <span className={`at-btn at-btn--primary at-btn--sm ${s.cls}`} aria-hidden="true">Button</span>
                      <span className="text-[12px] font-semibold">{s.label}</span>
                      <code className="font-mono text-[11px] leading-tight" style={{ color: '#64748B' }}>{s.token}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <SpecLabel className="mb-1">Legend</SpecLabel>
              <PartsList parts={BUTTON_PARTS} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="rounded-[10px] p-4" style={{ background: '#F0FDFA', border: '1px solid #99F6E4' }}>
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: '#0F766E' }}><Icon name="check" size={14} />Do</p>
                  <p className="text-[13px] mt-1 leading-[1.5]" style={{ color: '#334155' }}>Use one primary button per view, for the main action.</p>
                </div>
                <div className="rounded-[10px] p-4" style={{ background: '#FFF1F2', border: '1px solid #FECDD3' }}>
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: '#BE123C' }}><Icon name="x" size={14} />Don't</p>
                  <p className="text-[13px] mt-1 leading-[1.5]" style={{ color: '#334155' }}>Place two primary buttons side by side, or use destructive for non-destructive actions.</p>
                </div>
              </div>
            </div>
          </div>
        </Board>

        <Board title="Data table · anatomy" meta="Table / Accounts / Default density">
          <TableDrawing />
          <div className="mt-6">
            <SpecLabel className="mb-1">Legend</SpecLabel>
            <PartsList parts={TABLE_PARTS} cols={2} />
          </div>
        </Board>

        <Board title="Data table · usage guidelines" meta="Guidance shipped with every component">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {GUIDELINES.map(({ title, icon, tone, items }, i) => (
              <Reveal key={title} delay={i * 60} className="rounded-[14px] p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-[8px] grid place-items-center" style={{ background: TONE[tone][0], color: TONE[tone][1] }}><Icon name={icon} size={16} /></span>
                  <h4 className="text-[15px] font-semibold">{title}</h4>
                </div>
                <ul className="space-y-2.5">
                  {items.map(t => (
                    <li key={t} className="flex gap-2.5 text-[13px] leading-[1.55]" style={{ color: '#475569' }}>
                      <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: TONE[tone][1] }} />{t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Board>
      </div>
    </section>
  );
}
