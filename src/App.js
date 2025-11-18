import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Footer from './components/Footer';
import Ui from './components/UI';
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Work />
      {/* <Ui /> */}
      
      <Footer />
      {/* <Contact /> */}
    </div>
  );
}

export default App;
