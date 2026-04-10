import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export default function RoadsetSlider() {
  const [activeIndex, setActiveIndex] = useState(2);

  const experts = [
    { id: 0, name: "V. Mokrynchuk", role: "Marketing", station: "80", coord: "20167, 1724", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", color: "from-orange-400 to-red-500" },
    { id: 1, name: "Greg Prickril", role: "Product", station: "125", coord: "20167, 1724", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", color: "from-blue-400 to-indigo-600" },
    { id: 2, name: "Mohab Ayman", role: "AI Dev", station: "144", coord: "20167, 1724", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", color: "from-purple-400 to-fuchsia-600" },
    { id: 3, name: "Sarah Jenkins", role: "UI Design", station: "180", coord: "20167, 1724", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", color: "from-pink-400 to-rose-600" },
    { id: 4, name: "David Chen", role: "Cloud Arc", station: "210", coord: "20167, 1724", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80", color: "from-emerald-400 to-teal-600" },
  ];

  return (
    <section className="relative min-h-screen bg-[#f3f4f6] font-sans overflow-hidden flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. LIGHTER ATMOSPHERE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-200/50 via-transparent to-slate-300/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80" 
          className="w-full h-full object-cover opacity-20 grayscale" 
          alt="bg"
        />
      </div>

      {/* 2. THE CURVED LINE (Softened) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-full max-w-6xl h-60 mt-[550px] relative">
          <svg viewBox="0 0 1000 200" fill="none" className="w-full h-full overflow-visible opacity-30">
            <motion.path 
              d="M-50,40 C150,40 300,180 500,180 C700,180 850,40 1050,40" 
              stroke="#6366f1" 
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </div>
      </div>

      {/* 3. CENTER EDITORIAL CARD */}
      <div className="relative w-full max-w-[380px] h-[580px] z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full bg-white shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
          >
            {/* PORTRAIT AREA */}
            <div className="relative h-[60%] w-full overflow-hidden">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                src={experts[activeIndex].img} 
                className="w-full h-full object-cover grayscale contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-indigo-900/5 mix-blend-multiply" />
              
              <div className="absolute top-6 right-6">
                 <div className="px-2 py-1.5 border border-slate-200 bg-white/80 backdrop-blur-sm text-[8px] font-bold tracking-[0.2em] text-slate-800">
                    ALTUS // RD.26
                 </div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className={`absolute bottom-0 w-full h-[50%] bg-gradient-to-t ${experts[activeIndex].color} p-8 flex flex-col justify-end text-white`}>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <span className="text-[50px] italic font-light tracking-tighter block leading-[0.6] opacity-90">I made it</span>
                <span className="text-[68px] font-bold tracking-tighter block leading-[0.8]">Mine</span>
              </motion.div>

              <div className="space-y-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-70">
                  Sector: {experts[activeIndex].role}
                </p>
                
                <div className="flex justify-between items-center border-t border-white/20 pt-4">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold uppercase tracking-tight leading-none">
                      {experts[activeIndex].name}
                    </h3>
                    <p className="text-[8px] font-medium opacity-60 mt-1.5 uppercase tracking-widest">
                      Commander // Station {experts[activeIndex].station}
                    </p>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-colors"
                  >
                    <Play size={14} fill="currentColor" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. INTERACTION NODES (Spring Flow) */}
      <div className="relative w-full max-w-3xl h-32 mt-[-60px] z-30 flex items-center justify-center px-12">
        <div className="flex justify-between items-center w-full">
          {experts.map((exp, i) => {
            const isActive = activeIndex === i;
            // Adaptive Y position for the flow
            const yPos = i === 0 || i === 4 ? -30 : i === 1 || i === 3 ? 10 : 50;

            return (
              <div 
                key={exp.id}
                onClick={() => setActiveIndex(i)}
                className="group relative flex flex-col items-center cursor-pointer"
                style={{ transform: `translateY(${yPos}px)` }}
              >
                <div className={`mb-3 flex flex-col items-center transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-2 group-hover:opacity-50'}`}>
                  <span className="text-[7px] font-bold text-slate-500 mb-0.5">{exp.coord}</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-600">
                    ST.{exp.station}
                  </span>
                </div>

                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1.5 : 1,
                    backgroundColor: isActive ? "#4f46e5" : "#ffffff",
                    borderColor: isActive ? "#ffffff" : "#e2e8f0"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-3.5 h-3.5 rounded-full border-2 shadow-sm z-10"
                />
                
                {isActive && (
                  <motion.div 
                    layoutId="node-glow"
                    className="absolute inset-0 w-3.5 h-3.5 bg-indigo-500/30 blur-md rounded-full scale-[2.5]"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. MINIMAL FOOTER NAV */}
      <div className="absolute bottom-8 left-8 z-50">
         <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-slate-400" />
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400">System Live // 2026.04.10</span>
         </div>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
    </section>
  );
}