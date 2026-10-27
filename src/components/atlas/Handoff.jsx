import React, { useState } from 'react';
import { Board, SectionHeader, SpecLabel, Icon, Reveal } from './ui';

const TOKEN_PARTS = [
  { seg: 'color', role: 'Category', c: '#7C3AED' },
  { seg: 'action', role: 'Concept', c: '#2563EB' },
  { seg: 'primary', role: 'Variant', c: '#0D9488' },
  { seg: 'hover', role: 'State', c: '#E11D48' },
];

const NAMING = [
  { where: 'Figma component', ex: 'Button / Primary / Medium / Default' },
  { where: 'Figma variable', ex: 'color/action/primary/hover' },
  { where: 'CSS custom property', ex: '--color-action-primary-hover' },
  { where: 'React component', ex: '<Button variant="primary" size="md" />' },
];

const PROPS = [
  ['variant', "'primary' | 'secondary' | 'tertiary' | 'danger'", "'primary'", 'Variant'],
  ['size', "'sm' | 'md' | 'lg'", "'md'", 'Size'],
  ['iconStart', 'ReactNode', '—', 'Icon start (instance swap)'],
  ['iconEnd', 'ReactNode', '—', 'Icon end (instance swap)'],
  ['loading', 'boolean', 'false', 'State = Loading'],
  ['disabled', 'boolean', 'false', 'State = Disabled'],
  ['fullWidth', 'boolean', 'false', 'Width = Fill'],
];

const STATES = [
  ['Default', '—', 'Fill action/primary', 'color/action/primary'],
  ['Hover', 'Pointer over', 'Fill one step darker', 'color/action/primary/hover'],
  ['Pressed', 'Pointer down / Enter', 'Two steps darker · 1px nudge', 'color/action/primary/pressed'],
  ['Focus', 'Keyboard focus only', '2px gap + 2px ring', 'color/focus/ring'],
  ['Loading', 'Async action', 'Spinner replaces icon · width locked', 'color/action/primary'],
  ['Disabled', 'Action unavailable', 'Subtle fill · muted label', 'color/background/subtle'],
];

const SIZES = [
  ['sm', '32', '12', '6', '14', '13 / 600'],
  ['md', '40', '16', '8', '16', '14 / 600'],
  ['lg', '48', '20', '8', '16', '15 / 600'],
];

const CODE = {
  'tokens.css': `/* 1 · Primitive tokens: raw values, never used directly */
:root {
  --violet-400: #A78BFA;
  --violet-600: #7C3AED;
  --violet-700: #6D28D9;
  --violet-800: #5B21B6;
  --neutral-50: #F8FAFC;
  --neutral-200: #E2E8F0;
  --neutral-500: #64748B;
  --neutral-900: #0F172A;
  --space-200: 8px;
  --space-400: 16px;
  --radius-md: 8px;
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
}

/* 2 · Semantic tokens: what components reference */
:root {
  --color-background-default: var(--neutral-50);
  --color-text-primary: var(--neutral-900);
  --color-text-secondary: var(--neutral-500);
  --color-border-default: var(--neutral-200);
  --color-action-primary: var(--violet-600);
  --color-action-primary-hover: var(--violet-700);
  --color-action-primary-pressed: var(--violet-800);
  --color-text-on-action: #FFFFFF;
  --color-focus-ring: var(--violet-600);
}

/* 3 · Dark theme: only the semantic layer changes */
[data-theme="dark"] {
  --color-background-default: var(--neutral-900);
  --color-text-primary: var(--neutral-50);
  --color-action-primary: var(--violet-400);
  --color-text-on-action: var(--neutral-900);
}`,
  'button.css': `/* Component tokens map semantic tokens to one component */
.button {
  --button-height: 40px;
  --button-padding-inline: var(--space-400);
  --button-gap: var(--space-200);
  --button-radius: var(--radius-md);

  display: inline-flex;
  align-items: center;
  gap: var(--button-gap);
  height: var(--button-height);
  padding-inline: var(--button-padding-inline);
  border-radius: var(--button-radius);
  font: 600 14px/20px var(--font-sans);
}

.button[data-variant="primary"] {
  background: var(--color-action-primary);
  color: var(--color-text-on-action);
}
.button[data-variant="primary"]:hover {
  background: var(--color-action-primary-hover);
}
.button:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
.button[data-size="sm"] { --button-height: 32px; --button-padding-inline: 12px; }
.button[data-size="lg"] { --button-height: 48px; --button-padding-inline: 20px; }`,
};

// Minimal CSS highlighter: comments, custom properties, values, functions, selectors
const RX = /(--[\w-]+)|(#[0-9A-Fa-f]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|ms)?\b)|\b(var|calc)(?=\()|("[^"]*")|(^\s*[.:[][^{]*(?=\{))/g;
const highlight = (line) => {
  if (line.trim().startsWith('/*')) return <span className="c">{line}</span>;
  const out = []; let last = 0; let m;
  RX.lastIndex = 0;
  while ((m = RX.exec(line)) !== null) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1] ? 'p' : m[2] ? 'v' : m[3] ? 'k' : 's';
    out.push(<span key={m.index} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
    if (m[0].length === 0) RX.lastIndex++;
  }
  out.push(line.slice(last));
  return out;
};

