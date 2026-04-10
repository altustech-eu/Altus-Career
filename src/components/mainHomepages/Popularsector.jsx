import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, Stethoscope, Landmark, Code, 
  Briefcase, GraduationCap, ArrowRight 
} from "lucide-react";

export default function PopularSectorsCompact() {
  const sectors = [
    { name: "IT & Tech", count: "1,200+", icon: <Cpu size={16} />, bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600" },
    { name: "Healthcare", count: "850+", icon: <Stethoscope size={16} />, bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600" },
    { name: "Finance", count: "430+", icon: <Landmark size={16} />, bg: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=600" },
    { name: "Engineering", count: "600+", icon: <Code size={16} />, bg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600" },
    { name: "Management", count: "300+", icon: <Briefcase size={16} />, bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600" },
    { name: "Education", count: "150+", icon: <GraduationCap size={16} />, bg: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600" },
  ];

  return (
    <section className="py-10 bg-white font-inter overflow-hidden selection:bg-blue-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Slim Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight uppercase">
            Popular <span className="text-[#003fa3]">Sectors</span>
          </h2>
          <button className="group flex items-center gap-2 text-[10px] font-bold text-[#003fa3] uppercase tracking-widest hover:text-black transition-all">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Compact Horizontal Slider */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {sectors.map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative bg-white border border-slate-100 p-5 cursor-pointer overflow-hidden transition-all duration-500 shadow-sm hover:shadow-lg flex-1 min-w-[240px] max-w-[280px] shrink-0"
            >
              {/* Background Reveal */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={sector.bg} 
                  className="w-full h-full object-cover grayscale opacity-0 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out" 
                  alt={sector.name}
                />
                <div className="absolute inset-0 bg-[#003fa3] translate-y-full group-hover:translate-y-0 opacity-90 transition-transform duration-500 ease-out" />
              </div>

              <div className="relative z-10 flex items-center gap-4">
                {/* Compact Icon */}
                <div className="w-10 h-10 bg-slate-50 text-slate-400 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:text-white">
                  {sector.icon}
                </div>
                
                {/* Content */}
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900 transition-colors group-hover:text-white uppercase leading-none">
                    {sector.name}
                  </h4>
                  <p className="text-[9px] text-[#003fa3] font-bold group-hover:text-white/80 uppercase tracking-widest mt-1">
                    {sector.count} Jobs
                  </p>
                </div>

                <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-white transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </section>
  );
}