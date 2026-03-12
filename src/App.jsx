import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen font-sans selection:bg-blue-500/30">
        <CustomCursor />
        <ScrollProgress />
        <BackToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
