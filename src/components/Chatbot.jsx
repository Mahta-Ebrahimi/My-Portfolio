import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import chatbotImg from '../assets/aichatbot.png';
import dsFoundations from '../assets/Chatbot_DS_Foundations.png';
import dsComponents from '../assets/Chatbot_DS_Components.png';
import dsStates from '../assets/Chatbot_DS_States.png';
import { getProjectNavigation } from '../data/projectNavigation';
import { tr } from '../context/LanguageContext';

const ACCENT = '#38BDF8';
const PROTOTYPE_URL = 'https://www.figma.com/proto/rJ5uZ8H61kQgZwPFsuAlK5/Untitled?node-id=50-1713&t=gxN2o0fY8Y98rBHN-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A524';

const SECTIONS = [
  { id: 'overview',      num: '01', label: tr("Overview", "Oversigt") },
  { id: 'design',        num: '02', label: tr("Design & UX", "Design & UX") },
  { id: 'system',        num: '03', label: tr("Design System", "Designsystem") },
  { id: 'bots',          num: '04', label: tr("The Two Assistants", "De to assistenter") },
  { id: 'build',         num: '05', label: tr("Build", "Udvikling") },
  { id: 'reflection',    num: '06', label: tr("Reflection", "Refleksion") },
];

const DESIGN_SYSTEM = [
  {
    label: tr("Colours & Foundations", "Farver & fundament"),
    desc: tr("A dark, low-glare palette built from five near-black surface tones: app canvas, the two assistant panels, cards, and the input field. They separate regions through subtle depth instead of heavy borders. Two saturated accents carry identity: blue (#00A8FF) for General AI and green (#00C77C) for Portfolio AI, with off-white primary text and a muted grey for secondary information. Typography follows a simple three-step scale (24px assistant titles, 16px body, 13px descriptions) on an 8–32px spacing rhythm, with 12, 16, 24px and pill-shaped corner radii.", "En mørk palet med lidt genskin, bygget af fem næsten sorte overfladetoner: app-lærredet, de to assistentpaneler, kort og inputfeltet. De adskiller områderne med diskret dybde i stedet for tunge kanter. To mættede accentfarver bærer identiteten: blå (#00A8FF) for General AI og grøn (#00C77C) for Portfolio AI, med offwhite primær tekst og en dæmpet grå til sekundær information. Typografien følger en enkel skala i tre trin (24px assistenttitler, 16px brødtekst, 13px beskrivelser) på en afstandsrytme fra 8 til 32px med hjørneradier på 12, 16 og 24px samt pilleform."),
    img: dsFoundations,
    alt: tr("Dual AI design system: colour palette, typography and spacing foundations", "Designsystem for de to AI'er: farvepalet, typografi og afstande"),
  },
  {
    label: tr("Core UI Components", "Centrale UI-komponenter"),
    desc: tr("Both assistants are assembled from the same components, so only the identity colour changes between them. The assistant identity card pairs a coloured icon tile with the assistant name. Suggested prompt cards use a thin vertical accent bar to show which assistant they belong to while keeping the label as the focus. The pill-shaped chat input carries a circular send button that inherits the active assistant's colour.", "Begge assistenter er sat sammen af de samme komponenter, så det kun er identitetsfarven, der skifter. Assistentens identitetskort kombinerer en farvet ikonflade med assistentens navn. Kortene med foreslåede prompts har en tynd lodret accentlinje, der viser, hvilken assistent de hører til, mens teksten forbliver i fokus. Det pilleformede chatfelt har en rund send-knap, der arver den aktive assistents farve."),
    img: dsComponents,
    alt: tr("Dual AI core UI components: assistant identity cards, suggested prompt cards and chat input", "Centrale UI-komponenter for de to AI'er: identitetskort, promptkort og chatfelt"),
  },
  {
    label: tr("Interaction Patterns & States", "Interaktionsmønstre & tilstande"),
    desc: tr("Six chat states are defined to keep the interface predictable throughout a conversation: Empty, with suggested prompts visible; Typing, with the composer active; Generating, with an animated typing indicator; Response, when the assistant message is shown; Error, with a clear retry option; and Disabled, when an action is unavailable. For accessibility, every colour cue is paired with a text label, so state and identity are never communicated by colour alone.", "Seks chattilstande er defineret, så interfacet er forudsigeligt gennem hele samtalen: Tom, med foreslåede prompts synlige; Skriver, med inputfeltet aktivt; Genererer, med en animeret skriveindikator; Svar, når assistentens besked vises; Fejl, med en tydelig mulighed for at prøve igen; og Deaktiveret, når en handling ikke er tilgængelig. Af hensyn til tilgængeligheden er hvert farvesignal parret med en tekstlabel, så tilstand og identitet aldrig kun formidles med farve."),
    img: dsStates,
    alt: tr("Dual AI interaction patterns: six chat states and accessibility guidelines", "Interaktionsmønstre for de to AI'er: seks chattilstande og retningslinjer for tilgængelighed"),
  },
];

