import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Analyze from './pages/Analyze.jsx';
import Library from './pages/Library.jsx';
import Dashboard from './pages/Dashboard.jsx';
import History from './pages/History.jsx';
import About from './pages/About.jsx';

/** Scroll back to the top whenever the route changes. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/analyze"   element={<Analyze />} />
          <Route path="/library"   element={<Library />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history"   element={<History />} />
          <Route path="/about"     element={<About />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
