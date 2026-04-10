import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Download, ChevronLeft, ChevronRight, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";


// --- DATA GENERATOR ---
const generatePages = () => {
  const categories = ["Medical", "Technology", "Engineering", "Services", "Artisan", "Finance"];
  const pages = [];
  for (let i = 0; i < 26; i++) {
    const type = categories[i % categories.length];
    pages.push({
      left: { 
        title: `Module ${i + 1}`, 
        type: type, 
        content: `Official technical framework and certification requirements for the ${type} sector in Germany.`, 
        id: `altus-module-${i + 1}` 
      },
      right: { 
        title: `Strategic ${type}`, 
        type: "Outcome", 
        content: `Expected salary progression and career milestones for international talent in 2026.`, 
        id: `altus-outcome-${i + 1}` 
      }
    });
  }
  return pages;
};

const bookPages = generatePages();

export default function RealBookUI() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const flipPageRef = useRef(null);
  const navigate = useNavigate();

  // Luxury ease for the "smoothie" flow
  const luxuryEase = [0.22, 1, 0.36, 1];

  const triggerRealDownload = (id, title) => {
    setDownloading(id);
    setTimeout(() => {
      const content = `Altus Career - Official Document: ${title}\nGenerated for 2026 intake.\nRef ID: ${id}`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloading(null);
    }, 800);
  };

  const handleNext = () => {
    if (currentIndex < bookPages.length - 1 && !isAnimating) {
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(prev => prev + 1);
          gsap.set(flipPageRef.current, { rotateY: 0, display: "none", z: 0 });
          setIsAnimating(false);
        }
      });
      gsap.set(flipPageRef.current, { display: "block", rotateY: 0, z: 0 });
      tl.to(flipPageRef.current, { 
        rotateY: -180, 
        z: 40, // Smoothie lift
        duration: 0.9, 
        ease: "power2.inOut", 
        transformOrigin: "left center" 
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(prev => prev - 1);
          gsap.set(flipPageRef.current, { rotateY: -180, display: "none", z: 0 });
          setIsAnimating(false);
        }
      });
      gsap.set(flipPageRef.current, { display: "block", rotateY: -180, z: 0 });
      tl.to(flipPageRef.current, { 
        rotateY: 0, 
        z: 40, // Smoothie lift
        duration: 0.9, 
        ease: "power2.inOut", 
        transformOrigin: "left center" 
      });
    }
  };

  const PageContent = ({ page, side }) => (
    <div className={`relative w-full h-full p-8 md:p-14 flex flex-col justify-between bg-white ${side === 'left' ? 'border-r border-slate-100' : ''}`}>
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      
      <div className="relative z-10">
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-500 block mb-8 opacity-60">
          {page.type}
        </span>
        <h2 className="text-3xl md:text-4xl font-light font-poppins uppercase tracking-tighter text-slate-900 mb-6 leading-tight">
          {page.title.split(' ')[0]} <span className="font-bold">{page.title.split(' ')[1]}</span>
        </h2>
        <p className="text-sm leading-relaxed text-slate-400 max-w-xs mb-10 font-normal">
          {page.content}
        </p>
        
        <button 
          onClick={() => triggerRealDownload(page.id, page.title)}
          className="flex items-center gap-3 px-6 py-3 border border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all rounded-full group"
        >
          {downloading === page.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />}
          <span className="text-[10px] font-bold uppercase tracking-widest">Get Blueprint</span>
        </button>
      </div>
      
      <div className="relative z-10 text-[9px] font-bold text-slate-200 tracking-[0.3em] uppercase">
        {side === 'left' ? `P. 0${currentIndex * 2 + 1}` : `P. 0${currentIndex * 2 + 2}`}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-inter overflow-hidden relative selection:bg-blue-100">
      
      {/* BACK TO HOME - MAGNETIC STYLE */}
      <Link 
        to="/" 
        className="fixed top-8 left-8 flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all group z-[100]"
      >
        <motion.div 
          whileHover={{ x: -2 }}
          className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-xl transition-all"
        >
          <ArrowLeft size={18} />
        </motion.div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exit Library</span>
      </Link>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;800&display=swap');
        .book-container { perspective: 3000px; }
        .page-flip-container { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />

      <div className="book-container relative w-full max-w-5xl aspect-[1.5/1] z-10">
        {/* STATIC LAYER */}
        <div className="absolute inset-0 flex bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="w-1/2 h-full">
            <PageContent page={bookPages[isAnimating ? currentIndex : currentIndex].left} side="left" />
          </div>
          <div className="w-1/2 h-full">
             <PageContent page={bookPages[isAnimating ? currentIndex : currentIndex].right} side="right" />
          </div>
        </div>

        {/* FLIPPING LAYER */}
        <div 
          ref={flipPageRef}
          className="page-flip-container absolute right-0 top-0 w-1/2 h-full z-50 hidden"
          style={{ transformOrigin: "left center" }}
        >
          <div className="absolute inset-0 backface-hidden z-20">
            <PageContent page={bookPages[currentIndex].right} side="right" />
          </div>
          <div className="absolute inset-0 backface-hidden bg-white" style={{ transform: "rotateY(180deg)" }}>
            {bookPages[currentIndex + 1] && <PageContent page={bookPages[currentIndex + 1].left} side="left" />}
            <div className="absolute inset-0 bg-gradient-to-r from-black/[0.03] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* BINDING SPINE */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-slate-100 z-[60]" />
      </div>

      {/* REFINED CONTROLS */}
      <div className="mt-16 flex items-center gap-16 z-10">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0 || isAnimating}
          className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center gap-3 ${currentIndex === 0 ? 'opacity-10' : 'text-slate-400 hover:text-slate-900'}`}
        >
          <ChevronLeft size={18} /> Prev
        </button>

        <div className="flex flex-col items-center min-w-[120px]">
           <span className="text-[9px] font-bold text-slate-300 mb-3 uppercase tracking-[0.3em]">Module {currentIndex + 1} of 26</span>
           <div className="w-full h-[1.5px] bg-slate-100 relative overflow-hidden">
              <motion.div 
                className="absolute h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" 
                animate={{ width: `${((currentIndex + 1) / 26) * 100}%` }}
                transition={{ duration: 0.8, ease: luxuryEase }}
              />
           </div>
        </div>

        <button 
          onClick={handleNext} 
          disabled={currentIndex === bookPages.length - 1 || isAnimating}
          className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center gap-3 ${currentIndex === bookPages.length - 1 ? 'opacity-10' : 'text-slate-400 hover:text-slate-900'}`}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* BACKGROUND ACCENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}