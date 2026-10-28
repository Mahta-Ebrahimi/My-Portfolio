import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import './aura.css';

// Original AURA design exports — shown as supplied, never edited
import landing     from '../assets/aura/01-Landing-Desktop-1440 (1).svg';
import productPage from '../assets/aura/02-Product-Details-Desktop-1440.svg';
import comparison  from '../assets/aura/03-Comparison-Desktop-1440.svg';
import cartFull    from '../assets/aura/04-Cart-Desktop-1440.svg';
import cartEmpty   from '../assets/aura/04b-Cart-Empty-Desktop-1440.svg';
import mobileMenu  from '../assets/aura/05b-Mobile-Menu-Open-390.svg';
import components  from '../assets/aura/06-Component-Library (1).svg';
import foundations from '../assets/aura/07-Design-Foundations.svg';

const ACCENT = 'var(--aura-accent)';
const PROTOTYPE_URL = 'https://www.figma.com/proto/70ZweW0nVJlllWzUdgPGMa/Untitled?node-id=27-580&t=Ne4zsylsTEoPuIPY-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=27%3A218';

const SECTIONS = [
  { id: 'intro',       num: '01', label: 'Introduction' },
  { id: 'overview',    num: '02', label: 'Overview' },
  { id: 'challenge',   num: '03', label: 'Design Challenge' },
  { id: 'direction',   num: '04', label: 'Visual Direction' },
  { id: 'product',     num: '05', label: 'Product Details' },
  { id: 'comparison',  num: '06', label: 'Comparison' },
  { id: 'cart',        num: '07', label: 'Cart & States' },
  { id: 'responsive',  num: '08', label: 'Responsive' },
  { id: 'components',  num: '09', label: 'Component Library' },
  { id: 'foundations', num: '10', label: 'Foundations' },
  { id: 'decisions',   num: '11', label: 'Key Decisions' },
  { id: 'outcome',     num: '12', label: 'Outcome' },
];

const META = [
  { label: 'Role',         value: 'UI Designer' },
  { label: 'Project',      value: 'Client project' },
  { label: 'Focus',        value: 'E-commerce UI, Design System, Responsive Design' },
  { label: 'Deliverables', value: 'Multi-screen interface designs, component library, design foundations' },
];

const TENSIONS = [
  {
    title: 'Premium expression vs. readable content',
    problem: 'A dark, atmospheric palette sets the mood, but it can easily lower contrast and bury body text.',
    direction: 'Atmosphere lives in the background layers: gradients, lighting and glass. Text stays white or light neutral on solid dark surfaces.',
  },
  {
    title: 'Immersive imagery vs. clear purchase actions',
    problem: 'Large product renders pull the eye, and a purchase button placed next to them can disappear.',
    direction: 'Primary actions are a solid white pill, the brightest element on every screen, so they stay the clearest next step beside any image.',
  },
  {
    title: 'Desktop presentation vs. mobile space',
    problem: 'A 1440px layout with floating feature cards and a five-link header does not fit a 390px screen.',
    direction: 'On mobile the header collapses into a drawer with larger rows, and the purchase action moves to the bottom, within thumb reach.',
  },
];

const VISUAL_DECISIONS = [
  {
    title: 'Dark cinematic background',
    what: 'A deep navy ground (Midnight, #080B18) with soft violet and blue light falling behind the product.',
    why: 'It gives the headphones a stage, like a studio product shot, and keeps attention on the object rather than the page.',
  },
  {
    title: 'Violet and blue accents',
    what: 'Electric Violet (#6D5DFB) is used for lighting and accents. Electric Blue (#46C5FF) is reserved for focus and rim light.',
    why: 'Giving each accent a separate job keeps colour meaningful: violet carries mood, blue signals interaction.',
  },
  {
    title: 'Product-focused hierarchy',
    what: 'The headphone render sits at the centre of the hero, with the headline on the left and three feature cards on the right.',
    why: 'Everything on the first screen points back to the product, so a visitor knows what AURA sells before reading a line of copy.',
  },
  {
    title: 'Typography and whitespace',
    what: 'A three-line display headline in Inter, a short supporting sentence, and generous space between sections.',
    why: 'Scale and space do the work decoration would otherwise do, which keeps a dark page calm instead of busy.',
  },
  {
    title: 'Layered glass surfaces',
    what: 'Feature cards, the style selector bar and the header use translucent surfaces with a thin, light edge.',
    why: 'Glass lets the background lighting show through while still grouping content into clearly separated, readable blocks.',
  },
  {
    title: 'CTA prominence',
    what: '“Shop now” is a solid white pill and “Watch the film” an outlined secondary. The style bar repeats the price with its own “Add to cart”.',
    why: 'One primary action per view keeps the choice clear, and placing a purchase action next to the colour picker shortens the path from interest to cart.',
  },
];

