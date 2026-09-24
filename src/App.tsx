import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-paper text-ink">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<main className="bg-paper"><Resume /></main>} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-rust">404</p>
                  <h1 className="mt-4 font-serif text-4xl font-black tracking-tight">This page doesn't exist.</h1>
                  <p className="mt-3 text-sm text-inksoft">The notebook you want is on the home page.</p>
                  <Link to="/" className="press mt-6 border-2 border-ink bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper">
                    Back home
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
