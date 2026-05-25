import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Search, Globe, User, ArrowRight, Sparkles, Send, Command, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// IMPORT YOUR LOGO
import logo from "../../logo.svg"; 

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null); // Track which category is open on mobile
  const [currentLang, setCurrentLang] = useState("EN"); // Language state
  const [langDropdownOpen, setLangDropdownOpen] = useState(false); // Language dropdown state
  
  // NEW STATE: AI CHATBOT
  const [isAiOpen, setIsAiOpen] = useState(false);

  const navigate = useNavigate();
  const navRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const megaMenuData = [
    {
      category: "Program",
      title: "Global Training & Pathways",
      links: [
        { name: "Nursing Ausbildung", desc: "Start your medical career with a monthly stipend." },
        { name: "IT Specialist", desc: "Hands-on software and systems engineering." },
        { name: "Hospitality Management", desc: "Work in Germany's leading hotels and resorts." },
        { name: "Technical Trade", desc: "Mechanical, electrical, and mechatronic paths." },
        { name: "Language Mastery", desc: "Intensive German and English certification." },
        { name: "Visa Support", desc: "Document preparation and embassy coordination." }
      ]
    },
    {
      category: "Pricing",
      title: "Investment & Service Packages",
      isPricing: true, // Special flag for the multi-column layout
      sections: [
        {
          head: "Ausbildung",
          items: [
            "Ausbildung with B1", "Ausbildung with German Training", "Healthcare Ausbildung", 
            "IT Ausbildung", "Retail Ausbildung", "Logistics / Hospitality Ausbildung", 
            "Ausbildung Pathway via Azerbaijan / Georgia / Belarus", "Direct Germany Ausbildung"
          ]
        },
        {
          head: "Training",
          items: [
            "German A1–B1", "German B2 / Medical German", "Exam Preparation", 
            "Interview Preparation", "Cross-Cultural Training", "Job Readiness Training", 
            "Spoken German with Native Speakers"
          ]
        },
        {
          head: "Studies",
          items: [
            "Public University", "Private University", "UG in Germany", "PG in Germany", 
            "Italy / Europe Study Options", "Twinning Programs", "Pathway Programs"
          ]
        },
        {
          head: "Jobs",
          items: [
            "Jobs with PG", "Nursing Jobs", "Skilled Jobs", "Post-Study Work Permit", 
            "Job Search Support", "CV / LinkedIn / Interview Support"
          ]
        },
        {
          head: "Visa & Documentation",
          items: [
            "Visa File Preparation", "SOP / Motivation Letter", "Embassy Appointment", 
            "Document Attestation", "Recognition / Anerkennung", "Blocked Account Support", 
            "Travel / Ticketing", "Pre-Departure Support"
          ]
        },
        {
          head: "Packages",
          items: [
            "Basic", "Standard", "Premium", "Success Plus", "Pay-by-Stage", "EMI / Installment Plans"
          ]
        }
      ]
    },
    {
      category: "Ausbildung",
      title: "Vocational Training in Germany",
      links: [
        { name: "Dual Education System", desc: "Learn while you earn in Germany's top industries." },
        { name: "Visa Support", desc: "End-to-end guidance for training visas." },
        { name: "Employer Matching", desc: "Get placed with verified German companies." }
      ]
    },
    {
      category: "Find Jobs",
      title: "Global Career Opportunities",
      links: [
        { name: "Healthcare Jobs", desc: "Direct placements for experienced nurses." },
        { name: "IT & Software", desc: "Tech roles in Berlin, Munich, and Hamburg." },
        { name: "Engineering", desc: "Industrial and automotive roles across the EU." },
        { name: "Hospitality", desc: "Management and service roles globally." }
      ]
    },
    {
        category: "Training",
        title: "Professional Readiness",
        links: [
          { name: "German Language", desc: "A1 to C1 certified intensive courses." },
          { name: "Cultural Integration", desc: "Soft skills for living and working in Europe." }
        ]
    }
  ];

  const toggleMobileAccordion = (category) => {
    setMobileAccordion(mobileAccordion === category ? null : category);
  };

  return (
    <>
      {/* 0. AI CHATBOT BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {isAiOpen && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center sm:p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Chat Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[600px]"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0f62fe] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Altus AI Assistant</h3>
                    <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 uppercase">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Agent Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAiOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 no-scrollbar">
                <div className="bg-blue-50/80 p-5 rounded-2xl rounded-tl-none border border-blue-100 max-w-[85%]">
                  <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                    Hello! I'm the Altus Intelligence agent. How can I help you navigate your career path to Germany today?
                  </p>
                </div>

                {/* Quick Action Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                   {["Nursing Ausbildung guide", "Tech salaries in Berlin", "Visa document checklist", "A1 Language classes"].map(tip => (
                     <button key={tip} className="text-left p-3.5 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-500 hover:border-[#0f62fe] hover:text-[#0f62fe] transition-all flex items-center justify-between group bg-white shadow-sm">
                       {tip} <Command size={14} className="opacity-0 group-hover:opacity-100" />
                     </button>
                   ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="relative flex items-center">
                   <input 
                    autoFocus
                    placeholder="Ask me about programs, visas, or jobs..." 
                    className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#0f62fe] focus:bg-white transition-all text-sm font-medium shadow-inner"
                   />
                   <button className="absolute right-2 p-3 bg-[#0f62fe] text-white rounded-xl hover:bg-black transition-all shadow-lg active:scale-90">
                     <Send size={18} />
                   </button>
                </div>
                <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">
                  Secure Institutional Intelligence • Altus Career
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. BLACK FADE OVERLAY - Desktop Only */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[90] pointer-events-none hidden lg:block"
            style={{ top: '56px' }}
          />
        )}
      </AnimatePresence>

      <header ref={navRef} className="w-full bg-white border-b border-gray-200 sticky top-0 z-[100] font-inter">
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        ` }} />

        <div className="max-w-[1440px] mx-auto flex items-center h-14 px-4 md:px-6">
          
          {/* LEFT: BRANDING */}
          <div onClick={() => navigate("/")} className="flex items-center cursor-pointer mr-6 group h-full">
            <img src={logo} alt="Altus Logo" className="h-7 w-auto transition-transform group-hover:scale-95" />
            <div className="h-6 w-[1px] bg-gray-200 mx-5 hidden lg:block" />
          </div>

          {/* MAIN NAVIGATION - DESKTOP */}
          <nav className="hidden lg:flex items-center h-full">
            {megaMenuData.map((item) => (
              <div 
                key={item.category} 
                className={`h-full relative flex items-center px-4 cursor-pointer transition-colors duration-150 
                  ${activeDropdown === item.category ? "bg-[#f4f4f4]" : "hover:bg-[#f4f4f4]"}`}
                onClick={() => setActiveDropdown(activeDropdown === item.category ? null : item.category)}
              >
                {activeDropdown === item.category && (
                  <motion.div layoutId="topStroke" className="absolute top-0 left-0 right-0 h-[3px] bg-[#0f62fe]" />
                )}

                <button className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors ${activeDropdown === item.category ? "text-black" : "text-gray-700"}`}>
                  {item.category} 
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.category ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.category && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="fixed left-0 right-0 top-14 bg-white border-b border-gray-200 shadow-2xl z-[100] overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="max-w-[1440px] mx-auto flex h-fit min-h-[420px]">
                        <div className="w-[260px] bg-[#ffffff] py-6 px-0 border-r border-gray-100 flex flex-col shrink-0">
                          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4 px-8">Explore</h3>
                          <ul className="space-y-0 flex-1">
                            {megaMenuData.map(cat => (
                              <li key={cat.category} 
                                  onClick={(e) => { e.stopPropagation(); setActiveDropdown(cat.category); }}
                                  className={`text-[14px] px-8 py-3 transition-all cursor-pointer flex items-center justify-between
                                  ${activeDropdown === cat.category 
                                    ? "bg-white text-black font-semibold border-l-4 border-[#0f62fe] shadow-sm" 
                                    : "text-gray-600 hover:bg-[#d6d6d6]"}`}>
                                {cat.category}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-auto bg-[#0f62fe] py-3.5 px-8 flex items-center justify-between cursor-pointer hover:bg-black transition-colors">
                             <span className="text-white text-[13px] font-bold">Explore all products</span>
                             <ArrowRight size={16} className="text-white" />
                          </div>
                        </div>

                        <div className="flex-1 bg-white p-10 flex flex-col overflow-y-auto no-scrollbar max-h-[85vh]">
                          <div className="mb-8 flex items-center gap-3">
                            <h2 className="text-[28px] font-light text-[#0f62fe] leading-tight">{item.title}</h2>
                            {item.category === "Pricing" && <Tag size={22} className="text-[#0f62fe] opacity-30" />}
                          </div>

                          {/* DYNAMIC PRICING GRID */}
                          {item.isPricing ? (
                             <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-12">
                                {item.sections.map((section) => (
                                  <div key={section.head} className="space-y-4">
                                    <h4 className="text-[12px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-[#0f62fe] rounded-full" />
                                      {section.head}
                                    </h4>
                                    <ul className="space-y-2">
                                      {section.items.map((subLink) => (
                                        <li key={subLink} className="text-[13px] text-gray-500 hover:text-[#0f62fe] hover:translate-x-1 transition-all cursor-pointer leading-tight">
                                          {subLink}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                             </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                              {item.links.map(link => (
                                <div key={link.name} className="group/link cursor-pointer max-w-sm">
                                  <h4 className="text-[15px] font-semibold text-gray-900 group-hover/link:text-[#0f62fe] group-hover/link:underline transition-colors decoration-1 underline-offset-4">{link.name}</h4>
                                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed font-normal">{link.desc}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* TOOLS LINK - DIRECT REDIRECT */}
            <div 
              className="h-full flex items-center px-4 cursor-pointer hover:bg-[#f4f4f4] transition-colors duration-150 text-gray-700 text-[14px] font-medium"
              onClick={() => navigate("/tools")}
            >
              Tools
            </div>
          </nav>

          {/* UTILITIES & MOBILE TOGGLE */}
          <div className="ml-auto flex items-center h-full gap-2 md:gap-4">
             <div className="hidden sm:flex items-center gap-4 md:gap-6 text-gray-600 mr-2">
                {/* SEARCH ICON -> NOW OPENS AI CHATBOT */}
                <button 
                  onClick={() => setIsAiOpen(true)}
                  className="flex items-center gap-2 hover:text-[#0f62fe] transition-colors"
                >
                  <Search size={18} className="cursor-pointer" />
                </button>
                
                {/* LANGUAGE SWITCHER */}
                <div className="relative" ref={langRef}>
                  <div 
                    className="flex items-center gap-1 cursor-pointer hover:text-[#0f62fe] transition-colors"
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  >
                    <Globe size={18} />
                    <span className="text-[13px] font-bold uppercase">{currentLang}</span>
                  </div>
                  
                  <AnimatePresence>
                    {langDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl py-2 z-[120]"
                      >
                        <button 
                          onClick={() => { setCurrentLang("EN"); setLangDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 ${currentLang === "EN" ? "text-[#0f62fe]" : "text-gray-600"}`}
                        >
                          English (EN)
                        </button>
                        <button 
                          onClick={() => { setCurrentLang("DE"); setLangDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 ${currentLang === "DE" ? "text-[#0f62fe]" : "text-gray-600"}`}
                        >
                          Germany (DE)
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <User size={19} className="cursor-pointer hover:text-[#0f62fe]" />
             </div>

             <button 
               onClick={() => navigate("/Login-page")} 
               className="bg-[#0f62fe] text-white px-4 md:px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-sm active:scale-95"
             >
               Apply
             </button>

             {/* Mobile Menu Button */}
             <button 
               className="lg:hidden p-2 text-gray-900" 
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN (UP/DOWN ACCORDION) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "calc(100vh - 56px)", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden absolute top-14 left-0 w-full bg-white z-[110] overflow-y-auto border-t border-gray-100 no-scrollbar"
            >
              <div className="p-4 space-y-2">
                {megaMenuData.map((item) => (
                  <div key={item.category} className="border-b border-gray-50 last:border-0">
                    <button 
                      onClick={() => toggleMobileAccordion(item.category)}
                      className="w-full flex items-center justify-between py-4 px-2 text-[15px] font-semibold text-gray-900"
                    >
                      {item.category}
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-300 text-[#0f62fe] ${mobileAccordion === item.category ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {mobileAccordion === item.category && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-[#f9f9f9] rounded-lg mb-2"
                        >
                          <div className="p-4 space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                              <h4 className="text-[18px] font-light text-[#0f62fe]">{item.title}</h4>
                            </div>

                            {/* MOBILE PRICING VIEW */}
                            {item.isPricing ? (
                               <div className="space-y-8">
                                  {item.sections.map((section) => (
                                    <div key={section.head}>
                                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{section.head}</p>
                                      <div className="grid gap-2">
                                        {section.items.map((subItem) => (
                                          <p key={subItem} className="text-[13px] text-gray-700 font-medium pl-2 border-l border-slate-200">{subItem}</p>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                               </div>
                            ) : (
                              <div className="grid gap-6">
                                {item.links.map(link => (
                                  <div key={link.name}>
                                    <h5 className="text-[14px] font-bold text-gray-900 mb-1">{link.name}</h5>
                                    <p className="text-[12px] text-gray-500 leading-snug">{link.desc}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* MOBILE TOOLS LINK */}
                <div 
                  className="w-full py-4 px-2 text-[15px] font-semibold text-gray-900 border-b border-gray-50"
                  onClick={() => { setMobileMenuOpen(false); navigate("/tools"); }}
                >
                  Tools
                </div>

                {/* Mobile Utilities */}
                <div className="pt-6 pb-10 space-y-4 px-2">
                  <div className="flex items-center gap-6 text-gray-600 py-4 border-t border-gray-100">
                    <Search size={22} onClick={() => { setMobileMenuOpen(false); setIsAiOpen(true); }} className="cursor-pointer" />
                    <Globe size={22} onClick={() => setCurrentLang(currentLang === "EN" ? "DE" : "EN")} className="cursor-pointer" />
                    <User size={22} />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentLang("EN")} 
                      className={`flex-1 py-2 text-xs font-bold border ${currentLang === "EN" ? "bg-black text-white" : "bg-white text-black border-gray-200"}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => setCurrentLang("DE")} 
                      className={`flex-1 py-2 text-xs font-bold border ${currentLang === "DE" ? "bg-black text-white" : "bg-white text-black border-gray-200"}`}
                    >
                      DE
                    </button>
                  </div>
                  <button className="w-full bg-[#0f62fe] text-white py-4 font-bold uppercase tracking-widest text-[13px]">
                    Explore all products
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}