const PRODUCT_POINTS = [
  { title: 'Information hierarchy', text: 'The purchase panel reads in the order a buyer needs it: category, product name, one-line summary, price, colour, quantity, then Add to cart.' },
  { title: 'Imagery and content balance', text: 'The gallery takes the wider column, with four thumbnails and a “1 / 4” position label. The purchase panel takes the narrower one, so the product leads but the decision is never off-screen.' },
  { title: 'Specifications', text: 'A two-column “What is inside” table groups eight specs as label–value pairs with right-aligned values, so one detail is quick to find.' },
  { title: 'Purchase-action visibility', text: 'The button repeats the price (“Add to cart · $299”). Delivery, returns and warranty sit directly beneath it to answer the questions that usually come next.' },
  { title: 'Consistent navigation and spacing', text: 'The header, breadcrumb, footer and glass card treatment carry over from the landing page, so the product page clearly belongs to the same store.' },
];

const COMPARISON_POINTS = [
  { title: 'Side-by-side structure', text: 'Three cards repeat the same structure (image, name, one-line positioning, price, action), so the differences show up in the content rather than the layout.' },
  { title: 'A guided default', text: 'AURA X1 is marked “Our pick”, has a brighter outline and the only solid button, and its column is tinted in the table below. The other two models keep outlined buttons.' },
  { title: 'Scanning and grouping', text: 'The “Feature by feature” table keeps the card order across nine rows. Included and not-included rows pair a check or dash with a text label, so meaning never relies on the icon alone.' },
  { title: 'Less friction when comparing', text: 'A “Show differences only” toggle sits above the table, and each card links to highlight its column. A closing banner, “Not sure? Start with AURA X1.”, gives undecided visitors a clear starting point.' },
];

const CART_POINTS = [
  { title: 'Why empty states matter', text: 'An empty cart is often reached by accident or after removing items. Instead of a blank page, it explains what happened and offers two ways forward: “Explore AURA X1” and “Compare models”.' },
  { title: 'Continuity between states', text: 'Both states keep the same header, page title, glass container and footer. Only the content inside changes, so the cart feels like the same place whether it is full or empty.' },
  { title: 'Action hierarchy', text: 'Checkout is the only solid white button in the filled cart. Quantity steppers, Remove and the promo code field are quieter, and “Continue shopping” is a text link.' },
  { title: 'Information clarity', text: 'Each line shows colour, unit price and line total. The order summary lists subtotal, shipping (“Calculated at checkout”) and tax before the total, so nothing appears unexpectedly later.' },
  { title: 'Feedback and next steps', text: 'The cart badge in the header reflects the contents (2 in the filled state, none when empty), and a short note under Checkout says plainly that this is a concept checkout.' },
];

const MOBILE_POINTS = [
  { title: 'Navigation hierarchy', text: 'The five desktop links become full-width rows with chevrons. Cart and Account sit below a divider as a secondary group.' },
  { title: 'Content priority', text: 'The drawer covers most of the screen and dims the page behind it, so the menu is the only task in view.' },
  { title: 'Touch targets', text: 'Rows are tall and span the drawer’s width, the close button is a large circle, and “Buy AURA X1” is a full-width button at the bottom of the screen.' },
  { title: 'Discoverability', text: 'Chevrons signal that each row leads somewhere, and the current section (Products) is marked with a lighter surface.' },
  { title: 'Consistent identity', text: 'The midnight ground, glass panel, Inter type and white pill button make the small screen unmistakably AURA.' },
];

