import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import pharmaChat from '../assets/pharma.png';
import dsFoundations from '../assets/01_Foundations.png';
import dsComponents from '../assets/02_Components.png';
import dsPatterns from '../assets/03_Patterns.png';
import dsLayout from '../assets/04_Layout.png';
import { tr } from '../context/LanguageContext';

const ACCENT = '#3CC4B4';   // lighter tint of the brand teal, readable on the dark page
const PROTOTYPE_URL = 'https://www.figma.com/proto/rJ5uZ8H61kQgZwPFsuAlK5/Untitled?node-id=10-361&t=gxN2o0fY8Y98rBHN-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A524';

// PharmaAI design tokens
const BRAND = {
  primary: '#147D75',
  bg:      '#F7FAF9',
  mint:    '#DDF2ED',
  text:    '#253B48',
  warning: '#EFB85C',
};

// ── Sidebar sections ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',        num: '01', label: tr("Hero", "Intro") },
  { id: 'overview',    num: '02', label: tr("Overview", "Oversigt") },
  { id: 'challenge',   num: '03', label: tr("Challenge & Goals", "Udfordring & mål") },
  { id: 'process',     num: '04', label: tr("Design Process", "Designproces") },
  { id: 'decisions',   num: '05', label: tr("UI Decisions", "UI-beslutninger") },
  { id: 'screens',     num: '06', label: tr("Key Screens", "Vigtigste skærme") },
  { id: 'system',      num: '07', label: tr("Design System", "Designsystem") },
  { id: 'responsible', num: '08', label: tr("Responsible AI", "Ansvarlig AI") },
  { id: 'final',       num: '09', label: tr("Final Design", "Endeligt design") },
  { id: 'reflection',  num: '10', label: tr("Reflection", "Refleksion") },
];

// ── Content data ──────────────────────────────────────────────────────────────
const GOALS = [
  {
    category: tr("Visual Goals", "Visuelle mål"),
    items: [
      tr("Create a calm, clinical visual language that feels trustworthy without feeling cold.", "Skabe et roligt, klinisk visuelt sprog, der føles troværdigt uden at virke koldt."),
      tr("Use colour with a clear meaning, with a single reserved colour for safety information.", "Bruge farver med en klar betydning – med én reserveret farve til sikkerhedsinformation."),
      tr("Establish a typographic hierarchy that makes dense medical content easy to scan.", "Etablere et typografisk hierarki, der gør tæt medicinsk indhold let at skimme."),
    ],
  },
  {
    category: tr("Interface Goals", "Mål for interfacet"),
    items: [
      tr("Present AI responses as structured cards with headings and numbered points, not as blocks of text.", "Præsentere AI-svar som strukturerede kort med overskrifter og nummererede punkter – ikke som tekstblokke."),
      tr("Give sources, limitations, and the pharmacist button a permanent, visible place in the layout.", "Give kilder, begrænsninger og farmaceut-knappen en fast, synlig plads i layoutet."),
      tr("Build one consistent component set and three-region layout that works across all eight screens.", "Bygge ét konsistent komponentsæt og et layout med tre områder, der fungerer på alle otte skærme."),
      tr("Define clear visual states for buttons, inputs, chips, and cards: default, hover, selected, focus, and disabled.", "Definere tydelige visuelle tilstande for knapper, inputfelter, chips og kort: standard, hover, valgt, fokus og deaktiveret."),
    ],
  },
];

const PROCESS = [
  {
    num: '01',
    title: tr("AI-assisted exploration", "AI-assisteret udforskning"),
    desc: tr("AI-assisted design tools were used early on to explore layout and visual directions quickly. This made it possible to compare several looks before committing to one, treating the generated output as a starting point rather than a finished design.", "AI-assisterede designværktøjer blev brugt tidligt til hurtigt at udforske layout og visuelle retninger. Det gjorde det muligt at sammenligne flere udtryk, før jeg valgte ét, og behandle det genererede som et udgangspunkt frem for et færdigt design."),
  },
  {
    num: '02',
    title: tr("Refinement in Figma", "Finpudsning i Figma"),
    desc: tr("The chosen direction was rebuilt and refined in Figma. Layout, spacing, typography, colour, and components were reworked by hand until the interface felt calm, consistent, and clinical.", "Den valgte retning blev genopbygget og finpudset i Figma. Layout, afstande, typografi, farver og komponenter blev omarbejdet i hånden, indtil interfacet føltes roligt, konsistent og klinisk."),
  },
  {
    num: '03',
    title: tr("Design system", "Designsystem"),
    desc: tr("The visual decisions were turned into a design system: colour, type, and spacing tokens, a component library with interactive states, product-specific patterns, and a desktop layout grid.", "De visuelle beslutninger blev omsat til et designsystem: tokens for farver, typografi og afstande, et komponentbibliotek med interaktive tilstande, produktspecifikke mønstre og et layoutgrid til desktop."),
  },
  {
    num: '04',
    title: tr("Screens & prototype", "Skærme & prototype"),
    desc: tr("The system was applied to all eight screens, which were then connected into a clickable Figma prototype to present the interface as a whole.", "Systemet blev anvendt på alle otte skærme, som derefter blev forbundet i en klikbar Figma-prototype, der præsenterer interfacet som en helhed."),
  },
];

