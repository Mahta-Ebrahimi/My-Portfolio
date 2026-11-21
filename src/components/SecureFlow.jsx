import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import lofisecureflow from '../assets/lofisecureflow.png';
import IADiagram from '../assets/digram.png';
import { getProjectNavigation } from '../data/projectNavigation';
import ColorPallete from '../assets/Color plateDetectAI.png';
import Componentlibrary from '../assets/Component library.png';
import HIFIDetectAI from '../assets/HIFI Detect AI.png';
import DaShboardAI from '../assets/DashboardAI.png';
import { tr } from '../context/LanguageContext';

const ACCENT = '#22D3EE';

// ── Sidebar sections ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',        num: '01', label: tr("Hero", "Intro") },
  { id: 'overview',    num: '02', label: tr("Overview", "Oversigt") },
  { id: 'problem',     num: '03', label: tr("Problem", "Problem") },
  { id: 'goals',       num: '04', label: tr("Goals", "Mål") },
  { id: 'research',    num: '05', label: 'Research' },
  { id: 'principles',  num: '06', label: tr("Design Process", "Designproces") },
  { id: 'solution',    num: '07', label: tr("Solution", "Løsning") },
  { id: 'reflection',  num: '08', label: tr("Reflection", "Refleksion") },
];

// Maps every page section ID → its parent nav item ID
const SECTION_TO_NAV = {
  hero:         'hero',
  summary:      'overview',
  overview:     'overview',
  problem:      'problem',
  goals:        'goals',
  research:     'research',
  personas:     'research',     // subsection of Research (05.1)
  principles:   'principles',   // start of Design Process (06)
  ia:           'principles',
  userflow:     'principles',
  features:     'principles',
  wireframes:   'principles',
  designsystem: 'principles',
  solution:     'solution',
  prototype:    'solution',
  decisions:    'solution',
  metrics:      'solution',
  reflection:   'reflection',
  takeaways:    'reflection',
};

// ── Content data ──────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    name: 'The Level 3 Analyst', role: tr("28–38 · SOC environment", "28–38 · SOC-miljø"),
    goals: [tr("Leverage AI to process alerts faster", "Bruge AI til at behandle alarmer hurtigere"), tr("Maintain clear audit trail on every decision", "Bevare et tydeligt revisionsspor for hver beslutning"), tr("Certify reports without reviewing every raw log", "Certificere rapporter uden at gennemgå hver rå log")],
    pain: [tr("Alert fatigue from hundreds of AI outputs per shift", "Alarmtræthed fra hundredvis af AI-output pr. vagt"), tr("No visibility into how AI reached a decision", "Ingen indsigt i, hvordan AI'en nåede frem til en beslutning"), tr("Pressure to approve fast but accountability falls on them", "Pres for at godkende hurtigt, men ansvaret ligger hos dem")],
  },
  {
    name: 'The CISO', role: tr("40–55 · Security leadership", "40–55 · Sikkerhedsledelse"),
    goals: [tr("Human accountability on all reports to leadership", "Menneskeligt ansvar for alle rapporter til ledelsen"), tr("Proof that AI actions were reviewed before escalation", "Dokumentation for, at AI-handlinger blev gennemgået før eskalering"), tr("Operational speed without compliance risk", "Operationel hastighed uden compliance-risiko")],
    pain: [tr("Full automation is too risky — no oversight trail", "Fuld automatisering er for risikabel – intet tilsynsspor"), tr("Manual approval processes negate automation value", "Manuelle godkendelsesprocesser ophæver værdien af automatisering"), tr("Existing tools offer no middle ground", "Eksisterende værktøjer tilbyder ingen mellemvej")],
  },
];

const PRINCIPLES = [
  { icon: '◈', title: tr("Support judgment, don't replace it", "Støt dømmekraften – erstat den ikke"), desc: tr("AI informs the decision. The analyst owns it.", "AI informerer beslutningen. Analytikeren ejer den.") },
  { icon: '◎', title: tr("Make AI reasoning visible", "Gør AI'ens begrundelser synlige"),           desc: tr("Show the evidence behind every AI recommendation so analysts can verify before acting.", "Vis beviserne bag hver AI-anbefaling, så analytikerne kan verificere, før de handler.") },
  { icon: '⊞', title: tr("Bring context into one place", "Saml konteksten ét sted"),       desc: tr("Everything needed to investigate an alert is available in a single view.", "Alt, hvad der skal til for at undersøge en alarm, er tilgængeligt i én visning.") },
  { icon: '⚡', title: tr("Surface signal, suppress noise", "Fremhæv signalet, dæmp støjen"),     desc: tr("Prioritize information so analysts focus on what matters, not what's loudest.", "Prioritér informationen, så analytikerne fokuserer på det, der betyder noget – ikke det, der larmer mest.") },
  { icon: '✦', title: tr("Speed through clarity, not shortcuts", "Hastighed gennem klarhed, ikke genveje"), desc: tr("Better-organized information enables faster decisions without reducing analyst control.", "Bedre organiseret information giver hurtigere beslutninger uden at mindske analytikerens kontrol.") },
];

const FEATURES = [
  { icon: '', title: tr("Autonomous Threat Response", "Autonom trusselsrespons"), desc: tr("AI detects and isolates potential threats, initiating a defined response before the alert reaches the analyst.", "AI opdager og isolerer mulige trusler og igangsætter en defineret respons, før alarmen når analytikeren.") },
  { icon: '', title: tr("Decision Trail", "Beslutningsspor"),              desc: tr("Each alert surfaces the AI's confidence level, supporting evidence, and the action taken, so analysts have the context they need before making a decision.", "Hver alarm viser AI'ens sikkerhedsniveau, understøttende beviser og den udførte handling, så analytikerne har den kontekst, de har brug for, før de træffer en beslutning.") },
  { icon: '', title: tr("Analyst Certification", "Analytikercertificering"),       desc: tr("Analysts confirm, flag, or escalate each alert in a single step, with their name attached to the outcome.", "Analytikerne bekræfter, markerer eller eskalerer hver alarm i ét trin, med deres navn knyttet til resultatet.") },
  { icon: '', title: tr("Live Alert Feed", "Live-alarmfeed"),             desc: tr("Delivers a prioritized view of active alerts awaiting analyst review, organized by severity and status.", "Giver en prioriteret visning af aktive alarmer, der afventer analytikerens gennemgang, sorteret efter alvor og status.") },
];

const GOALS = [
  {
    category: tr("Business Goals", "Forretningsmål"),
    items: [
      tr("Reduce the volume of manual investigation work so teams can direct analyst capacity toward incidents that carry real risk.", "Mindske mængden af manuelt undersøgelsesarbejde, så teams kan bruge analytikernes kapacitet på hændelser med reel risiko."),
      tr("Make security operations more scalable by reducing the time required per triage decision without compromising investigation quality.", "Gøre sikkerhedsdriften mere skalerbar ved at mindske tiden pr. triagebeslutning uden at gå på kompromis med kvaliteten af undersøgelserne."),
      tr("Make AI-assisted decisions auditable and traceable, so organizations can adopt automation with confidence and clear ownership.", "Gøre AI-assisterede beslutninger reviderbare og sporbare, så organisationer kan tage automatisering i brug med tryghed og klart ejerskab."),
    ],
  },
  {
    category: tr("User Goals", "Brugermål"),
    items: [
      tr("Give analysts everything they need to investigate an alert in a single view, without switching between tools.", "Give analytikerne alt, hvad de skal bruge for at undersøge en alarm, i én visning – uden at skifte mellem værktøjer."),
      tr("Keep low-priority alerts out of the analyst's active queue so attention stays focused on genuine threats.", "Holde lavt prioriterede alarmer ude af analytikerens aktive kø, så opmærksomheden forbliver rettet mod reelle trusler."),
      tr("Enable confident triage decisions — dismiss, investigate, or escalate — with less effort and less uncertainty.", "Muliggøre sikre triagebeslutninger – afvis, undersøg eller eskalér – med mindre indsats og mindre usikkerhed."),
    ],
  },
  {
    category: tr("Design Goals", "Designmål"),
    items: [
      tr("Reduce cognitive load by surfacing the most decision-relevant information first and revealing additional detail progressively.", "Mindske den kognitive belastning ved at vise den mest beslutningsrelevante information først og gradvist afsløre flere detaljer."),
      tr("Consolidate alert data, threat context, and AI insights into a single screen to eliminate context switching.", "Samle alarmdata, trusselskontekst og AI-indsigter på én skærm for at undgå kontekstskift."),
      tr("Make AI assistance transparent and easy to override, so analysts can trust it without depending on it.", "Gøre AI-assistancen gennemsigtig og nem at tilsidesætte, så analytikerne kan stole på den uden at være afhængige af den."),
      tr("Use visual hierarchy to help analysts distinguish critical signals from background noise at a glance.", "Bruge visuelt hierarki til at hjælpe analytikerne med at skelne kritiske signaler fra baggrundsstøj med ét blik."),
    ],
  },
];

