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
import { tr } from '../context/LanguageContext';

const ACCENT = 'var(--aura-accent)';
const PROTOTYPE_URL = 'https://www.figma.com/proto/70ZweW0nVJlllWzUdgPGMa/Untitled?node-id=27-580&t=Ne4zsylsTEoPuIPY-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=27%3A218';

const SECTIONS = [
  { id: 'intro',       num: '01', label: tr("Introduction", "Introduktion") },
  { id: 'overview',    num: '02', label: tr("Overview", "Oversigt") },
  { id: 'challenge',   num: '03', label: tr("Design Challenge", "Designudfordring") },
  { id: 'direction',   num: '04', label: tr("Visual Direction", "Visuel retning") },
  { id: 'product',     num: '05', label: tr("Product Details", "Produktdetaljer") },
  { id: 'comparison',  num: '06', label: tr("Comparison", "Sammenligning") },
  { id: 'cart',        num: '07', label: tr("Cart & States", "Kurv & tilstande") },
  { id: 'responsive',  num: '08', label: tr("Responsive", "Responsivt") },
  { id: 'components',  num: '09', label: tr("Component Library", "Komponentbibliotek") },
  { id: 'foundations', num: '10', label: tr("Foundations", "Fundament") },
  { id: 'decisions',   num: '11', label: tr("Key Decisions", "Vigtigste beslutninger") },
  { id: 'outcome',     num: '12', label: tr("Outcome", "Resultat") },
];

const META = [
  { label: tr("Role", "Rolle"),         value: tr("UI Designer", "UI-designer") },
  { label: tr("Project", "Projekt"),      value: tr("Client project", "Kundeprojekt") },
  { label: tr("Focus", "Fokus"),        value: tr("E-commerce UI, Design System, Responsive Design", "E-handels-UI, designsystem, responsivt design") },
  { label: tr("Deliverables", "Leverancer"), value: tr("Multi-screen interface designs, component library, design foundations", "Interfacedesign på flere skærme, komponentbibliotek, designfundament") },
];

const TENSIONS = [
  {
    title: tr("Premium expression vs. readable content", "Eksklusivt udtryk vs. læsbart indhold"),
    problem: tr("A dark, atmospheric palette sets the mood, but it can easily lower contrast and bury body text.", "En mørk, stemningsfuld palet sætter stemningen, men kan let sænke kontrasten og begrave brødteksten."),
    direction: tr("Atmosphere lives in the background layers: gradients, lighting and glass. Text stays white or light neutral on solid dark surfaces.", "Stemningen ligger i baggrundslagene: gradienter, lys og glas. Teksten forbliver hvid eller lys neutral på ensfarvede mørke flader."),
  },
  {
    title: tr("Immersive imagery vs. clear purchase actions", "Medrivende billeder vs. tydelige købshandlinger"),
    problem: tr("Large product renders pull the eye, and a purchase button placed next to them can disappear.", "Store produktbilleder trækker blikket, og en købsknap ved siden af dem kan forsvinde."),
    direction: tr("Primary actions are a solid white pill, the brightest element on every screen, so they stay the clearest next step beside any image.", "Primære handlinger er en udfyldt hvid pille – det lyseste element på hver skærm – så de forbliver det tydeligste næste skridt ved siden af ethvert billede."),
  },
  {
    title: tr("Desktop presentation vs. mobile space", "Præsentation på desktop vs. plads på mobil"),
    problem: tr("A 1440px layout with floating feature cards and a five-link header does not fit a 390px screen.", "Et 1440px-layout med svævende funktionskort og en header med fem links passer ikke til en 390px-skærm."),
    direction: tr("On mobile the header collapses into a drawer with larger rows, and the purchase action moves to the bottom, within thumb reach.", "På mobil foldes headeren sammen til en skuffe med større rækker, og købshandlingen flytter ned i bunden, inden for tommelfingerens rækkevidde."),
  },
];

