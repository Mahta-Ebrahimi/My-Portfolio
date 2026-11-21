// The language is fixed for the lifetime of the page: it is read once at startup,
// and switching it saves the choice and reloads. That lets page content defined
// at module level (section lists, data arrays) call tr() directly.

const detectLang = () => {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'da' || saved === 'en') return saved;
  } catch (e) {}
  return (navigator.language || '').toLowerCase().startsWith('da') ? 'da' : 'en';
};

export const lang = detectLang();
document.documentElement.lang = lang;

// tr('English text', 'Dansk tekst') — picks the string for the active language
export const tr = (en, da) => (lang === 'da' ? da : en);

export const toggleLang = () => {
  try {
    localStorage.setItem('lang', lang === 'da' ? 'en' : 'da');
  } catch (e) {}
  window.location.reload();
};

// Merges a project's `da` overrides on top of its English fields
export const localizeProject = (proj) =>
  lang === 'da' && proj.da ? { ...proj, ...proj.da } : proj;