const DESIGN_DECISIONS = [
  {
    icon: '◑',
    title: tr("A Dedicated Space per Assistant", "Et dedikeret rum til hver assistent"),
    desc: tr("Each assistant has its own panel with a header showing its name, icon, and purpose. The difference between the two is visible at a glance, without a settings menu to learn.", "Hver assistent har sit eget panel med en header, der viser navn, ikon og formål. Forskellen mellem de to ses med ét blik, uden en indstillingsmenu, man skal lære at bruge."),
  },
  {
    icon: '◐',
    title: tr("Colour as Identity", "Farve som identitet"),
    desc: tr("Blue marks General AI and green marks Portfolio AI. The colour runs through the icon, title, prompt cards, and send button, and is always paired with a text label.", "Blå markerer General AI, og grøn markerer Portfolio AI. Farven går igen i ikon, titel, promptkort og send-knap og er altid parret med en tekstlabel."),
  },
  {
    icon: '▣',
    title: tr("Prompt Cards Remove the Blank Page", "Promptkort fjerner den tomme side"),
    desc: tr("Three suggested prompts per assistant, each a short question with an arrow cue, show what each assistant can do and give the user a one-click starting point.", "Tre foreslåede prompts pr. assistent – hver et kort spørgsmål med en pil – viser, hvad assistenten kan, og giver brugeren et udgangspunkt med ét klik."),
  },
  {
    icon: '⊡',
    title: tr("Predictable Feedback", "Forudsigelig feedback"),
    desc: tr("Clearly defined states, from empty and typing to generating, error, and disabled, keep the conversation feeling responsive and make it obvious what the system is doing.", "Klart definerede tilstande – fra tom og skriver til genererer, fejl og deaktiveret – får samtalen til at føles responsiv og gør det tydeligt, hvad systemet laver."),
  },
];

const BOT_COMPARISON = [
  {
    name: 'General AI',
    tag: 'GPT-4o mini',
    color: '#00A8FF',
    desc: tr("A general assistant focused on product design, from concepts and best practices to tools, trends, and real-world examples.", "En generel assistent med fokus på produktdesign – fra begreber og best practices til værktøjer, trends og eksempler fra virkeligheden."),
    points: [
      tr("Blue identity colour", "Blå identitetsfarve"),
      tr("Subtitle: \"Powered by GPT-4o mini\"", "Undertitel: \"Powered by GPT-4o mini\""),
      tr("Prompts: What is product design?, What are the best tools for product design?, What are the latest trends in product design?", "Prompts: What is product design?, What are the best tools for product design?, What are the latest trends in product design?"),
    ],
  },
  {
    name: 'Portfolio AI',
    tag: tr("About Mahta", "Om Mahta"),
    color: '#00C77C',
    desc: tr("Designed for recruiters and collaborators. It answers questions about my skills, projects, background, and how to get in touch, in a friendly and professional tone.", "Designet til rekrutteringsfolk og samarbejdspartnere. Den besvarer spørgsmål om mine kompetencer, projekter, baggrund og hvordan man kontakter mig – i en venlig og professionel tone."),
    points: [
      tr("Green identity colour", "Grøn identitetsfarve"),
      tr("Subtitle: \"Explore my work and background\"", "Undertitel: \"Explore my work and background\""),
      tr("Prompts: Skills & expertise, Selected projects, Get in touch", "Prompts: Skills & expertise, Selected projects, Get in touch"),
    ],
  },
];

const STACK = [
  { layer: tr("Client", "Klient"), items: ['React', 'Tailwind CSS', tr("Chat UI components", "Chat-UI-komponenter")] },
  { layer: 'Server', items: ['Node.js', 'Express', tr("OpenAI API (GPT-4o mini)", "OpenAI API (GPT-4o mini)"), tr("Custom knowledge base", "Egen vidensbase")] },
];