const VISUAL_DECISIONS = [
  {
    title: tr("Dark cinematic background", "Mørk, filmisk baggrund"),
    what: tr("A deep navy ground (Midnight, #080B18) with soft violet and blue light falling behind the product.", "En dyb marineblå bund (Midnight, #080B18) med blødt violet og blåt lys, der falder bag produktet."),
    why: tr("It gives the headphones a stage, like a studio product shot, and keeps attention on the object rather than the page.", "Den giver hovedtelefonerne en scene som i et produktfoto fra et studie og holder opmærksomheden på genstanden frem for siden."),
  },
  {
    title: tr("Violet and blue accents", "Violette og blå accenter"),
    what: tr("Electric Violet (#6D5DFB) is used for lighting and accents. Electric Blue (#46C5FF) is reserved for focus and rim light.", "Electric Violet (#6D5DFB) bruges til lys og accenter. Electric Blue (#46C5FF) er reserveret til fokus og kantlys."),
    why: tr("Giving each accent a separate job keeps colour meaningful: violet carries mood, blue signals interaction.", "Når hver accentfarve har sin egen opgave, bevarer farverne deres betydning: Violet bærer stemningen, blå signalerer interaktion."),
  },
  {
    title: tr("Product-focused hierarchy", "Produktfokuseret hierarki"),
    what: tr("The headphone render sits at the centre of the hero, with the headline on the left and three feature cards on the right.", "Hovedtelefonerne står i midten af hero-sektionen med overskriften til venstre og tre funktionskort til højre."),
    why: tr("Everything on the first screen points back to the product, so a visitor knows what AURA sells before reading a line of copy.", "Alt på den første skærm peger tilbage på produktet, så en besøgende ved, hvad AURA sælger, før de har læst en linje tekst."),
  },
  {
    title: tr("Typography and whitespace", "Typografi og luft"),
    what: tr("A three-line display headline in Inter, a short supporting sentence, and generous space between sections.", "En display-overskrift på tre linjer i Inter, en kort understøttende sætning og rigelig luft mellem sektionerne."),
    why: tr("Scale and space do the work decoration would otherwise do, which keeps a dark page calm instead of busy.", "Skala og luft gør det arbejde, som dekoration ellers ville gøre, og holder en mørk side rolig i stedet for rodet."),
  },
  {
    title: tr("Layered glass surfaces", "Lagdelte glasflader"),
    what: tr("Feature cards, the style selector bar and the header use translucent surfaces with a thin, light edge.", "Funktionskort, stilvælgerbjælken og headeren bruger gennemsigtige flader med en tynd, lys kant."),
    why: tr("Glass lets the background lighting show through while still grouping content into clearly separated, readable blocks.", "Glasset lader baggrundslyset skinne igennem og grupperer samtidig indholdet i tydeligt adskilte, læsbare blokke."),
  },
  {
    title: tr("CTA prominence", "CTA'ernes synlighed"),
    what: tr("“Shop now” is a solid white pill and “Watch the film” an outlined secondary. The style bar repeats the price with its own “Add to cart”.", "“Shop now” er en udfyldt hvid pille, og “Watch the film” er en sekundær knap med kontur. Stilbjælken gentager prisen med sin egen “Add to cart”."),
    why: tr("One primary action per view keeps the choice clear, and placing a purchase action next to the colour picker shortens the path from interest to cart.", "Én primær handling pr. visning holder valget tydeligt, og en købshandling ved siden af farvevælgeren forkorter vejen fra interesse til kurv."),
  },
];

const PRODUCT_POINTS = [
  { title: tr("Information hierarchy", "Informationshierarki"), text: tr("The purchase panel reads in the order a buyer needs it: category, product name, one-line summary, price, colour, quantity, then Add to cart.", "Købspanelet læses i den rækkefølge, en køber har brug for: kategori, produktnavn, resumé på én linje, pris, farve, antal og til sidst Add to cart.") },
  { title: tr("Imagery and content balance", "Balance mellem billeder og indhold"), text: tr("The gallery takes the wider column, with four thumbnails and a “1 / 4” position label. The purchase panel takes the narrower one, so the product leads but the decision is never off-screen.", "Galleriet får den bredeste kolonne med fire miniaturer og en positionslabel “1 / 4”. Købspanelet får den smalleste, så produktet fører an, men beslutningen aldrig er uden for skærmen.") },
  { title: tr("Specifications", "Specifikationer"), text: tr("A two-column “What is inside” table groups eight specs as label–value pairs with right-aligned values, so one detail is quick to find.", "En tabel i to kolonner, “What is inside”, grupperer otte specifikationer som label–værdi-par med højrejusterede værdier, så en enkelt detalje er hurtig at finde.") },
  { title: tr("Purchase-action visibility", "Synlig købshandling"), text: tr("The button repeats the price (“Add to cart · $299”). Delivery, returns and warranty sit directly beneath it to answer the questions that usually come next.", "Knappen gentager prisen (“Add to cart · $299”). Levering, returnering og garanti står lige under den og besvarer de spørgsmål, der som regel kommer bagefter.") },
  { title: tr("Consistent navigation and spacing", "Konsistent navigation og afstande"), text: tr("The header, breadcrumb, footer and glass card treatment carry over from the landing page, so the product page clearly belongs to the same store.", "Header, brødkrummesti, footer og glaskort går igen fra landingssiden, så produktsiden tydeligt hører til samme butik.") },
];

const COMPARISON_POINTS = [
  { title: tr("Side-by-side structure", "Struktur side om side"), text: tr("Three cards repeat the same structure (image, name, one-line positioning, price, action), so the differences show up in the content rather than the layout.", "Tre kort gentager samme struktur (billede, navn, positionering på én linje, pris, handling), så forskellene viser sig i indholdet frem for i layoutet.") },
  { title: tr("A guided default", "Et guidet standardvalg"), text: tr("AURA X1 is marked “Our pick”, has a brighter outline and the only solid button, and its column is tinted in the table below. The other two models keep outlined buttons.", "AURA X1 er markeret “Our pick”, har en lysere kontur og den eneste udfyldte knap, og dens kolonne er tonet i tabellen nedenfor. De to andre modeller har knapper med kontur.") },
  { title: tr("Scanning and grouping", "Skimning og gruppering"), text: tr("The “Feature by feature” table keeps the card order across nine rows. Included and not-included rows pair a check or dash with a text label, so meaning never relies on the icon alone.", "Tabellen “Feature by feature” bevarer kortenes rækkefølge over ni rækker. Inkluderet og ikke inkluderet vises med et flueben eller en streg plus en tekstlabel, så betydningen aldrig kun afhænger af ikonet.") },
  { title: tr("Less friction when comparing", "Mindre friktion ved sammenligning"), text: tr("A “Show differences only” toggle sits above the table, and each card links to highlight its column. A closing banner, “Not sure? Start with AURA X1.”, gives undecided visitors a clear starting point.", "En “Show differences only”-toggle står over tabellen, og hvert kort linker til at fremhæve sin kolonne. Et afsluttende banner, “Not sure? Start with AURA X1.”, giver ubeslutsomme besøgende et klart udgangspunkt.") },
];

