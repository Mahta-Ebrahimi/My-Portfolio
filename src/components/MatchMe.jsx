import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { getProjectNavigation } from '../data/projectNavigation';
import MatchMeComponent from '../assets/MatchMeComponent.png';
import MatchMeHIFI from '../assets/MatchMeHIFI.png';
import { tr } from '../context/LanguageContext';

const ACCENT = '#F472B6';

// ── Sidebar navigation (8 chapters) ──────────────────────────────────────────
const SECTIONS = [
  { id: 'overview',   num: '01', label: tr("Overview", "Oversigt") },
  { id: 'problem',    num: '02', label: tr("Problem", "Problem") },
  { id: 'research',   num: '03', label: tr("Research & Users", "Research & brugere") },
  { id: 'direction',  num: '04', label: tr("Design Direction", "Designretning") },
  { id: 'journey',    num: '05', label: tr("User Journey", "Brugerrejse") },
  { id: 'process',    num: '06', label: tr("Design Process", "Designproces") },
  { id: 'solution',   num: '07', label: tr("Final Solution", "Endelig løsning") },
  { id: 'reflection', num: '08', label: tr("Reflection", "Refleksion") },
];

// ── Data ──────────────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    name: 'Lena', age: '34', role: tr("Working parent · Needs reliable help", "Udearbejdende forælder · Har brug for pålidelig hjælp"),
    goals: [tr("Find a trusted babysitter or tutor fast", "Hurtigt finde en betroet babysitter eller lektiehjælper"), tr("See compatibility scores with clear reasoning behind each match", "Se kompatibilitetsscorer med en klar begrundelse bag hvert match"), tr("Book and pay in one flow without back-and-forth", "Booke og betale i ét flow uden frem og tilbage")],
    pain: [tr("Generic platforms show everyone — no intelligent filtering", "Generiske platforme viser alle – ingen intelligent filtrering"), tr("No way to know if a helper actually fits her schedule and needs", "Ingen måde at vide, om en hjælper faktisk passer til hendes skema og behov"), tr("Wasted time on interviews that lead nowhere", "Spildt tid på samtaler, der ikke fører nogen steder hen")],
  },
  {
    name: 'Karim', age: '29', role: tr("Freelancer · Looking for home & fitness services", "Freelancer · Søger hjemme- og fitnessydelser"),
    goals: [tr("One platform to find cleaners, trainers, and handymen", "Én platform til at finde rengøringshjælp, trænere og håndværkere"), tr("AI that understands his preferences without long forms", "AI, der forstår hans præferencer uden lange formularer"), tr("Transparent reviews and AI-summarised helper profiles", "Gennemsigtige anmeldelser og hjælperprofiler opsummeret af AI")],
    pain: [tr("Switches between 5 different apps for different services", "Skifter mellem 5 forskellige apps til forskellige ydelser"), tr("Can't tell from a profile if the helper is a real fit", "Kan ikke se ud fra en profil, om hjælperen reelt passer"), tr("Booking feels manual and disconnected", "Booking føles manuel og usammenhængende")],
  },
];

const PRINCIPLES = [
  { icon: '🤖', title: tr("AI-first onboarding", "AI-first-onboarding"),     desc: tr("A short AI quiz builds a user preference profile — no manual filters needed", "En kort AI-quiz opbygger en præferenceprofil – ingen manuelle filtre nødvendige") },
  { icon: '🎯', title: tr("Best-fit scoring", "Best-fit-scoring"),         desc: tr("Every helper gets an AI compatibility score unique to each user's needs", "Hver hjælper får en AI-kompatibilitetsscore, der er unik for den enkelte brugers behov") },
  { icon: '◎',  title: tr("Transparent AI decisions", "Gennemsigtige AI-beslutninger"), desc: tr("Users see why the AI recommended a match — not just who", "Brugerne ser, hvorfor AI'en anbefalede et match – ikke kun hvem") },
  { icon: '⊞',  title: tr("One flow end-to-end", "Ét flow fra start til slut"),      desc: tr("Search, match, book, pay, and message — all in one place", "Søg, match, book, betal og skriv – alt sammen ét sted") },
];

