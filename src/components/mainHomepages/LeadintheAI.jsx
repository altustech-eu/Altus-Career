import React from "react";
import { 
  ArrowRight, 
  ExternalLink, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  HeartPulse, 
  Code, 
  Landmark, 
  ShieldCheck 
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// --- SUB-COMPONENT: REFINED GRID CARD ---
const AltusGridCard = ({ title, Icon, isPrimary, index }) => {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05, ease }}
      className="group relative p-8 border-r border-b border-gray-100 flex flex-col justify-between h-64 transition-colors duration-500 cursor-pointer overflow-hidden bg-white hover:bg-gray-50/50"
    >
      {/* 1. PRIMARY BACKGROUND IMAGE & GRADIENT */}
      {isPrimary && (
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-20 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-40 group-hover:grayscale-0"
            alt="Global Network"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#003fa3] via-[#0062ff]/80 to-transparent opacity-90" />
        </div>
      )}

      {/* 2. HOVER GRADIENT (For Non-Primary Cards) */}
      {!isPrimary && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0062ff] to-[#00d2b3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* 3. CARD CONTENT */}
      <h3 className={`relative z-10 text-[18px] font-medium font-poppins leading-tight tracking-tight max-w-[200px] transition-colors duration-300
        ${isPrimary ? "text-white" : "text-gray-900 group-hover:text-white"}`}>
        {title}
      </h3>

      <div className="relative z-10 flex items-end justify-between">
        <div className={`transition-all duration-500 group-hover:scale-110
          ${isPrimary ? "text-[#a3e635]" : "text-[#0062ff] group-hover:text-white"}`}>
          <Icon size={32} strokeWidth={1.2} />
        </div>
        <ArrowRight 
          size={20} 
          className={`transition-all duration-500 group-hover:translate-x-3 
            ${isPrimary ? "text-white" : "text-gray-300 group-hover:text-white"}`} 
        />
      </div>
    </motion.div>
  );
};

export default function InsideAltus() {
  const pathways = [
    { title: "Automate your global application with Altus Hub", icon: Globe, primary: true },
    { title: "Nursing & Healthcare Pathways", icon: HeartPulse },
    { title: "IT & Software Engineering Hub", icon: Code },
    { title: "Vocational Ausbildung Contracts", icon: GraduationCap },
    { title: "Hospitality & Management Roles", icon: Briefcase },
    { title: "Civil & Industrial Engineering", icon: Landmark },
    { title: "Visa & Legal Compliance Assets", icon: ShieldCheck },
    { title: "Expert Career Consulting", icon: ArrowRight },
  ];

  return (
    <div className="bg-white selection:bg-blue-100 selection:text-blue-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@300;400;500;600&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      ` }} />

      {/* --- SECTION 1: GLOBAL PATHWAYS GRID --- */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 font-inter">
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-end">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-gray-900 font-poppins leading-[0.9] tracking-tighter"
          >
            LEAD YOUR CAREER <br/> WITH ALTUS.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed max-w-md font-normal border-l border-gray-100 pl-8"
          >
            From technical <span className="text-[#0062ff] font-medium cursor-pointer hover:underline">Ausbildung</span> to professional placements, our expertise helps you reinvent your future.
          </motion.p>
        </div>

        {/* 4x2 Refined Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-100">
          {pathways.map((item, i) => (
            <AltusGridCard 
              key={i}
              index={i}
              isPrimary={item.primary} 
              title={item.title} 
              Icon={item.icon} 
            />
          ))}
        </div>
      </section>

      {/* --- SECTION 2: INSIDE ALTUS LINKS --- */}
      <section className="py-32 max-w-[1440px] mx-auto px-6 md:px-12 border-t border-gray-50">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-5xl font-light text-gray-900 font-poppins tracking-tighter uppercase opacity-20 select-none">
              Inside <br/> Altus
            </h2>
          </div>
          
          <div className="lg:col-span-8 grid md:grid-cols-3 gap-12 font-inter">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Our mission</h4>
              <p className="text-[14px] text-gray-600 mb-8 leading-relaxed font-normal">Explore the Altus history of bridging the talent gap and empowering global careers.</p>
              <div className="flex flex-col gap-4">
                <Link to="/about" className="flex items-center gap-3 text-[#0062ff] text-[13px] font-bold uppercase tracking-wider group w-fit">
                  About Altus <ArrowRight size={14} className="transition-transform group-hover:translate-x-2"/>
                </Link>
                <Link to="/events" className="flex items-center gap-3 text-[#0062ff] text-[13px] font-bold uppercase tracking-wider group w-fit">
                  Our webinars <ArrowRight size={14} className="transition-transform group-hover:translate-x-2"/>
                </Link>
              </div>
            </motion.div>

            {/* Network */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Our network</h4>
              <p className="text-[14px] text-gray-600 mb-8 leading-relaxed font-normal">Connect with our partner hospitals and firms across Germany and the EU.</p>
              <div className="flex flex-col gap-4">
                <Link to="/partners" className="flex items-center gap-3 text-[#0062ff] text-[13px] font-bold uppercase tracking-wider group w-fit">
                  Employer network <ExternalLink size={12}/>
                </Link>
                <Link to="/success-stories" className="flex items-center gap-3 text-[#0062ff] text-[13px] font-bold uppercase tracking-wider group w-fit">
                  Success stories <ArrowRight size={14} className="transition-transform group-hover:translate-x-2"/>
                </Link>
              </div>
            </motion.div>

            {/* Talent */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Our talent</h4>
              <p className="text-[14px] text-gray-600 mb-8 leading-relaxed font-normal">Join the community of professionals who have successfully relocated abroad.</p>
              <div className="flex flex-col gap-4">
                <Link to="/register" className="flex items-center gap-3 text-[#0062ff] text-[13px] font-bold uppercase tracking-wider group w-fit">
                  Join the Hub <ArrowRight size={14} className="transition-transform group-hover:translate-x-2"/>
                </Link>
                <Link to="/learning-hub" className="flex items-center gap-3 text-[#0062ff] text-[13px] font-bold uppercase tracking-wider group w-fit">
                  German training <ExternalLink size={12}/>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}