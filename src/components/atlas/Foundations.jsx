import React from 'react';
import { Board, SectionHeader, SpecLabel, Reveal } from './ui';
import { TYPE_SCALE, SPACING, RADII, ELEVATION } from './tokens';

const GRIDS = [
  { name: 'Desktop', width: 1440, cols: 12, margin: 32, gutter: 24, ratio: '16 / 9', pad: '2.2%', gap: '1.7%', range: '≥ 1280px' },
  { name: 'Tablet',  width: 768,  cols: 8,  margin: 24, gutter: 16, ratio: '3 / 4',  pad: '3.1%', gap: '2.1%', range: '768 – 1279px' },
  { name: 'Mobile',  width: 375,  cols: 4,  margin: 16, gutter: 16, ratio: '9 / 19', pad: '4.3%', gap: '4.3%', range: '< 768px' },
];

const BREAKPOINTS = [['sm', 640], ['md', 768], ['lg', 1024], ['xl', 1280], ['2xl', 1440]];

export default function Foundations() {
  return (
    <section id="foundations" className="mb-28 md:mb-36 scroll-mt-24">
      <SectionHeader num="04" label="Typography & Layout" title="Foundations that make density readable">
        <p>
          Data-heavy screens rely on rhythm more than decoration. ATLAS pairs a ten-step type scale with a 4px spacing system, a small set of radii, responsive column grids and five elevation levels, all documented as tokens.
        </p>
      </SectionHeader>

      <div className="space-y-6">
        {/* Typography */}
        <Board title="Type scale" meta="Plus Jakarta Sans · 10 styles · size / line-height">
          <Reveal className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-center pb-8 mb-2" style={{ borderBottom: '1px solid #E2E8F0' }}>
            <p className="font-bold leading-none tracking-[-0.04em]" style={{ fontSize: 'clamp(88px, 14vw, 148px)', color: '#7C3AED' }} aria-hidden="true">Aa</p>
            <div className="space-y-4">
              <div>
                <SpecLabel>Typeface</SpecLabel>
                <p className="text-[22px] font-semibold tracking-[-0.01em]">Plus Jakarta Sans</p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                <span className="font-normal">Regular 400</span>
                <span className="font-medium">Medium 500</span>
                <span className="font-semibold">Semibold 600</span>
                <span className="font-bold">Bold 700</span>
              </div>
              <p className="text-[18px] tabular-nums tracking-[0.02em]" style={{ color: '#475569' }}>0 1 2 3 4 5 6 7 8 9 · DKK 248.6k · 112% · −0.3 pt</p>
              <p className="text-[13px] leading-[1.6]" style={{ color: '#64748B' }}>
                Tabular figures are switched on in tables, KPI tiles and chart labels, so numbers line up in columns.
              </p>
            </div>
          </Reveal>

          <ul>
            {TYPE_SCALE.map(({ token, size, lh, weight, track, sample, upper, css }, i) => (
              <Reveal as="li" key={token} delay={i * 25}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-8 py-4 items-baseline"
                style={{ borderBottom: i < TYPE_SCALE.length - 1 ? '1px solid #F1F5F9' : 'none' }}
              >
                <div className="flex md:block items-baseline gap-3">
                  <code className="font-mono text-[12px] font-semibold" style={{ color: '#5B21B6' }}>{token}</code>
                  <p className="font-mono text-[11px] md:mt-1" style={{ color: '#64748B' }}>{size}/{lh} · {weight}{track !== '0' ? ` · ${track}` : ''}</p>
                </div>
                <p
                  className="min-w-0 break-words"
                  style={{
                    fontSize: css || size, lineHeight: `${lh}px`, fontWeight: weight, letterSpacing: track,
                    textTransform: upper ? 'uppercase' : 'none', color: token === 'caption' || token === 'label' ? '#64748B' : '#0F172A',
                    ...(css ? { lineHeight: 1.15 } : {}),
                  }}
                >
                  {sample}
                </p>
              </Reveal>
            ))}
          </ul>
        </Board>

        {/* Spacing + radius */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Board title="Spacing scale" meta="4px base unit · 11 steps">
            <ul className="space-y-2.5">
              {SPACING.map(({ token, px }, i) => (
                <Reveal as="li" key={token} delay={i * 25} className="grid grid-cols-[96px_40px_1fr] items-center gap-3">
                  <code className="font-mono text-[12px]" style={{ color: '#5B21B6' }}>{token}</code>
                  <span className="font-mono text-[12px] text-right tabular-nums" style={{ color: '#64748B' }}>{px}px</span>
                  <span className="h-4 rounded-[3px]" style={{ width: `${(px / 64) * 100}%`, minWidth: 2, background: 'linear-gradient(90deg,#C4B5FD,#A78BFA)' }} />
                </Reveal>
              ))}
            </ul>
            <p className="text-[13px] leading-[1.6] mt-6" style={{ color: '#64748B' }}>
              Component padding uses 8–24px; layout gaps use 24–64px. Odd values are not allowed. Every spacing decision maps to a token.
            </p>
          </Board>

          <Board title="Corner radius" meta="6 tokens · nested radius = outer − padding">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {RADII.map(({ token, px, use }, i) => (
                <Reveal as="li" key={token} delay={i * 40}>
                  <div
                    className="h-[84px] mb-2 flex items-end justify-start"
                    style={{ background: '#F5F3FF', border: '1.5px solid #A78BFA', borderRadius: Math.min(px, 42), padding: px === 999 ? '0 0 26px 26px' : 8 }}
                  >
                    <span className="font-mono text-[11px] font-semibold" style={{ color: '#6D28D9' }}>{px === 999 ? 'full' : `${px}px`}</span>
                  </div>
                  <code className="block font-mono text-[12px] font-semibold" style={{ color: '#5B21B6' }}>{token}</code>
                  <span className="text-[12px]" style={{ color: '#64748B' }}>{use}</span>
                </Reveal>
              ))}
            </ul>
          </Board>
        </div>

        {/* Layout grid */}
        <Board title="Responsive layout grid" meta="12 / 8 / 4 columns · fluid columns, fixed gutters">
          <div className="grid grid-cols-1 md:grid-cols-[2.6fr_1.3fr_0.75fr] gap-6 md:gap-8 items-end">
            {GRIDS.map(({ name, width, cols, margin, gutter, ratio, pad, gap, range }, i) => (
              <Reveal key={name} delay={i * 80}>
                <div
                  className="w-full mx-auto md:mx-0 rounded-[10px] overflow-hidden"
                  style={{ aspectRatio: ratio, maxHeight: name === 'Mobile' ? 360 : undefined, maxWidth: name === 'Mobile' ? 180 : undefined, background: '#fff', border: '1px solid #CBD5E1', padding: `0 ${pad}` }}
                >
                  <div className="h-full grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, columnGap: gap }}>
                    {Array.from({ length: cols }, (_, k) => (
                      <span key={k} style={{ background: 'rgba(244,63,94,.10)', borderLeft: '1px solid rgba(244,63,94,.25)', borderRight: '1px solid rgba(244,63,94,.25)' }} />
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-[14px] font-bold">{name} <span className="font-normal" style={{ color: '#64748B' }}>· {width}</span></p>
                  <p className="font-mono text-[11px] mt-1 leading-[1.6]" style={{ color: '#64748B' }}>
                    {cols} cols · margin {margin} · gutter {gutter}<br />{range}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 pt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ borderTop: '1px solid #E2E8F0' }}>
            <SpecLabel>Breakpoints</SpecLabel>
            {BREAKPOINTS.map(([k, v]) => (
              <span key={k} className="text-[13px]"><code className="font-mono font-semibold" style={{ color: '#5B21B6' }}>{k}</code> <span style={{ color: '#64748B' }}>{v}px</span></span>
            ))}
          </div>
        </Board>

        {/* Elevation */}
        <Board title="Elevation & shadows" meta="5 levels · navy-tinted shadows, never pure black">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-7 rounded-[14px] p-6 sm:p-10 lg:p-12" style={{ background: '#F1F5F9' }}>
            {ELEVATION.map(({ token, shadow, use, value }, i) => (
              <Reveal as="li" key={token} delay={i * 60}
                className="rounded-[12px] p-5 min-h-[156px] flex flex-col"
                style={{ background: '#fff', boxShadow: shadow, border: i === 0 ? '1px solid #E2E8F0' : '1px solid transparent' }}
              >
                <code className="font-mono text-[12px] font-semibold" style={{ color: '#5B21B6' }}>{token}</code>
                <p className="text-[13px] font-medium mt-1">{use}</p>
                <p className="font-mono text-[11px] mt-auto pt-3" style={{ color: '#64748B' }}>{value}</p>
              </Reveal>
            ))}
          </ul>
        </Board>
      </div>
    </section>
  );
}
