import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Building2, Handshake, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CategoryBanner() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  // Custom luxury ease for the "smoothie" flow
  const luxuryEase = [0.22, 1, 0.36, 1];

  // Handle collapse logic on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 120) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  });

  const categories = [
    { id: "employers", label: "Employers", icon: <Users size={14} /> },
    { id: "institutions", label: "Institutions", icon: <Building2 size={14} /> },
    { id: "agents", label: "Agents", icon: <Handshake size={14} /> },
    { id: "investor", label: "Investor", icon: <TrendingUp size={14} /> },
  ];

  return (
    // Fixed positioning below main header (top-14)
    <div className="hidden md:flex fixed top-20 right-0 z-[60] justify-end pointer-events-none px-6 left-0 selection:bg-blue-100">
      <motion.nav
        initial={false}
        animate={{
          width: isCollapsed ? "130px" : "600px", // Expanded width adjusted for 4 cats
          height: isCollapsed ? "42px" : "48px",
          borderRadius: "100px", // Switch to pill for lighter visual weight
          y: isCollapsed ? -5 : 0
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.8, ease: luxuryEase }}
        className="
          /* Ultra-Light Glass Foundation */
          bg-white/30 
          backdrop-blur-xl
          
          /* Refined Border and Soft Shadows */
          border border-white/10 
          shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]
          
          /* Subtle Inner Depth Highlight */
          after:absolute after:inset-0 after:rounded-[100px] after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
          
          pointer-events-auto flex items-center overflow-hidden relative
        "
      >
        {/* LARGE VIEW: FULL LABELS */}
        <motion.div
          animate={{ 
            opacity: isCollapsed ? 0 : 1, 
            x: isCollapsed ? 60 : 0,
            filter: isCollapsed ? "blur(4px)" : "blur(0px)"
          }}
          transition={{ duration: 0.6, ease: luxuryEase }}
          className={`flex items-center justify-around w-full px-6 whitespace-nowrap ${isCollapsed ? 'pointer-events-none' : ''}`}
        >
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.id}>
              <button 
                onClick={() => navigate(`/${cat.id}`)}
                className="flex items-center gap-2 group transition-all relative"
              >
                <span className="text-blue-600 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {cat.icon}
                </span>
                <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-700 transition-colors uppercase tracking-[0.15em]">
                  {cat.label}
                </span>
                {/* Minimalist Hover Underline */}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-blue-600/20 transition-all duration-500 group-hover:w-full group-hover:left-0" />
              </button>
              {idx !== categories.length - 1 && (
                <div className="h-3 w-[1px] bg-slate-200/30 mx-2 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* COLLAPSED VIEW: PLUS ICON & LABEL */}
        <AnimatePresence>
          {isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: luxuryEase, delay: 0.1 }}
              className="absolute inset-0 flex items-center justify-center gap-2.5 px-4 pointer-events-none"
            >
              {/* Custom PLUS Icon - Refined Physics */}
              <motion.div
                animate={{ 
                    rotate: isHovered ? 90 : 0,
                    scale: isHovered ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center relative shadow-md shadow-blue-600/20"
              >
                <span className="absolute w-2 h-[1.5px] bg-white rounded-full" />
                <span className="absolute h-2 w-[1.5px] bg-white rounded-full" />
              </motion.div>

              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                Partner
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle texture highlight over the entire banner */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/[0.02] pointer-events-none rounded-[100px]" />
      </motion.nav>
    </div>
  );
}