const AI_FEATURES = [
  { icon: '🤖', title: tr("AI Onboarding Quiz", "AI-onboarding-quiz"),          desc: tr("Conversational quiz builds a preference model in under 2 minutes — no manual filter setup", "En samtalebaseret quiz opbygger en præferencemodel på under 2 minutter – uden manuel opsætning af filtre") },
  { icon: '🧠', title: tr("Mood & Personality Matching", "Matchning af humør & personlighed"),  desc: tr("AI analyses helper personality from profile data and matches it to the user's communication style", "AI analyserer hjælperens personlighed ud fra profildata og matcher den med brugerens kommunikationsstil") },
  { icon: '⭐', title: tr("Best-Fit Scoring", "Best-fit-scoring"),             desc: tr("Each helper is scored 0–100% for compatibility based on location, availability, skills, and personality fit", "Hver hjælper får en kompatibilitetsscore på 0–100 % baseret på beliggenhed, tilgængelighed, kompetencer og personlighed") },
  { icon: '💬', title: tr("AI Conversation Assistant", "AI-samtaleassistent"),    desc: tr("In-chat AI helps users write their first message and suggests follow-up questions", "AI i chatten hjælper brugerne med at skrive deres første besked og foreslår opfølgende spørgsmål") },
  { icon: '📋', title: tr("AI Profile Summaries", "AI-profilresuméer"),         desc: tr("AI generates a short, plain-language summary of each helper so users don't have to read everything", "AI laver et kort resumé i almindeligt sprog af hver hjælper, så brugerne ikke skal læse det hele") },
  { icon: '🔍', title: tr("Smart Recommendations", "Smarte anbefalinger"),        desc: tr("AI surfaces helpers the user hasn't searched for but are statistically likely to be a strong match", "AI fremhæver hjælpere, som brugeren ikke har søgt efter, men som statistisk sandsynligvis er et stærkt match") },
];

const STANDARD_FEATURES = [
  { icon: '🗺️', title: tr("Map & Search", "Kort & søgning"),    desc: tr("Filter by distance, availability, service type, and price", "Filtrér efter afstand, tilgængelighed, servicetype og pris") },
  { icon: '📅', title: tr("Calendar Booking", "Kalenderbooking"), desc: tr("Real-time availability with instant or request-based booking", "Tilgængelighed i realtid med øjeblikkelig booking eller booking på forespørgsel") },
  { icon: '💬', title: tr("Messaging", "Beskeder"),        desc: tr("Built-in chat with read receipts and AI conversation prompts", "Indbygget chat med læsekvitteringer og AI-samtaleforslag") },
  { icon: '💳', title: tr("Integrated Payments", "Integrerede betalinger"), desc: tr("Secure payment, receipts, and tip — no cash, no third-party tools", "Sikker betaling, kvitteringer og drikkepenge – ingen kontanter, ingen tredjepartsværktøjer") },
];

const LEARNINGS = [
  { num: '01', title: tr("AI needs to explain itself", "AI skal forklare sig selv"),    desc: tr("Users trusted AI recommendations significantly more when the UI surfaced the reason — \"matched because: same area, evening availability, 4.9 stars with families.\" Opacity kills adoption.", "Brugerne havde markant mere tillid til AI-anbefalingerne, når UI'et viste begrundelsen – \"matchet fordi: samme område, ledig om aftenen, 4,9 stjerner hos familier.\" Uigennemsigtighed dræber adoptionen.") },
  { num: '02', title: tr("The quiz replaces all filters", "Quizzen erstatter alle filtre"), desc: tr("A 5-question AI onboarding quiz produced better matches than manual filter UIs. Users felt guided rather than overwhelmed — and the AI model had richer data to work with.", "En AI-onboarding-quiz med 5 spørgsmål gav bedre match end manuelle filter-UI'er. Brugerne følte sig guidet frem for overvældet – og AI-modellen fik rigere data at arbejde med.") },
  { num: '03', title: tr("Universal beats vertical", "Universel slår vertikal"),      desc: tr("Designing one matching model for all service types — not separate apps — forced a smarter AI layer. The same preference engine that finds a babysitter finds a fitness trainer, just with different scoring weights.", "At designe én matchningsmodel til alle typer ydelser – i stedet for separate apps – krævede et smartere AI-lag. Den samme præferencemotor, der finder en babysitter, finder også en fitnesstræner, blot med andre vægte i scoringen.") },
];

