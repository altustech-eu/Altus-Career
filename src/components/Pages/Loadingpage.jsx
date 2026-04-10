import React from "react";
import { motion } from "framer-motion";

const BirdIcon = ({ className }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Animated Wings */}
    <motion.path
      d="M20 7c-1.2 0-2.4 1.1-3.2 2.5C16 11 15 13 14 13s-2-2-2.8-3.5C10.4 8.1 9.2 7 8 7"
      animate={{
        d: [
          "M20 7c-1.2 0-2.4 1.1-3.2 2.5C16 11 15 13 14 13s-2-2-2.8-3.5C10.4 8.1 9.2 7 8 7", // Up
          "M22 12c-1.2 0-2.4-1.1-3.2-2.5C18 8 17 6 16 6s-2 2-2.8 3.5C12.4 10.9 11.2 12 10 12", // Mid
          "M20 17c-1.2 0-2.4-1.1-3.2-2.5C16 13 15 11 14 11s-2 2-2.8 3.5C10.4 15.9 9.2 17 8 17" // Down
        ]
      }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    />
    <path d="M12 13c-1 0-2-3-3-3s-2 3-3 3" />
    <path d="M4 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </motion.svg>
);

const Shimmer = () => (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "100%" }}
    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
  />
);

const SkeletonCard = ({ className }) => (
  <div className={`relative overflow-hidden bg-gray-200/40 rounded-[32px] ${className}`}>
    <Shimmer />
  </div>
);

export default function LoadingPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FB] font-inter flex flex-col overflow-hidden">
      {/* HEADER SKELETON */}
      <header className="w-full bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#003fa3]/5 rounded-xl flex items-center justify-center">
            <BirdIcon className="text-[#003fa3] w-6 h-6" />
          </div>
          <div className="h-5 w-28 bg-gray-100 rounded-full relative overflow-hidden">
             <Shimmer />
          </div>
        </div>
        <div className="hidden lg:flex gap-6">
           {[1, 2, 3].map((i) => (
             <div key={i} className="h-2 w-16 bg-gray-100 rounded-full relative overflow-hidden">
                <Shimmer />
             </div>
           ))}
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full" />
      </header>

      <div className="flex flex-1">
        {/* MAIN BODY SKELETON */}
        <main className="flex-1 p-8 md:p-12 space-y-12">
          
          <div className="space-y-4">
             <div className="h-12 w-72 bg-gray-200 rounded-2xl relative overflow-hidden"><Shimmer/></div>
             <div className="h-4 w-full max-w-md bg-gray-100 rounded-lg relative overflow-hidden"><Shimmer/></div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            <SkeletonCard className="h-36 min-w-[280px] flex-1" />
            <SkeletonCard className="h-36 min-w-[280px] flex-1" />
            <SkeletonCard className="h-36 min-w-[280px] flex-1" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <SkeletonCard className="h-[450px]" />
            <SkeletonCard className="h-[450px]" />
          </div>
        </main>

        {/* SIDEBAR SKELETON */}
        <aside className="w-[380px] bg-white border-l border-gray-100 p-10 hidden xl:flex flex-col items-center">
           <div className="w-28 h-28 rounded-[40px] bg-gray-100 relative overflow-hidden mb-6">
              <Shimmer />
           </div>
           <div className="h-5 w-44 bg-gray-200 rounded-full mb-3" />
           <div className="h-3 w-20 bg-gray-100 rounded-full mb-12" />
           
           <div className="w-full space-y-4">
              <div className="h-24 w-full bg-gray-50 rounded-[24px]" />
              <div className="h-24 w-full bg-gray-50 rounded-[24px]" />
           </div>
           
           <div className="w-full h-64 bg-[#003fa3]/5 rounded-[40px] mt-auto relative overflow-hidden">
              <BirdIcon className="absolute -right-4 -bottom-4 text-[#003fa3]/10 w-32 h-32 rotate-[-15deg]" />
           </div>
        </aside>
      </div>

      {/* OVERLAY BIRD LOADER */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F8F9FB]/80 backdrop-blur-sm pointer-events-none">
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
        >
            <div className="relative">
                {/* Outer pulsing ring */}
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-[-20px] bg-[#003fa3] rounded-full blur-2xl"
                />
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-20 h-20 bg-[#003fa3] rounded-[24px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,63,163,0.3)] relative z-10"
                >
                    <BirdIcon className="text-white w-10 h-10" />
                </motion.div>
            </div>
            <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-8 flex flex-col items-center gap-2"
            >
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#003fa3] ml-[0.5em]">Spreading Wings</span>
                <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div 
                            key={i}
                            animate={{ scale: [1, 1.5, 1], backgroundColor: ["#cbd5e1", "#003fa3", "#cbd5e1"] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                            className="w-1 h-1 rounded-full"
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
}