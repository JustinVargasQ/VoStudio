import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { useLenis } from './hooks/useLenis';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { SectionDots } from './components/SectionDots';
import { BackToTop } from './components/BackToTop';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Manifesto } from './components/Manifesto';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Team } from './components/Team';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
  gsap.defaults({ duration: 0.001 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <ErrorBoundary>
      <div style={{ background: '#050505', position: 'relative' }}>
        <AnimatePresence>
          {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        </AnimatePresence>

        <Cursor />
        <ScrollProgress />
        <SectionDots />
        <BackToTop />
        <Navbar />

        <main>
          <Hero />
          <Marquee />
          <Manifesto />
          <Features />
          <Services />
          <Pricing />
          <Projects />
          <Process />
          <Team />
          <FAQ />
          <Contact />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
