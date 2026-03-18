
export function Footer() {
  return (
    <footer className="relative bg-[#0d0d0d] pt-24 pb-12 px-8 rounded-t-[3rem] sm:rounded-t-[4rem] text-cream/50 font-mono text-sm mt-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="flex items-center gap-4">
            <span className="font-sans font-bold text-2xl tracking-tighter text-white">OPENQR</span>
            <div className="bg-white/10 px-3 py-1 rounded-full text-xs text-white/40 tracking-widest uppercase">
              By Sidere AI
            </div>
          </div>
          <p className="text-balance text-cream/40">
            Advanced cryptographic node generation for the modern infrastructure. A demonstration of digital precision by Sidere AI.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase text-xs tracking-widest font-semibold text-white/50">System Nominal</span>
          </div>
          <p>© {new Date().getFullYear()} Sidere AI. Todos los derechos reservados.</p>
          <a href="https://sidereai.com" target="_blank" rel="noreferrer" className="hover:text-clay transition-colors uppercase tracking-widest text-xs mt-2">
            Visit Sidereai.com
          </a>
        </div>
      </div>
    </footer>
  );
}
