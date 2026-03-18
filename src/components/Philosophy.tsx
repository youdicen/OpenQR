import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        yPercent: 30,
        ease: 'none'
      });
      
      gsap.from('.philo-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-48 px-4 bg-charcoal overflow-hidden border-y border-cream/5">
      {/* Background with parallax texturized look */}
      <div 
        ref={bgRef}
        className="absolute -top-[20%] left-0 w-full h-[140%] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"
        style={{ backgroundImage: 'url("/philosophy-bg.jpg")' }}
      />
      <div className="relative z-10 max-w-4xl scroll-m-20 mx-auto text-center">
        <h2 className="philo-text font-serif italic text-5xl md:text-7xl text-clay mb-10">
          La Disrupción en el Detalle
        </h2>
        <p className="philo-text font-mono text-cream/70 text-lg md:text-2xl leading-relaxed text-balance">
          Mientras la industria masifica interfaces genéricas, nosotros construimos precisión. Un código no es solo una ruta, es el umbral hacia una experiencia controlada. Cada píxel generado representa la síntesis entre estética absoluta y criptografía funcional.
        </p>
      </div>
    </section>
  );
}

export function Protocol() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.protocol-card');
      
      cards.forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
          scale: 1 - ((cards.length - i) * 0.05),
          y: i * -20,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const protocols = [
    { title: 'INC.01', desc: 'Acoplamiento inicial de las directivas algorítmicas.' },
    { title: 'VAL.02', desc: 'Renderizado del nodo criptográfico local para máxima privacidad.' },
    { title: 'EXP.03', desc: 'Salida del lienzo vectorial sin pérdida de resolución.' }
  ];

  return (
    <section id="protocol" ref={sectionRef} className="py-32 px-4 bg-charcoal">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        <h2 className="font-sans font-bold text-4xl text-cream text-center mb-8">
          Arquitectura del <span className="font-serif italic text-moss">Protocolo</span>
        </h2>
        
        {protocols.map((proto, idx) => (
          <div 
            key={idx} 
            className="protocol-card sticky top-32 w-full bg-charcoal border border-moss/40 p-10 md:p-16 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl"
            style={{ zIndex: idx }}
          >
            <div className="font-mono text-5xl md:text-7xl text-moss/30 font-bold uppercase tracking-tighter">
              {proto.title}
            </div>
            <div>
              <p className="font-sans text-xl md:text-2xl text-cream/90 text-balance">
                {proto.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