const DECISIONS = [
  {
    icon: '▤',
    title: tr("Sidebar navigation", "Navigation i sidebar"),
    desc: tr("A white sidebar lists every main destination with a simple icon and label. \"New conversation\" is a filled teal button at the top, the active item is marked with a mint highlight, and Settings is set apart at the bottom below a divider.", "En hvid sidebar viser alle hovedområder med et enkelt ikon og en label. \"Ny samtale\" er en udfyldt petroleumsfarvet knap øverst, det aktive punkt er markeret med mintgrøn, og Indstillinger står for sig selv nederst under en skillelinje."),
  },
  {
    icon: '◫',
    title: tr("Three-region layout", "Layout med tre områder"),
    desc: tr("Sidebar, main content, and context panel sit side by side on a 1440px desktop grid. The context panel uses a soft tinted background so it reads as secondary to the conversation while still keeping references and the safety notice in view.", "Sidebar, hovedindhold og kontekstpanel står side om side på et 1440px desktopgrid. Kontekstpanelet har en blødt tonet baggrund, så det læses som sekundært i forhold til samtalen, men stadig holder referencer og sikkerhedsbeskeden synlige."),
  },
  {
    icon: '◐',
    title: tr("Colour with meaning", "Farve med betydning"),
    desc: tr("Teal marks the brand and primary actions, mint highlights the user's own messages and soft surfaces, and amber is reserved for safety information. Because amber is used nowhere else, a warning always reads as a warning.", "Petroleum markerer brandet og de primære handlinger, mint fremhæver brugerens egne beskeder og bløde flader, og ravgul er reserveret til sikkerhedsinformation. Fordi ravgul ikke bruges andre steder, læses en advarsel altid som en advarsel."),
  },
  {
    icon: 'Aa',
    title: tr("Typography & hierarchy", "Typografi & hierarki"),
    desc: tr("A clean sans-serif on a five-step scale: display (32), heading (24), section (18), body (16), and caption (12) for metadata such as timestamps and source labels. AI answers use a heading and a numbered list, so the key points can be scanned at a glance.", "En ren sans-serif på en skala med fem trin: display (32), overskrift (24), sektion (18), brødtekst (16) og billedtekst (12) til metadata som tidsstempler og kildelabels. AI-svar bruger en overskrift og en nummereret liste, så hovedpunkterne kan skimmes med ét blik."),
  },
];

const OTHER_SCREENS = [
  { title: tr("Dashboard", "Dashboard"),           desc: tr("The starting point of the workspace, giving an overview before a task begins.", "Arbejdsrummets udgangspunkt, der giver overblik, før en opgave begynder.") },
  { title: tr("Chat History", "Chathistorik"),        desc: tr("Previous conversations, so earlier questions and answers can be found and revisited.", "Tidligere samtaler, så tidligere spørgsmål og svar kan findes og genbesøges.") },
  { title: tr("Medication Library", "Lægemiddelbibliotek"),  desc: tr("A browsable library of medication reference information.", "Et søgbart bibliotek med referenceinformation om lægemidler.") },
  { title: tr("Drug Interactions", "Lægemiddelinteraktioner"),   desc: tr("A dedicated workflow for screening potential interactions between medications.", "Et dedikeret workflow til at tjekke mulige interaktioner mellem lægemidler.") },
  { title: tr("Clinical Guidelines", "Kliniske retningslinjer"), desc: tr("Access to clinical reference material and practice guidance.", "Adgang til klinisk referencemateriale og vejledning til praksis.") },
  { title: tr("Saved Items", "Gemte elementer"),         desc: tr("Saved responses and references, collected in one place.", "Gemte svar og referencer samlet ét sted.") },
  { title: tr("Settings", "Indstillinger"),            desc: tr("Workspace and account preferences.", "Indstillinger for arbejdsrum og konto.") },
];

