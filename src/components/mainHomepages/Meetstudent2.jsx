import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BadgeCheck, Code, Paintbrush, Globe, Briefcase, Zap, Star } from "lucide-react";

export default function StudentNetwork() {
  const [activeTab, setActiveTab] = useState("Engineering");
  const scrollRef = useRef(null);

  const categories = [
    { name: "Engineering", icon: <Code size={16} /> },
    { name: "Designers", icon: <Paintbrush size={16} /> },
    { name: "Marketing", icon: <Zap size={16} /> },
    { name: "Management", icon: <Briefcase size={16} /> },
    { name: "Product", icon: <Globe size={16} /> },
  ];

  const allStudents = {
    "Engineering": [
      { name: "Adam Ivansky", role: "Python Developer @ BMW", uni: "TUM Munich", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Stanford_University_logo.svg", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", skills: ["Python", "SQL", "ML"] },
      { name: "Nimrod Talmon", role: "AI Developer @ Siemens", uni: "KIT Karlsruhe", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", skills: ["PyTorch", "Data Science"] },
      { name: "Manuela Kajkara", role: "iOS Developer @ Zalando", uni: "RWTH Aachen", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", skills: ["Swift", "CoreData"] },
    ],
    "Designers": [
      { name: "Elena Rossi", role: "UI/UX Designer @ SAP", uni: "Bauhaus", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo-Apple.referencia.png", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", skills: ["Figma", "Design Systems"] },
      { name: "Julian Chen", role: "Brand Lead @ Mercedes", uni: "UAL London", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80", skills: ["Motion", "Branding"] },
      { name: "Sarah Jenkins", role: "Product Designer @ DeliveryHero", uni: "Polimi", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80", skills: ["UX Research", "Figma"] },
    ],
    "Marketing": [
      { name: "Marcus Thorne", role: "SEO Lead @ Adidas", uni: "LSE London", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", skills: ["Growth", "SEM"] },
      { name: "Aria Varma", role: "Growth Hacker @ Stripe", uni: "Humboldt Berlin", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_logo%2C_revised_2016.svg", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", skills: ["A/B Testing", "Paid Social"] },
    ],
    "Management": [
      { name: "David Wu", role: "Ops Manager @ DHL", uni: "Mannheim Business", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80", skills: ["Agile", "Logistics"] },
      { name: "Sophie Muller", role: "Strategy @ McKinsey", uni: "ESCP Europe", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Deloitte.svg", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80", skills: ["Consulting", "M&A"] },
    ],
    "Product": [
      { name: "Kevin Park", role: "PM @ HelloFresh", uni: "FU Berlin", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", skills: ["Roadmap", "Analytics"] },
      { name: "Linda Blair", role: "Tech PM @ N26", uni: "TU Berlin", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80", skills: ["Fintech", "Agile"] },
    ]
  };

  const smoothEase = [0.22, 1, 0.36, 1];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white font-inter overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 font-poppins tracking-tighter leading-[0.9] uppercase mb-6">
              Verified Talent <br/> <span className="text-[#003fa3]">Network</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-md">
              Discover verified alumni and students from our network placed in Europe's leading tech hubs.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft size={20} className="text-gray-400" />
            </button>
            <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="relative border-b border-gray-100 mb-16">
          <div ref={scrollRef} className="flex gap-10 overflow-x-auto no-scrollbar pb-0">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                className={`flex items-center gap-3 py-6 text-xs font-bold uppercase tracking-widest transition-all relative shrink-0 ${
                  activeTab === cat.name ? "text-[#003fa3]" : "text-gray-300 hover:text-gray-600"
                }`}
              >
                {cat.icon} {cat.name}
                {activeTab === cat.name && (
                  <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#003fa3]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="contents"
            >
              {allStudents[activeTab].map((student, i) => (
                <motion.div
                  key={student.name}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="relative mb-6 aspect-[4/5] bg-gray-50 overflow-hidden rounded-none">
                    <img src={student.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute top-4 right-4 h-8 w-8 bg-white/20 backdrop-blur-md rounded-none flex items-center justify-center">
                       <BadgeCheck size={18} className="text-[#a3e635]" />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#003fa3] transition-colors mb-1">{student.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 leading-none">{student.role}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {student.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 text-[8px] font-bold text-gray-300 border border-gray-100 uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <img src={student.logo} className="h-4 grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
                    <Star size={14} className="text-gray-100 group-hover:text-[#a3e635] transition-colors" />
                  </div>
                </motion.div>
              ))}

              {/* CTA CARD */}
              <div className="bg-[#003fa3] text-white p-10 flex flex-col justify-between rounded-none shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-light font-poppins leading-tight tracking-tight mb-4">
                      Explore 500+ More <br/> <span className="font-bold text-[#a3e635]">{activeTab}</span> Experts
                    </h3>
                    <div className="w-10 h-0.5 bg-[#a3e635] mb-8" />
                 </div>
                 <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-6">Altus Global Network</p>
                    <button className="w-full py-4 bg-[#a3e635] text-[#003fa3] font-bold text-[10px] uppercase tracking-widest transition-transform active:scale-95">
                      Join the Network
                    </button>
                 </div>
                 {/* Decorative background logo */}
                 <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe size={200} />
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}