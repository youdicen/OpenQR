import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PrivacyShuffler() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.shuffle-card');
      gsap.to(cards, {
        y: (i) => -10 - (i * 5),
        x: (i) => (i % 2 === 0 ? 5 : -5),
        rotation: (i) => (i % 2 === 0 ? 3 : -3),
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'power1.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-32 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <div 
          key={i}
          className={`shuffle-card absolute w-24 h-24 bg-charcoal border border-cream/20 rounded-xl flex items-center justify-center shadow-lg`}
          style={{ zIndex: i }}
        >
          <div className="w-12 h-12 border border-dashed border-clay/50 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function TelemetryTypewriter() {
  const [text, setText] = useState('');
  const finalString = "SYS.VALIDATED_OK";

  useEffect(() => {
    let interval: number;
    let i = 0;
    
    const animate = () => {
      if (i <= finalString.length) {
        const randomHash = Math.random().toString(36).substring(2, 8).toUpperCase();
        setText(finalString.substring(0, i) + (i < finalString.length ? randomHash : ''));
        i++;
      } else {
        i = 0; // Reset for infinite loop
      }
    };

    interval = window.setInterval(animate, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-32 bg-charcoal border border-cream/10 rounded-2xl flex items-center justify-center p-4">
      <span className="font-mono text-clay text-sm text-center tracking-widest">
        {text}
        <span className="animate-pulse">_</span>
      </span>
    </div>
  );
}

function ProtocolScheduler() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(barRef.current, { scaleX: 1, duration: 2, ease: 'power2.inOut' })
        .to(barRef.current, { scaleX: 0, duration: 0.5, ease: 'power4.in', delay: 1 });
      
      gsap.to(cursorRef.current, { opacity: 0, repeat: -1, yoyo: true, duration: 0.4 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-32 flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-[12rem] h-1 bg-charcoal rounded-full overflow-hidden relative">
        <div ref={barRef} className="absolute top-0 left-0 h-full w-full bg-clay origin-left scale-x-0" />
      </div>
      <div className="flex items-center gap-2 font-mono text-xs text-cream/60">
        <span>EXECUTING_SEQ</span>
        <div ref={cursorRef} className="w-2 h-3 bg-cream" />
      </div>
    </div>
  );
}

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Privacidad Total',
      desc: 'Criptografía de estado sólido para tu información.',
      ui: <PrivacyShuffler />
    },
    {
      title: 'Validación Instantánea',
      desc: 'Confirmación de integridad en milisegundos.',
      ui: <TelemetryTypewriter />
    },
    {
      title: 'Rapidez',
      desc: 'Protocolos de latencia nula optimizados.',
      ui: <ProtocolScheduler />
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-32 px-4 bg-charcoal relative z-20 border-t border-cream/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-cream mb-6">
            Ingeniería de <span className="font-serif italic text-moss">Precisión</span>
          </h2>
          <p className="font-mono text-cream/60 max-w-2xl mx-auto">
            Propuestas de valor procesadas mediante arquitectura de alto rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="feature-card bg-cream/5 border border-cream/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center transition-colors hover:bg-cream/10"
            >
              <div className="w-full mb-12">
                {feat.ui}
              </div>
              <h3 className="font-sans font-bold text-2xl text-cream mb-4">{feat.title}</h3>
              <p className="font-mono text-sm text-cream/70 text-balance leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