const COMPONENT_GROUPS = [
  { num: '01', title: 'Actions', text: 'Primary, Secondary, Outline and Ghost buttons across default, hover, pressed, focus, disabled and loading. Three sizes (56, 48 and 40px) with leading or trailing icons, plus icon buttons. The sheet sets one rule: one Primary per view.' },
  { num: '02', title: 'Navigation', text: 'Link states (default, hover, active, focus), search, cart with count and the menu icon open and closed, assembled into the desktop header.' },
  { num: '03', title: 'Inputs', text: 'Text and email fields in default, focus, error and disabled. The error pairs a red border with an icon and a message. Also search, checkbox, radio, toggle and a quantity stepper whose minus disables at 1.' },
  { num: '04', title: 'Product', text: 'The colour selector with hover, selected, focus and disabled swatches, and a live label that names the chosen colour.' },
  { num: '05', title: 'Feedback', text: 'Badges for six meanings, four alerts (info, success, warning, error), a toast, a spinner, a skeleton loader and an empty state.' },
  { num: '06', title: 'Overlays', text: 'A sort dropdown, an explanatory popover and a confirmation modal for removing an item from the cart.' },
  { num: '07', title: 'Cards', text: 'Feature, product, specification, recommended-pick, gallery and review cards. The review card holds placeholder text, because real reviews should only appear once they exist.' },
];

const FOUNDATION_FACTS = [
  { title: 'Colour and semantic intent', text: 'Five brand colours (Midnight #080B18, Electric Violet #6D5DFB, Electric Blue #46C5FF, Ice #DCE7FF and White) and eight primitive scales from 50 to 950. On top sit 20 semantic tokens, such as text/muted, action/accent and focus/ring, each with a dark and a light value.' },
  { title: 'Typography hierarchy', text: 'Inter as the only family, in 14 named styles from display-xl (88/88, weight 600, −0.04em) to overline (12/16, 600, +0.16em). Hierarchy comes from size, three weights (400, 500, 600) and tracking.' },
  { title: 'Spacing rhythm', text: 'A 13-step scale from 4 to 128px. A 12-column desktop grid with 80px columns, 32px gutters and 64px margins, 8 columns on tablet and 4 on mobile.' },
  { title: 'Radius, glass and depth', text: 'Seven radius tokens from xs (4px) to pill, six glass strengths with defined fill, edge, blur and radius, and six elevation levels from ground to modal.' },
  { title: 'Contrast and readability', text: 'Text uses solid tokens rather than faded colour: white for primary, #CDD4E9 for secondary and #989EB2 for muted, on the midnight ground. Focus has its own blue ring, separate from the violet accent, so it stays visible on violet buttons.' },
];

const KEY_DECISIONS = [
  { title: 'Product-first hierarchy', text: 'The headphones get the largest, best-lit area on each product screen, so the product is understood before the copy is read.' },
  { title: 'Consistent interaction patterns', text: 'One solid white pill marks the primary action on every screen, so customers learn once where the next step is.' },
  { title: 'Clear shopping states', text: 'The cart is designed both filled and empty, so customers always know where they are and what to do next.' },
  { title: 'Cohesive visual foundations', text: 'Colour, type, spacing, glass and elevation are defined as tokens first, which keeps very different screens visually consistent.' },
];

const DELIVERABLES = [
  'Desktop landing page',
  'Product details screen',
  'Comparison screen',
  'Cart and empty cart states',
  'Mobile navigation exploration',
  'Component library',
  'Design foundations',
];

const NEXT_STEPS = [
  'Mobile versions of the product, comparison and cart screens',
  'Usability testing of the comparison table with real shoppers',
  'Measured contrast checks of every text token on each glass strength',
];

// ── Shared pieces ─────────────────────────────────────────────────────────────
const SectionTag = ({ num, label }) => (
  <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>
    {num} — {label}
  </p>
);

const Heading = ({ children }) => (
  <h2 className="text-[26px] sm:text-[34px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-5 max-w-[680px]">
    {children}
  </h2>
);