const JOURNEY_STEPS = [
  { step: '01', label: tr("Need Help", "Brug for hjælp"),         desc: tr("User recognises a need — childcare, a home service, or fitness support.", "Brugeren erkender et behov – børnepasning, hjælp i hjemmet eller fitnessstøtte.") },
  { step: '02', label: tr("Describe the Need", "Beskriv behovet"), desc: tr("A short AI onboarding quiz captures preferences, schedule, and personality in under 2 minutes.", "En kort AI-onboarding-quiz indfanger præferencer, skema og personlighed på under 2 minutter.") },
  { step: '03', label: tr("Receive Matches", "Modtag match"),   desc: tr("AI returns a ranked match feed with best-fit scores and plain-language reasoning.", "AI returnerer et rangeret matchfeed med best-fit-scorer og begrundelser i almindeligt sprog.") },
  { step: '04', label: tr("Compare Helpers", "Sammenlign hjælpere"),   desc: tr("User views AI-summarised profiles and compatibility details side by side.", "Brugeren ser AI-opsummerede profiler og kompatibilitetsdetaljer side om side.") },
  { step: '05', label: tr("Book", "Book"),              desc: tr("Real-time calendar availability — instant confirmation or request-based booking.", "Kalendertilgængelighed i realtid – øjeblikkelig bekræftelse eller booking på forespørgsel.") },
  { step: '06', label: tr("Message", "Skriv"),           desc: tr("Built-in chat launches with AI conversation prompts to help users get started.", "Den indbyggede chat åbner med AI-samtaleforslag, der hjælper brugerne i gang.") },
  { step: '07', label: tr("Complete Service", "Ydelsen fuldføres"),  desc: tr("Helper completes the job; user confirms completion in MatchMe.", "Hjælperen udfører opgaven, og brugeren bekræfter i MatchMe, at den er udført.") },
  { step: '08', label: tr("Review", "Anmeld"),            desc: tr("User rates the helper; the AI preference model updates for future matches.", "Brugeren bedømmer hjælperen, og AI'ens præferencemodel opdateres til fremtidige match.") },
];

// ── Shared components ─────────────────────────────────────────────────────────
const SectionTag = ({ num, label }) => (
  <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>
    {num} — {label}
  </p>
);

