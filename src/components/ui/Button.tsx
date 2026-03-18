import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function MagneticButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className, 
  ...props 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    let xTo = gsap.quickTo(button, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    let yTo = gsap.quickTo(button, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    let textXTo = gsap.quickTo(textRef.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    let textYTo = gsap.quickTo(textRef.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    
    let isHovering = false;

    const mouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
      textXTo(x * 0.1);
      textYTo(y * 0.1);
    };

    const mouseEnter = () => {
      isHovering = true;
      gsap.to(button, { scale: 1.03, duration: 0.3, ease: 'power3.out' });
      gsap.to(bgRef.current, { yPercent: -100, duration: 0.4, ease: 'power3.inOut' });
    };

    const mouseLeave = () => {
      isHovering = false;
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
      gsap.to(button, { scale: 1, duration: 0.3, ease: 'power3.out' });
      gsap.to(bgRef.current, { yPercent: 0, duration: 0.4, ease: 'power3.inOut' });
    };

    button.addEventListener('mousemove', mouseMove);
    button.addEventListener('mouseenter', mouseEnter);
    button.addEventListener('mouseleave', mouseLeave);

    return () => {
      button.removeEventListener('mousemove', mouseMove);
      button.removeEventListener('mouseenter', mouseEnter);
      button.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  const variants = {
    primary: 'bg-clay text-cream border border-clay hover:text-white',
    secondary: 'bg-moss text-cream border border-moss hover:bg-moss/90',
    outline: 'bg-transparent border border-cream/20 text-cream',
    ghost: 'bg-transparent text-cream hover:bg-cream/10'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-lg',
    icon: 'p-4'
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-[2rem] font-outfit uppercase tracking-wider font-semibold group',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span 
        ref={bgRef} 
        className={cn(
          "absolute top-full left-0 w-full h-full pointer-events-none rounded-[2rem]",
          variant === 'primary' ? 'bg-charcoal' : variant === 'outline' ? 'bg-cream' : 'bg-clay'
        )} 
      />
      <span ref={textRef} className="relative z-10 block pointer-events-none transition-colors duration-300 group-hover:text-[inherit]">
        {children}
      </span>
    </button>
  );
}
