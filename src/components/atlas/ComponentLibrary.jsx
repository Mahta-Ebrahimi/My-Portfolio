import React, { useRef, useState } from 'react';
import { Board, SectionHeader, SpecLabel, Icon, Reveal } from './ui';
import { REGIONS } from './data';

const VARIANTS = [
  { key: 'primary', label: 'Primary', icon: 'plus', text: 'Create report' },
  { key: 'secondary', label: 'Secondary', icon: 'download', text: 'Export' },
  { key: 'tertiary', label: 'Tertiary', icon: 'filter', text: 'Filters' },
  { key: 'danger', label: 'Destructive', icon: 'trash', text: 'Delete' },
];
const STATES = [
  { key: '', label: 'Default' },
  { key: 'is-hover', label: 'Hover' },
  { key: 'is-press', label: 'Pressed' },
  { key: 'is-focus', label: 'Focus' },
  { key: 'is-disabled', label: 'Disabled' },
];

// ── Tabs with roving focus (Arrow keys, Home, End) ────────────────────────────
function Tabs() {
  const tabs = [['Overview', null], ['Accounts', 128], ['Invoices', 12], ['Activity', null]];
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const onKey = (e, i) => {
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = tabs.length - 1;
    if (n !== null) { e.preventDefault(); setActive(n); refs.current[n].focus(); }
  };
  return (
    <div>
      <div className="at-tabs" role="tablist" aria-label="Account sections">
        {tabs.map(([t, count], i) => (
          <button
            key={t} ref={el => { refs.current[i] = el; }} type="button" role="tab" id={`at-tab-${i}`}
            aria-selected={active === i} aria-controls={`at-panel-${i}`} tabIndex={active === i ? 0 : -1}
            className="at-tab" onClick={() => setActive(i)} onKeyDown={e => onKey(e, i)}
          >
            {t}{count !== null && <span className="at-count">{count}</span>}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`at-panel-${active}`} aria-labelledby={`at-tab-${active}`} className="pt-3 text-[13px]" style={{ color: '#64748B' }}>
        Showing the <b style={{ color: '#0F172A' }}>{tabs[active][0]}</b> panel. Use ← → to move between tabs.
      </div>
    </div>
  );
}

function Segmented({ options, initial = 0, label }) {
  const [v, setV] = useState(initial);
  return (
    <div className="at-seg" role="group" aria-label={label}>
      {options.map((o, i) => (
        <button key={o} type="button" aria-pressed={v === i} onClick={() => setV(i)}>{o}</button>
      ))}
    </div>
  );
}

function Switch({ label, desc, initial = false, disabled = false }) {
  const [on, setOn] = useState(initial);
  return (
    <div className={`flex items-start justify-between gap-4 ${disabled ? 'opacity-70' : ''}`}>
      <div>
        <p className="text-[14px] font-medium" id={`sw-${label}`}>{label}</p>
        <p className="text-[12px]" style={{ color: '#64748B' }}>{desc}</p>
      </div>
      <button type="button" role="switch" aria-checked={on} aria-labelledby={`sw-${label}`} className="at-switch mt-0.5" disabled={disabled} onClick={() => setOn(!on)} />
    </div>
  );
}

function IntegrationToggle() {
  const [on, setOn] = useState(true);
  return <button type="button" role="switch" aria-checked={on} aria-label="Billing integration" className="at-switch" onClick={() => setOn(!on)} />;
}

const SubTitle =({ children }) => <SpecLabel className="mb-4">{children}</SpecLabel>;

export default function ComponentLibrary() {
  const [toast, setToast] = useState(true);

  return (
    <section id="components" className="mb-28 md:mb-36 scroll-mt-24">
      <SectionHeader num="05" label="Component Library" title="Components built from tokens, documented by state">
        <p>
          Every component is assembled from semantic tokens and documented with its variants, sizes and interaction states. In Figma they are built as component sets with variant properties. Here they are recreated in HTML and CSS so they can be explored directly.
        </p>
      </SectionHeader>

      <div className="space-y-6">
        {/* ── Buttons ─────────────────────────────────────────────── */}
        <Board title="Buttons" meta="Button · 4 variants × 5 states × 3 sizes">
          <SubTitle>Variants × interaction states</SubTitle>
          <div className="overflow-x-auto -mx-2 px-2 pb-2">
            <table className="w-full min-w-[680px] border-separate" style={{ borderSpacing: '0 10px' }}>
              <thead>
                <tr>
                  <th className="w-[110px]" />
                  {STATES.map(s => <th key={s.label} className="text-left pb-1"><SpecLabel>{s.label}</SpecLabel></th>)}
                </tr>
              </thead>
              <tbody>
                {VARIANTS.map(v => (
                  <tr key={v.key}>
                    <th scope="row" className="text-left text-[13px] font-semibold pr-4">{v.label}</th>
                    {STATES.map(s => (
                      <td key={s.label} className="pr-3">
                        <span className={`at-btn at-btn--${v.key} at-btn--sm ${s.key}`} aria-hidden="true">
                          <Icon name={v.icon} />{v.text}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 pt-8" style={{ borderTop: '1px solid #E2E8F0' }}>
            <div>
              <SubTitle>Sizes · 32 / 40 / 48</SubTitle>
              <div className="flex flex-wrap items-end gap-3">
                <button type="button" className="at-btn at-btn--primary at-btn--sm">Small</button>
                <button type="button" className="at-btn at-btn--primary">Medium</button>
                <button type="button" className="at-btn at-btn--primary at-btn--lg">Large</button>
                <button type="button" className="at-btn at-btn--secondary at-btn--icon" aria-label="Notifications"><Icon name="bell" /></button>
                <button type="button" className="at-btn at-btn--secondary at-btn--icon at-btn--sm" aria-label="More options"><Icon name="more" /></button>
              </div>
            </div>
            <div>
              <SubTitle>Live · hover, press and tab through</SubTitle>
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="at-btn at-btn--primary"><Icon name="plus" />New dashboard</button>
                <button type="button" className="at-btn at-btn--secondary">Share<Icon name="chevDown" /></button>
                <button type="button" className="at-btn at-btn--tertiary">Cancel</button>
                <button type="button" className="at-btn at-btn--primary" disabled>Saving…</button>
              </div>
            </div>
          </div>
        </Board>

        {/* ── Form controls ───────────────────────────────────────── */}
        <Board title="Inputs, search & select" meta="Input · Search · Select · Menu">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <SubTitle>Text input states</SubTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
                <label className="at-field">
                  <span className="at-label">Workspace name</span>
                  <input className="at-input" placeholder="e.g. Finance team" />
                  <span className="at-help">Default · visible to all members</span>
                </label>
                <label className="at-field">
                  <span className="at-label">Billing email</span>
                  <input className="at-input is-focus" defaultValue="billing@halden.studio" />
                  <span className="at-help">Focused · 3px violet ring</span>
                </label>
                <label className="at-field">
                  <span className="at-label">Account ID</span>
                  <input className="at-input" defaultValue="ACC-20931" disabled />
                  <span className="at-help">Disabled · read-only system value</span>
                </label>
                <label className="at-field">
                  <span className="at-label">Seat limit</span>
                  <input className="at-input is-error" defaultValue="-12" aria-invalid="true" aria-describedby="at-seat-err" />
                  <span className="at-help at-help--error" id="at-seat-err"><Icon name="error" size={14} />Enter a number between 1 and 5,000</span>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <SubTitle>Search field</SubTitle>
                <label className="at-input-wrap">
                  <span className="at-sr">Search</span>
                  <Icon name="search" />
                  <input className="at-input" placeholder="Search reports, accounts, people…" style={{ paddingRight: 52 }} />
                  <kbd className="at-kbd">⌘K</kbd>
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <SubTitle>Select · closed</SubTitle>
                  <label className="at-field">
                    <span className="at-label">Region</span>
                    <select className="at-select" defaultValue="Europe">
                      {REGIONS.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </label>
                </div>
                <div>
                  <SubTitle>Dropdown · open</SubTitle>
                  <div className="at-field">
                    <span className="at-label">Date range</span>
                    <span className="at-input flex items-center gap-2" style={{ borderColor: '#7C3AED', boxShadow: '0 0 0 3px rgba(124,58,237,.18)' }}>
                      <Icon name="calendar" size={16} style={{ color: '#64748B' }} />Last 90 days
                      <Icon name="chevUp" size={16} style={{ marginLeft: 'auto', color: '#64748B' }} />
                    </span>
                    <div className="at-menu mt-1" aria-hidden="true">
                      <div className="at-menu-item">Last 7 days</div>
                      <div className="at-menu-item is-hover">Last 30 days</div>
                      <div className="at-menu-item is-active">Last 90 days<Icon name="check" /></div>
                      <div className="at-menu-sep" />
                      <div className="at-menu-item">Custom range…</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Board>

        {/* ── Selection controls ──────────────────────────────────── */}
        <Board title="Selection controls" meta="Checkbox · Radio · Switch">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <fieldset>
              <legend className="mb-4"><SpecLabel>Checkbox</SpecLabel></legend>
              <div className="space-y-4">
                <label className="at-choice"><input type="checkbox" className="at-check mt-0.5" />Unchecked</label>
                <label className="at-choice"><input type="checkbox" className="at-check mt-0.5" defaultChecked />
                  <span>Checked<small>Include archived accounts</small></span>
                </label>
                <label className="at-choice"><input type="checkbox" className="at-check mt-0.5" ref={el => { if (el) el.indeterminate = true; }} />Indeterminate</label>
                <label className="at-choice is-disabled"><input type="checkbox" className="at-check mt-0.5" disabled defaultChecked />Disabled</label>
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-4"><SpecLabel>Radio group</SpecLabel></legend>
              <div className="space-y-4">
                {[['Monthly', 'Billed every month'], ['Annual', 'Two months free'], ['Custom', 'Contact sales']].map(([l, d], i) => (
                  <label key={l} className="at-choice">
                    <input type="radio" name="at-billing" className="at-radio mt-0.5" defaultChecked={i === 1} />
                    <span>{l}<small>{d}</small></span>
                  </label>
                ))}
                <label className="at-choice is-disabled"><input type="radio" className="at-radio mt-0.5" disabled />Disabled</label>
              </div>
            </fieldset>
            <div>
              <SpecLabel className="mb-4">Switch</SpecLabel>
              <div className="space-y-5">
                <Switch label="Weekly digest" desc="Summary every Monday" initial />
                <Switch label="Anomaly alerts" desc="Notify on unusual changes" />
                <Switch label="SSO enforcement" desc="Managed by your admin" initial disabled />
              </div>
            </div>
          </div>
        </Board>

        {/* ── Navigation ─────────────────────────────────────────── */}
        <Board title="Navigation" meta="Tabs · Segmented · Breadcrumb · Sidebar · Pagination">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
            <div className="space-y-8 min-w-0">
              <div><SubTitle>Tabs · keyboard accessible</SubTitle><Tabs /></div>
              <div className="flex flex-wrap gap-8">
                <div><SubTitle>Segmented control</SubTitle><Segmented options={['7D', '30D', '90D', '12M']} initial={2} label="Time range" /></div>
                <div><SubTitle>Pagination</SubTitle>
                  <nav className="at-pager" aria-label="Pagination example">
                    <button type="button" disabled aria-label="Previous page"><Icon name="chevLeft" /></button>
                    <button type="button" aria-current="page">1</button><button type="button">2</button><button type="button">3</button>
                    <span className="px-1 text-[13px]" style={{ color: '#94A3B8' }}>…</span><button type="button">12</button>
                    <button type="button" aria-label="Next page"><Icon name="chevRight" /></button>
                  </nav>
                </div>
              </div>
              <div>
                <SubTitle>Breadcrumb</SubTitle>
                <nav aria-label="Breadcrumb example">
                  <ol className="at-crumbs">
                    <li><a href="#components" className="hover:underline">Workspace</a></li>
                    <li aria-hidden="true"><Icon name="chevRight" size={14} /></li>
                    <li><a href="#components" className="hover:underline">Reports</a></li>
                    <li aria-hidden="true"><Icon name="chevRight" size={14} /></li>
                    <li aria-current="page">Q2 revenue review</li>
                  </ol>
                </nav>
              </div>
            </div>
            <div>
              <SubTitle>Sidebar items · default, hover, active</SubTitle>
              <div className="at-card p-2 max-w-[280px]">
                <span className="at-nav-item is-active"><Icon name="overview" />Overview</span>
                <span className="at-nav-item is-hover"><Icon name="chart" />Reports</span>
                <span className="at-nav-item"><Icon name="users" />Accounts<span className="at-count">128</span></span>
                <span className="at-nav-item"><Icon name="billing" />Billing</span>
                <div className="at-menu-sep my-2" />
                <span className="at-nav-item"><Icon name="settings" />Settings</span>
              </div>
            </div>
          </div>
        </Board>

        {/* ── Feedback ───────────────────────────────────────────── */}
        <Board title="Badges, alerts & toasts" meta="Badge · Alert · Toast">
          <SubTitle>Badges · colour plus text, dot for status</SubTitle>
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="at-badge at-badge--neutral">Draft</span>
            <span className="at-badge at-badge--violet">Enterprise</span>
            <span className="at-badge at-badge--info"><i />Trial</span>
            <span className="at-badge at-badge--success"><i />Active</span>
            <span className="at-badge at-badge--warning"><i />Past due</span>
            <span className="at-badge at-badge--error"><i />Churned</span>
            <span className="at-badge at-badge--solid">New</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
            <div>
              <SubTitle>Inline alerts</SubTitle>
              <div className="space-y-3">
                <div className="at-alert at-alert--info" role="note"><Icon name="info" /><div><strong>Data refreshes every 15 minutes</strong><p>Figures may differ slightly from your billing provider.</p></div></div>
                <div className="at-alert at-alert--success" role="note"><Icon name="success" /><div><strong>Report scheduled</strong><p>Q2 revenue review will be sent every Monday at 09:00.</p></div></div>
                <div className="at-alert at-alert--warning" role="note"><Icon name="warning" /><div><strong>3 invoices are past due</strong><p>Review billing before the renewal date.</p></div></div>
                <div className="at-alert at-alert--error" role="note"><Icon name="error" /><div><strong>Sync failed</strong><p>We couldn't connect to the data source. Check the integration settings.</p></div></div>
              </div>
            </div>
            <div>
              <SubTitle>Toast notifications</SubTitle>
              <div className="space-y-3 rounded-[14px] p-4 sm:p-5" style={{ background: '#E2E8F0' }}>
                {toast ? (
                  <div className="at-toast" role="status">
                    <Icon name="success" style={{ color: '#5EEAD4' }} />
                    <span>Dashboard saved</span>
                    <button type="button" onClick={() => setToast(false)}>Undo</button>
                  </div>
                ) : (
                  <div className="at-toast" role="status">
                    <Icon name="info" style={{ color: '#93C5FD' }} />
                    <span>Changes reverted</span>
                    <button type="button" onClick={() => setToast(true)}>Redo</button>
                  </div>
                )}
                <div className="at-toast">
                  <Icon name="warning" style={{ color: '#FCD34D' }} />
                  <span>Export is taking longer than usual</span>
                </div>
                <div className="at-toast">
                  <Icon name="error" style={{ color: '#FDA4AF' }} />
                  <span>Couldn't delete 2 reports</span>
                  <button type="button">Retry</button>
                </div>
              </div>
              <p className="text-[12px] mt-3" style={{ color: '#64748B' }}>Toasts sit bottom-right, use elevation/4 and auto-dismiss after 5s unless they contain an action.</p>
            </div>
          </div>
        </Board>

        {/* ── Cards & modal ──────────────────────────────────────── */}
        <Board title="Cards & modal" meta="Card · Modal · Avatar group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <SubTitle>Cards</SubTitle>
              <Reveal className="at-card at-lift p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-[10px] grid place-items-center" style={{ background: '#F5F3FF', color: '#7C3AED' }}><Icon name="chart" size={20} /></span>
                    <div>
                      <p className="text-[15px] font-semibold">Q2 revenue review</p>
                      <p className="text-[12px]" style={{ color: '#64748B' }}>Report · edited 2 hours ago</p>
                    </div>
                  </div>
                  <button type="button" className="at-btn at-btn--tertiary at-btn--icon at-btn--sm" aria-label="Report options" style={{ color: '#64748B' }}><Icon name="more" /></button>
                </div>
                <p className="text-[14px] leading-[1.6] mt-4" style={{ color: '#475569' }}>
                  Quarterly summary of recurring revenue, expansion and churn across Europe.
                </p>
                <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <div className="flex -space-x-1">
                    {[['IS', '#7C3AED'], ['JH', '#2563EB'], ['MJ', '#0D9488']].map(([t, c]) => <span key={t} className="at-avatar" style={{ background: c }}>{t}</span>)}
                    <span className="at-avatar" style={{ background: '#E2E8F0', color: '#475569' }}>+4</span>
                  </div>
                  <span className="at-badge at-badge--success"><i />Shared</span>
                </div>
              </Reveal>
              <Reveal className="at-card at-lift p-5 flex items-center gap-4" delay={80}>
                <span className="w-10 h-10 rounded-[10px] grid place-items-center shrink-0" style={{ background: '#EFF6FF', color: '#2563EB' }}><Icon name="plug" size={20} /></span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold">Billing integration</p>
                  <p className="text-[13px]" style={{ color: '#64748B' }}>Connected · last sync 4 min ago</p>
                </div>
                <span className="ml-auto"><IntegrationToggle /></span>
              </Reveal>
            </div>

            <div>
              <SubTitle>Modal dialog</SubTitle>
              <div className="rounded-[14px] p-4 sm:p-8 grid place-items-center" style={{ background: 'rgba(15,23,42,.55)', backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize: '14px 14px' }}>
                <div className="at-modal" role="dialog" aria-modal="false" aria-labelledby="at-modal-title">
                  <div className="flex items-start justify-between gap-4 p-5 pb-0">
                    <div>
                      <h4 id="at-modal-title" className="text-[18px] font-semibold tracking-[-0.01em]">Invite teammates</h4>
                      <p className="text-[13px] mt-1" style={{ color: '#64748B' }}>They'll get access to the Finance workspace.</p>
                    </div>
                    <button type="button" className="at-btn at-btn--tertiary at-btn--icon at-btn--sm" aria-label="Close dialog" style={{ color: '#64748B' }}><Icon name="x" /></button>
                  </div>
                  <div className="p-5 space-y-4">
                    <label className="at-field">
                      <span className="at-label">Email addresses</span>
                      <span className="at-input-wrap"><Icon name="mail" /><input className="at-input" placeholder="name@company.com" /></span>
                    </label>
                    <label className="at-field">
                      <span className="at-label">Role</span>
                      <select className="at-select" defaultValue="Editor"><option>Viewer</option><option>Editor</option><option>Admin</option></select>
                    </label>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 px-5 py-4" style={{ borderTop: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '0 0 16px 16px' }}>
                    <button type="button" className="at-btn at-btn--secondary">Cancel</button>
                    <button type="button" className="at-btn at-btn--primary">Send invites</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Board>
      </div>
    </section>
  );
}