function CodeBlock() {
  const files = Object.keys(CODE);
  const [file, setFile] = useState(files[0]);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(CODE[file]).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }, () => {});
  };
  return (
    <Reveal className="at-code">
      <div className="flex items-center gap-1 px-3 pt-3" style={{ borderBottom: '1px solid #1E293B' }} role="tablist" aria-label="Code files">
        {files.map(f => (
          <button
            key={f} type="button" role="tab" aria-selected={file === f} onClick={() => setFile(f)}
            className="font-mono text-[12px] px-3 py-2 -mb-px transition-colors"
            style={{ color: file === f ? '#F8FAFC' : '#64748B', borderBottom: `2px solid ${file === f ? '#A78BFA' : 'transparent'}` }}
          >
            {f}
          </button>
        ))}
        <button type="button" onClick={copy} className="ml-auto mb-2 flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded-[6px] transition-colors hover:bg-white/5" style={{ color: copied ? '#5EEAD4' : '#94A3B8' }}>
          <Icon name={copied ? 'check' : 'copy'} size={14} />{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${file} code example`}>
        <code>
          {CODE[file].split('\n').map((l, i) => (
            <div key={i}><span className="ln">{i + 1}</span>{highlight(l)}</div>
          ))}
        </code>
      </pre>
    </Reveal>
  );
}

const SpecTable = ({ head, rows, mono = [] }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[520px] text-left text-[13px]">
      <thead>
        <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
          {head.map(h => <th key={h} scope="col" className="py-2.5 pr-4"><SpecLabel>{h}</SpecLabel></th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r[0]} style={{ borderBottom: '1px solid #F1F5F9' }}>
            {r.map((c, i) => (
              <td key={i} className={`py-2.5 pr-4 align-top ${i === 0 ? 'font-semibold' : ''} ${mono.includes(i) ? 'font-mono text-[12px]' : ''}`} style={{ color: i === 0 ? '#0F172A' : mono.includes(i) ? '#5B21B6' : '#475569' }}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Handoff() {
  return (
    <section id="handoff" className="mb-28 md:mb-36 scroll-mt-24">
      <SectionHeader num="09" label="Developer Handoff" title="Specifications that translate one‑to‑one">
        <p>
          Good handoff removes guesswork. Figma names, design variables and code share the same structure, so a property in a component panel maps directly to a prop or token in code.
        </p>
        <p className="text-[14px] text-[#6B7280]">These are documentation examples written for the concept. They show how ATLAS could be handed off, not code running in a production product.</p>
      </SectionHeader>

      <div className="space-y-6">
        <Board title="Naming conventions" meta="One structure from Figma to code">
          <Reveal className="flex flex-wrap items-end gap-y-4 mb-10">
            {TOKEN_PARTS.map(({ seg, role, c }, i) => (
              <React.Fragment key={seg}>
                <span className="flex flex-col items-center">
                  <code className="font-mono font-semibold px-3 py-2 rounded-[8px]" style={{ fontSize: 'clamp(15px, 2.4vw, 22px)', color: c, background: `${c}12`, border: `1px solid ${c}33` }}>{seg}</code>
                  <span className="text-[11px] font-mono uppercase tracking-[0.1em] mt-2" style={{ color: '#64748B' }}>{role}</span>
                </span>
                {i < TOKEN_PARTS.length - 1 && <span className="font-mono text-[22px] px-2 pb-7" style={{ color: '#CBD5E1' }} aria-hidden="true">/</span>}
              </React.Fragment>
            ))}
          </Reveal>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NAMING.map(({ where, ex }) => (
              <li key={where} className="rounded-[10px] px-4 py-3" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
                <SpecLabel>{where}</SpecLabel>
                <code className="block font-mono text-[13px] mt-1 break-all" style={{ color: '#0F172A' }}>{ex}</code>
              </li>
            ))}
          </ul>
        </Board>

        <Board title="Button · specification" meta="Handoff sheet · v1.0 (concept)">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-8">
            <div><SpecLabel className="mb-2">Properties</SpecLabel><SpecTable head={['Prop', 'Type', 'Default', 'Figma property']} rows={PROPS} mono={[1, 2]} /></div>
            <div><SpecLabel className="mb-2">States</SpecLabel><SpecTable head={['State', 'Trigger', 'Visual', 'Token']} rows={STATES} mono={[3]} /></div>
            <div className="xl:col-span-2"><SpecLabel className="mb-2">Spacing · px</SpecLabel><SpecTable head={['Size', 'Height', 'Padding', 'Gap', 'Icon', 'Type']} rows={SIZES} /></div>
          </div>
        </Board>

        <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr] gap-6 items-start">
          <CodeBlock />
          <div>
            <Board title="Behaviour & accessibility notes">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
                <div>
                  <SpecLabel className="mb-3">Responsive</SpecLabel>
                  <ul className="space-y-2 text-[13px] leading-[1.55]" style={{ color: '#475569' }}>
                    <li>Below 480px, buttons in forms and modal footers become full width and stack, with the primary action first.</li>
                    <li>Touch layouts use size lg, so targets are 48px tall.</li>
                    <li>Labels never truncate. Long labels wrap the button group, not the text.</li>
                  </ul>
                </div>
                <div>
                  <SpecLabel className="mb-3">Accessibility</SpecLabel>
                  <ul className="space-y-2 text-[13px] leading-[1.55]" style={{ color: '#475569' }}>
                    <li>Use a native &lt;button&gt;. Links that look like buttons stay &lt;a&gt;.</li>
                    <li>Icon-only buttons require aria-label. Loading sets aria-busy.</li>
                    <li>Focus ring shows only on :focus-visible and meets 3:1 against every surface.</li>
                  </ul>
                </div>
              </div>
            </Board>
          </div>
        </div>
      </div>
    </section>
  );
}
