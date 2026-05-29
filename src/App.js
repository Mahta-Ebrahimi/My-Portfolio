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
import { Routes, Route } from 'react-router-dom';

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
        <Route path="/work/danske-bank" element={<DanskeBank />} />
        <Route path="/work/pawpal" element={<PawPal />} />
        <Route path="/work/novasol" element={<Novasol />} />
        <Route path="/work/selskabslokale" element={<Selskabslokale />} />
        <Route path="/work/secureflow" element={<SecureFlow />} />
        <Route path="/work/matchme" element={<MatchMe />} />
        <Route path="/work/glienke" element={<Glienke />} />
        <Route path="/work/soulimous" element={<Soulimous />} />
        <Route path="/work/portfolio" element={<Portfolio />} />
        <Route path="/work/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;