const CHAT_ANNOTATIONS = [
  { num: '01', title: tr("Structured response card", "Struktureret svarkort"), desc: tr("The answer sits in a white card with a header, a divider, and numbered points in small mint markers. A mint \"Sources: 2\" badge in the header gives the references a clear visual presence.", "Svaret står i et hvidt kort med en header, en skillelinje og nummererede punkter i små mintgrønne markører. Et mintgrønt \"Kilder: 2\"-badge i headeren giver referencerne en tydelig visuel tilstedeværelse.") },
  { num: '02', title: tr("Suggested question chips", "Chips med foreslåede spørgsmål"), desc: tr("Rounded outline chips such as \"Side effects?\" and \"Interactions?\" sit below the answer in a lighter visual weight, so they offer a next step without competing with the response.", "Afrundede chips med kontur som \"Bivirkninger?\" og \"Interaktioner?\" står under svaret med en lettere visuel vægt, så de tilbyder et næste skridt uden at konkurrere med svaret.") },
  { num: '03', title: tr("Clinical context panel", "Klinisk kontekstpanel"),   desc: tr("A tinted side panel groups the selected medication, numbered reference cards, and the safety notice into a quieter secondary column.", "Et tonet sidepanel samler det valgte lægemiddel, nummererede referencekort og sikkerhedsbeskeden i en roligere sekundær kolonne.") },
  { num: '04', title: tr("Pharmacist button", "Farmaceut-knap"),        desc: tr("\"Consult a pharmacist\" uses the filled primary style at full panel width, giving it the strongest visual weight in the context panel.", "\"Kontakt en farmaceut\" bruger den udfyldte primære stil i panelets fulde bredde, hvilket giver den den stærkeste visuelle vægt i kontekstpanelet.") },
];

const DESIGN_SYSTEM = [
  {
    label: tr("Foundations", "Fundament"),
    desc: tr("Twelve colour tokens, including hover and pressed states for the primary teal and semantic colours for warning, danger, and success. A five-step type scale runs from 32px display to 12px caption, on spacing tokens from 4 to 32px and corner radii of 8, 12, 16, and 24px.", "Tolv farvetokens, herunder hover- og pressed-tilstande for den primære petroleumsfarve og semantiske farver til advarsel, fare og succes. En typografiskala med fem trin går fra 32px display til 12px billedtekst, på afstandstokens fra 4 til 32px og hjørneradier på 8, 12, 16 og 24px."),
    img: dsFoundations,
    alt: tr("PharmaAI foundations: colour palette, typography scale, spacing and radius tokens", "PharmaAI-fundament: farvepalet, typografiskala, afstands- og radiustokens"),
  },
  {
    label: tr("UI Components", "UI-komponenter"),
    desc: tr("Primary, secondary, outline, and disabled buttons; default, filled, and error inputs; status chips for active, reviewed, needs review, error, and AI-assisted content; sidebar navigation; and the default, hover, selected, and focus states shared across interactive elements.", "Primære, sekundære, kontur- og deaktiverede knapper; inputfelter i standard-, udfyldt- og fejltilstand; statuschips for aktivt, gennemgået, kræver gennemgang, fejl og AI-assisteret indhold; navigation i sidebar; og de standard-, hover-, valgt- og fokustilstande, der deles af de interaktive elementer."),
    img: dsComponents,
    alt: tr("PharmaAI UI components: buttons, form controls, chips, navigation and interactive states", "PharmaAI UI-komponenter: knapper, formularelementer, chips, navigation og interaktive tilstande"),
  },
  {
    label: tr("Product Patterns", "Produktmønstre"),
    desc: tr("Product-specific patterns built from those components: the chat bubble and AI response card with references, information cards for medications, guidelines, and saved conversations, clinical safety and success feedback, and the input composer with its verification reminder.", "Produktspecifikke mønstre bygget af disse komponenter: chatboblen og AI-svarkortet med referencer, informationskort til lægemidler, retningslinjer og gemte samtaler, klinisk feedback om sikkerhed og succes samt inputfeltet med påmindelsen om verificering."),
    img: dsPatterns,
    alt: tr("PharmaAI product patterns: chat components, information cards, safety feedback and input composer", "PharmaAI-produktmønstre: chatkomponenter, informationskort, sikkerhedsfeedback og inputfelt"),
  },
  {
    label: tr("Desktop Layout", "Desktoplayout"),
    desc: tr("A 1440 × 900 desktop artboard split into three regions: a sidebar of about 246px, a fluid main content area for the primary workflow, and a context panel of about 320px. Spacing follows an 8px base rhythm, with visible labels, focus, and status as accessibility conventions.", "Et desktop-artboard på 1440 × 900 delt i tre områder: en sidebar på cirka 246px, et flydende hovedområde til det primære workflow og et kontekstpanel på cirka 320px. Afstandene følger en basisrytme på 8px, med synlige labels, fokus og status som konventioner for tilgængelighed."),
    img: dsLayout,
    alt: tr("PharmaAI desktop layout: three-region grid and layout guidelines", "PharmaAI-desktoplayout: grid med tre områder og retningslinjer for layout"),
  },
];

