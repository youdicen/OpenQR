import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { QRGenerator } from './components/QRGenerator';
import { Philosophy, Protocol } from './components/Philosophy';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smoother scroll basic handling can be added here if needed
    let ctx = gsap.context(() => {
      // Global animations
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-charcoal text-cream selection:bg-clay selection:text-cream">
      {/* Global SVG Noise Filter */}
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <Header />
      
      <main className="relative z-10 flex flex-col justify-start">
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <QRGenerator />
      </main>

      <Footer />
    </div>
  );
}

export default App;
