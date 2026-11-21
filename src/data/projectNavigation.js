import { tr } from '../context/LanguageContext';
// Project order for navigation
export const projectOrder = [
  { id: 'danske-bank', path: '/work/danske-bank', title: 'Danske Bank DevSecAI' },
  { id: 'pawpal', path: '/work/pawpal', title: 'PawPal App' },
  { id: 'novasol', path: '/work/novasol', title: 'Novasol Travel' },
  { id: 'selskabslokale', path: '/work/selskabslokale', title: 'Selskabslokale' },
  { id: 'secureflow', path: '/work/secureflow', title: 'DetectAI Security' },
  { id: 'pharmaai', path: '/work/pharmaai', title: 'PharmaAI' },
  { id: 'atlas', path: '/work/atlas', title: tr("ATLAS — Enterprise Design System", "ATLAS — Designsystem til virksomheder") },
  { id: 'aura', path: '/work/aura', title: tr("AURA — Premium Audio Shopping Experience", "AURA — Premium shoppingoplevelse for lyd") },
  { id: 'glienke', path: '/work/glienke', title: 'Glienke Design' },
  { id: 'soulimous', path: '/work/soulimous', title: 'Soulimous' },
  { id: 'matchme', path: '/work/matchme', title: 'MatchMe App' },
  { id: 'portfolio', path: '/work/portfolio', title: tr("My Portfolio", "Min portfolio") },
  { id: 'chatbot', path: '/work/chatbot', title: tr("AI Chatbot App", "AI-chatbot-app") }
];

// Helper to get prev/next project
export const getProjectNavigation = (currentPath) => {
  const currentIndex = projectOrder.findIndex(p => p.path === currentPath);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  const prev = currentIndex > 0 ? projectOrder[currentIndex - 1] : null;
  const next = currentIndex < projectOrder.length - 1 ? projectOrder[currentIndex + 1] : null;
  
  return { prev, next };
};