const DESIGN_DECISIONS = [
  {
    num: '01',
    decision: tr("Certify after, not approve before", "Certificér bagefter – godkend ikke på forhånd"),
    why: tr("Pre-approval gates slow investigation under high alert volume and undermine the efficiency benefit of AI-assisted response. Certifying after the fact keeps analysts accountable without blocking the workflow.", "Forhåndsgodkendelser forsinker undersøgelser ved mange alarmer og underminerer effektivitetsgevinsten ved AI-assisteret respons. At certificere bagefter holder analytikerne ansvarlige uden at blokere workflowet."),
    considered: 'Pre-approval modal required per alert before AI could act',
    tradeoff: tr("The interface must maintain a clear distinction between \"AI acted\" and \"analyst certified\" at all times.", "Interfacet skal altid holde en klar skelnen mellem \"AI handlede\" og \"analytiker certificerede\"."),
  },
  {
    num: '02',
    decision: tr("Decision trail as primary content", "Beslutningsspor som primært indhold"),
    why: tr("Analysts cannot verify what they cannot see. Surfacing the AI reasoning chain — confidence level, evidence, and action taken — as the primary content of each alert removes the need to navigate elsewhere during investigation.", "Analytikerne kan ikke verificere det, de ikke kan se. Ved at vise AI'ens ræsonnement – sikkerhedsniveau, beviser og udført handling – som det primære indhold i hver alarm, forsvinder behovet for at navigere andre steder hen under undersøgelsen."),
    considered: 'Raw log view with an AI summary panel in the sidebar',
    tradeoff: tr("AI reasoning must be structured and consistently formatted: a free-text summary is difficult to evaluate at speed.", "AI'ens begrundelser skal være strukturerede og ensartet formaterede: Et resumé i fritekst er svært at vurdere hurtigt."),
  },
  {
    num: '03',
    decision: tr("Named attribution on every certified report", "Navngiven tilskrivning på hver certificeret rapport"),
    why: tr("Recording a decision under a specific analyst's name rather than a team changes the nature of the step. Certification becomes a professional judgment call, not an administrative task.", "At registrere en beslutning under en bestemt analytikers navn frem for et teams navn ændrer trinnets karakter. Certificeringen bliver en faglig vurdering – ikke en administrativ opgave."),
    considered: 'Team-level attribution — "SOC Team approved"',
    tradeoff: tr("The interface must clearly communicate what the analyst is confirming before submission, so responsibility is explicit, not assumed.", "Interfacet skal tydeligt kommunikere, hvad analytikeren bekræfter, før der indsendes, så ansvaret er eksplicit og ikke underforstået."),
  },
];

const LEARNINGS = [
  { num: '01', title: tr("Transparency is the foundation of trust", "Gennemsigtighed er fundamentet for tillid"),             desc: tr("Analysts need to understand how the AI reached a decision, not just accept what it decided. When the reasoning is visible, certification becomes a considered judgment rather than a routine sign-off. Presenting that reasoning clearly was as important as the accuracy of the AI itself.", "Analytikerne skal forstå, hvordan AI'en nåede frem til en beslutning – ikke bare acceptere, hvad den besluttede. Når begrundelsen er synlig, bliver certificeringen en overvejet vurdering frem for en rutinemæssig godkendelse. At præsentere begrundelsen klart var lige så vigtigt som selve AI'ens præcision.") },
  { num: '02', title: tr("The right level of automation is the hardest problem", "Det rette niveau af automatisering er det sværeste problem"), desc: tr("The central design question was not how to make the workflow efficient — it was how much to automate. SecureFlow keeps analysts responsible for every final decision, with AI handling detection and analysis but never the outcome. That division shaped the structure of every screen.", "Det centrale designspørgsmål var ikke, hvordan workflowet kunne gøres effektivt – men hvor meget der skulle automatiseres. SecureFlow lader analytikerne have ansvaret for hver endelig beslutning, mens AI håndterer detektion og analyse, men aldrig resultatet. Den arbejdsdeling formede strukturen på hver skærm.") },
  { num: '03', title: tr("Attribution as a design principle", "Tilskrivning som designprincip"),                    desc: tr("Attaching an analyst's name to a certified outcome was not planned as a design decision — it emerged as one. Making attribution part of the action rather than a separate step changed the nature of certification and gave accountability a concrete place in the workflow.", "At knytte en analytikers navn til et certificeret resultat var ikke planlagt som en designbeslutning – det opstod som en. Ved at gøre tilskrivningen til en del af handlingen frem for et separat trin ændrede certificeringen karakter, og ansvaret fik en konkret plads i workflowet.") },
];

const IA_TREE = [
  {
    level: 'L1', label: tr("Dashboard", "Dashboard"), sub: tr("Operational awareness", "Operationelt overblik"),
    children: [
      { label: tr("Prioritized alert feed", "Prioriteret alarmfeed"), sub: tr("An organized view of active alerts that helps analysts quickly identify what needs attention", "En organiseret visning af aktive alarmer, der hjælper analytikerne med hurtigt at se, hvad der kræver opmærksomhed") },
      { label: tr("Triage orientation", "Overblik til triage"),     sub: tr("Controls that allow analysts to filter and navigate the alert queue without leaving the main view", "Kontroller, der lader analytikerne filtrere og navigere i alarmkøen uden at forlade hovedvisningen") },
    ],
  },
  {
    level: 'L2', label: tr("Alert Detail", "Alarmdetaljer"), sub: tr("Investigation and decision-making", "Undersøgelse og beslutningstagning"),
    children: [
      { label: tr("Consolidated threat context", "Samlet trusselskontekst"), sub: tr("Brings together the evidence and AI analysis needed to understand an alert — in one place", "Samler de beviser og den AI-analyse, der skal til for at forstå en alarm – ét sted") },
      { label: tr("Transparent AI analysis", "Gennemsigtig AI-analyse"),     sub: tr("Surfaces the reasoning behind AI recommendations so analysts can evaluate them before deciding", "Viser begrundelsen bag AI-anbefalinger, så analytikerne kan vurdere dem, før de beslutter sig") },
    ],
  },
  {
    level: 'L3', label: tr("Certification Flow", "Certificeringsflow"), sub: tr("Human review and accountability", "Menneskelig gennemgang og ansvar"),
    children: [
      { label: tr("Analyst decision point", "Analytikerens beslutningspunkt"), sub: tr("A focused step where analysts confirm, flag, or escalate based on their own judgment", "Et fokuseret trin, hvor analytikerne bekræfter, markerer eller eskalerer ud fra deres egen vurdering") },
      { label: tr("Outcome record", "Registrering af resultat"),         sub: tr("Every decision is logged with clear analyst ownership, ensuring accountability without added friction", "Hver beslutning logges med tydeligt ejerskab hos analytikeren, hvilket sikrer ansvar uden ekstra friktion") },
    ],
  },
];

