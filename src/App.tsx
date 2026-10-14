import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";

import Home from "./components/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";

/** Jump to top on route change, but respect #anchor links. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#F2EFEA]">
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