const CART_POINTS = [
  { title: tr("Why empty states matter", "Derfor betyder tomme tilstande noget"), text: tr("An empty cart is often reached by accident or after removing items. Instead of a blank page, it explains what happened and offers two ways forward: “Explore AURA X1” and “Compare models”.", "Man ender ofte i en tom kurv ved et uheld eller efter at have fjernet varer. I stedet for en blank side forklarer den, hvad der skete, og tilbyder to veje videre: “Explore AURA X1” og “Compare models”.") },
  { title: tr("Continuity between states", "Sammenhæng mellem tilstande"), text: tr("Both states keep the same header, page title, glass container and footer. Only the content inside changes, so the cart feels like the same place whether it is full or empty.", "Begge tilstande har samme header, sidetitel, glascontainer og footer. Kun indholdet ændrer sig, så kurven føles som samme sted, uanset om den er fyldt eller tom.") },
  { title: tr("Action hierarchy", "Hierarki for handlinger"), text: tr("Checkout is the only solid white button in the filled cart. Quantity steppers, Remove and the promo code field are quieter, and “Continue shopping” is a text link.", "Checkout er den eneste udfyldte hvide knap i den fyldte kurv. Antalsvælgere, Remove og feltet til rabatkode er mere afdæmpede, og “Continue shopping” er et tekstlink.") },
  { title: tr("Information clarity", "Klar information"), text: tr("Each line shows colour, unit price and line total. The order summary lists subtotal, shipping (“Calculated at checkout”) and tax before the total, so nothing appears unexpectedly later.", "Hver linje viser farve, stykpris og linjetotal. Ordreoversigten viser subtotal, fragt (“Calculated at checkout”) og moms før totalen, så intet dukker uventet op senere.") },
  { title: tr("Feedback and next steps", "Feedback og næste skridt"), text: tr("The cart badge in the header reflects the contents (2 in the filled state, none when empty), and a short note under Checkout says plainly that this is a concept checkout.", "Kurvens badge i headeren afspejler indholdet (2 i den fyldte tilstand, intet badge, når den er tom), og en kort note under Checkout siger klart, at det er en konceptcheckout.") },
];

const MOBILE_POINTS = [
  { title: tr("Navigation hierarchy", "Navigationshierarki"), text: tr("The five desktop links become full-width rows with chevrons. Cart and Account sit below a divider as a secondary group.", "De fem desktoplinks bliver til rækker i fuld bredde med pile. Cart og Account står under en skillelinje som en sekundær gruppe.") },
  { title: tr("Content priority", "Prioritering af indhold"), text: tr("The drawer covers most of the screen and dims the page behind it, so the menu is the only task in view.", "Skuffen dækker det meste af skærmen og dæmper siden bagved, så menuen er den eneste opgave i synsfeltet.") },
  { title: tr("Touch targets", "Touch-flader"), text: tr("Rows are tall and span the drawer’s width, the close button is a large circle, and “Buy AURA X1” is a full-width button at the bottom of the screen.", "Rækkerne er høje og fylder skuffens bredde, luk-knappen er en stor cirkel, og “Buy AURA X1” er en knap i fuld bredde nederst på skærmen.") },
  { title: tr("Discoverability", "Synlighed"), text: tr("Chevrons signal that each row leads somewhere, and the current section (Products) is marked with a lighter surface.", "Pilene signalerer, at hver række fører et sted hen, og den aktuelle sektion (Products) er markeret med en lysere flade.") },
  { title: tr("Consistent identity", "Konsistent identitet"), text: tr("The midnight ground, glass panel, Inter type and white pill button make the small screen unmistakably AURA.", "Den midnatsblå bund, glaspanelet, Inter-skriften og den hvide pilleknap gør den lille skærm umiskendeligt AURA.") },
];

const COMPONENT_GROUPS = [
  { num: '01', title: tr("Actions", "Handlinger"), text: tr("Primary, Secondary, Outline and Ghost buttons across default, hover, pressed, focus, disabled and loading. Three sizes (56, 48 and 40px) with leading or trailing icons, plus icon buttons. The sheet sets one rule: one Primary per view.", "Primary-, Secondary-, Outline- og Ghost-knapper i tilstandene default, hover, pressed, focus, disabled og loading. Tre størrelser (56, 48 og 40px) med ikoner foran eller bagved samt ikonknapper. Arket fastsætter én regel: én Primary pr. visning.") },
  { num: '02', title: tr("Navigation", "Navigation"), text: tr("Link states (default, hover, active, focus), search, cart with count and the menu icon open and closed, assembled into the desktop header.", "Linktilstande (default, hover, active, focus), søgning, kurv med antal og menuikonet åbent og lukket, samlet i desktop-headeren.") },
  { num: '03', title: tr("Inputs", "Inputfelter"), text: tr("Text and email fields in default, focus, error and disabled. The error pairs a red border with an icon and a message. Also search, checkbox, radio, toggle and a quantity stepper whose minus disables at 1.", "Tekst- og e-mailfelter i default, focus, error og disabled. Fejlen kombinerer en rød kant med et ikon og en besked. Desuden søgning, checkbox, radioknap, toggle og en antalsvælger, hvor minus deaktiveres ved 1.") },
  { num: '04', title: tr("Product", "Produkt"), text: tr("The colour selector with hover, selected, focus and disabled swatches, and a live label that names the chosen colour.", "Farvevælgeren med farveprøver i hover, selected, focus og disabled samt en live-label, der navngiver den valgte farve.") },
  { num: '05', title: tr("Feedback", "Feedback"), text: tr("Badges for six meanings, four alerts (info, success, warning, error), a toast, a spinner, a skeleton loader and an empty state.", "Badges med seks betydninger, fire beskeder (info, success, warning, error), en toast, en spinner, en skeleton loader og en tom tilstand.") },
  { num: '06', title: tr("Overlays", "Overlays"), text: tr("A sort dropdown, an explanatory popover and a confirmation modal for removing an item from the cart.", "En dropdown til sortering, en forklarende popover og en bekræftelsesmodal til at fjerne en vare fra kurven.") },
  { num: '07', title: tr("Cards", "Kort"), text: tr("Feature, product, specification, recommended-pick, gallery and review cards. The review card holds placeholder text, because real reviews should only appear once they exist.", "Kort til funktioner, produkter, specifikationer, anbefalet valg, galleri og anmeldelser. Anmeldelseskortet har pladsholdertekst, fordi rigtige anmeldelser først skal vises, når de findes.") },
];

