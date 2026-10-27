import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Footer from './components/Footer';
import Ui from './components/UI';
import DanskeBank from './components/DanskeBank';
import PawPal from './components/PawPal';
import Novasol from './components/Novasol';
import Selskabslokale from './components/Selskabslokale';
import Glienke from './components/Glienke';
import Soulimous from './components/Soulimous';
import SecureFlow from './components/SecureFlow';
import MatchMe from './components/MatchMe';
import Portfolio from './components/Portfolio';
import Chatbot from './components/Chatbot';
import PharmaAI from './components/PharmaAI';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Loaded on demand so the large interactive case study doesn't weigh down the home page
const Atlas = lazy(() => import('./components/Atlas'));

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <About />
            <Skills />
            <Work />
            <Footer />
          </>
        } />
        <Route path="/work/danske-bank" element={<><DanskeBank /><Footer /></>} />
        <Route path="/work/pawpal" element={<><PawPal /><Footer /></>} />
        <Route path="/work/novasol" element={<><Novasol /><Footer /></>} />
        <Route path="/work/selskabslokale" element={<><Selskabslokale /><Footer /></>} />
        <Route path="/work/secureflow" element={<><SecureFlow /><Footer /></>} />
        <Route path="/work/matchme" element={<><MatchMe /><Footer /></>} />
        <Route path="/work/glienke" element={<><Glienke /><Footer /></>} />
        <Route path="/work/soulimous" element={<><Soulimous /><Footer /></>} />
        <Route path="/work/portfolio" element={<><Portfolio /><Footer /></>} />
        <Route path="/work/chatbot" element={<><Chatbot /><Footer /></>} />
        <Route path="/work/pharmaai" element={<><PharmaAI /><Footer /></>} />
        <Route path="/work/atlas" element={<Suspense fallback={<div className="min-h-screen bg-black" />}><Atlas /><Footer /></Suspense>} />
      </Routes>
    </div>
  );
}

export default App;
