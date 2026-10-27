// Illustrative sample data for the ATLAS concept.
// Fictional accounts and figures — used only to demonstrate the components.

export const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const REVENUE = {
  labels: MONTHS,
  series: [
    { name: 'This period', color: '#7C3AED', values: [168, 174, 179, 186, 190, 197, 205, 212, 221, 229, 238, 248.6] },
    { name: 'Previous period', color: '#94A3B8', dashed: true, values: [131, 136, 140, 143, 149, 152, 158, 161, 166, 170, 175, 181] },
  ],
};

export const NEW_ACCOUNTS = {
  labels: ["Q3 '25", "Q4 '25", "Q1 '26", "Q2 '26"],
  series: [
    { name: 'Enterprise', color: '#7C3AED', values: [14, 17, 19, 23] },
    { name: 'Growth',     color: '#3B82F6', values: [38, 42, 47, 55] },
    { name: 'Starter',    color: '#14B8A6', values: [62, 71, 78, 84] },
  ],
};

export const PLAN_MIX = [
  { name: 'Enterprise', color: '#7C3AED', value: 129.3 },
  { name: 'Growth',     color: '#3B82F6', value: 77.1 },
  { name: 'Starter',    color: '#14B8A6', value: 42.2 },
];

export const KPIS = [
  { label: 'Monthly recurring revenue', value: 'DKK 248.6k', delta: '+8.2%', up: true,  note: 'vs. previous period', spark: [168, 179, 190, 205, 221, 238, 248.6] },
  { label: 'Active accounts',           value: '1,284',   delta: '+64',   up: true,  note: 'net new this quarter', spark: [1120, 1146, 1171, 1198, 1226, 1259, 1284] },
  { label: 'Net revenue retention',     value: '112%',    delta: '+1.4 pt', up: true, note: 'trailing 12 months', spark: [108, 109, 109, 110, 111, 111, 112] },
  { label: 'Logo churn',                value: '1.9%',    delta: '−0.3 pt', up: false, good: true, note: 'monthly average', spark: [2.6, 2.5, 2.3, 2.2, 2.1, 2.0, 1.9] },
];

const AV = ['#7C3AED', '#2563EB', '#0D9488', '#E11D48', '#475569', '#6D28D9'];

export const ACCOUNTS = [
  { id: 'a1',  name: 'Halden Studio',      plan: 'Enterprise', owner: 'Ida Sørensen',       mrr: 18400, seats: 240, status: 'Active',   updated: '2 min ago',  av: AV[0] },
  { id: 'a2',  name: 'Brightline Co.',     plan: 'Growth',     owner: 'Jonas Hansen',       mrr: 4200,  seats: 58,  status: 'Trial',    updated: '14 min ago', av: AV[1] },
  { id: 'a3',  name: 'Orbit Logistics',    plan: 'Enterprise', owner: 'Mette Jensen',       mrr: 22950, seats: 312, status: 'Active',   updated: '1 h ago',    av: AV[2] },
  { id: 'a4',  name: 'Fernway Health',     plan: 'Growth',     owner: 'Lars Pedersen',      mrr: 6100,  seats: 74,  status: 'Past due', updated: '3 h ago',    av: AV[3] },
  { id: 'a5',  name: 'Copperleaf',         plan: 'Starter',    owner: 'Sofie Andersen',     mrr: 890,   seats: 9,   status: 'Active',   updated: '5 h ago',    av: AV[4] },
  { id: 'a6',  name: 'Meridian Labs',      plan: 'Enterprise', owner: 'Mikkel Christensen', mrr: 15700, seats: 198, status: 'Active',   updated: 'Yesterday',  av: AV[5] },
  { id: 'a7',  name: 'Quayside Retail',    plan: 'Growth',     owner: 'Emma Larsen',        mrr: 3800,  seats: 41,  status: 'Churned',  updated: 'Yesterday',  av: AV[3] },
  { id: 'a8',  name: 'Northfield Energy',  plan: 'Enterprise', owner: 'Anders Rasmussen',   mrr: 19800, seats: 265, status: 'Active',   updated: '2 days ago', av: AV[0] },
  { id: 'a9',  name: 'Lumen & Vale',       plan: 'Starter',    owner: 'Freja Nielsen',      mrr: 640,   seats: 6,   status: 'Trial',    updated: '2 days ago', av: AV[1] },
  { id: 'a10', name: 'Tidewater Systems',  plan: 'Growth',     owner: 'Rasmus Jørgensen',   mrr: 5300,  seats: 66,  status: 'Active',   updated: '3 days ago', av: AV[2] },
  { id: 'a11', name: 'Saltmarsh Media',    plan: 'Starter',    owner: 'Camilla Madsen',     mrr: 1150,  seats: 12,  status: 'Past due', updated: '4 days ago', av: AV[5] },
  { id: 'a12', name: 'Granite Peak',       plan: 'Growth',     owner: 'Henrik Olsen',       mrr: 7450,  seats: 89,  status: 'Active',   updated: '6 days ago', av: AV[4] },
];

export const STATUS_BADGE = {
  'Active':   'success',
  'Trial':    'info',
  'Past due': 'warning',
  'Churned':  'error',
};

export const initials = (name) => name.split(/\s|&/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
export const money = (n) => 'DKK ' + n.toLocaleString('en-US');

export const REGIONS = ['Europe', 'Nordics', 'Western Europe', 'Central Europe', 'Southern Europe'];
