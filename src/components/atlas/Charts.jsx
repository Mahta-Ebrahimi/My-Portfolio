import React, { useState, useRef, useEffect } from 'react';

let uid = 0;   // React 17 has no useId — stable per-instance id for SVG gradients

// Chart coordinate width follows the rendered width, so 11px labels stay 11px on phones
function useWidth(fallback, min = 280) {
  const ref = useRef(null);
  const [w, setW] = useState(fallback);
  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([e]) => { if (e.contentRect.width) setW(Math.round(e.contentRect.width)); });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, Math.max(min, w)];
}

const INK = { primary: '#0F172A', secondary: '#64748B', grid: '#E2E8F0', surface: '#FFFFFF' };

const niceMax = (max, ticks = 4) => {
  const raw = max / ticks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw);
  return { top: step * ticks, step };
};

// ── Legend (always present for ≥2 series; text in ink, colour in the key) ─────
export const Legend = ({ items, className = '' }) => (
  <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`} aria-label="Legend">
    {items.map(({ name, color, dashed }) => (
      <li key={name} className="flex items-center gap-2 text-[13px]" style={{ color: INK.secondary }}>
        {dashed
          ? <svg width="16" height="4" aria-hidden="true"><path d="M0 2h16" stroke={color} strokeWidth="2" strokeDasharray="4 3" /></svg>
          : <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: color, display: 'inline-block' }} />}
        {name}
      </li>
    ))}
  </ul>
);

const Tooltip = ({ x, y, title, rows, align = 'center' }) => (
  <div
    role="status"
    className="pointer-events-none absolute z-10"
    style={{
      left: `${x}%`, top: y, transform: align === 'right' ? 'translate(-100%, -100%)' : align === 'left' ? 'translate(0, -100%)' : 'translate(-50%, -100%)',
      marginTop: -10, background: '#0F172A', color: '#F8FAFC', borderRadius: 10, padding: '8px 10px',
      boxShadow: '0 12px 24px -6px rgba(15,23,42,.35)', minWidth: 132,
    }}
  >
    <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4, fontWeight: 600, letterSpacing: '.04em' }}>{title}</p>
    {rows.map(r => (
      <p key={r.name} className="flex items-center gap-2" style={{ fontSize: 12, lineHeight: '18px' }}>
        <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, background: r.color }} />
        <span style={{ color: '#CBD5E1' }}>{r.name}</span>
        <span style={{ marginLeft: 'auto', fontWeight: 600, fontVariantNumeric: 'tabular-nums', paddingLeft: 10 }}>{r.value}</span>
      </p>
    ))}
  </div>
);

const SrTable = ({ caption, labels, series, fmt }) => (
  <table className="at-sr">
    <caption>{caption}</caption>
    <thead><tr><th>Period</th>{series.map(s => <th key={s.name}>{s.name}</th>)}</tr></thead>
    <tbody>
      {labels.map((l, i) => (
        <tr key={l}><th>{l}</th>{series.map(s => <td key={s.name}>{fmt(s.values[i])}</td>)}</tr>
      ))}
    </tbody>
  </table>
);

// ── Line chart with crosshair tooltip (mouse + arrow keys) ────────────────────
export function LineChart({ data, height = 260, width = 640, tickEvery = 1, fmt = v => `DKK ${v}k`, caption = 'Line chart', interactive = true }) {
  const [wrap, W] = useWidth(width);
  const H = height, P = { l: 62, r: 82, t: 14, b: 30 };
  const [idx, setIdx] = useState(null);
  const gidRef = useRef(null);
  if (gidRef.current === null) gidRef.current = `atl${++uid}`;
  const gid = gidRef.current;
  const all = data.series.flatMap(s => s.values);
  const { top, step } = niceMax(Math.max(...all) * 1.05);
  const n = data.labels.length;
  const x = i => P.l + (i * (W - P.l - P.r)) / (n - 1);
  const y = v => P.t + (1 - v / top) * (H - P.t - P.b);
  const path = vals => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const main = data.series[0];
  const area = `${path(main.values)}L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z`;
  const every = Math.max(tickEvery, Math.ceil(34 / ((W - P.l - P.r) / (n - 1))));

  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (n - 1));
    setIdx(Math.max(0, Math.min(n - 1, i)));
  };
  const onKey = e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); setIdx(i => (i === null ? 0 : Math.min(n - 1, i + 1))); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); setIdx(i => (i === null ? n - 1 : Math.max(0, i - 1))); }
    if (e.key === 'Escape') setIdx(null);
  };

  return (
    <div className="relative" ref={wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${caption}. Use left and right arrow keys to inspect values.`}
        {...(interactive ? { tabIndex: 0, onMouseMove: onMove, onMouseLeave: () => setIdx(null), onKeyDown: onKey, onBlur: () => setIdx(null) } : {})}
        style={{ display: 'block', cursor: interactive ? 'crosshair' : 'default', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`g${gid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={main.color} stopOpacity=".14" />
            <stop offset="1" stopColor={main.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: top / step + 1 }, (_, k) => k * step).map(v => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke={INK.grid} />
            <text x={P.l - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill={INK.secondary}>{fmt(v)}</text>
          </g>
        ))}
        {data.labels.map((l, i) => (i % every === 0 || idx === i) && (
          <text key={l} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={idx === i ? INK.primary : INK.secondary} fontWeight={idx === i ? 600 : 400}>{l}</text>
        ))}
        <path d={area} fill={`url(#g${gid})`} />
        {[...data.series].reverse().map(s => (
          <path key={s.name} d={path(s.values)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? '5 4' : undefined} />
        ))}
        {/* Selective direct labels at the line ends */}
        {data.series.map(s => (
          <text key={s.name} x={x(n - 1) + 10} y={y(s.values[n - 1]) + 4} fontSize="12" fontWeight="600" fill={s.dashed ? INK.secondary : INK.primary}>
            {fmt(s.values[n - 1])}
          </text>
        ))}
        {idx !== null && (
          <g>
            <line x1={x(idx)} x2={x(idx)} y1={P.t} y2={H - P.b} stroke="#94A3B8" strokeDasharray="3 3" />
            {data.series.map(s => (
              <circle key={s.name} cx={x(idx)} cy={y(s.values[idx])} r="4.5" fill={s.color} stroke={INK.surface} strokeWidth="2" />
            ))}
          </g>
        )}
      </svg>
      {idx !== null && (
        <Tooltip
          x={(x(idx) / W) * 100} y={0}
          align={idx > n - 3 ? 'right' : idx < 2 ? 'left' : 'center'}
          title={data.labels[idx]}
          rows={data.series.map(s => ({ name: s.name, color: s.color, value: fmt(s.values[idx]) }))}
        />
      )}
      <SrTable caption={caption} labels={data.labels} series={data.series} fmt={fmt} />
    </div>
  );
}

// ── Grouped bar chart: 4px rounded data-ends, 2px surface gap, per-bar hover ──
const barPath = (x, y, w, h, r = 4) => {
  const rr = Math.min(r, w / 2, h);
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
};

export function BarChart({ data, height = 260, fmt = v => v, caption = 'Bar chart' }) {
  const [wrap, W] = useWidth(640);
  const H = height, P = { l: 40, r: 12, t: 22, b: 30 };
  const [hover, setHover] = useState(null);
  const all = data.series.flatMap(s => s.values);
  const { top, step } = niceMax(Math.max(...all) * 1.08);
  const groups = data.labels.length, per = data.series.length;
  const band = (W - P.l - P.r) / groups;
  const barW = Math.min(28, (band * 0.62 - (per - 1) * 2) / per);
  const groupW = barW * per + (per - 1) * 2;
  const y = v => P.t + (1 - v / top) * (H - P.t - P.b);
  const last = groups - 1;

  return (
    <div className="relative" ref={wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={caption} style={{ display: 'block', overflow: 'visible' }}>
        {Array.from({ length: top / step + 1 }, (_, k) => k * step).map(v => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke={INK.grid} />
            <text x={P.l - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill={INK.secondary}>{fmt(v)}</text>
          </g>
        ))}
        {data.labels.map((l, g) => {
          const gx = P.l + g * band + (band - groupW) / 2;
          return (
            <g key={l}>
              {data.series.map((s, si) => {
                const v = s.values[g];
                const bx = gx + si * (barW + 2);
                const on = hover && hover.g === g && hover.s === si;
                const dim = hover && !on;
                return (
                  <g key={s.name}>
                    <path d={barPath(bx, y(v), barW, y(0) - y(v))} fill={s.color} opacity={dim ? 0.35 : 1} style={{ transition: 'opacity .15s ease' }} />
                    {/* Hit target larger than the mark */}
                    <rect
                      x={bx - 1} y={P.t} width={barW + 2} height={H - P.t - P.b} fill="transparent"
                      onMouseEnter={() => setHover({ g, s: si })} onMouseLeave={() => setHover(null)}
                    />
                    {g === last && (
                      <text x={bx + barW / 2} y={y(v) - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK.primary}>{fmt(v)}</text>
                    )}
                  </g>
                );
              })}
              <text x={P.l + g * band + band / 2} y={H - 8} textAnchor="middle" fontSize="11" fill={INK.secondary}>{l}</text>
            </g>
          );
        })}
      </svg>
      {hover && (() => {
        const s = data.series[hover.s];
        const gx = P.l + hover.g * band + (band - groupW) / 2 + hover.s * (barW + 2) + barW / 2;
        return (
          <Tooltip
            x={(gx / W) * 100} y={(y(s.values[hover.g]) / H) * 100 + '%'}
            title={data.labels[hover.g]} rows={[{ name: s.name, color: s.color, value: fmt(s.values[hover.g]) }]}
          />
        );
      })()}
      <SrTable caption={caption} labels={data.labels} series={data.series} fmt={fmt} />
    </div>
  );
}

// ── Donut chart with 2px surface gaps and hover focus ─────────────────────────
export function DonutChart({ data, size = 200, thickness = 26, fmt = v => `DKK ${v}k`, centerLabel = 'Total', caption = 'Donut chart' }) {
  const [hover, setHover] = useState(null);
  const total = data.reduce((a, d) => a + d.value, 0);
  const r = (size - thickness) / 2 - 4;
  const circ = 2 * Math.PI * r;
  const gap = 2.5;
  let acc = 0;
  const active = hover !== null ? data[hover] : null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label={caption} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={thickness} />
          {data.map((d, i) => {
            const len = (d.value / total) * circ;
            const seg = (
              <circle
                key={d.name} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color}
                strokeWidth={hover === i ? thickness + 6 : thickness}
                strokeDasharray={`${Math.max(0, len - gap)} ${circ}`} strokeDashoffset={-acc}
                opacity={hover !== null && hover !== i ? 0.35 : 1}
                style={{ transition: 'stroke-width .2s ease, opacity .2s ease', cursor: 'pointer' }}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              />
            );
            acc += len;
            return seg;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span style={{ fontSize: 12, color: INK.secondary, fontWeight: 500 }}>{active ? active.name : centerLabel}</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: INK.primary, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
            {fmt(active ? active.value : Math.round(total * 10) / 10)}
          </span>
          <span style={{ fontSize: 12, color: INK.secondary }}>{active ? `${Math.round((active.value / total) * 100)}% of MRR` : 'MRR by plan'}</span>
        </div>
      </div>
      <ul className="w-full space-y-3" aria-label="Plan distribution">
        {data.map((d, i) => (
          <li
            key={d.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            className="flex items-center gap-3 text-[14px] pb-3"
            style={{ borderBottom: i < data.length - 1 ? '1px solid #F1F5F9' : 'none' }}
          >
            <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
            <span style={{ color: INK.primary, fontWeight: 500 }}>{d.name}</span>
            <span className="ml-auto tabular-nums" style={{ color: INK.secondary }}>{Math.round((d.value / total) * 100)}%</span>
            <span className="tabular-nums w-[92px] text-right" style={{ color: INK.primary, fontWeight: 600 }}>{fmt(d.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Sparkline for KPI tiles (single series → no legend) ───────────────────────
// Shrinks to the space left beside the KPI value (up to `width`), so it never spills out of the card
export function Sparkline({ values, color = '#7C3AED', width = 96, height = 32 }) {
  const [wrap, w] = useWidth(width, 32);
  const min = Math.min(...values), max = Math.max(...values);
  const x = i => (i * (w - 8)) / (values.length - 1) + 4;
  const y = v => height - 4 - ((v - min) / (max - min || 1)) * (height - 8);
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  return (
    <div ref={wrap} style={{ flex: '1 1 0', minWidth: 32, maxWidth: width }}>
      <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} aria-hidden="true" style={{ display: 'block', marginLeft: 'auto' }}>
        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={x(values.length - 1)} cy={y(values[values.length - 1])} r="3" fill={color} stroke="#fff" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