const LEARNINGS = [
  { num: '01', title: tr("Identity needs more than colour", "Identitet kræver mere end farve"), desc: tr("Colour makes the active assistant recognisable at a glance, but it only works reliably when paired with names, icons, and labels. Designing these together made the interface clearer and more accessible.", "Farve gør den aktive assistent genkendelig med ét blik, men det virker kun pålideligt sammen med navne, ikoner og labels. Ved at designe dem samlet blev interfacet tydeligere og mere tilgængeligt.") },
  { num: '02', title: tr("Prompts set expectations", "Prompts sætter forventninger"), desc: tr("Suggested prompt cards do more than save typing. They show what each assistant is for, which reduces uncertainty before the first message is sent.", "Foreslåede promptkort gør mere end at spare tastetryk. De viser, hvad hver assistent er til, og mindsker usikkerheden, før den første besked sendes.") },
  { num: '03', title: tr("Design drives trust in chat UIs", "Design skaber tillid i chat-UI'er"), desc: tr("A chat interface lives or dies by feel. Streaming, typing state, and clear bot identity cues made the difference between feeling like a tool and feeling like a conversation.", "Et chatinterface står og falder med følelsen. Streaming, skriveindikator og tydelige signaler om botens identitet gjorde forskellen på at føles som et værktøj og at føles som en samtale.") },
];

