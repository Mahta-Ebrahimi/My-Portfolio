// Project order for navigation
export const projectOrder = [
  { id: 'danske-bank', path: '/work/danske-bank', title: 'Danske Bank DevSecAI' },
  { id: 'pawpal', path: '/work/pawpal', title: 'PawPal App' },
  { id: 'novasol', path: '/work/novasol', title: 'Novasol Travel' },
  { id: 'selskabslokale', path: '/work/selskabslokale', title: 'Selskabslokale' },
  { id: 'secureflow', path: '/work/secureflow', title: 'DetectAI Security' },
  { id: 'glienke', path: '/work/glienke', title: 'Glienke Design' },
  { id: 'soulimous', path: '/work/soulimous', title: 'Soulimous' },
  { id: 'matchme', path: '/work/matchme', title: 'MatchMe App' },
  { id: 'portfolio', path: '/work/portfolio', title: 'My Portfolio' },
  { id: 'chatbot', path: '/work/chatbot', title: 'AI Chatbot App' }
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