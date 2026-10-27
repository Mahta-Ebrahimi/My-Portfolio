// ATLAS design tokens — single source for every visual on the case study page.
// Primitive ramps → semantic tokens → components.

export const C = {
  violet:    '#7C3AED',
  violetSoft:'#A78BFA',
  blue:      '#3B82F6',
  teal:      '#14B8A6',
  rose:      '#F43F5E',
  navy:      '#0F172A',
  neutral:   '#64748B',
  bg:        '#F8FAFC',
  white:     '#FFFFFF',
};

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const ramp = (hexes) => STEPS.map((step, i) => ({ step, hex: hexes[i] }));

export const PALETTES = [
  {
    name: 'Violet', key: 'violet', role: 'Brand · primary actions · focus',
    steps: ramp(['#F5F3FF', '#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95']),
    anchor: 600,
  },
  {
    name: 'Blue', key: 'blue', role: 'Information · links · data series 2',
    steps: ramp(['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A']),
    anchor: 500,
  },
  {
    name: 'Teal', key: 'teal', role: 'Success · positive change · data series 3',
    steps: ramp(['#F0FDFA', '#CCFBF1', '#99F6E4', '#5EEAD4', '#2DD4BF', '#14B8A6', '#0D9488', '#0F766E', '#115E59', '#134E4A']),
    anchor: 500,
  },
  {
    name: 'Rose', key: 'rose', role: 'Error · destructive · negative change',
    steps: ramp(['#FFF1F2', '#FFE4E6', '#FECDD3', '#FDA4AF', '#FB7185', '#F43F5E', '#E11D48', '#BE123C', '#9F1239', '#881337']),
    anchor: 500,
  },
  {
    name: 'Neutral', key: 'neutral', role: 'Text · surfaces · borders',
    steps: ramp(['#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8', '#64748B', '#475569', '#334155', '#1E293B', '#0F172A']),
    anchor: 500,
  },
];

// Amber is a support hue, reserved for warning states only.
export const AMBER = [
  { step: 50, hex: '#FFFBEB' }, { step: 200, hex: '#FDE68A' }, { step: 500, hex: '#F59E0B' }, { step: 700, hex: '#B45309' },
];

export const hexOf = (key, step) => {
  if (key === 'white') return '#FFFFFF';
  if (key === 'amber') return AMBER.find(s => s.step === step).hex;
  return PALETTES.find(p => p.key === key).steps.find(s => s.step === step).hex;
};

// [primitive, step] for light and dark themes
export const SEMANTIC = [
  { token: 'background/default', light: ['neutral', 50],  dark: ['neutral', 900], use: 'App canvas' },
  { token: 'background/subtle',  light: ['neutral', 100], dark: ['neutral', 800], use: 'Table headers, wells' },
  { token: 'surface/primary',    light: ['white', 0],     dark: ['neutral', 800], use: 'Cards, panels, modals' },
  { token: 'text/primary',       light: ['neutral', 900], dark: ['neutral', 50],  use: 'Headings, body' },
  { token: 'text/secondary',     light: ['neutral', 500], dark: ['neutral', 400], use: 'Supporting copy, meta' },
  { token: 'border/default',     light: ['neutral', 200], dark: ['neutral', 700], use: 'Dividers, inputs, cards' },
  { token: 'action/primary',     light: ['violet', 600],  dark: ['violet', 400],  use: 'Primary buttons, links' },
  { token: 'status/success',     light: ['teal', 600],    dark: ['teal', 400],    use: 'Positive state, icons' },
  { token: 'status/warning',     light: ['amber', 500],   dark: ['amber', 500],   use: 'Attention, pending' },
  { token: 'status/error',       light: ['rose', 600],    dark: ['rose', 400],    use: 'Errors, destructive' },
];

export const TYPE_SCALE = [
  { token: 'display',  size: 56, lh: 64, weight: 700, track: '-0.03em', sample: 'Clarity at scale', css: 'clamp(34px, 6vw, 56px)' },
  { token: 'heading/1', size: 40, lh: 48, weight: 700, track: '-0.02em', sample: 'Revenue overview', css: 'clamp(28px, 4.5vw, 40px)' },
  { token: 'heading/2', size: 32, lh: 40, weight: 700, track: '-0.02em', sample: 'Account health' },
  { token: 'heading/3', size: 24, lh: 32, weight: 600, track: '-0.01em', sample: 'Monthly recurring revenue' },
  { token: 'heading/4', size: 20, lh: 28, weight: 600, track: '-0.01em', sample: 'Plan distribution' },
  { token: 'body/large', size: 18, lh: 28, weight: 400, track: '0', sample: 'Track performance across every workspace in one view.' },
  { token: 'body/default', size: 16, lh: 24, weight: 400, track: '0', sample: 'Filters apply to all widgets on this page.' },
  { token: 'body/small', size: 14, lh: 20, weight: 400, track: '0', sample: 'Last synced 4 minutes ago' },
  { token: 'label', size: 13, lh: 16, weight: 600, track: '0.06em', sample: 'ACTIVE ACCOUNTS', upper: true },
  { token: 'caption', size: 12, lh: 16, weight: 500, track: '0.01em', sample: 'Updated 30 Jun 2026 · 09:41' },
];

export const SPACING = [
  { token: 'space/050', px: 2 }, { token: 'space/100', px: 4 }, { token: 'space/200', px: 8 },
  { token: 'space/300', px: 12 }, { token: 'space/400', px: 16 }, { token: 'space/500', px: 20 },
  { token: 'space/600', px: 24 }, { token: 'space/800', px: 32 }, { token: 'space/1000', px: 40 },
  { token: 'space/1200', px: 48 }, { token: 'space/1600', px: 64 },
];

export const RADII = [
  { token: 'radius/none', px: 0,   use: 'Tables, dividers' },
  { token: 'radius/sm',   px: 4,   use: 'Badges, checkboxes' },
  { token: 'radius/md',   px: 8,   use: 'Buttons, inputs' },
  { token: 'radius/lg',   px: 12,  use: 'Cards, menus' },
  { token: 'radius/xl',   px: 16,  use: 'Modals, panels' },
  { token: 'radius/full', px: 999, use: 'Pills, avatars, toggles' },
];

export const ELEVATION = [
  { token: 'elevation/0', shadow: 'none', use: 'Flat surfaces with border', value: 'border 1px · border/default' },
  { token: 'elevation/1', shadow: '0 1px 2px rgba(15,23,42,.06), 0 1px 3px rgba(15,23,42,.08)', use: 'Cards, KPI tiles', value: '0 1 2 / 6% · 0 1 3 / 8%' },
  { token: 'elevation/2', shadow: '0 4px 8px -2px rgba(15,23,42,.08), 0 2px 4px -2px rgba(15,23,42,.06)', use: 'Dropdowns, popovers', value: '0 4 8 -2 / 8%' },
  { token: 'elevation/3', shadow: '0 12px 24px -6px rgba(15,23,42,.14), 0 4px 8px -4px rgba(15,23,42,.06)', use: 'Modals, drawers', value: '0 12 24 -6 / 14%' },
  { token: 'elevation/4', shadow: '0 24px 48px -12px rgba(15,23,42,.24)', use: 'Toasts, command menu', value: '0 24 48 -12 / 24%' },
];

// Validated categorical order for charts (light surface): violet → blue → teal.
// Teal sits below 3:1 against white, so every chart also carries a legend and direct labels.
export const SERIES = ['#7C3AED', '#3B82F6', '#14B8A6'];
