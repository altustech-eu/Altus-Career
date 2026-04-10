import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Search, ArrowRight, CheckCircle2, MapPin, MessageSquare, ClipboardCheck, Download, Video, Image as Briefcase, GraduationCap, Globe, Plus, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- NEW COMPONENT: STAGGERED TEXT DROP ---
const StaggeredDropText = ({ text, className = "" }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "inherit" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// REFINED SUB-COMPONENT: Modern Sleek Card (No Corner Radius)
const FanningCard = ({ img, index, name, role, scrollYProgress, totalCards, isAutoScrolling }) => {
  const centerIndex = Math.floor(totalCards / 2);
  const multiplier = index - centerIndex; 
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const responsiveOffset = isMobile ? 60 : 300; 
  const maxProgress = useMotionValue(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (!isAutoScrolling && latest > maxProgress.get()) {
        maxProgress.set(latest);
      }
    });
  }, [scrollYProgress, maxProgress, isAutoScrolling]);

  const xOffset = useTransform(maxProgress, [0.1, 0.6], [0, multiplier * responsiveOffset]);
  const rotation = useTransform(maxProgress, [0.1, 0.6], [multiplier * 8, 0]);
  const scale = useTransform(maxProgress, [0.1, 0.6], [0.9, index === centerIndex ? 1.05 : 1]);
  const zIndex = 50 - Math.abs(multiplier);

  return (
    <motion.div
      style={{ 
        x: isAutoScrolling ? 0 : xOffset, 
        rotate: isAutoScrolling ? 0 : rotation, 
        zIndex: zIndex, 
        scale: isAutoScrolling ? 1 : scale,
        position: isAutoScrolling ? "relative" : "absolute",
        left: isAutoScrolling ? "auto" : "0",
        top: isAutoScrolling ? "auto" : "0",
        flexShrink: 0
      }}
      className={`rounded-none overflow-hidden pointer-events-auto transition-shadow duration-500 bg-white border border-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] ${isAutoScrolling ? 'w-40 h-64 md:w-64 md:h-[360px] mx-2 md:mx-4' : 'inset-0'}`}
    >
      <div className="absolute inset-0">
        <img src={img} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003fa3]/90 via-transparent to-transparent" />
      </div>
      <div className="absolute top-3 left-3">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 px-2 py-1 rounded-none flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-none bg-green-400 animate-pulse" />
          <span className="text-white text-[8px] md:text-[10px] font-medium uppercase tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>Verified</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-5">
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="text-white font-bold text-xs md:text-lg leading-tight truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{name}</h3>
          <CheckCircle2 size={14} className="text-blue-400 fill-current shrink-0" />
        </div>
        <p className="text-white/80 text-[9px] md:text-xs leading-tight mb-4 font-normal italic" style={{ fontFamily: 'Inter, sans-serif' }}>"{role}"</p>
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <div className="flex flex-col">
            <span className="text-[7px] md:text-[8px] text-white/50 uppercase font-medium tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>Placement</span>
            <span className="text-white text-[9px] md:text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Germany</span>
          </div>
          <button className="bg-white text-[#003fa3] p-1.5 md:px-3 md:py-1.5 rounded-none flex items-center gap-1 hover:bg-blue-50 transition-colors">
            <Plus size={12} className="md:w-3 md:h-3" />
            <span className="hidden md:inline text-[10px] font-bold uppercase tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>Follow</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Job Seeker");
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const navigate = useNavigate();
  const galleryRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0.55) setIsAutoScrolling(true);
      else if (latest < 0.2) setIsAutoScrolling(false);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const btnOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const navigationTabs = [
    { name: "Job Seeker", icon: <Briefcase size={18} /> },
    { name: "Ausbildung", icon: <GraduationCap size={18} /> },
    { name: "Study Abroad", icon: <Globe size={18} /> }
  ];

  const communityMembers = [
    { name: "Adam Ivansky", role: "Python Developer @ BMW", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { name: "Sarah Jenkins", role: "UI Designer @ SAP", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { name: "Sophie Bennett", role: "Product Manager @ Zalando", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" }, 
    { name: "Daniel Craig", role: "Fullstack Engineer @ Siemens", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" },
    { name: "Emma Watson", role: "Data Scientist @ BioNTech", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400" },
  ];

  const partners = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { name: "Anthropic", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Anthropic_logo.svg" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const paths = { "Job Seeker": "/job-seeker", "Ausbildung": "/aus-bildung", "Study Abroad": "/study-abroad" };
    navigate(paths[tab]);
  };

  return (
    <section className="relative overflow-hidden bg-white pb-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes card-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-card-auto-scroll { animation: card-scroll 45s linear infinite; }
      ` }} />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10">
        <div className="pt-8 md:pt-12 text-center mb-10 px-4">
          <span className="text-[#0a1320] font-bold text-sm uppercase tracking-[0.2em] mb-3 block" style={{ fontFamily: 'Inter, sans-serif' }}>Altus Career</span>
          <h1 className="text-3xl md:text-7xl font-bold text-[#1f5dc2] tracking-tighter mb-4 leading-tight md:leading-[1.05]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <StaggeredDropText text="Build Your Career in Europe" />
          </h1>
          <p className="text-base md:text-2xl text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            From Training to Employment: End-to-end career pathways for Ausbildung, Jobs, and Study Abroad.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-8 md:mb-16">
          <div className="flex gap-3 md:gap-6 mb-8 justify-center md:justify-start items-center px-1 overflow-x-auto no-scrollbar">
            {navigationTabs.map((tab) => (
              <button key={tab.name} onClick={() => handleTabClick(tab.name)} className={`rounded-none flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === tab.name ? 'bg-[#2d2e3e] text-white shadow-xl scale-105' : 'text-gray-900 hover:bg-slate-100 bg-transparent'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className={activeTab === tab.name ? 'text-white' : 'text-gray-400'}>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center w-full bg-white border border-gray-900 h-[56px] shadow-sm mb-8 overflow-hidden">
            <div className="flex items-center flex-1 px-5 h-full">
              <Building2 className="text-gray-900 mr-3" size={18} />
              <input type="text" placeholder="Company" className="w-full bg-transparent outline-none text-gray-800 text-[14px] font-medium placeholder:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }} />
            </div>
            <div className="w-[1px] h-[30px] bg-gray-200" />
            <div className="flex items-center flex-1 px-5 h-full">
              <MapPin className="text-gray-900 mr-3" size={18} />
              <input type="text" placeholder="city or postal code" className="w-full bg-transparent outline-none text-gray-800 text-[14px] font-medium placeholder:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }} />
            </div>
            <button className="h-full bg-[#003fa3] text-white px-10 hover:bg-black transition-colors flex items-center justify-center gap-2">
              <Search size={18} />
              <span className="text-[13px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>Finding jobs</span>
            </button>
          </div>

          <div className="rounded-none flex md:hidden flex-col gap-0 shadow-lg mb-8 overflow-hidden border border-gray-200">
            <div className="flex items-center bg-white px-5 py-5">
              <Search className="text-black mr-4" size={22} strokeWidth={2.5} />
              <input type="text" placeholder="Search jobs and pathways" className="w-full outline-none text-gray-800 bg-transparent text-[16px] font-medium placeholder:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }} />
            </div>
            <button className="w-full py-5 bg-[#003fa3] text-white font-bold text-sm uppercase tracking-widest active:scale-95 transition-transform" style={{ fontFamily: 'Inter, sans-serif' }}>Finding jobs</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            <button className="flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95 rounded-none" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="text-[#003fa3]"><MessageSquare size={18} /></span>
              <span className="text-[10px] md:text-[11px] font-bold text-gray-700 uppercase tracking-tighter">Book Counseling</span>
            </button>
            {[
              { icon: <ClipboardCheck size={18} />, text: "Check Eligibility" },
              { icon: <Download size={18} />, text: "Download Guide" },
              { icon: <Video size={18} />, text: "Join Webinar" }
            ].map((item, i) => (
              <button key={i} className="hidden md:flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-none" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#2c6bd1]">{item.icon}</span>
                <span className="text-[10px] md:text-[11px] font-bold text-gray-700 uppercase tracking-tighter">{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={galleryRef} className="pb-10 relative min-h-[500px] md:min-h-[850px] flex flex-col items-center w-full">
        <div className="text-center mb-4 px-4">
          <h2 className="text-2xl md:text-5xl font-bold text-[#225dbb] tracking-tighter leading-tight mt-2 uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <StaggeredDropText text="Success Stories" />
          </h2>
        </div>

        <div className="sticky top-20 md:top-24 h-[400px] md:h-[550px] flex items-center z-20 w-full overflow-hidden">
          <div className={`relative flex items-center ${isAutoScrolling ? 'animate-card-auto-scroll flex-nowrap w-max justify-start' : 'justify-center w-40 h-64 md:w-64 md:h-[360px] mx-auto'}`}>
            {(isAutoScrolling ? [...communityMembers, ...communityMembers, ...communityMembers, ...communityMembers] : communityMembers).map((member, index) => (
              <FanningCard key={index} index={index % communityMembers.length} totalCards={communityMembers.length} name={member.name} role={member.role} img={member.img} scrollYProgress={scrollYProgress} isAutoScrolling={isAutoScrolling} />
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full">
          <motion.div className="mt-12 md:mt-20 w-full relative z-30 transition-opacity duration-500 px-4 text-center md:text-left">
              <p className="text-[10px] md:text-sm font-medium text-gray-400 mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: 'Inter, sans-serif' }}>Our Global Network</p>
              <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start items-center grayscale opacity-60">
                {partners.map((p, i) => (
                  <img key={i} src={p.logo} alt={p.name} className="rounded-none h-4 md:h-6 w-auto object-contain hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                ))}
              </div>
          </motion.div>
          <motion.div style={{ opacity: btnOpacity }} className="mt-12 md:mt-16 relative z-30 flex flex-col items-center gap-4 px-4 pb-16">
            <button className="rounded-none group w-full md:w-auto h-[60px] md:px-16 bg-[#003fa3] text-white font-bold text-sm md:text-base flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,63,163,0.3)] hover:bg-[#002b74] transition-all uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
              Start Your Career Journey
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}