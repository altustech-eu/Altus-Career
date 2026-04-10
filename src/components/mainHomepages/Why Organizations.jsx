import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function VideoGrid() {
  const videos = [
    { name: "Precision Drilling", logo: "PRECISION", bg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000" },
    { name: "Bridgestone", logo: "BRIDGESTONE", bg: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000" },
    { name: "Cleveland Cavs", logo: "CAVALIERS", bg: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000" },
    { name: "Zoetis", logo: "ZOETIS", bg: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000" },
    { name: "CSR Global", logo: "CSR GLOBAL", bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000" },
    { name: "USC", logo: "USC UNIV", bg: "https://images.unsplash.com/photo-1541339907198-e08756defe3e?q=80&w=1000" },
  ];

  const luxuryEase = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxuryEase } }
  };

  return (
    <section className="py-24 bg-white font-inter overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 flex items-center gap-2">
              <ShieldCheck size={14} className="fill-blue-600/10" /> Global Partnerships
            </h4>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: luxuryEase }}
              className="text-5xl md:text-8xl font-bold text-slate-900 leading-[0.85] tracking-tighter uppercase"
            >
              Why Leaders <br /> <span className="text-[#001B5E]">Choose Altus.</span>
            </motion.h2>
          </div>
          <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed border-l border-slate-100 pl-8 pb-2">
            Scaling high-velocity teams for the world's most ambitious institutional organizations.
          </p>
        </div>

        {/* Cinematic Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-100"
        >
          {videos.map((video, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative group h-[550px] overflow-hidden border-r border-b border-slate-100 cursor-none"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 z-0">
                <motion.img 
                  src={video.bg} 
                  alt={video.name} 
                  className="w-full h-full object-cover grayscale brightness-90 transition-all duration-[1.2s] ease-out group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 bg-[#001B5E]/30 mix-blend-multiply opacity-60 group-hover:opacity-0 transition-opacity duration-700" />
              </div>

              {/* Top Meta */}
              <div className="absolute top-10 left-10 right-10 flex justify-between items-start z-20">
                 <div className="h-12 w-12 flex items-center justify-center rounded-none border border-white/20 backdrop-blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <ArrowUpRight size={20} className="text-white" />
                 </div>
                 <span className="text-white/40 text-[9px] font-bold tracking-[0.4em] uppercase tabular-nums">
                    Ref.00{i + 1}
                 </span>
              </div>

              {/* Branding Center */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-2xl font-black text-white tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 group-hover:tracking-[0.5em] transition-all duration-1000 ease-out">
                  {video.logo}
                </h3>
              </div>

              {/* Interactive Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-10 z-20 flex items-center gap-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-[#001B5E] shadow-2xl transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
                  <Play size={18} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-1">View Case Study</span>
                  <div className="h-[1.5px] w-0 bg-[#99F532] group-hover:w-full transition-all duration-700" />
                </div>
              </div>

              {/* Hover Grain Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}