const FOUNDATION_FACTS = [
  { title: tr("Colour and semantic intent", "Farve og semantisk betydning"), text: tr("Five brand colours (Midnight #080B18, Electric Violet #6D5DFB, Electric Blue #46C5FF, Ice #DCE7FF and White) and eight primitive scales from 50 to 950. On top sit 20 semantic tokens, such as text/muted, action/accent and focus/ring, each with a dark and a light value.", "Fem brandfarver (Midnight #080B18, Electric Violet #6D5DFB, Electric Blue #46C5FF, Ice #DCE7FF og White) og otte primitive skalaer fra 50 til 950. Ovenpå ligger 20 semantiske tokens, fx text/muted, action/accent og focus/ring, hver med en mørk og en lys værdi.") },
  { title: tr("Typography hierarchy", "Typografisk hierarki"), text: tr("Inter as the only family, in 14 named styles from display-xl (88/88, weight 600, −0.04em) to overline (12/16, 600, +0.16em). Hierarchy comes from size, three weights (400, 500, 600) and tracking.", "Inter som eneste skrifttype i 14 navngivne stilarter fra display-xl (88/88, vægt 600, −0.04em) til overline (12/16, 600, +0.16em). Hierarkiet kommer fra størrelse, tre vægte (400, 500, 600) og spatiering.") },
  { title: tr("Spacing rhythm", "Afstandsrytme"), text: tr("A 13-step scale from 4 to 128px. A 12-column desktop grid with 80px columns, 32px gutters and 64px margins, 8 columns on tablet and 4 on mobile.", "En skala med 13 trin fra 4 til 128px. Et desktopgrid med 12 kolonner på 80px, 32px mellemrum og 64px margener – 8 kolonner på tablet og 4 på mobil.") },
  { title: tr("Radius, glass and depth", "Radius, glas og dybde"), text: tr("Seven radius tokens from xs (4px) to pill, six glass strengths with defined fill, edge, blur and radius, and six elevation levels from ground to modal.", "Syv radiustokens fra xs (4px) til pill, seks glasstyrker med defineret fyld, kant, sløring og radius samt seks elevationsniveauer fra bund til modal.") },
  { title: tr("Contrast and readability", "Kontrast og læsbarhed"), text: tr("Text uses solid tokens rather than faded colour: white for primary, #CDD4E9 for secondary and #989EB2 for muted, on the midnight ground. Focus has its own blue ring, separate from the violet accent, so it stays visible on violet buttons.", "Teksten bruger dækkende farvetokens frem for falmede farver: hvid til primær, #CDD4E9 til sekundær og #989EB2 til dæmpet tekst på den midnatsblå bund. Fokus har sin egen blå ring adskilt fra den violette accent, så den forbliver synlig på violette knapper.") },
];

const KEY_DECISIONS = [
  { title: tr("Product-first hierarchy", "Produktet først i hierarkiet"), text: tr("The headphones get the largest, best-lit area on each product screen, so the product is understood before the copy is read.", "Hovedtelefonerne får det største og bedst belyste område på hver produktskærm, så produktet forstås, før teksten læses.") },
  { title: tr("Consistent interaction patterns", "Konsistente interaktionsmønstre"), text: tr("One solid white pill marks the primary action on every screen, so customers learn once where the next step is.", "Én udfyldt hvid pille markerer den primære handling på hver skærm, så kunderne kun skal lære én gang, hvor næste skridt er.") },
  { title: tr("Clear shopping states", "Tydelige shoppingtilstande"), text: tr("The cart is designed both filled and empty, so customers always know where they are and what to do next.", "Kurven er designet både fyldt og tom, så kunderne altid ved, hvor de er, og hvad de skal gøre nu.") },
  { title: tr("Cohesive visual foundations", "Sammenhængende visuelt fundament"), text: tr("Colour, type, spacing, glass and elevation are defined as tokens first, which keeps very different screens visually consistent.", "Farve, typografi, afstande, glas og elevation defineres først som tokens, hvilket holder meget forskellige skærme visuelt konsistente.") },
];

const DELIVERABLES = [
  tr("Desktop landing page", "Landingsside til desktop"),
  tr("Product details screen", "Skærm med produktdetaljer"),
  tr("Comparison screen", "Sammenligningsskærm"),
  tr("Cart and empty cart states", "Tilstande for kurv og tom kurv"),
  tr("Mobile navigation exploration", "Udforskning af mobilnavigation"),
  tr("Component library", "Komponentbibliotek"),
  tr("Design foundations", "Designfundament"),
];

