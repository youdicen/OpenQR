import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QrCode } from 'lucide-react';
import { MagneticButton } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Transition pill container transparent to blurred on scroll
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          targets: containerRef.current,
          className: 'bg-charcoal/40 backdrop-blur-xl border-cream/20 shadow-2xl'
        }
      });

      // Initial entry animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 px-4 py-6 mix-blend-difference">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-full border border-transparent transition-all duration-500"
      >
        <div className="flex items-center gap-2 text-cream">
          <QrCode className="w-8 h-8" />
          <span className="font-sans font-bold text-xl tracking-tight uppercase">OpenQR</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-mono text-sm text-cream/80">
          <a href="#features" className="hover:text-cream transition-colors">/features</a>
          <a href="#protocol" className="hover:text-cream transition-colors">/protocol</a>
          <a href="#generator" className="hover:text-cream transition-colors">/generator</a>
        </nav>

        <MagneticButton 
          variant="outline" 
          size="sm" 
          className="hidden md:block"
          onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Init Sequence
        </MagneticButton>
      </div>
    </header>
  );
}