const Lead = ({ children, className = '' }) => (
  <p className={`text-[#9CA3AF] text-[17px] sm:text-lg leading-8 max-w-[680px] ${className}`}>{children}</p>
);

const Note = ({ children }) => (
  <p className="text-[14px] text-[#6B7280] leading-relaxed border-l-2 pl-4 max-w-[680px]" style={{ borderColor: ACCENT }}>
    {children}
  </p>
);

// Title + text pairs, two columns on wider screens
const Points = ({ items, cols = 2 }) => (
  <dl className={`grid grid-cols-1 ${cols === 2 ? 'md:grid-cols-2' : ''} gap-x-10 gap-y-7`}>
    {items.map(({ title, text }) => (
      <div key={title} className="border-t border-[#1A1A1A] pt-4">
        <dt className="text-white text-[15px] font-semibold mb-1.5">{title}</dt>
        <dd className="text-[#9CA3AF] text-[15px] leading-relaxed">{text}</dd>
      </div>
    ))}
  </dl>
);

// Presents an original SVG at its own proportions. Long screens open with a preview
// height and expand to the full design, so nothing is permanently cropped.
function Screen({ src, alt, caption, w, h, peek, eager = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const collapsible = peek && peek < h;
  const collapsed = collapsible && !open;

  const toggle = () => {
    if (open) ref.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    setOpen(o => !o);
  };

  return (
    <figure ref={ref} className="scroll-mt-28">
      <div
        className="relative overflow-hidden rounded-xl border border-[#1A1A1A]"
        style={{ background: '#080B18', aspectRatio: collapsed ? `${w} / ${peek}` : undefined }}
      >
        <img src={src} alt={alt} width={w} height={h} loading={eager ? 'eager' : 'lazy'} className="block w-full h-auto" />
        {collapsed && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(8,11,24,0), rgba(8,11,24,0.96))' }}
          />
        )}
      </div>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 mt-3">
        <figcaption className="text-[13px] text-[#6B7280] leading-relaxed max-w-[560px]">{caption}</figcaption>
        <div className="flex items-center gap-5 shrink-0 text-[13px] font-medium">
          {collapsible && (
            <button type="button" onClick={toggle} aria-expanded={open} className="hover:underline underline-offset-4" style={{ color: ACCENT }}>
              {open ? 'Collapse' : 'Show full design'}
            </button>
          )}
          <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#6B7280] hover:text-white transition-colors">
            Full size <FaExternalLinkAlt style={{ fontSize: '9px' }} />
          </a>
        </div>
      </div>
    </figure>
  );
}

// One overview of every screen, built from the original SVGs. Each tile shows the top of
// its design; the full screens follow in their own sections.
const Tile = ({ src, label, ratio, className = '', style }) => (
  <div
    className={`overflow-hidden ${className}`}
    style={{ aspectRatio: ratio, borderRadius: 'clamp(4px, 0.9vw, 10px)', border: '1px solid rgba(220,231,255,0.12)', boxShadow: '0 18px 40px rgba(0,0,0,0.45)', background: '#080B18', ...style }}
  >
    <img src={src} alt={label} className="block w-full h-full object-cover object-top" />
  </div>
);