const NEXT_STEPS = [
  tr("Mobile versions of the product, comparison and cart screens", "Mobilversioner af produkt-, sammenlignings- og kurvskærmene"),
  tr("Usability testing of the comparison table with real shoppers", "Brugertest af sammenligningstabellen med rigtige kunder"),
  tr("Measured contrast checks of every text token on each glass strength", "Målte kontrasttjek af hvert teksttoken på hver glasstyrke"),
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
              {open ? tr("Collapse", "Fold sammen") : tr("Show full design", "Vis hele designet")}
            </button>
          )}
          <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#6B7280] hover:text-white transition-colors">
            {tr("Full size", "Fuld størrelse")} <FaExternalLinkAlt style={{ fontSize: '9px' }} />
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
        aria-label={tr("Open the AURA prototype in Figma (all six screens shown)", "Åbn AURA-prototypen i Figma (alle seks skærme vist)")}
        className="group relative block overflow-hidden rounded-xl border border-[#1A1A1A]"
        style={{
          padding: '5%',
          background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(109,93,251,0.28), rgba(109,93,251,0) 70%), linear-gradient(135deg, #080B18 0%, #12182E 55%, #080B18 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <Tile src={landing} label={tr("Landing page", "Landingsside")} ratio="1440 / 1500" style={{ width: '35%' }} />
          <Tile src={mobileMenu} label={tr("Mobile navigation", "Mobilnavigation")} ratio="390 / 844" style={{ width: '14%', borderRadius: 'clamp(6px, 1.4vw, 18px)' }} />
          <div className="flex flex-col justify-between self-stretch" style={{ width: '23.5%' }}>
            <Tile src={productPage} label={tr("Product details", "Produktdetaljer")} ratio="1440 / 1100" />
            <Tile src={cartFull} label={tr("Cart", "Kurv")} ratio="1440 / 1104" />
          </div>
          <div className="flex flex-col justify-between self-stretch" style={{ width: '23.5%' }}>
            <Tile src={comparison} label={tr("Comparison", "Sammenligning")} ratio="1440 / 1100" />
            <Tile src={cartEmpty} label={tr("Empty cart", "Tom kurv")} ratio="1440 / 1048" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 bg-black/60">
          <span className="flex items-center gap-2 font-bold text-sm tracking-wide" style={{ color: '#FFFFFF' }}>
            <FaExternalLinkAlt style={{ fontSize: '12px' }} /> {tr("Prototype in Figma", "Prototype i Figma")}
          </span>
        </div>
      </a>
      <figcaption className="text-[13px] text-[#6B7280] leading-relaxed mt-3">
        {tr("All six screens: landing page, product details, comparison, cart, empty cart and mobile navigation. Each is shown in full further down.", "Alle seks skærme: landingsside, produktdetaljer, sammenligning, kurv, tom kurv og mobilnavigation. Hver af dem vises i fuld størrelse længere nede.")}
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
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("Premium Audio Shopping", "Premium lydshopping")}</p>
            <span className="text-[12px] font-medium px-2 py-1 rounded-md border border-[#222] text-[#9CA3AF]">Figma</span>
          </div>

          <nav className="flex-1 px-4 py-5" aria-label={tr("Project contents", "Projektets indhold")}>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#4B5563] mb-3 px-1">{tr("Contents", "Indhold")}</p>
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
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#4B5563] mb-1">{tr("Role", "Rolle")}</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">{tr("UI Designer", "UI-designer")}</p>
            </div>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#4B5563] mb-1">{tr("Type", "Type")}</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">{tr("Client project", "Kundeprojekt")}</p>
            </div>
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aura-cta flex items-center justify-center gap-2 w-full text-[13px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaExternalLinkAlt style={{ fontSize: '9px' }} /> {tr("View Prototype", "Se prototype")}
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* ── 01 INTRODUCTION ─────────────────────────────────────── */}
          <section id="intro" className="mb-28 scroll-mt-24">
            <SectionTag num="01" label={tr("Introduction", "Introduktion")} />
            <h1 className="text-[34px] sm:text-[48px] font-bold text-white leading-[1.08] tracking-[-0.03em] mb-6 max-w-[820px]">
              {tr("AURA — Designing a Premium Audio Shopping Experience", "AURA — Design af en premium shoppingoplevelse for lyd")}
            </h1>
            <Lead className="mb-10">
              {tr("AURA is an online store for a line of premium wireless headphones. It explores how visual storytelling, consistent interface patterns and clear shopping flows can work together, so a premium look supports the purchase instead of getting in its way.", "AURA er en webshop for en serie trådløse premium-hovedtelefoner. Projektet undersøger, hvordan visuel fortælling, konsistente interfacemønstre og klare shoppingflows kan arbejde sammen, så det eksklusive udtryk understøtter købet i stedet for at stå i vejen for det.")}
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
            <SectionTag num="02" label={tr("Project Overview", "Projektoversigt")} />
            <Heading>{tr("A store that sells a feeling, then gets out of the way", "En butik, der sælger en følelse – og så træder til side")}</Heading>
            <div className="space-y-5 mb-8">
              <Lead>
                {tr("AURA follows one product line (AURA Lite, AURA X1 and AURA X1 Pro) through the screens a shopper actually moves between: a landing page, a product page, a model comparison and the cart. Alongside the screens sit a component library and a set of design foundations that every screen is built from.", "AURA følger én produktserie (AURA Lite, AURA X1 og AURA X1 Pro) gennem de skærme, en kunde faktisk bevæger sig mellem: en landingsside, en produktside, en sammenligning af modellerne og kurven. Ved siden af skærmene ligger et komponentbibliotek og et designfundament, som hver skærm er bygget af.")}
              </Lead>
              <Lead>
                Premium audio is bought partly on emotion and partly on facts. The landing page has to make the product feel desirable; the product page and comparison have to make specifications, prices and differences easy to read. The interface needs to hold both modes without one undermining the other.
              </Lead>
            </div>
          </section>

          {/* ── 03 DESIGN CHALLENGE ─────────────────────────────────── */}
          <section id="challenge" className="mb-28 scroll-mt-24">
            <SectionTag num="03" label={tr("The Design Challenge", "Designudfordringen")} />
            <Heading>{tr("Three tensions that shaped the interface", "Tre spændinger, der formede interfacet")}</Heading>
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
                    <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-1.5">{tr("Direction", "Retning")}</p>
                    <p className="text-white text-[15px] leading-relaxed">{direction}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── 04 VISUAL DIRECTION ─────────────────────────────────── */}
          <section id="direction" className="mb-28 scroll-mt-24">
            <SectionTag num="04" label={tr("Visual Direction & Design Decisions", "Visuel retning & designbeslutninger")} />
            <Heading>{tr("A cinematic stage for one product", "En filmisk scene for ét produkt")}</Heading>
            <Lead className="mb-10">
              {tr("The landing page sets the visual language for the whole store. Each decision below pairs what is visible in the design with why it was made.", "Landingssiden sætter det visuelle sprog for hele butikken. Hver beslutning nedenfor kobler det, der ses i designet, med hvorfor det blev valgt.")}
            </Lead>
            <div className="mb-12">
              <Screen
                src={landing} w={1440} h={2368} peek={1300}
                alt={tr("AURA desktop landing page: the headline “Sound Beyond Reality”, a centred headphone render, three glass feature cards, a style selector bar with price and Add to cart, a six-card feature grid and the footer.", "AURAs landingsside til desktop: overskriften “Sound Beyond Reality”, hovedtelefoner i midten, tre funktionskort i glas, en stilvælgerbjælke med pris og Add to cart, et grid med seks funktionskort og footeren.")}
                caption={tr("Desktop landing page, 1440px. The hero, style selector and feature grid share one dark stage.", "Landingsside til desktop, 1440px. Hero, stilvælger og funktionsgrid deler én mørk scene.")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VISUAL_DECISIONS.map(({ title, what, why }) => (
                <article key={title} className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <h3 className="text-white text-[16px] font-semibold mb-4">{title}</h3>
                  <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-1">{tr("What you see", "Det, du ser")}</p>
                  <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-4">{what}</p>
                  <p className="text-[12px] uppercase tracking-[0.15em] mb-1" style={{ color: ACCENT }}>{tr("Why", "Hvorfor")}</p>
                  <p className="text-[#D1D5DB] text-[15px] leading-relaxed">{why}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── 05 PRODUCT DETAILS ──────────────────────────────────── */}
          <section id="product" className="mb-28 scroll-mt-24">
            <SectionTag num="05" label={tr("Product Discovery & Detail", "Produktopdagelse & detaljer")} />
            <Heading>{tr("Helping customers evaluate before they buy", "Hjælp kunderne med at vurdere, før de køber")}</Heading>
            <Lead className="mb-10">
              {tr("The product page moves from atmosphere to evidence. The layout keeps the product visible while bringing price, options and specifications within easy reach.", "Produktsiden går fra stemning til fakta. Layoutet holder produktet synligt og samtidig pris, valgmuligheder og specifikationer inden for rækkevidde.")}
            </Lead>
            <div className="mb-12">
              <Screen
                src={productPage} w={1440} h={2732} peek={1420}
                alt={tr("AURA X1 product details page: image gallery with thumbnails on the left, purchase panel with price, colour swatches, quantity and Add to cart on the right, followed by a specifications table and two feature stories.", "AURA X1-produktside: billedgalleri med miniaturer til venstre, købspanel med pris, farveprøver, antal og Add to cart til højre, efterfulgt af en specifikationstabel og to funktionshistorier.")}
                caption={tr("Product details, 1440px. Gallery and purchase panel above the fold; specifications and feature stories below.", "Produktdetaljer, 1440px. Galleri og købspanel over folden; specifikationer og funktionshistorier nedenunder.")}
              />
            </div>
            <Points items={PRODUCT_POINTS} />
          </section>

          {/* ── 06 COMPARISON ───────────────────────────────────────── */}
          <section id="comparison" className="mb-28 scroll-mt-24">
            <SectionTag num="06" label={tr("Comparison Experience", "Sammenligningsoplevelsen")} />
            <Heading>{tr("Making three models easy to tell apart", "Tre modeller, der er nemme at skelne fra hinanden")}</Heading>
            <Lead className="mb-10">
              {tr("Comparing products is where shoppers often stall. The comparison screen offers a quick answer at the top and the full detail underneath.", "Det er ofte ved sammenligningen, kunderne går i stå. Sammenligningsskærmen giver et hurtigt svar øverst og alle detaljer nedenunder.")}
            </Lead>
            <div className="mb-12">
              <Screen
                src={comparison} w={1440} h={2320} peek={1680}
                alt={tr("AURA comparison page: three model cards for AURA Lite, AURA X1 (marked Our pick) and AURA X1 Pro, followed by a feature-by-feature table and a recommendation banner.", "AURAs sammenligningsside: tre modelkort for AURA Lite, AURA X1 (markeret Our pick) og AURA X1 Pro, efterfulgt af en tabel funktion for funktion og et anbefalingsbanner.")}
                caption={tr("Model comparison, 1440px. Three cards for a quick choice, then a feature-by-feature table.", "Sammenligning af modeller, 1440px. Tre kort til et hurtigt valg og derefter en tabel funktion for funktion.")}
              />
            </div>
            <Points items={COMPARISON_POINTS} />
          </section>

          {/* ── 07 CART & STATES ────────────────────────────────────── */}
          <section id="cart" className="mb-28 scroll-mt-24">
            <SectionTag num="07" label={tr("Cart Experience & UI States", "Kurvoplevelsen & UI-tilstande")} />
            <Heading>{tr("Designing for every state of the cart", "Design til alle kurvens tilstande")}</Heading>
            <Lead className="mb-10">
              {tr("A cart is not one screen but several. I designed the filled and empty states together so they read as the same place.", "En kurv er ikke én skærm, men flere. Jeg designede den fyldte og den tomme tilstand sammen, så de opleves som samme sted.")}
            </Lead>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Screen
                src={cartFull} w={1440} h={1104}
                alt={tr("AURA cart with two items, AURA X1 and AURA X1 Pro, each with a quantity stepper and Remove link, beside an order summary with promo code and Checkout button.", "AURA-kurv med to varer, AURA X1 og AURA X1 Pro, hver med antalsvælger og Remove-link, ved siden af en ordreoversigt med rabatkode og Checkout-knap.")}
                caption={tr("Filled cart: line items on the left, order summary and Checkout on the right.", "Fyldt kurv: varelinjer til venstre, ordreoversigt og Checkout til højre.")}
              />
              <Screen
                src={cartEmpty} w={1440} h={1048}
                alt={tr("AURA empty cart: a bag icon, the message “Your cart is empty” and two buttons, Explore AURA X1 and Compare models.", "AURAs tomme kurv: et taskeikon, beskeden “Your cart is empty” og to knapper, Explore AURA X1 og Compare models.")}
                caption={tr("Empty cart: the same frame, with a clear message and two ways forward.", "Tom kurv: samme ramme med en tydelig besked og to veje videre.")}
              />
            </div>
            <Points items={CART_POINTS} />
          </section>

          {/* ── 08 RESPONSIVE ───────────────────────────────────────── */}
          <section id="responsive" className="mb-28 scroll-mt-24">
            <SectionTag num="08" label={tr("Responsive Thinking", "Responsiv tænkning")} />
            <Heading>{tr("Rethinking navigation for a 390px screen", "Navigationen gentænkt til en 390px-skærm")}</Heading>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,300px)_1fr] gap-10 lg:gap-14 items-start">
              <div className="w-full max-w-[300px] mx-auto md:mx-0">
                <Screen
                  src={mobileMenu} w={390} h={844}
                  alt={tr("AURA mobile navigation drawer at 390px: a Menu title with close button, five navigation rows with chevrons, Cart with a count badge, Account, and a full-width Buy AURA X1 button at the bottom.", "AURAs navigationsskuffe på mobil ved 390px: en Menu-titel med luk-knap, fem navigationsrækker med pile, Cart med et antalsbadge, Account og en Buy AURA X1-knap i fuld bredde nederst.")}
                  caption={tr("Mobile navigation drawer, 390px.", "Navigationsskuffe på mobil, 390px.")}
                />
              </div>
              <div>
                <Lead className="mb-8">
                  {tr("The desktop header holds five links, search, cart and a Buy now button. On a phone, that has to become a single, focused menu.", "Desktop-headeren har fem links, søgning, kurv og en Buy now-knap. På en telefon skal det blive til én fokuseret menu.")}
                </Lead>
                <Points items={MOBILE_POINTS} cols={1} />
                <div className="mt-8">
                  <Note>
                    {tr("This is one mobile state, exploring navigation. A complete responsive system would also need mobile versions of the product, comparison and cart screens.", "Dette er én mobiltilstand, der udforsker navigationen. Et komplet responsivt system ville også kræve mobilversioner af produkt-, sammenlignings- og kurvskærmene.")}
                  </Note>
                </div>
              </div>
            </div>
          </section>

          {/* ── 09 COMPONENT LIBRARY ────────────────────────────────── */}
          <section id="components" className="mb-28 scroll-mt-24">
            <SectionTag num="09" label={tr("Component Library", "Komponentbibliotek")} />
            <Lead className="mb-10">
              {tr("The component library collects every part that repeats across the screens, with its states drawn side by side. The sheet notes that names follow a Component / Variant / Size / State pattern, matching how the parts are organised in Figma.", "Komponentbiblioteket samler alle de dele, der går igen på tværs af skærmene, med deres tilstande tegnet side om side. Arket angiver, at navnene følger mønstret Component / Variant / Size / State, ligesom delene er organiseret i Figma.")}
            </Lead>
            <div className="mb-12">
              <Screen
                src={components} w={1440} h={3480} peek={1500}
                alt={tr("AURA component library sheet: button variants and states, navigation elements, form controls, colour selector, badges and alerts, dropdown, popover and modal, and a family of cards.", "AURAs ark med komponentbiblioteket: knapvarianter og -tilstande, navigationselementer, formularelementer, farvevælger, badges og beskeder, dropdown, popover og modal samt en familie af kort.")}
                caption={tr("Component library: actions, navigation, inputs, product selector, feedback, overlays and cards.", "Komponentbibliotek: handlinger, navigation, inputfelter, produktvælger, feedback, overlays og kort.")}
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
              <h3 className="text-white text-[18px] font-semibold mb-3">{tr("Why reusable parts matter", "Derfor betyder genanvendelige dele noget")}</h3>
              <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed max-w-[720px]">
                {tr("Every screen in this project reuses the same pieces: the white pill button, the glass card, the colour selector, the quantity stepper, the header. Defining their states once means a hover, focus or error looks the same wherever it appears, and a new screen can be assembled from known parts instead of drawn from scratch.", "Hver skærm i projektet genbruger de samme dele: den hvide pilleknap, glaskortet, farvevælgeren, antalsvælgeren og headeren. Når deres tilstande defineres én gang, ser hover, fokus og fejl ens ud, uanset hvor de optræder, og en ny skærm kan sættes sammen af kendte dele i stedet for at blive tegnet fra bunden.")}
              </p>
            </div>
            <Note>
              {tr("The sheet documents visual states. As an SVG export it does not, on its own, show how the components are constructed inside Figma.", "Arket dokumenterer de visuelle tilstande. Som SVG-eksport viser det ikke i sig selv, hvordan komponenterne er bygget op i Figma.")}
            </Note>
          </section>

          {/* ── 10 DESIGN FOUNDATIONS ───────────────────────────────── */}
          <section id="foundations" className="mb-28 scroll-mt-24">
            <SectionTag num="10" label={tr("Design Foundations", "Designfundament")} />
            <Heading>{tr("The decisions underneath every screen", "Beslutningerne under hver skærm")}</Heading>
            <Lead className="mb-10">
              {tr("The foundations sheet defines colour, type, spacing, glass and depth. In its own words: every value is a token, and every screen is built from these.", "Fundamentsarket definerer farve, typografi, afstande, glas og dybde. Med dets egne ord: Hver værdi er et token, og hver skærm er bygget af dem.")}
            </Lead>
            <div className="mb-12">
              <Screen
                src={foundations} w={1440} h={4434} peek={1500}
                alt={tr("AURA design foundations sheet: brand colours, primitive colour scales, semantic tokens for dark and light, the Inter type scale, spacing, grid and radius, six glass strengths and six elevation levels.", "AURAs ark med designfundamentet: brandfarver, primitive farveskalaer, semantiske tokens til mørk og lys, Inter-typografiskalaen, afstande, grid og radius, seks glasstyrker og seks elevationsniveauer.")}
                caption={tr("Design foundations: colour, typography, spacing and grid, glass and elevation.", "Designfundament: farve, typografi, afstande og grid, glas og elevation.")}
              />
            </div>
            <div className="mb-12">
              <Points items={FOUNDATION_FACTS} />
            </div>
            <div className="bg-[#111] border border-[#222] rounded-xl p-6 sm:p-8">
              <h3 className="text-white text-[18px] font-semibold mb-3">{tr("From foundations to components", "Fra fundament til komponenter")}</h3>
              <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed max-w-[720px]">
                The foundations explain the component library. The glass strengths become the card, navigation and modal surfaces; the elevation levels separate resting cards from menus and dialogs; and the type styles map onto headings, button labels and captions. When a component looks right, it is because it is drawing on these values, not on one-off choices.
              </p>
            </div>
          </section>

          {/* ── 11 KEY DECISIONS ────────────────────────────────────── */}
          <section id="decisions" className="mb-28 scroll-mt-24">
            <SectionTag num="11" label={tr("Key UI Design Decisions", "Vigtigste UI-designbeslutninger")} />
            <Heading>{tr("Four decisions that hold the project together", "Fire beslutninger, der holder projektet sammen")}</Heading>
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
            <SectionTag num="12" label={tr("Final Outcome & Reflection", "Endeligt resultat & refleksion")} />
            <Heading>{tr("What the project delivers", "Det leverer projektet")}</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
              <div>
                <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-4">{tr("Deliverables", "Leverancer")}</p>
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
                <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-4">{tr("Reflection", "Refleksion")}</p>
                <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed mb-4">
                  {tr("AURA shows how I approach UI design: start from the product and the decision the customer is making, then let the visual language support that decision.", "AURA viser, hvordan jeg griber UI-design an: Jeg starter med produktet og den beslutning, kunden skal træffe, og lader så det visuelle sprog understøtte beslutningen.")}
                </p>
                <p className="text-[#9CA3AF] text-[15px] sm:text-base leading-relaxed">
                  {tr("The dark, cinematic style is the most visible part of the project, but most of the work sits underneath it: a consistent action hierarchy, components drawn with their full set of states, and foundations that make every screen behave like part of one system.", "Den mørke, filmiske stil er den mest synlige del af projektet, men det meste af arbejdet ligger nedenunder: et konsistent hierarki for handlinger, komponenter tegnet med alle deres tilstande og et fundament, der får hver skærm til at opføre sig som en del af ét system.")}
                </p>
              </div>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6 sm:p-8 mb-16">
              <p className="text-[12px] uppercase tracking-[0.15em] text-[#6B7280] mb-1">{tr("Not yet done", "Endnu ikke lavet")}</p>
              <h3 className="text-white text-[18px] font-semibold mb-4">{tr("Where I would take it next", "Det ville jeg gøre som det næste")}</h3>
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
                {tr("Try AURA in Figma", "Prøv AURA i Figma")}
              </p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                {tr("Click through the AURA screens in the interactive Figma prototype.", "Klik dig gennem AURA-skærmene i den interaktive Figma-prototype.")}
              </p>
              <a
                href={PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aura-cta inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> {tr("Open Prototype", "Åbn prototype")}
              </a>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A]">
              <a href="/#work" className="flex items-center gap-2 text-[#6B7280] hover:text-white transition-colors text-[14px]">
                <FaArrowLeft style={{ fontSize: '11px' }} /> {tr("Back to Work", "Tilbage til projekter")}
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