export default function Chatbot() {
  const navigate = useNavigate();
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
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: '13px', color: ACCENT }}>◑</span>
              <h2 className="text-white font-bold text-[14px] leading-tight">AI Chatbot</h2>
            </div>
            <p className="text-[#4B5563] text-[13px] mb-3">{tr("UI/UX Design · 2024", "UI/UX-design · 2024")}</p>
            <div className="flex gap-1.5 flex-wrap">
              <span className="text-[12px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#020d14' }}>
                Figma
              </span>
              <span className="text-[12px] px-2 py-1 border" style={{ color: ACCENT, borderColor: ACCENT + '44', background: '#020d14' }}>
                React
              </span>
            </div>
          </div>

          {/* Table of contents */}
          <nav className="flex-1 px-4 py-5">
            <p className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-3 px-1" style={{ color: '#2A2A2A' }}>
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
                      <span className="font-mono text-[12px] shrink-0 tabular-nums" style={{ color: on ? ACCENT : '#2A2A2A' }}>
                        {num}
                      </span>
                      <span className={`text-[13px] font-medium leading-tight ${on ? 'text-white' : 'text-[#6B7280] group-hover:text-[#9CA3AF]'}`}>
                        {label}
                      </span>
                      {on && <div className="ml-auto w-[3px] h-4 rounded-full shrink-0" style={{ background: ACCENT }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Meta */}
          <div className="px-5 pt-4 pb-6 border-t border-[#1A1A1A] space-y-3">
            <div className="space-y-2">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">{tr("Role", "Rolle")}</p>
                <p className="text-[13px] text-[#9CA3AF]">{tr("UI/UX Designer & Developer", "UI/UX-designer & udvikler")}</p>
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-widest text-[#2A2A2A] mb-0.5">{tr("Tools", "Værktøjer")}</p>
                <p className="text-[13px] text-[#9CA3AF]">Figma · React · Node · OpenAI</p>
              </div>
            </div>
            <a
              href="https://github.com/Mahta-Ebrahimi/automation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[13px] font-semibold border transition-colors hover:text-white hover:border-white"
              style={{ color: ACCENT, borderColor: ACCENT + '66' }}
            >
              <FaGithub size={11} /> GitHub
            </a>
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-[13px] font-semibold text-[#0D0D0D] hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}
            >
              <FaExternalLinkAlt size={9} /> {tr("View Prototype", "Se prototype")}
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════ */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-24">

          {/* 01 — Overview */}
          <section id="overview" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("01 — Overview", "01 — Oversigt")}</p>
            <h1 className="text-[36px] sm:text-[44px] font-bold text-white mb-2 leading-[1.15]">{tr("AI Chatbot App", "AI-chatbot-app")}</h1>
            <p className="text-lg sm:text-xl text-[#6B7280] font-light mb-6">{tr("Two assistants. One interface. Designed for clarity.", "To assistenter. Ét interface. Designet til klarhed.")}</p>

            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-[#F0F0F0] overflow-hidden border border-[#E0E0E0] mb-8 rounded-lg"
            >
              <div className='p-2'>
                  <img src={chatbotImg} alt={tr("AI Chatbot App", "AI-chatbot-app")} className="w-full object-cover" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                <span className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
                  <FaExternalLinkAlt style={{ fontSize: '12px' }} /> {tr("Prototype in Figma", "Prototype i Figma")}
                </span>
              </div>
            </a>

            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("A dual-assistant chat experience that brings two AI assistants into one interface. General AI answers questions about product design, from concepts to tools and trends. Portfolio AI answers questions about my skills, projects, and experience, so recruiters can have a real conversation about my work without waiting for a reply.", "En chatoplevelse, der samler to AI-assistenter i ét interface. General AI besvarer spørgsmål om produktdesign – fra begreber til værktøjer og trends. Portfolio AI besvarer spørgsmål om mine kompetencer, projekter og erfaring, så rekrutteringsfolk kan føre en rigtig samtale om mit arbejde uden at vente på svar.")}
            </p>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("The focus of the project was the user experience: a calm, focused conversational UI where people always know which assistant they are talking to, what they can ask it, and what the system is doing.", "Projektets fokus var brugeroplevelsen: et roligt, fokuseret samtale-UI, hvor man altid ved, hvilken assistent man taler med, hvad man kan spørge om, og hvad systemet er i gang med.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '2', label: tr("Assistant identities", "Assistentidentiteter") },
                { value: '1', label: tr("Shared layout & component set", "Fælles layout & komponentsæt") },
                { value: '6', label: tr("Defined chat states", "Definerede chattilstande") },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#111] rounded-xl p-6 text-center border border-[#222]">
                  <p className="text-2xl font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-[13px] uppercase tracking-wider text-[#6B7280]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Design & UX */}
          <section id="design" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("02 — Design & UX", "02 — Design & UX")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Two Assistants, One Clear Experience", "To assistenter, én klar oplevelse")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-6 text-lg">
              {tr("The core UX challenge was bringing two very different assistants into a single product without confusing the user. Each assistant needed its own recognisable identity, while sharing the same layout and interaction patterns so the product still feels like one coherent experience.", "Den centrale UX-udfordring var at samle to meget forskellige assistenter i ét produkt uden at forvirre brugeren. Hver assistent skulle have sin egen genkendelige identitet og samtidig dele layout og interaktionsmønstre, så produktet stadig føles som én sammenhængende oplevelse.")}
            </p>

            <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6 mb-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>{tr("Design Challenge", "Designudfordring")}</p>
              <p className="text-[#D1D5DB] text-[16px] leading-relaxed italic">
                How might we let people talk to two different AI assistants in one interface, while always making it
                clear who is answering and what each assistant can help with?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {DESIGN_DECISIONS.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#111] rounded-xl p-5 border border-[#222]">
                  <span className="text-lg mb-3 block" style={{ color: ACCENT }}>{icon}</span>
                  <p className="text-white text-[15px] font-semibold mb-2">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-[3px] pl-6 py-1" style={{ borderColor: ACCENT }}>
              <p className="text-[#D1D5DB] text-[17px] italic leading-relaxed">
                {tr("\"A chatbot UI is not just a chat window — it's a handshake. The design has to make the user feel heard before they've even typed anything.\"", "\"Et chatbot-UI er ikke bare et chatvindue – det er et håndtryk. Designet skal få brugeren til at føle sig hørt, før de overhovedet har skrevet noget.\"")}
              </p>
            </blockquote>
          </section>

          {/* 03 — Design System */}
          <section id="system" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("03 — Design System", "03 — Designsystem")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("One System, Two Identities", "Ét system, to identiteter")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("The UI is built on a compact design system that lets two assistants share a single structure. Layout, components, and states are identical across both, while a dedicated identity colour tells the user which assistant they are talking to.", "UI'et er bygget på et kompakt designsystem, der lader to assistenter dele én struktur. Layout, komponenter og tilstande er ens for begge, mens en dedikeret identitetsfarve fortæller brugeren, hvilken assistent de taler med.")}
            </p>

            <div className="space-y-4">
              {DESIGN_SYSTEM.map(({ label, desc, img, alt }) => (
                <div key={label} className="bg-[#111] rounded-xl border border-[#222] overflow-hidden">
                  <div className="px-5 sm:px-6 pt-5 pb-4">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: ACCENT }}>{label}</p>
                    <p className="text-[#9CA3AF] text-[15px] leading-relaxed">{desc}</p>
                  </div>
                  <img src={img} alt={alt} className="w-full block border-t border-[#1A1A1A]" />
                </div>
              ))}
            </div>
          </section>

          {/* 04 — The Two Assistants */}
          <section id="bots" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("04 — The Two Assistants", "04 — De to assistenter")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("Meet the Assistants", "Mød assistenterne")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("Both assistants share the same layout and components. What sets them apart is their identity colour, their suggested prompts, and the content they are designed around.", "Begge assistenter deler layout og komponenter. Det, der adskiller dem, er deres identitetsfarve, deres foreslåede prompts og det indhold, de er designet omkring.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BOT_COMPARISON.map(({ name, tag, color, desc, points }) => (
                <div key={name} className="bg-[#111] rounded-xl border border-[#222] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#1A1A1A]">
                    <span className="text-[12px] font-bold px-2 py-1 rounded font-mono" style={{ color, background: color + '18' }}>
                      {tag}
                    </span>
                    <p className="font-bold text-[15px] mt-3" style={{ color }}>{name}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[#6B7280] text-base leading-relaxed mb-4">{desc}</p>
                    <ul className="space-y-2">
                      {points.map(pt => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-[#9CA3AF]">
                          <span style={{ color }}>+</span>{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — Build */}
          <section id="build" className="mb-20">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("05 — Build", "05 — Udvikling")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-4 leading-snug">{tr("From Design to Working Product", "Fra design til fungerende produkt")}</h2>
            <p className="text-[#9CA3AF] leading-7 mb-8 text-lg">
              {tr("I also built the app myself, so the design could be experienced in a real browser with real AI responses. The React frontend implements the chat UI, while a Node.js server calls OpenAI's GPT-4o mini and keeps the API key out of the client.", "Jeg byggede også selv appen, så designet kunne opleves i en rigtig browser med rigtige AI-svar. React-frontenden implementerer chat-UI'et, mens en Node.js-server kalder OpenAI's GPT-4o mini og holder API-nøglen væk fra klienten.")}
            </p>

            <div className="space-y-4">
              {STACK.map(({ layer, items }) => (
                <div key={layer} className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-[#1A1A1A] flex items-center gap-3">
                    <span className="font-mono text-[12px] font-bold" style={{ color: ACCENT }}>/{layer.toLowerCase()}</span>
                    <span className="text-[13px] font-semibold text-[#374151] uppercase tracking-wider">{layer}</span>
                  </div>
                  <div className="px-5 py-4 flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item} className="text-[12px] bg-[#111] border border-[#222] px-3 py-1.5 text-[#9CA3AF] rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 06 — Reflection */}
          <section id="reflection" className="mb-8">
            <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>{tr("06 — Reflection", "06 — Refleksion")}</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold text-white mb-8 leading-snug">{tr("Key Learnings", "Vigtigste læringer")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {LEARNINGS.map(({ num, title, desc }) => (
                <div key={num} className="bg-[#111] rounded-xl p-6 border border-[#222]">
                  <p className="text-4xl font-bold font-mono mb-4 leading-none" style={{ color: '#0a1520' }}>{num}</p>
                  <p className="text-white font-semibold text-[15px] mb-3 leading-snug">{title}</p>
                  <p className="text-[#6B7280] text-base leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="rounded-xl p-8 border mb-12 bg-[#020d14]" style={{ borderColor: ACCENT + '33' }}>
              <p className="text-[13px] font-mono tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>{tr("Try It", "Prøv den")}</p>
              <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                {tr("Explore the interface in the Figma prototype or dive into the source code on GitHub.", "Udforsk interfacet i Figma-prototypen, eller dyk ned i kildekoden på GitHub.")}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PROTOTYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm transition-opacity"
                  style={{ background: ACCENT, color: '#0D0D0D' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <FaExternalLinkAlt size={12} /> {tr("Prototype", "Prototype")}
                </a>
                <a
                  href="https://github.com/Mahta-Ebrahimi/automation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm transition-opacity"
                  style={{ background: ACCENT, color: '#0D0D0D' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <FaGithub size={14} /> GitHub
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A]">
              <button onClick={() => navigate('/#work')} className="text-[13px] text-[#6B7280] hover:text-white transition-colors">
                {tr("← Back to Work", "← Tilbage til projekter")}
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