const USER_FLOW_STEPS = [
  { num: '01', actor: 'AI',      label: tr("Threat Detected", "Trussel opdaget"),        desc: tr("AI identifies a potential threat and flags it for analyst review, filtering noise from the queue.", "AI identificerer en mulig trussel og markerer den til gennemgang hos analytikeren, så støj filtreres fra køen.") },
  { num: '02', actor: 'AI',      label: tr("Alert Generated", "Alarm oprettet"),        desc: tr("The alert reaches the analyst with confidence level, threat classification, and supporting evidence already organized.", "Alarmen når analytikeren med sikkerhedsniveau, trusselsklassificering og understøttende beviser allerede organiseret.") },
  { num: '03', actor: 'Analyst', label: tr("Reviews Decision Trail", "Gennemgår beslutningsspor"), desc: tr("The analyst reviews the AI's reasoning — evidence, confidence level, and recommended action — before forming a judgment.", "Analytikeren gennemgår AI'ens begrundelse – beviser, sikkerhedsniveau og anbefalet handling – før der træffes en vurdering.") },
  { num: '04', actor: 'Analyst', label: tr("Certifies or Escalates", "Certificerer eller eskalerer"), desc: tr("The analyst confirms, flags for review, or escalates, and the decision is recorded under their name.", "Analytikeren bekræfter, markerer til gennemgang eller eskalerer, og beslutningen registreres under vedkommendes navn.") },
  { num: '05', actor: 'System',  label: tr("Report Generated", "Rapport oprettet"),       desc: tr("A certified report is generated capturing the AI analysis, analyst decision, and timestamp as a traceable record.", "Der oprettes en certificeret rapport, som samler AI-analysen, analytikerens beslutning og tidsstempel som en sporbar registrering.") },
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

const Placeholder = ({ label, hint = tr("Add content here", "Tilføj indhold her"), height = 200 }) => (
  <div
    className="rounded-xl flex flex-col items-center justify-center text-center p-8 border border-dashed"
    style={{ minHeight: height, borderColor: '#2A2A2A' }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-dashed"
      style={{ borderColor: '#333' }}
    >
      <span style={{ color: '#555', fontSize: 18 }}>+</span>
    </div>
    <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1" style={{ color: '#444' }}>{label}</p>
    <p className="text-[13px]" style={{ color: '#333' }}>{hint}</p>
  </div>
);

const GoalTag = ({ label }) => (
  <span
    className="text-[12px] font-mono px-2 py-0.5 rounded border"
    style={{ color: ACCENT, borderColor: ACCENT + '33', background: ACCENT + '0D' }}
  >
    {label}
  </span>
);

const ActorTag = ({ actor }) => {
  const map = {
    AI:      { color: ACCENT,     bg: ACCENT + '10',     border: ACCENT + '44'     },
    Analyst: { color: '#4ADE80',  bg: '#4ADE8010',       border: '#4ADE8044'       },
    System:  { color: '#F59E0B',  bg: '#F59E0B10',       border: '#F59E0B44'       },
  };
  const s = map[actor] || map.System;
  return (
    <span
      className="text-[12px] font-mono px-2 py-0.5 rounded border"
      style={{ color: s.color, background: s.bg, borderColor: s.border }}
    >
      {actor === 'Analyst' ? tr('Analyst', 'Analytiker') : actor}
    </span>
  );
};

const MoSCoWBadge = ({ label }) => {
  let color = ACCENT;
  let bg    = ACCENT + '15';
  let border = ACCENT + '33';
  if (label === 'Should Have') { color = '#F59E0B'; bg = '#F59E0B15'; border = '#F59E0B33'; }
  if (label === 'Could Have')  { color = '#4ADE80'; bg = '#4ADE8015'; border = '#4ADE8033'; }
  if (label === "Won't Have")  { color = '#6B7280'; bg = '#6B728015'; border = '#6B728033'; }
  return (
    <span
      className="text-[12px] font-mono font-bold px-2 py-0.5 rounded border"
      style={{ color, background: bg, borderColor: border }}
    >
      {label}
    </span>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export default function SecureFlow() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [active, setActive] = useState('hero');
  const { prev, next } = getProjectNavigation(location.pathname);

  useEffect(() => {
    const observers = Object.keys(SECTION_TO_NAV).map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(SECTION_TO_NAV[id]); },
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
            <h2 className="text-white font-semibold text-[14px] leading-tight mb-1">{tr("Detect AI Security", "Detect AI Security")}</h2>
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("AI Security Platform · UI/UX", "AI-sikkerhedsplatform · UI/UX")}</p>
            <div className="flex gap-2">
              <span className="text-[12px] font-medium px-2 py-1 rounded-md border" style={{ background: '#071619', color: ACCENT, borderColor: ACCENT + '33' }}>Figma</span>
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
              <p className="text-[13px] text-[#9CA3AF] leading-tight">{tr("UI/UX Designer", "UI/UX-designer")}</p>
            </div>
            <a
              href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&t=XcUaykmv6BsMdlzP-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
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
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">{tr("Detect AI Security", "Detect AI Security")}</h1>
            <p className="text-[18px] sm:text-[20px] text-[#6B7280] font-light mb-6">{tr("AI acts. Humans certify. Accountability stays intact.", "AI handler. Mennesker certificerer. Ansvaret forbliver intakt.")}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {[tr("UI/UX Design", "UI/UX-design"), tr("AI Platform", "AI-platform"), 'B2B · SaaS', 'Figma'].map(tag => (
                <span key={tag} className="text-[13px] font-medium px-3 py-1 border rounded-full" style={{ color: ACCENT, borderColor: ACCENT + '44', background: ACCENT + '0D' }}>
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&t=XcUaykmv6BsMdlzP-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-[#1A1A1A] overflow-hidden"
              style={{ background: '#BFD3D7' }}
            >
              <div className="p-6">
                <img src={DaShboardAI} alt={tr("DetectAI Security Dashboard", "DetectAI Security-dashboard")} className="w-full block" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> {tr("Prototype in Figma", "Prototype i Figma")}
                </span>
              </div>
            </a>
          </section>

          {/* ── 02 PROJECT SUMMARY ───────────────────────────────── */}
          <section id="summary" className="mb-20">
            <SectionTag num="" label={tr("Summary", "Resumé")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-6 leading-snug">{tr("At a Glance", "Kort fortalt")}</h2>
            <Card className="divide-y divide-[#1A1A1A]">
              {[
                { field: tr("Role", "Rolle"),             value: tr("Product Designer", "Produktdesigner") },
                { field: tr("Timeline", "Tidsramme"),         value: tr("6 Weeks", "6 uger") },
                { field: 'Platform',         value: tr("Web Application", "Webapplikation") },
                { field: 'Team',             value: tr("Solo Project", "Soloprojekt") },
                { field: 'Focus',            value: tr("AI-Assisted Cybersecurity", "AI-assisteret cybersikkerhed") },
              ].map(({ field, value }) => (
                <div key={field} className="flex items-center gap-6 px-6 py-4">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 w-28">{field}</p>
                  <p className="text-white text-[15px] font-medium">{value}</p>
                </div>
              ))}
              <div className="px-6 py-4">
                <div className="flex items-start gap-12">
                  <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-[#4B5563] shrink-0 w-28 pt-1">{tr("Responsibilities", "Ansvarsområder")}</p>
                  <div className="flex flex-wrap gap-2">
                    {[tr("UX Research", "UX-research"), tr("Product Design", "Produktdesign"), tr("UI Design", "UI-design"), tr("Prototyping", "Prototyping"), tr("Design System", "Designsystem")].map(r => (
                      <span key={r} className="text-[13px] font-medium px-3 py-1 rounded-full border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: ACCENT + '0D' }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* ── 03 PROJECT OVERVIEW ──────────────────────────────── */}
          <section id="overview" className="mb-20">
            <SectionTag num="02" label={tr("Overview", "Oversigt")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("What is SecureFlow?", "Hvad er SecureFlow?")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("SecureFlow is a concept for an AI-assisted cybersecurity platform designed to help Security Operations Center (SOC) analysts investigate and respond to security alerts more efficiently.", "SecureFlow er et koncept for en AI-assisteret cybersikkerhedsplatform, der skal hjælpe analytikere i et Security Operations Center (SOC) med at undersøge og reagere mere effektivt på sikkerhedsalarmer.")}
            </p>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("Modern SOC teams process hundreds of alerts every day, many of which are repetitive or false positives. This creates alert fatigue, slows investigations, and increases the risk of missing critical threats.", "Moderne SOC-teams behandler hundredvis af alarmer hver dag, og mange af dem er gentagelser eller falske positiver. Det skaber alarmtræthed, forsinker undersøgelser og øger risikoen for at overse kritiske trusler.")}
            </p>
            <p className="text-[#9CA3AF] leading-7 text-lg">
              {tr("SecureFlow explores how AI can support, not replace, security analysts by providing contextual threat analysis, explainable recommendations, and a streamlined investigation workflow. The focus of this project was designing a product experience that reduces cognitive load while keeping human analysts in control of every security decision.", "SecureFlow undersøger, hvordan AI kan støtte – ikke erstatte – sikkerhedsanalytikere med kontekstuel trusselsanalyse, forklarlige anbefalinger og et strømlinet workflow for undersøgelser. Projektets fokus var at designe en produktoplevelse, der mindsker den kognitive belastning og samtidig lader analytikerne bevare kontrollen over hver sikkerhedsbeslutning.")}
            </p>
          </section>

          {/* ── 04 PROBLEM ───────────────────────────────────────── */}
          <section id="problem" className="mb-20">
            <SectionTag num="03" label={tr("Problem", "Problem")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-10 leading-snug">{tr("Security analysts are spending their time managing tools, not investigating threats.", "Sikkerhedsanalytikere bruger deres tid på at administrere værktøjer i stedet for at undersøge trusler.")}</h2>

            <div className="space-y-8">
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{tr("Current Situation", "Nuværende situation")}</p>
                <p className="text-[#9CA3AF] leading-7 text-[15px]">
                  {tr("SOC analysts monitor security events, triage incoming alerts, and escalate genuine threats, all while switching between multiple disconnected security tools. Every alert demands a judgment call: investigate further, dismiss as a false positive, or escalate. At high volume, that workload leaves little time for the investigations that actually matter.", "SOC-analytikere overvåger sikkerhedshændelser, triagerer indkommende alarmer og eskalerer reelle trusler – alt imens de skifter mellem flere usammenhængende sikkerhedsværktøjer. Hver alarm kræver en vurdering: undersøg nærmere, afvis som falsk positiv eller eskalér. Ved store mængder efterlader den arbejdsbyrde kun lidt tid til de undersøgelser, der virkelig betyder noget.")}
                </p>
              </div>

              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{tr("The Problem", "Problemet")}</p>
                <p className="text-[#9CA3AF] leading-7 text-[15px]">
                  {tr("Most alerts are false positives, but analysts cannot know that without investigating each one, which leaves less time for genuine threats. Context is also fragmented across tools, so every alert requires switching systems and manually assembling information before investigation can begin. Analysts spend more time managing the workflow than doing the work.", "De fleste alarmer er falske positiver, men det kan analytikerne ikke vide uden at undersøge hver enkelt, hvilket giver mindre tid til de reelle trusler. Konteksten er også spredt over flere værktøjer, så hver alarm kræver, at man skifter system og manuelt samler information, før undersøgelsen kan begynde. Analytikerne bruger mere tid på at styre workflowet end på selve arbejdet.")}
                </p>
              </div>

              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{tr("Opportunity", "Mulighed")}</p>
                <p className="text-[#9CA3AF] leading-7 text-[15px]">
                  {tr("AI can handle the repetitive, pattern-based work that currently consumes most of an analyst's time, pre-filtering low-signal alerts and surfacing relevant context automatically at the point of investigation. The goal is not automation for its own sake, but giving analysts the focus to concentrate on the investigations that genuinely require human judgment.", "AI kan håndtere det gentagne, mønsterbaserede arbejde, der i dag optager det meste af en analytikers tid – ved at forfiltrere alarmer med lav signalværdi og automatisk vise relevant kontekst, når undersøgelsen begynder. Målet er ikke automatisering for automatiseringens skyld, men at give analytikerne ro til at fokusere på de undersøgelser, der reelt kræver menneskelig dømmekraft.")}
                </p>
              </div>

              <InsightCard label={tr("Design Challenge", "Designudfordring")}>
                <p className="text-[#D1D5DB] text-[16px] leading-relaxed italic">
                  How might we design an investigation workflow that reduces the cognitive cost of alert triage, so SOC analysts can focus on the decisions that matter rather than the noise surrounding them?
                </p>
              </InsightCard>
            </div>
          </section>

          {/* ── 05 GOALS ─────────────────────────────────────────── */}
          <section id="goals" className="mb-20">
            <SectionTag num="04" label={tr("Goals", "Mål")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Goals", "Mål")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("Each goal connects directly to the core problems: alert fatigue, fragmented workflows, and the need to keep analysts in control of every decision.", "Hvert mål hænger direkte sammen med kerneproblemerne: alarmtræthed, fragmenterede workflows og behovet for, at analytikerne bevarer kontrollen over hver beslutning.")}
            </p>
            <div className="space-y-4">
              {GOALS.map(({ category, items }) => (
                <Card key={category} className="p-6">
                  <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-4" style={{ color: ACCENT }}>{category}</p>
                  <ul className="space-y-3">
                    {items.map((goal, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{goal}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 05 RESEARCH ──────────────────────────────────────── */}
          <section id="research" className="mb-20" style={{ scrollMarginTop: '96px' }}>
            <SectionTag num="05" label="Research" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Research Approach", "Researchtilgang")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("Grounded in exploratory desk research, this project mapped the problem space through existing documentation, tooling analysis, and competitive review.", "Med udgangspunkt i udforskende desk research kortlagde projektet problemfeltet gennem eksisterende dokumentation, analyse af værktøjer og en konkurrentgennemgang.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{tr("Research Objectives", "Researchmål")}</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      tr("Understand the SOC analyst investigation workflow and identify where existing tools create the most friction.", "Forstå SOC-analytikerens undersøgelsesworkflow og identificere, hvor eksisterende værktøjer skaber mest friktion."),
                      tr("Explore how other security platforms navigate the balance between automation and human oversight.", "Undersøge, hvordan andre sikkerhedsplatforme balancerer mellem automatisering og menneskeligt tilsyn."),
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{tr("Research Questions", "Researchspørgsmål")}</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      tr("What information does an analyst need to make a confident triage decision without switching tools?", "Hvilken information har en analytiker brug for til at træffe en sikker triagebeslutning uden at skifte værktøj?"),
                      tr("What makes analysts willing to act on an AI-generated recommendation?", "Hvad får analytikere til at ville handle på en AI-genereret anbefaling?"),
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pt-4">
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: ACCENT }}>{tr("Desk Research", "Desk research")}</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      tr("Industry documentation on SOC analyst workflows and alert triage processes.", "Branchedokumentation om SOC-analytikeres workflows og processer for alarmtriage."),
                      tr("Design patterns used in high-information-density B2B and decision-support tools.", "Designmønstre fra B2B- og beslutningsstøtteværktøjer med høj informationstæthed."),
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div>
                <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: ACCENT }}>{tr("Competitive Analysis", "Konkurrentanalyse")}</p>
                <Card className="p-5 h-full">
                  <ul className="space-y-3">
                    {[
                      tr("Existing SIEM platforms are built for log search, not analyst decision-making.", "Eksisterende SIEM-platforme er bygget til logsøgning, ikke til analytikerens beslutningstagning."),
                      tr("Many AI-assisted security tools prioritize output over explanation, which can create a trust and accountability gap.", "Mange AI-assisterede sikkerhedsværktøjer prioriterer output frem for forklaring, hvilket kan skabe et hul i tillid og ansvar."),
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            <div className="mb-8 pt-4">
              <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: ACCENT }}>{tr("Assumptions", "Antagelser")}</p>
              <Card className="p-5">
                <p className="text-[13px] text-[#4B5563] mb-3 leading-relaxed">{tr("No primary research was conducted. The assumptions below shaped the design direction and would need validation before any real deployment.", "Der blev ikke gennemført primær research. Antagelserne nedenfor formede designretningen og skulle valideres før en egentlig implementering.")}</p>
                <ul className="space-y-3">
                  {[
                    tr("Alert fatigue stems more from the effort per investigation than from alert volume alone.", "Alarmtræthed skyldes mere indsatsen pr. undersøgelse end alene mængden af alarmer."),
                    tr("Analysts are more likely to trust AI when its reasoning is visible and its output remains open to review.", "Analytikere har større tillid til AI, når dens begrundelser er synlige, og dens output fortsat kan gennemgås."),
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: '#F59E0B' }} />
                      <p className="text-[#9CA3AF] text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div>
              <p className="text-[13px] font-mono uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>{tr("Key Insights", "Vigtigste indsigter")}</p>
              <div className="space-y-3">
                {[
                  { title: tr("The bottleneck is the workflow, not detection", "Flaskehalsen er workflowet, ikke detektionen"),            desc: tr("Threat detection is fast. Investigation, across disconnected tools, isn't.", "Trusselsdetektion går hurtigt. Undersøgelse på tværs af usammenhængende værktøjer gør ikke.") },
                  { title: tr("Context switching drives cognitive load", "Kontekstskift driver den kognitive belastning"),                  desc: tr("Analysts don't struggle because cases are complex — they struggle because the context they need is scattered across too many tools.", "Analytikerne kæmper ikke, fordi sagerne er komplekse – de kæmper, fordi den kontekst, de har brug for, er spredt over alt for mange værktøjer.") },
                  { title: tr("AI is most valuable when it reduces effort, not judgment", "AI er mest værdifuld, når den mindsker indsatsen – ikke dømmekraften"), desc: tr("Analysts remain responsible for the final decision. AI is most effective when it accelerates investigation without replacing human expertise.", "Analytikerne har fortsat ansvaret for den endelige beslutning. AI er mest effektiv, når den fremskynder undersøgelsen uden at erstatte menneskelig ekspertise.") },
                ].map(({ title, desc }) => (
                  <InsightCard key={title}>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#9CA3AF] text-[15px] leading-[1.65]">{desc}</p>
                  </InsightCard>
                ))}
              </div>
            </div>
          </section>

          {/* ── 07 PERSONAS ──────────────────────────────────────── */}
          <section id="personas" className="mb-20">
            <SectionTag num="05.1" label={tr("Personas", "Personaer")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-2 leading-snug">{tr("Primary Persona", "Primær persona")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("Based on exploratory desk research and documented assumptions. No primary user research was conducted.", "Baseret på udforskende desk research og dokumenterede antagelser. Der blev ikke gennemført primær brugerresearch.")}
            </p>

            <Card className="p-6">
              <div className="pb-5 mb-6 border-b border-[#1A1A1A]">
                <p className="text-white font-bold text-[16px] mb-1">{tr("SOC Analyst", "SOC-analytiker")}</p>
                <p className="text-sm" style={{ color: ACCENT }}>{tr("Security Operations Center, primary user", "Security Operations Center, primær bruger")}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Role", "Rolle")}</p>
                  <ul className="space-y-1.5">
                    {[
                      tr("Monitors security event streams and reviews incoming alerts in real time.", "Overvåger strømme af sikkerhedshændelser og gennemgår indkommende alarmer i realtid."),
                      tr("Triages alerts by deciding whether to investigate, dismiss, or escalate.", "Triagerer alarmer ved at afgøre, om de skal undersøges, afvises eller eskaleres."),
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Responsibilities", "Ansvarsområder")}</p>
                  <ul className="space-y-1.5">
                    {[
                      tr("Investigates potential threats by gathering context across multiple tools.", "Undersøger mulige trusler ved at samle kontekst på tværs af flere værktøjer."),
                      tr("Documents findings and closes or escalates cases with clear accountability.", "Dokumenterer fund og lukker eller eskalerer sager med klart ansvar."),
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Goals", "Mål")}</p>
                  <ul className="space-y-1.5">
                    {[
                      tr("Reduce time spent on repetitive triage and focus attention on alerts that represent genuine risk.", "Bruge mindre tid på gentagen triage og fokusere på alarmer, der udgør en reel risiko."),
                      tr("Access the full investigation context needed for a confident decision, without switching tools.", "Få adgang til hele den kontekst, der skal til for en sikker beslutning, uden at skifte værktøj."),
                      tr("Reach confident decisions through explainable AI, while keeping human judgment in control.", "Nå frem til sikre beslutninger gennem forklarlig AI, mens den menneskelige dømmekraft bevarer kontrollen."),
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>+</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Pain Points", "Udfordringer")}</p>
                  <ul className="space-y-1.5">
                    {[
                      tr("Investigation fatigue accumulates from the repetitive effort of processing low-signal alerts, not alert volume alone.", "Træthed opstår af den gentagne indsats med at behandle alarmer med lav signalværdi – ikke alene af mængden af alarmer."),
                      tr("Investigation context is spread across multiple tools: SIEM, ticketing, threat feeds, and internal documentation.", "Konteksten til undersøgelser er spredt over flere værktøjer: SIEM, ticketsystem, trusselsfeeds og intern dokumentation."),
                      tr("AI-generated recommendations often arrive without visible reasoning, making them difficult to trust or act on confidently.", "AI-genererede anbefalinger kommer ofte uden synlig begrundelse, hvilket gør dem svære at stole på og handle trygt på."),
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="text-red-400 shrink-0 mt-[1px]">−</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Needs", "Behov")}</p>
                  <ul className="space-y-1.5">
                    {[
                      tr("A single view that consolidates alert context, threat intelligence, and AI output.", "Én visning, der samler alarmkontekst, trusselsefterretninger og AI-output."),
                      tr("Visible AI reasoning so recommendations can be understood and reviewed.", "Synlige AI-begrundelser, så anbefalinger kan forstås og gennemgås."),
                      tr("A workflow that reduces cognitive load without removing human judgment.", "Et workflow, der mindsker den kognitive belastning uden at fjerne den menneskelige dømmekraft."),
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>+</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-2">{tr("Behaviors", "Adfærd")}</p>
                  <ul className="space-y-1.5">
                    {[
                      tr("Frequently moves between multiple tools during each investigation to gather and cross-reference context.", "Skifter ofte mellem flere værktøjer under hver undersøgelse for at samle og krydstjekke kontekst."),
                      tr("Relies on pattern recognition and prior experience to distinguish genuine threats from false positives.", "Bruger mønstergenkendelse og tidligere erfaring til at skelne reelle trusler fra falske positiver."),
                      tr("Reviews and verifies AI recommendations before acting when supporting evidence is unclear.", "Gennemgår og verificerer AI-anbefalinger, før der handles, når de understøttende beviser er uklare."),
                    ].map((item, i) => (
                      <li key={i} className="text-[15px] text-[#9CA3AF] flex gap-2 leading-snug">
                        <span className="shrink-0 mt-[1px]" style={{ color: ACCENT }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* ── 08 DESIGN PRINCIPLES ─────────────────────────────── */}
          <section id="principles" className="mb-20">
            <SectionTag num="06.1" label={tr("Design Principles", "Designprincipper")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Principles guiding every decision", "Principper bag hver beslutning")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("Five principles that translate the research into concrete design direction.", "Fem principper, der omsætter researchen til en konkret designretning.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <Card key={title} className="p-4 flex items-start gap-4">
                  <span className="text-lg shrink-0 mt-0.5" style={{ color: ACCENT }}>{icon}</span>
                  <div>
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 09 INFORMATION ARCHITECTURE ──────────────────────── */}
          <section id="ia" className="mb-20">
            <SectionTag num="06.2" label={tr("Information Architecture", "Informationsarkitektur")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Designed around the investigation workflow", "Designet omkring undersøgelsesworkflowet")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("The architecture follows the analyst's natural investigation process rather than organizing screens by feature. Each level builds on the previous one, progressively revealing context as analysts move from awareness to investigation to a final decision, minimizing context switching at every step.", "Arkitekturen følger analytikerens naturlige undersøgelsesproces i stedet for at organisere skærmene efter funktion. Hvert niveau bygger på det forrige og viser gradvist mere kontekst, efterhånden som analytikeren bevæger sig fra overblik til undersøgelse til en endelig beslutning – så kontekstskift minimeres i hvert trin.")}
            </p>

            <div className="border border-[#1A1A1A] rounded-xl overflow-hidden mb-8 bg-[#0A0A0A] p-4">
              <img src={IADiagram} alt={tr("SecureFlow Information Architecture — three-level investigation workflow", "SecureFlows informationsarkitektur — undersøgelsesworkflow i tre niveauer")} className="w-full block" />
            </div>

            <div className="space-y-3">
              {IA_TREE.map(({ level, label, sub, children }) => (
                <Card key={label} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[12px] font-mono font-bold" style={{ color: ACCENT }}>{level}</span>
                    <div>
                      <p className="text-white font-semibold text-[15px]">{label}</p>
                      <p className="text-[13px] text-[#6B7280]">{sub}</p>
                    </div>
                  </div>
                  <div className="pl-6 space-y-2 border-l border-[#2A2A2A]">
                    {children.map(c => (
                      <div key={c.label} className="flex items-start gap-2">
                        <span className="text-[#333] text-[12px] mt-0.5 shrink-0">└</span>
                        <div>
                          <p className="text-[#9CA3AF] text-[15px] font-medium">{c.label}</p>
                          <p className="text-[13px] text-[#4B5563]">{c.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 10 USER FLOW ─────────────────────────────────────── */}
          <section id="userflow" className="mb-20">
            <SectionTag num="06.3" label={tr("User Flow", "Brugerflow")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Primary Investigation Flow", "Primært undersøgelsesflow")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              The primary workflow from AI threat detection to a certified analyst decision. AI handles detection and context; analysts review the reasoning and own every final call.
            </p>
            {/* User Flow Diagram */}

            <div className="space-y-2">
              {USER_FLOW_STEPS.map(({ num, actor, label, desc }, idx) => (
                <div key={num} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                      style={{ background: ACCENT + '18', color: ACCENT, border: `1px solid ${ACCENT}44` }}
                    >
                      {num}
                    </div>
                    {idx < USER_FLOW_STEPS.length - 1 && (
                      <div className="w-px mt-1" style={{ background: '#2A2A2A', height: 24 }} />
                    )}
                  </div>
                  <Card className="flex-1 p-4 mb-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold text-[15px]">{label}</p>
                      <ActorTag actor={actor} />
                    </div>
                    <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* ── 11 FEATURE PRIORITIZATION ────────────────────────── */}
          <section id="features" className="mb-20">
            <SectionTag num="06.4" label={tr("Feature Prioritization", "Prioritering af funktioner")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("MoSCoW Prioritization", "MoSCoW-prioritering")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("MoSCoW (Must Have, Should Have, Could Have, and Won't Have) is a prioritization framework for defining product scope. It was applied here to focus the MVP on one complete workflow, from AI threat detection through analyst investigation to a certified decision.", "MoSCoW (Must Have, Should Have, Could Have og Won't Have) er en prioriteringsmodel til at afgrænse et produkts omfang. Den blev brugt her til at fokusere MVP'en på ét komplet workflow – fra AI-trusselsdetektion over analytikerens undersøgelse til en certificeret beslutning.")}
            </p>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MoSCoWBadge label="Must Have" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map(({ title, desc }) => (
                  <Card key={title} className="p-4">
                    <p className="text-white text-[15px] font-semibold mb-1">{title}</p>
                    <p className="text-[#6B7280] text-[15px] leading-[1.65]">{desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MoSCoWBadge label="Should Have" />
                </div>
                <div className="space-y-2">
                  {[
                    { title: tr("Team Dashboard", "Teamdashboard"),    desc: tr("Gives team leads visibility into alert volume, analyst workload, and overall investigation status.", "Giver teamledere indsigt i mængden af alarmer, analytikernes arbejdsbyrde og den samlede status for undersøgelser.") },
                    { title: tr("Report Templates", "Rapportskabeloner"),  desc: tr("Standardized formats that reduce the effort required to document and communicate triage outcomes to stakeholders.", "Standardiserede formater, der mindsker indsatsen ved at dokumentere og kommunikere triageresultater til interessenter.") },
                    { title: tr("Bulk Certification", "Massecertificering"), desc: tr("Enables analysts to certify multiple low-risk alerts at once, reducing manual effort on routine cases.", "Lader analytikerne certificere flere alarmer med lav risiko på én gang og mindsker det manuelle arbejde med rutinesager.") },
                  ].map(({ title, desc }) => (
                    <Card key={title} className="p-4">
                      <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MoSCoWBadge label="Could Have" />
                </div>
                <div className="space-y-2">
                  {[
                    { title: tr("Advanced Analytics", "Avanceret analyse"),    desc: tr("Trend data and investigation metrics that help teams identify patterns and improve triage processes over time.", "Trenddata og målepunkter for undersøgelser, der hjælper teams med at finde mønstre og forbedre triageprocesserne over tid.") },
                    { title: tr("External Integrations", "Eksterne integrationer"), desc: tr("Connections to ticketing and communication tools so certified outcomes can be routed without manual handoff.", "Forbindelser til ticket- og kommunikationsværktøjer, så certificerede resultater kan videresendes uden manuel overlevering.") },
                    { title: tr("Custom Alert Rules", "Tilpassede alarmregler"),    desc: tr("Configurable thresholds that allow teams to tailor detection sensitivity to their operational context.", "Konfigurerbare tærskler, der lader teams tilpasse detektionens følsomhed til deres driftskontekst.") },
                  ].map(({ title, desc }) => (
                    <Card key={title} className="p-4">
                      <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MoSCoWBadge label="Won't Have" />
                </div>
                <div className="space-y-2">
                  {[
                    { title: tr("Mobile Application", "Mobilapplikation"),         desc: tr("Deferred to a later phase; the primary analyst workflow is desktop-first and requires full investigation context.", "Udskudt til en senere fase; analytikerens primære workflow er desktop-first og kræver fuld kontekst til undersøgelsen.") },
                    { title: tr("Custom AI Model Training", "Træning af egne AI-modeller"),   desc: tr("Deferred to a later phase; model configuration is a distinct capability that sits outside the scope of the analyst-facing workflow.", "Udskudt til en senere fase; modelkonfiguration er en særskilt funktion, der ligger uden for det analytikerrettede workflow.") },
                    { title: tr("Threat Hunting Workspace", "Arbejdsrum til trusselsjagt"),   desc: tr("Deferred to a later phase; proactive investigation is a distinct workflow that extends beyond the reactive triage loop this product addresses.", "Udskudt til en senere fase; proaktiv undersøgelse er et særskilt workflow, der rækker ud over den reaktive triage, som produktet adresserer.") },
                    { title: tr("Multi-Tenant Administration", "Administration af flere tenants"), desc: tr("Deferred to a later phase; tenancy management is a platform-level capability that would be defined alongside organizational deployment requirements.", "Udskudt til en senere fase; tenant-administration er en funktion på platformsniveau, der skulle defineres sammen med organisationens krav til udrulning.") },
                  ].map(({ title, desc }) => (
                    <Card key={title} className="p-4">
                      <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 12 WIREFRAMES ────────────────────────────────────── */}
          <section id="wireframes" className="mb-20">
            <SectionTag num="06.5" label="Wireframes" />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Low-Fidelity Screens", "Low-fidelity-skærme")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("Low-fidelity wireframes were created to explore layout, information hierarchy, navigation, and the primary investigation workflow early in the process. Working at this level of fidelity allowed structural decisions to be made and revised quickly, before high-fidelity design added visual complexity.", "Low-fidelity-wireframes blev lavet tidligt i processen for at udforske layout, informationshierarki, navigation og det primære undersøgelsesworkflow. Arbejdet på dette niveau gjorde det muligt at træffe og revidere strukturelle beslutninger hurtigt, før high-fidelity-designet tilføjede visuel kompleksitet.")}
            </p>
            <div className="border border-[#E0E0E0] overflow-hidden mb-6 bg-[#F5F5F5] p-3">
              <img src={lofisecureflow} alt={tr("DetectAI Security Low-Fidelity Wireframes", "DetectAI Security low-fidelity-wireframes")} className="w-full block" />
            </div>
            <p className="text-[#9CA3AF] leading-7 text-[15px]">
              {tr("The wireframing phase helped validate the overall structure before moving into high-fidelity design. Layout, hierarchy, and workflow decisions were confirmed at this stage, which reduced the need for structural changes later in the process.", "Wireframe-fasen hjalp med at validere den overordnede struktur, før vi gik videre til high-fidelity-design. Beslutninger om layout, hierarki og workflow blev bekræftet her, hvilket mindskede behovet for strukturelle ændringer senere i processen.")}
            </p>
          </section>

          {/* ── 13 DESIGN SYSTEM ─────────────────────────────────── */}
          <section id="designsystem" className="mb-20">
            <SectionTag num="06.6" label={tr("Design System", "Designsystem")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Design System & Component Library", "Designsystem & komponentbibliotek")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("A lightweight design system was established to ensure visual and functional consistency across all screens. It provides a shared foundation for AI-assisted security workflows, defining how status, hierarchy, and interaction are communicated throughout the product.", "Et let designsystem blev etableret for at sikre visuel og funktionel konsistens på tværs af alle skærme. Det giver et fælles fundament for AI-assisterede sikkerhedsworkflows og definerer, hvordan status, hierarki og interaktion kommunikeres i hele produktet.")}
            </p>
            <div className="bg-[#BFD3D7] rounded-xl p-6 border border-[#222] mb-4">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-3">{tr("Color System — Semantic by Design", "Farvesystem — semantisk fra starten")}</p>
              <p className="text-sm text-[#374151] mb-4 leading-relaxed">
                {tr("Color is used to communicate system status rather than decoration. Each value carries a defined meaning: cyan for AI activity, red for active threats, amber for pending review, and green for certified outcomes. This allows analysts to interpret the state of an alert at a glance, without relying solely on text labels.", "Farver bruges til at kommunikere systemstatus frem for som dekoration. Hver farve har en defineret betydning: cyan for AI-aktivitet, rød for aktive trusler, ravgul for afventende gennemgang og grøn for certificerede resultater. Det lader analytikerne aflæse en alarms tilstand med ét blik uden kun at være afhængige af tekstlabels.")}
              </p>
              <img src={ColorPallete} alt={tr("DetectAI Security Color System", "DetectAI Security-farvesystem")} className="w-full block" />
            </div>
            <div className="bg-[#BFD3D7] rounded-xl p-6 border border-[#222]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#374151] mb-3">{tr("Component Library", "Komponentbibliotek")}</p>
              <p className="text-sm text-[#374151] mb-4 leading-relaxed">
                {tr("Reusable components, including buttons, cards, tables, alert badges, status indicators, and form controls, were built to maintain consistency across screens and reduce design effort on repeated patterns. The library makes the interface easier to extend and keeps the visual language coherent as the product scales.", "Genanvendelige komponenter – herunder knapper, kort, tabeller, alarmbadges, statusindikatorer og formularelementer – blev bygget for at bevare konsistensen på tværs af skærme og mindske designarbejdet ved gentagne mønstre. Biblioteket gør interfacet lettere at udvide og holder det visuelle sprog sammenhængende, når produktet vokser.")}
              </p>
              <img src={Componentlibrary} alt={tr("DetectAI Security Component Library", "DetectAI Security-komponentbibliotek")} className="w-full block" />
            </div>
          </section>

          {/* ── 14 FINAL SOLUTION ────────────────────────────────── */}
          <section id="solution" className="mb-20">
            <SectionTag num="07" label={tr("Solution", "Løsning")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Final Screens", "Endelige skærme")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("The final interface brings AI-assisted detection and human decision-making together into a unified investigation workflow. The design system is applied consistently across every screen, so analysts can review alerts, understand AI reasoning, and certify outcomes without losing context at any stage.", "Det endelige interface samler AI-assisteret detektion og menneskelig beslutningstagning i ét samlet undersøgelsesworkflow. Designsystemet er anvendt konsekvent på alle skærme, så analytikerne kan gennemgå alarmer, forstå AI'ens begrundelser og certificere resultater uden at miste konteksten undervejs.")}
            </p>
            <a
              href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&t=XcUaykmv6BsMdlzP-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block mb-8 border border-[#E0E0E0] overflow-hidden bg-[#F5F5F5] p-3"
            >
              <img src={HIFIDetectAI} alt={tr("DetectAI Security High-Fidelity Screens", "DetectAI Security high-fidelity-skærme")} className="w-full block" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> {tr("Interactive Prototype", "Interaktiv prototype")}
                </span>
              </div>
            </a>
            <div className="space-y-3 mb-16">
              {[
                {
                  title: tr("Dashboard", "Dashboard"),
                  desc: tr("The starting point for each investigation shift. Analysts see a prioritized view of active alerts organized by severity and status, giving them an immediate sense of what requires attention and in what order.", "Udgangspunktet for hver vagt. Analytikerne ser en prioriteret visning af aktive alarmer sorteret efter alvor og status, så de straks kan se, hvad der kræver opmærksomhed, og i hvilken rækkefølge."),
                },
                {
                  title: tr("Alert Detail", "Alarmdetaljer"),
                  desc: tr("The primary investigation screen. All relevant context, including the detected threat, AI analysis, and supporting evidence, is consolidated in one view, so analysts can assess the situation without navigating between tools.", "Den primære undersøgelsesskærm. Al relevant kontekst – herunder den opdagede trussel, AI-analysen og understøttende beviser – er samlet i én visning, så analytikerne kan vurdere situationen uden at navigere mellem værktøjer."),
                },
                {
                  title: tr("Decision Trail", "Beslutningsspor"),
                  desc: tr("The transparency layer between AI and analyst. Analysts can review the AI's confidence level, the evidence it considered, and the action it took before forming their own judgment, so every decision is informed rather than assumed.", "Gennemsigtighedslaget mellem AI og analytiker. Analytikerne kan gennemgå AI'ens sikkerhedsniveau, de beviser, den har vurderet, og den handling, den har udført, før de danner deres egen vurdering – så hver beslutning er informeret frem for antaget."),
                },
                {
                  title: tr("Analyst Certification", "Analytikercertificering"),
                  desc: tr("The final step in the investigation workflow. Analysts confirm the outcome, request further review, or escalate, all in a single action. The decision is recorded under their name, providing clear ownership of the outcome.", "Det sidste trin i undersøgelsesworkflowet. Analytikerne bekræfter resultatet, beder om yderligere gennemgang eller eskalerer – alt i én handling. Beslutningen registreres under deres navn, hvilket giver et klart ejerskab af resultatet."),
                },
              ].map(({ title, desc }) => (
                <Card key={title} className="p-4">
                  <p className="text-white text-[14px] font-semibold mb-1">{title}</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-bold text-white mb-3">{tr("Interactive Prototype", "Interaktiv prototype")}</h3>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-[15px]">
              {tr("The prototype covers the complete investigation workflow, from the initial alert queue through AI reasoning review to final analyst certification, across the primary screens and decision points.", "Prototypen dækker hele undersøgelsesworkflowet – fra den første alarmkø over gennemgang af AI'ens begrundelser til analytikerens endelige certificering – på tværs af de primære skærme og beslutningspunkter.")}
            </p>
            <div className="border p-8 text-center" style={{ background: '#071619', borderColor: ACCENT + '25' }}>
              <a
                href="https://www.figma.com/proto/x99rmVrbCpOXjIsGERz6r8/Detect-AI-Security?node-id=119-2928&viewport=-1132%2C-2663%2C0.47&t=KftzYpuQktPqZlFd-1&scaling=scale-down&content-scaling=fixed&page-id=15%3A11"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
                style={{ background: ACCENT, color: '#0D1117' }}
              >
                <FaExternalLinkAlt style={{ fontSize: '11px' }} /> {tr("Open Prototype", "Åbn prototype")}
              </a>
            </div>
          </section>

          {/* ── 16 DESIGN DECISIONS ──────────────────────────────── */}
          <section id="decisions" className="mb-20">
            <SectionTag num="07.2" label={tr("Design Decisions", "Designbeslutninger")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Key Decisions & Rationale", "Vigtigste beslutninger & begrundelser")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("Each decision below is grounded in a specific analyst need, with a real alternative considered and a clear rationale for the direction chosen.", "Hver beslutning nedenfor bygger på et konkret behov hos analytikeren, med et reelt alternativ overvejet og en klar begrundelse for den valgte retning.")}
            </p>
            <div className="space-y-4">
              {DESIGN_DECISIONS.map(({ num, decision, why, considered, tradeoff }) => (
                <Card key={num} className="p-6">
                  <div className="flex items-start gap-4">
                    <p className="text-4xl font-bold font-mono leading-none shrink-0" style={{ color: ACCENT + '28' }}>{num}</p>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-[16px] mb-3 leading-snug">{decision}</p>
                      <p className="text-[#9CA3AF] text-base leading-relaxed mb-4">{why}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#1A1A1A]">
                          <p className="text-[12px] font-mono uppercase tracking-widest text-red-400 mb-1">{tr("Alternative Considered", "Overvejet alternativ")}</p>
                          <p className="text-[14px] text-[#6B7280]">{considered}</p>
                        </div>
                        <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#1A1A1A]">
                          <p className="text-[12px] font-mono uppercase tracking-widest mb-1" style={{ color: ACCENT }}>{tr("Trade-off", "Afvejning")}</p>
                          <p className="text-[14px] text-[#6B7280]">{tradeoff}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 17 SUCCESS METRICS ───────────────────────────────── */}
          <section id="metrics" className="mb-20">
            <SectionTag num="07.3" label={tr("Success Metrics", "Succeskriterier")} />
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("How success would be measured", "Sådan ville succes blive målt")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-[15px]">
              {tr("The metrics below were identified during the design process as indicators of whether the product meets its original goals. Actual targets would need to be defined in collaboration with stakeholders and measured after implementation.", "Målepunkterne nedenfor blev identificeret i designprocessen som indikatorer for, om produktet lever op til de oprindelige mål. De faktiske målsætninger skulle fastlægges i samarbejde med interessenter og måles efter implementering.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { category: tr("Speed", "Hastighed"),          metric: tr("Time to certify per alert", "Tid til certificering pr. alarm"),               note: tr("Target: To be defined with stakeholders", "Mål: Fastlægges sammen med interessenter") },
                { category: tr("Accountability", "Ansvar"), metric: tr("Certification rate with named attribution", "Certificeringsrate med navngiven tilskrivning"), note: tr("Target: To be defined with stakeholders", "Mål: Fastlægges sammen med interessenter") },
                { category: tr("Volume", "Volumen"),         metric: tr("Alerts handled per analyst shift", "Alarmer behandlet pr. analytikervagt"),         note: tr("Target: To be defined with stakeholders", "Mål: Fastlægges sammen med interessenter") },
              ].map(({ category, metric, note }) => (
                <Card key={category} className="p-5 text-center">
                  <p className="text-[13px] font-semibold uppercase tracking-widest mb-2" style={{ color: ACCENT }}>{category}</p>
                  <p className="text-white text-[15px] font-medium mb-3 leading-snug">{metric}</p>
                  <p className="text-[13px] italic" style={{ color: '#374151' }}>{note}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── 18 REFLECTION ────────────────────────────────────── */}
          <section id="reflection" className="mb-8">
            <SectionTag num="08" label={tr("Reflection", "Refleksion")} />
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

            <h3 className="text-[20px] font-semibold text-white mb-6">{tr("Closing Reflection", "Afsluttende refleksion")}</h3>
            <div className="space-y-5 max-w-2xl">
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                {tr("The core challenge in SecureFlow was not detection — it was trust. An AI can be accurate and still be unusable if analysts cannot see how it reached a decision. That insight shaped the certification model and most of what followed: every screen exists to make AI reasoning legible enough for a human to act on it with confidence.", "Kerneudfordringen i SecureFlow var ikke detektion – det var tillid. En AI kan være præcis og alligevel ubrugelig, hvis analytikerne ikke kan se, hvordan den nåede frem til en beslutning. Den indsigt formede certificeringsmodellen og det meste af det, der fulgte: Hver skærm findes for at gøre AI'ens begrundelser tydelige nok til, at et menneske trygt kan handle på dem.")}
              </p>
              <p className="text-[#9CA3AF] leading-7 text-[15px]">
                {tr("The remaining open question is whether the design holds up under real conditions. Testing the investigation flow with actual SOC analysts — observing how they read evidence, where they hesitate, and what they actually need before certifying — would surface assumptions this concept cannot answer on its own.", "Det åbne spørgsmål er, om designet holder under virkelige forhold. At teste undersøgelsesflowet med rigtige SOC-analytikere – og observere, hvordan de læser beviser, hvor de tøver, og hvad de faktisk har brug for, før de certificerer – ville afdække antagelser, som dette koncept ikke kan besvare alene.")}
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