const RESPONSIBLE_AI = [
  {
    label: tr("Source visibility", "Synlige kilder"),
    title: tr("Every answer shows its references", "Hvert svar viser sine referencer"),
    desc: tr("Sources are designed into the response card itself: a mint badge in the header shows the source count, numbered reference cards in the context panel list them by type, and a small caption under each answer labels the reference material as example content.", "Kilderne er designet ind i selve svarkortet: Et mintgrønt badge i headeren viser antallet af kilder, nummererede referencekort i kontekstpanelet viser dem efter type, og en lille tekst under hvert svar markerer referencematerialet som eksempelindhold."),
    examples: [tr("Sources: 2", "Kilder: 2"), tr("References panel", "Referencepanel"), tr("Reference materials · Example content only", "Referencemateriale · Kun eksempelindhold")],
  },
  {
    label: tr("Uncertainty warnings", "Advarsler om usikkerhed"),
    title: tr("Limitations are stated, not implied", "Begrænsninger står tydeligt – de antydes ikke"),
    desc: tr("The Clinical safety card is the only amber surface in the interface, with a warning icon and a bold final line: \"Verify before clinical use.\" The same message is repeated as small helper text inside the input composer.", "Det kliniske sikkerhedskort er den eneste ravgule flade i interfacet, med et advarselsikon og en fed sidste linje: \"Verificér før klinisk brug.\" Samme besked gentages som en lille hjælpetekst i inputfeltet."),
    examples: [tr("Clinical safety card", "Klinisk sikkerhedskort"), tr("AI responses require professional verification.", "AI-svar kræver faglig verificering."), tr("AI assisted label", "Label for AI-assisteret")],
  },
  {
    label: tr("Pharmacist review", "Farmaceutens gennemgang"),
    title: tr("The human expert stays in the loop", "Den menneskelige ekspert forbliver i loopet"),
    desc: tr("The response content ends with \"Refer patient-specific concerns to a pharmacist\", and the context panel closes with a full-width \"Consult a pharmacist\" button in the primary style, the most prominent action in that column.", "Svaret slutter med \"Henvis patientspecifikke spørgsmål til en farmaceut\", og kontekstpanelet afsluttes med en \"Kontakt en farmaceut\"-knap i fuld bredde i den primære stil – den mest fremtrædende handling i kolonnen."),
    examples: [tr("Consult a pharmacist", "Kontakt en farmaceut"), tr("Refer patient-specific concerns to a pharmacist", "Henvis patientspecifikke spørgsmål til en farmaceut")],
  },
  {
    label: tr("Scope & data", "Omfang & data"),
    title: tr("Clear about what the product is not", "Tydelig om, hvad produktet ikke er"),
    desc: tr("Small secondary-text captions state that no patient data is connected and label the interface as a concept, not a medical device. They are quiet in the visual hierarchy, but always present.", "Små sekundære tekster oplyser, at der ikke er tilknyttet patientdata, og markerer interfacet som et koncept – ikke medicinsk udstyr. De er diskrete i det visuelle hierarki, men altid til stede."),
    examples: [tr("No patient data connected", "Ingen patientdata tilknyttet"), tr("Concept UI · Not a medical device", "Koncept-UI · Ikke medicinsk udstyr")],
  },
];

const LEARNINGS = [
  { num: '01', title: tr("Trust can be designed visually", "Tillid kan designes visuelt"),           desc: tr("Sources, warnings, and the pharmacist button only build trust if they are seen when an answer is read. Giving them a fixed place in the layout, with their own colour and visual weight, became one of the main UI decisions in the concept.", "Kilder, advarsler og farmaceut-knappen skaber kun tillid, hvis de ses, når svaret læses. At give dem en fast plads i layoutet med egen farve og visuel vægt blev en af konceptets vigtigste UI-beslutninger.") },
  { num: '02', title: tr("AI is a fast start, not a finished design", "AI er en hurtig start, ikke et færdigt design"), desc: tr("AI-assisted tools made it quick to explore directions, but the result still needed careful work in Figma. Consistent spacing, a coherent component set, and colour that carries meaning all came from manual refinement.", "AI-assisterede værktøjer gjorde det hurtigt at udforske retninger, men resultatet krævede stadig omhyggeligt arbejde i Figma. Konsistente afstande, et sammenhængende komponentsæt og farver med betydning kom alle fra manuel finpudsning.") },
  { num: '03', title: tr("Restraint makes warnings work", "Tilbageholdenhed får advarsler til at virke"),            desc: tr("Reserving amber for safety information only, and keeping the rest of the palette calm, makes the warning stand out without making the interface feel alarming. Every colour that is used sparingly is easier to notice.", "Ved kun at bruge ravgul til sikkerhedsinformation og holde resten af paletten rolig, skiller advarslen sig ud, uden at interfacet virker alarmerende. En farve, der bruges sparsomt, er lettere at lægge mærke til.") },
];

const NEXT_STEPS = [
  { title: tr("Design the remaining states", "Design de resterende tilstande"),   desc: tr("Extend the screens with loading, empty, error, and low-confidence states, using the existing chips and feedback patterns.", "Udvid skærmene med tilstande for indlæsning, tom, fejl og lav sikkerhed ved hjælp af de eksisterende chips og feedbackmønstre.") },
  { title: tr("Contrast & accessibility pass", "Gennemgang af kontrast & tilgængelighed"), desc: tr("Check colour contrast, focus styles, and text sizes across all screens, with special attention to the amber warning surfaces and secondary text.", "Tjek farvekontrast, fokusstile og tekststørrelser på alle skærme med særlig opmærksomhed på de ravgule advarselsflader og den sekundære tekst.") },
  { title: tr("Tablet & smaller layouts", "Tablet & mindre layouts"),      desc: tr("Adapt the three-region layout to smaller screens, for example by collapsing the context panel into a drawer.", "Tilpas layoutet med tre områder til mindre skærme, fx ved at folde kontekstpanelet sammen til en skuffe.") },
  { title: tr("Grow the component library", "Udbyg komponentbiblioteket"),    desc: tr("Add components such as an inline source preview and visual severity indicators for drug interaction results.", "Tilføj komponenter som en indlejret kildeforhåndsvisning og visuelle alvorlighedsindikatorer til resultater for lægemiddelinteraktioner.") },
];

