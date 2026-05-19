import { ErrorBoundary } from './components/ErrorBoundary';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
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
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
