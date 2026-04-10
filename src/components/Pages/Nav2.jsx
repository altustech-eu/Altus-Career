import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Globe, User} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// IMPORT LOGO
import logo2 from "../../assets/logo2.png"; 

// --- VECTOR HIGHLIGHT COMPONENT ---
const VectorHighlight = ({ children, color = "#a3e635", className = "" }) => (
  <span className={`relative inline-block px-2 ${className}`}>
    <span className="relative z-10">{children}</span>
    <svg 
      className="absolute inset-0 w-[110%] h-[120%] -left-[5%] -top-[10%] z-0 pointer-events-none overflow-visible" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        d="M5,50 C5,20 95,20 95,50 C95,80 5,80 5,50 Z"
        fill="none"
        stroke={color}
        strokeWidth="2" // Thinner stroke for reduced weight
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      name: "Program",
      title: "Global Training Pathways",
      links: [
        { name: "Nursing Pathways", desc: "Specialized medical training for global staff." },
        { name: "IT Specialist", desc: "Software and systems engineering tracks." },
        { name: "Hospitality", desc: "Management roles in luxury service sectors." }
      ]
    },
    {
      name: "Ausbildung",
      title: "Vocational Training",
      links: [
        { name: "Dual System", desc: "Work and learn with a monthly stipend." },
        { name: "Employer Matching", desc: "Placement with verified German firms." },
        { name: "Visa Support", desc: "Documentation for training visas." }
      ]
    },
    {
      name: "Find Jobs",
      title: "Global Opportunities",
      links: [
        { name: "IT & Tech Hubs", desc: "Placements in Berlin and Munich tech hubs." },
        { name: "Healthcare Jobs", desc: "Direct hire for experienced nurses." },
        { name: "Engineering", desc: "Automotive and mechanical placements." }
      ]
    },
    {
      name: "Training",
      title: "Language & Culture",
      links: [
        { name: "German Mastery", desc: "Intensive courses from A1 to C1 levels." },
        { name: "Culture Readiness", desc: "Integration workshops for EU lifestyle." },
        { name: "Exam Prep", desc: "Goethe, telc, and TestDaF certifications." }
      ]
    },
  ];

  const handleNavClick = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header ref={navRef} className="w-full bg-white border-b border-gray-100 sticky top-0 z-[100]">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      ` }} />

      <div className="max-w-[1440px] mx-auto flex items-center h-14 md:h-20 px-4 md:px-10">
        
        {/* LOGO */}
        <div onClick={() => navigate("/")} className="flex items-center cursor-pointer shrink-0 mr-10 group h-full">
          <img src={logo2} alt="Altus Logo" className="h-7 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="hidden lg:flex items-center h-full">
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className={`h-full relative flex items-center px-4 cursor-pointer transition-colors ${activeDropdown === item.name ? "bg-gray-50" : "hover:bg-gray-50"}`}
              onClick={() => handleNavClick(item.name)}
            >
              {activeDropdown === item.name && (
                <motion.div layoutId="navStroke" className="absolute top-0 left-0 right-0 h-[2px] bg-[#003fa3]" />
              )}

              <button className={`flex items-center gap-1 text-[13px] font-semibold uppercase tracking-widest transition-colors font-poppins ${activeDropdown === item.name ? "text-[#003fa3]" : "text-gray-600"}`}>
                {item.name} <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="fixed left-0 right-0 top-[56px] md:top-[80px] bg-white border-b border-gray-200 shadow-2xl z-[100] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="max-w-[1440px] mx-auto flex min-h-[380px]">
                      {/* SIDEBAR */}
                      <div className="w-[300px] bg-gray-50 p-10 border-r border-gray-100">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#003fa3] mb-6 font-poppins">Navigation</h3>
                        <ul className="space-y-4">
                          {navItems.map(cat => (
                            <li 
                              key={cat.name} 
                              onClick={() => setActiveDropdown(cat.name)}
                              className={`text-sm font-medium uppercase tracking-widest cursor-pointer transition-all ${activeDropdown === cat.name ? "text-[#003fa3] translate-x-2" : "text-gray-400 hover:text-gray-900"}`}
                            >
                              {cat.name}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 p-12 bg-white">
                        <div className="mb-10">
                          <h2 className="text-3xl font-bold text-gray-900 font-poppins tracking-tight">
                            <VectorHighlight color="#003fa3">{item.title}</VectorHighlight>
                          </h2>
                        </div>
                        <div className="grid grid-cols-3 gap-12">
                          {item.links.map(link => (
                            <div key={link.name} className="group/link cursor-pointer">
                              <h4 className="text-[14px] font-semibold text-gray-900 group-hover/link:text-[#003fa3] group-hover/link:underline transition-all font-poppins uppercase tracking-tight">
                                {link.name}
                              </h4>
                              <p className="text-[12px] text-gray-500 mt-2 leading-relaxed font-inter font-normal">
                                {link.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div 
            className="h-full flex items-center px-6 cursor-pointer hover:bg-gray-50 text-gray-600 text-[13px] font-semibold uppercase tracking-widest font-poppins"
            onClick={() => navigate("/tools")}
          >
            Tools
          </div>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 text-gray-500 transition-colors hidden xl:block">
              <Globe size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-gray-600 hover:text-[#003fa3] px-3 font-poppins"
            >
              <User size={18} strokeWidth={1.5} />
              <span className="hidden md:inline">Login</span>
            </button>
            <button
              onClick={() => navigate("/apply")}
              className="bg-[#003fa3] text-white px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95 font-poppins rounded-none"
            >
              Apply Now
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-900">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[200] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <img src={logo2} alt="Logo" className="h-8 w-auto" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-50 pb-4">
                  <button className="text-xl font-bold text-gray-900 uppercase tracking-tighter w-full text-left flex justify-between items-center">
                    {item.name} <ChevronDown size={20} />
                  </button>
                </div>
              ))}
              <div 
                className="text-xl font-bold text-gray-900 uppercase tracking-tighter"
                onClick={() => { setMobileMenuOpen(false); navigate("/tools"); }}
              >
                Tools
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
               <button className="w-full bg-[#003fa3] text-white py-4 font-bold uppercase tracking-[0.2em] text-xs">
                 Start Application
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}