// ── Helper components ─────────────────────────────────────────────────────────

const SectionTag = ({ num, label }) => (
  <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>
    {num ? `${num} — ${label}` : label}
  </p>
);

const Card = ({ children, className = '', style = {} }) => (
  <div className={`bg-[#111] rounded-xl border border-[#222] ${className}`} style={style}>
    {children}
  </div>
);

const InsightCard = ({ label, children }) => (
  <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6">
    {label && (
      <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>{label}</p>
    )}
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="text-[13px] font-medium px-3 py-1 border rounded-full" style={{ color: ACCENT, borderColor: ACCENT + '44', background: ACCENT + '0D' }}>
    {children}
  </span>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function PharmaAI() {
  const [active, setActive] = useState('hero');

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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR ══════════════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div className="sticky flex flex-col" style={{ top: '80px', height: 'calc(100vh - 80px)' }}>

          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A] shrink-0">
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">PharmaAI</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("AI Healthcare Concept · UI Design", "AI-sundhedskoncept · UI-design")}</p>
            <div className="flex gap-2">
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#06171A', color: ACCENT, borderColor: ACCENT + '33' }}>Figma</span>
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#06171A', color: ACCENT, borderColor: ACCENT + '33' }}>{tr("Concept", "Koncept")}</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#1A2A2A] mb-3 px-1">{tr("Contents", "Indhold")}</p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, num, label }) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-lg text-left transition-all duration-150 group ${on ? 'bg-[#111]' : 'hover:bg-[#0D0D0D]'}`}
                    >
                      <span className="font-mono text-[12px] shrink-0 tabular-nums" style={{ color: on ? ACCENT : '#1F3030' }}>
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight truncate ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-3 rounded-full shrink-0" style={{ background: ACCENT }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3 shrink-0">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#1A2A2A] mb-1">{tr("Role", "Rolle")}</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">{tr("UI Designer", "UI-designer")}</p>
            </div>
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-[#0D1117] text-[13px] font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}
            >
              <FaExternalLinkAlt style={{ fontSize: '9px' }} /> {tr("View Prototype", "Se prototype")}
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* ── 01 HERO ──────────────────────────────────────────── */}
          <section id="hero" className="mb-20">
            <SectionTag num="01" label={tr("Hero", "Intro")} />
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">PharmaAI</h1>
            <p className="text-[18px] sm:text-[20px] text-[#6B7280] font-light mb-6">{tr("AI-powered pharmacy assistant. Sources visible. Pharmacists in the loop.", "AI-drevet apotekerassistent. Synlige kilder. Farmaceuter med i loopet.")}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {[tr("UI Design", "UI-design"), tr("Design System", "Designsystem"), tr("Healthcare", "Sundhed"), tr("AI Assistant", "AI-assistent"), tr("Desktop Web", "Desktop-web"), 'Figma'].map(tag => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>

            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-[#1A1A1A] overflow-hidden rounded-lg"
              style={{ background: BRAND.mint }}
            >
              <div className="p-4 sm:p-6">
                <img src={pharmaChat} alt={tr("PharmaAI AI Chatbot screen", "PharmaAI AI-chatbot-skærm")} className="w-full block rounded-md shadow-lg" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> {tr("Prototype in Figma", "Prototype i Figma")}
                </span>
              </div>
            </a>

            <p className="text-[#9CA3AF] leading-7 mt-8 text-lg">
              {tr("PharmaAI is a UI design concept for an AI-powered pharmacy assistant for healthcare professionals. The project focuses on the interface: a calm, clinical visual language, a complete design system, and a clear visual hierarchy that keeps sources, limitations, and the pharmacist in view on every answer.", "PharmaAI er et UI-designkoncept for en AI-drevet apotekerassistent til sundhedsprofessionelle. Projektet fokuserer på interfacet: et roligt, klinisk visuelt sprog, et komplet designsystem og et klart visuelt hierarki, der holder kilder, begrænsninger og farmaceuten synlige i hvert svar.")}
            </p>
          </section>

          {/* ── 02 OVERVIEW ──────────────────────────────────────── */}
          <section id="overview" className="mb-20">
            <SectionTag num="02" label={tr("Overview", "Oversigt")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("At a Glance", "Kort fortalt")}</h2>
            <Card className="divide-y divide-[#1A1A1A] mb-8">
              {[
                { field: 'Type',         value: tr("Independent concept project", "Selvstændigt konceptprojekt") },
                { field: tr("Role", "Rolle"),         value: tr("UI Designer", "UI-designer") },
                { field: 'Platform',     value: tr("Desktop Web Application", "Desktop-webapplikation") },
                { field: tr("Tools", "Værktøjer"),        value: tr("Figma · AI-assisted design tools", "Figma · AI-assisterede designværktøjer") },
                { field: 'Target users', value: tr("Healthcare professionals and pharmacy teams", "Sundhedsprofessionelle og apoteksteams") },
                { field: 'Category',     value: tr("Healthcare · AI · UI Design", "Sundhed · AI · UI-design") },
              ].map(({ field, value }) => (
                <div key={field} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 sm:w-32">{field}</p>
                  <p className="text-white text-[15px] font-medium">{value}</p>
                </div>
              ))}
              <div className="px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 sm:w-32 pt-1">{tr("Scope", "Omfang")}</p>
                  <div className="flex flex-wrap gap-2">
                    {[tr("UI Design", "UI-design"), tr("Visual Design", "Visuelt design"), tr("Design System", "Designsystem"), tr("Prototyping", "Prototyping")].map(r => (
                      <Pill key={r}>{r}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("An AI assistant in a clinical setting has to look trustworthy. Its interface needs to feel calm and precise, present dense medical information clearly, and make it visually obvious where an answer comes from and when a pharmacist should be involved.", "En AI-assistent i en klinisk sammenhæng skal se troværdig ud. Interfacet skal føles roligt og præcist, præsentere tæt medicinsk information klart og gøre det visuelt tydeligt, hvor et svar kommer fra, og hvornår en farmaceut bør inddrages.")}
            </p>
            <p className="text-[#9CA3AF] leading-7 text-lg">
              {tr("PharmaAI explores what that interface could look like. The concept covers eight desktop screens, from the dashboard and AI chatbot to the medication library, interaction screening, and clinical guidelines, all built on one shared design system.", "PharmaAI undersøger, hvordan et sådant interface kunne se ud. Konceptet dækker otte desktopskærme – fra dashboard og AI-chatbot til lægemiddelbibliotek, interaktionstjek og kliniske retningslinjer – alle bygget på ét fælles designsystem.")}
            </p>
          </section>

          {/* ── 03 CHALLENGE & GOALS ─────────────────────────────── */}
          <section id="challenge" className="mb-20">
            <SectionTag num="03" label={tr("Challenge & Goals", "Udfordring & mål")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">{tr("Making AI answers useful without making them look more certain than they are.", "At gøre AI-svar brugbare uden at få dem til at se mere sikre ud, end de er.")}</h2>

            <div className="mb-10">
              <InsightCard label={tr("Design Challenge", "Designudfordring")}>
                <p className="text-[#D1D5DB] text-[16px] leading-relaxed italic">
                  How might we design an interface for an AI pharmacy assistant that feels calm and trustworthy, presents medical information clearly, and makes sources, limitations, and pharmacist review a visible part of every answer?
                </p>
              </InsightCard>
            </div>

            <div className="space-y-6">
              {GOALS.map(({ category, items }) => (
                <div key={category}>
                  <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{category}</p>
                  <Card className="divide-y divide-[#1A1A1A]">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 px-5 py-4">
                        <span className="font-mono text-[12px] shrink-0 mt-1 tabular-nums" style={{ color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-[#9CA3AF] text-[15px] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* ── 04 DESIGN PROCESS ────────────────────────────────── */}
          <section id="process" className="mb-20">
            <SectionTag num="04" label={tr("Design Process", "Designproces")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("From AI-assisted exploration to Figma refinement", "Fra AI-assisteret udforskning til finpudsning i Figma")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("The project combined fast exploration with careful manual design. AI-assisted tools helped open up options early, and Figma was where the concept was turned into a consistent, usable interface.", "Projektet kombinerede hurtig udforskning med omhyggeligt manuelt design. AI-assisterede værktøjer hjalp med at åbne mulighederne tidligt, og i Figma blev konceptet omsat til et konsistent og brugbart interface.")}
            </p>

            <ul className="relative">
              {PROCESS.map(({ num, title, desc }, i) => (
                <li key={num} className="relative flex items-start gap-5 pb-8 last:pb-0">
                  {i < PROCESS.length - 1 && (
                    <span className="absolute left-[15px] top-9 bottom-0 w-px" style={{ background: ACCENT + '33' }} />
                  )}
                  <span
                    className="relative z-10 w-8 h-8 shrink-0 rounded-full border flex items-center justify-center font-mono text-[11px] font-bold"
                    style={{ color: ACCENT, borderColor: ACCENT + '66', background: '#06171A' }}
                  >
                    {num}
                  </span>
                  <div className="pt-1">
                    <p className="text-white text-[16px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[15px] leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 05 UI DECISIONS ──────────────────────────────────── */}
          <section id="decisions" className="mb-20">
            <SectionTag num="05" label={tr("UI Decisions", "UI-beslutninger")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("A calm, clinical workspace", "Et roligt, klinisk arbejdsrum")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("The interface needed to feel trustworthy and quiet, letting the content lead. Each decision below uses layout, colour, and type to keep the most important information visually prominent.", "Interfacet skulle føles troværdigt og roligt og lade indholdet føre an. Hver beslutning nedenfor bruger layout, farve og typografi til at holde den vigtigste information visuelt fremtrædende.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {DECISIONS.map(({ icon, title, desc }) => (
                <Card key={title} className="p-5 transition-colors duration-200 hover:border-[#2F4A47]">
                  <span className="text-lg mb-3 block font-semibold" style={{ color: ACCENT }}>{icon}</span>
                  <p className="text-white text-[15px] font-semibold mb-2">{title}</p>
                  <p className="text-[#6B7280] text-[15px] leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>

            <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                {tr("\"In a clinical tool, the most important information is not always the answer. Sometimes it is the source, or the reminder to ask a pharmacist.\"", "\"I et klinisk værktøj er den vigtigste information ikke altid svaret. Nogle gange er det kilden – eller påmindelsen om at spørge en farmaceut.\"")}
              </p>
            </blockquote>
          </section>

          {/* ── 06 KEY SCREENS ───────────────────────────────────── */}
          <section id="screens" className="mb-20">
            <SectionTag num="06" label={tr("Key Screens", "Vigtigste skærme")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("AI Chatbot", "AI-chatbot")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("The AI Chatbot is the core screen of PharmaAI and brings together most of the design system: the sidebar, message bubbles, the response card, chips, reference cards, the safety card, and the input composer.", "AI-chatbotten er PharmaAI's kerneskærm og samler det meste af designsystemet: sidebaren, beskedbobler, svarkortet, chips, referencekort, sikkerhedskortet og inputfeltet.")}
            </p>

            <div className="border border-[#E0E0E0] overflow-hidden mb-6 rounded-lg p-3" style={{ background: BRAND.bg }}>
              <img src={pharmaChat} alt={tr("PharmaAI AI Chatbot screen with structured response, references, and clinical safety notice", "PharmaAI AI-chatbot-skærm med struktureret svar, referencer og klinisk sikkerhedsbesked")} className="w-full block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {CHAT_ANNOTATIONS.map(({ num, title, desc }) => (
                <Card key={num} className="p-5">
                  <p className="font-mono text-[12px] mb-2" style={{ color: ACCENT }}>{num}</p>
                  <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-bold text-white mb-3">{tr("All Eight Screens", "Alle otte skærme")}</h3>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("The remaining seven screens share the same navigation, layout, and components. They can be explored in the interactive prototype.", "De øvrige syv skærme deler navigation, layout og komponenter. De kan udforskes i den interaktive prototype.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OTHER_SCREENS.map(({ title, desc }, i) => (
                <a
                  key={title}
                  href={PROTOTYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#111] rounded-xl border border-[#222] p-4 transition-colors duration-200 hover:border-[#2F4A47]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-[14px] font-semibold">
                      <span className="font-mono text-[12px] mr-2" style={{ color: ACCENT }}>{String(i + 2).padStart(2, '0')}</span>
                      {title}
                    </p>
                    <FaExternalLinkAlt className="text-[#333] group-hover:text-[#9CA3AF] transition-colors" style={{ fontSize: '10px' }} />
                  </div>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* ── 07 DESIGN SYSTEM ─────────────────────────────────── */}
          <section id="system" className="mb-20">
            <SectionTag num="07" label={tr("Design System", "Designsystem")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Design System & Components", "Designsystem & komponenter")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("A small, focused design system keeps all eight screens consistent. It is organised into four boards in Figma: foundations, UI components, product patterns, and desktop layout.", "Et lille, fokuseret designsystem holder alle otte skærme konsistente. Det er organiseret i fire boards i Figma: fundament, UI-komponenter, produktmønstre og desktoplayout.")}
            </p>

            <div className="space-y-4">
              {DESIGN_SYSTEM.map(({ label, desc, img, alt }) => (
                <div key={label} className="rounded-xl p-4 sm:p-6 border border-[#222]" style={{ background: '#DCEBE8' }}>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: BRAND.text }}>{label}</p>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: BRAND.text }}>{desc}</p>
                  <img src={img} alt={alt} className="w-full block rounded-lg" />
                </div>
              ))}
            </div>
          </section>

          {/* ── 08 RESPONSIBLE AI ────────────────────────────────── */}
          <section id="responsible" className="mb-20">
            <SectionTag num="08" label={tr("Responsible AI", "Ansvarlig AI")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Designing for trust, not blind reliance", "Design til tillid – ikke blind tiltro")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("In healthcare, an AI answer that looks confident but cannot be checked is a risk. PharmaAI treats transparency as part of the interface itself. These patterns are built into the AI Chatbot screen.", "I sundhedssektoren er et AI-svar, der ser sikkert ud, men ikke kan kontrolleres, en risiko. PharmaAI behandler gennemsigtighed som en del af selve interfacet. Disse mønstre er bygget ind i AI-chatbot-skærmen.")}
            </p>

            <div className="space-y-4">
              {RESPONSIBLE_AI.map(({ label, title, desc, examples }) => (
                <Card key={label} className="p-6">
                  <p className="text-[12px] font-mono uppercase tracking-widest mb-2" style={{ color: label === tr("Uncertainty warnings", "Advarsler om usikkerhed") ? BRAND.warning : ACCENT }}>{label}</p>
                  <p className="text-white font-semibold text-[16px] mb-2 leading-snug">{title}</p>
                  <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {examples.map(ex => (
                      <span key={ex} className="text-[12px] font-mono px-2 py-1 rounded border border-[#222] bg-[#0A0A0A] text-[#9CA3AF]">
                        {ex}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 09 FINAL DESIGN ──────────────────────────────────── */}
          <section id="final" className="mb-20">
            <SectionTag num="09" label={tr("Final Design", "Endeligt design")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Interactive Prototype", "Interaktiv prototype")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("The Figma prototype connects all eight screens, presenting the complete interface built on the PharmaAI design system.", "Figma-prototypen forbinder alle otte skærme og viser hele interfacet bygget på PharmaAI-designsystemet.")}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[tr("Dashboard", "Dashboard"), tr("AI Chatbot", "AI-chatbot"), tr("Chat History", "Chathistorik"), tr("Medication Library", "Lægemiddelbibliotek"), tr("Drug Interactions", "Lægemiddelinteraktioner"), tr("Clinical Guidelines", "Kliniske retningslinjer"), tr("Saved Items", "Gemte elementer"), tr("Settings", "Indstillinger")].map(s => (
                <span key={s} className="text-[12px] font-mono px-2.5 py-1 rounded border border-[#222] bg-[#111] text-[#9CA3AF]">{s}</span>
              ))}
            </div>
            <div className="border rounded-xl p-8 text-center" style={{ background: '#06171A', borderColor: ACCENT + '25' }}>
              <p className="text-[#9CA3AF] text-[15px] mb-6">{tr("Explore the complete PharmaAI concept in Figma.", "Udforsk hele PharmaAI-konceptet i Figma.")}</p>
              <a
                href={PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
                style={{ background: ACCENT, color: '#0D1117' }}
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> {tr("Open Prototype", "Åbn prototype")}
              </a>
            </div>
          </section>

          {/* ── 10 REFLECTION ────────────────────────────────────── */}
          <section id="reflection" className="mb-8">
            <SectionTag num="10" label={tr("Reflection", "Refleksion")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">{tr("Key Learnings", "Vigtigste læringer")}</h2>
            <div className="space-y-4 mb-16">
              {LEARNINGS.map(({ num, title, desc }) => (
                <Card key={num} className="p-6 sm:p-8">
                  <p className="text-3xl font-bold font-mono mb-2 leading-none" style={{ color: ACCENT, opacity: 0.35 }}>{num}</p>
                  <p className="text-white font-semibold text-[18px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-[15px] leading-7 max-w-2xl">{desc}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-[20px] font-semibold text-white mb-6">{tr("Next Steps", "Næste skridt")}</h3>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px] max-w-2xl">
              {tr("The interface could be taken further in several directions:", "Interfacet kan udvikles videre i flere retninger:")}
            </p>
            <ul className="mb-16">
              {NEXT_STEPS.map(({ title, desc }, i) => (
                <li key={title} className={`flex items-start gap-5 py-5 ${i < NEXT_STEPS.length - 1 ? 'border-b border-[#111]' : ''}`}>
                  <span className="font-mono text-[12px] shrink-0 mt-0.5 tabular-nums" style={{ color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[15px] leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-[20px] font-semibold text-white mb-6">{tr("Closing Reflection", "Afsluttende refleksion")}</h3>
            <div className="space-y-5 max-w-2xl">
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                {tr("PharmaAI started as a chat interface and became a project about visual trust. The most important UI work was not the chat bubbles themselves, but everything around them: how sources, warnings, and the pharmacist button are given colour, weight, and a fixed place in the layout.", "PharmaAI startede som et chatinterface og blev et projekt om visuel tillid. Det vigtigste UI-arbejde var ikke selve chatboblerne, men alt omkring dem: hvordan kilder, advarsler og farmaceut-knappen får farve, vægt og en fast plads i layoutet.")}
              </p>
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                {tr("Building the design system alongside the screens kept all eight screens consistent and made each new screen faster to design. As an independent concept, the project shows a visual direction rather than a finished product.", "At bygge designsystemet sideløbende med skærmene holdt alle otte skærme konsistente og gjorde hver ny skærm hurtigere at designe. Som et selvstændigt koncept viser projektet en visuel retning snarere end et færdigt produkt.")}
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-[#1A1A1A]">
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