const SubLabel = ({ children }) => (
  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-3">
    {children}
  </p>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#111] rounded-xl p-5 flex gap-4 items-start border border-[#222]">
    <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
    <div>
      <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
      <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function MatchMe() {
  const location = useLocation();
  const [active, setActive] = useState('overview');
  const { prev, next } = getProjectNavigation(location.pathname);

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
    <div className="flex bg-black min-h-screen" style={{ paddingTop: '80px' }}>

      {/* ═══ SIDEBAR ═══════════════════════════════════════════════ */}
      <div className="hidden lg:block w-[200px] shrink-0 bg-[#080808] border-r border-[#1A1A1A]">
        <div
          className="sticky flex flex-col overflow-y-auto"
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          {/* Project identity */}
          <div className="px-5 pt-6 pb-5 border-b border-[#1A1A1A]">
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">MatchMe</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("AI Matchmaking", "AI-matchmaking")}</p>
            <div className="flex gap-2">
              <span
                className="text-[12px] font-medium px-2 py-1 rounded-md border"
                style={{ background: '#2D0A1A', color: ACCENT, borderColor: `${ACCENT}33` }}
              >
                Figma
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#2D1220] mb-3 px-1">
              {tr("Contents", "Indhold")}
            </p>
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, num, label }) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-3 px-2 py-[7px] rounded-lg text-left transition-all duration-150 group ${on ? 'bg-[#111]' : 'hover:bg-[#0D0D0D]'}`}
                    >
                      <span
                        className="font-mono text-[12px] shrink-0 tabular-nums"
                        style={{ color: on ? ACCENT : '#2D1220' }}
                      >
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && (
                        <div
                          className="ml-auto w-[3px] h-4 rounded-full shrink-0"
                          style={{ backgroundColor: ACCENT }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Meta + CTA */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-4">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2D1220] mb-1">{tr("Role", "Rolle")}</p>
              <p className="text-[13px] text-[#9CA3AF] leading-tight">{tr("UI/UX Designer", "UI/UX-designer")}</p>
            </div>
            <a
              href="https://www.figma.com/proto/cGnfgwa8uCDZeKk6yCyURy/Match-Me?node-id=1-2208&viewport=1060%2C-1165%2C0.19&t=xOfO6RXWl1PniIrH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2208&page-id=0%3A1&show-proto-sidebar=1"
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

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* ── 01 OVERVIEW ─────────────────────────────────────────── */}
          <section id="overview" className="mb-24">
            <SectionTag num="01" label={tr("Overview", "Oversigt")} />
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">MatchMe</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">{tr("Local service help is scattered across platforms and hard to evaluate.", "Hjælp til lokale serviceopgaver er spredt over mange platforme og svær at vurdere.")}</p>

            <a
              href="https://www.figma.com/proto/cGnfgwa8uCDZeKk6yCyURy/Match-Me?node-id=1-2208&viewport=1060%2C-1165%2C0.19&t=xOfO6RXWl1PniIrH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2208&page-id=0%3A1&show-proto-sidebar=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden mb-8 bg-[#F0F0F0] p-3"
            >
              <img src={MatchMeHIFI} alt={tr("MatchMe Desktop Interface", "MatchMe desktop-interface")} className="w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> {tr("Prototype in Figma", "Prototype i Figma")}
                </span>
              </div>
            </a>

            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("MatchMe is a desktop web marketplace where people find local service providers — babysitters, cleaners, personal trainers, and more — with AI-assisted compatibility matching. The design challenge was making the right choice feel obvious before a user reads a single profile: surfacing ranked helpers with clear reasoning behind each result. Delivered as a full end-to-end Figma prototype from problem framing to high-fidelity screens.", "MatchMe er en webbaseret markedsplads til desktop, hvor man finder lokale serviceudbydere – babysittere, rengøringshjælp, personlige trænere og meget mere – med AI-assisteret kompatibilitetsmatchning. Designudfordringen var at gøre det rigtige valg indlysende, før brugeren har læst en eneste profil: ved at vise rangerede hjælpere med en klar begrundelse bag hvert resultat. Leveret som en komplet end-to-end-prototype i Figma fra problemformulering til high-fidelity-skærme.")}
            </p>

            {/* Project metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: tr("Role", "Rolle"),     value: tr("UI/UX Designer", "UI/UX-designer") },
                { label: tr("Type", "Type"),     value: tr("Concept Project", "Konceptprojekt") },
                { label: tr("Platform", "Platform"), value: tr("Desktop Web App", "Desktop-webapp") },
                { label: tr("Tool", "Værktøj"),     value: 'Figma' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#111] rounded-xl p-4 border border-[#222]">
                  <p className="text-[12px] uppercase tracking-wider text-[#374151] mb-1">{label}</p>
                  <p className="text-white text-[14px] font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Project statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '10+', label: tr("Service Categories", "Servicekategorier") },
                { value: '6',   label: tr("AI Features", "AI-funktioner") },
                { value: '1',   label: tr("Clickable Prototype", "Klikbar prototype") },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-3xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-[13px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 PROBLEM ──────────────────────────────────────────── */}
          <section id="problem" className="mb-24">
            <SectionTag num="02" label={tr("Problem", "Problem")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              {tr("The burden of finding the right helper falls entirely on the user.", "Byrden ved at finde den rette hjælper ligger helt hos brugeren.")}
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>{tr("Current Situation", "Nuværende situation")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  {tr("People regularly need different kinds of help — childcare, home maintenance, fitness, elder care — but each category lives on a separate platform with its own search logic and onboarding. Finding help across multiple needs means starting from scratch each time, in a different place.", "Folk har jævnligt brug for forskellige former for hjælp – børnepasning, vedligeholdelse af hjemmet, fitness, ældrepleje – men hver kategori ligger på sin egen platform med sin egen søgelogik og onboarding. At finde hjælp til flere behov betyder, at man starter forfra hver gang – et nyt sted.")}
                </p>
              </div>

              <div>
                <SubLabel>{tr("Core Problem", "Kerneproblem")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  {tr("Profiles show ratings, availability, and location — but not whether a helper's schedule, communication style, or approach fits a specific person's needs. Users invest time reaching out to helpers who turn out not to match. The friction is not finding options. It is knowing which option is right.", "Profilerne viser bedømmelser, tilgængelighed og beliggenhed – men ikke om en hjælpers skema, kommunikationsstil eller tilgang passer til en bestemt persons behov. Brugerne bruger tid på at kontakte hjælpere, der viser sig ikke at matche. Friktionen ligger ikke i at finde muligheder. Den ligger i at vide, hvilken mulighed der er den rigtige.")}
                </p>
              </div>

              <div>
                <SubLabel>{tr("Opportunity", "Mulighed")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  {tr("A desktop web marketplace that assesses compatibility before the user scrolls through a single result could remove most of that uncertainty. A short preference-building step and a ranking model that explains its reasoning reduce the gap between recognising a need and making a confident booking.", "En webbaseret markedsplads, der vurderer kompatibiliteten, før brugeren har scrollet gennem et eneste resultat, kunne fjerne det meste af den usikkerhed. Et kort trin, der opbygger præferencer, og en rangeringsmodel, der forklarer sin begrundelse, mindsker afstanden mellem at erkende et behov og at booke med sikkerhed.")}
                </p>
              </div>

              <div>
                <SubLabel>{tr("Design Challenge", "Designudfordring")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-lg">
                  {tr("The core question was how to make AI-assisted recommendations feel transparent rather than arbitrary. Compatibility reasoning had to be visible and specific enough to act on — without turning the interface into a scorecard.", "Det centrale spørgsmål var, hvordan AI-assisterede anbefalinger kunne føles gennemsigtige frem for tilfældige. Begrundelsen for kompatibiliteten skulle være synlig og konkret nok til at handle på – uden at gøre interfacet til et pointskema.")}
                </p>
              </div>
            </div>

            <blockquote className="border-l-[3px] pl-6 py-1 mt-10" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                {tr("\"The goal wasn't to build a better directory. It was to remove the search entirely.\"", "\"Målet var ikke at bygge et bedre katalog. Det var at fjerne søgningen helt.\"")}
              </p>
            </blockquote>
          </section>

          {/* ── 03 RESEARCH & USERS ─────────────────────────────────── */}
          <section id="research" className="mb-24">
            <SectionTag num="03" label={tr("Research & Users", "Research & brugere")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              {tr("Who Needs MatchMe", "Hvem har brug for MatchMe")}
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>{tr("Research Approach", "Researchtilgang")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 text-base">
                  {tr("This project began with problem space exploration rather than formal primary research. Competitor platforms were reviewed, and recurring patterns — category fragmentation, time pressure, and the difficulty of assessing helper fit from profiles alone — shaped the user types and design priorities.", "Projektet begyndte med en udforskning af problemfeltet frem for formel primær research. Konkurrerende platforme blev gennemgået, og tilbagevendende mønstre – opsplitning i kategorier, tidspres og vanskeligheden ved at vurdere en hjælper alene ud fra profilen – formede brugertyperne og designprioriteterne.")}
                </p>
              </div>

              <div>
                <SubLabel>{tr("Research Objectives", "Researchmål")}</SubLabel>
                <ul className="space-y-2">
                  {[
                    tr("Who needs personal service help and how they currently find it.", "Hvem der har brug for personlig servicehjælp, og hvordan de finder den i dag."),
                    tr("What information is absent from existing platforms that prevents confident booking.", "Hvilke oplysninger der mangler på eksisterende platforme og forhindrer en sikker booking."),
                    tr("What would make a user trust an AI-assisted recommendation.", "Hvad der ville få en bruger til at stole på en AI-assisteret anbefaling."),
                    tr("How service needs vary across categories.", "Hvordan behovene varierer på tværs af kategorier."),
                  ].map((item) => (
                    <li key={item} className="text-[#9CA3AF] text-base flex gap-3 leading-snug">
                      <span className="shrink-0 mt-0.5" style={{ color: ACCENT }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SubLabel>{tr("Key Insights", "Vigtigste indsigter")}</SubLabel>
                <div className="space-y-3">
                  {[
                    {
                      title: tr("Users want to be matched, not to search", "Brugerne vil matches, ikke søge"),
                      desc: tr("Users want to be told who is right for them — not presented with a list to evaluate themselves. The burden of filtering belongs to the system.", "Brugerne vil have at vide, hvem der passer til dem – ikke have en liste, de selv skal vurdere. Byrden ved at filtrere hører til systemet."),
                    },
                    {
                      title: tr("Trust in a recommendation depends on its explanation", "Tillid til en anbefaling afhænger af forklaringen"),
                      desc: tr("Users only act on a recommendation when they understand why it was made. Compatibility reasoning needs to be visible — not implied by a score.", "Brugerne handler kun på en anbefaling, når de forstår, hvorfor den blev givet. Begrundelsen for kompatibiliteten skal være synlig – ikke blot antydet af en score."),
                    },
                    {
                      title: tr("Service needs cross multiple categories", "Behovene går på tværs af flere kategorier"),
                      desc: tr("A single user may need childcare, home maintenance, and fitness help at different times. No existing platform handles more than one of these categories well.", "Den samme bruger kan have brug for børnepasning, vedligeholdelse af hjemmet og fitnesshjælp på forskellige tidspunkter. Ingen eksisterende platform håndterer mere end én af disse kategorier godt."),
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-5">
                      <p className="text-white text-[14px] font-semibold mb-1.5">{title}</p>
                      <p className="text-[#9CA3AF] text-base leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>{tr("Target Users", "Målgruppe")}</SubLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PERSONAS.map(({ name, age, role, goals, pain }) => (
                    <div key={name} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                      <div className="mb-5">
                        <p className="text-white font-bold text-[15px]">{name}, {age}</p>
                        <p className="text-sm mt-0.5" style={{ color: ACCENT }}>{role}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Goals", "Mål")}</p>
                        <ul className="space-y-1.5">
                          {goals.map(g => (
                            <li key={g} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                              <span style={{ color: ACCENT }} className="shrink-0">+</span>{g}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Pain Points", "Udfordringer")}</p>
                        <ul className="space-y-1.5">
                          {pain.map(p => (
                            <li key={p} className="text-base text-[#9CA3AF] flex gap-2 leading-snug">
                              <span className="text-red-400 shrink-0">−</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>{tr("Assumptions & Limitations", "Antagelser & begrænsninger")}</SubLabel>
                <ul className="space-y-2">
                  {[
                    tr("Personas are hypothetical, not validated through interviews or surveys.", "Personaerne er hypotetiske og ikke valideret gennem interviews eller spørgeskemaer."),
                    tr("Compatibility scoring and weighting are design assumptions, not based on real user data.", "Kompatibilitetsscoring og vægtning er designantagelser og ikke baseret på rigtige brugerdata."),
                    tr("No usability testing was conducted; this project covers design only with no live implementation.", "Der blev ikke gennemført brugertest; projektet dækker kun design uden en live implementering."),
                  ].map((item) => (
                    <li key={item} className="text-[#9CA3AF] text-base flex gap-3 leading-snug">
                      <span className="shrink-0 mt-0.5 text-[#374151]">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── 04 DESIGN DIRECTION ─────────────────────────────────── */}
          <section id="direction" className="mb-24">
            <SectionTag num="04" label={tr("Design Direction", "Designretning")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              {tr("AI-First Design Principles", "AI-first-designprincipper")}
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>{tr("Design Principles", "Designprincipper")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
                  {tr("The design system was built around one constraint: AI decisions must be surfaced, not hidden. Every component that presents a recommendation includes the reasoning behind it — score, matched criteria, and why this helper fits this user specifically.", "Designsystemet blev bygget omkring én betingelse: AI'ens beslutninger skal vises, ikke skjules. Hver komponent, der præsenterer en anbefaling, indeholder begrundelsen bag – score, matchede kriterier og hvorfor netop denne hjælper passer til netop denne bruger.")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRINCIPLES.map(({ icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                      <span className="text-lg shrink-0 mt-0.5" style={{ color: ACCENT }}>{icon}</span>
                      <div>
                        <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                        <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>{tr("AI Matching Layer", "AI-matchningslag")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
                  {tr("Six AI capabilities form the core value proposition — replacing manual filtering with a model that learns, scores, and explains every match.", "Seks AI-funktioner udgør kerneværdien – de erstatter manuel filtrering med en model, der lærer, scorer og forklarer hvert match.")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AI_FEATURES.map(({ icon, title, desc }) => (
                    <FeatureCard key={title} icon={icon} title={title} desc={desc} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 05 USER JOURNEY ─────────────────────────────────────── */}
          <section id="journey" className="mb-24">
            <SectionTag num="05" label={tr("User Journey", "Brugerrejse")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              {tr("End-to-End Service Journey", "Servicerejsen fra start til slut")}
            </h2>

            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("The primary flow covers every step from recognising a need to completing the service and feeding that outcome back into the AI preference model.", "Det primære flow dækker hvert trin fra at erkende et behov til at fuldføre ydelsen og føre resultatet tilbage til AI'ens præferencemodel.")}
            </p>

            <ol className="space-y-2 mb-8">
              {JOURNEY_STEPS.map(({ step, label, desc }) => (
                <li key={step} className="flex items-start gap-4 bg-[#111] rounded-xl p-4 border border-[#222]">
                  <span
                    className="font-mono text-[12px] shrink-0 tabular-nums mt-0.5 w-6 text-right"
                    style={{ color: ACCENT }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="text-white text-[14px] font-semibold mb-0.5">{label}</p>
                    <p className="text-[#6B7280] text-[14px] leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── 06 DESIGN PROCESS ───────────────────────────────────── */}
          <section id="process" className="mb-24">
            <SectionTag num="06" label={tr("Design Process", "Designproces")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              {tr("From Concept to Component", "Fra koncept til komponent")}
            </h2>

            <div className="space-y-8">
              <div>
                <SubLabel>{tr("Core Feature Set", "Kernefunktioner")}</SubLabel>
                <p className="text-[#9CA3AF] leading-7 mb-4 text-base">
                  {tr("Alongside the AI matching layer, four platform features cover the complete service lifecycle.", "Ud over AI-matchningslaget dækker fire platformfunktioner hele ydelsens livscyklus.")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STANDARD_FEATURES.map(({ icon, title, desc }) => (
                    <FeatureCard key={title} icon={icon} title={title} desc={desc} />
                  ))}
                </div>
              </div>

              <div>
                <SubLabel>{tr("Component Library", "Komponentbibliotek")}</SubLabel>
                <div className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <img
                    src={MatchMeComponent}
                    alt={tr("MatchMe Component Library", "MatchMe-komponentbibliotek")}
                    className="w-full block"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── 07 FINAL SOLUTION ───────────────────────────────────── */}
          <section id="solution" className="mb-24">
            <SectionTag num="07" label={tr("Final Solution", "Endelig løsning")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">
              {tr("Final Screens & Prototype", "Endelige skærme & prototype")}
            </h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("High-fidelity screens cover the full flow: onboarding quiz, match feed with best-fit scores and reasoning, helper profiles with AI-generated summaries, calendar booking, in-chat AI prompts, and integrated payment.", "High-fidelity-skærmene dækker hele flowet: onboarding-quiz, matchfeed med best-fit-scorer og begrundelser, hjælperprofiler med AI-genererede resuméer, kalenderbooking, AI-prompts i chatten og integreret betaling.")}
            </p>

            <div className="bg-[#F5F5F5] rounded-xl p-4 mb-8 border border-[#E0E0E0]">
              <img src={MatchMeHIFI} alt={tr("MatchMe Hi-Fi Screens", "MatchMe hi-fi-skærme")} className="w-full object-cover" />
            </div>

            <div className="border p-8 text-center bg-[#2D0A1A]" style={{ borderColor: `${ACCENT}25` }}>
              <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>
                {tr("Try MatchMe in Figma", "Prøv MatchMe i Figma")}
              </p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                {tr("Full clickable prototype — AI onboarding quiz, match feed with best-fit scores, booking, and messaging", "Fuldt klikbar prototype – AI-onboarding-quiz, matchfeed med best-fit-scorer, booking og beskeder")}
              </p>
              <a
                href="https://www.figma.com/proto/cGnfgwa8uCDZeKk6yCyURy/Match-Me?node-id=1-2208&viewport=1060%2C-1165%2C0.19&t=xOfO6RXWl1PniIrH-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2208&page-id=0%3A1&show-proto-sidebar=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
                style={{ background: ACCENT, color: '#0D1117' }}
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> {tr("Open Prototype", "Åbn prototype")}
              </a>
            </div>
          </section>

          {/* ── 08 REFLECTION ───────────────────────────────────────── */}
          <section id="reflection" className="mb-8">
            <SectionTag num="08" label={tr("Reflection", "Refleksion")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">
              {tr("Key Learnings", "Vigtigste læringer")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold text-[#374151]/50 font-mono mb-4 leading-none">{num}</p>
                  <p className="text-white font-semibold text-[15px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
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
