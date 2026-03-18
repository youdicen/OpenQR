import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MagneticButton } from './ui/Button';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(title1Ref.current, { y: 100, opacity: 0, duration: 1.2, delay: 0.5 })
        .from(title2Ref.current, { y: 100, opacity: 0, duration: 1.2, rotation: 5 }, "-=1")
        .from(textRef.current, { y: 50, opacity: 0, duration: 1 }, "-=0.8")
        .from(ctaRef.current, { y: 50, opacity: 0, duration: 1 }, "-=0.8");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Organic Lab Mood */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: 'url("/hero-bg.jpg")' 
        }}
      />
      
      {/* Gradient Overlay to Black/Charcoal */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-charcoal/30 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center mt-20">
        <h1 className="flex flex-col items-center leading-[0.85] tracking-tighter mb-8">
          <span ref={title1Ref} className="font-sans font-bold text-[12vw] md:text-[8vw] text-cream uppercase mix-blend-difference">
            OpenQR
          </span>
          <span ref={title2Ref} className="font-serif italic text-[8vw] md:text-[6vw] text-clay -mt-4 mix-blend-screen -ml-32">
            by Sidere AI.
          </span>
        </h1>
        
        <p ref={textRef} className="font-mono text-cream/70 max-w-xl text-lg md:text-xl mb-12">
          Codificando la privacidad. Validación instantánea y rapidez total para tus accesos. No es un sitio web, es tu secuencia de control.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
          <MagneticButton variant="primary" size="lg" onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}>
            Generar Código
          </MagneticButton>
          <MagneticButton variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Explorar Funciones
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
