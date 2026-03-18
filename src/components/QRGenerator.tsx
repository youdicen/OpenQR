import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import gsap from 'gsap';
import { MagneticButton } from './ui/Button';
import { Upload, Download, RefreshCw } from 'lucide-react';

export function QRGenerator() {
  const [value, setValue] = useState('https://sidereai.com/');
  const [logo, setLogo] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.qr-container', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => setLogo(null);

  const downloadSVG = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'openqr-code.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPNG = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Set padding/size for high quality PNG
    const size = 1024;
    canvas.width = size;
    canvas.height = size;
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#F2F0E9'; // Cream background
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        const pngFile = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.download = 'openqr-code.png';
        link.href = pngFile;
        link.click();
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <section id="generator" ref={sectionRef} className="py-32 px-4 bg-charcoal text-cream relative">
      <div className="max-w-6xl mx-auto qr-container bg-cream/5 border border-cream/10 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 backdrop-blur-md">
        
        {/* Controls Layout */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h2 className="font-sans font-bold text-4xl mb-4">Secuencia QR</h2>
            <p className="font-mono text-sm text-cream/60 mb-8">
              Configura el enlace base y el distintivo gráfico. Todos los procesos son ejecutados localmente en el navegador.
            </p>
          </div>

          <div className="space-y-4 font-mono">
            <label className="block text-sm text-cream/70 uppercase tracking-widest">
              URL, Texto o Número
            </label>
            <input 
              type="text" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-charcoal border border-cream/20 rounded-2xl px-6 py-4 text-cream focus:outline-none focus:border-clay transition-colors"
              placeholder="https://sidereai.com/"
            />
          </div>

          <div className="space-y-4 font-mono">
            <label className="block text-sm text-cream/70 uppercase tracking-widest">
              Firma Corporativa (Logo)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center justify-center gap-2 bg-charcoal border border-cream/20 hover:border-moss px-6 py-4 rounded-2xl cursor-pointer transition-colors w-full text-sm">
                <Upload size={18} />
                <span>Cargar Imagen</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {logo && (
                <button 
                  onClick={removeLogo}
                  className="p-4 bg-charcoal border border-clay text-clay rounded-2xl hover:bg-clay hover:text-charcoal transition-colors"
                  title="Remover Logo"
                >
                  <RefreshCw size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preview & Actions */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10">
          <div ref={qrRef} className="bg-cream p-8 rounded-[2.5rem] shadow-2xl transition-transform hover:scale-105 duration-500">
            <QRCodeSVG 
              value={value || 'https://sidereai.com/'}
              size={300}
              bgColor="#F2F0E9"
              fgColor="#1A1A1A"
              level="H"
              includeMargin={false}
              imageSettings={logo ? {
                src: logo,
                x: undefined,
                y: undefined,
                height: 70,
                width: 70,
                excavate: true,
              } : undefined}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <MagneticButton variant="primary" onClick={downloadPNG} className="flex items-center gap-2">
              <Download size={18} /> Descargar PNG
            </MagneticButton>
            <MagneticButton variant="outline" onClick={downloadSVG} className="flex items-center gap-2">
              <Download size={18} /> Descargar SVG
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
