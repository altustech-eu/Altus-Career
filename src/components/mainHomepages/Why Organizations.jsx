import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";

export default function VideoGrid() {
  const videos = [
    {
      name: "Precision Drilling",
      logo: "PRECISION",
      bg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Bridgestone",
      logo: "BRIDGESTONE",
      bg: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Cleveland Cavs",
      logo: "CAVALIERS",
      bg: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Zoetis",
      logo: "ZOETIS",
      bg: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "CSR Global",
      logo: "CSR GLOBAL",
      bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "USC",
      logo: "USC UNIV",
      bg: "https://images.unsplash.com/photo-1541339907198-e08756defe3e?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const ease = [0.22, 1, 0.36, 1]; // Smooth luxury easing

  return (
    <section className="py-24 bg-white font-sans overflow-hidden selection:bg-blue-600 selection:text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.85] tracking-tighter uppercase"
            >
              Why Leaders <br /> Choose Altus.
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-slate-400 text-sm font-medium max-w-xs md:mt-4 md:border-l md:border-slate-100 md:pl-8 leading-relaxed"
          >
            We partner with ambitious organizations to build high-velocity teams and digital ecosystems.
          </motion.div>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-100">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-[500px] overflow-hidden border-r border-b border-slate-100 cursor-pointer"
            >
              {/* Image Container */}
              <div className="absolute inset-0 z-0">
                <motion.img 
                  src={video.bg} 
                  alt={video.name} 
                  className="w-full h-full object-cover grayscale brightness-75 transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              {/* Meta Info */}
              <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                 <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={18} className="text-white" />
                 </div>
                 <span className="text-white/30 text-[10px] font-bold tracking-[0.3em]">
                    0{i + 1} // 2026
                 </span>
              </div>

              {/* Center Branding */}
              <div className="absolute inset-0 flex items-center justify-center px-12 z-20">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out">
                    {video.logo}
                  </h3>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-10 z-30 translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-900 shadow-2xl transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">Launch Case</p>
                    <div className="h-[1px] w-0 group-hover:w-full bg-white/50 transition-all duration-700 mt-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}