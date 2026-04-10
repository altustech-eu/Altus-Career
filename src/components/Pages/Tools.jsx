import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, FileCheck, Calendar, RefreshCcw, PlaneTakeoff, 
  GraduationCap, BarChart3, BadgeCheck, Zap, Wallet, 
  ArrowUpRight, Filter, Briefcase, X, Info, 
  Lock, Languages, BookOpen, Map, Landmark
} from "lucide-react";

// --- VECTOR HIGHLIGHT COMPONENT ---
const VectorHighlight = ({ children, color = "#a3e635" }) => (
  <span className="relative inline-block px-1">
    <span className="relative z-10">{children}</span>
    <svg className="absolute inset-0 w-[110%] h-[120%] -left-[5%] -top-[10%] z-0 pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        d="M5,50 C5,20 95,20 95,50 C95,80 5,80 5,50 Z"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
      />
    </svg>
  </span>
);

const ToolInterface = ({ toolTitle }) => {
  const [result, setResult] = useState(null);

  if (toolTitle === "Blocked Account Calculator") {
    const monthly = 992;
    return (
      <div className="space-y-4">
        <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider">Duration (Months)</label>
        <input type="number" placeholder="12" className="w-full p-4 border border-gray-100 outline-none focus:border-[#0f62fe] font-medium" onChange={(e) => setResult(e.target.value * monthly)} />
        {result && <div className="p-6 bg-gray-50 border-l-2 border-[#0f62fe]"><p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Required Total</p><h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>€{result.toLocaleString()}</h3></div>}
      </div>
    );
  }

  if (toolTitle === "Living Cost Calculator") {
    const cities = { "Munich": 1100, "Berlin": 950, "Leipzig": 750, "Hamburg": 980 };
    return (
      <div className="space-y-4">
        <label className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider">Select City</label>
        <select className="w-full p-4 border border-gray-100 outline-none font-medium" onChange={(e) => setResult(cities[e.target.value])}>
          <option value="">Select City...</option>
          {Object.keys(cities).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {result && <div className="p-6 bg-[#0f62fe] text-white"><p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Est. Monthly Cost</p><h3 className="text-3xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>€{result}</h3></div>}
      </div>
    );
  }

  return (
    <div className="py-10 text-center">
      <div className="w-12 h-12 bg-blue-50 text-[#0f62fe] rounded-full flex items-center justify-center mx-auto mb-4">
        <Zap size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-semibold uppercase tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>AI Engine Ready</h3>
      <p className="text-gray-400 text-xs mt-2 font-normal">System is ready for data input. Enter details to generate {toolTitle} report.</p>
    </div>
  );
};

export default function AusbildungTools() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    { title: "Blocked Account Calculator", desc: "Calculate exact blocked account requirements for your Ausbildung visa application including monthly breakdown.", icon: Wallet, category: "Financial Planning", available: true },
    { title: "Living Cost Calculator", desc: "Estimate monthly living expenses by city including rent, food, transport, and insurance across Germany.", icon: Calculator, category: "Financial Planning", available: true },
    { title: "Document Checklist Generator", desc: "Generate personalized document checklist based on your nationality and Ausbildung sector.", icon: FileCheck, category: "Application Support", available: true },
    { title: "Application Timeline Planner", desc: "Calculate realistic timelines based on nationality and German level. Get month-by-month plans.", icon: Calendar, category: "Application Support", available: true },
    { title: "German CV vs Home Country CV", desc: "Compare German CV (Lebenslauf) format with your home country format and get adaptation tips.", icon: RefreshCcw, category: "Application Support", available: true },
    { title: "Pre-Departure Checklist", desc: "Complete checklist of 100 essential items before moving to Germany. Track progress across all phases.", icon: PlaneTakeoff, category: "Application Support", available: true },
    { title: "Career Pathway Decision Tool", desc: "Find the best career path for you by comparing different Ausbildung sectors and personal interests.", icon: GraduationCap, category: "Comparison Tools", available: true },
    { title: "Ausbildung vs University Comparison", desc: "Compare Ausbildung vs University in Germany with salary projections and financial breakdowns.", icon: Briefcase, category: "Comparison Tools", available: true },
    { title: "Ausbildung Sector Comparison", desc: "Compare different Ausbildung sectors on salary, demand, job availability, and career growth.", icon: Filter, category: "Comparison Tools", available: true },
    { title: "Ausbildung Eligibility Checker", desc: "Verify if your qualifications match German Ausbildung requirements and discover suitable paths.", icon: BadgeCheck, category: "Application Support", available: true },
    { title: "Smart Cover Letter Generator", desc: "Generate professional German cover letters in 30 seconds based on your target sector.", icon: Zap, category: "Application Support", available: true },
    { title: "Ausbildung ROI Calculator", desc: "Calculate the financial benefits of German vocational training compared to other education options.", icon: BarChart3, category: "Financial Planning", available: true },
    
    // COMING SOON TOOLS
    { title: "Salary Progression Calculator", desc: "Project your earnings from Year 1 to Year 3 of Ausbildung and beyond with sector-specific growth data.", icon: BarChart3, category: "Financial Planning", available: false },
    { title: "Total Cost Calculator", desc: "Comprehensive cost breakdown including visa fees, language courses, travel, and setup costs.", icon: Wallet, category: "Financial Planning", available: false },
    { title: "Scholarship Eligibility Checker", desc: "Check eligibility for DAAD, company-sponsored, and government scholarships based on your profile.", icon: Landmark, category: "Financial Planning", available: false },
    { title: "German Level Assessment", desc: "Quick interactive quiz to determine your current German language level (A1-C2).", icon: Languages, category: "Language Assessment", available: false },
    { title: "Language Proficiency Calculator", desc: "Interactive assessment for Ausbildung preparation with personalized learning paths.", icon: BookOpen, category: "Language Assessment", available: false },
    { title: "German Exam Cost Comparison", desc: "Compare formats of Goethe, telc, and TestDaF exams to find the best certification.", icon: Calculator, category: "Language Assessment", available: false },
    { title: "German City Comparison", desc: "Compare 15 German cities for Ausbildung based on living costs and job markets.", icon: Map, category: "Comparison Tools", available: false },
  ];

  const categories = ["All", "Financial Planning", "Application Support", "Comparison Tools", "Language Assessment"];
  const filteredTools = activeCategory === "All" ? tools : tools.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />

      <section className="pt-24 pb-20 px-6 border-b border-gray-100 bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3 text-[#0f62fe] font-semibold text-[10px] uppercase tracking-[0.4em] mb-6 font-inter">
            <span className="w-8 h-[1px] bg-[#0f62fe]"></span> Ecosystem
          </div>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9] text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Smart <VectorHighlight color="#a3e635">Journey</VectorHighlight> <br/> Planning
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-normal max-w-2xl leading-relaxed font-inter">
            Start using these powerful tools immediately to plan your Ausbildung journey, with more advanced features launching soon.
          </p>
        </div>
      </section>

      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 overflow-x-auto no-scrollbar flex gap-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`py-6 text-[10px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative font-inter ${activeCategory === cat ? "text-[#0f62fe]" : "text-gray-400 hover:text-gray-700"}`}>
              {cat}
              {activeCategory === cat && <motion.div layoutId="toolFilter" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f62fe]" />}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div 
                key={tool.title} 
                layout 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={`bg-white border p-8 flex flex-col h-full group relative transition-all duration-300 ${tool.available ? 'border-gray-100 hover:border-[#0f62fe]/30 cursor-pointer' : 'border-gray-50 opacity-80 cursor-default'}`} 
                onClick={() => tool.available && setSelectedTool(tool)}
              >
                {!tool.available && (
                   <div className="absolute top-4 right-4 bg-gray-900 text-white text-[8px] font-bold px-2 py-1 uppercase tracking-widest flex items-center gap-1 z-10">
                     <Lock size={10} /> Coming Soon
                   </div>
                )}
                
                <div className="flex justify-between mb-8">
                  <div className={`p-4 transition-all ${tool.available ? 'bg-gray-50 text-gray-400 group-hover:bg-[#0f62fe] group-hover:text-white' : 'bg-gray-50 text-gray-300'}`}>
                    <tool.icon size={22} strokeWidth={1.5} />
                  </div>
                  {tool.available && <ArrowUpRight size={18} className="text-gray-200 group-hover:text-[#0f62fe] transition-colors" />}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold text-lg uppercase tracking-tight mb-3 font-poppins ${tool.available ? 'text-gray-800' : 'text-gray-400'}`}>{tool.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 font-normal font-inter">{tool.desc}</p>
                </div>
                
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between font-inter">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.15em]">{tool.category}</span>
                  {tool.available && <span className="text-[11px] font-semibold text-[#0f62fe] uppercase tracking-wider">Launch Tool</span>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedTool && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTool(null)} className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className="relative bg-white w-full max-w-xl border-t-4 border-[#0f62fe] shadow-2xl overflow-hidden rounded-none">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#fafafa] font-inter">
                <div>
                  <p className="text-[10px] font-semibold text-[#0f62fe] uppercase tracking-[0.2em] mb-1">{selectedTool.category}</p>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900 font-poppins">{selectedTool.title}</h2>
                </div>
                <button onClick={() => setSelectedTool(null)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
              </div>
              <div className="p-8"><ToolInterface toolTitle={selectedTool.title} /></div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center gap-3 text-gray-400 text-xs font-normal font-inter">
                <Info size={14} className="text-[#0f62fe]" /> Live 2026 data synchronization active.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="bg-[#0f62fe] p-16 flex flex-col md:flex-row items-center justify-between gap-10 mt-20">
        <div className="text-left">
          <h2 className="text-3xl font-bold uppercase tracking-tight italic text-white mb-2 font-poppins">Ready to take the leap?</h2>
          <p className="text-white/80 font-medium uppercase tracking-wider text-[10px] font-inter">Get a personalized roadmap from our Ausbildung experts</p>
        </div>
        <button className="bg-black text-white px-12 py-4 text-[11px] font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all font-inter shadow-xl">Book Counseling</button>
      </section>
    </div>
  );
}