function ScreensOverview() {
  return (
    <figure>
      <a
        href={PROTOTYPE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the AURA prototype in Figma (all six screens shown)"
        className="group relative block overflow-hidden rounded-xl border border-[#1A1A1A]"
        style={{
          padding: '5%',
          background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(109,93,251,0.28), rgba(109,93,251,0) 70%), linear-gradient(135deg, #080B18 0%, #12182E 55%, #080B18 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <Tile src={landing} label="Landing page" ratio="1440 / 1500" style={{ width: '35%' }} />
          <Tile src={mobileMenu} label="Mobile navigation" ratio="390 / 844" style={{ width: '14%', borderRadius: 'clamp(6px, 1.4vw, 18px)' }} />
          <div className="flex flex-col justify-between self-stretch" style={{ width: '23.5%' }}>
            <Tile src={productPage} label="Product details" ratio="1440 / 1100" />
            <Tile src={cartFull} label="Cart" ratio="1440 / 1104" />
          </div>
          <div className="flex flex-col justify-between self-stretch" style={{ width: '23.5%' }}>
            <Tile src={comparison} label="Comparison" ratio="1440 / 1100" />
            <Tile src={cartEmpty} label="Empty cart" ratio="1440 / 1048" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 bg-black/60">
          <span className="flex items-center gap-2 font-bold text-sm tracking-wide" style={{ color: '#FFFFFF' }}>
            <FaExternalLinkAlt style={{ fontSize: '12px' }} /> Prototype in Figma
          </span>
        </div>
      </a>
      <figcaption className="text-[13px] text-[#6B7280] leading-relaxed mt-3">
        All six screens: landing page, product details, comparison, cart, empty cart and mobile navigation. Each is shown in full further down.
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Aura() {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="aura flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR ═══════════════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div className="sticky flex flex-col overflow-y-auto" style={{ top: '80px', height: 'calc(100vh - 80px)' }}>
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">AURA</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">Premium Audio Shopping</p>
            <span className="text-[12px] font-medium px-2 py-1 rounded-md border border-[#222] text-[#9CA3AF]">Figma</span>
          </div>

          <nav className="flex-1 px-4 py-5" aria-label="Project contents">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#4B5563] mb-3 px-1">Contents</p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, num, label }) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      aria-current={on ? 'true' : undefined}
                      className={`w-full flex items-center gap-3 px-2 py-[7px] rounded-lg text-left transition-all duration-150 group ${on ? 'bg-[#111]' : 'hover:bg-[#0D0D0D]'}`}
                    >
                      <span className={`font-mono text-[12px] shrink-0 tabular-nums ${on ? '' : 'text-[#4B5563]'}`} style={on ? { color: ACCENT } : undefined}>{num}</span>
                      <span className={`text-[13px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>{label}</span>
                      {on && <div className="ml-auto w-[3px] h-4 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#4B5563] mb-1">Role</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">UI Designer</p>
            </div>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#4B5563] mb-1">Type</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">Client project</p>
            </div>
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aura-cta flex items-center justify-center gap-2 w-full text-[13px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaExternalLinkAlt style={{ fontSize: '9px' }} /> View Prototype
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* ── 01 INTRODUCTION ─────────────────────────────────────── */}
          <section id="intro" className="mb-28 scroll-mt-24">
            <SectionTag num="01" label="Introduction" />
            <h1 className="text-[34px] sm:text-[48px] font-bold text-white leading-[1.08] tracking-[-0.03em] mb-6 max-w-[820px]">
              AURA — Designing a Premium Audio Shopping Experience
            </h1>
            <Lead className="mb-10">
              AURA is an online store for a line of premium wireless headphones. It explores how visual storytelling, consistent interface patterns and clear shopping flows can work together, so a premium look supports the purchase instead of getting in its way.
            </Lead>

            <div className="mb-10">
              <ScreensOverview />
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
              {META.map(({ label, value }) => (
                <div key={label} className="border-t border-[#1A1A1A] pt-3">
                  <dt className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-1.5">{label}</dt>
                  <dd className="text-white text-[14px] leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── 02 OVERVIEW ─────────────────────────────────────────── */}
          <section id="overview" className="mb-28 scroll-mt-24">
            <SectionTag num="02" label="Project Overview" />
            <Heading>A store that sells a feeling, then gets out of the way</Heading>
            <div className="space-y-5 mb-8">
              <Lead>
                AURA follows one product line (AURA Lite, AURA X1 and AURA X1 Pro) through the screens a shopper actually moves between: a landing page, a product page, a model comparison and the cart. Alongside the screens sit a component library and a set of design foundations that every screen is built from.
              </Lead>
              <Lead>
                Premium audio is bought partly on emotion and partly on facts. The landing page has to make the product feel desirable; the product page and comparison have to make specifications, prices and differences easy to read. The interface needs to hold both modes without one undermining the other.
              </Lead>
            </div>
            <Note>
              Specification values shown in [brackets] in the designs are deliberate placeholders. I chose not to invent battery life, driver sizes or other figures that could be read as real product claims.
            </Note>
          </section>

          {/* ── 03 DESIGN CHALLENGE ─────────────────────────────────── */}
          <section id="challenge" className="mb-28 scroll-mt-24">
            <SectionTag num="03" label="The Design Challenge" />
            <Heading>Three tensions that shaped the interface</Heading>
            <Lead className="mb-10">
              I framed the brief as a design objective, not a research finding: how can a dark, expressive interface stay clear enough to shop in? Three tensions guided the decisions that follow.
            </Lead>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TENSIONS.map(({ title, problem, direction }, i) => (
                <article key={title} className="bg-[#111] border border-[#222] rounded-xl p-6 flex flex-col">
                  <p className="font-mono text-[12px] mb-4" style={{ color: ACCENT }}>0{i + 1}</p>
                  <h3 className="text-white text-[17px] font-semibold leading-snug mb-3">{title}</h3>
                  <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-5">{problem}</p>
                  <div className="mt-auto pt-4 border-t border-[#222]">
                    <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-1.5">Direction</p>
                    <p className="text-white text-[15px] leading-relaxed">{direction}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── 04 VISUAL DIRECTION ─────────────────────────────────── */}
          <section id="direction" className="mb-28 scroll-mt-24">
            <SectionTag num="04" label="Visual Direction & Design Decisions" />
            <Heading>A cinematic stage for one product</Heading>
            <Lead className="mb-10">
              The landing page sets the visual language for the whole store. Each decision below pairs what is visible in the design with why it was made.
            </Lead>
            <div className="mb-12">
              <Screen
                src={landing} w={1440} h={2368} peek={1300}
                alt="AURA desktop landing page: the headline “Sound Beyond Reality”, a centred headphone render, three glass feature cards, a style selector bar with price and Add to cart, a six-card feature grid and the footer."
                caption="Desktop landing page, 1440px. The hero, style selector and feature grid share one dark stage."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VISUAL_DECISIONS.map(({ title, what, why }) => (
                <article key={title} className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <h3 className="text-white text-[16px] font-semibold mb-4">{title}</h3>
                  <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-1">What you see</p>
                  <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-4">{what}</p>
                  <p className="text-[12px] uppercase tracking-[0.15em] mb-1" style={{ color: ACCENT }}>Why</p>
                  <p className="text-[#D1D5DB] text-[15px] leading-relaxed">{why}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── 05 PRODUCT DETAILS ──────────────────────────────────── */}
          <section id="product" className="mb-28 scroll-mt-24">
            <SectionTag num="05" label="Product Discovery & Detail" />
            <Heading>Helping customers evaluate before they buy</Heading>
            <Lead className="mb-10">
              The product page moves from atmosphere to evidence. The layout keeps the product visible while bringing price, options and specifications within easy reach.
            </Lead>
            <div className="mb-12">
              <Screen
                src={productPage} w={1440} h={2732} peek={1420}
                alt="AURA X1 product details page: image gallery with thumbnails on the left, purchase panel with price, colour swatches, quantity and Add to cart on the right, followed by a specifications table and two feature stories."
                caption="Product details, 1440px. Gallery and purchase panel above the fold; specifications and feature stories below."
              />
            </div>
            <Points items={PRODUCT_POINTS} />
          </section>

          {/* ── 06 COMPARISON ───────────────────────────────────────── */}
          <section id="comparison" className="mb-28 scroll-mt-24">
            <SectionTag num="06" label="Comparison Experience" />
            <Heading>Making three models easy to tell apart</Heading>
            <Lead className="mb-10">
              Comparing products is where shoppers often stall. The comparison screen offers a quick answer at the top and the full detail underneath.
            </Lead>
            <div className="mb-12">
              <Screen
                src={comparison} w={1440} h={2320} peek={1680}
                alt="AURA comparison page: three model cards for AURA Lite, AURA X1 (marked Our pick) and AURA X1 Pro, followed by a feature-by-feature table and a recommendation banner."
                caption="Model comparison, 1440px. Three cards for a quick choice, then a feature-by-feature table."
              />
            </div>
            <Points items={COMPARISON_POINTS} />
          </section>

          {/* ── 07 CART & STATES ────────────────────────────────────── */}
          <section id="cart" className="mb-28 scroll-mt-24">
            <SectionTag num="07" label="Cart Experience & UI States" />
            <Heading>Designing for every state of the cart</Heading>
            <Lead className="mb-10">
              A cart is not one screen but several. I designed the filled and empty states together so they read as the same place.
            </Lead>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Screen
                src={cartFull} w={1440} h={1104}
                alt="AURA cart with two items, AURA X1 and AURA X1 Pro, each with a quantity stepper and Remove link, beside an order summary with promo code and Checkout button."
                caption="Filled cart: line items on the left, order summary and Checkout on the right."
              />
              <Screen
                src={cartEmpty} w={1440} h={1048}
                alt="AURA empty cart: a bag icon, the message “Your cart is empty” and two buttons, Explore AURA X1 and Compare models."
                caption="Empty cart: the same frame, with a clear message and two ways forward."
              />
            </div>
            <Points items={CART_POINTS} />
          </section>

          {/* ── 08 RESPONSIVE ───────────────────────────────────────── */}
          <section id="responsive" className="mb-28 scroll-mt-24">
            <SectionTag num="08" label="Responsive Thinking" />
            <Heading>Rethinking navigation for a 390px screen</Heading>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,300px)_1fr] gap-10 lg:gap-14 items-start">
              <div className="w-full max-w-[300px] mx-auto md:mx-0">
                <Screen
                  src={mobileMenu} w={390} h={844}
                  alt="AURA mobile navigation drawer at 390px: a Menu title with close button, five navigation rows with chevrons, Cart with a count badge, Account, and a full-width Buy AURA X1 button at the bottom."
                  caption="Mobile navigation drawer, 390px."
                />
              </div>
              <div>
                <Lead className="mb-8">
                  The desktop header holds five links, search, cart and a Buy now button. On a phone, that has to become a single, focused menu.
                </Lead>
                <Points items={MOBILE_POINTS} cols={1} />
                <div className="mt-8">
                  <Note>
                    This is one mobile state, exploring navigation. A complete responsive system would also need mobile versions of the product, comparison and cart screens.
                  </Note>
                </div>
              </div>
            </div>
          </section>

          {/* ── 09 COMPONENT LIBRARY ────────────────────────────────── */}
          <section id="components" className="mb-28 scroll-mt-24">
            <SectionTag num="09" label="Component Library" />
            <Lead className="mb-10">
              The component library collects every part that repeats across the screens, with its states drawn side by side. The sheet notes that names follow a Component / Variant / Size / State pattern, matching how the parts are organised in Figma.
            </Lead>
            <div className="mb-12">
              <Screen
                src={components} w={1440} h={3480} peek={1500}
                alt="AURA component library sheet: button variants and states, navigation elements, form controls, colour selector, badges and alerts, dropdown, popover and modal, and a family of cards."
                caption="Component library: actions, navigation, inputs, product selector, feedback, overlays and cards."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7 mb-12">
              {COMPONENT_GROUPS.map(({ num, title, text }) => (
                <div key={title} className="border-t border-[#1A1A1A] pt-4">
                  <p className="text-white text-[15px] font-semibold mb-1.5">
                    <span className="font-mono text-[12px] mr-2" style={{ color: ACCENT }}>{num}</span>{title}
                  </p>
                  <p className="text-[#9CA3AF] text-[15px] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 sm:p-8 mb-8">
              <h3 className="text-white text-[18px] font-semibold mb-3">Why reusable parts matter</h3>
              <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed max-w-[720px]">
                Every screen in this project reuses the same pieces: the white pill button, the glass card, the colour selector, the quantity stepper, the header. Defining their states once means a hover, focus or error looks the same wherever it appears, and a new screen can be assembled from known parts instead of drawn from scratch.
              </p>
            </div>
            <Note>
              The sheet documents visual states. As an SVG export it does not, on its own, show how the components are constructed inside Figma.
            </Note>
          </section>

          {/* ── 10 DESIGN FOUNDATIONS ───────────────────────────────── */}
          <section id="foundations" className="mb-28 scroll-mt-24">
            <SectionTag num="10" label="Design Foundations" />
            <Heading>The decisions underneath every screen</Heading>
            <Lead className="mb-10">
              The foundations sheet defines colour, type, spacing, glass and depth. In its own words: every value is a token, and every screen is built from these.
            </Lead>
            <div className="mb-12">
              <Screen
                src={foundations} w={1440} h={4434} peek={1500}
                alt="AURA design foundations sheet: brand colours, primitive colour scales, semantic tokens for dark and light, the Inter type scale, spacing, grid and radius, six glass strengths and six elevation levels."
                caption="Design foundations: colour, typography, spacing and grid, glass and elevation."
              />
            </div>
            <div className="mb-12">
              <Points items={FOUNDATION_FACTS} />
            </div>
            <div className="bg-[#111] border border-[#222] rounded-xl p-6 sm:p-8">
              <h3 className="text-white text-[18px] font-semibold mb-3">From foundations to components</h3>
              <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed max-w-[720px]">
                The foundations explain the component library. The glass strengths become the card, navigation and modal surfaces; the elevation levels separate resting cards from menus and dialogs; and the type styles map onto headings, button labels and captions. When a component looks right, it is because it is drawing on these values, not on one-off choices.
              </p>
            </div>
          </section>

          {/* ── 11 KEY DECISIONS ────────────────────────────────────── */}
          <section id="decisions" className="mb-28 scroll-mt-24">
            <SectionTag num="11" label="Key UI Design Decisions" />
            <Heading>Four decisions that hold the project together</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {KEY_DECISIONS.map(({ title, text }, i) => (
                <article key={title} className="bg-[#111] border border-[#222] rounded-xl p-6 sm:p-7">
                  <p className="text-4xl font-bold font-mono leading-none mb-5" style={{ color: ACCENT, opacity: 0.55 }}>0{i + 1}</p>
                  <h3 className="text-white text-[17px] font-semibold mb-2">{title}</h3>
                  <p className="text-[#9CA3AF] text-[15px] leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── 12 OUTCOME & REFLECTION ─────────────────────────────── */}
          <section id="outcome" className="mb-8 scroll-mt-24">
            <SectionTag num="12" label="Final Outcome & Reflection" />
            <Heading>What the project delivers</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
              <div>
                <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-4">Deliverables</p>
                <ul className="space-y-2.5">
                  {DELIVERABLES.map(item => (
                    <li key={item} className="px-0 cursor-auto flex items-start gap-3 text-white text-[15px]">
                      <span aria-hidden="true" className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-4">Reflection</p>
                <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed mb-4">
                  AURA shows how I approach UI design: start from the product and the decision the customer is making, then let the visual language support that decision.
                </p>
                <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed">
                  The dark, cinematic style is the most visible part of the project, but most of the work sits underneath it: a consistent action hierarchy, components drawn with their full set of states, and foundations that make every screen behave like part of one system.
                </p>
              </div>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 sm:p-8 mb-16">
              <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-1">Not yet done</p>
              <h3 className="text-white text-[18px] font-semibold mb-4">Where I would take it next</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {NEXT_STEPS.map(item => (
                  <li key={item} className="px-0 cursor-auto flex items-start gap-3 text-[#9CA3AF] text-[15px] leading-relaxed">
                    <span aria-hidden="true" className="text-[#6B7280]">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#222] rounded-xl p-8 text-center bg-[#0e0a1a] mb-16">
              <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>
                Try AURA in Figma
              </p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                Click through the AURA screens in the interactive Figma prototype.
              </p>
              <a
                href={PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aura-cta inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> Open Prototype
              </a>
            </div>

            <blockquote className="mb-16 max-w-[760px]">
              <p className="text-[26px] sm:text-[36px] font-bold text-white leading-[1.2] tracking-[-0.02em]">
                Expressive enough to feel premium.{' '}
                <span style={{ color: ACCENT }}>Clear enough to shop in.</span>
              </p>
            </blockquote>

            <div className="pt-8 border-t border-[#1A1A1A]">
              <a href="/#work" className="flex items-center gap-2 text-[#6B7280] hover:text-white transition-colors text-[14px]">
                <FaArrowLeft style={{ fontSize: '11px' }} /> Back to Work
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
