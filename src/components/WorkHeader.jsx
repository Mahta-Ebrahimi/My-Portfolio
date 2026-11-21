import { tr } from '../context/LanguageContext';

export default function WorkHeader() {
  return (
    <header style={{ marginBottom: 52, textAlign: 'center' }}>
      <h1 style={{
        fontSize: 'clamp(26px, 2.4vw, 38px)',
        fontWeight: 700,
        color: 'var(--g-text, #FFFFFF)',
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
        margin: 0,
      }}>
        {tr('Featured Works', 'Udvalgte projekter')}
      </h1>
    </header>
  );
}
