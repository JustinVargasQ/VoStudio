import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';

function CurtainOverlay() {
  const { curtainPhase, curtainBg, curtainDuration, curtainEase } = useApp();
  return (
    <div aria-hidden="true" style={{
      position: 'fixed', inset: 0,
      background: curtainBg,
      transformOrigin: 'top',
      transform: curtainPhase === 'falling' ? 'scaleY(1)' : 'scaleY(0)',
      transition: curtainPhase !== 'idle' ? `transform ${curtainDuration}ms ${curtainEase}` : 'none',
      zIndex: 99999,
      pointerEvents: 'none',
    }} />
  );
}
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { CTABanner } from './components/CTABanner';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ErrorBoundary>
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Pricing />
        <Projects />
        <Process />
        <CTABanner />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <CurtainOverlay />
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  );
}
